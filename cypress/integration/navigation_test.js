

["iphone-6", "macbook-16"].forEach(v => {


  describe('Navigation for ' + v + ' Test Stage 0 to 1', () => {

    beforeEach(() => {
      cy.viewport(v)
      cy.visit("/");
      cy.get('#startpage_confirm').click();
    });

    // check of start page elements if thez exists
    it('Stage 0 | tests elements of the StartPage + navigates to Stage 1 Questions ' + v, () => {
      cy.viewport(v)
      cy.visit("/");
      cy.get('#text_welcomeBar_name').should("exist")
      cy.get('#text_welcomeBar_features > :nth-child(1)').should("exist")
      cy.get('#mustermuellplatz').should("exist")
    })

    it('Stage 1 | changes demand input with buttons + clicks on glass hint popover + checks disability nav buttons', () => {
      cy.get('#deamndInput_NumberInput\\ ').should('have.focus')

      cy.get('#deamndInput_NumberIncrementStepper > .chakra-icon').click();
      cy.get('#deamndInput_NumberIncrementStepper > .chakra-icon').click();
      cy.get('#deamndInput_NumberDecrementStepper > .chakra-icon > path').click();

      // click in table
      cy.get('#\\32 _RAD\\:hm').click();
      cy.get('#\\32 _RAD\\:wertstoffe').click();

      // click in popover
      cy.get('#popover-trigger-11').click();
      cy.get('#popover-body-11 > .chakra-text > :nth-child(1)').click();
      cy.get('#popover-trigger-11').click();


      // tests quesitons button if disable
      if (v === "iphone-6") {

        cy.get('#mobile_nav_questions').should('be.disabled')
        cy.get('#mobile_nav_3dview').should('be.disabled')
        cy.get('#mobile_nav_container').should('not.be.disabled')
      }

    })

    it('Stage 1 | writes 70 in demand input + checks if Untercontainer question shows + tests disability of buttons', () => {
      cy.get('#deamndInput_NumberInput\\ ').clear();
      cy.get('#deamndInput_NumberInput\\ ').type('70'); //write value 70
      cy.get('#button-F_C01_Q000-approve > svg').should("exist");
      cy.get('#button-F_C01_Q000-approve > svg').click();

      //continuee to questions + check if unterflur question exists
      cy.get('#continue_button_stage1').click();
      cy.get('#button-UF_C01_Q001-approve > svg').should("exist");

    })

    if (v === "iphone-6") {
      it('Stage 1 | tests disability of buttons + navigates to questions', () => {

        cy.get('#deamndInput_NumberInput\\ ').clear();
        cy.get('#deamndInput_NumberInput\\ ').type('70');

        cy.get('#continue_button_stage1').click();

        //test mobile navigation buttons
        cy.get('#mobile_nav_container').click();
        cy.get('#mobile_nav_questions').click();

        //3dviw shoud be disabled
        cy.get('#mobile_nav_3dview').should("exist")
        cy.get('#mobile_nav_3dview').should('be.disabled')

      })
    }


  })


  describe('Navigation for ' + v + ' Test Stage 2 to 3', () => {

    beforeEach(() => {

      cy.viewport(v);

      cy.visit("/?sppC=70&sppQ=200000000000000000000&sppS=2&sppV=0.1"); // goes to the Stage 2 with URL

    });

    if (v === "iphone-6") {
      it('Stage 2 | mobile | checks buttons disability', () => {

        cy.get('#button-C01_Q001-approve').click();
        cy.get('#mobile_nav_container').should('not.be.disabled');
        cy.get('#mobile_nav_questions').should('not.be.disabled');
        cy.get('#mobile_nav_3dview').should('be.disabled');
        cy.get('#continue_button_stage2').should('be.disabled');

      })
    }

    it('Stage 2 | checks service info text', () => {
      cy.get('#button-C01_Q001-approve').click();
      cy.get('#button-C01_Q002-deny > svg > path').click();
      cy.get('#service_count_text').should("exist")
      cy.get('#button-C01_Q003-deny > svg > path').click();
      cy.get('#sevice_info_text').should("exist")
    })

    it('Stage 2 | chooses all 19 existing questions + natigates to 3D View', () => {
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

    if (v === "iphone-6") {
      it('Stage 3 | mobile | checks buttons disability', () => {

        cy.visit("/?sppC=70&sppQ=201101110000022111111&sppS=3&sppV=0.1"); // goes to the Stage 3 with url

        cy.get('#mobile_nav_3dview').should('not.be.disabled');
        cy.get('#confirm_button_stage3_mobile').should('not.be.disabled');
      })
    }

    it('Stage 3 | opens Stage 3 from URL + tests 3D View buttons', () => {

      cy.visit("/?sppC=70&sppQ=201101110000022111111&sppS=3&sppV=0.1"); // goes to the Stage 3 with url

      if (v === "iphone-6") {
        cy.get('#mobile_nav_3dview').click();
      }

      cy.get('#turn_left > svg').click();
      cy.get('#turn_left > svg').click();
      cy.get('#turn_left > svg').click();
      cy.get('#turn_up').click();
      cy.get('#turn_right > svg').click();
      cy.get('#turn_right > svg').click();
      cy.get('#turn_right > svg').click();

    })

  })

})



