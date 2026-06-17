const canvas = document.querySelector("#hero-canvas");
const ctx = canvas.getContext("2d");
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");

let width = 0;
let height = 0;
let pointerX = 0.5;
let particles = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  // 불꽃 스파크 입자 생성 (속도와 크기를 불티처럼 조정)
  particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 0.5,
    speed: Math.random() * 3 + 1, // 위로 빠르게 솟구침
    alpha: Math.random() * 0.8 + 0.2
  }));
}

function animate() {
  // 1. 붉고 검은 배경 그라데이션 렌더링
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
  bgGradient.addColorStop(0, "#080001"); // 상단: 짙은 어둠
  bgGradient.addColorStop(0.5, "#2a0006"); // 중간: 피어오르는 붉은 기운
  bgGradient.addColorStop(1, "#0a0102"); // 하단: 어둠
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // 2. 스파크 파티클 렌더링
  particles.forEach(p => {
    // 불꽃 색상 설정 (오렌지~붉은빛)
    ctx.fillStyle = `rgba(255, 80, 20, ${p.alpha})`;
    
    // 불꽃이 빛나는 효과 (Glow)
    ctx.shadowColor = "rgba(255, 50, 0, 0.9)";
    ctx.shadowBlur = 12;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // 다른 곳에 영향 안 가게 리셋
    
    // 입자 이동 로직 (위로 상승하며 좌우로 흔들림)
    p.y -= p.speed;
    p.x += Math.sin(p.y * 0.02) * 0.8; 
    
    // 화면 위로 벗어나면 아래에서 다시 생성
    if (p.y < -10) {
      p.y = height + 10;
      p.x = Math.random() * width;
    }
  });

  requestAnimationFrame(animate);
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX / window.innerWidth;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();