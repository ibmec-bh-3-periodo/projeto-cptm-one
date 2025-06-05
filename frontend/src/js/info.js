document.addEventListener('DOMContentLoaded', function() {
  // Dados completos das linhas Jade e Safira
  const linhas = {
    Jade: {
      nome: "Linha 13 - Jade",
      intervalos: {
        dias_uteis: [
          { horario: "04:00 - 04:20", intervalo_minutos: 20 },
          { horario: "04:20 - 24:00", intervalo_minutos: 15 }
        ],
        sabados: [
          { horario: "04:00 - 04:20", intervalo_minutos: 20 },
          { horario: "04:20 - 20:00", intervalo_minutos: 15 },
          { horario: "20:00 - 24:00", intervalo_minutos: 35 }
        ],
        domingos_feriados: [
          { horario: "04:00 - 24:00", intervalo_minutos: 35 }
        ]
      }
    },
    Safira: {
      nome: "Linha 12 - Safira",
      intervalos: {
        dias_uteis: [
          { horario: "04:00 - 04:30", intervalo_minutos: 10 },
          { horario: "04:30 - 08:30", intervalo_minutos: 10 },
          { horario: "08:30 - 16:00", intervalo_minutos: 8 },
          { horario: "16:00 - 20:00", intervalo_minutos: 10 },
          { horario: "20:00 - 24:00", intervalo_minutos: 10 }
        ],
        sabados: [
          { horario: "04:00 - 18:00", intervalo_minutos: 8 },
          { horario: "18:00 - 20:00", intervalo_minutos: 10 },
          { horario: "20:00 - 24:00", intervalo_minutos: 35 }
        ],
        domingos_feriados: [
          { horario: "04:00 - 24:00", intervalo_minutos: 35 }
        ]
      }
    }
  };

  function getMinutos(horaStr) {
    const [h, m] = horaStr.split(':').map(Number);
    return h * 60 + m;
  }

  function getTipoDia() {
    const hoje = new Date();
    const dia = hoje.getDay();
    if (dia === 0) return 'domingos_feriados';
    if (dia === 6) return 'sabados';
    return 'dias_uteis';
  }

  function getPeriodoAtual(intervalos, agoraMin) {
    for (const item of intervalos) {
      const [ini, fim] = item.horario.split(' - ');
      const iniMin = getMinutos(ini);
      const fimMin = getMinutos(fim);
      if (agoraMin >= iniMin && agoraMin < fimMin) {
        return { ...item, iniMin, fimMin };
      }
    }
    return null;
  }

  function getMinutosParaProximoTrem(intervaloMin, agoraMin, inicioMin) {
    if (agoraMin < inicioMin) return inicioMin - agoraMin;
    const minutosDesdeInicio = agoraMin - inicioMin;
    const minutosPassados = minutosDesdeInicio % intervaloMin;
    return minutosPassados === 0 ? 0 : intervaloMin - minutosPassados;
  }

  let popupInterval = null;

  document.querySelectorAll('.linha').forEach(div => {
    div.addEventListener('click', function() {
      const nomeLinha = this.querySelector('span').innerText.trim();
      let minutosParaProximo = 3; // padrão
      let intervaloMin = null;
      let inicioMin = null;
      let foraHorario = false;
      let periodo = null;

      if (nomeLinha === 'Jade' || nomeLinha === 'Safira') {
        const agora = new Date();
        const agoraMin = agora.getHours() * 60 + agora.getMinutes();
        const tipoDia = getTipoDia();
        const dadosLinha = linhas[nomeLinha];
        const intervalos = dadosLinha.intervalos[tipoDia];

        periodo = getPeriodoAtual(intervalos, agoraMin);

        if (periodo) {
          intervaloMin = Number(periodo.intervalo_minutos);
          inicioMin = periodo.iniMin;
          minutosParaProximo = getMinutosParaProximoTrem(intervaloMin, agoraMin, inicioMin);
        } else {
          foraHorario = true;
          minutosParaProximo = '-';
        }
      }

      document.getElementById('popup').style.display = 'flex';
      document.getElementById('popup-title').innerText = `Linha ${this.innerText.trim()}`;
      document.getElementById('popup-message').innerText = '';
      const loading = document.getElementById('loading-progress');
      loading.style.width = '0%';

      if (popupInterval) clearInterval(popupInterval);

      if (foraHorario) {
        loading.style.width = '100%';
        document.getElementById('popup-message').innerText = `Fora do horário de operação.`;
        return;
      }

      if (typeof minutosParaProximo !== 'number' || minutosParaProximo < 0) {
        loading.style.width = '100%';
        document.getElementById('popup-message').innerText = `Fora do horário de operação.`;
        return;
      }

      let minutosRestantes = minutosParaProximo;
      let totalMinutos = minutosParaProximo === 0 ? intervaloMin : minutosParaProximo;
      let progress = 0;

      function updatePopup() {
        const agora = new Date();
        const agoraMin = agora.getHours() * 60 + agora.getMinutes();

        if (nomeLinha === 'Jade' || nomeLinha === 'Safira') {
          const tipoDia = getTipoDia();
          const dadosLinha = linhas[nomeLinha];
          const intervalos = dadosLinha.intervalos[tipoDia];
          periodo = getPeriodoAtual(intervalos, agoraMin);

          if (periodo) {
            intervaloMin = Number(periodo.intervalo_minutos);
            inicioMin = periodo.iniMin;
            minutosRestantes = getMinutosParaProximoTrem(intervaloMin, agoraMin, inicioMin);
            totalMinutos = intervaloMin;
          } else {
            foraHorario = true;
            minutosRestantes = '-';
          }
        }

        if (foraHorario || typeof minutosRestantes !== 'number' || minutosRestantes < 0) {
          loading.style.width = '100%';
          document.getElementById('popup-message').innerText = `Fora do horário de operação.`;
          clearInterval(popupInterval);
          return;
        }

        progress = 100 - Math.round((minutosRestantes / totalMinutos) * 100);
        loading.style.width = progress + '%';

        if (minutosRestantes > 0) {
          document.getElementById('popup-message').innerText =
            `Próximo trem chega em ${minutosRestantes} minuto${minutosRestantes > 1 ? 's' : ''}!`;
        } else {
          document.getElementById('popup-message').innerText = `Próximo trem chegou!`;
          loading.style.width = '100%';
        }
      }

      updatePopup();

      popupInterval = setInterval(function() {
        if (foraHorario) {
          clearInterval(popupInterval);
          return;
        }
        if (typeof minutosRestantes === 'number' && minutosRestantes > 0) {
          minutosRestantes--;
          progress = 100 - Math.round((minutosRestantes / totalMinutos) * 100);
          loading.style.width = progress + '%';
          if (minutosRestantes > 0) {
            document.getElementById('popup-message').innerText =
              `Próximo trem chega em ${minutosRestantes} minuto${minutosRestantes > 1 ? 's' : ''}!`;
          } else {
            document.getElementById('popup-message').innerText = `Próximo trem chegou!`;
            loading.style.width = '100%';
            clearInterval(popupInterval);
          }
        } else {
          clearInterval(popupInterval);
        }
      }, 60000); // 1 minuto

    });
  });

  document.getElementById('close-popup').onclick = function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('loading-progress').style.width = '0%';
    document.getElementById('popup-message').innerText = '';
    if (popupInterval) clearInterval(popupInterval);
  };
});