<script>
  import { tick } from "svelte";

  import Grafico from "../UI/Grafico.svelte";
  import TABDESPESAS from "../ENUM/TABDESPESAS";
  import TABINGRESSOS from "../ENUM/TABINGRESSOS";
  import { porcento3, valorVirgula } from "../utils/formatador";

  export let dados;

  let graficoUp = true;
  let idEvento = dados.eventos[0].id;
  let ordTabDespesas = TABDESPESAS.VALOR;
  let ordTabReceitas = TABINGRESSOS.TI_RECEITA_GERADA;
  let graficoReceitas = TABINGRESSOS.TI_RECEITA_GERADA;
  let ordTabIngressos = TABINGRESSOS.TI_QUANTIDADE_VENDIDA;
  let graficoIngressos = TABINGRESSOS.TI_QUANTIDADE_VENDIDA;

  $: evento = dados.eventos.find((e) => e.id === idEvento);

  $: autorizarGraficos = evento.qntIngressosVendidos;

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

<h2 class="titulo-tabela">Quantidade Vendida</h2>

<!-- *********************************************************************** -->

<div class="minha-selecao nao-imprimir">
  <label for="selecao1">Ordenar por:</label>
  <select class="margem-esquerda" id="selecao1" bind:value={ordTabIngressos}>
    <option value={TABINGRESSOS.TI_NOME}>Nome do tipo de ingresso</option>
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
    <th>Nome do tipo de ingresso</th>
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
      <td>{porcento3(tipoIngresso[TABINGRESSOS.TI_PORCENTAGEM_VENDIDA])}%</td>
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
{#if autorizarGraficos && graficoUp}
  <div class="minha-selecao grafico">
    <label for="selecao2">Gráfico de:</label>
    <select
      id="selecao2"
      class="margem-esquerda"
      on:change={graficosUpdate}
      bind:value={graficoIngressos}
    >
      <option value={TABINGRESSOS.TI_QUANTIDADE_TOTAL}
        >Ingressos colocados à venda (un.)</option
      >
      <option value={TABINGRESSOS.TI_QUANTIDADE_VENDIDA}
        >Ingressos vendidos (un.)</option
      >
    </select>
  </div>
  <Grafico
    valor={graficoIngressos}
    dados={evento.tiposDeIngresso}
    legenda={TABINGRESSOS.TI_NOME}
  />
{/if}

<!-- *********************************************************************** -->

<h2 class="titulo-tabela">Receita Gerada</h2>
<div class="minha-selecao nao-imprimir">
  <label for="selecao3">Ordenar por:</label>
  <select class="margem-esquerda" id="selecao3" bind:value={ordTabReceitas}>
    <option value={TABINGRESSOS.TI_NOME}>Nome do tipo de ingresso</option>
    <option value={TABINGRESSOS.TI_VALOR}>Valor unitário</option>
    <option value={TABINGRESSOS.TI_RECEITA_GERADA}>Receita gerada</option>
  </select>
</div>
<table class="tabela">
  <tr>
    <th>Nome do tipo de ingresso</th>
    <th>
      <p>Valor</p>
      <p>Unitário</p>
    </th>
    <th>
      <p>Receita</p>
      <p>gerada</p>
    </th>
  </tr>
  {#each classificar(evento.tiposDeIngresso, ordTabReceitas) as tipoDeIngresso}
    <tr>
      <td>{tipoDeIngresso.nome}</td>
      <td>R$ {valorVirgula(tipoDeIngresso[TABINGRESSOS.TI_VALOR])}</td>
      <td>R$ {valorVirgula(tipoDeIngresso[TABINGRESSOS.TI_RECEITA_GERADA])}</td>
    </tr>
  {/each}
  <tr>
    <th colspan="2">Total:</th>
    <th
      >R$ {valorVirgula(
        somar(evento.tiposDeIngresso, TABINGRESSOS.TI_RECEITA_GERADA)
      )}</th
    >
  </tr>
</table>
{#if autorizarGraficos && graficoUp}
  <div class="minha-selecao grafico">
    <label for="selecao4">Gráfico de:</label>
    <select
      id="selecao4"
      class="margem-esquerda"
      on:change={graficosUpdate}
      bind:value={graficoReceitas}
    >
      <option value={TABINGRESSOS.TI_VALOR}>Valor unitário (R$)</option>
      <option value={TABINGRESSOS.TI_RECEITA_GERADA}>Receita gerada (R$)</option
      >
    </select>
  </div>
  <Grafico
    valor={graficoReceitas}
    legenda={TABINGRESSOS.TI_NOME}
    dados={evento.tiposDeIngresso}
  />
{/if}

<!-- *********************************************************************** -->

<h2 class="titulo-tabela">Despesas</h2>
<div class="minha-selecao nao-imprimir">
  <label for="selecao3">Ordenar por:</label>
  <select class="margem-esquerda" id="selecao3" bind:value={ordTabDespesas}>
    <option value={TABDESPESAS.DESCRICAO}>Descrição</option>
    <option value={TABDESPESAS.VALOR}>Valor</option>
  </select>
</div>
<table class="tabela">
  <tr>
    <th>Descrição</th>
    <th> Valor </th>
  </tr>
  {#each classificar(evento.despesas, ordTabDespesas) as despesa}
    <tr>
      <td>{despesa.descricao}</td>
      <td>R$ {valorVirgula(despesa[TABDESPESAS.VALOR])}</td>
    </tr>
  {/each}
  <tr>
    <th>Total:</th>
    <th>R$ {valorVirgula(somar(evento.tiposDeIngresso, TABDESPESAS.VALOR))}</th>
  </tr>
</table>
{#if autorizarGraficos && graficoUp}
  <div class="minha-selecao grafico">
    <p>Gráfico de: Valor (R$)</p>
  </div>
  <Grafico
    dados={evento.despesas}
    valor={TABDESPESAS.VALOR}
    legenda={TABDESPESAS.DESCRICAO}
  />
{/if}
