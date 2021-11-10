<script>
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Ingresso from "../Conta/Ingresso.svelte";

  const dispatch = createEventDispatcher();

  export let dados;
</script>

<style>
  .corpo {
    width: 43%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    align-self: center;
    margin: 1rem 0 2rem 0;
  }

  .navegacao {
    margin: 3rem 0;
    display: flex;
  }

  @media print {
    .navegacao,
    h1 {
      display: none !important;
    }
  }
</style>

<div class="corpo">
  <h1>Ingressos do Evento</h1>
  {#each [...Array(dados.itensPedido.length).keys()] as i (i)}
    <Ingresso {dados} {i} />
    <br />
  {/each}

  <div class="navegacao">
    <Botao on:click={() => window.print()}>Imprimir</Botao>
    <Botao on:click={() => dispatch("detalhespedido", dados.id)}>Voltar</Botao>
  </div>
</div>
