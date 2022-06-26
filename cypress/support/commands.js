// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//POST /sessions
Cypress.Commands.add('setToken', () => {
  cy.api({
    method: 'POST',
    url: '/sessions',
    body: {
      email: 'david-teixeira@qacademy.io',
      password: 'qa-cademy'
    },
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.eql(200)
    Cypress.env('token', response.body.token)
    Cypress.env('userID', `/back2thepast/${response.body.user._id}`)
  })
})

//POST /delete
Cypress.Commands.add('back2ThePast', () => {
  cy.api({
    method: 'DELETE',
    url: `/back2thepast/${response.body.user._id}`,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.eql(200)
  })
})

//POST /character
Cypress.Commands.add('postCharacter', payLoad => {
  cy.api({
    method: 'POST',
    url: '/characters',
    body: payLoad,
    headers: {
      Authorization: Cypress.env('token')
    },
    failOnStatusCode: false
  }).then(response => {
    return response
  })
})
