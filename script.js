// === 1. 기존 메인 페이지(index.html) 캔버스 및 패럴랙스 효과 ===
const canvas = document.getElementById('ash-canvas');
let ctx, width, height;
let particles = [];

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

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const moon = document.querySelector('.moon-wrapper');
    const heroContent = document.querySelector('.hero-content');
    if (moon) moon.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
        heroContent.style.opacity = 1 - (scrollY * 0.002);
    }
});


// === 2. Knights 페이지 모달 및 스탯 네모칸 애니메이션 ===
const knightsData = {
  jay: {
    name: "JAY", type: "Guardian", title: "형제들을 위해 기꺼이 피를 뒤집어쓴 수호자",
    image: "images/jay2.jpeg",
    story: "과거의 기억을 잃은 채 평범한 학생으로 살아가던 중, 가장 먼저 각성하여 방패를 들었다.<br>어떤 희생을 치르더라도 동료들을 지키겠다는 강한 집념을 가지고 있다.",
    stats: { def: 95, ins: 70, sur: 85 },
    skillName: "Blood Oath", skillDesc: "자신의 생명력을 불태워 아군 전체에게 절대 뚫리지 않는 피의 방벽을 부여합니다."
  },
  jake: {
    name: "JAKE", type: "Striker", title: "전장을 지배하는 피의 심판자",
    image: "images/jake2.jpeg",
    story: "가장 강력한 전투력을 지닌 전위의 칼날.<br>다르단의 군대와 맞설 때 그의 움직임은 마치 춤을 추는 것과 같다.",
    stats: { def: 60, ins: 80, sur: 75 },
    skillName: "Crimson Slash", skillDesc: "눈에 보이지 않는 속도로 돌진하여 적의 급소를 베어냅니다."
  },
  sunghoon: {
    name: "SUNGHOON", type: "Assassin", title: "그림자 속에서 움직이는 은빛 송곳니",
    image: "images/sunghoon2.jpeg",
    story: "냉철한 판단력과 얼음처럼 차가운 이성을 지닌 암살자.<br>어둠 속에서 가장 빠르게 적의 숨통을 끊는다.",
    stats: { def: 55, ins: 90, sur: 70 },
    skillName: "Shadow Pierce", skillDesc: "그림자 속으로 동화되어 적의 배후를 치명적으로 타격합니다."
  },
  jungwon: {
    name: "JUNGWON", type: "Commander", title: "운명을 이끄는 고요한 밤의 눈",
    image: "images/jungwon2.jpg",
    story: "기사단의 실질적인 리더이자 전술의 핵심.<br>전장 전체를 꿰뚫어보는 눈을 가졌으며, 흔들림 없는 결단력을 보여준다.",
    stats: { def: 75, ins: 95, sur: 80 },
    skillName: "Lunar Directive", skillDesc: "전장의 흐름을 읽고 모든 아군의 공격력과 회피율을 극대화시킵니다."
  },
  sunoo: {
    name: "SUNOO", type: "Sorcerer", title: "핏빛 장미를 피워내는 환영술사",
    image: "images/sunoo2.jpg",
    story: "아름답고도 치명적인 마법을 다루는 기사.<br>그의 미소 뒤에는 적을 혼란에 빠뜨리는 잔혹한 환영이 숨어있다.",
    stats: { def: 50, ins: 85, sur: 90 },
    skillName: "Rose Illusion", skillDesc: "치명적인 가시 덩굴을 소환하여 적들을 속박하고 환상 속에 가둡니다."
  },
  "niki": {
    name: "NIKI", type: "Berserker", title: "통제 불능의 파괴 본능",
    image: "images/niki2.jpeg",
    story: "가장 어린 기사지만, 내재된 파괴력은 누구보다 강력하다.<br>전투가 길어질수록 억눌러왔던 뱀파이어의 본성이 폭발한다.",
    stats: { def: 70, ins: 60, sur: 95 },
    skillName: "Savage Awakening", skillDesc: "이성을 잃는 대신 압도적인 파괴력과 속도를 얻어 적진을 유린합니다."
  }
};

const knightOrder = ["jay", "jake", "sunghoon", "sunoo", "jungwon", "niki"];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const knightCards = document.querySelectorAll('.knight-card');
  const modal = document.getElementById('knight-modal');

  if (modal) {
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    const modalName = document.getElementById('modal-name');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImage = document.getElementById('modal-image');
    const modalSkillName = document.getElementById('modal-skill-name');
    const modalSkillDesc = document.getElementById('modal-skill-desc');

    function renderStatBlocks(containerId, percentage) {
      const container = document.getElementById(containerId);
      if(!container) return;
      container.innerHTML = '';

      const maxBlocks = 10;
      const filledBlocks = Math.round(percentage / 10);

      for (let i = 0; i < maxBlocks; i++) {
        const block = document.createElement('div');
        block.className = 'stat-block';
        container.appendChild(block);

        if (i < filledBlocks) {
          setTimeout(() => {
            block.classList.add('filled');
          }, 100 + (i * 50));
        }
      }
    }

    function updateModalData(knightId) {
      const data = knightsData[knightId];
      if(!data) return;

      currentIndex = knightOrder.indexOf(knightId);

      modalName.innerHTML = `${data.name} <span class="type-text">/ ${data.type}</span>`;
      modalTitle.innerText = data.title;
      modalDesc.innerHTML = data.story;
      modalImage.src = data.image;
      modalSkillName.innerText = data.skillName;
      modalSkillDesc.innerText = data.skillDesc;

      renderStatBlocks('stat-def', data.stats.def);
      renderStatBlocks('stat-ins', data.stats.ins);
      renderStatBlocks('stat-sur', data.stats.sur);
    }

    knightCards.forEach(card => {
      card.addEventListener('click', () => {
        const knightId = card.getAttribute('data-id');
        updateModalData(knightId);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + knightOrder.length) % knightOrder.length;
      updateModalData(knightOrder[currentIndex]);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % knightOrder.length;
      updateModalData(knightOrder[currentIndex]);
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if(e.target === modal) closeModal();
    });
  }
});
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
