import ContainerTable from '@components/container/ContainerTable';
import CostTable from '@components/container/CostTable';
import Hint from '@components/container/Hint';
import { VStack, Box, Button, TabList, Tab, Tabs, TabPanel, TabPanels } from "@chakra-ui/react"
import { useRef } from 'react';
import text from "@assets/data/textDB";
import DemandInput from '@components/container/DemandInput';
import QuestionListSection from '@components/questions/QuestionListSection';
import { useContainerDataUpdate } from '@hooks/useContainerDataUpdate'
import useDemandStore from '@hooks/useDemandStore'
import { NavigationView } from "@types"
import useStagesStore from '@hooks/useStagesStore';
import useQuestionStore from '@hooks/useQuestionStore';
import { containers, categories } from "@assets/data/containerDB";
import { ContainerAmountPerWaste } from "@types";
import QuestionListItem from '@components/questions/QuestionListItem';
import { useTheme } from "@chakra-ui/react";

export interface ContainerBarProps {

}

const ContainerBar = ({ isMobile, onOpen }: { isMobile: boolean, onOpen: () => void }) => {

    const {tabs} = useTheme()
    const getDeniedContainers = useQuestionStore(state => state.getDeniedContainers);

    // TODO: Better check for unterflur
    const isContainer = getDeniedContainers().includes(categories.unterflur[0])

    const setStage = useStagesStore(state => state.setStage);
    const setView = useStagesStore(state => state.setView);
    const stage = useStagesStore(state => state.stage);

    const containerData = useContainerDataUpdate();
    
    

    const demand = useDemandStore(state => state.apartmentCount);
    return (

        <VStack id="containerBar" spacing={3} h="full" w="full">

            {isMobile == false ? <Box w="full" layerStyle={"halfFrame"} pos="sticky" top="0" bg={"white"}>
                <DemandInput />
            </Box> : null}

            <Box w="full" layerStyle={["frameLeft", "frameRight"]}>

                {/* Unterflur */}
                <QuestionListSection id={"filter"} hideCategory={true} />

            </Box>

            <Box w="full" h="full" overflow={"auto"} layerStyle={["frameLeft", "frameRight"]} paddingBottom={"10rem"}>

                <Tabs variant={tabs.variant}>
                    <TabList>
                        <Tab id={"tab_container"} _focus={{ boxShadow: "none", }} _selected={{borderColor: tabs.color}}>Behälter</Tab>
                        <Tab id={"tab_costs"} _focus={{ boxShadow: "none", }} _selected={{borderColor: tabs.color}}>Gebühren</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel layerStyle={"halfFrame"}>
                            <ContainerTable containerData={containerData} showUnterflur={!isContainer} />
                        </TabPanel>
                        <TabPanel layerStyle={"halfFrame"}>
                            {isContainer? <Box marginLeft={"-1em"} marginRight={"-1em"} paddingBottom={"2em"}> <QuestionListSection id={"costs"} hideCategory/></Box>:null}
                            <CostTable containerData={containerData} showUnterflur={!isContainer} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>

            <Box id="containerSticky" w="full" layerStyle={["halfFrame"]} pos={isMobile ? "sticky" : "unset"} bottom={isMobile ? 14 : 10} bg={isMobile ? "white" : "unset"}>




                <Box id="buttonsFrame" layerStyle={["frameTop", "frameBottom"]}>
                    {demand !== undefined && demand > 0 ? <Box id="glass_hint"><Hint title={text.annotations.glas.hint} info={text.annotations.glas.annotation} /></Box> : null}

                    {(stage === 1) &&
                        <Box id="buttonsFrame" layerStyle={["frameTop"]}>
                            <Button w="full" id="continue_button_stage1" variant={(demand !== undefined && demand > 0) ? "strong" : "baseStyle"} isDisabled={demand === undefined || demand === 0} onClick={() => { setStage(2); setView("question") }}>Weiter</Button>
                        </Box>}
                </Box>
            </Box>

        </VStack>

    );
}

export default ContainerBar;