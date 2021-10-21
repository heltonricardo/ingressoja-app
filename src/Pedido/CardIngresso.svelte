<script>
  import validator from "validator";
  import { validateBr } from "js-brasil";

  import Entrada from "../UI/Entrada.svelte";

  export let ingresso = {
    cpf: "",
    valido: false,
    ingressante: "",
  };
  export let tocarCampos = false;

  // Impedir erro de dependência cíclica:
  const validar = (flag) => (ingresso.valido = flag);

  $: nomeValido = validator.isLength(ingresso.ingressante?.trim() || "", {
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
    label="Nome"
    valido={nomeValido}
    tocado={tocarCampos}
    id={`nome${ingresso.ordem}`}
    mensagemValidacao="Insira um nome válido"
    on:input={(event) => (ingresso.ingressante = event.target.value)}
  />
  <Entrada
    label="CPF"
    valido={cpfValido}
    tocado={tocarCampos}
    id={`cpf${ingresso.ordem}`}
    mensagemValidacao="Insira um CPF válido"
    on:input={(event) => (ingresso.cpf = event.target.value)}
  />
</div>
