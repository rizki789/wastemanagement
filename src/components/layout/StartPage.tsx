import {
    Text,
    Box,
    Button,
    Stack,
    HStack,
    Image,
    Heading,
} from "@chakra-ui/react"
import bsr_mustermuellplatz from "@assets/img/bsr_mustermuellplatz.jpg"
import { themeColors } from "@components/utils/GlobalTheme"
import { NavigationView } from "@types"
import useStagesStore from '@hooks/useStagesStore';
import ReactMarkdown from "react-markdown"
import MDXComponents from "@components/utils/MDXComponents"

import text from "@assets/data/textDB"

const StartPage = () => {

    const setStage = useStagesStore(state => state.setStage);
    const setView = useStagesStore(state => state.setView);


    return (<>

        <Stack layerStyle={"frame"} id="LayoutStartPage" direction={{ base: "column", lg: "row" }} spacing={0} w="full" h="full" overflow={"hidden"}>

            <Box layerStyle={"frame"}>

                <Box layerStyle={{ base: "unset" , md: "frame", lg: "frame" }} color={themeColors.highlight.darker}>

                    <Heading size="xl">
                        {text.welcomeBar.name[0]}
                   
                    <Heading id="text_welcomeBar_name" size="2xl">
                        {text.welcomeBar.name[1]}
                    </Heading>

                        {text.welcomeBar.name[2]}
                    </Heading>

                </Box>

                <HStack layerStyle={"frame"}>


                    <Box p={{ base: 0, lg: 10 }} w={{ base: "100%", lg: "70%" }}>

                        <Text id="text_welcomeBar_features" variant={"p"} color={themeColors.signs.dark}>

                            {text.welcomeBar.features.map((t) => {
                                return (
                                    <ReactMarkdown components={MDXComponents}>
                                        {t}
                                    </ReactMarkdown>)
                            })}

                        </Text>

                        <Box layerStyle={"frame"}>
                            <Button id="startpage_confirm"variant="strong" onClick={() => { setStage(1); setView("container") }} >
                                {text.welcomeBar.continue}
                            </Button>
                        </Box>

                        <Text variant={"p"} color={themeColors.signs.dark}>

                            {text.welcomeBar.salvatorius.map((t) => {
                                return (
                                    <ReactMarkdown components={MDXComponents}>
                                        {t}
                                    </ReactMarkdown>)
                            })}

                        </Text>
                    </Box>

                    <Box w={{ base: "0%", lg: "30%" }}></Box>

                </HStack>

            </Box>
            <Box layerStyle={"frame"}>
                <Image id="mustermuellplatz" src={bsr_mustermuellplatz} ></Image>

            </Box>
        </Stack>

        {/* <Box>
            <Text>

            </Text>
        </Box> */}



    </>);



}

export default StartPage;