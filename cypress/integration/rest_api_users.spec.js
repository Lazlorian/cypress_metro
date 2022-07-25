const api = 'https://dummy.restapiexample.com/api/v1/';
// was getting constant 429 - Too Many Requests
// explicit wait between requests seems to help a bit
const waitTime = 1000;

describe('Employee RestAPI', () => {
  it('CRUD operations', () => {

    cy.wait(waitTime);
    // successfully retrieves all employees and counts the number of employees with age number higher than 30
    cy.request('GET', `${api}employees`).then((response) => {
      const numberOfOver30 = (response.body.data).filter((x) => x.employee_age > 30).length
      cy.log(`Number of employees over the age 30: ${numberOfOver30}`);

      const newUser = JSON.parse('{"name":"test","salary":"123","age":"31"}');
      const newUserUpdated = JSON.parse('{"name":"test","salary":"123","age":"38"}');

      cy.wait(waitTime);
      // successfully adds new employee with age higher than 30 and assert that operation is successful
      cy.request('POST', `${api}create`, newUser).then((response) => {
        assert.equal(response.status, '200', 'Check status code');
        assert.equal(response.body.status, 'success', 'Check status message');
        assert.equal(response.body.data.name, newUser.name, 'Check created name');
        assert.equal(response.body.data.salary, newUser.salary, 'Check created salary');
        assert.equal(response.body.data.age, newUser.age, 'Check created age');

        const newUserId = response.body.data.id;

        cy.wait(waitTime);
        // successfully updates the employee and asserts that operation is successful
        cy.request('PUT', `${api}update/${newUserId}`, newUserUpdated).then((updateResponse) => {
          assert.equal(updateResponse.status, '200', 'Check status code');
          assert.equal(updateResponse.body.status, 'success', 'Check status message');
          assert.equal(updateResponse.body.data.name, newUserUpdated.name, 'Check created name');
          assert.equal(updateResponse.body.data.salary, newUserUpdated.salary, 'Check created salary');
          assert.equal(updateResponse.body.data.age, newUserUpdated.age, 'Check created age');
        });

        // successfully retrieves all employees and asserts that employees with age number higher than 30 has modified
        // cy.request('GET', `${api}employees`).then((response) => {
        //   const freshNumberOfOver30 = (response.body.data).filter((x) => x.employee_age > 30).length
        //   cy.log(`Number of employees over the age 30 after update: ${freshNumberOfOver30}`);
        //   assert.isAbove(freshNumberOfOver30, numberOfOver30)
        // });

        cy.wait(waitTime);
        // successfully deletes the employee that he added and asserts the operation is successful
        cy.request('DELETE', `${api}delete/${newUserId}`).then((deleteResponse) => {
          assert.equal(deleteResponse.status, '200', 'Check status code');
          assert.equal(deleteResponse.body.status, 'success', 'Check status message');
          assert.equal(deleteResponse.body.data, newUserId, 'Check deleted ID');
        });
      });
    });
  });
});