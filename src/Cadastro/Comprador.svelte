<script>
  import validator from "validator";
  import { maskBr } from "js-brasil";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import { postComprador, putComprador } from "../Conexao/compradorConex";

  const dispatch = createEventDispatcher();

  export let dados = null;
  let carregando = false;

  let nome = dados ? dados.nome : "";
  let cpf = dados ? maskBr.cpf(dados.cpf) : "";
  let email = dados ? dados.email : "";
  let senha = "";
  let senha2 = "";

  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 255 });
  $: cpfValido = validateBr.cpf(cpf);
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;

  $: formularioValido =
    nomeValido && cpfValido && emailValido && senhaValida && senha2Valida;

  function voltar() {
    if (dados) dispatch("minhaconta");
    else dispatch("voltar");
  }

  async function salvar() {
    carregando = true;
    cpf = cpf.replace(/[^\d]/g, "");
    const res = dados
      ? await putComprador({ nome, cpf, usuario: { email, senha } })
      : await postComprador({ nome, cpf, usuario: { email, senha } });
    carregando = false;
    if (res) {
      await autenticacao.logar({ email, senha }, false);
      voltar();
    } else {
      cpf = maskBr.cpf(cpf);
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
    value={nome}
    disabled={true}
    on:input={(event) => (nome = event.target.value)}
    valido={nomeValido}
    mensagemValidacao="Insira um nome válido"
  />
  <Entrada
    id="cpf"
    label="CPF"
    value={cpf}
    disabled={true}
    on:input={(event) => (cpf = event.target.value)}
    valido={cpfValido}
    mensagemValidacao="Insira um CPF válido"
  />
  <Entrada
    id="email"
    label="E-mail"
    value={email}
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
