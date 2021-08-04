<script>
  import validator from "validator";
  import { validateBr } from "js-brasil";

  import Entrada from "../UI/Entrada.svelte";

  export let ingresso = {
    nome: "",
    cpf: "",
    valido: false,
  };

  // Impedir erro de dependência cíclica:
  const validar = (flag) => (ingresso.valido = flag);

  $: nomeValido = validator.isLength(ingresso.nome.trim(), {
    min: 1,
    max: 255,
  });
  $: cpfValido = validateBr.cpf(ingresso.cpf || "");
  $: validar(nomeValido && cpfValido);
</script>

<style>
  #corpo {
    width: 100%;
    margin-top: 2rem;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  #titulo {
    text-align: center;
    font-size: 1.5rem;
  }
</style>

<div id="corpo">
  <span id="titulo">Ingresso #{ingresso.ordem + 1} • {ingresso.nome}</span>
  <Entrada
    id={`nome${ingresso.ordem}`}
    label="Nome"
    valido={nomeValido}
    mensagemValidacao="Insira um nome válido"
    on:input={(event) => (ingresso.ingressante = event.target.value)}
  />
  <Entrada
    id={`cpf${ingresso.ordem}`}
    label="CPF"
    valido={cpfValido}
    mensagemValidacao="Insira um CPF válido"
    on:input={(event) => (ingresso.cpf = event.target.value)}
  />
</div>
