


describe('Content Test for Desktop and Mobile', () => {

  beforeEach(() => {

    cy.viewport('iphone-6')
    cy.visit("/");
    cy.get('#startpage_confirm').click();
    cy.get('#deamndInput_NumberInput\\ ').type('2');//write value 2

  });


  // check results of calculation 
  it('Stage 1 | test if exists: demand: 2 = Wertstoffe: 1 x 240 l && 120', () => {

    cy.get('#\\32 _RAD\\:wertstoffe')
      .click()
      .findByText('1 x 240 l')
      .should("exist"); //click on a call in the table

    cy.findByText('120')
      .should("exist");
  })

  // check if url correct for demand
  it('Stage 1 | demand: 2 = url contains "sppC=2" ', () => {

    cy.url().should("include", "sppC=2");

  })

  // check if url is correct for random questions
  it('Stage 2 | questions query = url contains "sppQ=201101110000022222222" && 8 Service Questions', () => {

    cy.get('#continue_button_stage1').click();

    cy.get('#button-C01_Q001-approve > svg').click();
    cy.get('#button-C01_Q002-approve').click();
    cy.get('#button-C01-Q004-approve').click();
    cy.get('#button-C01-Q005-approve').click();
    cy.get('#button-C02-Q001-approve').click();
    cy.get('#button-C03-Q001-deny').click();
    cy.get('#button-C03-Q002-deny > svg').click();
    cy.get('#button-C03-Q003-deny > svg > path').click();
    cy.get('#button-C03-Q004-deny > svg').click();
    cy.get('#button-C03-Q005-deny > svg').click();
    cy.get('#button-C03-Q006-deny > svg').click();
    cy.get('#button-C03-Q007-deny > svg').click();
    cy.get('#button-C03-Q008-deny').click();


    cy.url().should("include", "sppQ=201101110000022222222");

    cy.get('#service_count_text').should("exist");
   
    cy.get('#service_count_text').should(
      "have.text",
      "8 Fragen benötigen weitere Klärung im Kontakt mit unserem Service-Team."
    );
  })


  // check if table content is correct after unterflur container change
  it('Stage 1 | writes demand 70 + check if #image_2rad changes to #image_ufc after UFC approval', () => {
    cy.get('#deamndInput_NumberInput\\ ').type('70'); //write value 70

    cy.get('#image_2rad').should("exist");
    cy.get('#button-F_C01_Q000-approve > svg').click();
    cy.get('#image_ufc').should("exist");
  })


  // check if table content is correct after 3% question change
  // it('Stage 1 | writes demand 70 + check if #image_2rad changes to #image_ufc after UFC approval' , () => {
  //   cy.get('#deamndInput_NumberInput\\ ').type('70'); //write value 70

  //   cy.get('#continue_button_stage1').click();

  //   cy.get('#button-C01_Q001-approve').click();
  //   cy.get('#button-C01_Q002-approve > svg').click();

  //   cy.get('#\\32 _RAD\\:bio > .chakra-text').click().should(
  //     "have.text",
  //     "3 x 240 l 1 x 120 l"
  //   );


  //   cy.get('#button-C01_Q002-deny').click();
  //   cy.get('#\\32 _RAD\\:bio > .chakra-text').click().should(
  //     "have.text",
  //     "3 x 240 l 1 x 120 l"
  //   );
  // })

})
