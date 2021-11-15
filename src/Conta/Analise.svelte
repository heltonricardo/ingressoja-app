<script>
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import AnaliseGeral from "./AnaliseGeral.svelte";
  import AnaliseEvento from "./AnaliseEvento.svelte";
  import { getAnalise } from "../Conexao/produtoraConex";

  const geral = getAnalise();
  const dispatch = createEventDispatcher();

  let tipoRelatorio = "porEvento";
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

  .dados-produtora {
    margin-bottom: 2rem;
  }

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
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

  {#await geral}
    <Aguarde />
  {:then dados}
    <table class="dados-produtora">
      <tr>
        <td class="titulo">Produtora:</td>
        <td>{dados.razaoSocial}</td>
      </tr>
      <tr>
        <td class="titulo">CNPJ:</td>
        <td>{maskBr.cnpj(dados.cnpj)}</td>
      </tr>
    </table>

    <div class="opcoes">
      <label>
        <input
          type="radio"
          value="geral"
          name="tipoCadastro"
          bind:group={tipoRelatorio}
        />Visualização Geral</label
      >
      <label>
        <input
          type="radio"
          value="porEvento"
          name="tipoRelatorio"
          bind:group={tipoRelatorio}
        />Visualização por Evento</label
      >
    </div>

    {#if tipoRelatorio === "geral"}
      <AnaliseGeral {dados} />
    {:else if tipoRelatorio === "porEvento"}
      <AnaliseEvento {dados} />
    {/if}
  {/await}

  <div class="navegacao">
    <Botao on:click={() => window.print()}>Imprimir</Botao>
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
