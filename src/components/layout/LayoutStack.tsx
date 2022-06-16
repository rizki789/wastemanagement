import { useState, useEffect } from 'react';
import { Stack, HStack, Box, useDisclosure, Spacer, Flex, Button } from "@chakra-ui/react"
import ContainerBar from '@components/container/ContainerBar';
import QuestionBar from '@components/questions/QuestionBar';
import View3DBar from '@components/3d/View3DBar'
import MobileNavigation from '@components/layout/MobileNavigation'
import { useBreakpointValue } from "@chakra-ui/react"
import { ViewType, NavigationView } from "@types"
import ReactRouter from "@components/utils/ReactRouter"
import DemandInput from '@components/container/DemandInput';
import useDemandStore from '@hooks/useDemandStore'
import PdfModal from '@components/pdf/Modal'
import StartPage from '@components/layout/StartPage';
import useStagesStore from '@hooks/useStagesStore';
import useQuestionStore from '@hooks/useQuestionStore';
import { categories } from "@assets/data/containerDB";
import {themeBorder} from "@components/utils/GlobalTheme"




const LayoutStack = () => {

    const isMobile: boolean = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false }) ?? true;
    const refreshQuestionStore = useQuestionStore(state => state.store);


    // console.log("denied categories", deniedCategories)
    // TODO: vier rad container filtern
    const { isOpen, onOpen, onClose } = useDisclosure()

    const stage = useStagesStore(state => state.stage);
    const view = useStagesStore(state => state.view);
    // TODO: Better check for unterflur
    const getDeniedContainers = useQuestionStore(state => state.getDeniedContainers);
    const isContainer = getDeniedContainers().includes(categories.unterflur[0])
    const questionCategoryId = isContainer ? "container" : "unterflur"
    const getIsAllChecked = useQuestionStore(state => state.getIsAllChecked);
    const isAllChecked = getIsAllChecked(questionCategoryId);

    return (

        <ReactRouter>

            {view === "start" ? <StartPage /> :

                <Stack id="LayoutMobileNavigation" direction={{ base: "column" }} spacing={0} w="full" h="full" overflow={"hidden"}>

                    {isMobile && <Box w="full" layerStyle={"halfFrame"} pos="sticky" top="0" bg={"white"}>
                        <DemandInput />
                    </Box>}

                    <Flex id="LayoutStack" flexDirection={{ base: "column", lg: "row" }} spacing={0} w="full" h="full">

                        <Box flex={"1 2 auto"} />

                        <Box display={(isMobile && view === "container" || !isMobile && stage >= 1) ? "auto" : "none"} w={{ base: "100%", lg: "20%" }} minW={{ base: "100%", lg: "md" }} h="full" border={themeBorder.border}>
                            <ContainerBar onOpen={onOpen} isMobile={isMobile} />
                        </Box>

                        <Box display={((isMobile && view === "question") || (!isMobile && stage >= 2)) ? "auto" : "none"} w={{ base: "100%", lg: "20%" }} minW={{ base: "100%", lg: "sm" }} h="full" borderRight={themeBorder.border}>
                            <QuestionBar isMobile={isMobile} onOpen={onOpen} questionCategoryId={questionCategoryId} isAllChecked={isAllChecked} />
                            <PdfModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                        </Box>

                        <Box display={(isMobile && view === "view3D") || (!isMobile && stage === 3) ? "auto" : "none"} flex={"1 1 auto"} minW={{ base: "100%", lg: 0 }} h="full" borderRight={themeBorder.border}>
                            <View3DBar onOpen={onOpen} isMobile={isMobile} />
                        </Box>

                        <Box flex={"1 2 auto"} />

                    </Flex>


                    {isMobile &&
                        <Box  layerStyle={"halfFrame"} pos="sticky" bottom="0" bg={"white"}>

                            {isMobile && (stage === 3) &&
                                <Box id="buttonsFrame" layerStyle={["frameBottom"]}>
                                    <Button  id="confirm_button_stage3_mobile" isDisabled={!isAllChecked} w="full" variant={"strong"} onClick={onOpen}>Bestätigen</Button>
                                </Box>}

                            <MobileNavigation />
                        </Box>
                    }
                </Stack>
            }

        </ReactRouter >


    );
}

export default LayoutStack;