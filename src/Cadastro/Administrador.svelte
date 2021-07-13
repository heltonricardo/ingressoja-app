<script>
  import Entrada from "../UI/Entrada.svelte";
  import Botao from "../UI/Botao.svelte";
  import { createEventDispatcher } from "svelte";
  import { postAdministrador } from "../Conexao/administradorConex";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let nome;
  let email;
  let senha;
  let senha2;

  async function cadastrar() {
    if (senha === senha2) {
      carregando = true;
      const res = await postAdministrador({ nome, email, senha });
      carregando = false;
      if (res) dispatch("minhaconta");
    }
  }
</script>

<style>
  #corpo {
    width: 30%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
    min-height: calc(100vh - 20rem);
  }

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  #senha {
    margin: 2rem 0;
  }

  #botoes {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
  }
</style>

<div id="corpo">
  <h1>Novo Administrador</h1>

  <div id="campos">
    <Entrada
      id="nome"
      label="Nome Completo"
      on:input={(event) => (nome = event.target.value)}
    />
    <Entrada
      id="email"
      label="E-mail"
      on:input={(event) => (email = event.target.value)}
    />
  </div>

  <div id="senha">
    <Entrada
      id="senha1"
      type="password"
      label="Crie uma senha"
      on:input={(event) => (senha = event.target.value)}
    />
    <Entrada
      id="senha2"
      type="password"
      label="Repita sua senha"
      on:input={(event) => (senha2 = event.target.value)}
    />
  </div>

  <div id="botoes">
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
    <Botao on:click={cadastrar}>Finalizar</Botao>
  </div>
</div>
