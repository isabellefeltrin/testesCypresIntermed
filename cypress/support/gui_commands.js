Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => { // definindo o passo a passo para fazer o login e armazenando em uma variável que executa esta função
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {  // definindo uma variável que recebe uma função 
    cy.visit('/')           // visita o home
    cy.location('pathname', { timeout: 1000 }) //verificando se estou na url certa
      .should('not.eq', '/users/sign_in')
  }
  const options = {
    cacheAcrossSpecs: true, //compartilhar o cache pelas specs
    validate, // passando a função de validação acima
  }
  if (cacheSession) { // falando que quero gravar o cache da sessão
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('logout', () => {
 cy.get('.qa-user-avatar').click()
 cy.contains('Sign out').click()

})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new') //visitar a página de criação de projeto

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})