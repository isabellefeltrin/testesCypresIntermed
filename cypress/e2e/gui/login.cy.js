describe('Login', () => { //função que recebe dois argumentos: o primeiro é o nome da suite de testes e o segundo é a função de callback

  it('successfully', () => { // função de callback que define os test cases

    const user = Cypress.env('user_name') // passos a serem executados para que o login seja realizado com sucesso
    const password = Cypress.env('user_password')
    const options = { cacheSession: false } // definindo que não quero que seja feito o cash da sessão

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})
