
import {useEffect, useState} from "react"
import useQuestionStore from '@hooks/useQuestionStore';
import { useTheme } from "@chakra-ui/react"
import { clientProps } from "@styles/ClientStyle"
import {
    Box,
    Image,
    Text,
    ButtonGroup,
    Button,
    IconButton,
    HStack,
    Spacer,
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
import useDemandStore from '@hooks/useDemandStore';

const H1 = (props: any) => <h1 style={{ color: 'tomato' }} {...props} />

const QuestionListItem = ({ q }: { q: Question }) => {

    const {themeColors, buttons} = useTheme()
    const setQuestion = useQuestionStore(state => state.setQuestion);
    const list = useQuestionStore(state => state.store);
    const demand = useDemandStore(state => state.apartmentCount);
   const [show, setShow] = useState<boolean>(true)
    // const setServCount = (t: string, q: Question) => {
    //     if (t == "Approve" && q.service == true) { setServiceCount(q.uid, false) }
    //     else if (t == "Deny" && q.service == true) { setServiceCount(q.uid, true) }
    // }

    useEffect(()=>{
        // // check if question is dependent on demand input
        // // and if the current value is within range of questions necessary demand range
        if(demand && (q.demandRange && 
                     (q.demandRange[0] > demand || 
                     q.demandRange[1] < demand))){
                        console.log(demand, q.demandRange)
                        if(show === true){
                            setShow(false)
                        }
                        // if question has default value, set it back to default on hide
                        if(q.checked !== undefined){
                            setQuestion(q.uid, 
                                q.service, 
                                q.checked, 
                                q.checked ? q.affirm.denyContainer : q.deny.denyContainer, 
                                q.serviceText)
                        }
                     }
        else{
            if(show === false){
                setShow(true)
            }
        }
    },[demand, show])
    
    const isApproval = (q: Question) => {
        return list[q.uid]?.approval
    }
   
    // if (d && oneQue.service == true && list[oneQue.uid]?.approval == false){increaseServiceCount()}

    return (

    <>
        {show && 
            <HStack id={`${q.uid}`} layerStyle={["halfFrame", "divider"]}>
               
                <Text fontSize={"sm"}>
                 
                    <ReactMarkdown components={MDXComponents}>
                        {q.text}
                    </ReactMarkdown>

                </Text>
                <Spacer />
                <ButtonGroup id={`button-${q.uid}`} size="sm" isAttached variant="baseStyle" >
                    <IconButton id={`button-${q.uid}-approve`} aria-label="Approve"  variant={isApproval(q) === true ? "baseStyle" : "ghost" } onClick={() => { 
                        setQuestion(q.uid, q.service, true, q.affirm.denyContainer, q.serviceText) }} icon={<IoCheckmarkSharp color={isApproval(q) ? "white" : undefined} />}  />
                    <IconButton  id={`button-${q.uid}-deny`} aria-label="Deny"  variant={isApproval(q) === false ? "baseStyle" : "ghost" } onClick={() => { 
                        setQuestion(q.uid, q.service, false, q.deny.denyContainer, q.serviceText) }} icon={<IoCloseSharp color={isApproval(q) === false ? "white" : undefined} />}  />
                </ButtonGroup>

            </HStack>
            }
        </>
    );
}

export default QuestionListItem;