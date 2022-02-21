describe('weatcher api calls', () => {

    it('get weather info for city', () => {
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=san'
        }).then(async (resp) => {
            cy.expect(resp.status).equal(200);
            // its possible to work in that way with stringify, we can also use array here
            // cy.log(JSON.stringify(response.body[0])); 
            // cy.log(JSON.stringify(response.body));
            cy.log(resp.body[0]);
            for (let i = 0; i < resp.body.length; i++) {
                cy.log(JSON.stringify(resp.body[i].title));
            }
            const city = resp.body[0].title;
            return city;
        })
            .then((city) => {
                cy.request({
                    method: 'GET',
                    url: `https://www.metaweather.com/api/location/search/?query=${city}`,
                }).then(response => {
                    cy.log(response.body[0].title);
                });
            });
    });
    it('Store weather info for many locations', () => {
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=san'
        }).then(async (resp) => {
            const location = resp.body;
            cy.expect(resp.status).equal(200);
            for (let i = 0; i < resp.body.length; i++) {
                cy.log(JSON.stringify(resp.body[i].title));
            }
            const city = resp.body[0].title;
            return city;
        })
            .then((city) => {
                cy.request({
                    method: 'GET',
                    url: `https://www.metaweather.com/api/location/search/?query=${city}`,
                }).then(response => {
                    cy.log(response.body[0].title);
                });
            });
    });
});