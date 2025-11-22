let cardContainer = document.querySelector(".card-container");
let dados = [];

async function IniciarBusca() {
   // Fetch data only once if not already fetched
   if (dados.length === 0) {
      try {
         let resposta = await fetch("data.json");
         dados = await resposta.json();
      } catch (error) {
         console.error("Erro ao carregar os dados:", error);
         cardContainer.innerHTML = '<p class="no-results">Erro ao carregar as linguagens. Tente novamente mais tarde.</p>';
         return;
      }
   }

   // Get the search input value
   const searchInput = document.querySelector('input[type="text"]');
   const searchTerm = searchInput.value.toLowerCase().trim();

   let dadosFiltrados = [];

   if (searchTerm === "") {
      // If search term is empty, display all data
      dadosFiltrados = dados;
   } else {
      // Filter data based on search term in nome or descrição
      dadosFiltrados = dados.filter(dado =>
         dado.nome.toLowerCase().includes(searchTerm) ||
         dado.descrição.toLowerCase().includes(searchTerm)
      );
   }

   // Clear existing cards before rendering new ones
   cardContainer.innerHTML = '';

   // Render the filtered (or all) cards
   renderizarCards(dadosFiltrados);
}

function renderizarCards(dadosParaRenderizar) {
   if (dadosParaRenderizar.length === 0) {
      cardContainer.innerHTML = '<p class="no-results">Nenhum resultado encontrado para sua busca.</p>';
      return;
   }
   for(let dado of dadosParaRenderizar) {
      let article = document.createElement("article");
      article.classList.add("card");
      // Remove citation numbers like [1], [3] from the description
      let cleanDescription = dado.descrição.replace(/\s\[\d+\]/g, '');
      article.innerHTML = `
         <h2>${dado.nome}</h2>
         <p>${dado.ano}</p>
         <p>${cleanDescription}</p>
         <a href="${dado.link}" target="_blank">Acesse a documentação</a>
      `;
      cardContainer.appendChild(article);
   }
}

// Initial call to display all languages when the page loads
document.addEventListener('DOMContentLoaded', IniciarBusca);