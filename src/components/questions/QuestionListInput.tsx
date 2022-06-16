import { useEffect } from 'react';
import useQuestionStore from '@hooks/useQuestionStore';
import { useTheme } from "@chakra-ui/react"

import {
    Box,
    Image,
    Text,
    ButtonGroup,
    Button,
    IconButton,
    HStack,
    Spacer,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"

import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";
import { Question, QuestionCategory } from "@types"
import ReactMarkdown from "react-markdown"

import MDXComponents from "@components/utils/MDXComponents"
// import { generateQLinkAdress, generateQuery } from "@components/utils/ReactRouter"
const H1 = (props: any) => <h1 style={{ color: 'tomato' }} {...props} />

const QuestionListInput = ({ q }: { q: Question }) => {

    const { focus } = useTheme()
    const setQuestion = useQuestionStore(state => state.setQuestion);
    const list = useQuestionStore(state => state.store);



    // load question value from default on start
    useEffect(() => {
        if (q.input?.default !== undefined) { setQuestion(q.uid, q.service, undefined, undefined, q.serviceText, q.input?.default) }
    }, [])


    return (


        <HStack id={`${q.uid}`} layerStyle={["halfFrame", "divider"]}>

            <Text fontSize={"sm"}>

                <ReactMarkdown components={MDXComponents}>
                    {q.text}
                </ReactMarkdown>

            </Text>

            <Spacer />

            <NumberInput
                w={"64px"}
                h={"32px"}
                minW={"64px"}
                size={"sm"}
                borderRadius={2}
                id="questionInput_NumberInput "
                
                layerStyle={["colorField", "borderRadius"]}
                inputMode={"numeric"}
                defaultValue={q.input?.default}
                precision={0}
                step={1}
                min={q.input?.min}
                max={q.input?.max}
                value={list[q.uid].value}
                onChange={((valueAsString: string, valueAsNumber: number) => setQuestion(q.uid, q.service, undefined, undefined, q.serviceText, valueAsNumber && !isNaN(valueAsNumber) ? valueAsNumber : 0))}
            >

                <NumberInputField p={0} paddingLeft={2} borderRadius={"0.4em"}  _focus={focus}/>
                <NumberInputStepper >
                    <NumberIncrementStepper id="questionInput_NumberIncrementStepper" />
                    <NumberDecrementStepper id="questionInput_NumberDecrementStepper" />
                </NumberInputStepper>
            </NumberInput>

            {/* <ButtonGroup id={`button-${q.uid}`} size="sm" isAttached variant="baseStyle" >
                    <IconButton id={`button-${q.uid}-approve`} aria-label="Approve" onClick={() => { 
                        setQuestion(q.uid, q.service, true, q.affirm.denyContainer, q.serviceText) }} icon={<IoCheckmarkSharp color={isApproval(q) ? "white" : undefined} />} bg={isApproval(q) === true ? themeColors.background.highlight : themeColors.background.dark} />
                    <IconButton  id={`button-${q.uid}-deny`} aria-label="Deny" onClick={() => { 
                        setQuestion(q.uid, q.service, false, q.deny.denyContainer, q.serviceText) }} icon={<IoCloseSharp color={isApproval(q) === false ? "white" : undefined} />} bg={isApproval(q) === false ? themeColors.background.highlight : themeColors.background.dark} />
                </ButtonGroup> */}

        </HStack>

    );
}

export default QuestionListInput;