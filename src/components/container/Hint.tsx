import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    Text

} from "@chakra-ui/react"
import { IoInformationCircle } from "react-icons/io5";
import { useRef } from 'react';
import { useTheme } from "@chakra-ui/react"

import text from "@assets/data/textDB"
import ReactMarkdown from "react-markdown"
import MDXComponents from "@components/utils/MDXComponents"



const Hint = ({  title, info, placement, boundaryRef }: {  title:string, info:string[], placement?:string , boundaryRef?: HTMLDivElement | null }) => {

    // boundary={boundaryRef !== null ? boundaryRef : undefined} 
    const {focus} = useTheme()
   
    return (

        <Popover>
            <PopoverTrigger>

                <Button id="hint_button" leftIcon={<IoInformationCircle fontSize={"1.3em"} />} w="full" variant="ghost"> {title}</Button>

            </PopoverTrigger>
             <Portal> 
                <PopoverContent _focus={focus}>
                    <PopoverArrow />
                    <PopoverCloseButton />

                    <PopoverHeader><Text fontSize="md">{text.annotations.glas.hint}</Text></PopoverHeader>
                    <PopoverBody><Text fontSize="sm">

                        {info.map(k => {


                            return (<> {k && <ReactMarkdown components={MDXComponents}>
                                {k}
                            </ReactMarkdown>}</>)

                        })}

                    </Text></PopoverBody>
                </PopoverContent>
             </Portal> 
        </Popover>

    );
}

export default Hint;