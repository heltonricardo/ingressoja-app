<script>
  import { createEventDispatcher, onMount } from "svelte";

  import validator from "validator";

  import { postAdministrador } from "../Conexao/administradorConex";
  import autenticacao from "../Autenticacao/autenticacao";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let nome = "";
  let email = "";
  let senha = "";
  let senha2 = "";

  $: nomeValido = validator.isLength(nome, { min: 1, max: 255 });
  $: emailValido = validator.isEmail(email);
  $: senhaValida = validator.isLength(senha, { min: 6, max: 30 });
  $: senha2Valida = validator.equals(senha, senha2) && senhaValida;

  $: formularioValido =
    nomeValido && emailValido && senhaValida && senha2Valida;

  async function cadastrar() {
    if (senha === senha2) {
      carregando = true;
      const res = await postAdministrador({ nome, email, usuario: { senha } });
      carregando = false;
      if (res) dispatch("minhaconta");
    }
  }

  onMount(() => {
    if (!autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR))
      dispatch("minhaconta");
  });
</script>

<style>
  #corpo {
    width: 30%;
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

  #senha {
    margin: 2rem 0;
  }

  #botoes {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
  }
</style>

<div id="corpo">
  <h1>Novo Administrador</h1>

  <div id="campos">
    <Entrada
      id="nome"
      label="Nome Completo"
      on:input={(event) => (nome = event.target.value)}
      valido={nomeValido}
      mensagemValidacao="Insira um nome válido"
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
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
    <Botao on:click={cadastrar} habilitado={formularioValido}>Salvar</Botao>
  </div>
</div>
