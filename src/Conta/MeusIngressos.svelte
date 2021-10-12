<script>
  import { createEventDispatcher } from "svelte";

  import Ingresso from "../Conta/Ingresso.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";

  const dispatch = createEventDispatcher();

  export let dados;
</script>

<style>
  #corpo {
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

  #navegacao {
    margin: 3rem 0;
    display: flex;
  }
</style>

<div id="corpo">
  {#each [...Array(dados.itensPedido.length).keys()] as i (i)}
    <Ingresso {dados} {i} />
    <br />
  {/each}

  <div id="navegacao">
    <MiniBotao on:click={window.print}>Imprimir</MiniBotao>
    <MiniBotao on:click={() => dispatch("meuspedidos")}>Voltar</MiniBotao>
  </div>
</div>
