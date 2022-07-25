import { eCommerceLandingPageUrl, laptopsShopPageUrl } from '../../support/routes';
import DepartmentPage from './departmentPage';

class LaptopsPage extends DepartmentPage {
  visit() {
    // set cookie so no cookie prompt appears
    cy.setCookie('gdpr_consent_type', '1');
    cy.visit(eCommerceLandingPageUrl + laptopsShopPageUrl);
  }
}

export default LaptopsPage;
