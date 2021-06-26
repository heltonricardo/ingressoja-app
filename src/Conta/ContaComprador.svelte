<script>
  import { createEventDispatcher, onMount } from "svelte";

  import { getComprador } from "../Conexoes/compradorConex";

  const dispatch = createEventDispatcher();

  let comprador;

  async function carregaDados() {
    comprador = await getComprador();
    if (!comprador) {
      dispatch("voltar");
    }
  }

  onMount(() => {
    carregaDados();
  });
</script>

<style>
  #corpo {
    width: 40rem;
    margin: 2rem auto;
    min-height: calc(100vh - 20rem);
  }
</style>

<div id="corpo">
  <h1>Minha Conta</h1>
  <h2>Olá</h2>
</div>
