<script>
  import { tick } from "svelte";

  import Grafico from "../UI/Grafico.svelte";
  import TABDESPESAS from "../ENUM/TABDESPESAS";
  import TABINGRESSOS from "../ENUM/TABINGRESSOS";
  import { valorVirgula, porcento3 } from "../utils/formatador";

  export let dados;

  let graficoUp = true;
  let ordemTabDespesas = TABDESPESAS.TITULO;
  let ordemTabIngresso = TABINGRESSOS.TITULO;
  let graficoDespesas = TABDESPESAS.RECEITA_BRUTA;
  let graficoIngressos = TABINGRESSOS.INGRESSOS_VENDIDOS;

  /******************************* CLASSIFICAR ********************************/

  function classificar(eventos, campo) {
    return eventos.sort((e1, e2) =>
      e1[campo] < e2[campo] ? -1 : e1[campo] > e2[campo] ? 1 : 0
    );
  }

  /********************************** SOMAR ***********************************/

  function somar(eventos, campo) {
    return eventos.reduce((acc, curr) => acc + curr[campo], 0);
  }

  /*************************** AUTORIZAR GRÁFICOS? ****************************/

  function autorizarGraficos(eventos) {
    return eventos.some((e) => e[TABINGRESSOS.INGRESSOS_VENDIDOS]);
  }

  /***************************** GRÁFICOS UPDATE ******************************/

  async function graficosUpdate() {
    graficoUp = false;
    await tick();
    graficoUp = true;
  }
</script>

<style>
  .titulo-tabela {
    font-size: 3rem;
    text-align: center;
    align-self: center;
    margin: 5rem 0 1rem 0;
  }

  .minha-selecao {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  .grafico {
    width: fit-content;
    margin: 4rem auto 2rem;
  }

  select {
    font: inherit;
    border: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0;
    transition: border-color 0.1s ease-out;
    resize: none;
    margin-left: 0.5rem;
  }

  select:focus {
    border-color: var(--roxo1);
    outline: none;
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

  @media print {
    .nao-imprimir {
      display: none !important;
    }
  }
</style>

<h2 class="titulo-tabela">Ingressos</h2>
<div class="minha-selecao nao-imprimir">
  <label for="selecao1">Ordenar por:</label>
  <select id="selecao1" bind:value={ordemTabIngresso}>
    <option value={TABINGRESSOS.TITULO}>Nome do Evento</option>
    <option value={TABINGRESSOS.TOTAL_INGRESSOS}
      >Ingressos colocados a venda</option
    >
    <option value={TABINGRESSOS.PORCENTAGEM_VENDIDA}
      >Porcentagem de ingressos vendidos</option
    >
    <option value={TABINGRESSOS.INGRESSOS_VENDIDOS}>Ingressos vendidos</option>
  </select>
</div>
<table class="tabela">
  <tr>
    <th>Nome do evento</th>
    <th>
      <p>Ingressos</p>
      <p>colocados</p>
      <p>à venda</p>
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
  </tr>
  {#each classificar(dados.eventos, ordemTabIngresso) as evento}
    <tr>
      <td>{evento.titulo}</td>
      <td>{evento.totalIngressos}</td>
      <td>{porcento3(evento.porcentagemIngressosVendidos)}%</td>
      <td>{evento.qntIngressosVendidos}</td>
    </tr>
  {/each}
  <tr>
    <th colspan="3">Total:</th>
    <th>{somar(dados.eventos, TABINGRESSOS.INGRESSOS_VENDIDOS)}</th>
  </tr>
</table>

{#if autorizarGraficos(dados.eventos) && graficoUp}
  <div class="minha-selecao grafico">
    <label for="selecao2">Gráfico de:</label>
    <select
      id="selecao2"
      on:change={graficosUpdate}
      bind:value={graficoIngressos}
    >
      <option value={TABINGRESSOS.TOTAL_INGRESSOS}
        >Ingressos colocados a venda (un.)</option
      >
      <option value={TABINGRESSOS.INGRESSOS_VENDIDOS}
        >Ingressos vendidos (un.)</option
      >
    </select>
  </div>
  <Grafico
    dados={dados.eventos}
    valor={graficoIngressos}
    legenda={TABINGRESSOS.TITULO}
  />
{/if}

<h2 class="titulo-tabela">Receitas e Despesas</h2>
<div class="minha-selecao nao-imprimir">
  <label for="selecao3">Ordenar por:</label>
  <select id="selecao3" bind:value={ordemTabDespesas}>
    <option value={TABDESPESAS.TITULO}>Título</option>
    <option value={TABDESPESAS.RECEITA_BRUTA}>Receita bruta</option>
    <option value={TABDESPESAS.TOTAL_DESPESAS}>Despesas</option>
    <option value={TABDESPESAS.RECEITA_LIQUIDA}>Receita líquida</option>
  </select>
</div>
<table class="tabela">
  <tr>
    <th>Nome do evento</th>
    <th>
      <p>Receita</p>
      <p>bruta</p>
    </th>
    <th>Despesas</th>
    <th>
      <p>Receita</p>
      <p>líquida</p>
    </th>
  </tr>
  {#each classificar(dados.eventos, ordemTabDespesas) as evento}
    <tr>
      <td>{evento.titulo}</td>
      <td>R$ {valorVirgula(evento.receitaBruta)}</td>
      <td>R$ {valorVirgula(evento.totalDespesas)}</td>
      <td>R$ {valorVirgula(evento.receitaLiquida)}</td>
    </tr>
  {/each}
  <tr>
    <th>Totais:</th>
    <th>R$ {valorVirgula(somar(dados.eventos, TABDESPESAS.RECEITA_BRUTA))}</th>
    <th>R$ {valorVirgula(somar(dados.eventos, TABDESPESAS.TOTAL_DESPESAS))}</th>
    <th>R$ {valorVirgula(somar(dados.eventos, TABDESPESAS.RECEITA_LIQUIDA))}</th
    >
  </tr>
</table>

{#if autorizarGraficos(dados.eventos) && graficoUp}
  <div class="minha-selecao grafico">
    <label for="selecao4">Gráfico de:</label>
    <select
      id="selecao4"
      on:change={graficosUpdate}
      bind:value={graficoDespesas}
    >
      <option value={TABDESPESAS.RECEITA_BRUTA}>Receita Bruta (R$)</option>
      <option value={TABDESPESAS.TOTAL_DESPESAS}>Despesas (R$)</option>
      <option value={TABDESPESAS.RECEITA_LIQUIDA}>Receita Líquida (R$)</option>
    </select>
  </div>
  <Grafico
    dados={dados.eventos}
    valor={graficoDespesas}
    legenda={TABDESPESAS.TITULO}
    somenteBarras={graficoDespesas === TABDESPESAS.RECEITA_LIQUIDA}
  />
{/if}
