


describe('Navigation for Desktop Stage 2 to 3 Test', () => {

  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit("/");
    cy.get('#startpage_confirm').click();
    cy.get('#deamndInput_NumberInput\\ ').clear();
    cy.get('#deamndInput_NumberInput\\ ').type('70');
    cy.get('#continue_button_stage1').click();

  });

  it('Stage 2 | checks service info text', () => {
    cy.get('#button-C01_Q001-approve').click();
    cy.get('#button-C01_Q002-deny > svg > path').click();
    cy.get('#service_count_text').should("exist")
    cy.get('#button-C01_Q003-deny > svg > path').click();
    cy.get('#sevice_info_text').should("exist")
  
  })

  
  it('Stage 2 | chooses all 19 existing questions + navigates to 3D View', () => {

    cy.get('#button-C01_Q001-approve').click();
    cy.get('#button-C01_Q002-deny > svg').click();
    cy.get('#button-C01_Q003-deny > svg').click();
    cy.get('#button-C01-Q004-approve > svg').click();
    cy.get('#button-C01-Q005-approve').click();
    cy.get('#button-C02-Q001-deny > svg').click();
    cy.get('#button-C02-Q002-approve > svg').click();
    cy.get('#button-C02-Q003-approve > svg').click();
    cy.get('#button-C02-Q004-approve').click();
    cy.get('#button-C02-Q005-approve > svg').click();
    cy.get('#button-C02-Q006-approve > svg').click();
    cy.get('#button-C03-Q001-deny').click();
    cy.get('#button-C03-Q002-deny').click();
    cy.get('#button-C03-Q003-deny').click();
    cy.get('#button-C03-Q004-approve > svg').click();
    cy.get('#button-C03-Q005-approve > svg').click();
    cy.get('#button-C03-Q006-approve > svg').click();
    cy.get('#button-C03-Q007-approve').click();
    cy.get('#button-C03-Q008-approve').click();

    cy.get('#continue_button_stage2').click();
    
  })

   it('Stage 3 | open Stage 3 from URL + tests 3D View', () => {

    cy.visit("/?sppC=70&sppQ=201101110000022111111&sppS=3&sppV=0.1"); // go to the Stage 3 with url
    
    //  cy.get('#button-C01_Q001-approve').click();
    //  cy.get('#button-C01_Q002-approve').click();
    //  cy.get('#button-C01-Q004-approve > svg').click();
    //  cy.get('#button-C01-Q005-approve > svg').click();
    //  cy.get('#button-C02-Q001-approve').click();
    //  cy.get('#button-C03-Q001-deny > svg').click();
    //  cy.get('#button-C03-Q002-deny').click();
    //  cy.get('#button-C03-Q003-approve').click();
    //  cy.get('#button-C03-Q004-approve > svg').click();
    //  cy.get('#button-C03-Q005-approve > svg').click();
    //  cy.get('#button-C03-Q006-approve').click();
    //  cy.get('#button-C03-Q007-approve').click();
    //  cy.get('#button-C03-Q008-approve').click();
    //  cy.get('#continue_button_stage2').click();

     cy.get('#turn_left > svg').click();
     cy.get('#turn_left > svg').click();
     cy.get('#turn_left > svg').click();
     cy.get('#turn_up > svg').click();
     cy.get('#turn_right > svg').click();
     cy.get('#show_measurements > svg > path').click();
     
   })



})
