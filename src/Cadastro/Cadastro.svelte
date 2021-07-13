<script>
  import Comprador from "./Comprador.svelte";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import Produtora from "./Produtora.svelte";

  let tipoCadastro = TIPOCADASTRO.COMPRADOR;
</script>

<style>
  #corpo {
    width: 35%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
    min-height: calc(100vh - 20rem);
  }

  h1 {
    text-align: center;
    font-size: 3rem;
  }

  #opcoes {
    margin: 3rem 0;
    display: flex;
    justify-content: space-between;
  }
</style>

<div id="corpo">
  <h1>Faça seu Cadastro</h1>
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
        value={TIPOCADASTRO.PRODUTORA}
        bind:group={tipoCadastro}
      />
      Quero vender ingressos!
    </label>
  </div>

  {#if tipoCadastro === TIPOCADASTRO.COMPRADOR}
    <Comprador on:voltar />
  {:else if tipoCadastro === TIPOCADASTRO.PRODUTORA}
    <Produtora on:voltar />
  {/if}
</div>
