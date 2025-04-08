// تحديث السنة في الفوتر
document.getElementById('year').textContent = new Date().getFullYear();

// بيانات الشعارات
const logos = [
    {
        id: 1,
        name: "جامعة المنصورة",
        image: "images/جامعة المنصورة.png",
        downloadUrl: "images/جامعة المنصورة.png"
    },
    {
        id: 2,
        name: "علوم",
        image: "images/علوم.png",
        downloadUrl: "images/علوم.png"
    },
    {
        id: 3,
        name: "قسم الرياضيات",
        image: "images/قسم الرياضيات.jpg",
        downloadUrl: "images/قسم الرياضيات.jpg"
    }
];

// عرض الشعارات
const logosContainer = document.querySelector('.logos-container');

// دالة لعرض الشعارات
function displayLogos(logosArray) {
    logosContainer.innerHTML = '';

    logosArray.forEach(logo => {
        const logoItem = document.createElement('div');
        logoItem.classList.add('logo-item');

        logoItem.innerHTML = `
            <img src="${logo.image}" alt="${logo.name}" class="logo-img">
            <h3 class="logo-name">${logo.name}</h3>
            <a href="${logo.downloadUrl}" download class="download-btn">تنزيل</a>
        `;

        logosContainer.appendChild(logoItem);
    });
}

// عرض الشعارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayLogos(logos);
});

// دالة لتنزيل الشعار
function downloadLogo(url, name) {
    // إنشاء عنصر رابط مؤقت
    const link = document.createElement('a');

    // تعيين مسار الصورة
    link.href = url;

    // تعيين اسم الملف عند التنزيل
    link.download = name + '.png';

    // إضافة الرابط للصفحة بشكل مؤقت
    document.body.appendChild(link);

    // تنفيذ النقر على الرابط لبدء التنزيل
    link.click();

    // إزالة الرابط من الصفحة
    document.body.removeChild(link);
}

// إضافة مستمع للنقر على زر التنزيل
logosContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('download-btn')) {
        e.preventDefault();

        // الحصول على مسار الصورة من الرابط
        const url = e.target.getAttribute('href');

        // الحصول على اسم الشعار
        const name = e.target.parentElement.querySelector('.logo-name').textContent;

        // استدعاء دالة التنزيل
        downloadLogo(url, name);
    }
});


// دالة لتنزيل الصورة من صفحة البحث عن الصور
function downloadSearchImage(url, source) {
    // إنشاء عنصر رابط مؤقت
    const link = document.createElement('a');

    // تنظيف الرابط من أي معلمات استعلام
    if (url) {
        url = url.split('?')[0];
    } else {
        console.error('رابط الصورة غير صالح');
        return;
    }

    link.href = url;

    // استخراج اسم الملف من الرابط أو استخدام اسم افتراضي
    let fileName;
    try {
        fileName = url.split('/').pop() || 'image.jpg';
    } catch (e) {
        fileName = 'image.jpg';
    }

    // إضافة مصدر الصورة إلى اسم الملف
    link.download = `${source || 'image'}_${fileName}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// إضافة مستمع للنقر على زر التنزيل في صفحة البحث عن الصور
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('download-btn') && document.querySelector('.image-search-section')) {
        e.preventDefault();

        const imageCard = e.target.closest('.image-card');
        if (imageCard) {
            // الحصول على الصورة الأصلية من السمة data-original-url إذا كانت متوفرة
            const originalUrl = e.target.getAttribute('data-original-url');
            const thumbnailUrl = e.target.getAttribute('data-thumbnail');

            // استخدام الصورة الأصلية إذا كانت متوفرة، وإلا استخدم الصورة المصغرة
            let imageUrl;
            if (originalUrl && originalUrl !== '#') {
                imageUrl = originalUrl;
            } else if (thumbnailUrl) {
                imageUrl = thumbnailUrl;
            } else {
                imageUrl = imageCard.querySelector('img').src;
            }

            const source = imageCard.querySelector('.image-source').textContent;
            console.log('تنزيل الصورة:', imageUrl);
            downloadSearchImage(imageUrl, source);
        }
    }
});

function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename || 'downloaded-image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        })
        .catch(error => console.error('خطأ في التنزيل:', error));
}
