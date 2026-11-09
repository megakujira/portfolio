
// ==============================
// Works スライダー
// ==============================

const slides = document.querySelectorAll('.works-slide');
const dots = document.querySelectorAll('.works-dot');

let currentIndex = 0;
let slideTimer;
let isAnimating = false;

function showSlide(index) {
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];

    // 同じスライドなら何もしない
    if (currentIndex === index) return;

    // 次のスライドを右側に配置
    nextSlide.style.transition = 'none';
    nextSlide.classList.remove('active', 'prev');

    // 元のアニメーション開始タイミングを維持
    void nextSlide.offsetWidth;

    nextSlide.style.transition = '';

    // 現在のスライドを左へ
    currentSlide.classList.remove('active');
    currentSlide.classList.add('prev');

    // 次のスライドを表示
    nextSlide.classList.add('active');

    // 丸の選択状態を更新
    dots[currentIndex].classList.remove('active');
    dots[index].classList.add('active');

    currentIndex = index;
}

// 自動切り替え
function changeSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// 丸をクリックしたとき
dots.forEach((dot, index) => {

    dot.addEventListener('click', () => {

        if (index === currentIndex || isAnimating) return;

        showSlide(index);

        clearInterval(slideTimer);
        startSlideTimer();
    });
});

// 自動切り替えタイマー
function startSlideTimer() {

    clearInterval(slideTimer);

    if (slides.length > 1) {
        slideTimer = setInterval(changeSlide, 5000);
    }
}

startSlideTimer();


// ==============================
// ナビゲーションのスクロール処理
// ==============================

const navigation = document.querySelector(".navigation");
const profileSection = document.querySelector("#profile");

if (navigation && profileSection) {

    const navigationHeight = navigation.offsetHeight;

    let scrollScheduled = false;

    function updateNavigation() {

        const profilePosition =
            profileSection.getBoundingClientRect().top;

        navigation.classList.toggle(
            "scrolled",
            profilePosition <= navigationHeight
        );

        scrollScheduled = false;
    }

    window.addEventListener("scroll", () => {

        if (!scrollScheduled) {

            scrollScheduled = true;

            requestAnimationFrame(updateNavigation);
        }

    }, { passive: true });

    updateNavigation();
}


// ==============================
// SVG 枠線アニメーション
// ==============================

document.querySelectorAll(
    ".works-border rect, .skills-border rect"
).forEach(rect => {

    const length = rect.getTotalLength();

    rect.style.strokeDasharray = length;
    rect.style.strokeDashoffset = length;

});


// ==============================
// タイトル表示アニメーション
// ==============================

const worksTitle = document.querySelector(".works-title");
const skillsTitle = document.querySelector(".skills-title");

const titles = [worksTitle, skillsTitle];

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.5
});

titles.forEach(title => {

    if (title) {
        observer.observe(title);
    }

});

// SNSメニューの開閉
const snsMenuButton = document.querySelector(".sns-menu-button");
const snsMenuList = document.querySelector(".sns-menu-list");

if (snsMenuButton && snsMenuList) {

    function closeSnsMenu() {
        snsMenuList.classList.remove("open");
        snsMenuButton.setAttribute("aria-expanded", "false");
        snsMenuButton.setAttribute(
            "aria-label",
            "SNSメニューを開く"
        );
    }

    snsMenuButton.addEventListener("click", () => {
        const isOpen = snsMenuList.classList.toggle("open");

        snsMenuButton.setAttribute("aria-expanded", isOpen);
        snsMenuButton.setAttribute(
            "aria-label",
            isOpen ? "SNSメニューを閉じる" : "SNSメニューを開く"
        );
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".sns-menu")) {
            closeSnsMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSnsMenu();
        }
    });
}