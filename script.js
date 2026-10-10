/**
 * دهانات وديكورات وترميم الرياض - المعمارية البرمجية المركزية الشاملة
 * 100% Script-Only Tracking (Zero HTML edits required)
 */

(function () {
  'use strict';

  // 1. المعرفات الرسمية الخاصة بحسابك في إعلانات قوقل
  var CONVERSION_ID = 'AW-18409997651';
  var RAW_ID = '18409997651';
  var CALL_LABEL = 'pl5nCMzhx5cdENOKycpE';
  var WHATSAPP_LABEL = 'n8l9CM_hx5cdENOKycpE';
  var FORM_LABEL = 'GIOjCPekyJcdENOKycpE';
  var CLIENT_PHONE_INTL = '966552633864';
  var DEV_PHONES = ['0578539687', '966578539687'];

  // 2. تنظيف السيرفس وركر القديم
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (r) {
      r.forEach(function (reg) { reg.unregister(); });
    }).catch(function () {});
  }

  // 3. حقن وتهيئة كود قوقل في رأس الصفحة تلقائياً لأي صفحة بالموقع
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', CONVERSION_ID, {
    send_page_view: true
  });

  if (!document.querySelector('script[src*="' + RAW_ID + '"]')) {
    var gScript = document.createElement('script');
    gScript.async = true;
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONVERSION_ID;
    document.head.appendChild(gScript);
  }

  // 4. الدالة المركزية لإرسال الإحالة لقوقل فوراً بالصيغتين المعتمدتين
  function triggerAdsConversion(label) {
    if (!label) return;

    // إرسال بصيغة AW- الرسمية
    window.gtag('event', 'conversion', {
      'send_to': CONVERSION_ID + '/' + label,
      'transport_type': 'beacon',
      'value': 1.0,
      'currency': 'SAR'
    });

    // إرسال بالمعرف الرقمي كاحتياط لتطابق أي فاحص آلي
    window.gtag('event', 'conversion', {
      'send_to': RAW_ID + '/' + label,
      'transport_type': 'beacon'
    });

    console.log('🎯 [Google Ads Conversion Fired]:', CONVERSION_ID + '/' + label);
  }

  // فحص استثناء المطور
  function isDeveloper(url) {
    if (!url) return false;
    var digits = url.replace(/[^0-9]/g, '');
    return DEV_PHONES.some(function (p) {
      return digits.indexOf(p.replace(/[^0-9]/g, '')) !== -1;
    });
  }

  // 5. رصد نقرات الاتصال والواتساب في جميع صفحات الموقع تلقائياً
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = (link.getAttribute('href') || link.href || '').trim();

    // أ) رصد نقرات الاتصال tel: (المطلوبة في شاشة الفحص لديك)
    if (href.indexOf('tel:') === 0) {
      if (isDeveloper(href)) return;
      // إرسال الإحالة فوراً دون أي alert يوقف فاحص قوقل
      triggerAdsConversion(CALL_LABEL);
      return;
    }

    // ب) رصد نقرات الواتساب
    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
      if (isDeveloper(href)) return;
      triggerAdsConversion(WHATSAPP_LABEL);
    }
  }, true);

  // 6. رصد النماذج التفاعلية وتحويلها للواتساب
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.ajax-lead-form');
    if (!form) return;

    e.preventDefault();
    triggerAdsConversion(FORM_LABEL);

    var name = (form.querySelector('[name="name"]') || {}).value || 'غير محدد';
    var phone = (form.querySelector('[name="phone"]') || {}).value || 'غير محدد';
    var service = (form.querySelector('[name="service"]') || {}).value || 'طلب عام';
    var district = (form.querySelector('[name="district"]') || {}).value || 'الرياض';
    var notes = (form.querySelector('[name="notes"]') || {}).value || 'لا يوجد';

    var msg = [
      'السلام عليكم ورحمة الله، طلب جديد من الموقع:',
      '• الاسم: ' + name,
      '• الجوال: ' + phone,
      '• الخدمة: ' + service,
      '• الحي: ' + district,
      '• ملاحظات: ' + notes
    ].join('\n');

    var submitBtn = form.querySelector('.form-btn-submit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'جاري التحويل للواتساب...';
    }

    setTimeout(function () {
      window.location.href = 'https://wa.me/' + CLIENT_PHONE_INTL + '?text=' + encodeURIComponent(msg);
    }, 400);
  }, true);

  // 7. رصد صفحة الشكر تلقائياً
  if (window.location.pathname.indexOf('thank-you') !== -1) {
    triggerAdsConversion(FORM_LABEL);
  }

  // 8. تشغيل القوائم والأزرار العائمة والمودال في كل الصفحات
  document.addEventListener('DOMContentLoaded', function () {
    // Lightbox
    var modal = document.querySelector('.lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'lightbox-modal';
      modal.innerHTML = '<div class="lightbox-content-box"><button type="button" class="lightbox-close-btn">&times;</button><img src="" alt="" class="lightbox-img"><p class="lightbox-caption"></p></div>';
      document.body.appendChild(modal);
    }
    var mImg = modal.querySelector('.lightbox-img');
    var mCap = modal.querySelector('.lightbox-caption');
    var mClose = modal.querySelector('.lightbox-close-btn');

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (mClose) mClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (ev) { if (ev.target === modal) closeModal(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeModal(); });

    document.addEventListener('click', function (ev) {
      var t = ev.target.closest('.service-card-img, .gallery-thumb, [data-lightbox="true"]');
      if (t && t.tagName === 'IMG') {
        ev.preventDefault();
        mImg.src = t.getAttribute('data-full') || t.src;
        mCap.textContent = t.getAttribute('alt') || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Mobile Drawer
    var ham = document.querySelector('.hamburger-btn');
    var drawer = document.querySelector('.mobile-drawer');
    var back = document.querySelector('.drawer-backdrop');
    var dClose = document.querySelector('.drawer-close-btn');

    function closeDrawer() {
      if (drawer) drawer.classList.remove('active');
      if (back) back.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (ham && drawer) {
      ham.addEventListener('click', function () {
        drawer.classList.add('active');
        if (back) back.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    if (dClose) dClose.addEventListener('click', closeDrawer);
    if (back) back.addEventListener('click', closeDrawer);
    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (l) { l.addEventListener('click', closeDrawer); });
    }

    // Accordion
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      if (btn) {
        btn.addEventListener('click', function () {
          item.classList.toggle('active');
        });
      }
    });

    // Scroll to top
    var topBtn = document.querySelector('.scroll-top-btn');
    if (topBtn) {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 350) topBtn.classList.add('visible');
        else topBtn.classList.remove('visible');
      });
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });

})();
