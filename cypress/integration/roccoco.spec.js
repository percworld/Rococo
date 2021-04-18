const url = 'https://collectionapi.metmuseum.org/public/collection/v1/';
describe('Get Images By Tags', () => {
    // 208013,
    //     203013,
    //     10464,
    //     10482,
    //     11130,
    //     470328,
    //     11417,
    //     11145
    beforeEach(() => {
        cy.intercept(`${url}search?hasImages=true&q=canvas&q=painting&q=oil&`, { fixture: 'artIDs.json' })
        cy.intercept(`${url}objects/208013`, { fixture: 'artData1.json' })
        cy.intercept(`${url}objects/203013`, { fixture: 'artData2.json' })
        cy.visit('http://localhost:3000/')
    })

    it('should have a header', () => {
        cy.get('button[className='logo - container']')
            .contains('Roccoco')
    })

    it('should show the user a display of art from the Met', () => {
        cy.get('.salonTemplate').children().should('have.length', 8)
    })

    it('should have images for each sorted artwork', () => {
        cy.get('.div8')
        //first().should('have.attr', 'src')
    })

})