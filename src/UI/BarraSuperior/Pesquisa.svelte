<script>
  import Botao from "../Botao.svelte";
</script>

<style>
  .conteudo {
    display: flex;
    height: inherit;
    align-items: center;
  }

  .entrada {
    border-radius: 5px;
    height: 3rem;
    width: 30rem;
    font-family: inherit;
    font-size: 1.5rem;
    margin-right: 1rem;
    outline: none;
  }
</style>

<div class="conteudo">
  <input class="entrada" type="text" placeholder="Encontre um evento..." />
  <Botao>Procurar</Botao>
</div>
