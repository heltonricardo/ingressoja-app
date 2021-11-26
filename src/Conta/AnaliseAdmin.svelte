<script>
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import AnaliseAdminGeral from "./AnaliseAdminGeral.svelte";
  import AnaliseAdminProdutora from "./AnaliseAdminProdutora.svelte";

  const dispatch = createEventDispatcher();

  let tipoRelatorio = "geral";
</script>

<style>
  .corpo {
    width: 40%;
    min-width: 30rem;
    margin: 2rem auto;
    min-height: calc(100vh - 21rem);
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
    margin: 1rem 0 3rem 0;
  }

  .opcoes {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .navegacao {
    margin: 3rem 0;
    display: flex;
  }

  @media print {
    .corpo {
      width: 100%;
    }

    .opcoes,
    .navegacao {
      display: none !important;
    }
  }
</style>

<div class="corpo">
  <h1>Relatórios e Análises</h1>

  <div class="opcoes">
    <label>
      <input
        type="radio"
        value="geral"
        name="tipoCadastro"
        bind:group={tipoRelatorio}
      />Visualização geral</label
    >
    <label>
      <input
        type="radio"
        value="porProdutora"
        name="tipoRelatorio"
        bind:group={tipoRelatorio}
      />Visualização por produtora</label
    >
  </div>

  {#if tipoRelatorio === "geral"}
    <AnaliseAdminGeral />
  {:else if tipoRelatorio === "porProdutora"}
    <AnaliseAdminProdutora />
  {/if}

  <div class="navegacao">
    <Botao on:click={() => window.print()}>Imprimir</Botao>
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
