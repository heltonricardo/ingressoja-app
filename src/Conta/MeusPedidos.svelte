<script>
  import { getPedidos } from "../Conexao/compradorConex";
  import {extrairDataHora} from "../utils/manipulaDataHora"

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  async function carregaPedidos() {
    pedidos = await getPedidos();
  }
  let pedidos = carregaPedidos();
</script>

<style>
  #corpo {
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

  #tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }

  #tabela td,
  #tabela th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #tabela tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #tabela tr:hover {
    background-color: #ddd;
  }

  #tabela th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
    text-align: center;
  }
</style>

<div id="corpo">
  {#await pedidos}
    <Aguarde />
  {:then pedidos}
    {#if pedidos.length}
      <table id="tabela">
        <tr>
          <th>Pedido</th>
          <th>Data</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>

        {#each pedidos as pedido}
          <tr>
            <td>{pedido.id}</td>
            <td>{extrairDataHora(pedido.dataHora).data}</td>
            <td>R$ {pedido.valorTotal}</td>
            <td><Botao>Detalhes</Botao></td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há pedidos para mostrar
    {/if}
  {/await}
</div>
