<script>
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import { getPedido } from "../Conexao/pedidoConex";
  import { valorVirgula } from "../utils/formatador";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  const dispatch = createEventDispatcher();

  export let id;
</script>

<style>
  #corpo {
    width: 43%;
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
    text-align: center;
  }

  h2 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  #tabela {
    word-break: break-all;
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    word-break: break-all;
    border-radius: 7px;
    overflow: hidden;
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
  }

  #navegacao {
    margin: 3rem 0;
    display: flex;
  }

  #detalhes {
    display: flex;
    margin-top: 3rem;
    line-height: 2rem;
  }

  #rotulos {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  #dados {
    margin-left: 0.6rem;
  }
</style>

{#await getPedido(id)}
  <Aguarde />
{:then pedido}
  <div id="corpo">
    <h1>Detalhes de Pedido</h1>
    <h2>{pedido.evento.titulo}</h2>
    <table id="tabela">
      <tr>
        <th>Pedido</th>
        <th>Data do pedido</th>
        <th>Hora do pedido</th>
        <th>Final do cartão</th>
        <th>Valor total</th>
      </tr>

      <tr>
        <td>#{pedido.id}</td>
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
        <th>CPF do ingressante</th>
        <th>Tipo de ingresso</th>
        <th>Preço</th>
      </tr>

      {#each pedido.itensPedido as item}
        <tr>
          <td>#{item.id}</td>
          <td>{item.ingressante}</td>
          <td>{maskBr.cpf(item.cpf)}</td>
          <td>{item.tipoDeIngresso.nome}</td>
          <td>R$ {valorVirgula(item.tipoDeIngresso.valor)}</td>
        </tr>
      {/each}
    </table>

    <div id="detalhes">
      <div id="rotulos">
        <span id="local">
          {#if pedido.evento.online}
            <p>
              <i class="fas fa-mouse-pointer" />   Evento On-line:
            </p>
          {:else}
            <p>
              <i class="fas fa-location-arrow" />  Local:
            </p>
          {/if}
        </span>
        <span id="data-hora-inicio">
          <p>
            <i class="fas fa-clock" />  Início:
          </p>
        </span>
        <span id="data-hora-termino">
          <p>
            <i class="fas fa-hand-point-left" />  Término:
          </p>
        </span>
      </div>
      <div id="dados">
        <span id="local">
          {#if pedido.evento.online}
            <p>
              <a target="_blank" href={pedido.evento.url}>Acessar</a>
            </p>
          {:else}
            <p>
              {pedido.evento.logradouro}, {pedido.evento.numero} -
              {pedido.evento.bairro} •
              {pedido.evento.cidade}-{pedido.evento.uf} • CEP: {maskBr.cep(
                pedido.evento.cep
              )}
            </p>
          {/if}
        </span>

        <span id="data-hora-inicio">
          <p>
            {extrairDataHora(pedido.evento.inicio).data} •
            {extrairDataHora(pedido.evento.inicio).horario}
          </p>
        </span>

        <span id="data-hora-termino">
          <p>
            {extrairDataHora(pedido.evento.termino).data} •
            {extrairDataHora(pedido.evento.termino).horario}
          </p>
        </span>
      </div>
    </div>

    <div id="navegacao">
      <Botao on:click={() => dispatch("meusingressos", pedido)}
        >Ver ingressos</Botao
      >
      <Botao on:click={() => dispatch("meuspedidos")}>Voltar</Botao>
    </div>
  </div>
{/await}
