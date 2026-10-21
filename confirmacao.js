document; addEventListener("DOMContentLoaded", function () {
    const numeroPedido = document.getElementById("numero-pedido");

    if (numeroPedido) {
        const numeroAleatorio = Math.floor(Math.random() * 900000) + 100000;

        numeroPedido.textContent = "Pedido #" + numeroAleatorio;
    }

    const resumoConfirmacao = document.getElementById("resumo-confirmacao");

    const dadosSalvos = localStorage.getItem("resumoPedido");

    if (resumoConfirmacao && dadosSalvos) {

        const pedido = JSON.parse(dadosSalvos);

        pedido.produtos.forEach(function (produto) {

            resumoConfirmacao.innerHTML += `
                    <div class="produto-confirmacao">
                         <h3>${produto.nome}</h3>
                         <p>Preço: ${produto.preco}</p>
                         <p>Quantidade: ${produto.quantidade}</p>

                    </div>
                
                `;
        });

        resumoConfirmacao.innerHTML += `
                <h3>Total: ${pedido.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</h3>
            
            `;


    }
});