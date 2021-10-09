<script>
  import validator from "validator";
  import { hojeStringISO } from "../utils/manipulaDataHora";

  export let terminoEvento;

  export let tipoDeIngresso = {
    nome: "",
    valor: 0.0,
    descricao: "",
    tipoValido: false,
    inicio: hojeStringISO,
    termino: terminoEvento,
    quantidadeDisponivel: 1,
  };

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  let qntTocada = false;
  let nomeTocado = false;
  let valorTocado = false;
  let inicioTocado = false;
  let terminoTocado = false;
  let descricaoTocada = false;

  // Para evitar o erro de dependência cíclica:
  const validar = (flag) => (tipoDeIngresso.tipoValido = flag);

  $: nomeValido = validator.isLength(tipoDeIngresso.nome.trim(), {
    min: 1,
    max: 30,
  });
  $: descricaoValida = validator.isLength(tipoDeIngresso.descricao, {
    max: 50,
  });
  $: valorValido =
    validator.isNumeric(tipoDeIngresso.valor + "") && tipoDeIngresso.valor >= 0;
  $: qntValida = tipoDeIngresso.quantidadeDisponivel > 0;
  $: inicioValido =
    validator.isBefore(hojeStringISO, tipoDeIngresso.inicio) &&
    validator.isBefore(tipoDeIngresso.inicio, terminoEvento);
  $: terminoValido =
    validator.isBefore(tipoDeIngresso.inicio, tipoDeIngresso.termino) &&
    validator.isBefore(tipoDeIngresso.termino, terminoEvento);

  $: validar(
    nomeValido &&
      descricaoValida &&
      valorValido &&
      qntValida &&
      inicioValido &&
      terminoValido
  );
</script>

<style>
  input {
    color: black;
  }
  #form-control {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .item {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  #inferior {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  input {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  input:focus {
    border-color: var(--roxo1);
    outline: none;
  }

  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .valid {
    border-color: rgb(0, 192, 10);
    background: #e3fde9;
  }

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>

<div id="form-control">
  <div id="superior">
    <div class="item">
      <label for="nome">Nome</label>
      <input
        id="nome"
        type="text"
        maxlength="30"
        bind:value={tipoDeIngresso.nome}
        on:blur={() => (nomeTocado = true)}
        class:valid={nomeValido && nomeTocado}
        class:invalid={!nomeValido && nomeTocado}
      />
      {#if nomeTocado && !nomeValido}
        <p class="error-message">Insira um nome válido</p>
      {/if}
    </div>

    <div class="item">
      <label for="descricao">Descrição</label>
      <input
        type="text"
        id="descricao"
        maxlength="50"
        bind:value={tipoDeIngresso.descricao}
        on:blur={() => (descricaoTocada = true)}
        class:valid={descricaoValida && descricaoTocada}
        class:invalid={!descricaoValida && descricaoTocada}
      />
      {#if descricaoTocada && !descricaoValida}
        <p class="error-message">Insira uma descrição com até 50 caracteres</p>
      {/if}
    </div>

    <div class="item">
      <label for="qnt">Data de início das vendas</label>
      <input
        id="inicio"
        max={terminoEvento}
        min={hojeStringISO}
        type="datetime-local"
        bind:value={tipoDeIngresso.inicio}
        on:blur={() => (inicioTocado = true)}
        class:valid={inicioValido && inicioTocado}
        class:invalid={!inicioValido && inicioTocado}
      />
      {#if inicioTocado && !inicioValido}
        <p class="error-message">
          Insira um momento entre agora e o término do evento
        </p>
      {/if}
    </div>

    <div class="item">
      <label for="valor">Data de término das vendas</label>
      <input
        id="valor"
        max={terminoEvento}
        type="datetime-local"
        min={tipoDeIngresso.inicio}
        bind:value={tipoDeIngresso.termino}
        on:blur={() => (terminoTocado = true)}
        class:valid={terminoValido && terminoTocado}
        class:invalid={!terminoValido && terminoTocado}
      />
      {#if terminoTocado && !terminoValido}
        <p class="error-message">
          Insira uma data entre o início da venda do ingresso e o término do
          evento
        </p>
      {/if}
    </div>
  </div>

  <div id="inferior">
    <div class="item">
      <label for="qnt">Quantidade</label>
      <input
        min="1"
        id="qnt"
        type="number"
        on:blur={() => (qntTocada = true)}
        class:valid={qntValida && qntTocada}
        class:invalid={!qntValida && qntTocada}
        bind:value={tipoDeIngresso.quantidadeDisponivel}
      />
      {#if qntTocada && !qntValida}
        <p class="error-message">Insira uma quantidade válida</p>
      {/if}
    </div>

    <div class="item">
      <label for="valor">Valor (R$)</label>
      <input
        id="valor"
        type="text"
        bind:value={tipoDeIngresso.valor}
        on:blur={() => (valorTocado = true)}
        class:valid={valorValido && valorTocado}
        class:invalid={!valorValido && valorTocado}
      />
      {#if valorTocado && !valorValido}
        <p class="error-message">Insira um valor válido</p>
      {/if}
    </div>
  </div>
</div>
