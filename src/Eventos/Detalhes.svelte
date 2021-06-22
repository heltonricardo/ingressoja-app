<script>
  import { createEventDispatcher } from "svelte";
  import eventoStore from "../Stores/eventoStore";
  import Botao from "../UI/Botao.svelte";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  const dispatch = createEventDispatcher();

  export let id = 1;

  const evento = $eventoStore.find((e) => e.id === id);
  const { data: dataInicio, horario: horarioInicio } = extrairDataHora(
    evento.inicio
  );
  const { data: dataTermino, horario: horarioTermino } = extrairDataHora(
    evento.termino
  );
</script>

<style>
  #corpo {
    width: 50%;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
  }

  #imagem {
    width: 100%;
    height: 25rem;
    border-radius: 5px;
  }

  #nome {
    margin: 1rem 0;
    font-size: 30pt;
  }

  #detalhes {
    display: flex;
    flex-direction: column;
    margin: 3rem 0;
    gap: 1rem;
  }

  #descricao {
    margin: 2rem 0;
  }
</style>

<div id="corpo">
  <img id="imagem" src={evento.imagemURL} alt={evento.nome} />

  <h1 id="nome">{evento.nome}</h1>

  <div id="detalhes">
    <span id="local">
      {#if evento.online}
        Evento On-line
      {:else}
        Local: {evento.bairro}, {evento.cidade}-{evento.uf} • {evento.pais}
      {/if}
    </span>

    <span id="data-hora-inicio">
      Início: {dataInicio} • {horarioInicio}
    </span>

    <span id="data-hora-termino">
      Término: {dataTermino} • {horarioTermino}
    </span>
  </div>

  <span id="descricao">{evento.descricao}</span>

  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
</div>
