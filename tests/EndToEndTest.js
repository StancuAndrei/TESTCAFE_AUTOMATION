import { ClientFunction } from "testcafe";
import * as constants from "../resources/constants";
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import searchresults from '../pages/SearchResultPage'
import productdetails from '../pages/ProductDetailsPage'
import cartpage from '../pages/CartPage'
import checkoutpage from '../pages/CheckoutPage'
import myorderpage from '../pages/MyOrdersPage'

const URL = constants.getEnvironmentalURL();
const getCurrentURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 1000);
var userEmail = 'testUser' + randomNumber + '@test.com';

fixture`End to End`.page(URL);

test('Assert home page', async t => {
    await t
    .expect(getCurrentURL()).eql(URL)
    .takeScreenshot()
    .expect(homepage.subtitleHeader.exists).ok();
})

test('End to end testing, place order, etc', async (t) => {
    await t
    .maximizeWindow()
    .click(homepage.RegisterLink)
    .expect(getCurrentURL()).contains('register')
    .click(registerpage.GenderOption)
    .typeText(registerpage.FirstName, 'Test1')
    .typeText(registerpage.LastName, 'testing')
    .typeText(registerpage.Email, userEmail)
    .typeText(registerpage.Password, '123456')
    .typeText(registerpage.ConfirmPassword, '123456')
    .click(registerpage.RegisterButton)
    .expect(registerpage.SuccessfullMessage.exists).ok();
    await homepage.search('Apple MacBook Pro 13-inch');
    await t
    .click(searchresults.productTitle)
    .expect(getCurrentURL()).contains('apple-macbook-pro-13-inch')
    .expect(productdetails.productPrice.exists).ok()
    .selectText(productdetails.productQuantity).pressKey("delete")
    .typeText(productdetails.productQuantity, '3')
    .click(productdetails.addToCart)
    .expect(productdetails.successMessage.exists).ok()
    .wait(3000)
    .click(homepage.CartLink)
    .click(cartpage.termsLabel1)
    .click(cartpage.checkoutBtn)
    .click(cartpage.checkoutAsGuest)
    .expect(getCurrentURL()).contains('checkout');

    await checkoutpage.selectCountry('Germany');
    await t
    .takeScreenshot()
    .typeText(checkoutpage.firstNameField, 'test')
    .typeText(checkoutpage.lastNameField, 'tester')
    .typeText(checkoutpage.emailField, 'test_tester@test.com')
    .typeText(checkoutpage.cityTxt, 'Berlin')
    .typeText(checkoutpage.addressTxt, '7 abc test')
    .typeText(checkoutpage.zipTxt, '1234')
    .typeText(checkoutpage.phoneTxt, '077772')
    .click(checkoutpage.continueBtn)
    .click(checkoutpage.nextDayOption)
    .click(checkoutpage.continueBtn)
    .click(checkoutpage.nextPaymentBtn)
    .click(checkoutpage.nextConfirmBtn)
    .click(checkoutpage.confirmOrderBtn)
    .expect(checkoutpage.orderConfirmationMessage.exists).ok()
    .click(checkoutpage.viewOrderDetailsLink)
    .click(homepage.MyAccountLink)
    .click(myorderpage.orders)
})

test('Change Currency test', async (t) => {
    await homepage.changeCurrency('Euro')
})