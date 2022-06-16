import { useState } from 'react';
import { useEffect } from 'react';
import QuestionListSection from '@components/questions/QuestionListSection';
import { Stack, HStack, Spacer, VStack, Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import useQuestionStore from '@hooks/useQuestionStore';
import questionDB from '@assets/data/questionsDB';
import { NavigationView, QuestionCategoryType } from "@types"
import { themeColors } from "@components/utils/GlobalTheme"
import useStagesStore from '@hooks/useStagesStore';





export interface ContainerBarProps {

}

const QuestionBar = ({ isMobile, onOpen, questionCategoryId, isAllChecked }: { isMobile: boolean, onOpen: () => void, questionCategoryId: QuestionCategoryType, isAllChecked: boolean }) => {


    const setDisplayRequired = useQuestionStore(state => state.setDisplayRequired);
    const getServiceCount = useQuestionStore(state => state.getServiceCount);
    const getServiceText = useQuestionStore(state => state.getServiceText);
    const stage = useStagesStore(state => state.stage);
    const setStage = useStagesStore(state => state.setStage);

    

    const serviceCount = getServiceCount(questionCategoryId);
    const serviceText = getServiceText(questionCategoryId);



    return (

        <VStack id="QuestionBar" spacing={3} h="full" w="full" layerStyle={["frameLeft", "frameRight"]}>



            <Box w="full" h="full" overflow={"auto"} paddingBottom={{ base: "10rem", lg: "3rem" }}>
                <QuestionListSection id={questionCategoryId}/>
            </Box>

            <Box w="full" layerStyle={"halfFrame"} pos={isMobile ? "sticky" : "unset"} bottom={isMobile ? 14 : 10} bg={isMobile ? "white" : "unset"}>
                {
                    serviceText.map((s: string) => {
                        return <Text id="sevice_info_text"> {s}</Text>
                    })
                }
                {serviceCount > 0 && <Text id="service_count_text" >{serviceCount} Fragen benötigen weitere Klärung im Kontakt mit unserem Service-Team.</Text>}

                <Box id="buttonsFrame" layerStyle={["frameTop", "frameBottom"]}>

                    {(stage < 3) &&
                        <Button id="continue_button_stage2" isDisabled={!isAllChecked} w="full" variant={isAllChecked ? "strong" : "baseStyle"} onClick={() => { setStage(3); setDisplayRequired(false) }}>Weiter</Button>}

                    {!isMobile && (stage === 3) &&
                        <Button id="confirm_button_stage3" isDisabled={!isAllChecked} w="full" variant={"strong"} onClick={onOpen}>Bestätigen</Button>}
                </Box>



            </Box>



        </VStack>
    );
}

export default QuestionBar;




