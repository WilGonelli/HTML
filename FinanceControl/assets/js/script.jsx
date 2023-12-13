const entrada = document.querySelector('#entrada');
const descricao = entrada.querySelector('#descricao');
const valor = entrada.querySelector('#valor');
const list = document.querySelector('.extractDetail');

const saida = document.querySelector('#saida');
const descricaoSai = document.querySelector('#descricaoSai');
const valorSai = document.querySelector('#valorSai');

const infoEnt = document.querySelector('.saldoEnt');
const saldoSai = document.querySelector('.saldoSai');

let historico = [];
let ent = 0;
let sai = 0;

let isEnt;

entrada.addEventListener('submit', function (e) {
  isEnt = true;
  AddValor(e, isEnt);
});

saida.addEventListener('submit', function (e) {
  isEnt = false;
  AddValor(e, isEnt);
});

function soma() {
  if (isEnt) {
    return (ent = ent + Number(valor.value.replace(',', '.')));
  } else {
    return (sai = sai + Number(valorSai.value.replace(',', '.')));
  }
}

function AddValor(e, isEnt) {
  e.preventDefault();
  if (descricao.value && valor.value && isEnt) {
    historico.unshift({
      descricao: descricao.value,
      valor: Number(valor.value.replace(',', '.')),
      isEnt: isEnt,
    });
    descricao.value = '';
    valor.value = '';
    soma();
    renderEnt();
    renderHistorico();
    return;
  }
  if (descricaoSai.value && valorSai.value && !isEnt) {
    historico.unshift({
      descricao: descricaoSai.value,
      valor: Number(valorSai.value.replace(',', '.')),
      isEnt: isEnt,
    });
    descricaoSai.value = '';
    valorSai.value = '';
    soma();
    renderSai();
    renderHistorico();
    return;
  }
  if (!descricao.value) {
    return alert('Por favor adicione a descrição');
  }
  if (!valor.value) {
    return alert('Por favor, adicione um valor valido');
  }
  console.log('nao somo');
}

function renderEnt() {
  infoEnt.innerHTML = `<p>Entrada</p>
  <p>
  ${ent.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
  ${createIconEnt()}
  </p>`;
}

function renderSai() {
  saldoSai.innerHTML = `<p>Saida</p>
    <p>
    ${sai.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
    ${createIconSai()}
    </p>`;
}

function renderHistorico() {
  list.innerHTML = '';
  for (const valor of historico) {
    const value = valor.valor;
    list.innerHTML += `<div class="saldo">
    <p>${valor.descricao}</p>
    <p>
      ${value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
      ${valor.isEnt ? createIconEnt() : createIconSai()}
    </p>
  </div>`;
  }
}

function createIconEnt() {
  return `<svg
        class="iconEnt"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 7.41421L6.41421 6L12.0711 11.6569L17.7279 6L19.1421 7.41421L12.0711 14.4853L5 7.41421Z"
          fill="currentColor" />
        <path
          d="M19 16.3432H5V18.3432H19V16.3432Z"
          fill="currentColor" />
      </svg>`;
}

function createIconSai() {
  return `<svg
  class="iconSai"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M5 16.929L6.41421 18.3432L12.0711 12.6863L17.7279 18.3432L19.1421 16.929L12.0711 9.85789L5 16.929Z"
    fill="currentColor" />
  <path d="M19 8H5V6H19V8Z" fill="currentColor" />
</svg>`;
}
