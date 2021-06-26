<script>
  import { createEventDispatcher } from "svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let email = "";
  let senha = "";

  async function entrar() {
    const login = await autenticacao.logar({ email, senha });
    if (login) {
      console.log(autenticacao.tipoLogado())
    }
  }
</script>

<style>
  #corpo {
    width: 30rem;
    margin: 2rem auto;
  }

  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }
</style>

<div id="corpo">
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
