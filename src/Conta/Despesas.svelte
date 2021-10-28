<script>
  import Swal from "sweetalert2";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { getEventos } from "../Conexao/produtoraConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { deleteEvento, podeAlterarEvento } from "../Conexao/eventoConex";

  const dispatch = createEventDispatcher();

  let carregando = false;
  let eventos = getEventos();

  async function editar(id) {
    (await podeAlterarEvento(id)) && dispatch("editar", id);
  }

  async function excluir(id) {
    if (await podeAlterarEvento(id))
      Swal.fire({
        title: MSG.CERTEZA,
        text: MSG.EXCLUIR_EVENTO,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        focusCancel: true,
      }).then(
        (temCerteza) =>
          temCerteza.isConfirmed &&
          deleteEvento(id).then((ok) => {
            if (ok) eventos = getEventos();
          })
      );
  }
</script>

<style>
  .corpo {
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
    margin: 1rem 0 3rem 0;
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

  .detalhes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cadastrar {
    margin: 2rem 0 0 0;
  }

  .voltar {
    margin: 3rem 0;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  <h1>Despesas</h1>
  {#await eventos}
    <Aguarde />
  {:then eventos}
    {#if eventos.length}
      <table class="tabela">
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Data do evento</th>
          <th>Ações</th>
        </tr>
        {#each eventos as evento}
          <tr>
            <td>{evento.id}</td>
            <td>{evento.titulo}</td>
            <td>{extrairDataHora(evento.inicio).data}</td>
            <td class="detalhes">
              <MiniBotao on:click={() => editar(evento.id)}>Editar</MiniBotao>
              <MiniBotao on:click={() => excluir(evento.id)}>Excluir</MiniBotao>
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há eventos para mostrar
    {/if}
  {/await}

  <div class="cadastrar">
    <Botao on:click={() => dispatch("novoevento")}>Cadastrar Evento</Botao>
  </div>

  <div class="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
