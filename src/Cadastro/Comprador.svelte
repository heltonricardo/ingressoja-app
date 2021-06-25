<script>
  import { createEventDispatcher } from "svelte";
  import { postComprador } from "../Conexoes/compradorConex";

  import Entrada from "../UI/Entrada.svelte";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let nome;
  let cpf;
  let email;
  let senha;
  let senha2;

  async function cadastrar() {
    if (senha === senha2) {
      carregando = true;
      const res = await postComprador({ nome, cpf, email, usuario: { senha } });
      carregando = false;
      if (res) dispatch("voltar");
    }
  }
</script>

<style>
  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }

  #senha {
    margin: 3rem 0;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="campos">
  <Entrada
    id="nome"
    label="Nome Completo"
    on:input={(event) => (nome = event.target.value)}
  />
  <Entrada
    id="cpf"
    label="CPF"
    on:input={(event) => (cpf = event.target.value)}
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
