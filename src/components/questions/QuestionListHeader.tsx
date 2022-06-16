import * as React from 'react';

import {
    Box,
    Image,
    Text
} from "@chakra-ui/react"



const QuestionListHeader = ({ cat }: { cat: string }) => {

    return (

        <Box id={"question_list_header"} layerStyle={["colorField","frame"]}>

            <Text fontSize={"md"} variant={"h4"} >{cat}</Text>
        </Box>

    );
}

export default QuestionListHeader;