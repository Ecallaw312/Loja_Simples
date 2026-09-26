// Pega referências dos elementos que já existem no HTML
const formProduto = document.querySelector("#form-produto");
const listaProdutos = document.querySelector("#lista-produtos");
const botaoFormulario = document.querySelector("#botao-formulario");

// Guarda o produto que está sendo editado
let itemEditando = null;

// Escuta o evento de enviar do formulário
formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // Lê os valores digitados
  const nome = document.querySelector("#nome").value;
  const preco = document.querySelector("#preco").value;
  const quantidade = document.querySelector("#quantidade").value;

  // Se estiver editando um produto
  if (itemEditando !== null) {
    itemEditando.firstChild.textContent =
      `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;

    itemEditando = null;

    formProduto.reset();

    // Volta o botão para o estado normal
    botaoFormulario.textContent = "Adicionar produto";

    return;
  }

  // Cria um novo item
  const item = document.createElement("li");

  item.textContent =
    `${nome} - R$ ${Number(preco).toFixed(2)} (${quantidade} un.)`;

  // Cria botão Editar
  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";

  botaoEditar.addEventListener("click", function () {
    itemEditando = item;

    // Coloca os dados do produto no formulário
    document.querySelector("#nome").value = nome;
    document.querySelector("#preco").value = preco;
    document.querySelector("#quantidade").value = quantidade;

    // Altera o texto do botão
    botaoFormulario.textContent = "Salvar alterações";
  });

  // Cria botão Remover
  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";

  botaoRemover.addEventListener("click", function () {
    item.remove();
  });

  // Adiciona os botões ao produto
  item.appendChild(botaoEditar);
  item.appendChild(botaoRemover);

  // Adiciona o produto à lista
  listaProdutos.appendChild(item);

  // Limpa o formulário
  formProduto.reset();
});