<script>
  import Icone from "../Icone.svelte";
</script>

<style>
  #conteudo {
    display: flex;
    height: inherit;
    align-items: center;
  }

  #entrada {
    border-radius: 5px;
    height: 3rem;
    width: 30rem;
    font-family: inherit;
    font-size: 1.5rem;
    margin-right: 1rem;
    outline: none;
    background-color: var(--verde2);
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<div id="conteudo">
  <input id="entrada" type="search" placeholder="Procure um evento..." />
  <Icone icon="search" />
</div>
