<script>
  import { createEventDispatcher } from "svelte";
  import Botao from "../UI/Botao.svelte";
  import Comprador from "./Comprador.svelte";
  import ENUM_TIPOCADASTRO from "./ENUM_TIPOCADASTRO";
  import Organizadora from "./Organizadora.svelte";

  const dispatch = createEventDispatcher();

  let tipoCadastro = ENUM_TIPOCADASTRO.COMPRADOR;
</script>

<style>
  #corpo {
    width: 50%;
    margin: 2rem auto;
  }
</style>

<div id="corpo">
  <div id="opcoes">
    <label>
      <input
        name="tipoCadastro"
        type="radio"
        value={ENUM_TIPOCADASTRO.COMPRADOR}
        bind:group={tipoCadastro}
      />
      Quero comprar ingressos!
    </label>
    <label>
      <input
        name="tipoCadastro"
        type="radio"
        value={ENUM_TIPOCADASTRO.ORGANIZADORA}
        bind:group={tipoCadastro}
      />
      Quero vender ingressos!
    </label>
  </div>

  {#if tipoCadastro === ENUM_TIPOCADASTRO.COMPRADOR}
    <Comprador />
  {:else if tipoCadastro === ENUM_TIPOCADASTRO.ORGANIZADORA}
    <Organizadora />
  {/if}

  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  <Botao>Finalizar</Botao>
</div>
