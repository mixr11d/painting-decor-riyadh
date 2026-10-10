/* ==========================================================================
   1. إعدادات ومعرفات إعلانات جوجل (دهانات وديكورات وترميم الرياض)
   ========================================================================== */
const G_ID = 'AW-18409997651'; 
const C_L = 'pl5nCMzhx5cdENOKycpE';    // لابل الاتصال الهاتفي
const W_L = 'n8l9CM_hx5cdENOKycpE';    // لابل نقرة الواتساب المباشرة
const F_L = 'GIOjCPekyJcdENOKycpE';    // لابل إرسال النموذج

const CLIENT_PHONE_INTL = '966552633864';
const DEV_PHONES = ['0578539687', '966578539687'];

/* ==========================================================================
   2. تحميل كود تتبع جوجل تلقائياً بعد اكتمال هيكل الصفحة
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    var gScript = document.createElement('script');
    gScript.async = true;
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + G_ID;
    document.head.appendChild(gScript);
});

// إعدادات الـ dataLayer الافتراضية
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', G_ID);

/* ==========================================================================
   3. مستشعر رصد النقرات التلقائي لإعلانات جوجل (اتصال وواتساب)
   ========================================================================== */
document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    
    var href = a.href || a.getAttribute('href') || '';
    
    // استثناء رابط المطور في الفوتر
    var cleanHref = href.replace(/[^0-9]/g, '');
    var isDev = DEV_PHONES.some(function(p) { return cleanHref.includes(p); });
    if (isDev) return;

    // رصد نقرة الاتصال الهاتفي
    if (href.startsWith('tel:') || a.getAttribute('href')?.startsWith('tel:')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + C_L,
            'value': 100.0,
            'currency': 'SAR'
        });
        console.log('✅ Google Ads Call Conversion Tracked');
    }
    
    // رصد نقرة الواتساب المباشرة
    if (href.includes('wa.me') || href.includes('whatsapp')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + W_L,
            'value': 80.0,
            'currency': 'SAR'
        });
        console.log('✅ Google Ads WhatsApp Conversion Tracked');
    }
}, true);

/* ==========================================================================
   3.1 مستشعر رصد إرسال النماذج التفاعلية وتحويلها للواتساب
   ========================================================================== */
document.addEventListener('submit', function(e) {
    var form = e.target.closest('.ajax-lead-form') || (e.target.id === 'contactForm' ? e.target : null);
    if (!form) return;

    // تسجيل إحالة النموذج بقوقل
    gtag('event', 'conversion', {
        'send_to': G_ID + '/' + F_L,
        'value': 70.0,
        'currency': 'SAR'
    });
    console.log('✅ Google Ads Form Conversion Tracked');

    // تجهيز رسالة الواتساب والتحويل
    if (form.classList.contains('ajax-lead-form')) {
        e.preventDefault();
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

        setTimeout(function() {
            window.location.href = 'https://wa.me/' + CLIENT_PHONE_INTL + '?text=' + encodeURIComponent(msg);
        }, 300);
    }
});

// رصد صفحة الشكر تلقائياً إن زارها العميل
if (window.location.pathname.includes('thank-you')) {
    gtag('event', 'conversion', {
        'send_to': G_ID + '/' + F_L,
        'value': 70.0,
        'currency': 'SAR'
    });
}

/* ==========================================================================
   4. تفعيل وإغلاق قائمة الجوال (Drawer / Mobile Menu)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.hamburger-btn') || document.getElementById('menuToggle');
    var mobileDrawer = document.querySelector('.mobile-drawer');
    var drawerBackdrop = document.querySelector('.drawer-backdrop');
    var drawerCloseBtn = document.querySelector('.drawer-close-btn');

    function closeMenu() {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileDrawer.classList.add('active');
            if (drawerBackdrop) drawerBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMenu);
        if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);

        mobileDrawer.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ==========================================================================
       5. تشغيل عارض الصور المنبثق (Vanilla Lightbox Modal)
       ========================================================================== */
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

    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (mClose) mClose.addEventListener('click', closeLightbox);
    modal.addEventListener('click', function(ev) { if (ev.target === modal) closeLightbox(); });
    document.addEventListener('keydown', function(ev) { if (ev.key === 'Escape') closeLightbox(); });

    document.addEventListener('click', function(ev) {
        var t = ev.target.closest('.service-card-img, .gallery-thumb, [data-lightbox="true"]');
        if (t && t.tagName === 'IMG') {
            ev.preventDefault();
            mImg.src = t.getAttribute('data-full') || t.src;
            mCap.textContent = t.getAttribute('alt') || '';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    /* ==========================================================================
       6. الأسئلة الشائعة القابلة للطي (Accordion)
       ========================================================================== */
    document.querySelectorAll('.faq-item').forEach(function(item) {
        var btn = item.querySelector('.faq-question');
        if (btn) {
            btn.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        }
    });

    /* ==========================================================================
       7. زر الصعود للأعلى (Back To Top)
       ========================================================================== */
    var backToTopBtn = document.querySelector('.scroll-top-btn') || document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
