<script>
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Grafico from "../UI/Grafico.svelte";
  import ANALISEGERAL from "../ENUM/ANALISEGERAL";
  import { valorVirgula } from "../utils/formatador";
  import { getAnalise } from "../Conexao/produtoraConex";

  const dispatch = createEventDispatcher();
  const geral = getAnalise();

  let carregando = false;
  let tipoRelatorio = "geral";
  let ordem = ANALISEGERAL.TITULO;

  $: classificar = (eventos) =>
    eventos.sort((e1, e2) =>
      e1[ordem] < e2[ordem] ? -1 : e1[ordem] > e2[ordem] ? 1 : 0
    );

  function somar(eventos, campo) {
    return eventos.reduce((acc, curr) => acc + curr[campo], 0);
  }

  function autorizarGraficos(eventos) {
    return eventos.some((e) => e[ANALISEGERAL.INGRESSOS_VENDIDOS]);
  }
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
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .dados-produtora {
    margin-bottom: 2rem;
  }

  .label-selecao {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  select {
    font: inherit;
    align-self: center;
    width: 100%;
    margin-bottom: 2rem;
    border: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  select:focus {
    border-color: var(--roxo1);
    outline: none;
  }

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
  }

  .tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
    word-break: break-all;
  }

  .tabela td,
  .tabela th {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }

  .tabela tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .tabela tr:nth-child(odd) {
    background-color: var(--branco);
  }

  .tabela tr:hover {
    background-color: #ddd;
  }

  .tabela th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--verde2);
    color: black;
    text-align: center;
    word-break: keep-all;
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
    .classificacao,
    .navegacao {
      display: none !important;
    }
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  <h1>Relatórios e Análises</h1>

  {#await geral}
    <Aguarde />
  {:then produtora}
    <table class="dados-produtora">
      <tr>
        <td class="titulo">Produtora:</td>
        <td>{produtora.razaoSocial}</td>
      </tr>
      <tr>
        <td class="titulo">CNPJ:</td>
        <td>{maskBr.cnpj(produtora.cnpj)}</td>
      </tr>
    </table>
  {/await}

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

  <!-- --------------------------------------------------------------------- -->

  {#if tipoRelatorio === "geral"}
    {#await geral}
      <Aguarde />
    {:then geral}
      <div class="classificacao">
        <p>
          <label class="label-selecao" for="selecao">Ordenar por:</label>
          <select id="selecao" bind:value={ordem}>
            <option value={ANALISEGERAL.INGRESSOS_VENDIDOS}
              >Ingressos vendidos</option
            >
            <option value={ANALISEGERAL.PORCENTAGEM_VENDIDA}
              >Porcentagem de ingressos vendidos</option
            >
            <option value={ANALISEGERAL.RECEITA_LIQUIDA}>Receita líquida</option
            >
            <option value={ANALISEGERAL.TITULO}>Título</option>
            <option value={ANALISEGERAL.TOTAL_INGRESSOS}
              >Ingressos colocados a venda</option
            >
          </select>
        </p>
      </div>

      <table class="tabela">
        <tr>
          <th>Evento</th>
          <th>
            <p>Ingressos</p>
            <p>colocados</p>
            <p>a venda</p>
          </th>
          <th>
            <p>Porcentagem</p>
            <p>de ingressos</p>
            <p>vendidos</p>
          </th>
          <th>
            <p>Ingressos</p>
            <p>vendidos</p>
          </th>
          <th>
            <p>Receita</p>
            <p>líquida</p>
          </th>
        </tr>
        {#each classificar(geral.eventos) as evento}
          <tr>
            <td>{evento.titulo}</td>
            <td>{evento.totalIngressos}</td>
            <td>{evento.porcentagemIngressosVendidos}%</td>
            <td>{evento.qntIngressosVendidos}</td>
            <td>R$ {valorVirgula(evento.receitaLiquida)}</td>
          </tr>
        {/each}
        <tr>
          <th colspan="3">Totais:</th>
          <th>{somar(geral.eventos, ANALISEGERAL.INGRESSOS_VENDIDOS)}</th>
          <th
            >R$ {valorVirgula(
              somar(geral.eventos, ANALISEGERAL.RECEITA_LIQUIDA)
            )}</th
          >
        </tr>
      </table>

      {#if autorizarGraficos(geral.eventos)}
        <div class="graficos">
          <Grafico
            titulo="Quantidade de ingressos vendidos por evento"
            dados={geral.eventos}
            legenda={ANALISEGERAL.TITULO}
            valor={ANALISEGERAL.INGRESSOS_VENDIDOS}
          />
          <Grafico
            titulo="Receita líquida por evento"
            dados={geral.eventos}
            legenda={ANALISEGERAL.TITULO}
            valor={ANALISEGERAL.RECEITA_LIQUIDA}
          />
        </div>
      {/if}
    {/await}
  {/if}

  <!-- --------------------------------------------------------------------- -->
  <div class="navegacao">
    <Botao on:click={() => window.print()}>Imprimir</Botao>
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
