<script>
  import { createEventDispatcher } from "svelte";
  import { postEvento } from "../Conexoes/eventoConex";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";

  const dispatch = createEventDispatcher();

  let titulo;
  let descricao;
  let imagemURL;
  let online;
  let inicio;
  let termino;
  let url;
  let logradouro;
  let numero;
  let bairro;
  let cidade;
  let estado;
  let pais;

  async function cadastrar() {
    if (senha === senha2) {
      const res = await postEvento({
        titulo,
        descricao,
        imagemURL,
        online,
        inicio,
        termino,
        url,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        pais,
      });
      if (res) dispatch("voltar");
    }
  }
</script>

<style>
  #corpo {
    width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin-bottom: 4rem;
  }

  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }
</style>

<div id="corpo">
  <h1>Novo Evento</h1>

  <Entrada
    id="titulo"
    label="Título"
    on:input={(event) => (titulo = event.target.value)}
  />
  <Entrada
    id="imagemURL"
    label="URL da Imagem de Capa"
    on:input={(event) => (imagemURL = event.target.value)}
  />
  <Entrada
    id="inicio"
    label="Data e Hora de Início"
    type="datetime-local"
    on:input={(event) => (inicio = event.target.value)}
  />
  <Entrada
    id="termino"
    label="Data e Hora de Término"
    type="datetime-local"
    on:input={(event) => (termino = event.target.value)}
  />
  <Entrada
    id="descricao"
    label="Descrição"
    controlType="textarea"
    on:input={(event) => (termino = event.target.value)}
  />
  
</div>

<div id="botoes">
  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  <Botao on:click={cadastrar}>Finalizar</Botao>
</div>
