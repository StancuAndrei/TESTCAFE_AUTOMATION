const { Selector } = require("testcafe");

fixture("Login Tests demo")
    .page("https://www.saucedemo.com");



test("Validate Login", async (t) => {
    await t
    .typeText("#user-name", "standard_user")
    .typeText("#password","secret_sauce")
    .click("#login-button")
    .expect(Selector(".title").innerText).eql("Products") 
});
