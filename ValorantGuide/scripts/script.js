async function getAgents() {
  try {
    const apiUrl = `https://valorant-api.com/v1/agents/`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.data) {
      const agentButtonContainer = document.getElementById('agentes');

      const buttons = data.data.map(agent => {
        if (agent.isPlayableCharacter) {
          const button = document.createElement('button');
          button.textContent = agent.displayName;

          button.className = 'btnAgents';

          const image = agent.displayIcon;
          button.style.backgroundImage = `url(${image})`;
          button.style.backgroundSize = 'cover';
          button.style.backgroundPosition = 'center';
          button.style.backgroundRepeat = 'no-repeat';
          button.style.color = `#${agent.backgroundGradientColors[2]}`;

          button.addEventListener('click', () => {
            hadleAgentClick(agent.uuid, agent.displayName);
          });

          return button;
        } else {
          return null;
        }
      });
      buttons
        .filter(button => button !== null)
        .forEach(button => {
          agentButtonContainer.appendChild(button);
        });
    }

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function hadleAgentClick(agentUuid, agentDisplayName) {
  const apiUrl = `https://valorant-api.com/v1/agents/${agentUuid}?language=pt-BR`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data);

  const detailAgent = `agent_detail.html?Agent=${agentDisplayName}`;

  sessionStorage.setItem('selectedAgent', JSON.stringify(data));

  window.location.href = detailAgent;
}
getAgents();
