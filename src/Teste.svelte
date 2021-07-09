<script>

  import { getEvento } from "../src/Conexao/eventoConex";

  async function carregaEvento() {
    const res = await getEvento(1);
    return res;
  }
  
  let eventoCarregado = carregaEvento();

  async function foo() {
    const a = await eventoCarregado
    console.log(a)
  }

</script>


<button on:click={foo}>BUTÖ</button>
