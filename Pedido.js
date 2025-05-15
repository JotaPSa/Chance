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
  if (!section) return;
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

function substituirDatas() {
  const dataConhecimento = new Date("2025-03-08");
  const dataBeijo = new Date("2025-04-05");
  const hoje = new Date();

  const diffConhecimento = Math.floor((hoje - dataConhecimento) / (1000 * 60 * 60 * 24));
  const diffBeijo = Math.floor((hoje - dataBeijo) / (1000 * 60 * 60 * 24));

  document.querySelectorAll(".typing").forEach(el => {
    let texto = el.getAttribute("data-text");
    if (!texto) return;
    texto = texto.replace(/\[\[tempoConhecimento\]\]/g, diffConhecimento);
    texto = texto.replace(/\[\[tempoBeijo\]\]/g, diffBeijo);
    el.setAttribute("data-text", texto);
  });
}

// Botões "Sim" e "Não" com brincadeira
window.onload = () => {
  substituirDatas();
  startTyping(document.querySelector(".section.active"));

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const finalScreen = document.getElementById("final-screen");

  // Mostrar tela final quando clicar em SIM
  yesBtn.addEventListener("click", () => {
    finalScreen.classList.add("show");
  });

  // Botão NÃO foge do clique
  noBtn.style.position = "absolute";
  noBtn.style.transition = "all 0.3s ease";

  noBtn.addEventListener("mouseenter", () => {
    // Área visível do botão pai (div.buttons)
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    // Gera posições aleatórias dentro do container
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
  });
};
