const hamburger = document.querySelector('.header-hamburger');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');
const sidebarBottom = document.querySelector('.sidebar-bottom');
const userBtns = document.querySelectorAll('.sidebar-user button');
const playerBar = document.querySelector('.player-bar');

const FADE_OUT_MS = 200; // .bottom-hide transition 시간과 일치

hamburger.addEventListener('click', () => {
  if (sidebar.classList.contains('expanded')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener('click', () => {
  closeSidebar();
});

function openSidebar() {
  sidebar.classList.add('expanded');
  overlay.classList.add('active');
  if (playerBar) playerBar.classList.add('sidebar-expanded');
  showBottom();
}

function closeSidebar() {
  // 1. 마이뮤직/로그인/회원가입을 먼저 opacity로 페이드아웃
  hideBottom();

  // 2. 페이드아웃이 끝난 뒤 사이드바 너비를 줄임
  setTimeout(() => {
    sidebar.classList.remove('expanded');
    overlay.classList.remove('active');
    if (playerBar) playerBar.classList.remove('sidebar-expanded');
  }, FADE_OUT_MS);
}

function showBottom() {
  // 너비가 펼쳐지는 모션 동안에는 보이지 않음
  sidebarBottom.classList.remove('bottom-hide');
  sidebarBottom.classList.add('bottom-show');
  userBtns.forEach((btn) => {
    btn.classList.remove('btn-hide');
    btn.classList.add('btn-show');
  });
}

function hideBottom() {
  sidebarBottom.classList.remove('bottom-show');
  sidebarBottom.classList.add('bottom-hide');
  userBtns.forEach((btn) => {
    btn.classList.remove('btn-show');
    btn.classList.add('btn-hide');
  });
}
