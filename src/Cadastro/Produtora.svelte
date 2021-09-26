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

  let razaoSocial = dados ? dados.razaoSocial : "";
  let cnpj = dados ? maskBr.cnpj(dados.cnpj) : "";
  let nomeFantasia = dados ? dados.nomeFantasia : "";
  let email = dados ? dados.email : "";
  let banco = dados ? dados.banco : "";
  let agencia = dados ? dados.agencia : "";
  let conta = dados ? dados.conta : "";
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
    id="razaoSocial"
    label="Razão Social"
    value={razaoSocial}
    disabled={dados}
    on:input={(event) => (razaoSocial = event.target.value)}
    valido={razaoSocialValida}
    mensagemValidacao="Insira uma razão social válida"
  />
  <Entrada
    id="cnpj"
    label="CNPJ"
    value={cnpj}
    disabled={dados}
    on:input={(event) => (cnpj = event.target.value)}
    valido={cnpjValido}
    mensagemValidacao="Insira um CNPJ válido"
  />
  <Entrada
    id="nomeFantasia"
    label="Nome Fantasia"
    value={nomeFantasia}
    on:input={(event) => (nomeFantasia = event.target.value)}
    valido={nomeFantasiaValido}
    mensagemValidacao="Insira um nome fantasia válido"
  />
  <Entrada
    id="email"
    label="E-mail"
    value={email}
    on:input={(event) => (email = event.target.value)}
    valido={emailValido}
    mensagemValidacao="Insira um e-mail válido"
  />

  <h3 id="subtitulo">Dados bancários:</h3>

  <Entrada
    id="banco"
    label="Banco"
    value={banco}
    on:input={(event) => (banco = event.target.value)}
    valido={bancoValido}
    mensagemValidacao="Insira um nome de banco válido"
    maxlength="100"
  />
  <Entrada
    id="agencia"
    label="Agência"
    value={agencia}
    on:input={(event) => (agencia = event.target.value)}
    valido={agenciaValida}
    mensagemValidacao="Insira um número de agência válido"
    maxlength="50"
  />
  <Entrada
    id="conta"
    label="Conta"
    value={conta}
    on:input={(event) => (conta = event.target.value)}
    valido={contaValida}
    mensagemValidacao="Insira um número de conta válido"
    maxlength="50"
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
