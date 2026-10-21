console.log("JavaScript funcionando");

let quantidadeCarrinho = 0;

let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];

const botoesComprar = document.querySelectorAll(".btn-comprar");

const contadorCarrinho = document.querySelector(".cart-badge");

const botaoCarrinho = document.querySelector(".cart-btn");

const modalCarrinho = document.querySelector(".carrinho-modal");

const botaoFecharCarrinho = document.querySelector(".fechar-carrinho");

const carrinhoItens = document.querySelector(".carrinho-itens");

const carrinhoTotal = document.querySelector(".carrinho-total");

console.log(botoesComprar);

function salvarCarrinho() {
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );
}

function atualizarCarrinho() {
    salvarCarrinho();
    const carrinhoItens = document.querySelector(".carrinho-itens");

    carrinhoItens.innerHTML = "";

    let total = 0;


    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = "<p>Seu carrinho está vazio.</p>";
        carrinhoTotal.textContent = "Total: R$ 0,00";
        return;


    }

    carrinho.forEach(function (produto, index) {

        const precoNumero = Number(produto.preco.replace("R$", "").replace(".", "").replace(",", "."));

        total += precoNumero * produto.quantidade;

        const item = document.createElement("div");


        item.classList.add("carrinho-item");

        item.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>${produto.preco}</p>
        <div class="controle-quantidade">
           <button class="diminuir-quantidade">-</button>
           <span>${produto.quantidade}</span>
           <button class="aumentar-quantidade">+</button>
        </div>
        
        <buttom class="remover-item">Remover</button>
        
        `;

        const botaoRemover = item.querySelector(".remover-item");

        const botaoAumentar = item.querySelector(".aumentar-quantidade");

        const botaoDiminuir = item.querySelector(".diminuir-quantidade");

        botaoAumentar.addEventListener("click", function () {
            produto.quantidade++;

            quantidadeCarrinho = carrinho.reduce(function (total, produto) {
                return total + produto.quantidade;
            }, 0);

            contadorCarrinho.textContent = quantidadeCarrinho;

            salvarCarrinho();
            atualizarCarrinho();
        });

        botaoDiminuir.addEventListener("click", function () {

            if (produto.quantidade > 1) {
                produto.quantidade--;
            } else {
                carrinho.splice(index, 1);
            }

            quantidadeCarrinho = carrinho.reduce(
                function (total, produto) {
                    return total + produto.quantidade;
                }, 0
            );

            contadorCarrinho.textContent = quantidadeCarrinho;

            salvarCarrinho();
            atualizarCarrinho();

        });


        botaoRemover.addEventListener("click", function () {
            carrinho.splice(index, 1);

            quantidadeCarrinho = carrinho.reduce(
                function (total, produto) {
                    return total + produto.quantidade;
                }, 0
            );

            contadorCarrinho.textContent = quantidadeCarrinho;

            atualizarCarrinho();

        });



        carrinhoItens.appendChild(item);



    });

    carrinhoTotal.textContent = `Total : R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

}

botoesComprar.forEach(function (botao) {
    botao.addEventListener("click", function () {



        const card = botao.closest(".produto-card");

        const nomeProduto = card.querySelector("h2").textContent;

        const precoProduto = card.querySelector(".preco").textContent;

        const produto = {
            nome: nomeProduto,
            preco: precoProduto,
            quantidade: 1
        };

        console.log(precoProduto);

        const produtoExistente = carrinho.find(function (item) {
            return item.nome === produto.nome;
        });


        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinho.push(produto);
        }

        atualizarCarrinho();

        console.log(carrinho);


        quantidadeCarrinho = carrinho.reduce(function (total, produto) {
            return total + produto.quantidade;
        }, 0);

        contadorCarrinho.textContent = quantidadeCarrinho;
        console.log(quantidadeCarrinho);

        console.log(nomeProduto);
    });
});


botaoCarrinho.addEventListener("click", function () {
    console.log(carrinho);

    modalCarrinho.style.display = "block";

    setTimeout(function () {
        modalCarrinho.classList.add("aberto");
    }, 10);
});

botaoFecharCarrinho.addEventListener("click", function () {
    modalCarrinho.classList.remove("aberto");

    setTimeout(function () {
        modalCarrinho.style.display = "none";
    }, 300);
});


quantidadeCarrinho = carrinho.reduce(
    function (total, produto) {
        return total + produto.quantidade;
    }, 0
);

contadorCarrinho.textContent = quantidadeCarrinho;

atualizarCarrinho();

modalCarrinho.addEventListener("click", function (event) {
    if (event.target === modalCarrinho) {
        modalCarrinho.classList.remove("aberto");

        setTimeout(function () {
            modalCarrinho.style.display = "none";
        }, 300);
    }
});


const inputBusca = document.querySelector("#input-busca");

const botaoBusca = document.querySelector("#btn-busca");

const produtosCards = document.querySelectorAll(".produto-card");

const mensagemBusca = document.querySelector("#mensagem-busca");

const botaoFinalizarCompra = document.querySelector(".finalizar-compra");

function pesquisarProdutos() {
    const pesquisa = inputBusca.value.toLowerCase().trim();

    let produtosEncontrados = 0;

    produtosCards.forEach(function (card) {
        const nomeProduto = card.querySelector("h2").textContent.toLowerCase();

        if (nomeProduto.includes(pesquisa)) {
            card.style.display = "";
            produtosEncontrados++;
        } else {
            card.style.display = "none";
        }

    });

    if (produtosEncontrados === 0) {
        mensagemBusca.style.display = "block";
    } else {
        mensagemBusca.style.display = "none";
    }
}

botaoBusca.addEventListener("click", pesquisarProdutos);

inputBusca.addEventListener("input", pesquisarProdutos);

botaoFinalizarCompra.addEventListener("click", function () {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    window.location.href = "checkout.html";
});