<script>
  import validator from "validator";
  import { createEventDispatcher, onMount } from "svelte";

  import {
    postAdministrador,
    putAdministrador,
  } from "../Conexao/administradorConex";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import autenticacao from "../Autenticacao/autenticacao";

  const dispatch = createEventDispatcher();

  export let dados = null;

  let nome = dados ? dados.nome : "";
  let email = dados ? dados.email : "";
  let senha = "";
  let senha2 = "";

  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 255 });
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;

  $: formularioValido =
    nomeValido && emailValido && senhaValida && senha2Valida;

  async function salvar() {
    const res = dados
      ? await putAdministrador({ nome, usuario: { email, senha } })
      : await postAdministrador({ nome, usuario: { email, senha } });
    if (res && dados) dispatch("meusdados");
    else if (res) dispatch("administradores");
  }

  function voltar() {
    if (dados) dispatch("meusdados");
    else dispatch("minhaconta");
  }

  onMount(() => {
    if (!autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR))
      dispatch("minhaconta");
  });
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
    min-height: calc(100vh - 21rem);
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
  {#if dados}
    <h1>Editar Administrador</h1>
  {:else}
    <h1>Novo Administrador</h1>
  {/if}

  <div id="campos">
    <Entrada
      id="nome"
      value={nome}
      label="Nome Completo"
      disabled={dados}
      on:input={(event) => (nome = event.target.value)}
      valido={nomeValido}
      mensagemValidacao="Insira um nome válido"
    />
    <Entrada
      id="email"
      value={email}
      label="E-mail"
      on:input={(event) => (email = event.target.value)}
      valido={emailValido}
      mensagemValidacao="Insira um e-mail válido"
    />
  </div>

  <div id="senha">
    <Entrada
      id="senha1"
      type="password"
      label={dados ? "Crie uma nova senha" : "Crie uma senha"}
      on:input={(event) => (senha = event.target.value)}
      valido={senhaValida}
      mensagemValidacao="A senha deve conter, pelo menos, 6 caracteres"
      maxlength="50"
    />
    <Entrada
      id="senha2"
      type="password"
      label="Repita sua senha"
      on:input={(event) => (senha2 = event.target.value)}
      valido={senha2Valida}
      mensagemValidacao="As senhas não coincidem"
      maxlength="50"
    />
  </div>

  <div id="botoes">
    <Botao on:click={voltar}>Voltar</Botao>
    <Botao on:click={salvar} habilitado={formularioValido}>Salvar</Botao>
  </div>
</div>
