<script>
  import { tick } from "svelte";

  import Grafico from "../UI/Grafico.svelte";
  import TABDESPESAS from "../ENUM/TABDESPESAS";
  import TABINGRESSOS from "../ENUM/TABINGRESSOS";
  import { valorVirgula } from "../utils/formatador";

  export let dados;

  let graficoUp = true;
  let idEvento = dados.eventos[0].id;
  let ordTabReceitas = TABDESPESAS.TITULO;
  let graficoReceitas = TABDESPESAS.RECEITA_BRUTA;
  let ordTabIngressos = TABINGRESSOS.TI_QUANTIDADE_VENDIDA;
  let graficoIngressos = TABINGRESSOS.TI_QUANTIDADE_VENDIDA;

  $: evento = dados.eventos.find((e) => e.id === idEvento);

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

  function autorizarGraficos(evento) {
    return evento.tiposDeIngresso.some(
      (e) => e[TABINGRESSOS.TI_QUANTIDADE_VENDIDA]
    );
  }

  /***************************** GRÁFICOS UPDATE ******************************/

  async function graficosUpdate() {
    graficoUp = false;
    await tick();
    graficoUp = true;
  }
</script>

<style>
  .selecao-evento {
    margin-top: 5rem;
  }

  .selecao-evento {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .selecao-evento label {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  .selecao-evento select {
    font-size: 1.2rem;
    text-align: center;
  }

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
  }

  select:focus {
    border-color: var(--roxo1);
    outline: none;
  }

  .margem-esquerda {
    margin-left: 0.5rem;
  }

  .tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
    word-break: break-all;
    overflow: hidden;
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

<div class="selecao-evento">
  <label for="selecao" class="nao-imprimir">Selecione o evento:</label>
  <select id="selecao" bind:value={idEvento} on:change={graficosUpdate}>
    {#each dados.eventos as eventoOpcao}
      <option value={eventoOpcao.id}>{eventoOpcao.titulo}</option>
    {/each}
  </select>
</div>

<h2 class="titulo-tabela">Tipos de Ingressos</h2>
<div class="minha-selecao nao-imprimir">
  <label for="selecao1">Ordenar por:</label>
  <select class="margem-esquerda" id="selecao1" bind:value={ordTabIngressos}>
    <option value={TABINGRESSOS.TI_NOME}>Nome</option>
    <option value={TABINGRESSOS.TI_PORCENTAGEM_VENDIDA}
      >Porcentagem de ingressos vendidos</option
    >
    <option value={TABINGRESSOS.TI_QUANTIDADE_TOTAL}
      >Ingressos colocados à venda</option
    >
    <option value={TABINGRESSOS.TI_QUANTIDADE_VENDIDA}
      >Ingressos vendidos</option
    >
  </select>
</div>
<table class="tabela">
  <tr>
    <th>Nome</th>
    <th>
      <p>Porcentagem</p>
      <p>de ingressos</p>
      <p>vendidos</p>
    </th>
    <th>
      <p>Ingressos</p>
      <p>colocados</p>
      <p>à venda</p>
    </th>
    <th>
      <p>Ingressos</p>
      <p>vendidos</p>
    </th>
  </tr>
  {#each classificar(evento.tiposDeIngresso, ordTabIngressos) as tipoIngresso}
    <tr>
      <td>{tipoIngresso[TABINGRESSOS.TI_NOME]}</td>
      <td>{tipoIngresso[TABINGRESSOS.TI_PORCENTAGEM_VENDIDA]}%</td>
      <td>{tipoIngresso[TABINGRESSOS.TI_QUANTIDADE_TOTAL]}</td>
      <td>{tipoIngresso[TABINGRESSOS.TI_QUANTIDADE_VENDIDA]}</td>
    </tr>
  {/each}
  <tr>
    <th colspan="2">Totais:</th>
    <th>{somar(evento.tiposDeIngresso, TABINGRESSOS.TI_QUANTIDADE_TOTAL)}</th>
    <th>{somar(evento.tiposDeIngresso, TABINGRESSOS.TI_QUANTIDADE_VENDIDA)}</th>
  </tr>
</table>

{#if autorizarGraficos(evento) && graficoUp}
  <div class="minha-selecao grafico">
    <label for="selecao2">Gráfico de:</label>
    <select
      id="selecao2"
      class="margem-esquerda"
      on:change={graficosUpdate}
      bind:value={graficoIngressos}
    >
      <option value={TABINGRESSOS.TI_QUANTIDADE_TOTAL}
        >Ingressos colocados à venda</option
      >
      <option value={TABINGRESSOS.TI_QUANTIDADE_VENDIDA}
        >Ingressos vendidos</option
      >
    </select>
  </div>
  <Grafico
    valor={graficoIngressos}
    dados={evento.tiposDeIngresso}
    legenda={TABINGRESSOS.TI_NOME}
  />
{/if}

<h2 class="titulo-tabela">Receitas</h2>
<div class="minha-selecao nao-imprimir">
  <label for="selecao3">Ordenar por:</label>
  <select class="margem-esquerda" id="selecao3" bind:value={ordTabReceitas}>
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
  {#each classificar(dados.eventos, ordTabReceitas) as evento}
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

<div class="minha-selecao grafico">
  <label for="selecao4">Gráfico de:</label>
  <select class="margem-esquerda" id="selecao4" bind:value={graficoReceitas}>
    <option value={TABDESPESAS.RECEITA_BRUTA}>Receita Bruta</option>
    <option value={TABDESPESAS.TOTAL_DESPESAS}>Despesas</option>
    <option value={TABDESPESAS.RECEITA_LIQUIDA}>Receita Líquida</option>
  </select>
</div>

{#if graficoReceitas === TABDESPESAS.RECEITA_BRUTA}
  <Grafico
    dados={dados.eventos}
    legenda={TABDESPESAS.TITULO}
    valor={TABDESPESAS.RECEITA_BRUTA}
  />
{:else if graficoReceitas === TABDESPESAS.TOTAL_DESPESAS}
  <Grafico
    dados={dados.eventos}
    legenda={TABDESPESAS.TITULO}
    valor={TABDESPESAS.TOTAL_DESPESAS}
  />
{:else if graficoReceitas === TABDESPESAS.RECEITA_LIQUIDA}
  <Grafico
    somenteBarras={true}
    dados={dados.eventos}
    legenda={TABDESPESAS.TITULO}
    valor={TABDESPESAS.RECEITA_LIQUIDA}
  />
{/if}
