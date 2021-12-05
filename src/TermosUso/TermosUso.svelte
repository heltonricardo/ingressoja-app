<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    transition: 0.1s;
    background: rgba(0, 0, 0, 0.25);
  }

  .card {
    border-radius: 7px;
    padding: 2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 70rem;
    max-height: 40rem;
    background-color: white;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    z-index: 11;
  }

  .fundo {
    overflow: scroll;
    overflow-x: hidden;
    max-height: 30rem;
  }

  p {
    margin-top: 0.5rem;
  }

  li {
    margin-top: 0.8rem;
    padding-left: 1.28571429em;
    text-indent: -1.28571429em;
    line-height: 1.2rem;
  }

  ol {
    margin: 1rem 0;
    list-style-type: decimal;
    list-style-position: inside;
  }
</style>

<div class="modal-backdrop" on:click={() => dispatch("fechar")} />
<div class="card">
  <div class="fundo">
    <div id="contentID" class="article content style-scope policies-page">
      ATENÇÃO: ESSA É UMA DOCUMENTAÇÃO FICTÍCIA, PARA FINS DE DEMONSTRAÇÃO

      <p>
        Antes de finalizar sua compra conheça os Termos de uso da Plataforma
        IngressoJá!:
      </p>
      <ol class="">
        <li>
          A efetivação da compra estará sujeita à disponibilidade de ingressos e
          à aprovação da operadora de seu cartão de crédito.
        </li>
        <li>
          Ao utilizar nossa plataforma, sua compra está sujeita à análise e
          aprovação do nosso Departamento de Segurança. Eventualmente,
          documentos poderão ser solicitados ao titular da compra, que deverá
          encaminhá-los conforme as instruções recebidas e dentro do prazo
          estipulado para finalização e entrega do pedido, sob pena de
          cancelamento e/ou não efetivação da compra.
        </li>
        <li>
          A fim de facilitar a análise do Departamento de Segurança e garantir a
          autenticidade de sua compra, preencha todos os campos do cadastro, em
          especial nome completo, número de CPF, e-mail, telefone para contato e
          endereço, dados que são necessários para a execução do contrato.
        </li>
        <li>
          Taxa de conveniência poderá incidir sobre os ingressos adquiridos
          através dos canais de venda da Ingresso Rápido. Confira <a
            href="https://www.ingressorapido.com.br/source/policies-page/acordao.pdf"
            target="_blank">aqui</a
          > a decisão do STJ sobre a legalidade da cobrança.
        </li>
        <li>
          Todo Evento possui bilheteria oficial, sem incidência de taxas.
          Consulte o local na página de vendas do próprio Evento.
        </li>
        <li>
          Taxas de conveniência são receitas exclusivas da Ingresso Rápido. O
          valor de face dos ingressos é receita exclusiva do produtor do evento.
        </li>
        <li>
          Regras diferenciadas de cobranças de taxas podem ser aplicadas por
          estado, de acordo com a legislação do local do evento ou mesmo em
          razão do meio de pagamento escolhido pelo cliente.
        </li>
        <li>
          A Ingresso Rápido intermedeia a venda de ingressos normalmente de
          forma exclusiva. Para a segurança de todos os fãs e produtores de
          eventos, recomendamos que a compra seja feita somente pelos canais
          oficiais de compra, disponíveis e informados neste website.
        </li>
        <li>
          Não nos responsabilizamos por ingressos adquiridos em canais de venda
          não oficiais, seja através de pessoa física, pessoa jurídica, outros
          websites e comunidades na Internet, com quem não possuímos qualquer
          vínculo.
        </li>
        <li>
          Confira atentamente os dados de seu pedido (espetáculo, dia, horário,
          quantidades de ingresso e setor) antes da confirmação de sua compra.
          Não serão permitidas a troca ou devolução de ingressos. O seu ingresso
          é um produto único, ou seja, após sua compra ele não estará mais
          disponível para venda.
        </li>
        <li>
          Em caso de arrependimento do cliente, para compras realizadas via site
          ou aplicativo, o reembolso do valor da compra será efetuado, desde que
          esse direito seja requisitado em até 07 (sete) dias da data da compra
          e que esteja em até 02 (dois) dias de antecedência à data do evento.
        </li>
        <li>
          Para compras realizadas com menos de 07 (sete) dias de antecedência ao
          evento, os ingressos só poderão ser cancelados em até 02 (dois) dias
          antes da apresentação.
        </li>
        <li>
          Para ingressos adquiridos em ponto de venda e bilheteria, o estorno do
          valor pago somente será efetuado após a apresentação física dos mesmos
          nos pontos de venda da Ingresso Rápido. Este procedimento não é
          necessário para e-ticket, mobile ticket e quando se tratar de evento
          cancelado. Depois de confirmada a autenticidade do ingresso, a
          devolução dos valores pagos seguirá o procedimento abaixo descrito, de
          acordo com a forma de pagamento utilizada:
          <ol>
            <li>
              Cartão de crédito: o estorno do valor será solicitado à operadora
              do cartão, que disponibilizará o crédito em fatura seguinte ou
              subsequente.
            </li>
            <li>
              Cartão de débito: o estorno do valor será solicitado à operadora
              do cartão utilizado na compra, que creditará o valor em conta
              bancária vinculada ao cartão, de acordo com os prazos e trâmites
              internos do banco emissor.
            </li>
            <li>Dinheiro: depósito bancário em até 20 dias úteis.</li>
            <li>
              Informamos que os prazos discriminados nos itens 13.1 e 13.2, para
              estornos via cartão, crédito ou débito, podem variar, de acordo
              com o fechamento de sua fatura e/ou seu banco emissor.
            </li>
          </ol>
        </li>
        <li>
          Após o recebimento dos ingressos, sejam físicos ou digitais, os mesmos
          são de responsabilidade do Cliente. Caso sejam transferidos para
          terceiros, perdidos, roubados ou danificados, não será possível
          solicitar sua reimpressão.
        </li>
        <li>
          Para ingressos digitais, os quais são enviados por e-mail ou
          aplicativo aos compradores, a impressão ou tentativa de utilização do
          mesmo código mais de uma vez não é responsabilidade da Ingresso
          Rápido. Um mesmo QRCode ou código de barras dará acesso ao evento
          apenas 01 (uma) vez.
        </li>
        <li>
          Para eventos cancelados ou adiados em decorrência da pandemia da COVID
          19, pela qual foi decretada situação de calamidade pública, se aplicam
          as regras descritas em <a
            href="https://site.ingressorapido.com.br/alteracao-cancelamentos"
            >https://site.ingressorapido.com.br/alteracao-cancelamentos</a
          >, às quais estão de acordo com as determinações da
          <a
            href="https://www.in.gov.br/en/web/dou/-/lei-n-14.046-de-24-de-agosto-de-2020-273920826"
            >Lei nº 14.046/2020.</a
          >
        </li>
        <li>
          Meia-Entrada: a compra de meia-entrada e/ou outros descontos estará
          sujeita a regras do produtor de cada evento ou casa de espetáculo, bem
          como à legislação do município de realização do evento, que deve ser
          consultada em <a
            href="https://site.ingressorapido.com.br/meiaentrada/"
            >https://site.ingressorapido.com.br/meiaentrada</a
          >.
        </li>
        <li>
          A meia entrada é pessoal, intransferível e pode ser limitada por
          categoria, conforme a legislação vigente. Ao adquiri-la, é obrigatória
          a comprovação do direito ao benefício descrito no ingresso, o qual é
          escolhido pelo cliente no momento da compra.
        </li>
        <li>
          A comprovação do direito ao benefício deve ser realizada tanto no
          momento da compra (para ingressos físicos, adquiridos
          presencialmente), quanto no acesso ao evento (para ingressos físicos e
          digitais). Informações sobre os documentos comprobatórios também podem
          ser solicitados no cadastro durante a compra através das plataformas
          digitais.
        </li>
        <li>
          No acesso ao evento, não será aceita a comprovação de benefício
          diferente da categoria que está descrita no ingresso, a qual foi
          escolhida pelo cliente no momento da compra.
        </li>
        <li>
          Na hipótese de não comprovação do direito ao benefício de meia entrada
          correspondente ao ingresso pela categoria informada pelo próprio
          cliente, o portador poderá pagar a diferença complementar ao valor
          Inteiro do lote vigente, diretamente na bilheteria do evento.
        </li>
        <li>
          Não haverá reembolso ou devolução de ingressos não utilizados pela não
          comprovação do direito ao benefício de meia entrada, caso o cliente
          opte por não realizar o pagamento do valor complementar.
        </li>
        <li>
          Limites de ingressos por tipo (preço, categoria ou setor) podem ser
          aplicados a critério da produção do evento.
        </li>
        <li>
          Promoções ou descontos exclusivos podem ser aplicados ao valor de face
          dos ingressos, a critério do produtor do evento.
        </li>
        <li>
          Promoções com descontos e/ou pré-vendas exclusivas: A Ingresso Rápido
          poderá solicitar o cadastro do CPF do cliente para cada ingresso
          comprado, bem como, o código promocional quando necessário, inibindo a
          compra de ingressos acima do limite permitido para o mesmo
          evento/apresentação, seguindo as regras determinadas de cada promoção
          e a critério do produtor do evento.
        </li>
        <li>
          No caso de ações promocionais exclusivas para bancos ou meios de
          pagamento, os valores ou a pré-venda poderão ser restritas a seus
          clientes e o cadastro dos 6 primeiros dígitos do cartão de crédito
          será obrigatório para comprovação da condição e finalização do pedido.
        </li>
        <li>
          O E-mail Marketing é uma ferramenta importante para a comunicação com
          o cliente. Criar e enviar e-mail marketing exige um criterioso sistema
          a ser seguido, para preservação da privacidade e segurança do cliente.
        </li>
        <li>
          Todo E-mail Marketing enviado pela Ingresso Rápido conta com o
          consentimento do cliente, (Opt-in), pois ele mesmo opta expressamente
          por receber através de uma inscrição ou implicitamente quando é
          estabelecido um contato entre as partes, sem que se utilize de meios
          intrusivos.
        </li>
        <li>
          Todos os e-mails enviados pela Ingresso Rápido possuem o link de
          opt-out (opção de descadastramento do e-mail para receber futuras
          mensagens), desse modo, é respeitada integralmente a privacidade e
          liberdade de quem recebe a mensagem.
        </li>
        <li>
          A Ingresso Rápido segue uma rigorosa política de privacidade,
          disponível em <a href="https://www.ingressorapido.com.br/privacy"
            >https://www.ingressorapido.com.br/privacy</a
          >.
        </li>
        <li>
          Na abertura de vendas de ingressos para eventos de alta procura,
          poderá se aplicar fila on line e virtual, para que se mantenha a
          estabilidade da plataforma e, consequentemente, a segurança do
          cliente.
        </li>
        <li>A fila virtual não garante a disponibilidade de ingressos.</li>
        <li>
          Em Eventos realizados no Município de Cuiabá, as pessoas com
          deficiência e seu acompanhante fazem jus à ingressos gratuitos,
          conforme Lei Municipal n. 5.634/2013
        </li>
        <li>
          Ao utilizar nossa plataforma, o cliente concorda com os termos e
          condições descritos anteriormente.
        </li>
        <li>
          Ao utilizar nossa plataforma, o cliente concorda com a nossa Política
          de Privacidade
        </li>
      </ol>
      Plataforma IngressoJá! SA.
      <address>
        Alameda Tocantins, 350 - 1º andar conj. 101 - CEP: 06455-020 Alphaville,
        Barueri - São Paulo
      </address>
    </div>
  </div>
</div>
