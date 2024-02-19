const form = document.getElementById("novoItem"); //capturar elemento
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find((elemento) => elemento.nome === nome.value);
  //objeto
  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;
    atualizaElemento(itemAtual);
    itens[existe.id] = itemAtual;
  } else {
    itemAtual.id = itens.length;
    console.log(itemAtual.id);
    criaElemento(itemAtual);
    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;
  novoItem.appendChild(botaoDeleta(item.id));
  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerHTML = "X";
  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  });
  return elementoBotao;
}
function deletaElemento(tag, id) {
  tag.remove();

  //remover do array
  itens.splice(itens.findIndex((elemento) => elemento.id === id, 1));

  console.log(itens);

  localStorage.setItem("itens", JSON.stringify(itens));
}
