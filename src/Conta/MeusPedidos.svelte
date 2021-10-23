<script>
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { valorVirgula } from "../utils/formatador";
  import { getPedidos } from "../Conexao/compradorConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  const dispatch = createEventDispatcher();
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
    word-break: break-all;
  }

  #tabela td,
  #tabela th {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }

  #tabela tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #tabela tr:nth-child(odd) {
    background-color: var(--branco);
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
    word-break: keep-all;
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
  {#await getPedidos()}
    <Aguarde />
  {:then pedidos}
    {#if pedidos.length}
      <table id="tabela">
        <tr>
          <th>Id</th>
          <th>Data</th>
          <th>Valor</th>
          <th>Evento</th>
          <th>Ações</th>
        </tr>

        {#each pedidos as pedido}
          <tr>
            <td>#{pedido.id}</td>
            <td>{extrairDataHora(pedido.dataHora).data}</td>
            <td>R$ {valorVirgula(pedido.valorTotal)}</td>
            <td>{pedido.tituloEvento}</td>
            <td>
              <div id="detalhes">
                <MiniBotao
                  on:click={() => dispatch("detalhespedido", pedido.id)}
                  >Detalhes</MiniBotao
                >
              </div>
            </td>
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
