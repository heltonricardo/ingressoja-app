<style>
  button {
    padding: 0.5rem;
    margin: 0.3rem;

    font-family: inherit;
    font-size: 1.3rem;

    background-color: var(--laranja-escuro);
    color: #eee;
    height: 3rem;
    border-radius: 10px;
    
    border-color: black;
    border-style: solid;
    border-width: 0.175rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  button:hover {
    background-color: royalblue;
  }
</style>

<button on:click><slot /></button>
