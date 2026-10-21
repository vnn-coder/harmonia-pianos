const opcoesPagamento = document.querySelectorAll(".opcao-pagamento");

const detalhesPagamento = document.querySelector("#detalhes-pagamento");

opcoesPagamento.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const formaPagamento = botao.dataset.pagamento;

        if (formaPagamento === "pix") {
            detalhesPagamento.innerHTML = `
            <div class="detalhes-pix">
              <h3>Pagamento via PIX</h3>
              <p>Utilize o pix para realizar o pagamento do seu pedido.</p>
              <button type="button" class="btn-finalizar-pix">
               Gerar PIX
              </button>
         </div>

        `;
        }

        else if (formaPagamento === "cartao") {

            detalhesPagamento.innerHTML = `
        <div class="detalhes-cartao">

            <h3>Pagamento com cartão</h3>

            <div class="campo-cartao campo-numero">
                <label>Número do cartão</label>
                <input
                    type="text"
                    id="numero-cartao"
                    placeholder="0000 0000 0000 0000"
                    maxlength="19"
                    inputmode="numeric"
                >
            </div>

            <div class="campo-cartao campo-nome">
                <label>Nome no cartão</label>
                <input
                    type="text"
                    id="nome-cartao"
                    placeholder="Nome impresso no cartão"
                >
            </div>

            <div class="campo-cartao">
                <label>Validade</label>
                <input
                    type="text"
                    id="validade-cartao"
                    placeholder="MM/AA"
                    maxlength="5"
                    inputmode="numeric"
                >
            </div>

            <div class="campo-cartao">
                <label>CVV</label>
                <input
                    type="text"
                    id="cvv-cartao"
                    placeholder="123"
                    maxlength="4"
                    inpuntmode="numeric"
                >
            </div>

            <button type="button" class="btn-finalizar-cartao">
                Finalizar pagamento
            </button>

        </div>
    `;
        }



        else if (formaPagamento === "boleto") {
            detalhesPagamento.innerHTML = `
            <div class="detalhes-boleto">
                <h3>Pagamento via boleto</h3>
                <p>Gere o boleto para realizar o pagamento do seu pedido.</p>

                <button type="button" class="btn-finalizar-boleto">
                    Gerar boleto
                </button>
            </div>

            
            `;
        }


        console.log("Forma esoclhida", formaPagamento);

    });
});


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-finalizar-pix")) {
        const detalhesPix = document.querySelector("#detalhes-pagamento .detalhes-pix");

        console.log("Resultado da busca:", detalhesPix);

        console.log("Elemento PIX encontrado!");

        console.log("Botão Gerar PIX clicado!");

        detalhesPix.innerHTML = `        
        <h3>PIX gerado com sucesso!</h3>
         <p>Este é um pagamento demonstrativo.</p>
         <p>Nenhuma cobrança real será realizada.</p>
         <button type="button" class="btn-confirmar-pix">
           Simular pagamento concluído
         </button>

        `;
    }
});

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("btn-finalizar-boleto")) {

        console.log("Clique detectado:", event.target);

        const detalhesBoleto = document.querySelector(
            "#detalhes-pagamento .detalhes-boleto"
        );

        console.log("Resultado da busca do boleto:", detalhesBoleto);

        if (!detalhesBoleto) return;

        detalhesBoleto.innerHTML = `
            <h3>Boleto gerado com sucesso!</h3>

            <p>Este é um boleto demonstrativo.</p>

            <p>Nenhuma cobrança será realizada.</p>

            <button type="button" class="btn-confirmar-boleto">
                Simular pagamento concluído
            </button>
        
        `;
    }
});

function validarCartao() {
    const numero = document.querySelector("#numero-cartao").value.trim();

    const nome = document.querySelector("#nome-cartao").value.trim();

    const validade = document.querySelector("#validade-cartao").value.trim();

    const cvv = document.querySelector("#cvv-cartao").value.trim();

    if (!numero || !nome || !validade || !cvv) {
        alert("Preencha todos os campos do cartão");
        return false;
    }

    const numeroLimpo = numero.replace(/\s/g, "");

    if (!/^\d{16}$/.test(numeroLimpo)) {
        alert("O numero do cartao deve conter 16 dígitos.");
        return false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(validade)) {
        alert("Digite uma validade válida no formato MM/AA.");
        return false;
    }

    const [mes, ano] = validade.split("/").map(Number);

    const dataAtual = new Date();


    const mesAtual = dataAtual.getMonth() + 1;

    const anoAtual = dataAtual.getFullYear() % 100;


    if (ano < anoAtual || (ano == - anoAtual && mes < mesAtual)) {
        alert("Este cartão está vencido.");
        return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        alert("O CVV deve conter 3 ou 4 dígitos numéricos.");
        return false;
    }

    return true;
}

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("btn-finalizar-cartao")) {

        const cartaoValido = validarCartao();

        if (!cartaoValido) {
            return
        }

        const detalhesCartao = document.querySelector(
            "#detalhes-pagamento .detalhes-cartao"
        );

        console.log("Elemento encontrado:", detalhesCartao);

        detalhesCartao.innerHTML = `
            <div class="pagamento-sucesso">
        <h3>Pagamento simulado com sucesso!</h3>
        <p>Os dados do cartão passaram pela validação inicial.</p>
        <p>Nenhuma cobrança real foi realizada.</p>
        <button type="button" class="btn-confirmar-cartao">
            Confirmar pedido
        </button>
    </div>
 
`;
    }
});


document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-confirmar-cartao")) {
        localStorage.removeItem("carrinho");


        window.location.href = "confirmacao.html";
    }
});

document.addEventListener("input", function (event) {
    if (event.target.id === "validade-cartao") {
        let valor = event.target.value.replace(/\D/g, "").slice(0, 4);

        if (valor.length > 2) {
            valor = valor.slice(0, 2) + "/" + valor.slice(2);

        }
        event.target.value = valor;

    }
});
