<script>
  import Entrada from "../UI/Entrada.svelte";

  export let ingresso;
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
    on:input={(event) => (ingresso.ingressante = event.target.value)}
  />
  <Entrada
    id={`cpf${ingresso.ordem}`}
    label="CPF"
    on:input={(event) => (ingresso.cpf = event.target.value)}
  />
</div>
