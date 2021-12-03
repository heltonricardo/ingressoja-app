<script>
  import Swal from "sweetalert2";
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import autenticacao from "../Autenticacao/autenticacao";
  import { getAdministrador } from "../Conexao/administradorConex";
  import { getComprador, deleteComprador } from "../Conexao/compradorConex";
  import { deleteProdutora, getProdutora } from "../Conexao/produtoraConex";

  const dispatch = createEventDispatcher();

  let tipoLogado = autenticacao.tipoLogado();

  let dados;

  async function carregaDados() {
    if (tipoLogado === TIPOCADASTRO.COMPRADOR) {
      dados = await getComprador();
    } //
    else if (tipoLogado === TIPOCADASTRO.PRODUTORA) {
      dados = await getProdutora();
    } //
    else if (tipoLogado === TIPOCADASTRO.ADMINISTRADOR) {
      dados = await getAdministrador();
    }

    if (dados === null) {
      dispatch("minhaconta");
    }

    return dados;
  }

  function editar() {
    if (tipoLogado === TIPOCADASTRO.ADMINISTRADOR) dispatch("novoadm", dados);
    else dispatch("cadastro", dados);
  }

  function excluir() {
    Swal.fire({
      title: MSG.CERTEZA,
      text: MSG.EXCLUIR,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      focusCancel: true,
    })
      .then((temCerteza) => {
        if (temCerteza.isConfirmed) {
          if (tipoLogado === TIPOCADASTRO.COMPRADOR) return deleteComprador();
          else if (tipoLogado === TIPOCADASTRO.PRODUTORA)
            return deleteProdutora();
        }
      })
      .then((temCerteza) => temCerteza && dispatch("voltar"));
  }
</script>

<style>
  .corpo {
    max-width: 40rem;
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
    justify-content: center;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin: 1rem 0;
  }

  table {
    word-break: break-all;
    width: 100%;
  }

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
  }

  .botoes {
    display: flex;
    margin: 2rem 0;
  }
</style>

<div class="corpo">
  <h1>Meus Dados</h1>
  {#await carregaDados()}
    <Aguarde />
  {:then dados}
    <div class="conteudo">
      {#if tipoLogado === TIPOCADASTRO.COMPRADOR}
        <table>
          <tr>
            <td class="titulo">Tipo:</td>
            <td>Comprador</td>
          </tr>
          <tr>
            <td class="titulo">Id:</td>
            <td>{dados.id}</td>
          </tr>
          <tr>
            <td class="titulo">Nome:</td>
            <td>{dados.nome}</td>
          </tr>
          <tr>
            <td class="titulo">E-mail:</td>
            <td>{dados.email}</td>
          </tr>
          <tr>
            <td class="titulo">CPF:</td>
            <td>{maskBr.cpf(dados.cpf)}</td>
          </tr>
        </table>
      {:else if tipoLogado === TIPOCADASTRO.PRODUTORA}
        <table>
          <tr>
            <td class="titulo">Tipo:</td>
            <td>Produtora</td>
          </tr>
          <tr>
            <td class="titulo">Id:</td>
            <td>{dados.id}</td>
          </tr>
          <tr>
            <td class="titulo">Razão social:</td>
            <td>{dados.razaoSocial}</td>
          </tr>
          <tr>
            <td class="titulo">Nome fantasia:</td>
            <td>{dados.nomeFantasia}</td>
          </tr>
          <tr>
            <td class="titulo">CNPJ:</td>
            <td>{maskBr.cnpj(dados.cnpj)}</td>
          </tr>
          <tr>
            <td class="titulo">E-mail:</td>
            <td>{dados.email}</td>
          </tr>
          <tr>
            <td class="titulo">Public Token:</td>
            <td>{dados.publicToken}</td>
          </tr>
        </table>
      {:else if tipoLogado === TIPOCADASTRO.ADMINISTRADOR}
        <table>
          <tr>
            <td class="titulo">Tipo:</td>
            <td>Administrador</td>
          </tr>
          <tr>
            <td class="titulo">Id:</td>
            <td>{dados.id}</td>
          </tr>
          <tr>
            <td class="titulo">Nome:</td>
            <td>{dados.nome}</td>
          </tr>
          <tr>
            <td class="titulo">E-mail:</td>
            <td>{dados.email}</td>
          </tr>
        </table>
      {/if}
    </div>
  {/await}

  <div class="botoes">
    <Botao on:click={editar}>Editar</Botao>
    {#if tipoLogado !== TIPOCADASTRO.ADMINISTRADOR}
      <Botao on:click={excluir}>Excluir Conta</Botao>
    {/if}
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
