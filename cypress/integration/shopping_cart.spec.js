import { eCommerceShoppingCartUrl } from '../support/routes';
import LaptopsPage from '../pages/commerce/laptops_page';
import ShoppingCart from '../pages/commerce/shopping_cart';
import Navbar from '../pages/commerce/navbar';

const laptopsPage = new LaptopsPage();
const shoppingCart = new ShoppingCart();
const navbar = new Navbar();

describe('Shopping cart test for eCommerce website', () => {
  it('Shopping cart: Add and remove products', () => {

    laptopsPage.visit();
    laptopsPage.getProductCard().should('be.visible');

    laptopsPage.getAddProductToShoppingCartButton().should('be.visible').click();
    laptopsPage.getPurchasedModal().should('be.visible');
    laptopsPage.getPurchasedModalCartButton().click();

    cy.url().should('contain', eCommerceShoppingCartUrl);
    navbar.getShoppingCartItemCount().should('have.text', '1');

    // successfully add two products to cart and assert that the operation is successful
    shoppingCart.getShoppingCartContainer().should('be.visible');
    shoppingCart.getProductCountDropdown().click();
    shoppingCart.getDropdownItems().last().click();

    shoppingCart.getDropdownDisplayedNumber()
      .should('have.text', '×2')
      .and('have.attr', 'title', '2');

    // Reload as cart icon does not update
    cy.reload();
    navbar.getShoppingCartItemCount().should('have.text', '2');

    // remove successfully one of them and assert that the result is correct
    shoppingCart.getProductCountDropdown().click();
    shoppingCart.getDropdownItems().first().click();

    shoppingCart.getDropdownDisplayedNumber()
      .should('have.text', '×1')
      .and('have.attr', 'title', '1');

    cy.reload();
    navbar.getShoppingCartItemCount().should('have.text', '1');

    // remove successfully the remaining one and assert that the result is correct
    shoppingCart.getRemoveProductButton().click();

    cy.reload();
    navbar.getShoppingCartItemCount()
      .should('have.class', 'hidden')
      .and('be.empty');

    // try to remove again one of the products expecting a failed test in this case - nothing to check here
    shoppingCart.getShoppingCartContainer().should('not.exist');
  });
});
