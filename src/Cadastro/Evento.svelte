<script>
  import { createEventDispatcher } from "svelte";

  import validator from "validator";

  import { imagemIsValida } from "../utils/validador";
  import { postEvento } from "../Conexao/eventoConex";
  import { getCategoriasEvento } from "../Conexao/categoriaEventoConex";
  import Icone from "../UI/Icone.svelte";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import TipoDeIngresso from "./TipoDeIngresso.svelte";
  import { validateBr } from "js-brasil";
  import ESTADOS from "../ENUM/ESTADOS";

  /************************** CONSTANTES E VARIÁVEIS **************************/

  const dispatch = createEventDispatcher();

  let carregando = false;

  let titulo = "";
  let descricao = "";
  let imagem = null;
  let online = true;
  let inicio = "";
  let termino = "";
  let url = "";
  let logradouro = "";
  let numero = "";
  let bairro = "";
  let cidade = "";
  let uf = "";
  let cep = "";
  let qntTipoDeIngresso = 1;
  let tiposDeIngresso = [];
  let idCategoria;

  let imagemTocada = false;

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  $: tituloValido = validator.isLength(titulo.trim(), { min: 1, max: 255 });
  $: descricaoValida = validator.isLength(descricao.trim(), {
    min: 1,
    max: 2000,
  });
  $: imagemValida = imagemIsValida(imagem);
  $: inicioValido = validator.isAfter(inicio);
  $: terminoValido = validator.isAfter(termino, inicio);
  $: urlValida = online
    ? validator.isURL(url) &&
      validator.isLength(url.trim(), { min: 1, max: 1000 })
    : true;
  $: logradouroValido = online
    ? true
    : validator.isLength(logradouro.trim(), {
        min: 1,
        max: 100,
      });
  $: numeroValido = online
    ? true
    : validator.isLength(numero.trim(), { min: 1, max: 10 });
  $: bairroValido = online
    ? true
    : validator.isLength(bairro.trim(), { min: 1, max: 50 });
  $: cidadeValida = online
    ? true
    : validator.isLength(cidade.trim(), { min: 1, max: 50 });
  $: ufValida = online ? true : ESTADOS.includes(uf.toLowerCase());
  $: cepValido = online ? true : validateBr.cep(cep);

  $: formularioValido =
    tituloValido &&
    descricaoValida &&
    imagemValida &&
    inicioValido &&
    terminoValido &&
    urlValida &&
    logradouroValido &&
    numeroValido &&
    bairroValido &&
    cidadeValida &&
    ufValida &&
    cepValido &&
    tiposDeIngresso.every((t) => t.tipoValido);

  /********************************* FUNÇÕES **********************************/

  async function carregaCategorias() {
    return await getCategoriasEvento();
  }

  function adicionaIngresso() {
    qntTipoDeIngresso++;
  }

  function removeIngresso() {
    tiposDeIngresso.pop();
    qntTipoDeIngresso--;
  }

  async function cadastrar() {
    carregando = true;
    cep = validator.whitelist(cep, /\d/g);
    const sucesso = await postEvento({
      dto: {
        titulo,
        inicio,
        termino,
        descricao,
        online,
        url,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
        cep,
        tiposDeIngresso,
        idCategoria,
      },
      file: imagem,
    });
    carregando = false;
    if (sucesso) dispatch("minhaconta");
  }
</script>

