<script>
  import { createEventDispatcher } from "svelte";
  import Botao from "../UI/Botao.svelte";
  import Comprador from "./Comprador.svelte";
  import TIPOCADASTRO from "./TIPOCADASTRO";
  import Organizadora from "./Organizadora.svelte";

  const dispatch = createEventDispatcher();

  let tipoCadastro = TIPOCADASTRO.COMPRADOR;
</script>

<style>
  #corpo {
    width: 30rem;
    margin: 2rem auto;
  }

  #opcoes {
    margin: 3rem auto;
    display: flex;
    justify-content: space-between;
  }

  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }
</style>

<div id="corpo">
  <div id="opcoes">
    <label>
      <input
        name="tipoCadastro"
        type="radio"
        value={TIPOCADASTRO.COMPRADOR}
        bind:group={tipoCadastro}
      />
      Quero comprar ingressos!
    </label>

    <label>
      <input
        name="tipoCadastro"
        type="radio"
        value={TIPOCADASTRO.ORGANIZADORA}
        bind:group={tipoCadastro}
      />
      Quero vender ingressos!
    </label>
  </div>

  {#if tipoCadastro === TIPOCADASTRO.COMPRADOR}
    <Comprador />
  {:else if tipoCadastro === TIPOCADASTRO.ORGANIZADORA}
    <Organizadora />
  {/if}

  <div id="botoes">
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
    <Botao>Finalizar</Botao>
  </div>
</div>
