<script>
  import { maskBr } from "js-brasil";

  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { valorVirgula } from "../utils/formatador";
  import { getPedidosPagina } from "../Conexao/pedidoConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  let pagina = 0;
  let fonte = "todos";

  $: dados = fonte === "todos" ? getPedidosPagina(pagina) : null;

  function acessarPagina(num) {
    dados = getPedidosPagina(num);
  }

  function paginaAnterior() {
    acessarPagina(--pagina);
  }

  function proxPagina() {
    acessarPagina(++pagina);
  }

  function isPrimeiraPagina() {
    return pagina === 0;
  }

  function isUltimaPagina(ultima) {
    return pagina === ultima;
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

  .paginacao {
    width: 100%;
    margin: 0.5rem 0;
  }

  .controles {
    display: flex;
    margin-top: 1rem;
  }
</style>

{#await dados}
  <Aguarde />
{:then dados}
  <h2 class="titulo-tabela">Pedidos</h2>
  <div class="minha-selecao nao-imprimir">
    <label for="selecao1">Modo:</label>
    <select id="selecao1" bind:value={fonte}>
      <option value="todos">Exibir todos</option>
      <option value="filtrar">Filtrar por data</option>
    </select>
  </div>
  {#if dados.pedidos.length}
    <table class="tabela">
      <tr>
        <th>Id</th>
        <th>CPF</th>
        <th>Data</th>
        <th>Valor</th>
        <th>
          <p>Taxa da</p>
          <p>Plataforma</p>
        </th>
      </tr>
      {#each dados.pedidos as pedido (pedido.id)}
        <tr>
          <td>{pedido.id}</td>
          <td>{maskBr.cpf(pedido.cpf)}</td>
          <td>{extrairDataHora(pedido.dataHora).dataCompletaBarras}</td>
          <td>R$ {valorVirgula(pedido.valorTotal)}</td>
          <td>R$ {valorVirgula(pedido.taxaPlataforma)}</td>
        </tr>
      {/each}
    </table>
    <p class="paginacao">
      Exibindo página {pagina + 1} de {dados.ultimaPagina + 1}
    </p>
    {#if fonte === "todos"}
      <div class="controles">
        <MiniBotao
          on:click={paginaAnterior}
          habilitado={!isPrimeiraPagina()}
          invalido={isPrimeiraPagina()}>← Página anterior</MiniBotao
        >
        <MiniBotao
          on:click={proxPagina}
          habilitado={!isUltimaPagina(dados.ultimaPagina)}
          invalido={isUltimaPagina(dados.ultimaPagina)}
          >Próxima página →</MiniBotao
        >
      </div>
    {/if}
  {/if}
{/await}
