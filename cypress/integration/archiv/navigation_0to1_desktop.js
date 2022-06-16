


describe('Navigation for Desktop Test', () => {


  it('Stage 0 |  tests elements of the StartPage + navigates to Stage 1 Questions', () => {
    cy.viewport('macbook-16')
    cy.visit("/");
    // check of start page elements
    cy.get("#startpage_confirm").should("exist")
    cy.get('#text_welcomeBar_name').should("exist")
    cy.get('#text_welcomeBar_features > :nth-child(1)').should("exist")
    cy.get('#mustermuellplatz').should("exist")

    cy.get('#startpage_confirm').click();
  })

  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit("/");
    cy.get('#startpage_confirm').click();
  });


  it('Stage 1 | changes demand input with buttons + clicks on glass hint popover', () => {

    cy.get('#deamndInput_NumberInput\\ ').should('have.focus')

    cy.get('#deamndInput_NumberIncrementStepper > .chakra-icon').click();
    cy.get('#deamndInput_NumberIncrementStepper > .chakra-icon').click();
    cy.get('#deamndInput_NumberDecrementStepper > .chakra-icon > path').click();

    // chek if table cells exists
    cy.get('#\\32 _RAD\\:hm').click();
    cy.get('#\\32 _RAD\\:wertstoffe').click();

    // click in popover
    cy.get('#popover-trigger-11').click();
    cy.get('#popover-body-11 > .chakra-text > :nth-child(1)').click();
    cy.get('#popover-trigger-11').click();

  })

  it('Stage 1 | writes 70 in demand input + checks if Untercontainer question shows + navigates to questions', () => {
   
    cy.get('#deamndInput_NumberInput\\ ').clear();
    cy.get('#deamndInput_NumberInput\\ ').type('70'); //write value 70
    cy.get('#button-F_C01_Q000-approve > svg').should("exist");
    cy.get('#button-F_C01_Q000-approve > svg').click();
    
    //continuee to questions + check if unterflur question exists
     cy.get('#continue_button_stage1').click();
     cy.get('#button-UF_C01_Q001-approve > svg').should("exist");

  })




})
