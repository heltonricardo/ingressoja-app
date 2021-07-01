<script>
  export let msgValidacao = "";

  export let nomeValido = true;
  export let descricaoValida = true;
  export let valorValido = true;
  export let qntValida = true;

  let nomeTocado = false;
  let descricaoTocada = false;
  let valorTocado = false;
  let qntTocada = false;
</script>

<style>
  #form-control {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
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
    background: white;
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
        class="grande"
        class:invalid={!nomeValido && nomeTocado}
        on:blur={() => (nomeTocado = true)}
      />
      {#if nomeTocado && !nomeValido}
        <p class="error-message">{msgValidacao}</p>
      {/if}
    </div>

    <div class="item">
      <label for="descricao">Descrição</label>
      <input
        id="descricao"
        type="text"
        class="grande"
        class:invalid={!descricaoValida && descricaoTocada}
        on:blur={() => (descricaoTocada = true)}
      />
      {#if descricaoTocada && !descricaoValida}
        <p class="error-message">{msgValidacao}</p>
      {/if}
    </div>
  </div>

  <div id="inferior">
    <div class="item">
      <label for="qnt">Quantidade</label>
      <input
        id="qnt"
        type="number"
        class="pequeno"
        class:invalid={!qntValida && qntTocada}
        on:blur={() => (qntTocada = true)}
      />
      {#if qntTocada && !qntValida}
        <p class="error-message">{msgValidacao}</p>
      {/if}
    </div>

    <div class="item">
      <label for="valor">Valor</label>
      <input
        id="valor"
        type="text"
        class="pequeno"
        class:invalid={!valorValido && valorTocado}
        on:blur={() => (valorTocado = true)}
      />
      {#if valorTocado && !valorValido}
        <p class="error-message">{msgValidacao}</p>
      {/if}
    </div>
  </div>
</div>
