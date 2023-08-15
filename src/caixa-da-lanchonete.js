class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
    this.formasDePagamento = ["debito", "credito", "dinheiro"];
  }

  formatarValorParaMoeda(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    const itensPrincipais = new Set();

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }

      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      if (!codigo.includes("extra")) {
        itensPrincipais.add(codigo);
      }
    }

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (codigo.includes("extra")) {
        const itemPrincipal = codigo.replace("extra", "");
        if (!itensPrincipais.has(itemPrincipal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      total += this.cardapio[codigo] * parseFloat(quantidade);
    }

    if (metodoDePagamento === "dinheiro") {
      total *= 0.95;
    } else if (metodoDePagamento === "credito") {
      total *= 1.03;
    }

    return this.formatarValorParaMoeda(total);
  }
}

export { CaixaDaLanchonete };
