<script>
  import { createEventDispatcher } from "svelte";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import Botao from "../UI/Botao.svelte";

  const dispatch = createEventDispatcher();

  export let evento;

  const {dia, mes} = extrairDataHora(evento.inicio)
</script>

<style>
  #card {
    margin: 2rem 2rem;
    width: 40%;
    min-width: 40rem;
    height: 25rem;

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
    box-sizing: border-box;
    padding: 0.5rem;
    justify-content: space-between;
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 100%;
  }

  #titulo {
    display: flex;
    font-size: 1.5rem;
    height: 2rem;
    margin-bottom: 0.5rem;
    align-self: flex-start;
    align-items: center;
  }

  #imagem {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  #imagem img {
    width: inherit;
    height: inherit;
    border-radius: 5px;
  }

  #detalhes {
    border-left: 5px dotted;
    width: 25%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  #local {
    font-size: 1.25rem;
    color: #777;
    text-align: center;
  }

  #data {
    width: 100%;
    height: 13rem;
  }

  #dia {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-weight: bold;
    color: var(--roxo2);
    font-size: 80pt;
    height: 9rem;
  }

  #mes {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 4rem;
    font-size: 18pt;
  }
</style>

<div id="card">
  <div id="principal">
    <div id="titulo">
      <h1>{evento.nome}</h1>
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
    </div>

    <div>
      <Botao on:click={() => dispatch("vermais", evento.id)}>Ver mais</Botao>
    </div>
  </div>
</div>
