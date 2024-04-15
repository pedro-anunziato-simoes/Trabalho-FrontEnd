if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", pronto())
} else {
    pronto()
}


var totalItens = "0,00"
function pronto() {
    const botaoRemoverItem = document.getElementsByClassName("botao-remover-item")
    for (var i = 0; i < botaoRemoverItem.length; i++) {
        botaoRemoverItem[i].addEventListener("click", removerItem)
    }

    const quantidadeItens = document.getElementsByClassName("quantidade-carrinho")
    for (var i = 0; i < quantidadeItens.length; i++) {
        quantidadeItens[i].addEventListener("change", checarInputNulo)
    }

    const botaoAdicionarItemCarrinho = document.getElementsByClassName("botao-adicionar-produto")
    for (var i = 0; i < botaoAdicionarItemCarrinho.length; i++) {
        botaoAdicionarItemCarrinho[i].addEventListener("click", adicionarCarrinho)
    }

    const botaoEnviarPedido = document.getElementsByClassName("botao-enviar-pedido")[0]
    botaoEnviarPedido.addEventListener("click",fazerCompra)
}
function fazerCompra(){
    if(totalItens ==="0,00"){
        alert("Seu carrinho está vazio!!!")
    }else{
        alert(
            `
            Obrigado pela sua compra!
            Valor do pedido:R$${totalItens}
            Volte Sempre :)
            `
        )
    }

    document.querySelector(".carrinho tbody").innerHTML = ""
    atualziarTabela()
}


function checarInputNulo(event){
   if(event.target.value === "0"){
    event.target.parentElement.parentElement.remove()
   }

   atualziarTabela()
}

function adicionarCarrinho(event) {
    const botao = event.target
    const informacoesProduto = botao.parentElement.parentElement
    const imagemProduto = informacoesProduto.getElementsByClassName("imagem-produto")[0].src
    const tituloProduto = informacoesProduto.getElementsByClassName("titulo-produto")[0].innerText
    const precoProduto = informacoesProduto.getElementsByClassName("preco-produto")[0].innerText

    const nomeProdutoCarrinho = document.getElementsByClassName("titulo-item")
    for (var i = 0; i < nomeProdutoCarrinho.length; i++) {
        if (nomeProdutoCarrinho[i].innerText == tituloProduto) {
            nomeProdutoCarrinho[i].parentElement.parentElement.getElementsByClassName("quantidade-carrinho")[0].value++
                return
        }

    }
    let novoProdutoCarinho = document.createElement("tr")
    novoProdutoCarinho.classList.add("item-carrinho")

    novoProdutoCarinho.innerHTML =
        `
        <td class="identificacao-item"><strong
        class="titulo-item">${tituloProduto}</strong><img src="${imagemProduto}" alt="${tituloProduto}"></td>
            <td>
                <span class="preco-item">${precoProduto}</span>
            </td>
            <td><input type="number" value="1" class="quantidade-carrinho"><button
                    class="botao-remover-item">Remover</button></td>
    `
   
    const corpoTabela = document.querySelector(".carrinho tbody")
    corpoTabela.append(novoProdutoCarinho)
    atualziarTabela()
    novoProdutoCarinho.getElementsByClassName("quantidade-carrinho")[0].addEventListener("change",checarInputNulo)
    novoProdutoCarinho.getElementsByClassName("botao-remover-item")[0].addEventListener("click",removerItem,atualziarTabela)
}


function removerItem(event) {
    event.target.parentElement.parentElement.remove()
    atualziarTabela()
}


function atualziarTabela() {
    totalItens = 0
    const itemCarrinho = document.getElementsByClassName("item-carrinho")
    for (var i = 0; i < itemCarrinho.length; i++) {
        const precoItem = itemCarrinho[i].getElementsByClassName("preco-item")[0].innerText.replace("R$", "").replace(",", ".")
        const quantidadeItem = itemCarrinho[i].getElementsByClassName("quantidade-carrinho")[0].value
        totalItens += precoItem * quantidadeItem
    }
    totalItens = totalItens.toFixed(2)
    totalItens = totalItens.replace(".", ",")
    document.querySelector(".total-itens-carrinho span").innerText = "R$" + totalItens

}




