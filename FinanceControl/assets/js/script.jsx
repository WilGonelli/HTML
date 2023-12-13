const list = document.querySelector('.extractDetail');
const infoEnt = document.querySelector('.saldoEnt');
const saldoSai = document.querySelector('.saldoSai');
const saldoInfo = document.querySelector('.saldo');

let historico = [];
let ent = 0;
let sai = 0;
let saldo = 0;
let value;

function soma(value, tipe) {
  if (tipe === 'Entrada') {
    return (ent = ent + value);
  }
  if (tipe === 'Saida') {
    return (sai = sai + value);
  }
}

function addZero(num) {
  return num >= 10 ? num : `0${num}`;
}

function getData() {
  const data = new Date();
  const dataFormat = {
    dia: addZero(data.getDate()),
    mes: addZero(data.getMonth() + 1),
    ano: addZero(data.getFullYear()),
    hora: addZero(data.getHours()),
    min: addZero(data.getMinutes()),
  };
  return `${dataFormat.dia}/${dataFormat.mes}/${dataFormat.ano} ${dataFormat.hora}:${dataFormat.min}`;
}

function addValorList(event) {
  event.preventDefault();
  const tipe = document.querySelector('.h4').textContent;

  const descricao = document.querySelector('#descricao');
  const valor = document.querySelector('#valor');

  if (descricao.value && Number(valor.value.replace(',', '.'))) {
    value = Number(valor.value.replace(',', '.'));
    historico.unshift({
      descricao: descricao.value,
      valor: value,
      isEnt: tipe,
      date: getData(),
    });
    console.log(historico);
    soma(value, tipe);
    renderEnt();
    renderSai();
    renderHistorico();
    renderSaldo();
  }
  if (!descricao.value) {
    alert('Por favor adicione a descrição');
  } else if (!valor.value) {
    alert('Por favor, adicione um valor valido');
  }
  descricao.value = '';
  valor.value = '';
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

function renderSaldo() {
  let icon;
  saldo = ent - sai;
  let positive = Math.sign(saldo);
  if (positive < 0) {
    icon = 'iconSai';
  }
  if (positive > 0) {
    icon = 'iconEnt';
  }
  if (positive === 0) {
    icon = 'icon';
  }
  saldoInfo.innerHTML = `<p>Saldo</p>
  <p>
  ${saldo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
  <svg
    class=${icon}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 30 30">
    <path
      fill="currentColor"
      d="M5.5 5c-.655 0-.66 1.01 0 1h22c.286 0 .5.214.5.5v13c0 .66 1 
      .66 1 0v-13c0-.822-.678-1.5-1.5-1.5h-22zm-2 2c-.654 0-.654 1 0 1h22c.286 0 
      .5.214.5.5v13c0 .665 1.01.66 1 0v-13c0-.822-.678-1.5-1.5-1.5h-22zm-2 2C.678 9 0 
      9.678 0 10.5v12c0 .822.678 1.5 1.5 1.5h22c.822 0 1.5-.678 1.5-1.5v-12c0-.822-.678-1.5-1.5-1.5h-22zm0 
      1h22c.286 0 .5.214.5.5v12c0 .286-.214.5-.5.5h-22c-.286 0-.5-.214-.5-.5v-12c0-.286.214-.5.5-.5zm1 1c-.276 0-.5.224-.5.5v2c0 
      .672 1 .656 1 0V12h1.5c.672 0 .656-1 0-1h-2zm10 0C9.468 11 7 13.468 7 16.5S9.468 22 12.5 22s5.5-2.468 5.5-5.5-2.468-5.5-5.5-5.5zm8 0c-.656 
      0-.672 1 0 1H22v1.5c0 .656 1 .672 1 0v-2c0-.276-.224-.5-.5-.5h-2zm-8 1c2.49 0 4.5 2.01 4.5 4.5S14.99 21 12.5 21 8 18.99 8 16.5s2.01-4.5 4.5-4.5zm0 
      1c-.277 0-.5.223-.5.5v.594c-.578.21-1 .76-1 1.406 0 .82.68 1.5 1.5 1.5.28 0 .5.212.5.5 0 
      .288-.22.5-.5.5h-1c-.338-.005-.5.248-.5.5s.162.505.5.5h.5v.5c0 .277.223.5.5.5s.5-.223.5-.5v-.594c.578-.21 1-.76 
      1-1.406 0-.82-.68-1.5-1.5-1.5-.28 0-.5-.212-.5-.5 0-.288.22-.5.5-.5h1c.338.005.5-.248.5-.5s-.162-.505-.5-.5H13v-.5c0-.277-.223-.5-.5-.5zm-10 
      6.002c-.25-.002-.5.162-.5.498v2c0 .276.224.5.5.5h2c.656 0 .672-1 0-1H3v-1.5c0-.328-.25-.496-.5-.498zm20 0c-.25.002-.5.17-.5.498V21h-1.5c-.672 0-.656 
      1 0 1h2c.276 0 .5-.224.5-.5v-2c0-.336-.25-.5-.5-.498z" />
  </svg>
</p>`;
}

function renderHistorico() {
  list.innerHTML = '';
  for (const valor of historico) {
    list.innerHTML += `<div class="saldo">
    <p class="info">${valor.descricao}</p>
    <pre><p class="info"><b>-</b>   ${
      valor.date
    }   <b>-</b>   ${valor.valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}    ${
      valor.isEnt == 'Entrada' ? createIconEnt() : createIconSai()
    }</p></pre>
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

renderEnt();
renderSai();
renderSaldo();
