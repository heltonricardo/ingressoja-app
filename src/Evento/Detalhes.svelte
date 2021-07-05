<script>
  import { createEventDispatcher } from "svelte";
  import eventoStore from "../Store/eventoStore";
  import TipoDeIngresso from "../TipoDeIngresso/TipoDeIngresso.svelte";
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
    width: 40%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  #imagem {
    width: 100%;
    height: 25rem;
    border-radius: 5px;
  }

  .titulo {
    margin: 1rem 0;
    font-size: 30pt;
  }

  #categoria {
    color: var(--cinza2);
  }

  #detalhes {
    display: flex;
    margin: 3rem 0;
    line-height: 2rem;
    width: fit-content;
    align-self: flex-end;
  }

  #dados {
    margin-left: 0.6rem;
  }

  #descricao {
    text-align: justify;
    line-height: 2rem;
    margin: 1rem 0;
  }

  #escolha {
    margin-top: 3rem;
    align-self: center;
  }
</style>

<div id="corpo">
  <img id="imagem" src={evento.imagemURL} alt={evento.titulo} />

  <h1 class="titulo">{evento.titulo}</h1>
  <h4 id="categoria">{evento.categoriaEvento.nome}</h4>

  <div id="detalhes">
    <div id="rotulos">
      <span id="local">
        {#if evento.online}
          <p>Evento On-line</p>
        {:else}
          <p>
            <i class={"fas fa-location-arrow"} />  Local:
          </p>
        {/if}
      </span>

      <span id="data-hora-inicio">
        <p>
          <i class={"fas fa-clock"} />  Início:
        </p>
      </span>

      <span id="data-hora-termino">
        <p>
          <i class="fas fa-hand-point-left" />  Término:
        </p>
      </span>
    </div>

    <div id="dados">
      <span id="local">
        {#if evento.online}
          <p>Evento On-line</p>
        {:else}
          <p>
            {evento.bairro}, {evento.cidade}-{evento.uf} • {evento.pais}
          </p>
        {/if}
      </span>

      <span id="data-hora-inicio">
        <p>
          {dataInicio} • {horarioInicio}
        </p>
      </span>

      <span id="data-hora-termino">
        <p>
          {dataTermino} • {horarioTermino}
        </p>
      </span>
    </div>
  </div>

  <span id="descricao">{evento.descricao}</span>

  <h2 class="titulo" id="escolha">Escolha os ingressos</h2>

  {#each evento.tiposDeIngresso as tipoDeIngresso}
    <TipoDeIngresso {tipoDeIngresso} />
  {/each}

  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
</div>
