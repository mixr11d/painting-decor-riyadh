/**
 * دهانات وديكورات وترميم الرياض - المعمارية البرمجية المركزية
 * Central Script: Google Ads Tracking, Lightbox Modal, Mobile Drawer, Lead Handling
 * 100% Vanilla JS - Zero External Dependencies
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. ثوابت وبيانات النظام والتتبع المركزي (Configuration & Credentials)
  // ==========================================================================
  const CONFIG = {
    conversionId: 'AW-18409997651',
    callLabel: 'pl5nCMzhx5cdENOKycpE',
    whatsAppLabel: 'n8l9CM_hx5cdENOKycpE',
    formLabel: 'GIOjCPekyJcdENOKycpE',
    clientPhoneLocal: '0552633864',
    clientPhoneIntl: '966552633864',
    developerPhones: ['0578539687', '966578539687', '+966578539687'],
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
  // 3. حقن كود قوقل ديناميكياً ودعم صيغة AW-ID/Label الرسمية
  // ==========================================================================
  function initGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', CONFIG.conversionId);

    // حقن السكربت الخارجي لقوقل برمجياً بدون وضعه في HTML
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.conversionId);
    document.head.appendChild(script);
  }

  initGoogleTag();

  // دالة موحدة لتسجيل الإحالات
  function sendGoogleAdsConversion(label, callback) {
    if (typeof window.gtag === 'function' && CONFIG.conversionId && label) {
      const sendToValue = CONFIG.conversionId + '/' + label;
      let callbackFired = false;

      const triggerCallback = function () {
        if (!callbackFired && typeof callback === 'function') {
          callbackFired = true;
          callback();
        }
      };

      // مهلة أمان قصيرة لمنع تعطيل تنقل المستخدم إذا تأخرت الاستجابة
      const timeoutId = setTimeout(triggerCallback, 600);

      window.gtag('event', 'conversion', {
        send_to: sendToValue,
        event_callback: function () {
          clearTimeout(timeoutId);
          triggerCallback();
        }
      });
    } else {
      if (typeof callback === 'function') callback();
    }
  }

  // التحقق هل الرابط خاص برقم المطور لاستثنائه لحماية الميزانية
  function isDeveloperContact(targetUrl) {
    if (!targetUrl) return false;
    const clean = targetUrl.replace(/[^0-9]/g, '');
    return CONFIG.developerPhones.some(function (devPhone) {
      const cleanDev = devPhone.replace(/[^0-9]/g, '');
      return clean.includes(cleanDev);
    });
  }

  // التحقق هل الجهاز حاسوب مكتبي
  function isDesktopDevice() {
    return !/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // ==========================================================================
  // 4. الرصد المركزي لنقرات الاتصال والواتساب (Capture Phase Listener)
  // ==========================================================================
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';

    // نقرات الاتصال المباشر tel:
    if (href.startsWith('tel:')) {
      if (isDeveloperContact(href)) {
        return; // استثناء رقم المطور
      }

      // إلغاء الحدث الافتراضي على الحاسوب لمنع تجميد شاشة فحص Tag Assistant
      if (isDesktopDevice()) {
        event.preventDefault();
        sendGoogleAdsConversion(CONFIG.callLabel, function () {
          alert('رقم الاتصال المباشر لخدمة عملاء الرياض: ' + CONFIG.clientPhoneLocal);
        });
        return;
      }

      // على الجوال: تسجيل الإحالة ثم فتح تطبيق الاتصال
      event.preventDefault();
      sendGoogleAdsConversion(CONFIG.callLabel, function () {
        window.location.href = href;
      });
      return;
    }

    // نقرات الواتساب wa.me أو api.whatsapp
    if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      if (isDeveloperContact(href)) {
        return; // استثناء رقم المطور
      }

      event.preventDefault();
      sendGoogleAdsConversion(CONFIG.whatsAppLabel, function () {
        window.open(href, '_blank', 'noopener,noreferrer');
      });
    }
  }, true);

  // ==========================================================================
  // 5. محرك عارض الصور المنبثق المدمج (Vanilla Lightbox Modal)
  // ==========================================================================
  function setupLightboxModal() {
    let modal = document.querySelector('.lightbox-modal');

    // إنشاء عناصر النافذة إن لم تكن موجودة
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

    // تفعيل التكبير على جميع الصور القابلة للنقر في الخدمات والمعارض
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
  // 6. القائمة الجانبية للجوال (Mobile Drawer)
  // ==========================================================================
  function setupMobileDrawer() {
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

    // إغلاق القائمة عند النقر على أي رابط داخلي
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ==========================================================================
  // 7. الأسئلة الشائعة القابلة للطي (FAQ Accordion)
  // ==========================================================================
  function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;
      questionBtn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        // إغلاق بقية الأسئلة لسلاسة التصفح
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
  // 8. زر الصعود للأعلى (Scroll-to-top)
  // ==========================================================================
  function setupScrollTopBtn() {
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
  // 9. نموذج الطلب التفاعلي السريع (.ajax-lead-form) وتوجيهه للواتساب
  // ==========================================================================
  function setupLeadForms() {
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
        const service = serviceInput ? serviceInput.value.trim() : 'طلب عام';
        const district = districtInput ? districtInput.value.trim() : 'مدينة الرياض';
        const notes = notesInput ? notesInput.value.trim() : 'لا يوجد';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.dataset.originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = 'جاري المعالجة والتحويل...';
        }

        // بناء نص الرسالة المهيئة للواتساب
        const messageText = [
          'السلام عليكم ورحمة الله، أود طلب معاينة وتسعير عبر الموقع الإلكتروني:',
          '• الاسم: ' + name,
          '• الجوال: ' + phone,
          '• الخدمة المطلوبة: ' + service,
          '• الحي / المنطقة: ' + district,
          '• تفاصيل إضافية: ' + notes
        ].join('\n');

        const whatsappUrl = 'https://wa.me/' + CONFIG.clientPhoneIntl + '?text=' + encodeURIComponent(messageText);

        // تسجيل إحالة الفورم بقوقل ثم توجيهه للواتساب
        sendGoogleAdsConversion(CONFIG.formLabel, function () {
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.color = '#34d399';
            statusBox.textContent = 'تم تسجيل طلبك بنجاح! جاري تحويلك لمحادثة الواتساب المباشرة...';
          }

          setTimeout(function () {
            window.location.href = whatsappUrl;
          }, 800);
        });
      });
    });
  }

  // ==========================================================================
  // 10. الإقلاع عند اكتمال تحميل الصفحة (DOM Ready)
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    setupLightboxModal();
    setupMobileDrawer();
    setupFaqAccordion();
    setupScrollTopBtn();
    setupLeadForms();
  });

})();
