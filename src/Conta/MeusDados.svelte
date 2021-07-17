<script>
  import { createEventDispatcher } from "svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import { getComprador } from "../Conexao/compradorConex";
  import { getProdutora } from "../Conexao/produtoraConex";
  import { getAdministrador } from "../Conexao/administradorConex";
  import { valorVirgula } from "../utils/formatador";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  let tipoLogado = autenticacao.tipoLogado();

  async function carregaDados() {
    let dados;

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
  }

  #conteudo {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
  }

  .linha {
    display: flex;
  }

  .titulo {
    font-weight: bold;
    margin-right: 0.1rem;
    min-width: 9rem;
  }

  p {
    margin: 0.8rem 0;
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
        <div class="linha">
          <div class="titulo">
            <p>Tipo:</p>
          </div>
          <div class="dados">
            <p>Comprador</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Id:</p>
          </div>
          <div class="dados">
            <p>{dados.id}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Nome:</p>
          </div>
          <div class="dados">
            <p>{dados.nome}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>E-mail:</p>
          </div>
          <div class="dados">
            <p>{dados.email}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>CPF:</p>
          </div>
          <div class="dados">
            <p>{dados.cpf}</p>
          </div>
        </div>
      {:else if tipoLogado === TIPOCADASTRO.PRODUTORA}
        <div class="linha">
          <div class="titulo">
            <p>Tipo:</p>
          </div>
          <div class="dados">
            <p>Produtora</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Id:</p>
          </div>
          <div class="dados">
            <p>{dados.id}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Razão social:</p>
          </div>
          <div class="dados">
            <p>{dados.razaoSocial}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Nome fantasia:</p>
          </div>
          <div class="dados">
            <p>{dados.nomeFantasia}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>CNPJ:</p>
          </div>
          <div class="dados">
            <p>{dados.cnpj}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>E-mail:</p>
          </div>
          <div class="dados">
            <p>{dados.email}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Banco:</p>
          </div>
          <div class="dados">
            <p>{dados.banco}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Agência:</p>
          </div>
          <div class="dados">
            <p>{dados.agencia}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Conta:</p>
          </div>
          <div class="dados">
            <p>{dados.conta}</p>
          </div>
        </div>
      {:else if tipoLogado === TIPOCADASTRO.ADMINISTRADOR}
        <div class="linha">
          <div class="titulo">
            <p>Tipo:</p>
          </div>
          <div class="dados">
            <p>Administrador</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Id:</p>
          </div>
          <div class="dados">
            <p>{dados.id}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>Nome:</p>
          </div>
          <div class="dados">
            <p>{dados.nome}</p>
          </div>
        </div>
        <div class="linha">
          <div class="titulo">
            <p>E-mail:</p>
          </div>
          <div class="dados">
            <p>{dados.email}</p>
          </div>
        </div>
      {/if}
    </div>
  {/await}

  <div id="botoes">
    <Botao on:click={() => dispatch("minhaconta")}>Editar</Botao>
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
