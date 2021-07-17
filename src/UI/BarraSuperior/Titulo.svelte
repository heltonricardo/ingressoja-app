<style>
  #content {
    display: flex;
    height: inherit;
    align-items: center;
    text-decoration: none;
    color: var(--roxo2);
    cursor: pointer;
    margin: 0.5rem 0;
  }

  #nome {
    vertical-align: middle;
    font-size: 3rem;
    margin-left: 1rem;
    margin-right: 1rem;
    font-weight: bold;
    -webkit-filter: drop-shadow(1px 1px 1px #222);
    filter: drop-shadow(1px 1px 1px #222);
  }
  
  #logo {
    width: 5rem;
    margin-right: 1rem;
    -webkit-filter: drop-shadow(1px 1px 1px #222);
    filter: drop-shadow(1px 1px 1px #222);
  }

</style>

<div id="content" on:click>
  <h1 id="nome">IngressoJá!</h1>
  <img id="logo" src="./assets/ticket.png" alt="Ticket" />
</div>
