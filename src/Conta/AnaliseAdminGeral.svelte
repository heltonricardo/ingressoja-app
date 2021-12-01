<script>
  import { maskBr } from "js-brasil";

  import {
    extrairDataHora,
    hojeDataStringISO,
  } from "../utils/manipulaDataHora";

  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { valorVirgula } from "../utils/formatador";
  import { getPedidosPagina, getPedidosPorData } from "../Conexao/pedidoConex";

  let pagina = 0;
  let fonte = "filtrar";
  let final = hojeDataStringISO;
  let inicial = hojeDataStringISO;

  $: dados =
    fonte === "todos"
      ? getPedidosPagina(pagina)
      : getPedidosPorData(inicial, final);

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

  function filtrarPorData() {
    dados = getPedidosPorData(inicial, final);
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

  .data-filtros {
    display: flex;
    align-items: flex-end;
    align-self: flex-start;
    margin-top: -1rem;
    margin-bottom: 2rem;
  }

  .espacamento {
    width: 2rem;
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

  {#if fonte === "filtrar"}
    <div class="data-filtros">
      <Entrada
        type="date"
        id="inicial"
        value={inicial}
        label="Data inicial"
        on:input={(e) => (inicial = e.target.value)}
      />
      <div class="espacamento" />
      <Entrada
        id="final"
        type="date"
        value={final}
        label="Data final"
        on:input={(e) => (final = e.target.value)}
      />
      <MiniBotao>tes</MiniBotao>
    </div>
  {/if}

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

    {#if fonte === "todos"}
      <p class="paginacao">
        Exibindo página {pagina + 1} de {dados.ultimaPagina + 1}
      </p>
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
  {:else}
    <span>Não existem pedidos para serem mostrados</span>
  {/if}
{/await}
