/**
 * دهانات وديكورات وترميم الرياض - المعمارية البرمجية المركزية الشاملة
 * Universal Multi-Page Google Ads Tracking & UI Engine
 * 100% Vanilla JS - يعمل على كافة الصفحات بدقة متناهية
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. بيانات النظام والتتبع المعتمدة لإعلانات قوقل (Live Credentials)
  // ==========================================================================
  const CONFIG = {
    conversionId: 'AW-18409997651',
    callLabel: 'pl5nCMzhx5cdENOKycpE',
    whatsAppLabel: 'n8l9CM_hx5cdENOKycpE',
    formLabel: 'GIOjCPekyJcdENOKycpE',
    clientPhoneLocal: '0552633864',
    clientPhoneIntl: '966552633864',
    developerPhones: ['0578539687', '966578539687'],
    defaultFallbackImage: '/preview.png'
  };

  // ==========================================================================
  // 2. تنظيف أي Service Worker قديم لمنع مشكلة الشاشة البيضاء في كلاودفلير
  // ==========================================================================
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (registration) {
        registration.unregister().catch(function () {});
      });
    }).catch(function () {});
  }

  // ==========================================================================
  // 3. تهيئة Google Tag مركزياً لكافة الصفحات (Universal Google Tag Init)
  // ==========================================================================
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', CONFIG.conversionId, {
    page_path: window.location.pathname,
    send_page_view: true
  });

  // حقن سكربت قوقل في رأس الصفحة تلقائياً إن لم يكن موجوداً
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.conversionId);
    document.head.appendChild(gtagScript);
  }

  // ==========================================================================
  // 4. المحرك المركزي لتسجيل الإحالات بقوة Beacon (Universal Event Dispatcher)
  // ==========================================================================
  function trackConversion(label, actionType) {
    if (!label || !CONFIG.conversionId) return;

    const target = CONFIG.conversionId + '/' + label;

    // 1. إرسال الإحالة الرسمية لقوقل مع Beacon لضمان عدم فقدان الإشارة عند انتقال المتصفح
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: target,
        transport_type: 'beacon',
        event_category: 'Leads',
        event_label: actionType || 'User Action',
        page_location: window.location.href,
        page_path: window.location.pathname,
        value: 1.0,
        currency: 'SAR'
      });
    }

    // 2. تسجيل الحدث في dataLayer لمزامنة أداة Tag Assistant Troubleshoot
    window.dataLayer.push({
      event: 'ads_conversion',
      conversion_action: actionType,
      conversion_target: target,
      page: window.location.pathname
    });

    console.log(`🎯 [Google Ads Conversion] تم تسجيل إحالة (${actionType}) بنجاح إلى: ${target} في الصفحة: ${window.location.pathname}`);
  }

  // فحص استثناء رقم المطور لحماية ميزانية الإعلانات
  function isDeveloperLink(url) {
    if (!url) return false;
    const cleanStr = url.replace(/[^0-9]/g, '');
    return CONFIG.developerPhones.some(function (dev) {
      return cleanStr.indexOf(dev.replace(/[^0-9]/g, '')) !== -1;
    });
  }

  // ==========================================================================
  // 5. الرصد المركزي لكافة نقرات الاتصال والواتساب عبر كل الصفحات
  // ==========================================================================
  document.addEventListener('click', function (e) {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;

    const hrefAttr = targetLink.getAttribute('href') || targetLink.href || '';

    // أ) رصد نقرات الاتصال الهاتفي tel: في أي صفحة
    if (hrefAttr.indexOf('tel:') === 0) {
      if (isDeveloperLink(hrefAttr)) return;

      trackConversion(CONFIG.callLabel, 'Phone Call Click');
      return;
    }

    // ب) رصد نقرات الواتساب wa.me أو whatsapp.com في أي صفحة
    if (hrefAttr.indexOf('wa.me') !== -1 || hrefAttr.indexOf('whatsapp.com') !== -1) {
      if (isDeveloperLink(hrefAttr)) return;

      trackConversion(CONFIG.whatsAppLabel, 'WhatsApp Chat Click');
    }
  }, true); // استخدام capture phase لضمان التقاط الحدث قبل أي سكربت آخر

  // ==========================================================================
  // 6. رصد تلقائي لصفحة الشكر عند الوصول إليها (Thank You Page Conversion)
  // ==========================================================================
  if (window.location.pathname.indexOf('thank-you') !== -1) {
    trackConversion(CONFIG.formLabel, 'Thank You Page Visit');
  }

  // ==========================================================================
  // 7. معالجة وتتبع نماذج الطلب التفاعلية (.ajax-lead-form) في كل الصفحات
  // ==========================================================================
  function setupForms() {
    const forms = document.querySelectorAll('.ajax-lead-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.form-btn-submit');
        const statusBox = form.querySelector('.form-status');
        const nameInput = form.querySelector('[name="name"]');
        const phoneInput = form.querySelector('[name="phone"]');
        const serviceInput = form.querySelector('[name="service"]');
        const districtInput = form.querySelector('[name="district"]');
        const notesInput = form.querySelector('[name="notes"]');

        const name = nameInput ? nameInput.value.trim() : 'غير محدد';
        const phone = phoneInput ? phoneInput.value.trim() : 'غير محدد';
        const service = serviceInput ? serviceInput.value.trim() : 'طلب تشطيب';
        const district = districtInput ? districtInput.value.trim() : 'مدينة الرياض';
        const notes = notesInput ? notesInput.value.trim() : 'لا يوجد';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'جاري تسجيل الطلب وتحويلك...';
        }

        // إطلاق إحالة النموذج في قوقل
        trackConversion(CONFIG.formLabel, 'Lead Form Submitted');

        // تجهيز نص رسالة الواتساب
        const message = [
          'السلام عليكم ورحمة الله، أود طلب معاينة وتسعير عبر الموقع الإلكتروني:',
          '• الاسم: ' + name,
          '• الجوال: ' + phone,
          '• الخدمة المطلوبة: ' + service,
          '• الحي / المنطقة: ' + district,
          '• تفاصيل إضافية: ' + notes,
          '• رابط الصفحة: ' + window.location.href
        ].join('\n');

        const whatsappTargetUrl = 'https://wa.me/' + CONFIG.clientPhoneIntl + '?text=' + encodeURIComponent(message);

        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.style.color = '#34d399';
          statusBox.textContent = 'تم تسجيل طلبك بنجاح! جاري فتح محادثة الواتساب...';
        }

        setTimeout(function () {
          window.location.href = whatsappTargetUrl;
        }, 400);
      });
    });
  }

  // ==========================================================================
  // 8. محرك عارض الصور المنبثق المدمج (Vanilla Lightbox Modal)
  // ==========================================================================
  function setupLightbox() {
    let modal = document.querySelector('.lightbox-modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'lightbox-modal';
      modal.innerHTML = [
        '<div class="lightbox-content-box">',
        '  <button type="button" class="lightbox-close-btn" aria-label="إغلاق">&times;</button>',
        '  <img src="" alt="" class="lightbox-img">',
        '  <p class="lightbox-caption"></p>',
        '</div>'
      ].join('');
      document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('.lightbox-img');
    const modalCaption = modal.querySelector('.lightbox-caption');
    const closeBtn = modal.querySelector('.lightbox-close-btn');

    function openModal(src, caption) {
      modalImg.src = src;
      modalCaption.textContent = caption || '';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () {
        modalImg.src = '';
        modalCaption.textContent = '';
      }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    document.addEventListener('click', function (e) {
      const imgTarget = e.target.closest('.service-card-img, .gallery-thumb, [data-lightbox="true"]');
      if (imgTarget && imgTarget.tagName === 'IMG') {
        e.preventDefault();
        const fullSrc = imgTarget.getAttribute('data-full') || imgTarget.src;
        const caption = imgTarget.getAttribute('alt') || '';
        openModal(fullSrc, caption);
      }
    });
  }

  // ==========================================================================
  // 9. القائمة الجانبية للجوال (Mobile Drawer)
  // ==========================================================================
  function setupDrawer() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');

    if (!hamburgerBtn || !mobileDrawer) return;

    function openDrawer() {
      mobileDrawer.classList.add('active');
      if (drawerBackdrop) drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('active');
      if (drawerBackdrop) drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ==========================================================================
  // 10. الأسئلة الشائعة القابلة للطي (FAQ Accordion)
  // ==========================================================================
  function setupAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;
      questionBtn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        faqItems.forEach(function (other) {
          other.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ==========================================================================
  // 11. زر الصعود للأعلى (Scroll-to-top)
  // ==========================================================================
  function setupScrollTop() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 350) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 12. التشغيل المركزي فور اكتمال تحميل عناصر الصفحة
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    setupLightbox();
    setupDrawer();
    setupAccordion();
    setupScrollTop();
    setupForms();
  });

})();
