describe('POST /characters', () => {
  before(() => {
    cy.back2ThePast()
    cy.setToken()
  })

  it('Deve cadastrar um personagem', () => {
    const character = {
      name: 'Charles Xavier',
      alias: 'Professor Xavier',
      team: ['X-MEN', 'Illuminatis'],
      active: true
    }
    cy.api({
      method: 'POST',
      url: '/characters',
      body: character,
      headers: {
        Authorization: Cypress.env('token')
      }
    }).then(response => {
      expect(response.status).to.eql(201)
      cy.log(`ID do personagem: ${response.body.character_id}`)
      expect(response.body.character_id.length).to.eql(24)
    })
  })
})
