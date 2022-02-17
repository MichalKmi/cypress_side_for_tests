describe('get api user tests', () => {

    it('get users', () => {
        cy.log(Cypress.env("GOREST_BEARER"))
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/4906',
            headers: {
                Authorization: Cypress.env("GOREST_BEARER")
            }
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            cy.expect(response.status).equal(200);
            cy.expect(JSON.stringify(response.body.gender)).to.equal('"male"');
        })
    })
})