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

Cypress.Commands.add('seed', () => {
  const todoItems = ['Pay electric bill', 'Walk the dog']

  todoItems.forEach(todoItem => {
    cy.get('[data-test=new-todo]').type(`${todoItem}{enter}`)
  })
})

Cypress.Commands.add('deleteAll', () => {
  cy.get('.todo-list li').each(($el) => {
    cy.wrap($el).find('.destroy').click({ force: true })
  })
})
