<script>
  import { createEventDispatcher } from "svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let email = "";
  let senha = "";

  async function entrar() {
    carregando = true;
    const login = await autenticacao.logar({ email, senha });
    carregando = false;

    if (login) dispatch("voltar");
  }
</script>

<style>
  #corpo {
    width: 30rem;
    min-height: calc(100vh - 21rem);
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <h1>Realize seu login</h1>
  <div id="campos">
    <Entrada
      id="email"
      label="E-mail"
      on:input={(event) => (email = event.target.value)}
    />
    <Entrada
      id="senha"
      label="Senha"
      type="password"
      on:input={(event) => (senha = event.target.value)}
    />
  </div>

  <div id="botoes">
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
    <Botao on:click={entrar}>Entrar</Botao>
  </div>
</div>
