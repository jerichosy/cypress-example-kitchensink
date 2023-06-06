describe('todomvc app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/todo')
    cy.get('[data-test=new-todo]').type(`Pay electric bill{enter}`)
    cy.get('[data-test=new-todo]').type(`Walk the dog{enter}`)
  })

  it('can add new todo items', () => {
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // assert
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
    const itemToCheckOff = 'Walk the dog'
    cy.contains(itemToCheckOff)
      .parent()
      .find('input[type=checkbox]')
      .check()

    // assert
    cy.contains(itemToCheckOff)
      .parents('li')
      .should('have.class', 'completed')
  })
})
