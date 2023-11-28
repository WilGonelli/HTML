async function getAgentDetail() {
  try {
    const agentData = sessionStorage.getItem('selectedAgent');

    if (!agentData) {
      console.log('UUID do agente não encontrado no Storage');
      return;
    }

    const agentDetail = JSON.parse(agentData);

    if (agentDetail.data) {
      //cria os botoes de abilidades do agente
      const abilitiesContainer = document.getElementById('abilities');
      const buttons = agentDetail.data.abilities.map(abilities => {
        const button = document.createElement('button');
        button.className = 'abilitiesBtn';
        const image = abilities.displayIcon;
        if (!image) {
          const tipe = abilities.slot;
          button.textContent = tipe;
        } else {
          button.style.backgroundImage = `url(${image})`;
          button.style.backgroundSize = 'cover';
          button.style.backgroundPosition = 'center';
          button.style.backgroundRepeat = 'no-repeat';
        }
        button.addEventListener('click', function () {
          buttons.forEach(newButton => newButton.classList.remove('clicked'));

          this.classList.add('clicked');
          infoAbilitie(abilities);
        });
        return button;
      });
      buttons.forEach(button => {
        abilitiesContainer.appendChild(button);
      });

      //define o nome apresentado no h1
      const agentName = agentDetail.data.displayName;
      const agentNameElement = document.getElementById('AgentName');
      agentNameElement.textContent = agentName;

      //define a informação do agente
      const agentInfo = `\t ${agentDetail.data.description}`;
      const agentInfoElement = document.getElementById('AgentInfo');
      agentInfoElement.innerHTML = `<pre style="white-space: pre-wrap;">${agentInfo}</pre>`;

      //define a imagem do agente a ser apresentado
      const agentImage = agentDetail.data.fullPortraitV2;
      const agentImageElement = document.getElementById('AgentImage');
      agentImageElement.src = agentImage;

      //define a cor de fundo da tela com opacidade de 40%
      const backgroundColor = `#${agentDetail.data.backgroundGradientColors[0].slice(
        0,
        -2,
      )}66`;
      const backgroundColorAgent = document.querySelector('.container');
      backgroundColorAgent.style.backgroundColor = backgroundColor;

      //define o plano de fundo atras de onde vai ter as infos do agente
      const backgroundImage = document.querySelector('.containerInfo');
      backgroundImage.style.backgroundImage = `url(${agentDetail.data.background})`;
    }
  } catch (error) {
    console.log(error);
  }
}
function infoAbilitie(abilities) {
  let tipe = abilities.slot;

  switch (tipe) {
    case 'Ability1':
      tipe = 'Habilidade 1';
      break;
    case 'Ability2':
      tipe = 'Habilidade 2';
      break;
    case 'Grenade':
      tipe = 'Granada';
      break;
    case 'Passive':
      tipe = 'Habilidade Passiva';
      break;
  }
  const abilitieName = `${abilities.displayName}\t -\t ${tipe}`;
  const abilitieTitle = document.getElementById('abilitieName');
  abilitieTitle.innerHTML = `<pre style="font-family: 'VALORANT', sans-serif;"> ${abilitieName} </pre>`;

  const abilitieInfo = abilities.description;
  const abilitieDescription = document.getElementById('abilitieDescription');
  abilitieDescription.innerHTML = `<pre style="white-space: pre-wrap;"> \t ${abilitieInfo}</pre>`;
}
getAgentDetail();
