<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import TIPOGRAFICO from "../ENUM/TIPOGRAFICO";

  export let titulo = "";
  export let dados = null;
  export let legenda;
  export let valor;

  let canvas;
  let limitarAltura = true;
  let grafico;
  let tamanho = dados?.length | 0;
  let tipoGrafico = TIPOGRAFICO.PIE;

  let cores = [...Array(tamanho)].map(
    () =>
      "#" +
      [...Array(6)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
  );

  let graficoConfig = {
    type: tipoGrafico,
    data: {
      labels: dados.map((d) => d[legenda]),
      datasets: [{ backgroundColor: cores, data: dados.map((d) => d[valor]) }],
    },
  };

  onMount(() => {
    grafico = new Chart(canvas, graficoConfig);
  });

  function trocarGrafico() {
    if (tipoGrafico === TIPOGRAFICO.BARRAS) {
      limitarAltura = false;
      graficoConfig = {
        ...graficoConfig,
        type: tipoGrafico,
        options: {
          indexAxis: "y",
          legend: { display: false },
        },
      };
    } else {
      limitarAltura = true;
      graficoConfig = {
        ...graficoConfig,
        type: tipoGrafico,
        options: {},
      };
    }

    grafico.destroy();
    grafico = new Chart(canvas, graficoConfig);
  }
</script>

<style>
  .corpo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem 0;
  }

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.8rem;
    color: var(--cinza3);
  }

  .alturaMax {
    max-height: 30rem;
  }
</style>

<div class="corpo">
  <h3>{titulo}</h3>
  <p class="tipo">
    Tipo de gráfico: <span>
      <select bind:value={tipoGrafico} on:change={trocarGrafico}>
        <option value={TIPOGRAFICO.PIE} on:click={trocarGrafico}>Pizza</option>
        <option value={TIPOGRAFICO.DOUGHNUT} on:click={trocarGrafico}
          >Rosca</option
        >
        <option value={TIPOGRAFICO.BARRAS} on:click={trocarGrafico}
          >Barras</option
        >
      </select>
    </span>
  </p>
  <canvas class:alturaMax={limitarAltura} bind:this={canvas} />
</div>
