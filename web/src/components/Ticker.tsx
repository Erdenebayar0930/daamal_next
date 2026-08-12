import { marqueeItems } from "@/lib/content";

/**
 * Хязгааргүй эргэлддэг ticker. Хоёр ижил track-ийг зэрэг -100% рүү нүүлгэснээр
 * үс тасрахгүй loop болно. Hover үед түр зогсоно (CSS).
 */
export function Ticker() {
  const track = (
    <div className="ticker__track" aria-hidden="true">
      {/* Дэлгэц өргөн байхад хоосон зай гарахгүйн тулд 3 удаа давтана */}
      {[0, 1, 2].flatMap((rep) =>
        marqueeItems.map((item) => <span key={`${rep}-${item}`}>{item}</span>),
      )}
    </div>
  );

  return (
    <div className="ticker" role="presentation">
      {track}
      {track}
    </div>
  );
}
