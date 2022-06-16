import { Button, HStack } from "@chakra-ui/react"
import { NavigationView } from "@types"
import { IoTrashOutline, IoCheckmark ,IoCubeOutline } from "react-icons/io5";
import useQuestionStore from '@hooks/useQuestionStore';
import useStagesStore from '@hooks/useStagesStore';


const MobileNavigation = () => {


    const stage = useStagesStore(state => state.stage);
    const setView = useStagesStore(state => state.setView);
    const view = useStagesStore(state => state.view);
  

    return (
        <HStack>
            <Button id="mobile_nav_container" size={"md"} w={"full"} onClick={() => { setView("container")}}  leftIcon={<IoTrashOutline fontSize={"1.3em"}/>} variant={view==="container" ? "strong":"baseStyle"} > 
                Container
            </Button>
            <Button id="mobile_nav_questions" isDisabled={ stage < 2  } size={"md"} w={"full"}  onClick={() => { setView("question")}}   leftIcon={<IoCheckmark fontSize={"1.3em"}/>} variant={view==="question"?"strong":"baseStyle"}>
                Questions
            </Button>
            <Button id="mobile_nav_3dview" isDisabled={stage < 3 } size={"md"} w={"full"}  onClick={() => { setView("view3D") }}  leftIcon={<IoCubeOutline fontSize={"1.3em"}/>} variant={view==="view3D"?"strong":"baseStyle"}>
                3D View
            </Button>
        </HStack>
    );
}

export default MobileNavigation;

