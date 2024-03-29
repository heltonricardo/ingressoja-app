<script>
  import validator from "validator";
  import { maskBr } from "js-brasil";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import { onlyNumeros } from "../utils/sanitarizador";
  import TermosUso from "../TermosUso/TermosUso.svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import { postProdutora, putProdutora } from "../Conexao/produtoraConex";

  const dispatch = createEventDispatcher();

  export let dados = null;

  let carregando = false;
  let tocarCampos = false;
  let mostrarTermos = false;

  let senha = "";
  let senha2 = "";
  let aceitouTermos = false;
  let email = dados ? dados.email : "";
  let cnpj = dados ? maskBr.cnpj(dados.cnpj) : "";
  let publicToken = dados ? dados.publicToken : "";
  let razaoSocial = dados ? dados.razaoSocial : "";
  let nomeFantasia = dados ? dados.nomeFantasia : "";

  $: razaoSocialValida = validator.isLength(razaoSocial.trim(), {
    min: 1,
    max: 255,
  });
  $: cnpjValido = validateBr.cnpj(onlyNumeros(cnpj));
  $: nomeFantasiaValido = validator.isLength(nomeFantasia.trim(), {
    min: 1,
    max: 255,
  });
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;
  $: publicTokenValido = validator.isLength(publicToken, { min: 41, max: 41 });

  $: formularioValido =
    razaoSocialValida &&
    cnpjValido &&
    nomeFantasiaValido &&
    emailValido &&
    publicTokenValido &&
    senhaValida &&
    senha2Valida &&
    (aceitouTermos || dados);

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
      publicToken,
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
  .botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }

  .senha {
    margin: 3rem 0;
  }

  a {
    font-size: 12pt;
    color: var(--verde4);
    text-decoration: none;
  }

  a:hover {
    font-weight: bolder;
  }

  .termos {
    text-align: center;
    width: 100%;
  }

  .link-termos {
    border: none;
    font-size: 12pt;
    font-family: "Poppins", sans-serif;
    background-color: transparent;
    text-decoration: underline;
    color: #0000ee;
  }

  .link-termos:hover {
    cursor: pointer;
  }

  .link-termos:focus {
    outline: 0;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

{#if mostrarTermos}
  <TermosUso on:fechar={() => (mostrarTermos = false)} />
{/if}

<div class="corpo">
  <Entrada
    id="razaoSocial"
    disabled={dados}
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
  <Entrada
    maxlength="41"
    id="publicToken"
    value={publicToken}
    tocado={tocarCampos}
    valido={publicTokenValido}
    label="Public Token no Mercado Pago"
    mensagemValidacao="Insira um public token válido"
    on:input={(event) => (publicToken = event.target.value)}
  />
  <a
    target="_blank"
    href="https://ajuda.getcommerce.com.br/article/276-integracao-mercado-pago"
    >O que é public token?</a
  >
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

{#if !dados}
  <div class="termos">
    <label for="aceite-termos">
      <input type="checkbox" id="aceite-termos" bind:checked={aceitouTermos} />
      Li e concordo com os<button
        class="link-termos"
        on:click={() => (mostrarTermos = true)}
        >Termos de Uso da Plataforma IngressoJá!</button
      ></label
    >
    {#if !aceitouTermos && tocarCampos}
      <p class="error-message">
        Para concluir seu cadastro, é necessário concordar com os termos de uso
      </p>
    {/if}
  </div>
{/if}

<div class="botoes">
  <Botao on:click={voltar}>Voltar</Botao>
  <Botao on:click={salvar} invalido={!formularioValido}>Salvar</Botao>
</div>
