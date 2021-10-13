<script>
  import Swal from "sweetalert2";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import { maskBr } from "js-brasil";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { getItensVendidos } from "../Conexao/eventoConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  const dispatch = createEventDispatcher();

  export let id;

  let dados = getItensVendidos(id);
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
    align-items: center;
  }

  #voltar {
    margin: 3rem 0;
  }
</style>

<div id="corpo">
  <h1>Conferência de Ingressos</h1>
  {#await dados}
    <Aguarde />
  {:then dados}
    <table id="evento">
      <tr>
        <td class="titulo">Evento:</td>
        <td class="dado">{dados.titulo}</td>
      </tr>
      <tr>
        <td class="titulo">Total de ingressos:</td>
        <td class="dado">{dados.totalIngressos}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos vendidos:</td>
        <td class="dado">{dados.itensPedido.length}</td>
      </tr>
      <tr>
        <td class="titulo">Início:</td>
        <td class="dado"
          >{extrairDataHora(dados.inicio).data} • {extrairDataHora(dados.inicio)
            .horario}</td
        >
      </tr>
      <tr>
        <td class="titulo">Término:</td>
        <td class="dado"
          >{extrairDataHora(dados.termino).data} • {extrairDataHora(
            dados.termino
          ).horario}</td
        >
      </tr>
    </table>

    {#if dados.itensPedido.length}
      <table id="tabela">
        <tr>
          <th>Id</th>
          <th>Portador</th>
          <th>CPF</th>
          <th>Utilizado?</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
        {#each dados.itensPedido as item}
          <tr class:utilizado={item.utilizado}>
            <td>{item.id}</td>
            <td>{item.ingressante}</td>
            <td>{maskBr.cpf(item.cpf)}</td>
            <td>{item.utilizado ? "Sim" : "Não"}</td>
            <td>{item.tipoDeIngresso.nome}</td>
            <td id="detalhes">
              <MiniBotao>Ver mais</MiniBotao>
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
