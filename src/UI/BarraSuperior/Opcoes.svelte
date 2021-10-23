<script>
  import Swal from "sweetalert2";
  import validator from "validator";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../Botao.svelte";
  import { onlyNumeros } from "../../utils/sanitarizador";
  import autenticacao from "../../Autenticacao/autenticacao";
  import { validarIngresso } from "../../Conexao/itemPedidoConex";

  const dispatch = createEventDispatcher();

  let logado = autenticacao.estaLogado();

  function deslogar() {
    autenticacao.deslogar();
    logado = autenticacao.estaLogado();
  }

  async function verificar() {
    const { value: dados } = await Swal.fire({
      title: "Verifique seu ingresso:",
      html: `<style>.hid { display: none }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none; margin: 0; }</style>
        <input class="id" placeholder="ID do ingresso" type="number"
        class="swal2-input">
        <input class="cpf" placeholder="CPF do ingressante" class="swal2-input">
        <br /> <br />
        <span class="erro" style="color: red" class="hid">Insira um ID maior que
          zero e um CPF válido!</span>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const erro = document.getElementById("erro");
        const idField = document.getElementById("id");
        const cpfField = document.getElementById("cpf");
        cpfField.addEventListener("input", () => (erro.className = "hid"));
        idField.addEventListener("input", () => (erro.className = "hid"));
        const id = onlyNumeros(idField.value);
        const cpf = onlyNumeros(cpfField.value);
        const idValido = validator.isNumeric(id);
        const cpfValido = validateBr.cpf(cpf);
        if (cpfValido && idValido) return { id, cpf };
        erro.className = "";
        return false;
      },
    });

    if (dados) {
      const res = await validarIngresso(dados);
      Swal.fire({
        icon: "success",
        title: "O ingresso pertence ao CPF informado!",
        html: `<style>.titulo {font-weight: bold}</style>
              <br />
              <p class="titulo">Portador(a) do ingresso</p>
              <p class="dado">${res.ingressante}</p>
              <br />
              <p class="titulo">Evento</p>
              <p class="dado">${res.tituloEvento}</p>
              <br />
              <p class="titulo">Tipo de Ingresso</p>
              <p class="dado">${res.nomeTipoDeIngresso}</p>
              <br />
              <p class="titulo">Ingresso já utilizado?</p>
              <p class="dado">${res.utilizado ? "Sim" : "Não"}</p>`,
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
  }
</script>

<style>
  tr,
  td {
    text-align: center;
    vertical-align: middle;
  }

  .segunda-linha {
    padding-top: 0.3rem;
  }

  button {
    border: none;
    font-size: 12pt;
    font-family: "Poppins", sans-serif;
    background-color: transparent;
  }

  button:hover {
    cursor: pointer;
    font-weight: bolder;
  }

  button:focus {
    outline: 0;
  }
</style>

<table>
  <tr>
    {#if logado}
      <td>
        <Botao on:click={() => dispatch("minhaconta")}>Minha Conta</Botao>
      </td>
      <td>
        <Botao on:click={deslogar}>Sair</Botao>
      </td>
    {:else}
      <td>
        <Botao on:click={() => dispatch("cadastro")}>Cadastre-se</Botao>
      </td>
      <td>
        <Botao on:click={() => dispatch("entrar")}>Entrar</Botao>
      </td>
    {/if}
  </tr>
  <tr>
    <td colspan="2" class="segunda-linha">
      <button on:click={verificar}>Verifique seu ingresso</button>
    </td>
  </tr>
</table>
