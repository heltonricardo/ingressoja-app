<script>
  import Swal from "sweetalert2";
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import STATUSPGTO from "../ENUM/STATUSPGTO";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import STATUSPEDIDO from "../ENUM/STATUSPEDIDO";
  import { valorVirgula } from "../utils/formatador";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { cancelarPedido, getPedido } from "../Conexao/pedidoConex";

  const dispatch = createEventDispatcher();

  export let id;

  let carregando = false;
  let pedido = getPedido(id);

  function definirClassePedido(status) {
    if (status === STATUSPEDIDO.PROCESSADO) return "texto-azul";
    if (status === STATUSPEDIDO.AGUARDANDO_PGTO) return "texto-laranja";
    return "texto-vermelho";
  }

  async function solicitarCanc() {
    const confirma = await Swal.fire({
      icon: "warning",
      focusCancel: true,
      title: MSG.ATENCAO,
      showCancelButton: true,
      text: MSG.CANCELAMENTO,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Concordo. Solicitar cancelamento.",
    });

    if (confirma.isConfirmed) {
      carregando = true;
      if (await cancelarPedido(id)) pedido = getPedido(id);
      carregando = false;
    }
  }
</script>

<style>
  .corpo {
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

  .tabela-pedido {
    margin: 2rem 0;
    width: fit-content;
    word-break: break-all;
  }

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
  }

  .tabela-itens {
    word-break: break-all;
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    word-break: break-all;
    border-radius: 7px;
    overflow: hidden;
    margin: 1rem 0 3rem 0;
  }

  .tabela-itens td,
  .tabela-itens th {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }

  .tabela-itens tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .tabela-itens tr:nth-child(odd) {
    background-color: var(--branco);
  }

  .tabela-itens tr:hover {
    background-color: #ddd;
  }

  .tabela-itens th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--verde2);
    color: black;
    text-align: center;
  }

  .navegacao {
    display: flex;
    margin-bottom: 3rem;
  }
  
  .detalhes {
    display: flex;
    line-height: 2rem;
    margin-bottom: 3rem;
  }

  .rotulos {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .dados {
    margin-left: 0.6rem;
  }

  .texto-verde {
    color: var(--verde3);
  }

  .texto-vermelho {
    color: var(--vermelho);
  }

  .texto-amarelo {
    color: var(--amarelo);
  }

  .texto-azul {
    color: var(--azul);
  }

  .texto-laranja {
    color: var(--laranja);
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

{#await pedido}
  <div class="corpo" />
  <Aguarde />
{:then pedido}
  <div class="corpo">
    <h1>Detalhes de Pedido</h1>
    <table class="tabela-pedido">
      <tr>
        <td class="titulo">Evento:</td>
        <td>{pedido.evento.titulo}</td>
      </tr>
      <tr>
        <td class="titulo">Id pedido:</td>
        <td>#{pedido.id}</td>
      </tr>
      <tr>
        <td class="titulo">Efetuado em:</td>
        <td
          >{extrairDataHora(pedido.dataHora).data} • {extrairDataHora(
            pedido.dataHora
          ).horario}</td
        >
      </tr>
      <tr>
        <td class="titulo">Status do pedido:</td>
        <td class={definirClassePedido(pedido.statusPedido)}
          >{pedido.statusPedido}</td
        >
      </tr>
      {#if pedido.statusPagamento !== STATUSPGTO.NAO_SE_APLICA}
        <tr>
          <td class="titulo">Status do pagamento:</td>
          <td
            >{#if pedido.statusPagamento === STATUSPGTO.APROVADO}
              <span class="texto-verde"> Aprovado </span>
            {:else if pedido.statusPagamento === STATUSPGTO.RECUSADO}
              <span class="texto-vermelho">Recusado</span>
            {:else if pedido.statusPagamento === STATUSPGTO.REEMBOLSADO}
              <span class="texto-azul">Reembolsado</span>
            {:else if pedido.statusPagamento === STATUSPGTO.PENDENTE}
              <span class="texto-amarelo"> Pendente </span> -
              <a target="_blank" href={pedido.urlPagamento}
                >Página de pagamento</a
              >
            {/if}</td
          >
        </tr>
      {/if}
      <tr>
        <td class="titulo">Total:</td>
        <td>R$ {valorVirgula(pedido.valorTotal)}</td>
      </tr>
    </table>

    {#if pedido.statusPagamento === STATUSPGTO.APROVADO}
      <div class="navegacao">
        <MiniBotao on:click={solicitarCanc}>Solicitar cancelamento</MiniBotao>
      </div>
    {/if}

    <table class="tabela-itens">
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

    {#if pedido.statusPedido === STATUSPEDIDO.PROCESSADO}
      <div class="detalhes">
        <div class="rotulos">
          <span class="local">
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
          <span class="data-hora-inicio">
            <p>
              <i class="fas fa-clock" />  Início:
            </p>
          </span>
          <span class="data-hora-termino">
            <p>
              <i class="fas fa-hand-point-left" />  Término:
            </p>
          </span>
        </div>
        <div class="dados">
          <span class="local">
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

          <span class="data-hora-inicio">
            <p>
              {extrairDataHora(pedido.evento.inicio).data} •
              {extrairDataHora(pedido.evento.inicio).horario}
            </p>
          </span>

          <span class="data-hora-termino">
            <p>
              {extrairDataHora(pedido.evento.termino).data} •
              {extrairDataHora(pedido.evento.termino).horario}
            </p>
          </span>
        </div>
      </div>
    {/if}

    <div class="navegacao">
      {#if pedido.statusPedido === STATUSPEDIDO.PROCESSADO}
        <Botao on:click={() => dispatch("meusingressos", pedido)}
          >Ver ingressos</Botao
        >
      {/if}
      <Botao on:click={() => dispatch("meuspedidos")}>Voltar</Botao>
    </div>
  </div>
{/await}
