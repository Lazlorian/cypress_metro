class Navbar {
  getNavbar() {
    return cy.get('#masthead');
  }

  getNavbarShoppingCart() {
    return this.getNavbar().find('#my_cart');
  }

  getShoppingCartItemCount() {
    return this.getNavbarShoppingCart().find('.jewel');
  }
}

export default Navbar;
