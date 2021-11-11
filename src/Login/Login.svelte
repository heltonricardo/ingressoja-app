<script>
  import validator from "validator";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import autenticacao from "../Autenticacao/autenticacao";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let email = "";
  let senha = "";
  let tocarCampos = false;

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 50 });
  $: formularioValido = emailValido && senhaValida;

  /********************************** ENTRAR **********************************/

  async function entrar() {
    if (!formularioValido) {
      tocarCampos = true;
      return;
    }

    carregando = true;
    const login = await autenticacao.logar({ email, senha }, true);
    carregando = false;

    if (login) dispatch("voltar");
  }
</script>

<style>
  .corpo {
    width: 30rem;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
    min-height: calc(100vh - 20rem);
    justify-content: center;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  .botoes {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .duplo {
    display: flex;
    margin-top: 0.5rem;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  <h1>Realize seu login</h1>
  <div class="campos">
    <Entrada
      id="email"
      label="E-mail"
      tocado={tocarCampos}
      valido={emailValido}
      mensagemValidacao="Insira um e-mail válido"
      on:input={(event) => (email = event.target.value)}
    />
    <Entrada
      id="senha"
      label="Senha"
      maxlength="50"
      type="password"
      tocado={tocarCampos}
      valido={senhaValida}
      on:input={(event) => (senha = event.target.value)}
      on:keypress={(e) => "NumpadEnter".includes(e.code) && entrar()}
      mensagemValidacao="A senha deve conter, pelo menos, 6 caracteres"
    />
  </div>

  <div class="botoes">
    <Botao on:click={entrar} invalido={!formularioValido}>Entrar</Botao>
    <div class="duplo">
      <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
      <Botao on:click={() => dispatch("cadastro")}>Cadastre-se</Botao>
    </div>
  </div>
</div>
