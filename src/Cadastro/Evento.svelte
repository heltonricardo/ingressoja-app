<script>
  import validator from "validator";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import ESTADOS from "../ENUM/ESTADOS";
  import Botao from "../UI/Botao.svelte";
  import Icone from "../UI/Icone.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import { imagemIsValida } from "../utils/validador";
  import TipoDeIngresso from "./TipoDeIngresso.svelte";
  import { hojeStringISO } from "../utils/manipulaDataHora";
  import { postEvento, getEvento } from "../Conexao/eventoConex";
  import { getCategoriasEvento } from "../Conexao/categoriaEventoConex";

  /******************************** DEFINIÇÕES ********************************/

  const dispatch = createEventDispatcher();
  export let id = null;
  let carregando = false;
  let imagemTocada = false;
  let imagemURL = null;

  let obj = {
    dto: {
      uf: "",
      cep: "",
      url: "",
      bairro: "",
      cidade: "",
      inicio: "",
      numero: "",
      titulo: "",
      termino: "",
      online: true,
      descricao: "",
      logradouro: "",
      tiposDeIngresso: [],
      qntTipoDeIngresso: 1,
      idCategoria: undefined,
    },
    file: null,
  };

  id &&
    getEvento(id).then((r) => {
      imagemURL = r.imagemURL;
      obj.dto.uf = r.uf;
      obj.dto.cidade = r;
      obj.dto.cep = r.cep;
      obj.dto.url = r.url;
      obj.dto.bairro = r.bairro;
      obj.dto.inicio = r.inicio;
      obj.dto.numero = r.numero;
      obj.dto.online = r.online;
      obj.dto.titulo = r.titulo;
      obj.dto.termino = r.termino;
      obj.dto.descricao = r.descricao;
      obj.dto.logradouro = r.logradouro;
      obj.dto.idCategoria = r.categoriaEvento.id;
      obj.dto.tiposDeIngresso = r.tiposDeIngresso;
      obj.dto.qntTipoDeIngresso = r.tiposDeIngresso.length;
    });

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  $: tituloValido = validator.isLength(obj.dto.titulo.trim(), {
    min: 1,
    max: 255,
  });
  $: descricaoValida = validator.isLength(obj.dto.descricao.trim(), {
    min: 1,
    max: 2000,
  });
  $: imagemValida = imagemIsValida(obj.file);
  $: inicioValido = validator.isAfter(obj.dto.inicio);
  $: terminoValido = validator.isAfter(obj.dto.termino, obj.dto.inicio);
  $: urlValida = obj.dto.online
    ? validator.isURL(obj.dto.url, {
        require_protocol: true,
        protocols: ["http", "https"],
      }) && validator.isLength(obj.dto.url.trim(), { min: 1, max: 1000 })
    : true;
  $: logradouroValido = obj.dto.online
    ? true
    : validator.isLength(obj.dto.logradouro.trim(), {
        min: 1,
        max: 100,
      });
  $: numeroValido = obj.dto.online
    ? true
    : validator.isLength(obj.dto.numero.trim(), { min: 1, max: 10 });
  $: bairroValido = obj.dto.online
    ? true
    : validator.isLength(obj.dto.bairro.trim(), { min: 1, max: 50 });
  $: cidadeValida = obj.dto.online
    ? true
    : validator.isLength(obj.dto.cidade.trim(), { min: 1, max: 50 });
  $: ufValida = obj.dto.online
    ? true
    : ESTADOS.includes(obj.dto.uf.toLowerCase());
  $: cepValido = obj.dto.online ? true : validateBr.cep(obj.dto.cep);

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
    obj.dto.tiposDeIngresso.every((t) => t.tipoValido);

  /********************************* FUNÇÕES **********************************/

  function adicionaIngresso() {
    obj.dto.qntTipoDeIngresso++;
  }

  function removeIngresso() {
    obj.dto.tiposDeIngresso.pop();
    obj.dto.qntTipoDeIngresso--;
  }

  async function salvar() {
    carregando = true;
    obj.dto.cep = validator.whitelist(obj.dto.cep, /\d/g);
    const sucesso = await postEvento(obj);
    carregando = false;
    if (sucesso) dispatch("meuseventos");
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
      valido={tituloValido}
      value={obj.dto.titulo}
      mensagemValidacao="Insira um título válido"
      on:input={(event) => (obj.dto.titulo = event.target.value)}
    />

    {#await getCategoriasEvento()}
      <Aguarde />
    {:then categorias}
      <label for="selecao">Categoria do Evento</label>
      <select bind:value={obj.dto.idCategoria}>
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
      on:change={(event) => (obj.file = event.target.files[0])}
    />
    {#if imagemTocada && !imagemValida}
      <p class="error-message">Anexe uma imagem válida</p>
    {/if}

    <Entrada
      id="inicio"
      min={hojeStringISO}
      type="datetime-local"
      valido={inicioValido}
      label="Data e Hora de Início"
      value={id ? obj.dto.inicio : hojeStringISO}
      mensagemValidacao="Insira uma data de início válida"
      on:input={(event) => (obj.dto.inicio = event.target.value)}
    />
    <Entrada
      id="termino"
      min={hojeStringISO}
      type="datetime-local"
      valido={terminoValido}
      label="Data e Hora de Término"
      value={id ? obj.dto.termino : hojeStringISO}
      mensagemValidacao="Insira uma data de término válida"
      on:input={(event) => (obj.dto.termino = event.target.value)}
    />
    <Entrada
      id="descricao"
      maxlength="2000"
      label="Descrição"
      controlType="textarea"
      valido={descricaoValida}
      value={obj.dto.descricao}
      mensagemValidacao="Insira uma descrição válida"
      on:input={(event) => (obj.dto.descricao = event.target.value)}
    />
  </div>

  <div id="opcoes">
    <label>
      <input
        type="radio"
        name="tipoEvento"
        value={obj.dto.online}
        bind:group={obj.dto.online}
      />
      Evento On-line
    </label>

    <label>
      <input
        type="radio"
        name="tipoEvento"
        value={!obj.dto.online}
        bind:group={obj.dto.online}
      />
      Evento Presencial
    </label>
  </div>

  <div class="campos">
    {#if obj.dto.online}
      <Entrada
        id="url"
        maxlength="1000"
        valido={urlValida}
        value={obj.dto.url}
        label="URL do Evento"
        mensagemValidacao="Insira uma URL válida"
        on:input={(event) => (obj.dto.url = event.target.value)}
      />
    {:else}
      <Entrada
        id="cep"
        label="CEP"
        maxlength="8"
        valido={cepValido}
        value={obj.dto.cep}
        mensagemValidacao="Insira um CEP válido"
        on:input={(event) => (obj.dto.cep = event.target.value)}
      />
      <Entrada
        id="uf"
        label="UF"
        maxlength="2"
        valido={ufValida}
        value={obj.dto.uf}
        mensagemValidacao="Insira uma UF válida"
        on:input={(event) => (obj.dto.uf = event.target.value)}
      />
      <Entrada
        id="cidade"
        label="Cidade"
        maxlength="50"
        valido={cidadeValida}
        value={obj.dto.cidade}
        mensagemValidacao="Insira uma cidade válida"
        on:input={(event) => (obj.dto.cidade = event.target.value)}
      />
      <Entrada
        id="bairro"
        label="Bairro"
        maxlength="50"
        valido={bairroValido}
        value={obj.dto.bairro}
        mensagemValidacao="Insira um bairro válido"
        on:input={(event) => (obj.dto.bairro = event.target.value)}
      />
      <Entrada
        id="logradouro"
        maxlength="100"
        label="Logradouro"
        valido={logradouroValido}
        value={obj.dto.logradouro}
        mensagemValidacao="Insira um logradouro válido"
        on:input={(event) => (obj.dto.logradouro = event.target.value)}
      />
      <Entrada
        id="numero"
        type="number"
        label="Número"
        maxlength="10"
        valido={numeroValido}
        value={obj.dto.numero}
        mensagemValidacao="Insira um número válido"
        on:input={(event) => (obj.dto.numero = event.target.value)}
      />
    {/if}
  </div>

  <br />

  <h1>Tipos de Ingressos</h1>
  <div class="campos">
    {#each [...Array(obj.dto.qntTipoDeIngresso).keys()] as i}
      <TipoDeIngresso bind:tipoDeIngresso={obj.dto.tiposDeIngresso[i]} />
    {/each}
  </div>

  <div id="tipoIngressoControle">
    {#if obj.dto.qntTipoDeIngresso > 1}
      <Icone icon="minus" on:click={removeIngresso} />
    {/if}
    <Icone icon="plus" on:click={adicionaIngresso} />
  </div>

  <div id="botoes">
    <Botao on:click={() => dispatch("meuseventos")}>Voltar</Botao>
    <Botao on:click={salvar} habilitado={formularioValido}>Salvar</Botao>
  </div>
</div>
