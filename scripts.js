const slides = document.querySelectorAll('.works-slide');
const dots = document.querySelectorAll('.works-dot');

let currentIndex = 0;
let slideTimer;

function showSlide(index) {
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];

    // 同じスライドなら何もしない
    if (currentIndex === index) return;

    // 次のスライドを右側に配置
    nextSlide.style.transition = 'none';
    nextSlide.classList.remove('active', 'prev');
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

function changeSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// 丸をクリックしたとき
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (index === currentIndex) return;

        showSlide(index);

        // 自動切り替えの時間をリセット
        clearInterval(slideTimer);
        slideTimer = setInterval(changeSlide, 5000);
    });
});

// 5秒ごとに自動切り替え
slideTimer = setInterval(changeSlide, 5000);

const navigation = document.querySelector(".navigation");
const profileSection = document.querySelector("#profile");

window.addEventListener("scroll", () => {
    const profilePosition = profileSection.getBoundingClientRect().top;

    if (profilePosition <= navigation.offsetHeight) {
        navigation.classList.add("scrolled");
    } else {
        navigation.classList.remove("scrolled");
    }
});

document.querySelectorAll(".works-border rect, .skills-border rect").forEach(rect => {
    const length = rect.getTotalLength();

    rect.style.strokeDasharray = length;
    rect.style.strokeDashoffset = length;
});

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