<script>
  import { createEventDispatcher } from "svelte";

  import { maskBr } from "js-brasil";

  import autenticacao from "../Autenticacao/autenticacao";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import { getComprador } from "../Conexao/compradorConex";
  import { getProdutora } from "../Conexao/produtoraConex";
  import { getAdministrador } from "../Conexao/administradorConex";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

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
</script>

<style>
  #corpo {
    width: 30rem;
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

  table {
    word-break: break-all;
    width: 100%;
  }

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
  }

  #botoes {
    display: flex;
    margin: 2rem 0;
  }
</style>

<div id="corpo">
  <h1>Meus Dados</h1>
  {#await carregaDados()}
    <Aguarde />
  {:then dados}
    <div id="conteudo">
      {#if tipoLogado === TIPOCADASTRO.COMPRADOR}
        <table>
          <tr>
            <td class="titulo">Tipo:</td>
            <td class="dado">Comprador</td>
          </tr>
          <tr>
            <td class="titulo">Id:</td>
            <td class="dado">{dados.id}</td>
          </tr>
          <tr>
            <td class="titulo">Nome:</td>
            <td class="dado">{dados.nome}</td>
          </tr>
          <tr>
            <td class="titulo">E-mail:</td>
            <td class="dado">{dados.email}</td>
          </tr>
          <tr>
            <td class="titulo">CPF:</td>
            <td class="dado">{maskBr.cpf(dados.cpf)}</td>
          </tr>
        </table>
      {:else if tipoLogado === TIPOCADASTRO.PRODUTORA}
        <table>
          <tr>
            <td class="titulo">Tipo:</td>
            <td class="dado">Produtora</td>
          </tr>
          <tr>
            <td class="titulo">Id:</td>
            <td class="dado">{dados.id}</td>
          </tr>
          <tr>
            <td class="titulo">Razão social:</td>
            <td class="dado">{dados.razaoSocial}</td>
          </tr>
          <tr>
            <td class="titulo">Nome fantasia:</td>
            <td class="dado">{dados.nomeFantasia}</td>
          </tr>
          <tr>
            <td class="titulo">CNPJ:</td>
            <td class="dado">{maskBr.cnpj(dados.cnpj)}</td>
          </tr>
          <tr>
            <td class="titulo">E-mail:</td>
            <td class="dado">{dados.email}</td>
          </tr>
          <tr>
            <td class="titulo">Banco:</td>
            <td class="dado">{dados.banco}</td>
          </tr>
          <tr>
            <td class="titulo">Agência:</td>
            <td class="dado">{dados.agencia}</td>
          </tr>
          <tr>
            <td class="titulo">Conta:</td>
            <td class="dado">{dados.conta}</td>
          </tr>
        </table>
      {:else if tipoLogado === TIPOCADASTRO.ADMINISTRADOR}
        <table>
          <tr>
            <td class="titulo">Tipo:</td>
            <td class="dado">Administrador</td>
          </tr>
          <tr>
            <td class="titulo">Id:</td>
            <td class="dado">{dados.id}</td>
          </tr>
          <tr>
            <td class="titulo">Nome:</td>
            <td class="dado">{dados.nome}</td>
          </tr>
          <tr>
            <td class="titulo">E-mail:</td>
            <td class="dado">{dados.email}</td>
          </tr>
        </table>
      {/if}
    </div>
  {/await}

  <div id="botoes">
    <Botao on:click={() => dispatch("cadastro", dados)}>Editar</Botao>
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
