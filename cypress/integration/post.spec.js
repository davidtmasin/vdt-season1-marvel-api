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

    cy.postCharacter(character).then(response => {
      expect(response.status).to.eql(201)
      cy.log(`ID do personagem: ${response.body.character_id}`)
      expect(response.body.character_id.length).to.eql(24)
    })
  })

  context('Quando o personagem já existe', () => {
    const character = {
      name: 'James Howlett (Logan)',
      alias: 'Wolverine',
      team: ['X-MEN'],
      active: true
    }

    before(() => {
      cy.postCharacter(character).then(response => {
        expect(response.status).to.eql(201)
      })
    })

    it('Não deve cadastrar duplicado', () => {
      cy.postCharacter(character).then(response => {
        expect(response.status).to.eql(400)
        expect(response.body.error).to.eql('Duplicate character')
      })
    })
  })
})
