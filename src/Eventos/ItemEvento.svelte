<script>
  export let evento;
</script>

<style>
  .card {
    margin: 2rem auto;
    width: 100%;
    height: 20rem;
    background-color: #eee;
    display: flex;

    padding: 1rem;

    border: 0.125rem solid black;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .principal {
    justify-content: space-between;
    width: 75%;
    display: flex;
    align-items: center;
    display: block;
    margin: 1rem;
  }

  .titulo {
    font-size: 2rem;
    height: 15%;
    width: 100%;
    margin-right: 1rem;
  }

  .imagem {
    height: 85%;
    width: 100%;
    margin-right: 1rem;
    border-radius: 5px;
  }

  .detalhes {
    width: 25%;
    border: none;
    border-left: 5px dotted;
  }

  .local {
    font-size: 1.25rem;
    color: #777;
    text-align: center;
  }
</style>

<div class="card">
  <div class="principal">
    <h1 class="titulo">{evento.titulo}</h1>
    <img class="imagem" src={evento.img} alt="" />
  </div>
  <div class="detalhes">
    <p class="local">{evento.cidade}-{evento.uf}</p>
  </div>
</div>
