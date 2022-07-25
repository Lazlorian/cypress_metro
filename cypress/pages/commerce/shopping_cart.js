class ShoppingCart {
  getShoppingCartContainer() {
    return cy.get('#vendorsContainer').eq(0);
  }

  getProductCountDropdown() {
    return this.getShoppingCartContainer().find('.select2').last();
  }

  getDropdownItems() {
    return cy.get('.select2-results__option[role="treeitem"]');
  }

  getDropdownDisplayedNumber() {
    return cy.get('.select2-selection__rendered');
  }

  getRemoveProductButton() {
    return this.getShoppingCartContainer().find('.btn-remove-product');
  }
}

export default ShoppingCart;
