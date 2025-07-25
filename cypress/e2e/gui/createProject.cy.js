import {faker} from '@faker-js/faker' // importando o faker para gerar dados aleatórios para consumir nos testes
                                      // utilizado aqui para criar o nome e a descrição do projeto

const options = {env: {snapshotOnly: true}} // possibilita misturar feedbacks visuais de api e gui ao executar os testes. 

describe('Criando projeto', options, () => {
    beforeEach(() => {
        cy.login()    // para estar logado no sistema
    })

    it('Criando projeto via cypress', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`, // o nome do sistema gerado pelo faker
            description: faker.random.words(5) //descrição do sistema gerada pelo faker -> 5 palavras aleatórias
        }

        cy.gui_createProject(project) // chamando comando customizado

        //validação do projeto

        // cy.url().should('be.equal',`${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        // cy.contains(project.name).should('be.visible')
        // cy.contains(project.description).should('be.visible')

        cy.gui_verifyUrl(project.name , project.description)
    })
})