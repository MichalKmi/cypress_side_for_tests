describe('post api user tests', () => {

    it('add user', () => {
        const randomPart = Math.floor(Math.random() * 100);
        cy.fixture('data_file').then((payload) => {
            for (const user of payload.users) {
                cy.request({
                    method: 'POST',
                    url: 'https://gorest.co.in/public/v2/users',
                    headers: {
                        Authorization: Cypress.env("GOREST_BEARER")
                    },
                    body: {
                        //cannot add twice the same email, to be aware about it
                        "name": user.name,
                        "gender": user.gender,
                        "email": randomPart + user.email,
                        "status": user.status,
                    }
                });
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users',
                    headers: {
                        Authorization: Cypress.env("GOREST_BEARER")
                    }
                }).then((response) => {
                    cy.log(JSON.stringify(response.body[0]));
                    cy.expect(response.status).equal(200);
                    cy.expect(JSON.stringify(response.body[0].name)).to.equal(`"${user.name}"`);
                });
            }
        });
    });
});