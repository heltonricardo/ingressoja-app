<script>
  import { maskBr } from "js-brasil";

  import Aguarde from "../UI/Aguarde.svelte";
  import Grafico from "../UI/Grafico.svelte";
  import TABPRODUTORA from "../ENUM/TABPRODUTORA";
  import { valorVirgula } from "../utils/formatador";
  import { getAnaliseProdutoras } from "../Conexao/administradorConex";

  const dados = getAnaliseProdutoras();

  let ordemTabProdutoras = TABPRODUTORA.RAZAO;

  /******************************* CLASSIFICAR ********************************/

  function classificar(obj, campo) {
    return obj
      .filter((o) => o.totalVendas)
      .sort((a, b) => (a[campo] < b[campo] ? -1 : a[campo] > b[campo] ? 1 : 0));
  }

  /********************************** SOMAR ***********************************/

  function somar(obj, campo) {
    return obj.reduce((acc, curr) => acc + curr[campo], 0);
  }

  /*************************** AUTORIZAR GRÁFICOS? ****************************/

  function autorizarGraficos(obj) {
    return obj.some((o) => o[TABPRODUTORA.TOTAL_VENDAS]);
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

  .legenda {
    color: #777;
    text-align: left;
    margin-top: 0.5rem;
    align-self: flex-start;
  }

  @media print {
    .nao-imprimir {
      display: none !important;
    }
  }

  @media screen and (max-width: 50rem) {
    .tabela {
      word-break: break-all;
    }
  }
</style>

{#await dados}
  <Aguarde />
{:then dados}
  <h2 class="titulo-tabela">Produtoras</h2>
  <div class="minha-selecao nao-imprimir">
    <label for="selecao1">Ordenar por:</label>
    <select id="selecao1" bind:value={ordemTabProdutoras}>
      <option value={TABPRODUTORA.RAZAO}>Razão Social</option>
      <option value={TABPRODUTORA.TOTAL_VENDAS}>Total de vendas</option>
    </select>
  </div>
  <table class="tabela">
    <tr>
      <th>Razão Social</th>
      <th>CNPJ</th>
      <th>
        <p>Vendas</p>
        <p>totais</p>
      </th>
      <th>
        <p>Taxas</p>
        <p>totais</p>
      </th>
    </tr>
    {#each classificar(dados, ordemTabProdutoras) as produtora}
      <tr>
        <td>{produtora[TABPRODUTORA.RAZAO]}</td>
        <td>{maskBr.cnpj(produtora[TABPRODUTORA.CNPJ])}</td>
        <td>R$ {valorVirgula(produtora[TABPRODUTORA.TOTAL_VENDAS])}</td>
        <td>R$ {valorVirgula(produtora[TABPRODUTORA.TOTAL_TAXAS])}</td>
      </tr>
    {/each}
    <tr>
      <th colspan="2">Total:</th>
      <th>RS {valorVirgula(somar(dados, TABPRODUTORA.TOTAL_VENDAS))}</th>
      <th>RS {valorVirgula(somar(dados, TABPRODUTORA.TOTAL_TAXAS))}</th>
    </tr>
  </table>
  <p class="legenda">* São mostradas apenas as produtoras que possuem vendas</p>

  {#if autorizarGraficos(dados)}
    <div class="minha-selecao grafico">
      <label for="selecao2">Gráfico de: Vendas totais (R$)</label>
    </div>
    <Grafico
      legenda={TABPRODUTORA.RAZAO}
      valor={TABPRODUTORA.TOTAL_VENDAS}
      dados={dados.filter((d) => d.totalVendas)}
    />
  {/if}
{/await}
