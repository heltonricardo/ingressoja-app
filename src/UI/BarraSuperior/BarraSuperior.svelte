<script>
  import Pesquisa from "./Pesquisa.svelte";
  import Titulo from "./Titulo.svelte";
  import Opcoes from "./Opcoes.svelte";
</script>

<style>
  .principal {
    display: flex;
    justify-content: space-between;
    height: 7rem;
    width: 100%;
    background-color: var(--laranja-claro);
    align-items: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
</style>

<div class="principal">
  <Titulo />
  <Pesquisa />
  <Opcoes />
</div>
