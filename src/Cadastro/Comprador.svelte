<script>
  import { createEventDispatcher } from "svelte";
  import validator from "validator";
  import { validateBr } from "js-brasil";

  import { postComprador } from "../Conexao/compradorConex";
  import autenticacao from "../Autenticacao/autenticacao";
  import Entrada from "../UI/Entrada.svelte";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let nome = "";
  let cpf = "";
  let email = "";
  let senha = "";
  let senha2 = "";

  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 255 });
  $: cpfValido = validateBr.cpf(cpf);
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;

  $: formularioValido =
    nomeValido && cpfValido && emailValido && senhaValida && senha2Valida;

  async function cadastrar() {
    carregando = true;
    cpf = cpf.replace(/[^\d]/g, "");
    const res = await postComprador({ nome, cpf, usuario: { email, senha } });
    carregando = false;
    if (res) {
      await autenticacao.logar({ email, senha }, false);
      dispatch("voltar");
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
    valido={nomeValido}
    mensagemValidacao="Insira um nome válido"
  />
  <Entrada
    id="cpf"
    label="CPF"
    on:input={(event) => (cpf = event.target.value)}
    valido={cpfValido}
    mensagemValidacao="Insira um CPF válido"
  />
  <Entrada
    id="email"
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
    label="Crie uma senha"
    on:input={(event) => (senha = event.target.value)}
    valido={senhaValida}
    mensagemValidacao="A senha deve conter, pelo menos, 6 caracteres"
  />
  <Entrada
    id="senha2"
    type="password"
    label="Repita sua senha"
    on:input={(event) => (senha2 = event.target.value)}
    valido={senha2Valida}
    mensagemValidacao="As senhas não coincidem"
  />
</div>

<div id="botoes">
  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  <Botao on:click={cadastrar} habilitado={formularioValido}>Salvar</Botao>
</div>
