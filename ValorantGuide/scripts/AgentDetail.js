async function getAgentDetail() {
  try {
    const agentData = sessionStorage.getItem('selectedAgent');

    if (!agentData) {
      console.log('UUID do agente não encontrado no Storage');
      return;
    }

    const agentDetail = JSON.parse(agentData);

    if (agentDetail.data) {
      const agentName = agentDetail.data.displayName;
      let agentInfo = agentDetail.data.description;
      agentInfo = '\t' + agentInfo;
      const agentImage = agentDetail.data.fullPortraitV2;
      let backgroundColor = `#${agentDetail.data.backgroundGradientColors[0]}`;
      backgroundColor = backgroundColor.slice(0, -2) + 66;

      console.log(backgroundColor);

      const abilitiesContainer = document.getElementById('abilities');
      const buttons = agentDetail.data.abilities.map(abilities => {
        const button = document.createElement('button');
        button.className = 'abilitiesBtn';
        const image = abilities.displayIcon;

        button.style.backgroundImage = `url(${image})`;
        button.style.backgroundSize = 'cover';
        button.style.backgroundPosition = 'center';
        button.style.backgroundRepeat = 'no-repeat';
        return button;
        s;
      });

      buttons.forEach(button => {
        abilitiesContainer.appendChild(button);
      });

      const agentNameElement = document.getElementById('AgentName');
      agentNameElement.textContent = agentName;

      const agentInfoElement = document.getElementById('AgentInfo');
      agentInfoElement.innerHTML = `<pre style="white-space: pre-wrap;">${agentInfo}</pre>`;

      const agentImageElement = document.getElementById('AgentImage');
      agentImageElement.src = agentImage;

      const backgroundColorAgent = document.querySelector('.container');
      backgroundColorAgent.style.backgroundColor = backgroundColor;

      const backgroundImage = document.querySelector('.containerInfo');
      backgroundImage.style.backgroundImage = `url(${agentDetail.data.background})`;
    } else {
      console.log('tetse');
    }
  } catch (error) {
    console.log(error);
  }
}
getAgentDetail();
