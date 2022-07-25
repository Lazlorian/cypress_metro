class DepartmentPage {
  /**
   * @param index - get nth element, zero based
   * */
  getProductCard(index = 0) {
    return cy.get('.card-v2').eq(index);
  }

  /**
   * @param index - get nth element, zero based
   * */
  getAddProductToShoppingCartButton(index = 0) {
    return this.getProductCard(index).find('.card-v2-content .btn-primary');
  }

  getPurchasedModal() {
    return cy.get('.product-purchased-modal .modal-content');
  }

  getPurchasedModalCartButton() {
    return this.getPurchasedModal().find('.btn-sm').eq(0);
  }
}

export default DepartmentPage;
