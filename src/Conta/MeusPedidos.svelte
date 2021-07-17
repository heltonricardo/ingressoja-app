<script>
  import { createEventDispatcher } from "svelte";

  import { getPedidos } from "../Conexao/compradorConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { valorVirgula } from "../utils/formatador";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

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

  h1 {
    font-size: 3rem;
    align-self: center;
    margin: 1rem 0;
  }

  #tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
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
    background-color: var(--verde2);
    color: black;
    text-align: center;
  }

  #detalhes {
    display: flex;
    justify-content: center;
  }

  #voltar {
    margin: 3rem 0;
  }
</style>

<div id="corpo">
  <h1>Meus Pedidos</h1>
  {#await pedidos}
    <Aguarde />
  {:then pedidos}
    {#if pedidos.length}
      <table id="tabela">
        <tr>
          <th>Pedido</th>
          <th>Data</th>
          <th>Evento</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>

        {#each pedidos as pedido}
          <tr>
            <td>{pedido.id}</td>
            <td>{extrairDataHora(pedido.dataHora).data}</td>
            <td>{pedido.tituloEvento}</td>
            <td>R$ {valorVirgula(pedido.valorTotal)}</td>
            <td id="detalhes"
              ><Botao
                on:click={() =>
                  dispatch("detalhespedido", {
                    id: pedido.id,
                    evento: pedido.tituloEvento,
                  })}>Detalhes</Botao
              ></td
            >
          </tr>
        {/each}
      </table>
    {:else}
      Não há pedidos para mostrar
    {/if}
  {/await}
  <div id="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
