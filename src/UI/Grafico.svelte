<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import TIPOGRAFICO from "../ENUM/TIPOGRAFICO";

  export let valor;
  export let legenda;
  export let dados = null;
  export let somenteBarras = false;

  let canvas;
  let grafico;
  let tamanho = dados?.length | 0;
  let tipoGrafico = somenteBarras ? TIPOGRAFICO.BARRAS : TIPOGRAFICO.DOUGHNUT;

  $: limitarAltura = tipoGrafico !== TIPOGRAFICO.BARRAS;

  let cores = [...Array(tamanho)].map(
    () =>
      "#" +
      [...Array(6)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
  );

  let graficoConfig =
    tipoGrafico === TIPOGRAFICO.BARRAS
      ? {
          type: tipoGrafico,
          data: {
            labels: dados.map((d) => d[legenda]),
            datasets: [
              { backgroundColor: cores, data: dados.map((d) => d[valor]) },
            ],
          },
          options: {
            indexAxis: "y",
            plugins: { legend: { display: false } },
          },
        }
      : {
          type: tipoGrafico,
          data: {
            labels: dados.map((d) => d[legenda]),
            datasets: [
              { backgroundColor: cores, data: dados.map((d) => d[valor]) },
            ],
          },
        };

  onMount(() => (grafico = new Chart(canvas, graficoConfig)));

  function trocarGrafico() {
    graficoConfig =
      tipoGrafico === TIPOGRAFICO.BARRAS
        ? {
            ...graficoConfig,
            type: tipoGrafico,
            options: {
              indexAxis: "y",
              plugins: { legend: { display: false } },
            },
          }
        : {
            ...graficoConfig,
            type: tipoGrafico,
            options: null,
          };

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
  }

  p {
    font-size: 0.8rem;
    color: var(--cinza3);
  }

  .alturaMax {
    max-height: 30rem;
  }

  @media print {
    .tipo {
      display: none !important;
    }
  }
</style>

<div class="corpo">
  <p class="tipo">
    Tipo de gráfico: <span>
      <select bind:value={tipoGrafico} on:change={trocarGrafico}>
        {#if !somenteBarras}
          <option value={TIPOGRAFICO.PIE} on:click={trocarGrafico}>Pizza</option
          >
          <option value={TIPOGRAFICO.DOUGHNUT} on:click={trocarGrafico}
            >Rosca</option
          >
        {/if}
        <option value={TIPOGRAFICO.BARRAS} on:click={trocarGrafico}
          >Barras</option
        >
      </select>
    </span>
  </p>
  <canvas class:alturaMax={limitarAltura} bind:this={canvas} />
</div>
