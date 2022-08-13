'use strict'
const d = document
const w = window
const b = d.body
const wrapper = d.querySelector('.wrapper')
const log = (n) => console.log(n)

//? Мобильная версия меню
function menuBurger() {
    const burgerButton = d.querySelector('.burger')
    const mainMenu = d.querySelector('nav')
    const menuItem = mainMenu.querySelectorAll('li')
    burgerButton.onclick = function(){
        mainMenu.classList.toggle('_active')
        burgerButton.classList.toggle('_active')
    }
    menuItem.forEach(e => e.onclick = function(){
        mainMenu.classList.remove('_active')
        burgerButton.classList.remove('_active')
    })
}
menuBurger()

//? Настройка библиотеки Swiper

//? Слайдер для поэкранной прокрутки
let pageSlider = new Swiper(".page", {

    direction: "vertical",
    parallax: true,
    slidesPerView: 'auto',

    spaceBetween: 30,
    mousewheel: {
        sensetivity: 1,
    },

    wrapperClass: 'page__wrapper',
    slideClass: 'page__screen',
    watchOverflow: true,
    pageUpDown: true,

    speed: 1200,

    observer: true,

    observeSlideChildren: true,

    observeParents: true,

    freeMode: false,

    init: false,
    on:{
        //?Анимация при смене слайдов
        slideChange: function(){
            const slides = pageSlider.slides
            let i = pageSlider.realIndex
            

            for(let n = 0; n < slides.length; n++){
                let slide = slides[n]
                let slideActive = slides[i]
                let animItem = d.querySelectorAll('.anim-item')
                if (animItem.length) {
                    animItem.forEach(e => e.classList.remove('_active'))
                    
                }
                let activeItem = slideActive.querySelectorAll('.anim-item')
                if (activeItem.length) {
                    animItem.forEach(e => e.classList.add('_active'))
                }
            }
        },
        init: function()  {
            sliderNavMenu() 
            
        },
        resize: function(){
            setScrollType()
        },
    }
});

//? Карточки на главной странице
let cardSlider = new Swiper("#cards", {
    effect: "cards",
    grabCursor: true,
    nested: true,
});

//? Прокрутка внутри гармошки
let accordeonScroll = new Swiper(".mySwiper", {
    direction: "vertical",
    nested: true,
    freeMode: true,
    mousewheel: true,
});
//TODO: доделать функцию, должна отключать слайдер на мобилке
function setScrollType() {
    pageSlider.init()

    if(wrapper.classList.contains('_free')){
        wrapper.classList.remove('_free')
        pageSlider.params.freeMode = false;
    }

    for (let index = 0; index < pageSlider.slides.length; index++) { 
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight; 
            if (pageSlideContentHeight > window.innerHeight) { 
                wrapper.classList.add('_free'); 
                pageSlider.params.freeMode = true
                break;
                
            }
        }    
    }
}setScrollType()

//? Меню с якорями
function sliderNavMenu(params) {
    const slideAnchors = d.querySelectorAll('.slide-anchor')
    const scrollBar = d.querySelector('.main-menu__scroll-bar')
    
    for (let i = 0; i < slideAnchors.length; i++) {
        let slideAnchor = slideAnchors[i];
        slideAnchor.onclick = function(){
            pageSlider.slideTo(i, pageSlider.params.speed);
            
        }
    }
    pageSlider.on('slideChange', function () {
        scrollBar.style.transform = `translateX(${pageSlider.realIndex * 100}%)`
    });
}

//? Гармошка
function getAccordeon(params) {
    const accordeons = d.querySelectorAll('.accordeon');
    
    for (let accordeon of accordeons) {
        

        accordeon.onclick = function(e){
            if(e.target != accordeon || e.target == accordeon){
                accordeons.forEach(e => e.classList.remove('_active'))
                this.classList.toggle('_active')
                let aButton = this.querySelector('.accordeon__button')
                aButton.classList.add('_active')
                
            }
        }
        
        
    }
    function gradientAnimation(time, deg) {
        let incline = 1 
        let accordeonNumber = d.querySelectorAll('.accordeon__number')
        log
        setInterval(() => {
            accordeonNumber.forEach(e=> e.style.background = `linear-gradient(${incline}deg, rgba(252, 0, 255, 0.7), rgba(0, 219, 222, 0.7)`)
            incline += deg
        }, time);
    }gradientAnimation(40, 1)
}
getAccordeon()

//? Анимация цифр при наведении в описании карты
function cardDescription(params) {
    const cardNumbers = d.querySelectorAll('.card__number')
    const cardDescriptionItems = d.querySelectorAll('.card-description__text')
    for (let i = 0; i < cardDescriptionItems.length; i++) {
        let cardDescriptionItem = cardDescriptionItems[i];
        cardDescriptionItem.onmouseover = function(e){
            cardNumbers[i].classList.add('_active')
        }
        cardDescriptionItem.onmouseout = function(e){
            cardNumbers[i].classList.remove('_active')
        }
        
    }
}
cardDescription()
//? Кастомный курсор
function customCursor(){
    let cursor = d.querySelector(".cursor");
    let link = d.querySelector("a");
    let btn = d.querySelector("button");
    let trg = d.querySelector('target');
    w.addEventListener('mousemove', function(e) {
		cursor.style.left = e.clientX + 'px'
		cursor.style.top = e.clientY + 'px'
        
        if (e.target == trg || e.target == link || e.target == link.querySelector('span')) {
            cursor.classList.add('pointer')
        }else {
            cursor.classList.remove('pointer')
        }
        
	})
}customCursor()
log(d.querySelectorAll())



