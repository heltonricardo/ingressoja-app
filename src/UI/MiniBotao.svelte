<script>
  export let habilitado = true;
</script>

<style>
  button {
    padding: 0.1rem;
    margin: 0.3rem;
    display: flex;
    align-items: center;
    width: max-content;
    height: 2rem;

    cursor: pointer;

    font-family: inherit;
    font-size: 1rem;

    background-color: var(--roxo1);
    color: var(--cinza1);
    border-radius: 10px;

    border-color: black;
    border-style: solid;
    border-width: 0.175rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    transition: 0.2s;
  }

  button:hover {
    background-color: var(--roxo2);
    transition: 0.2s;
  }

  button:disabled {
    color: var(--roxo2);
    background-color: var(--cinza1);
    transition: 0.2s;
    cursor: not-allowed;
  }
</style>

<button on:click disabled={!habilitado}>
  <slot />
</button>
