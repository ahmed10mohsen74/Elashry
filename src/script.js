const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const allLinks = navLinks.querySelectorAll("a");

// زر القائمة ☰
menuBtn.addEventListener("click", () =>
{
    navLinks.classList.toggle("active");
    menuBtn.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
});

// إغلاق القائمة عند الضغط على أي رابط
allLinks.forEach(link =>
{
    link.addEventListener("click", () =>
    {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

const dateFrom = document.getElementById('date-from');
const dateTo = document.getElementById('date-to');

// 1. تحديد تاريخ اليوم
const today = new Date().toISOString().split('T')[0];
dateFrom.min = today;

// 2. لما المستخدم يختار "من"
dateFrom.addEventListener('change', () =>
{
    // خلي تاريخ "إلى" يبدأ من نفس تاريخ "من"
    dateTo.min = dateFrom.value;

    // افتح الـ Date Picker تلقائيًا
    dateTo.focus();
});



const input = document.getElementById('search-filter');
const suggestions = document.getElementById('suggestions');
const labels = suggestions.querySelectorAll('label');

// لما المستخدم يضغط على الانبوت
input.addEventListener('focus', () =>
{
    suggestions.style.display = 'block';
});

// لما يكتب حرف، نفلتر ونظهر بس المدن المناسبة
input.addEventListener('input', () =>
{
    const filter = input.value.trim();
    suggestions.style.display = 'block'; // دايمًا نضمن إنها ظهرت وقت الكتابة
    labels.forEach(label =>
    {
        const city = label.dataset.city;
        label.style.display = city.includes(filter) ? 'block' : 'none';
    });
});

// لما يختار مدينة من الليستة
labels.forEach(label =>
{
    label.addEventListener('click', () =>
    {
        input.value = label.dataset.city;
        suggestions.style.display = 'none'; // نخفيها بعد الاختيار
    });
});

// لما المستخدم يضغط خارج القائمة أو الانبوت
document.addEventListener('click', (e) =>
{
    if (!document.querySelector('.search-place').contains(e.target))
    {
        suggestions.style.display = 'none';
    }
});


const properties = [
    { image: "src/img/home2.WEBP", type: "منزل", city: "القاهرة", price: "500,000", currency: "ريال سعودي" },
    { image: "src/img/v1.jpg", type: "فيلا", city: "الجيزة", price: "2,000,000", currency: "ريال سعودي" },
    { image: "src/img/m1.jpg", type: "مكتب", city: "الزقازيق", price: "300,000", currency: "جنيه مصري" },
    { image: "src/img/a1.jpg", type: "ارض", city: "قنا", price: "150,000", currency: "جنيه مصري" },
    { image: "src/img/home1.jpg", type: "منزل", city: "القاهرة", price: "500,000", currency: "ريال سعودي" },
    { image: "src/img/v2.jpg", type: "فيلا", city: "الجيزة", price: "2,000,000", currency: "ريال سعودي" },
    { image: "src/img/m2.jpEG", type: "مكتب", city: "الزقازيق", price: "300,000", currency: "جنيه مصري" },
    { image: "src/img/a2.jpg", type: "ارض", city: "قنا", price: "150,000", currency: "جنيه مصري" },
    { image: "src/img/home3.jpg", type: "منزل", city: "القاهرة", price: "500,000", currency: "ريال سعودي" },
    { image: "src/img/v3.jpEG", type: "فيلا", city: "الجيزة", price: "2,000,000", currency: "ريال سعودي" },
    { image: "src/img/m3.jpEG", type: "مكتب", city: "الزقازيق", price: "300,000", currency: "جنيه مصري" },
    { image: "src/img/a3.jpg", type: "ارض", city: "قنا", price: "150,000", currency: "جنيه مصري" },
    { image: "src/img/home4.jpg", type: "منزل", city: "القاهرة", price: "500,000", currency: "ريال سعودي" },
    { image: "src/img/v4.WEBP", type: "فيلا", city: "الجيزة", price: "2,000,000", currency: "ريال سعودي" },
    { image: "src/img/m4.jpg", type: "مكتب", city: "الزقازيق", price: "300,000", currency: "جنيه مصري" },
    { image: "src/img/a4.WEBP", type: "ارض", city: "قنا", price: "150,000", currency: "جنيه مصري" },
    { image: "src/img/v1.jpg", type: "فيلا", city: "الإسكندرية", price: "1,800,000", currency: "ريال سعودي" },
    { image: "src/img/home3.jpg", type: "منزل", city: "أسيوط", price: "400,000", currency: "جنيه مصري" },
];



const cardsContainer = document.getElementById("cards-container");



function renderCards(filtered)
{
    cardsContainer.innerHTML = ""; // امسح القديم

    filtered.forEach((item, index) =>
    {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="card-info">
        <div class="card-title">
          <h3>${item.type}</h3>
          <h4>${item.city}</h4>
        </div>
        <div class="card-price">
          <h3>${item.price}</h3>
          <h4>${item.currency}</h4>
        </div>
      </div>
    `;

        cardsContainer.appendChild(card);

        // أضف الكلاس بعد تأخير عشان يظهر واحدة واحدة
        setTimeout(() =>
        {
            card.classList.add("show");
        }, index * 100); // كل كارت يتأخر 100ms عن اللي قبله
    });
}

const filterLinks = document.querySelectorAll(".filter a");

filterLinks.forEach(link =>
{
    link.addEventListener("click", (e) =>
    {
        e.preventDefault();

        // إزالة active من الكل
        filterLinks.forEach(l => l.classList.remove("active"));
        // إضافة active للرابط الحالي
        link.classList.add("active");

        // جلب نوع العقار من data-type
        const type = link.dataset.type;

        // فلترة الأراي
        const filtered = properties.filter(item => item.type === type);

        // عرض الكروت بعد الفلترة
        renderCards(filtered);
    });
});
window.addEventListener("DOMContentLoaded", () =>
{
    const defaultType = "منزل";
    const filtered = properties.filter(item => item.type === defaultType);
    renderCards(filtered);
});

