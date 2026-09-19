// Pega referências dos elementos que já existem no HTML
const formProduto = document.querySelector("#form-produto");
const listaProdutos = document.querySelector("#lista-produtos");

// Escuta o evento de "enviar" do formulário
formProduto.addEventListener("submit", function (evento) {
  // Sem isso, o navegador recarregaria a página ao enviar o formulário
  evento.preventDefault();

  // Lê o valor digitado em cada campo
  const nome = document.querySelector("#nome").value;
  const preco = document.querySelector("#preco").value;
  const quantidade = document.querySelector("#quantidade").value;

  // Cria um novo item de lista (<li>) com o texto do produto
  const item = document.createElement("li");
  item.textContent = `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;

  // Adiciona o novo item no final da lista
  listaProdutos.appendChild(item);

  // Limpa o formulário para o próximo cadastro
  formProduto.reset();
});
