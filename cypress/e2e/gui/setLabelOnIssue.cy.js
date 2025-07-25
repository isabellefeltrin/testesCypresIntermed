import { faker } from "@faker-js/faker";

const options = { env: { snapshotOnly: true } }

describe('Labels', () => {
        const issue = {
        title : `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(10),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(10)
        }
        }

        const label ={
            name: `label-${faker.datatype.uuid()}`,
            color: '#ffaabb'
        }
    beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.login()
        cy.api_createIssue(issue) //cria o projeto e a issue
        .then(response => { //pega a resposta da issue para criar a label
            cy.api_createLabel(response.body.project_id,label) // criando a partir de chamada api
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
        })
    })

    it('successfuly', () => {
        cy.gui_setLabelOnIssue(label)
        cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })
})