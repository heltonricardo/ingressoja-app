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
  }

  .titulo {
    font-weight: bold;
    margin-right: 1rem;
    width: fit-content;
  }

  .dados {
    flex-grow: 1;
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
        <div class="titulo">
          <p>Tipo:</p>
          <p>Id:</p>
          <p>Nome:</p>
          <p>E-mail:</p>
          <p>CPF:</p>
        </div>
        <div class="dados">
          <p>Comprador</p>
          <p>{dados.id}</p>
          <p>{dados.nome}</p>
          <p>{dados.email}</p>
          <p>{dados.cpf}</p>
        </div>

        {#else if tipoLogado === TIPOCADASTRO.PRODUTORA}
      {/if}
    </div>
  {/await}
  <div id="botoes">
    <Botao on:click={() => dispatch("minhaconta")}>Editar</Botao>
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
