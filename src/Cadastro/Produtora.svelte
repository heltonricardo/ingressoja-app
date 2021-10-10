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
  import { postProdutora, putProdutora } from "../Conexao/produtoraConex";

  const dispatch = createEventDispatcher();

  export let dados = null;

  let carregando = false;
  let tocarCampos = false;

  let senha = "";
  let senha2 = "";
  let banco = dados ? dados.banco : "";
  let conta = dados ? dados.conta : "";
  let email = dados ? dados.email : "";
  let agencia = dados ? dados.agencia : "";
  let cnpj = dados ? maskBr.cnpj(dados.cnpj) : "";
  let razaoSocial = dados ? dados.razaoSocial : "";
  let nomeFantasia = dados ? dados.nomeFantasia : "";

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
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
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

  function voltar() {
    dados ? dispatch("meusdados") : dispatch("voltar");
  }
  async function salvar() {
    if (!formularioValido) {
      tocarCampos = true;
      return;
    }

    carregando = true;
    cnpj = onlyNumeros(cnpj);
    const obj = {
      razaoSocial,
      cnpj,
      nomeFantasia,
      banco,
      agencia,
      conta,
      usuario: { email, senha },
    };
    const res = dados ? await putProdutora(obj) : await postProdutora(obj);
    carregando = false;
    if (res) {
      await autenticacao.logar({ email, senha }, false);
      voltar();
    } else cnpj = maskBr.cnpj(cnpj);
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
    disabled={dados}
    id="razaoSocial"
    value={razaoSocial}
    label="Razão Social"
    tocado={tocarCampos}
    valido={razaoSocialValida}
    mensagemValidacao="Insira uma razão social válida"
    on:input={(event) => (razaoSocial = event.target.value)}
  />
  <Entrada
    id="cnpj"
    label="CNPJ"
    value={cnpj}
    disabled={dados}
    valido={cnpjValido}
    tocado={tocarCampos}
    mensagemValidacao="Insira um CNPJ válido"
    on:input={(event) => (cnpj = event.target.value)}
  />
  <Entrada
    id="nomeFantasia"
    tocado={tocarCampos}
    value={nomeFantasia}
    label="Nome Fantasia"
    valido={nomeFantasiaValido}
    mensagemValidacao="Insira um nome fantasia válido"
    on:input={(event) => (nomeFantasia = event.target.value)}
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

  <h3 id="subtitulo">Dados bancários:</h3>

  <Entrada
    id="banco"
    label="Banco"
    value={banco}
    maxlength="100"
    tocado={tocarCampos}
    valido={bancoValido}
    mensagemValidacao="Insira um nome de banco válido"
    on:input={(event) => (banco = event.target.value)}
  />
  <Entrada
    id="agencia"
    maxlength="50"
    label="Agência"
    value={agencia}
    tocado={tocarCampos}
    valido={agenciaValida}
    on:input={(event) => (agencia = event.target.value)}
    mensagemValidacao="Insira um número de agência válido"
  />
  <Entrada
    id="conta"
    label="Conta"
    value={conta}
    maxlength="50"
    tocado={tocarCampos}
    valido={contaValida}
    on:input={(event) => (conta = event.target.value)}
    mensagemValidacao="Insira um número de conta válido"
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
