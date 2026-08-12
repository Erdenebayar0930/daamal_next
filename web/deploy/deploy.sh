#!/usr/bin/env bash
#
# Hostinger shared hosting (Passenger) дээр шинэчлэл гаргах.
# Серверт SSH-ээр нэвтрээд аппын хавтаснаас ажиллуулна:
#
#   cd ~/domains/daamal.org/app && bash deploy/deploy.sh
#
# Node-ыг CloudLinux selector-оос авна (PATH дээр node байдаггүй).
set -euo pipefail

NODE_BIN=${NODE_BIN:-/opt/alt/alt-nodejs20/root/usr/bin}
export PATH="$NODE_BIN:$PATH"

log() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }

cd "$(dirname "$0")/.."
APP_DIR=$(pwd)
log "Аппын хавтас: $APP_DIR"

if [[ ! -f .env.local ]]; then
  echo ".env.local алга. DB_* болон SMTP_* хувьсагчийг тохируулна уу." >&2
  exit 1
fi

log "Node: $(node -v) / npm: $(npm -v)"

log "Хамаарал суулгаж байна"
npm ci --no-audit --no-fund || npm install --no-audit --no-fund

log "barter_offers хүснэгт шалгаж байна"
npm run db:setup

# NEXT_BUILD_CPUS тохируулсан үед build нь TS шалгалтыг алгасдаг (LVE-ийн
# процессын хязгаараас болж дотроос нь ажиллуулж чаддаггүй) — тиймээс энд
# тусад нь, нэг процессоор гүйцэтгэнэ.
log "TypeScript шалгалт"
npm run typecheck

# Энд Turbopack ажиллахгүй: машин 64 цөм харуулдаг тул Turbopack тэр хэрээр
# thread/процесс асаагаад LVE-ийн хязгаарт (~16-32) мөргөж "spawn node EAGAIN"
# гэж унадаг. Webpack builder + 1 worker нь тогтвортой.
log "Build (webpack, NEXT_BUILD_CPUS=${NEXT_BUILD_CPUS:-1})"
NEXT_BUILD_CPUS="${NEXT_BUILD_CPUS:-1}" npm run build:host

# Passenger нь tmp/restart.txt өөрчлөгдөхөд аппыг дахин ачаална
log "Passenger-ийг дахин ачаалж байна"
mkdir -p tmp
touch tmp/restart.txt

log "Дууслаа. Лог: ~/domains/daamal.org/logs эсвэл hPanel → Node.js → Logs"
