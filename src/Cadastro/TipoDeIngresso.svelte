<script>
  import validator from "validator";

  export let tipoDeIngresso = {
    nome: "",
    valor: 0.0,
    descricao: "",
    quantidadeTotal: 1,
    tipoValido: false,
  };

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  let nomeTocado = false;
  let descricaoTocada = false;
  let valorTocado = false;
  let qntTocada = false;

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
  $: qntValida = tipoDeIngresso.quantidadeTotal > 0;

  $: validar(nomeValido && descricaoValida && valorValido && qntValida);
</script>

<style>
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
        class:valid={nomeValido && nomeTocado}
        class:invalid={!nomeValido && nomeTocado}
        maxlength="30"
        bind:value={tipoDeIngresso.nome}
        on:blur={() => (nomeTocado = true)}
      />
      {#if nomeTocado && !nomeValido}
        <p class="error-message">Insira um nome válido</p>
      {/if}
    </div>

    <div class="item">
      <label for="descricao">Descrição</label>
      <input
        id="descricao"
        type="text"
        class:valid={descricaoValida && descricaoTocada}
        class:invalid={!descricaoValida && descricaoTocada}
        maxlength="50"
        bind:value={tipoDeIngresso.descricao}
        on:blur={() => (descricaoTocada = true)}
      />
      {#if descricaoTocada && !descricaoValida}
        <p class="error-message">Insira uma descrição com até 50 caracteres</p>
      {/if}
    </div>
  </div>

  <div id="inferior">
    <div class="item">
      <label for="qnt">Quantidade</label>
      <input
        id="qnt"
        type="number"
        min="1"
        class:valid={qntValida && qntTocada}
        class:invalid={!qntValida && qntTocada}
        bind:value={tipoDeIngresso.quantidadeTotal}
        on:blur={() => (qntTocada = true)}
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
        class:valid={valorValido && valorTocado}
        class:invalid={!valorValido && valorTocado}
        bind:value={tipoDeIngresso.valor}
        on:blur={() => (valorTocado = true)}
      />
      {#if valorTocado && !valorValido}
        <p class="error-message">Insira um valor válido</p>
      {/if}
    </div>
  </div>
</div>
