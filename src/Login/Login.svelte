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
    const login = await autenticacao.logar({ email, senha }, true);
    carregando = false;

    if (login) dispatch("voltar");
  }
</script>

<style>
  .corpo {
    width: 30rem;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
    min-height: calc(100vh - 20rem);
    justify-content: center;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  .botoes {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .duplo {
    display: flex;
    margin-top: 0.5rem;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  <h1>Realize seu login</h1>
  <div class="campos">
    <Entrada
      class="email"
      label="E-mail"
      validar={false}
      on:input={(event) => (email = event.target.value)}
    />
    <Entrada
      class="senha"
      label="Senha"
      type="password"
      validar={false}
      on:input={(event) => (senha = event.target.value)}
      on:keypress={(e) => "NumpadEnter".includes(e.code) && entrar()}
    />
  </div>

  <div class="botoes">
    <Botao on:click={entrar}>Entrar</Botao>
    <div class="duplo">
      <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
      <Botao on:click={() => dispatch("cadastro")}>Cadastre-se</Botao>
    </div>
  </div>
</div>
