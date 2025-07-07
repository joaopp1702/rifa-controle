import { db, ref, get, set } from "./firebase.js";

const cotasContainer = document.getElementById("cotas");
const TOTAL_COTAS = 50;
let cotasSelecionadas = [];

async function atualizarCotas() {
  try {
    const snapshot = await get(ref(db, "cotas"));
    const ocupadas = snapshot.val() || {};
    cotasContainer.innerHTML = "";
    cotasSelecionadas = [];

    for (let i = 1; i <= TOTAL_COTAS; i++) {
      const cota = document.createElement("div");
      cota.textContent = i;

      if (ocupadas[i]) {
        cota.classList.add("ocupada");
        cota.style.background = "#999";
        cota.style.color = "#fff";
        cota.style.cursor = "not-allowed";
      } else {
        cota.onclick = () => {
          if (cota.classList.contains("selecionada")) {
            cota.classList.remove("selecionada");
            cotasSelecionadas = cotasSelecionadas.filter(n => n !== i);
          } else {
            cota.classList.add("selecionada");
            cotasSelecionadas.push(i);
          }
        };
      }

      cotasContainer.appendChild(cota);
    }
  } catch (error) {
    console.error("Erro ao carregar cotas do Firebase:", error);
  }
}

async function confirmarCotas() {
  if (cotasSelecionadas.length === 0) {
    alert("Selecione pelo menos uma cota.");
    return;
  }

  const nome = prompt("Digite seu nome ou apelido:");
  const whatsapp = prompt("Digite seu número de WhatsApp:");

  if (!nome || !whatsapp) {
    alert("Nome e WhatsApp são obrigatórios!");
    return;
  }

  try {
    const snapshot = await get(ref(db, "cotas"));
    const ocupadas = snapshot.val() || {};
    const indisponiveis = cotasSelecionadas.filter(num => ocupadas[num]);

    if (indisponiveis.length > 0) {
      alert("As seguintes cotas já foram reservadas: " + indisponiveis.join(", ") + ". Selecione outras.");
      await atualizarCotas();
      return;
    }

    for (const numero of cotasSelecionadas) {
      await set(ref(db, "cotas/" + numero), {
        nome: nome,
        whatsapp: whatsapp,
        status: "reservada"
      });
    }

const query = `?nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(whatsapp)}&cotas=${cotasSelecionadas.join(",")}`;
    window.location.href = "pagamento.html" + query;
  } catch (error) {
    console.error("Erro ao salvar cotas no Firebase:", error);
  }
}

// Exportar a função para usar no HTML no botão
export { confirmarCotas };

// Carrega as cotas na tela ao iniciar
atualizarCotas();
