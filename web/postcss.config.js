/*
 * web/ нь Tailwind хэрэглэдэггүй — globals.css дотор цэвэр CSS бичсэн.
 *
 * Гэвч энэ файл ЗААВАЛ БАЙХ ЁСТОЙ: PostCSS нь тохиргоогоо дээшээ хайдаг тул
 * үүнгүйгээр эцэг репогийн ../postcss.config.js-ийг олж, түүний
 * '@tailwindcss/postcss' plugin-ыг ачаалах гэж оролддог.
 *
 * Локалд эцэг төслийн node_modules байдаг тул анзаарагддаггүй; харин зөвхөн
 * web/-ийн хамаарлыг суулгадаг Hostinger дээр
 * "Cannot find module '@tailwindcss/postcss'" гэж build унадаг.
 *
 * Хоосон plugins нь энэ хайлтыг зогсооно. Next өөрийн дотоод CSS
 * боловсруулалтаа хэвийн үргэлжлүүлнэ.
 */
module.exports = {
  plugins: {},
};