<style>
  #corpo {
    width: 35%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
    min-height: calc(100vh - 21rem);
  }

  .campos {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin: 3rem 0 1rem 0;
  }

  #opcoes {
    margin: 3rem 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  #opcoes label {
    width: fit-content;
  }
  #botoes {
    margin: 4rem auto;
    display: flex;
    justify-content: center;
  }

  #tipoIngressoControle {
    display: flex;
    justify-content: center;
  }

  label {
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  select,
  #imagem {
    font: inherit;
    align-self: center;
    width: 100%;
    margin-bottom: 1rem;
    border: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  .error-message {
    color: red;
    margin-top: -0.75rem;
  }

  select:focus {
    border-color: var(--roxo1);
    outline: none;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <h1>Novo Evento</h1>
  <div class="campos">
    <Entrada
      id="titulo"
      label="Título"
      on:input={(event) => (titulo = event.target.value)}
      valido={tituloValido}
      mensagemValidacao="Insira um título válido"
    />

    {#await carregaCategorias()}
      <Aguarde />
    {:then categorias}
      <label for="selecao">Categoria do Evento</label>
      <select bind:value={idCategoria}>
        {#each categorias as categoria (categoria.id)}
          <option value={categoria.id}>{categoria.nome}</option>
        {/each}
      </select>
    {/await}

    <label for="imagem">Imagem da capa (máx. 2 MB)</label>
    <input
      type="file"
      id="imagem"
      accept="image/bmp, image/jpeg, image/png"
      on:blur={() => (imagemTocada = true)}
      on:change={(event) => (imagem = event.target.files[0])}
    />
    {#if imagemTocada && !imagemValida}
      <p class="error-message">Anexe uma imagem válida</p>
    {/if}

    <Entrada
      id="inicio"
      label="Data e Hora de Início"
      type="datetime-local"
      on:input={(event) => (inicio = event.target.value)}
      valido={inicioValido}
      mensagemValidacao="Insira uma data de início válida"
    />
    <Entrada
      id="termino"
      label="Data e Hora de Término"
      type="datetime-local"
      on:input={(event) => (termino = event.target.value)}
      valido={terminoValido}
      mensagemValidacao="Insira uma data de término válida"
    />
    <Entrada
      id="descricao"
      label="Descrição"
      controlType="textarea"
      on:input={(event) => (descricao = event.target.value)}
      valido={descricaoValida}
      mensagemValidacao="Insira uma descrição válida"
      maxlength="2000"
    />
  </div>

  <div id="opcoes">
    <label>
      <input name="tipoEvento" type="radio" value={true} bind:group={online} />
      Evento On-line
    </label>

    <label>
      <input name="tipoEvento" type="radio" value={false} bind:group={online} />
      Evento Presencial
    </label>
  </div>

  <div class="campos">
    {#if online}
      <Entrada
        id="url"
        label="URL do Evento"
        on:input={(event) => (url = event.target.value)}
        valido={urlValida}
        mensagemValidacao="Insira uma URL válida"
        maxlength="1000"
      />
    {:else}
      <Entrada
        id="cep"
        label="CEP"
        on:input={(event) => (cep = event.target.value)}
        valido={cepValido}
        mensagemValidacao="Insira um CEP válido"
        maxlength="8"
      />
      <Entrada
        id="uf"
        label="UF"
        on:input={(event) => (uf = event.target.value)}
        valido={ufValida}
        mensagemValidacao="Insira uma UF válida"
        maxlength="2"
      />
      <Entrada
        id="cidade"
        label="Cidade"
        on:input={(event) => (cidade = event.target.value)}
        valido={cidadeValida}
        mensagemValidacao="Insira uma cidade válida"
        maxlength="50"
      />
      <Entrada
        id="bairro"
        label="Bairro"
        on:input={(event) => (bairro = event.target.value)}
        valido={bairroValido}
        mensagemValidacao="Insira um bairro válido"
        maxlength="50"
      />
      <Entrada
        id="logradouro"
        label="Logradouro"
        on:input={(event) => (logradouro = event.target.value)}
        valido={logradouroValido}
        mensagemValidacao="Insira um logradouro válido"
        maxlength="100"
      />
      <Entrada
        id="numero"
        label="Número"
        type="number"
        on:input={(event) => (numero = event.target.value)}
        valido={numeroValido}
        mensagemValidacao="Insira um número válido"
        maxlength="10"
      />
    {/if}
  </div>

  <br />

  <h1>Tipos de Ingressos</h1>
  <div class="campos">
    {#each [...Array(qntTipoDeIngresso).keys()] as i}
      <TipoDeIngresso bind:tipoDeIngresso={tiposDeIngresso[i]} />
    {/each}
  </div>

  <div id="tipoIngressoControle">
    {#if qntTipoDeIngresso > 1}
      <Icone icon="minus" on:click={removeIngresso} />
    {/if}
    <Icone icon="plus" on:click={adicionaIngresso} />
  </div>

  <div id="botoes">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
    <Botao on:click={cadastrar} habilitado={formularioValido}>Salvar</Botao>
  </div>
</div>
