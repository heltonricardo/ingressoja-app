<script>
  export let id;
  export let label;
  export let value = "";
  export let rows = 13;
  export let valido = true;
  export let type = "text";
  export let controlType = null;
  export let mensagemValidacao = "";
  export let validar = true;
  export let maxlength = "255";
  export let min = null;
  export let disabled = false;
  export let tocado = false;
</script>

<style>
  input,
  textarea {
    display: block;
    width: calc(100% - 0.5rem);
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  input:focus,
  textarea:focus {
    border-color: var(--roxo1);
    outline: none;
  }

  input:disabled,
  textarea:disabled {
    border-color: var(--cinza0-5);
    outline: none;
    cursor: no-drop;
  }

  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
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

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === "textarea"}
    <textarea
    {id}
    {rows}
    {value}
    {maxlength}
    on:input
    on:keypress
    on:blur={() => (tocado = true)}
    class:valid={validar && valido && tocado}
    class:invalid={validar && !valido && tocado}
    />
  {:else}
    <input
    {id}
    {min}
    {type}
    {value}
    {disabled}
    {maxlength}
    on:input
    on:keypress
    on:blur={() => (tocado = true)}
    class:valid={validar && valido && tocado}
    class:invalid={validar && !valido && tocado}
    />
  {/if}
  {#if tocado && !valido && mensagemValidacao}
    <p class="error-message">{mensagemValidacao}</p>
  {/if}
</div>
