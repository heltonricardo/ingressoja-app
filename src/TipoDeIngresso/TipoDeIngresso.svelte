<script>
  import { valorVirgula } from "../utils/formatador";
  import Icone from "../UI/Icone.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let tipoDeIngresso;

  tipoDeIngresso.quantidade = 0;

  function diminuir() {
    tipoDeIngresso.quantidade = Math.max(0, tipoDeIngresso.quantidade - 1);
    dispatch("calcular")
  }
  
  function aumentar() {
    tipoDeIngresso.quantidade = Math.min(
      tipoDeIngresso.quantidade + 1,
      tipoDeIngresso.quantidadeDisponivel
      );
      dispatch("calcular")
  }
</script>

<style>
  .corpo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    padding: 0.5rem 0;
  }

  .textos {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nome {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .descricao {
    color: var(--cinza3);
  }

  .controles {
    display: flex;
  }

  .controles span {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 3rem;
    border: none;
    font-size: 1.5rem;
    padding-top: 1rem;
  }
</style>

<div class="corpo">
  <div class="textos">
    <div class="nome">
      {tipoDeIngresso.nome} • R$ {valorVirgula(tipoDeIngresso.valor)}
    </div>
    <div class="descricao">
      {tipoDeIngresso.descricao}
    </div>
  </div>

  <div class="controles">
    <Icone icon="minus" on:click={diminuir} />
    <span>{tipoDeIngresso.quantidade}</span>
    <Icone icon="plus" on:click={aumentar} />
  </div>
</div>
