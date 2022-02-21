describe('intercept with cypress examples', () => {

    it('test api with simple intercept', () => {
        cy.visit('https://jsonplaceholder.typicode.com/');
        // my author's idea, how to log all the elements from the list, im almost sure that it is so poor... :)

        cy.intercept({
            path: '/posts'
        }).as('posts');
        cy.visit('https://jsonplaceholder.typicode.com')
            .get("table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a").click();
        cy.wait('@posts');
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/')
            .then((post) => {
                cy.log(JSON.stringify(post));
            });
    });;
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
    .then((listOfPosts) => {
        cy.get(listOfPosts.body).each((item) => {
            cy.log(item.title);
        });
    });

    it('mocking with intercept test - static response', () => {
        cy.intercept('GET', '/posts', { totalposts: 59, bodylody:'23', index:0 }).as('posts');
        cy.visit('https://jsonplaceholder.typicode.com')
            .get("table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a").click();
        cy.wait('@posts');
    });

    it('mocking with intercept test - dynamic fixture', () => {
        cy.intercept('GET', '/posts', { fixture: 'data_file.json ' }).as('posts');
        cy.visit('https://jsonplaceholder.typicode.com')
            .get("table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a").click();
        cy.wait('@posts');
    });
});