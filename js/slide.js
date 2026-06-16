const slideUl = document.querySelector('.hero-slide ul');
const indicators = document.querySelectorAll('.slide-indicator span');
const realSlides = document.querySelectorAll('.hero-slide ul li');
const realCount = realSlides.length;

// 앞뒤에 클론 추가
const firstClone = realSlides[0].cloneNode(true);
const lastClone = realSlides[realCount - 1].cloneNode(true);
firstClone.classList.add('clone');
lastClone.classList.add('clone');

slideUl.insertBefore(lastClone, realSlides[0]);
slideUl.appendChild(firstClone);

const totalCount = realCount + 2;
const widthPercent = 100 / totalCount;

slideUl.style.width = (totalCount * 100) + '%';
document.querySelectorAll('.hero-slide ul li').forEach(function(li){
  li.style.width = widthPercent + '%';
});

let slideIndex = 1; // 클론(0) 다음이 실제 첫 슬라이드
let slideInterval;
let isTransitioning = false;

function setTransform(withTransition){
  slideUl.style.transition = withTransition ? 'transform 0.5s' : 'none';
  slideUl.style.transform = 'translateX(-' + (slideIndex * widthPercent) + '%)';
}

function updateIndicator(){
  let realIndex = slideIndex - 1;
  if (realIndex < 0) realIndex = realCount - 1;
  if (realIndex >= realCount) realIndex = 0;
  indicators.forEach(function(el){ el.classList.remove('on'); });
  indicators[realIndex].classList.add('on');
}

function moveSlide(){
  isTransitioning = true;
  setTransform(true);
  updateIndicator();
}

slideUl.addEventListener('transitionend', function(){
  isTransitioning = false;
  if (slideIndex === 0) {
    slideIndex = realCount;
    setTransform(false);
  } else if (slideIndex === totalCount - 1) {
    slideIndex = 1;
    setTransform(false);
  }
});

function autoSlide(){
  slideInterval = setInterval(function(){
    if (isTransitioning) return;
    slideIndex++;
    moveSlide();
  }, 3000);
}

setTransform(false);
autoSlide();

indicators.forEach(function(el, idx){
  el.addEventListener('click', function(){
    if (isTransitioning) return;
    clearInterval(slideInterval);
    slideIndex = idx + 1;
    moveSlide();
    autoSlide();
  });
});