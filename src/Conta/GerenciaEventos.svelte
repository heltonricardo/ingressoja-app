<script>
  import Swal from "sweetalert2";
  import { createEventDispatcher } from "svelte";
  
  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { getEventos } from "../Conexao/produtoraConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { pausarRetomarVenda } from "../Conexao/eventoConex";

  const dispatch = createEventDispatcher();

  export let conferencia = false;

  let carregando = false;
  let eventos = getEventos();

  async function pausarRetomarVendaIngressos(id, flag) {
    const realizarOperacao = flag
      ? await Swal.fire({
          icon: "question",
          focusCancel: true,
          title: MSG.CERTEZA,
          text: MSG.PAUSAR_VENDA,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
        })
      : await Swal.fire({
          icon: "question",
          focusCancel: true,
          title: MSG.CERTEZA,
          showCancelButton: true,
          text: MSG.RETOMAR_VENDA,
          cancelButtonText: "Cancelar",
        });
    if (realizarOperacao.isConfirmed) {
      carregando = true;
      (await pausarRetomarVenda(id, flag)) && (eventos = getEventos());
      carregando = false;
    }
  }
</script>

<style>
  .corpo {
    max-width: 50rem;
    min-width: 30rem;
    margin: 2rem auto;
    min-height: calc(100vh - 21rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  h1 {
    font-size: 3rem;
    text-align: center;
    align-self: center;
    margin: 1rem 0 3rem 0;
  }

  .tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
    word-break: break-all;
  }

  .tabela td,
  .tabela th {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }

  .tabela tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .tabela tr:nth-child(odd) {
    background-color: var(--branco);
  }

  .tabela tr:hover {
    background-color: #ddd;
  }

  .tabela th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--verde2);
    color: black;
    text-align: center;
    word-break: keep-all;
  }

  .detalhes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .voltar {
    margin: 3rem 0;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  {#if conferencia}
    <h1>Check-in de Ingressos</h1>
    <p>Escolha o evento:</p>
    <br />
  {:else}
    <h1>Gerência de Eventos</h1>
  {/if}
  {#await eventos}
    <Aguarde />
  {:then eventos}
    {#if eventos.length}
      <table class="tabela">
        <tr>
          <th>Id</th>
          <th>Título</th>
          <th>Data do evento</th>
          <th>Ações</th>
        </tr>
        {#each eventos as evento}
          <tr>
            <td>{evento.id}</td>
            <td>{evento.titulo}</td>
            <td>{extrairDataHora(evento.inicio).data}</td>
            <td class="detalhes">
              {#if conferencia}
                <MiniBotao on:click={() => dispatch("conferencia", evento.id)}
                  >Abrir</MiniBotao
                >
              {:else}
                <MiniBotao on:click={() => dispatch("despesas", evento.id)}
                  >Despesas</MiniBotao
                >

                {#if evento.vendaPausada}
                  <MiniBotao
                    on:click={() =>
                      pausarRetomarVendaIngressos(evento.id, false)}
                    >Retomar vendas</MiniBotao
                  >
                {:else}
                  <MiniBotao
                    on:click={() =>
                      pausarRetomarVendaIngressos(evento.id, true)}
                    >Pausar vendas</MiniBotao
                  >
                {/if}
              {/if}
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há eventos para mostrar
    {/if}
  {/await}
  <div class="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
