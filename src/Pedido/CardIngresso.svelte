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
    background-color: rgba(231, 241, 235, 0.445);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    display: flex;
    flex-direction: column;
  }

  #titulo {
    text-align: center;
  }
</style>

<div id="corpo">
  <span id="titulo">{ingresso.nome}</span>
  <Entrada
    id={`nome${ingresso.dom}`}
    label="Nome"
    on:input={(event) => (ingresso.ingressante = event.target.value)}
  />
  <Entrada
    id={`cpf${ingresso.dom}`}
    label="CPF"
    on:input={(event) => (ingresso.cpf = event.target.value)}
  />
  <Entrada
    id={`email${ingresso.dom}`}
    label="E-mail"
    on:input={(event) => (ingresso.email = event.target.value)}
  />
</div>
