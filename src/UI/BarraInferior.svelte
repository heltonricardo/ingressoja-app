<script>
  import Swal from "sweetalert2";

  function sobre() {
    Swal.fire({
      title: "Sobre",
      html: `<style> .bold { font-weight: bold; } .italic { font-style: italic;}
      a {text-decoration: none; color: inherit; } </style>
      <p>
        IngressoJá - Plataforma on-line para compra e venda de ingressos - é um
        projeto elaborado e desenvolvido por
        <a class="bold" href="https://github.com/heltonricardo" target="_blank">
        Helton Ricardo </a>, aluno do curso Análise e Desenvolvimento de
        Sistemas do IFSP Campus Campos do Jordão no ano de 2021.
      </p>
      <br />
      <div style="text-align: justify">
        <p style="padding-right: 0.1rem"><span class="bold">Autor: </span>
          <span class="italic">
            Deixo aqui minha homenagem e meus sinceros agradecimentos a minha
            namorada <a class="bold" href="https://github.com/wendiramos"
            target="_blank">Wendi Ramos</a>, pelo apoio emocional que me
            proporcionou e pelas horas que passou testando cada uma das 
            funcionalidades desse projeto; E aos meus colegas e amigos: 
            <a class="bold" href="https://github.com/gsantosdev"
            target="_blank"> Gustavo Santos</a>, pelas diversas contribuições
            para com minhas dúvidas em Java e requisitos do IngressoJá!, e <a
            class="bold" href="https://github.com/andreglatz" target="_blank">
            André Glatz</a>, o qual posso dizer que, literalmente, me salvou
            diversas vezes com suas habilidades e conhecimentos em JavaScript.
            Todos vocês foram essenciais para o desenvolvimento desse projeto e
            para meu progresso pessoal e profissional.
          </span>
        </p>
        <p style="text-align: center">
          <span class="bold italic">Obrigado, gente!</span>
        </p>
      </div>`,
      confirmButtonText: "Fechar",
    });
  }
</script>

<style>
  .barra {
    width: 100%;
    height: 10rem;
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: var(--verde1);
    -webkit-box-shadow: rgba(100, 100, 111, 0.2) 0 -7px 29px 0;
    -moz-box-shadow: rgba(100, 100, 111, 0.2) 0 -7px 29px 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0 -7px 29px 0;
  }
  span {
    margin: 0.3rem;
    color: var(--roxo2);
  }

  button,
  button a {
    text-decoration: none;
    font-weight: bolder;
    color: var(--roxo2);
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

  @media print {
    .barra {
      display: none !important;
    }
  }
</style>

<div class="barra">
  <span
    >© {new Date().getFullYear()}, Plataforma IngressoJá! Todos os direitos
    reservados.</span
  >
  <span>
    <button on:click={sobre}>Sobre</button> •
    <button>
      <a target="_blank" href="https://github.com/heltonricardo"
        >Entre em Contato</a
      >
    </button></span
  >
</div>
