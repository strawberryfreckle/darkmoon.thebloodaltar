// 1. 흩날리는 핏빛 재(Ash) 캔버스 이펙트
const canvas = document.getElementById('ash-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// 캔버스 크기 맞춤 및 파티클 생성
function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    particles = [];
    // 불티 100개 생성
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 1.5 + 0.5, // 위로 올라가는 속도
            speedX: (Math.random() - 0.5) * 1, // 좌우 흔들림
            opacity: Math.random() * 0.6 + 0.2
        });
    }
}

// 파티클 애니메이션 루프
function animateAsh() {
    ctx.clearRect(0, 0, width, height); // 이전 화면 지우기
    
    particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 60, 20, ${p.opacity})`;
        ctx.shadowColor = "rgba(255, 25, 10, 0.8)";
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // 이동 로직 (위로 상승)
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.02) * p.speedX; // 살짝 곡선으로 흔들리며 올라감
        
        // 화면 밖(위)으로 나가면 아래에서 다시 생성
        if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
        }
    });
    
    requestAnimationFrame(animateAsh);
}

// 2. 붉은 달 스크롤 패럴랙스 (입체감 효과)
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const moon = document.querySelector('.moon-wrapper');
    const heroContent = document.querySelector('.hero-content');
    
    if (moon) {
        // 스크롤 내릴 때 달이 조금 더 천천히 아래로 내려가게 하여 깊이감 부여
        moon.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    }
    
    if (heroContent) {
        // 글자들은 살짝 위로 올라가면서 서서히 흐려짐
        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrollY * 0.002);
    }
});

// 화면 크기가 바뀔 때 캔버스 재조정
window.addEventListener('resize', initCanvas);

// 실행
initCanvas();
animateAsh();