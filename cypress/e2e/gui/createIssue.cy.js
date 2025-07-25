import { faker } from "@faker-js/faker"

const options = {env: {snapshotOnly: true}}

describe('criando uma issue no projeto', options,  () => {

        const issue = {
        title : `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(10),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }
        }

        beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.login()    // para estar logado no sistema
        cy.api_createProject(issue.project)
        //cy.gui_acessProject()
        //cy.gui_verifyUrl()

    })

     it('Criando nova issue em projeto conhecido', () => {
        cy.gui_createIssue(issue)
       // cy.gui_verifyUrl(Cypress.env('projectName'),{block: 'issues'})
       // cy.get('#new_issue_link').click()
      //cy.gui_verifyUrl(Cypress.env('projectName'),{block: 'issues', novo: 'new'})
      cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
        
     })
})