"use strict";
class FixedDiscount {
    constructor(value = 0) {
        this._value = value;
        if (value <= 0) {
            throw new Error("You cannot create a fixed discount with a negative value");
        }
    }
    apply(price) {
        return Math.max(0, price - this._value);
    }
    showCalculation(price) {
        return price + "€ -  " + this._value + "€ (min 0 €)";
    }
}
class VariableDiscount {
    constructor(value = 0) {
        this._value = value;
        if (value <= 0) {
            throw new Error("You cannot create a variable discount with a negative value");
        }
    }
    apply(price) {
        return price - (price * this._value) / 100;
    }
    showCalculation(price) {
        return price + " € -  " + this._value + "%";
    }
}
class NoDiscount {
    apply(price) {
        return price;
    }
    showCalculation(price) {
        return "No discount";
    }
}
/*class Discount {
  private _type: discountType;
  private _value: number;

  constructor(type: discountType, value: number = 0) {
    this._type = type;
    this._value = value;

    if (this._type != "none" && value <= 0) {
      throw new Error("You cannot create a " + this._type + " discount with a negative value");
    }
  }

  apply(price: number): number {
    //@todo: instead of using magic values as string in this, it would be a lot better to change them into constant. This would protect us from misspellings. Can you improve this?
    if (this._type === "none") {
      return price;
    } else if (this._type === "variable") {
      return price - (price * this._value) / 100;
    } else if (this._type === "fixed") {
      return Math.max(0, price - this._value);
    } else {
      throw new Error("Invalid type of discount");
    }
  }

  showCalculation(price: number): string {
    if (this._type === "none") {
      return "No discount";
    } else if (this._type === "variable") {
      return price + " € -  " + this._value + "%";
    } else if (this._type === "fixed") {
      return price + "€ -  " + this._value + "€ (min 0 €)";
    } else {
      throw new Error("Invalid type of discount");
    }
  }
}*/
class Product {
    constructor(name, price, discount) {
        this._name = name;
        this._price = price;
        this._discount = discount;
    }
    get name() {
        return this._name;
    }
    get discount() {
        return this._discount;
    }
    get originalPrice() {
        return this._price;
    }
    //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
    //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
    calculatePrice() {
        return this._discount.apply(this._price);
    }
    showCalculation() {
        return this._discount.showCalculation(this._price);
    }
}
class shoppingBasket {
    constructor() {
        //this array only accepts Product objects, nothing else
        this._products = [];
    }
    get products() {
        return this._products;
    }
    addProduct(product) {
        this._products.push(product);
    }
}
let cart = new shoppingBasket();
cart.addProduct(new Product("Chair", 25, new FixedDiscount(10)));
// cart.addProduct(new Product('Chair', 25, new FixedDiscount( -10)));
cart.addProduct(new Product("Table", 50, new VariableDiscount(25)));
cart.addProduct(new Product("Bed", 100, new NoDiscount()));
const tableElement = document.querySelector("#cart tbody");
cart.products.forEach((product) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = product.name;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = product.originalPrice.toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = product.calculatePrice().toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerText = product.showCalculation();
    tr.appendChild(td);
    tableElement.appendChild(tr);
});
