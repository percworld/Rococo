const url = 'https://collectionapi.metmuseum.org/public/collection/v1/';
describe('Get Images By Tags', () => {

    beforeEach(() => {
        cy.intercept(`${url}search?hasImages=true&${q = billiards}`, { fixture: 'artIDs.json' })
        cy.intercept(`${url}objects/${0}`, { fixture: 'artData1.json' })
        cy.intercept(`${url}objects/${1}`, { fixture: 'artData2.json' })
        cy.visit('http://localhost:3000/')
    })

})