const carrinhoCheckout = JSON.parse(localStorage.getItem("carrinho")) || [];

console.log(carrinhoCheckout);

const checkoutItens = document.querySelector("#checkout-itens");

const checkoutTotal = document.querySelector("#checkout-total");

let valorTotal = 0;

carrinhoCheckout.forEach(function (produto) {

    console.log(produto);
    console.log(produto.quantidade);

    const precoNumerico = Number(produto.preco.replace("R$ ", "").replace(/\./g, "").replace(",", "."));

    valorTotal += precoNumerico * produto.quantidade;

    checkoutItens.innerHTML += `
    <div class="checkout-item">
        <h3>${produto.nome}</h3>
        <p>Preço: ${produto.preco}</p>
        <p>Quantidade: ${produto.quantidade}</p>
    </div>

  `;

});

checkoutTotal.textContent = valorTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const botaoContinuar = document.querySelector("#btn-continuar-pagamento");

const formularioComprador = document.querySelector("#form-comprador");

botaoContinuar.addEventListener("click", function () {

   if (formularioComprador.checkValidity()) {

    const resumoPedido = {
        produtos: carrinhoCheckout,
        total: valorTotal
    };
    
    localStorage.setItem(
        "resumoPedido",
        JSON.stringify(resumoPedido)
    );

    window.location.href = "pagamento.html";

} else {
    formularioComprador.reportValidity();
   }

   
});