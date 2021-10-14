<script>
  import Swal from "sweetalert2";
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { valorVirgula } from "../utils/formatador";
  import { getItensVendidos } from "../Conexao/eventoConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { utilizarIngresso } from "../Conexao/itemPedidoConex";

  const dispatch = createEventDispatcher();

  export let id;

  let evento = getItensVendidos(id);

  function qntUtilizados(evento) {
    return evento.itensPedido.filter((i) => i.utilizado).length;
  }

  function qntNaoUtilizados(evento) {
    return evento.itensPedido.length - qntUtilizados(evento);
  }

  function verMais(ingresso) {
    Swal.fire({
      html: `<style>.titulo {font-weight: bold}</style>
        <p class="titulo">Identificador único do ingresso</p>
        <p>${ingresso.id}</p>
        <br />
        <p class="titulo">Nome do(a) portador(a)</p>
        <p>${ingresso.ingressante}</p>
        <br />
        <p class="titulo">CPF</p>
        <p>${maskBr.cpf(ingresso.cpf)}</p>
        <br />
        <p class="titulo">Ingresso já utilizado?</p>
        <p>${ingresso.utilizado ? "Sim" : "Não"}</p>
        <br />
        <p class="titulo">Tipo de ingresso</p>
        <p>${ingresso.tipoDeIngresso.nome}</p>
        <br />
        <p class="titulo">Valor</p>
        <p>R$ ${valorVirgula(ingresso.tipoDeIngresso.valor)}</p>
        <br />
        <p class="titulo">Descrição do ingresso</p>
        <p>${ingresso.tipoDeIngresso.descricao || "Não possui"}</p>`,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  async function utilizar(ingresso) {
    Swal.fire({
      title: `Utilizar o ingresso #${ingresso.id}?`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    })
      .then((temCerteza) => {
        if (temCerteza.isConfirmed) {
          return utilizarIngresso(ingresso.id);
        }
      })
      .then((res) => {
        if (res) evento = getItensVendidos(id);
      });
  }
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
    text-align: center;
    align-self: center;
    margin: 1rem 0;
  }

  #evento {
    margin: 2rem;
    align-self: flex-start;
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

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
  }

  .utilizado {
    color: red;
  }

  #detalhes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #voltar {
    margin: 3rem 0;
  }
</style>

<div id="corpo">
  <h1>Conferência de Ingressos</h1>
  {#await evento}
    <Aguarde />
  {:then evento}
    <table id="evento">
      <tr>
        <td class="titulo">Evento:</td>
        <td class="dado">{evento.titulo}</td>
      </tr>
      <tr>
        <td class="titulo">Início:</td>
        <td class="dado"
          >{extrairDataHora(evento.inicio).dataCompleta} • {extrairDataHora(
            evento.inicio
          ).horario}</td
        >
      </tr>
      <tr>
        <td class="titulo">Término:</td>
        <td class="dado"
          >{extrairDataHora(evento.termino).dataCompleta} • {extrairDataHora(
            evento.termino
          ).horario}</td
        >
      </tr>
      <tr>
        <td class="titulo">Total de ingressos:</td>
        <td class="dado">{evento.totalIngressos}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos vendidos:</td>
        <td class="dado">{evento.itensPedido.length}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos utilizados:</td>
        <td class="dado">{qntUtilizados(evento)}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos não utilizados:</td>
        <td class="dado">{qntNaoUtilizados(evento)}</td>
      </tr>
    </table>

    {#if evento.itensPedido.length}
      <table id="tabela">
        <tr>
          <th>Id</th>
          <th>Portador</th>
          <th>CPF</th>
          <th>Utilizado?</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
        {#each evento.itensPedido as item}
          <tr class:utilizado={item.utilizado}>
            <td>{item.id}</td>
            <td>{item.ingressante}</td>
            <td>{maskBr.cpf(item.cpf)}</td>
            <td>{item.utilizado ? "Sim" : "Não"}</td>
            <td>{item.tipoDeIngresso.nome}</td>
            <td id="detalhes">
              {#if !item.utilizado}
                <MiniBotao on:click={() => utilizar(item)}>Utilizar</MiniBotao>
              {/if}
              <MiniBotao on:click={() => verMais(item)}>Ver mais</MiniBotao>
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      <p>Não existem ingressos vendidos para esse evento</p>
    {/if}
  {/await}
  <div id="voltar">
    <Botao on:click={() => dispatch("conferencia")}>Voltar</Botao>
  </div>
</div>
