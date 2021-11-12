<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let titulo = "";
  export let dados = null;
  export let legenda;
  export let valor;

  let canvas;
  let tamanho = dados?.length | 0;

  let cores = [...Array(tamanho)].map(
    () =>
      "#" +
      [...Array(6)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
  );

  onMount(() => {
    new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: dados.map((d) => d[legenda]),
        datasets: [
          { backgroundColor: cores, data: dados.map((d) => d[valor]) },
        ],
      },
    });
  });
</script>

<style>
  .corpo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4rem 0;
  }

  canvas {
    max-height: 30rem;
  }
</style>

<div class="corpo">
  <h3>{titulo}</h3>
  <canvas bind:this={canvas} />
</div>
