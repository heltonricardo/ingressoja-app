<style>
  button {
    padding: 0.5rem;
    margin: 0.3rem;

    font-family: inherit;
    font-size: 1.3rem;

    background-color: var(--roxo1);
    color: var(--cinza1);
    height: 3rem;
    border-radius: 10px;
    
    border-color: var(--roxo2);
    border-style: solid;
    border-width: 0.175rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  
  button:hover {
    background-color: var(--roxo2);
    border-color: var(--roxo1);
    transition: .2s;
  }
</style>

<button on:click><slot /></button>
