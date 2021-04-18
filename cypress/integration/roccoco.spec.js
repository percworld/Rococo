const url = 'https://collectionapi.metmuseum.org/public/collection/v1/';
describe('Get Images By Tags', () => {
    //     208013,
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

    it('should have a location', () => {
        cy.location().should((loc) => {
            expect(loc.port).to.eq('3000')
            expect(loc.protocol).to.eq('http:')
            expect(loc.host).to.eq('localhost:3000');
            expect(loc.toString()).to.eq(
                'http://localhost:3000/'
            )
        })
    })

    it('should have a header', () => {
        cy.get('button').first()
            .contains('Roccoco')
    })

    it('should show the user a display of art from the Met', () => {
        cy.get('.salonTemplate').children().should('have.length', 8)
    })

    it('should have images for each sorted artwork', () => {
        cy.get('.salonTemplate').children().get('.div1').should('have.attr', 'href')
        cy.get('.div2').children().should('exist')
            .and('have.attr', 'src').and('include', 'jpg')
    })
})

describe('Details View', () => {
    beforeEach(() => {
        cy.intercept(`${url}search?hasImages=true&q=canvas&q=painting&q=oil&`, { fixture: 'artIDs.json' })
        cy.intercept(`${url}objects/208013`, { fixture: 'artData1.json' })
        cy.intercept(`${url}objects/203013`, { fixture: 'artData2.json' })
        cy.visit('http://localhost:3000/')
    })

    it('should render a page for details on any piece of art clicked', () => {
        cy.get('.div3').click();
        cy.url().should('include', '/')
        cy.get('section[class=art-details]').children().children()
            .should('have.attr', 'src')
            .get('section[class=art-details]').children()
            .should('have.class', 'details-image')
            .get('article').should('have.class', 'info-card')
            .children().should('have.length', '6')
            .get('p').first().contains('c.')
    })

    it('should go back home by clicking the header logo', () => {
        cy.get('.div1').click()
        cy.intercept(`${url}search?hasImages=true&q=canvas&q=painting&q=oil&`, { fixture: 'artIDs.json' })
        cy.get('button[class=logo-container]').click();
        cy.get('.div2').children().should('exist')
    })

    it('should also go to base url by clicking the back button', () => {
        cy.get('.div1').click()
        cy.intercept(`${url}search?hasImages=true&q=canvas&q=painting&q=oil&`, { fixture: 'artIDs.json' })
        cy.get('button[data-cy=back-button]').click();
        cy.get('.div2').children().should('exist')
    })

})

describe('Favorites Adding and Viewing', () => {
    beforeEach(() => {
        cy.intercept(`${url}search?hasImages=true&q=canvas&q=painting&q=oil&`, { fixture: 'artIDs.json' })
        cy.intercept(`${url}objects/208013`, { fixture: 'artData1.json' })
        cy.intercept(`${url}objects/203013`, { fixture: 'artData2.json' })
        cy.visit('http://localhost:3000/')
    })

    it('should be able to add a favorite to the user\'s favorites', () => {
        cy.get('.div1').click();
        cy.get('button[data-cy=add-favorite]')
            .contains('Add to Favorites')
            .click();
        cy.get('button[data-cy=rmv-favorite]')
            .contains('Remove from Favorites')
    })

    it('should be able to view user\'s favorites', () => {
        cy.get('.div1').click();
        cy.get('button[data-cy=add-favorite]').click();
        cy.get('.favorites-button').first().click();
        cy.get('.salonTemplate')
            .children().get('.div1').should('have.attr', 'href')
        cy.get('.div2')
            .children().should('exist')
            .and('have.attr', 'src').and('include', 'jpg')
    })

})




