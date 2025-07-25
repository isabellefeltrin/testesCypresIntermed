// Este arquivo contém apenas comandos customizados para teste de interface gráfica


Cypress.Commands.add('login', ( // .add: adiciona função customizada
  user = Cypress.env('user_name'),  // busca do cypress.env.json
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
    cy.location('pathname', { timeout: 1000 }) 
      .should('not.eq', '/users/sign_in')//verificando se estou na url certa
  }


  const options = {
    cacheAcrossSpecs: true, //compartilhar o cache pelas specs
    validate, // passando a função de validação acima
  }


  if (cacheSession) { // falando que quero gravar o cache da sessão
    cy.session(user, login, options)

    // se a sessão é invalidada, ele verifica se não estou na página inicial e fala para restaurar; se caso foi derrubado o cache, ele pede para executar novamente o login. 
    // user: chave da sessão (root)
    // login: função executada apenas uma vez, a não ser que o chache seja invalidad
    // options: valida se a sessão é valida
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
  Cypress.env('projectName', project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_acessProject', () => {

            cy.visit('/')
           cy.get('ul.projects-list li span.project-name').eq(0).invoke('text').then((item) => {
                 const Project = item
                 Cypress.env('projectName', Project)
                 cy.then(() => {
            cy.get('ul.projects-list li span.project-name').eq(0).click()
            })
            })

})

Cypress.Commands.add('gui_verifyUrl', (projectName, options = {}) => {
  projectName = Cypress.env('projectName')
  const {block, novo} = options
         let finalUrl = `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${projectName}`
         console.log(finalUrl)
          if (block) {
           finalUrl +=`/${block}`
          }
          if (novo) {
           finalUrl +=`/${novo}`
          }
          cy.url().should('eq',finalUrl)

         cy.contains(projectName).should('be.visible')

})

Cypress.Commands.add('gui_createIssue', issue => {

  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  cy.get('#issue_title').type(issue.title)
  cy.get('#issue_description').type(issue.description)
  cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()// clica no edit
  cy.contains(label.name).click()// encontra o label
  cy.get('body').click()// clicando fora do body

})

Cypress.Commands.add('gui_addMilestoneOnIssue', milestone => {
cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})