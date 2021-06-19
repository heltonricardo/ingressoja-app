<script>
  export let icon;
</script>

<style>
  button {
    padding: 0.5rem;
    margin: 0.3rem;
    display: flex;

    font-family: inherit;
    font-size: 1.3rem;

    background-color: var(--roxo1);
    color: var(--cinza1);
    height: 3rem;
    width: 5rem;
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

  span {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 2rem;
    color: var(--cinza1);
    align-items: center;
    justify-content: center;
  }
</style>

<button on:click>
  <span>
    <i class={`fas fa-${icon}`} />
  </span>
</button>
