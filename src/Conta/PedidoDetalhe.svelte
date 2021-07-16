<script>
  import { createEventDispatcher } from "svelte";
  import { getPedido } from "../Conexao/pedidoConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { valorVirgula } from "../utils/formatador";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  export let id;
  export let evento;

  async function carregaPedido() {
    pedido = await getPedido(id);
  }

  let pedido = carregaPedido();
</script>

<style>
  #corpo {
    width: 40%;
    min-width: 30rem;
    margin: 2rem auto;
    min-height: calc(100vh - 20rem);
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
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
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

  #voltar {
    margin: 3rem 0;
  }
</style>

<div id="corpo">
  <h1>Detalhes de Pedido</h1>
  <h2>{evento}</h2>
  {#await pedido}
    <Aguarde />
  {:then pedido}
    <table id="tabela">
      <tr>
        <th>Pedido</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Final do cartão</th>
        <th>Valor total</th>
      </tr>

      <tr>
        <td>{pedido.id}</td>
        <td>{extrairDataHora(pedido.dataHora).data}</td>
        <td>{extrairDataHora(pedido.dataHora).horario}</td>
        <td>{pedido.numeroCartao}</td>
        <td>R$ {valorVirgula(pedido.valorTotal)}</td>
      </tr>

      <tr>
        <th colspan="5">Itens do Pedido</th>
      </tr>

      <tr>
        <th>Ingresso</th>
        <th>Nome do ingressante</th>
        <th>CPF</th>
        <th>Tipo de ingresso</th>
        <th>Preço</th>
      </tr>

      {#each pedido.itensPedido as item}
        <tr>
          <td>{item.id}</td>
          <td>{item.ingressante}</td>
          <td>{item.cpf}</td>
          <td>{item.tipoDeIngresso.nome}</td>
          <td>R$ {valorVirgula(item.tipoDeIngresso.valor)}</td>
        </tr>
      {/each}
    </table>
  {/await}

  <div id="voltar">
    <Botao on:click={() => dispatch("meuspedidos")}>Voltar</Botao>
  </div>
</div>
