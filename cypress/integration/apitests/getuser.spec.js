describe('get api user tests', () => {

    it('get users', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/3518', //dynamically changed, to be aware about it
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