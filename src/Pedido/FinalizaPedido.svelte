<script>
  import eventoStore from "../Store/eventoStore";
  import CardIngresso from "./CardIngresso.svelte";

  /************************************/
  export let evento = $eventoStore[1];
  evento.tiposDeIngresso.map(
    (t) => (t.quantidade = parseInt(Math.random() * 3, 10) + 1)
  );
  /************************************/

  let dom = 0;
  let ingressos = evento.tiposDeIngresso.flatMap((t) => {
    const tmp = [];

    for (let i = 0; i < t.quantidade; i++) {
      tmp.push({ id: t.id, nome: t.nome, valor: t.valor, dom });
      ++dom;
    }

    return tmp;
  });
</script>

<style>
  #corpo {
    width: 40%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  #titulo {
    font-size: 3rem;
    text-align: center;
  }

  #subtitulo {
    margin: 3rem 0;
    text-align: center;
  }
</style>

<div id="corpo">
  <h1 id="titulo">Detalhes de Ingresso</h1>
  <h3 id="subtitulo">Insira os dados de cada ingressante:</h3>
  {#each [...Array(ingressos.length).keys()] as x}
    <CardIngresso bind:ingresso={ingressos[x]} />
  {/each}
  <button on:click={() => console.log(ingressos)}>aaaa</button>
</div>
