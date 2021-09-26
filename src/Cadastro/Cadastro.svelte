<script>
  import Comprador from "./Comprador.svelte";
  import Produtora from "./Produtora.svelte";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import autenticacao from "../Autenticacao/autenticacao";

  let tipoCadastro = TIPOCADASTRO.COMPRADOR;

  export let dados = null;

  if (dados) {
    tipoCadastro = autenticacao.tipoLogado();
  }
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
    margin-bottom: 3rem;
  }

  #opcoes {
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-between;
  }
</style>

<div id="corpo">
  {#if !dados}
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
  {:else}
    <h1>Atualize seu Cadastro</h1>
  {/if}

  {#if tipoCadastro === TIPOCADASTRO.COMPRADOR}
    <Comprador {dados} on:voltar on:meusdados />
  {:else if tipoCadastro === TIPOCADASTRO.PRODUTORA}
    <Produtora {dados} on:voltar on:meusdados />
  {/if}
</div>
