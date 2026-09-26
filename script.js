const formProduto = document.querySelector("#form-produto");
const listaProdutos = document.querySelector("#lista-produtos");
const botaoFormulario = document.querySelector("#botao-formulario");
const contadorProdutos = document.querySelector("#contador-produtos");
const mensagemVazia = document.querySelector("#mensagem-vazia");
const mensagemValidacao = document.querySelector("#mensagem-validacao");

let itemEditando = null;

const produtosIniciais = [
  { nome: "Caderno", preco: 12.5, quantidade: 30 },
  { nome: "Caneta", preco: 2, quantidade: 100 },
  { nome: "Mochila", preco: 89.9, quantidade: 8 },
  { nome: "Estojo", preco: 15, quantidade: 20 },
];

function formatarPreco(preco) {
  return Number(preco).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function atualizarLista() {
  const quantidadeProdutos = listaProdutos.children.length;
  contadorProdutos.textContent = quantidadeProdutos;
  mensagemVazia.hidden = quantidadeProdutos > 0;
}

function sairDoModoEdicao() {
  itemEditando = null;
  formProduto.reset();
  botaoFormulario.textContent = "Adicionar produto";
}

function criarItemProduto(produto) {
  const item = document.createElement("li");
  const textoProduto = document.createElement("span");
  const acoesProduto = document.createElement("div");
  const botaoEditar = document.createElement("button");
  const botaoRemover = document.createElement("button");

  textoProduto.className = "texto-produto";
  acoesProduto.className = "acoes-produto";
  botaoEditar.type = "button";
  botaoEditar.textContent = "Editar";
  botaoRemover.type = "button";
  botaoRemover.textContent = "Remover";

  function atualizarTexto() {
    textoProduto.textContent =
      `${produto.nome} - R$ ${formatarPreco(produto.preco)} (${produto.quantidade} un.)`;
  }

  botaoEditar.addEventListener("click", function () {
    itemEditando = item;
    document.querySelector("#nome").value = produto.nome;
    document.querySelector("#preco").value = produto.preco;
    document.querySelector("#quantidade").value = produto.quantidade;
    mensagemValidacao.textContent = "";
    botaoFormulario.textContent = "Salvar alterações";
  });

  botaoRemover.addEventListener("click", function () {
    if (itemEditando === item) {
      sairDoModoEdicao();
    }
    item.remove();
    atualizarLista();
  });

  atualizarTexto();
  acoesProduto.appendChild(botaoEditar);
  acoesProduto.appendChild(botaoRemover);
  item.appendChild(textoProduto);
  item.appendChild(acoesProduto);

  item.atualizarProduto = function (novoProduto) {
    produto.nome = novoProduto.nome;
    produto.preco = novoProduto.preco;
    produto.quantidade = novoProduto.quantidade;
    atualizarTexto();
  };

  return item;
}

formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mensagemValidacao.textContent = "";

  const nome = document.querySelector("#nome").value.trim();
  const preco = Number(document.querySelector("#preco").value);
  const quantidade = Number(document.querySelector("#quantidade").value);

  if (quantidade <= 0) {
    mensagemValidacao.textContent = "A quantidade deve ser maior que zero.";
    return;
  }

  const produto = { nome, preco, quantidade };

  if (itemEditando !== null) {
    itemEditando.atualizarProduto(produto);
    sairDoModoEdicao();
    return;
  }

  listaProdutos.appendChild(criarItemProduto(produto));
  atualizarLista();
  formProduto.reset();
});

produtosIniciais.forEach(function (produto) {
  listaProdutos.appendChild(criarItemProduto(produto));
});

atualizarLista();
