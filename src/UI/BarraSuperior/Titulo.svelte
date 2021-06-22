<style>
  .content {
    display: flex;
    height: inherit;
    align-items: center;
    text-decoration: none;
    color: var(--roxo2);
    cursor: pointer;
  }

  .nome {
    vertical-align: middle;
    font-size: 3rem;
    margin-left: 1rem;
    margin-right: 1rem;
    font-weight: bold;
    -webkit-filter: drop-shadow(1px 1px 1px #222);
    filter: drop-shadow(1px 1px 1px #222);
  }

  .logo {
    width: 5rem;
    -webkit-filter: drop-shadow(1px 1px 1px #222);
    filter: drop-shadow(1px 1px 1px #222);
  }

</style>

<div class="content" on:click>
  <h1 class="nome">IngressoJá!</h1>
  <img class="logo" src="./assets/ticket.png" alt="Ticket" />
</div>
