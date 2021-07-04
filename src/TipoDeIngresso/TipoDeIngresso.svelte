<script>
  import Icone from "../UI/Icone.svelte";

  export let tipoDeIngresso;
</script>

<style>
  #corpo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    padding: 0.5rem 0;
  }

  #textos {
    display: flex;
    flex-direction: column;
  }

  #nome {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  #descricao {
    color: var(--cinza3);
  }

  #controles {
    display: flex;
  }

  #controles span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    border: none;
    font-size: 1.5rem;
  }
</style>

<div id="corpo">
  <div id="textos">
    <div id="nome">
      {tipoDeIngresso.nome}
    </div>
    <div id="descricao">
      {tipoDeIngresso.descricao}
    </div>
  </div>

  <div id="controles">
    <Icone icon="minus" />
    <span>0</span>
    <Icone icon="plus" />
  </div>
</div>
