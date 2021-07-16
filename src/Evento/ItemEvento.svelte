<script>
  import { createEventDispatcher } from "svelte";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import Botao from "../UI/Botao.svelte";

  const dispatch = createEventDispatcher();

  export let evento;

  const { dia, mes, ano, anoAtual } = extrairDataHora(evento.inicio);
</script>

<style>
  #card {
    margin: 1.5rem 1.5rem;
    width: 40%;
    min-width: 28.5rem;
    max-width: 38rem;
    height: 23rem;

    display: flex;
    box-sizing: border-box;
    background-color: var(--cinza1);

    border: 0.125rem solid black;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    transition: 0.2s;
  }

  #card:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    transition: 0.2s;
  }

  #principal {
    padding: 0.5rem;
    width: 75%;
    max-width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    min-width: 0;
  }

  #titulo {
    display: flex;
    width: 100%;
    height: 2rem;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    align-self: flex-start;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
  }

  #imagem {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
  }

  #imagem img {
    width: inherit;
    height: inherit;
    border-radius: 5px;
  }

  #detalhes {
    border-left: 5px dotted;
    width: 25%;
    min-width: 25%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  #local {
    font-size: 1.25rem;
    text-align: center;
    color: #777;
  }

  #data {
    width: 100%;
    height: fit-content;
  }

  #dia {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-weight: bold;
    font-size: 5.5rem;
    height: fit-content;
    color: var(--roxo2);
  }
  
  #mes {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: fit-content;
    font-size: 18pt;
    margin: 0.3rem 0;
  }
  
  #ano {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: fit-content;
    font-size: 18pt;
  }
</style>

<div id="card">
  <div id="principal">
    <div id="titulo">
      <h1>{evento.titulo}</h1>
    </div>

    <div id="imagem">
      <img src={evento.imagemURL} alt={evento.titulo} />
    </div>
  </div>

  <div id="detalhes">
    <div id="local">
      {#if evento.url}
        <p>On-line</p>
      {:else}
        <p>{evento.cidade}-{evento.uf}</p>
      {/if}
    </div>

    <div id="data">
      <div id="dia">
        <p>{dia}</p>
      </div>
      <div id="mes">
        <p>{mes}</p>
      </div>
      {#if ano !== anoAtual}
      <div id="ano">
        <p>{ano}</p>
      </div>
      {/if}
    </div>

    <div>
      <Botao on:click={() => dispatch("vermais", evento.id)}>Ver mais</Botao>
    </div>
  </div>
</div>
