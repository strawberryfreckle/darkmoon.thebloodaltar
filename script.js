// 1. 흩날리는 핏빛 재(Ash) 캔버스 이펙트
const canvas = document.getElementById('ash-canvas');
let ctx, width, height;
let particles = [];

// 캔버스가 있는 페이지(index.html)에서만 실행되도록 보호장치 추가!
if (canvas) {
    ctx = canvas.getContext('2d');
    initCanvas();
    animateAsh();
    window.addEventListener('resize', initCanvas);
}

function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 1,
            opacity: Math.random() * 0.6 + 0.2
        });
    }
}

function animateAsh() {
    ctx.clearRect(0, 0, width, height); 
    
    particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 60, 20, ${p.opacity})`;
        ctx.shadowColor = "rgba(255, 25, 10, 0.8)";
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.02) * p.speedX; 
        
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
        moon.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    }
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrollY * 0.002);
    }
});
