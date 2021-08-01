<script>
  import { createEventDispatcher } from "svelte";

  import validator from "validator";
  import { validateBr } from "js-brasil";

  import autenticacao from "../Autenticacao/autenticacao";
  import { postProdutora } from "../Conexao/produtoraConex";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let razaoSocial = "";
  let cnpj = "";
  let nomeFantasia = "";
  let email = "";
  let banco = "";
  let agencia = "";
  let conta = "";
  let senha = "";
  let senha2 = "";

  $: razaoSocialValida = validator.isLength(razaoSocial.trim(), {
    min: 1,
    max: 255,
  });
  $: cnpjValido = validateBr.cnpj(cnpj);
  $: nomeFantasiaValido = validator.isLength(nomeFantasia.trim(), {
    min: 1,
    max: 255,
  });
  $: emailValido = validator.isEmail(email);
  $: bancoValido = validator.isLength(banco, { min: 1, max: 100 });
  $: agenciaValida = validator.isLength(agencia, { min: 1, max: 50 });
  $: contaValida = validator.isLength(conta, { min: 1, max: 50 });
  $: senhaValida = validator.isLength(senha, { min: 6, max: 30 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;

  $: formularioValido =
    razaoSocialValida &&
    cnpjValido &&
    nomeFantasiaValido &&
    emailValido &&
    bancoValido &&
    agenciaValida &&
    contaValida &&
    senhaValida &&
    senha2Valida;

  async function cadastrar() {
    carregando = true;
    cnpj = cnpj.replace(/[^\d]/g, "");
    const res = await postProdutora({
      razaoSocial,
      cnpj,
      nomeFantasia,
      email,
      banco,
      agencia,
      conta,
      usuario: { senha },
    });
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

  #subtitulo {
    margin: 4rem 0 2rem 0;
    text-align: center;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <Entrada
    id="razaoSocial"
    label="Razão Social"
    on:input={(event) => (razaoSocial = event.target.value)}
    valido={razaoSocialValida}
    mensagemValidacao="Insira uma razão social válida"
  />
  <Entrada
    id="cnpj"
    label="CNPJ"
    on:input={(event) => (cnpj = event.target.value)}
    valido={cnpjValido}
    mensagemValidacao="Insira um CNPJ válido"
  />
  <Entrada
    id="nomeFantasia"
    label="Nome Fantasia"
    on:input={(event) => (nomeFantasia = event.target.value)}
    valido={nomeFantasiaValido}
    mensagemValidacao="Insira um nome fantasia válido"
  />
  <Entrada
    id="email"
    label="E-mail"
    on:input={(event) => (email = event.target.value)}
    valido={emailValido}
    mensagemValidacao="Insira um e-mail válido"
  />

  <h3 id="subtitulo">Dados bancários:</h3>

  <Entrada
    id="banco"
    label="Banco"
    on:input={(event) => (banco = event.target.value)}
    valido={bancoValido}
    mensagemValidacao="Insira um nome de banco válido"
  />
  <Entrada
    id="agencia"
    label="Agência"
    on:input={(event) => (agencia = event.target.value)}
    valido={agenciaValida}
    mensagemValidacao="Insira um número de agência válido"
  />
  <Entrada
    id="conta"
    label="Conta"
    on:input={(event) => (conta = event.target.value)}
    valido={contaValida}
    mensagemValidacao="Insira um número de conta válido"
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
