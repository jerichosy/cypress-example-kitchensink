describe('todomvc app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/todo')
  })

  it('can add new todo items', () => {
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // assert
    cy.get('.todo-list li')
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

  it('validate check off issue is due to duplicating default IDs', () => {
    cy.deleteAll()
    cy.seed()

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

  it('assert 3 items', () => {
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // assert
    cy.get('.todo-list li')
      .should('have.length', 3)
  })

  it('show all/active/completed', () => {
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.contains('Walk the dog')
      .parent()
      .find('input[type=checkbox]')
      .check()

    // assert all
    cy.get('.todo-list li')
      .should('have.length', 3)
    cy.contains('Pay electric bill').should('exist')
    cy.contains('Walk the dog').should('exist')
    cy.contains('Feed the cat').should('exist')

    cy.contains('Active').click()
    // assert active
    cy.get('.todo-list li')
      .should('have.length', 2)
    cy.contains('Pay electric bill').should('exist')
    cy.contains('Walk the dog').should('not.exist')
    cy.contains('Feed the cat').should('exist')


    cy.contains('Completed').click()
    // assert completed
    cy.get('.todo-list li')
      .should('have.length', 1)
    cy.contains('Pay electric bill').should('not.exist')
    cy.contains('Walk the dog').should('exist')
    cy.contains('Feed the cat').should('not.exist')

    cy.contains('All').click()
    // assert all again
    cy.get('.todo-list li')
      .should('have.length', 3)
    cy.contains('Pay electric bill').should('exist')
    cy.contains('Walk the dog').should('exist')
    cy.contains('Feed the cat').should('exist')
  })

  it('validate show all/active/completed issue is due to duplicating default IDs', () => {
    cy.deleteAll()
    cy.seed()

    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.contains('Walk the dog')
      .parent()
      .find('input[type=checkbox]')
      .check()

    // assert all
    cy.get('.todo-list li')
      .should('have.length', 3)
    cy.contains('Pay electric bill').should('exist')
    cy.contains('Walk the dog').should('exist')
    cy.contains('Feed the cat').should('exist')

    cy.contains('Active').click()
    // assert active
    cy.get('.todo-list li')
      .should('have.length', 2)
    cy.contains('Pay electric bill').should('exist')
    cy.contains('Walk the dog').should('not.exist')
    cy.contains('Feed the cat').should('exist')


    cy.contains('Completed').click()
    // assert completed
    cy.get('.todo-list li')
      .should('have.length', 1)
    cy.contains('Pay electric bill').should('not.exist')
    cy.contains('Walk the dog').should('exist')
    cy.contains('Feed the cat').should('not.exist')

    cy.contains('All').click()
    // assert all again
    cy.get('.todo-list li')
      .should('have.length', 3)
    cy.contains('Pay electric bill').should('exist')
    cy.contains('Walk the dog').should('exist')
    cy.contains('Feed the cat').should('exist')
  })

  it('clear completed', () => {
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.contains('Walk the dog')
      .parent()
      .find('input[type=checkbox]')
      .check()

    cy.contains('Clear completed').click()

    // assert
    cy.get('.todo-list li')
      .should('have.length', 2)

    cy.contains('Walk the dog').should('not.exist')
  })

  it('validate clear completed issue is due to duplicating default IDs', () => {
    cy.deleteAll()
    cy.seed()

    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.contains('Walk the dog')
      .parent()
      .find('input[type=checkbox]')
      .check()

    cy.contains('Clear completed').click()

    // assert
    cy.get('.todo-list li')
      .should('have.length', 2)

    cy.contains('Walk the dog').should('not.exist')
  })

  it('check all', () => {
    cy.get('[data-test=new-todo]').type(`Feed the cat{enter}`)

    const todoItems = ['Pay electric bill', 'Walk the dog', 'Feed the cat']

    todoItems.forEach(todoItem => {
      cy.contains(todoItem)
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    todoItems.forEach(todoItem => {
      cy.contains(todoItem)
        .parents('li')
        .should('have.class', 'completed')
    })
  })

  it('validate check all issue is due to duplicating default IDs', () => {
    cy.deleteAll()
    cy.seed()

    cy.get('[data-test=new-todo]').type(`Feed the cat{enter}`)

    const todoItems = ['Pay electric bill', 'Walk the dog', 'Feed the cat']

    todoItems.forEach(todoItem => {
      cy.contains(todoItem)
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    todoItems.forEach(todoItem => {
      cy.contains(todoItem)
        .parents('li')
        .should('have.class', 'completed')
    })
  })
})
