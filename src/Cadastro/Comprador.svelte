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
  let aceitouTermos = false;
  let nome = dados ? dados.nome : "";
  let email = dados ? dados.email : "";
  let cpf = dados ? maskBr.cpf(dados.cpf) : "";

  $: emailValido = validator.isEmail(email);
  $: cpfValido = validateBr.cpf(onlyNumeros(cpf));
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;
  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 255 });

  $: formularioValido =
    nomeValido &&
    cpfValido &&
    emailValido &&
    senhaValida &&
    senha2Valida &&
    aceitouTermos;

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
  .botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }

  .senha {
    margin: 3rem 0;
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

<div class="termos">
  <label for="aceite-termos">
    <input type="checkbox" id="aceite-termos" bind:checked={aceitouTermos} />
    Li e concordo com os<button class="link-termos"
      >Termos de Uso da Plataforma IngressoJá!</button
    ></label
  >
  {#if !aceitouTermos && tocarCampos}
    <p class="error-message">
      Para concluir seu cadastro, é necessário concordar com os termos de uso
    </p>
  {/if}
</div>

<div class="botoes">
  <Botao on:click={voltar}>Voltar</Botao>
  <Botao on:click={salvar} invalido={!formularioValido}>Salvar</Botao>
</div>
