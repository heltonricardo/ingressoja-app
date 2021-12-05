<script>
  import Swal from "sweetalert2";
  import { createEventDispatcher } from "svelte";

  import {
    getAdministradores,
    deleteAdministrador,
  } from "../Conexao/administradorConex";
  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import autenticacao from "../Autenticacao/autenticacao";

  const dispatch = createEventDispatcher();
  const idLogado = autenticacao.idLogado();

  let admins = getAdministradores();

  function excluir(id) {
    Swal.fire({
      title: MSG.CERTEZA,
      text: MSG.EXCLUIR,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      focusCancel: true,
    }).then((temCerteza) => {
      if (temCerteza.isConfirmed) {
        deleteAdministrador(id).then(() => (admins = getAdministradores()));
      }
    });
  }
</script>

<style>
  .corpo {
    max-width: 50rem;
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

  .acoes {
    display: flex;
    justify-content: center;
  }

  .voltar {
    margin: 3rem 0;
  }

  .cadastrar {
    margin: 2rem 0 0 0;
  }
</style>

<div class="corpo">
  <h1>Administradores</h1>
  {#await admins}
    <Aguarde />
  {:then admins}
    {#if admins.length}
      <table class="tabela">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>

        {#each admins as adm}
          <tr>
            <td>{adm.id}</td>
            <td>{adm.nome}</td>
            <td>{adm.email}</td>
            <td class="acoes">
              {#if adm.id !== idLogado}
                <MiniBotao on:click={() => excluir(adm.id)}>Excluir</MiniBotao>
              {:else}
                -
              {/if}
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há administradores para mostrar
    {/if}
  {/await}
  <div class="cadastrar">
    <Botao on:click={() => dispatch("novoadm")}>Cadastrar Administrador</Botao>
  </div>
  <div class="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
