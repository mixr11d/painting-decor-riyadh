/**
 * سكربت الفحص والتحقق المعماري الشامل لمشروع دهانات وديكورات وترميم الرياض
 * تشغيل عبر: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();

// قائمة الملفات الإلزامية للمشروع
const REQUIRED_FILES = [
  'style.css',
  'script.js',
  'index.html',
  'interior-painting.html',
  'exterior-painting.html',
  'decore.html',
  'renovation-finishing.html',
  'prices.html',
  'our-works.html',
  'city-landing.html',
  'about-us.html',
  'contact-us.html',
  'faq.html',
  'warranty.html',
  'thank-you.html',
  'privacy-policy.html',
  'terms-conditions.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'llms.txt',
  'manifest.json',
  '_headers',
  '_redirects',
  'al-narjis.html',
  'al-malqa.html',
  'al-yasmin.html',
  'hittin.html',
  'al-aarid.html',
  'al-sahafa.html',
  'al-ghadir.html',
  'al-aqiq.html',
  'al-qayrawan.html',
  'al-rawdah.html',
  'al-hamra.html',
  'qurtubah.html',
  'dahiat-laban.html',
  'al-suwaidi.html',
  'al-olaya.html',
  'moisture-treatment.html',
  'tv-backgrounds-decor.html',
  'facade-profile.html'
];

console.log('====================================================');
console.log('🔍 بدء الفحص المعماري لملفات دهانات وديكورات وترميم الرياض...');
console.log('====================================================\n');

let missingCount = 0;
let validCount = 0;

REQUIRED_FILES.forEach(fileName => {
  const filePath = path.join(ROOT_DIR, fileName);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size > 0) {
      console.log(`✅ [موجود وسليم]: ${fileName} (${stats.size} bytes)`);
      validCount++;
    } else {
      console.warn(`⚠️ [تنبيه - ملف فارغ]: ${fileName}`);
    }
  } else {
    console.error(`❌ [مفقود]: ${fileName}`);
    missingCount++;
  }
});

console.log('\n----------------------------------------------------');
console.log(`📊 النتيجة النهائية: ${validCount} ملف سليم | ${missingCount} ملف مفقود من أصل ${REQUIRED_FILES.length} ملفاً.`);
if (missingCount === 0) {
  console.log('🚀 المشروع مكتمل 100% وجاهز للنشر الفوري على Cloudflare Pages!');
} else {
  console.log('⚠️ يرجى التأكد من نسخ الملفات المتبقية في المجلد الرئيسي.');
}
console.log('----------------------------------------------------\n');
