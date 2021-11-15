<script>
  import Aguarde from "../UI/Aguarde.svelte";
  import Grafico from "../UI/Grafico.svelte";
  import TABDESPESAS from "../ENUM/TABDESPESAS";
  import TABINGRESSOS from "../ENUM/TABINGRESSOS";
  import { valorVirgula } from "../utils/formatador";

  export let dados;

  let ordemTabIngresso = TABINGRESSOS.TITULO;
  let ordemTabDespesas = TABDESPESAS.TITULO;

  $: classificarTabIngressos = (eventos) =>
    eventos.sort((e1, e2) =>
      e1[ordemTabIngresso] < e2[ordemTabIngresso]
        ? -1
        : e1[ordemTabIngresso] > e2[ordemTabIngresso]
        ? 1
        : 0
    );

  $: classificarTabDespesas = (eventos) =>
    eventos.sort((e1, e2) =>
      e1[ordemTabDespesas] < e2[ordemTabDespesas]
        ? -1
        : e1[ordemTabDespesas] > e2[ordemTabDespesas]
        ? 1
        : 0
    );

  function somar(eventos, campo) {
    return eventos.reduce((acc, curr) => acc + curr[campo], 0);
  }

  function autorizarGraficos(eventos) {
    return eventos.some((e) => e[TABINGRESSOS.INGRESSOS_VENDIDOS]);
  }
</script>

<style>
  .titulo-tabela {
    font-size: 1.8rem;
    margin-top: 4rem;
    margin-bottom: 0.5rem;
  }

  .classificacao {
    align-self: flex-end;
    margin-top: 0.5rem;
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

  .espacamento {
    height: 1rem;
  }

  @media print {
    .classificacao {
      display: none !important;
    }
  }
</style>

{#await dados}
  <Aguarde />
{:then dados}
  <h2 class="titulo-tabela">Ingressos</h2>
  <table class="tabela">
    <tr>
      <th>Nome do evento</th>
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
    </tr>
    {#each classificarTabIngressos(dados.eventos) as evento}
      <tr>
        <td>{evento.titulo}</td>
        <td>{evento.totalIngressos}</td>
        <td>{evento.porcentagemIngressosVendidos}%</td>
        <td>{evento.qntIngressosVendidos}</td>
      </tr>
    {/each}
    <tr>
      <th colspan="3">Total:</th>
      <th>{somar(dados.eventos, TABINGRESSOS.INGRESSOS_VENDIDOS)}</th>
    </tr>
  </table>
  <div class="classificacao">
    <p>
      <label class="label-selecao" for="selecao">Ordenar por:</label>
      <select id="selecao" bind:value={ordemTabIngresso}>
        <option value={TABINGRESSOS.TITULO}>Nome do Evento</option>
        <option value={TABINGRESSOS.TOTAL_INGRESSOS}
          >Ingressos colocados a venda</option
        >
        <option value={TABINGRESSOS.PORCENTAGEM_VENDIDA}
          >Porcentagem de ingressos vendidos</option
        >
        <option value={TABINGRESSOS.INGRESSOS_VENDIDOS}
          >Ingressos vendidos</option
        >
      </select>
    </p>
  </div>

  <div class="espacamento" />

  {#if autorizarGraficos(dados.eventos)}
    <div>
      <p>
        <label class="label-selecao" for="selecao">Gerar gráfico de:</label>
        <select id="selecao" bind:value={ordemTabIngresso}>
          <option value={TABINGRESSOS.TITULO}>Nome do Evento</option>
          <option value={TABINGRESSOS.TOTAL_INGRESSOS}
            >Ingressos colocados a venda</option
          >
          <option value={TABINGRESSOS.PORCENTAGEM_VENDIDA}
            >Porcentagem de ingressos vendidos</option
          >
          <option value={TABINGRESSOS.INGRESSOS_VENDIDOS}
            >Ingressos vendidos</option
          >
        </select>
      </p>
    </div>
    <Grafico
      titulo="Quantidade de ingressos vendidos por evento"
      dados={dados.eventos}
      legenda={TABINGRESSOS.TITULO}
      valor={TABINGRESSOS.INGRESSOS_VENDIDOS}
    />
  {/if}

  <h2 class="titulo-tabela">Despesas e Receitas</h2>
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
    {#each classificarTabDespesas(dados.eventos) as evento}
      <tr>
        <td>{evento.titulo}</td>
        <td>R$ {valorVirgula(evento.receitaBruta)}</td>
        <td>R$ {valorVirgula(evento.totalDespesas)}</td>
        <td>R$ {valorVirgula(evento.receitaLiquida)}</td>
      </tr>
    {/each}
    <tr>
      <th>Total:</th>
      <th>R$ {valorVirgula(somar(dados.eventos, TABDESPESAS.RECEITA_BRUTA))}</th
      >
      <th
        >R$ {valorVirgula(somar(dados.eventos, TABDESPESAS.TOTAL_DESPESAS))}</th
      >
      <th
        >R$ {valorVirgula(
          somar(dados.eventos, TABDESPESAS.RECEITA_LIQUIDA)
        )}</th
      >
    </tr>
  </table>
  <div class="classificacao">
    <p>
      <label class="label-selecao" for="selecao">Ordenar por:</label>
      <select id="selecao" bind:value={ordemTabDespesas}>
        <option value={TABDESPESAS.TITULO}>Título</option>
        <option value={TABDESPESAS.RECEITA_BRUTA}>Receita bruta</option>
        <option value={TABDESPESAS.TOTAL_DESPESAS}>Despesas</option>
        <option value={TABDESPESAS.RECEITA_LIQUIDA}>Receita líquida</option>
      </select>
    </p>
  </div>

  <div class="espacamento" />

  {#if autorizarGraficos(dados.eventos)}
    <Grafico
      titulo="Receita bruta por evento"
      dados={dados.eventos}
      legenda={TABDESPESAS.TITULO}
      valor={TABDESPESAS.RECEITA_BRUTA}
    />
  {/if}
{/await}
