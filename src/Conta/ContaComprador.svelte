<script>
  import { createEventDispatcher, onMount } from "svelte";

  import { getComprador } from "../Conexoes/compradorConex";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  async function carregaDados() {
    return await getComprador();
  }

  let dadosCarregados = carregaDados();
</script>

<style>
  #corpo {
    width: 40rem;
    margin: 2rem auto;
    min-height: calc(100vh - 20rem);
  }
</style>

{#await dadosCarregados}
  <Aguarde />
{:then comprador}
  <div id="corpo">
    <h1>Minha Conta</h1>
    <h2>Olá, {comprador.nome}</h2>
  </div>
{/await}
