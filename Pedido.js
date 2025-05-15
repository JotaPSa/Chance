function showNext(index) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section, i) => {
    section.classList.remove("active");
    if (i === index) {
      section.classList.add("active");
      startTyping(section);
    }
  });
}

function startTyping(section) {
  const elements = section.querySelectorAll(".typing");
  elements.forEach(el => {
    const text = el.getAttribute("data-text");
    el.innerHTML = "";
    let i = 0;
    const speed = 30;

    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  });
}

document.getElementById("btn-aceitar").addEventListener("click", () => {
  document.getElementById("final-screen").classList.add("show");
});
document.getElementById("btn-aceitar-2").addEventListener("click", () => {
  document.getElementById("final-screen").classList.add("show");
});

// Substituir datas
function substituirDatas() {
  const dataConhecimento = new Date("2025-03-08");
  const dataBeijo = new Date("2025-04-05");
  const hoje = new Date();

  const diffConhecimento = Math.floor((hoje - dataConhecimento) / (1000 * 60 * 60 * 24));
  const diffBeijo = Math.floor((hoje - dataBeijo) / (1000 * 60 * 60 * 24));

  document.querySelectorAll(".typing").forEach(el => {
    let texto = el.getAttribute("data-text");
    if (!texto) return;
    texto = texto.replace("[[tempoConhecimento]]", diffConhecimento);
    texto = texto.replace("[[tempoBeijo]]", diffBeijo);
    el.setAttribute("data-text", texto);
  });
}

// Botão "Não" fujão
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

function moveButton() {
  const container = document.querySelector(".buttons");
  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = container.offsetWidth - btnRect.width;
  const maxY = container.offsetHeight - btnRect.height;

  const randX = Math.floor(Math.random() * maxX);
  const randY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randX}px`;
  noBtn.style.top = `${randY}px`;
}

// Fugir ao passar o mouse (PC)
noBtn.addEventListener("mouseenter", moveButton);

// Fugir ao tentar tocar (mobile)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveButton();
});

// Impede clique
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveButton();
});

window.onload = () => {
  substituirDatas();
  startTyping(document.querySelector(".section.active"));
};
