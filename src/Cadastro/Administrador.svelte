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

  let tocarCampos = false;

  let senha = "";
  let senha2 = "";
  let nome = dados ? dados.nome : "";
  let email = dados ? dados.email : "";

  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 255 });
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;

  $: formularioValido =
    nomeValido && emailValido && senhaValida && senha2Valida;

  async function salvar() {
    if (!formularioValido) {
      tocarCampos = true;
      return;
    }

    const res = dados
      ? await putAdministrador({ nome, usuario: { email, senha } })
      : await postAdministrador({ nome, usuario: { email, senha } });
    if (res && dados) dispatch("meusdados");
    else if (res) dispatch("administradores");
  }

  function voltar() {
    if (dados) dispatch("meusdados");
    else dispatch("administradores");
  }

  onMount(() => {
    if (!autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR))
      dispatch("minhaconta");
  });
</script>

<style>
  .corpo {
    max-width: 40rem;
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

  .senha {
    margin: 2rem 0;
  }

  .botoes {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
  }
</style>

<div class="corpo">
  {#if dados}
    <h1>Editar Administrador</h1>
  {:else}
    <h1>Novo Administrador</h1>
  {/if}

  <div class="campos">
    <Entrada
      id="nome"
      value={nome}
      valido={nomeValido}
      tocado={tocarCampos}
      label="Nome Completo"
      mensagemValidacao="Insira um nome válido"
      on:input={(event) => (nome = event.target.value)}
    />
    <Entrada
      id="email"
      value={email}
      label="E-mail"
      tocado={tocarCampos}
      valido={emailValido}
      mensagemValidacao="Insira um e-mail válido"
      on:input={(event) => (email = event.target.value)}
    />
  </div>

  <div class="senha">
    <Entrada
      id="senha1"
      maxlength="50"
      type="password"
      tocado={tocarCampos}
      valido={senhaValida}
      on:input={(event) => (senha = event.target.value)}
      label={dados ? "Crie uma nova senha" : "Crie uma senha"}
      mensagemValidacao="A senha deve conter, pelo menos, 6 caracteres"
    />
    <Entrada
      id="senha2"
      maxlength="50"
      type="password"
      tocado={tocarCampos}
      valido={senha2Valida}
      label="Repita sua senha"
      mensagemValidacao="As senhas não coincidem"
      on:input={(event) => (senha2 = event.target.value)}
    />
  </div>
  <div class="botoes">
    <Botao on:click={voltar}>Voltar</Botao>
    <Botao on:click={salvar} invalido={!formularioValido}>Salvar</Botao>
  </div>
</div>
