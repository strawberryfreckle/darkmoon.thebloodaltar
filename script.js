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
// === World Map 상호작용 데이터 및 로직 ===
const worldZoneData = {
  riverfield: {
    title: "Riverfield", subtitle: "여정의 시작과 끝, 기사들의 은신처",
    tag: "Safe Zone", tagClass: "safe",
    desc: "평화로운 강변의 도시. 낮에는 평범한 학생들의 일상이 흐르지만, 밤이 되면 뱀파이어들의 은밀한 움직임이 시작됩니다. 드셀리스 아카데미가 위치해 있으며, 평화로운 모습 이면에 깊은 비밀을 숨기고 있습니다.",
    quests: [
      "메인 퀘스트: 아카데미의 숨겨진 결계 작동시키기",
      "서브 퀘스트: 밤길을 배회하는 수상한 그림자 정체 추적"
    ],
    images: [
      "images/riverfield_1.jpg", "images/riverfield_2.jpg", 
      "images/riverfield_3.jpg", "images/riverfield_4.jpg"
    ]
  },
  printanier: {
    title: "Printanier", subtitle: "정보가 오가는 안개의 거리",
    tag: "Neutral Zone", tagClass: "neutral",
    desc: "레일건 뱀파이어들의 아지트이자 오래된 주점이 자리한 길목입니다. 안개 덕분에 적들의 감시를 피하기 용이하며, 적의 심장부로 향하기 전 귀중한 정보를 수집하고 전열을 가다듬을 수 있는 쉼터입니다.",
    quests: [
      "메인 퀘스트: 주점 마스터에게 비밀 밀서 전달하기",
      "서브 퀘스트: 안개 속에서 유출된 정보 조각 회수"
    ],
    images: [
      "images/printanier_1.jpg", "images/printanier_2.jpg", 
      "images/printanier_3.jpg", "images/printanier_4.jpg"
    ]
  },
  autumbal: {
    title: "Autumbal", subtitle: "핏빛 달이 뜨는 적대 구역",
    tag: "Danger Zone", tagClass: "danger",
    desc: "적대적인 뱀파이어 세력이 지배하고 있는 회색빛 도시입니다. 높은 감시탑과 삼엄한 경비망이 사방을 조여오며, 팽팽한 긴장감 속에서 목숨을 건 치열한 생존 전투가 벌어집니다.",
    quests: [
      "메인 퀘스트: 외곽 감시탑의 동력 장치 무력화",
      "서브 퀘스트: 사냥당한 동료들의 흔적 추적 및 구출"
    ],
    images: [
      "images/autumbal_1.jpg", "images/autumbal_2.jpg", 
      "images/autumbal_3.jpg", "images/autumbal_4.jpg"
    ]
  },
  hivernal: {
    title: "Hivernal", subtitle: "가장 깊은 심연, 진실의 제단",
    tag: "Sanctuary", tagClass: "secret",
    desc: "오토널 시 최심부에 봉인된 성역입니다. 주인공들의 잃어버린 전생의 기억이 잠들어 있는 장소이자 모든 비극의 시작점인 '달의 제단'이 존재하는 곳으로, 진실을 마주하는 클라이맥스의 무대입니다.",
    quests: [
      "메인 퀘스트: 달의 제단에 봉인된 힘의 각성",
      "최종 임무: 제단의 파괴와 전생의 매듭짓기"
    ],
    images: [
      "images/hivernal_1.jpg", "images/hivernal_2.jpg", 
      "images/hivernal_3.jpg", "images/hivernal_4.jpg"
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const mapNodes = document.querySelectorAll(".map-node");
  const detailPanel = document.getElementById("location-detail-panel");

  if (!detailPanel || mapNodes.length === 0) return;

  function updateDetailPanel(locKey) {
    const data = worldZoneData[locKey];
    if (!data) return;

    const questHTML = data.quests.map(q => `<li>${q}</li>`).join("");
    const imageHTML = data.images.map(imgSrc => `
      <div class="gallery-thumb">
        <img src="${imgSrc}" alt="${data.title} 전경" onerror="this.src='images/placeholder.jpg'">
      </div>
    `).join("");

    detailPanel.style.opacity = 0;
    detailPanel.style.transform = "translateY(10px)";

    setTimeout(() => {
      detailPanel.innerHTML = `
        <div class="detail-header">
          <span class="detail-tag ${data.tagClass}">${data.tag}</span>
          <h2>${data.title}</h2>
          <p class="detail-subtitle">${data.subtitle}</p>
        </div>
        <div class="detail-body">
          <p class="detail-desc">${data.desc}</p>
          <div class="detail-quests">
            <h3>지역 임무</h3>
            <ul>${questHTML}</ul>
          </div>
          <div class="detail-gallery">
            ${imageHTML}
          </div>
        </div>
      `;
      detailPanel.style.opacity = 1;
      detailPanel.style.transform = "translateY(0)";
    }, 200);
  }

  mapNodes.forEach(node => {
    const triggerEvent = () => {
      const locKey = node.getAttribute("data-loc");
      mapNodes.forEach(n => n.classList.remove("active"));
      node.classList.add("active");
      updateDetailPanel(locKey);
    };
    node.addEventListener("click", triggerEvent);
    node.addEventListener("mouseenter", triggerEvent);
  });

  updateDetailPanel("riverfield");
});