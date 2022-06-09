// Slider
const slides = document.querySelectorAll('.home-slide'),
      slider = document.querySelector('.home-bg'),
      slidesWrapper = document.querySelector('.home-slider-wrapper'),
      slidesField = document.querySelector('.home-slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1,
    offset = 0;

let timer = setInterval(nextSlide, 5000);

slidesField.style.width = 100 * slides.length + '%';
slides.forEach(slide => {
    slide.style.width = width;
});

const indicators = document.createElement('ul'),
      dots = [];

indicators.classList.add('slider-dots');

slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

function nextSlide() {
    if (offset == +width.replace(/\D/g,'') * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.replace(/\D/g,'');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    dotOpacity();
}

function dotOpacity() {
    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[slideIndex-1].style.opacity = 1;
}

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = +width.replace(/\D/g,'') * (slideTo - 1);

        clearInterval(timer);

        timer = setInterval(nextSlide, 5000);

        slidesField.style.transform = `translateX(-${offset}px)`;

        dotOpacity();
    });
});

// Tabs
const tabs = document.querySelectorAll('.work-button-list .btn'),
      tabsContent = document.querySelectorAll('.work-blocks');

tabs.forEach((item, i) => {
    item.addEventListener('click', () => {
        hideTabsContent();
        showTabsContent(i);
    });
});

hideTabsContent();
showTabsContent();

function hideTabsContent() {
    tabsContent.forEach(item => {
        item.style.display = 'none';
    });

    tabs.forEach(item => {
        item.classList.remove('work-btn-active');
    });
}

function showTabsContent(i = 0) {
    tabs[i].classList.add('work-btn-active');
    tabsContent[i].style.display = 'flex';
}


// Accordion
const question = document.querySelectorAll('.accordion-question'),
      answer = document.querySelectorAll('.accordion-answer'),
      closeBtn = document.querySelectorAll('.x-btn');

question.forEach((item, i) => {
    item.addEventListener('click', () => {
        if (answer[i].classList.contains('answer-active')) {
            answer[i].style.height = 0;
        } else {
            answer[i].style.height = answer[i].scrollHeight + 'px';
        }
        answer[i].classList.toggle('answer-active');
        closeBtn[i].classList.toggle('x-btn-active');
    });
});