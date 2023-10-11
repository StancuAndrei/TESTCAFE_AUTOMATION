const { Selector } = require("testcafe");

class CartPage{
    constructor(){
        this.termsLabel1 = Selector('#termsofservice')
        this.cartTotal = Selector('td.cart-total-right')
        this.checkoutBtn = Selector('#checkout')
        this.checkoutAsGuest = Selector('button').withText('CHECKOUT AS GUEST')
    }
}

export default new CartPage();