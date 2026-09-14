const dataInicial = new Date("2023-12-01T18:55:00"); // Defina a data de início

    function atualizarContador() {
      const agora = new Date();
      let diff = agora - dataInicial;

      // Total em segundos
      let totalSegundos = Math.floor(diff / 1000);

      const anos = Math.floor(totalSegundos / (365.25 * 24 * 3600));
      totalSegundos -= anos * 365.25 * 24 * 3600;

      const dias = Math.floor(totalSegundos / (24 * 3600));
      totalSegundos -= dias * 24 * 3600;

      const horas = Math.floor(totalSegundos / 3600);
      totalSegundos -= horas * 3600;

      const minutos = Math.floor(totalSegundos / 60);
      const segundos = totalSegundos % 60;

      document.getElementById("contador").innerHTML =
        `${anos} anos, ${dias} dias, ${horas}h, ${minutos}min, ${segundos}s`;
    }

    setInterval(atualizarContador, 1000);
    atualizarContador(); // Atualiza imediatamente ao carregar