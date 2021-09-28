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
  import autenticacao from "../Autenticacao/autenticacao";

  const dispatch = createEventDispatcher();
  const idLogado = autenticacao.idLogado();

  let admins = getAdministradores();

  function excluir(id) {
    Swal.fire({
      title: MSG.CERTEZA,
      text: MSG.EXCLUIR,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((temCerteza) => {
      if (temCerteza) {
        deleteAdministrador(id).then(() => (admins = getAdministradores()));
      }
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
  <h1>Administradores</h1>
  {#await admins}
    <Aguarde />
  {:then admins}
    {#if admins.length}
      <table id="tabela">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>

        {#each admins as adm}
          <tr>
            <td>{adm.id}</td>
            <td>{adm.nome}</td>
            <td id="detalhes">
              <Botao>Detalhes</Botao>
              {#if adm.id !== idLogado}
                <Botao on:click={() => excluir(adm.id)}>Excluir</Botao>
              {/if}
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há administradores para mostrar
    {/if}
  {/await}
  <div id="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
