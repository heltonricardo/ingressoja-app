<script>
  import validator from "validator";
  import { maskBr } from "js-brasil";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import { onlyNumeros } from "../utils/sanitarizador";
  import autenticacao from "../Autenticacao/autenticacao";
  import { postComprador, putComprador } from "../Conexao/compradorConex";

  const dispatch = createEventDispatcher();

  export let dados = null;
  
  let carregando = false;
  let tocarCampos = false;

  let senha = "";
  let senha2 = "";
  let nome = dados ? dados.nome : "";
  let email = dados ? dados.email : "";
  let cpf = dados ? maskBr.cpf(dados.cpf) : "";

  $: cpfValido = validateBr.cpf(cpf);
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;
  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 255 });

  $: formularioValido =
    nomeValido && cpfValido && emailValido && senhaValida && senha2Valida;

  function voltar() {
    dados ? dispatch("meusdados") : dispatch("voltar");
  }

  async function salvar() {
    if (!formularioValido) {
      tocarCampos = true;
      return;
    }

    carregando = true;
    cpf = onlyNumeros(cpf);
    const obj = { nome, cpf, usuario: { email, senha } };
    const res = dados ? await putComprador(obj) : await postComprador(obj);
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
    value={nome}
    valido={nomeValido}
    tocado={tocarCampos}
    label="Nome Completo"
    mensagemValidacao="Insira um nome válido"
    on:input={(event) => (nome = event.target.value)}
  />
  <Entrada
    id="cpf"
    label="CPF"
    value={cpf}
    disabled={dados}
    valido={cpfValido}
    tocado={tocarCampos}
    mensagemValidacao="Insira um CPF válido"
    on:input={(event) => (cpf = event.target.value)}
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

<div id="senha">
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

<div id="botoes">
  <Botao on:click={voltar}>Voltar</Botao>
  <Botao on:click={salvar} invalido={!formularioValido}>Salvar</Botao>
</div>
