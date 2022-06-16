import { useEffect } from 'react';
import questionDB from '@assets/data/questionsDB';
import QuestionListItem from '@components/questions/QuestionListItem';
import QuestionListInput from '@components/questions/QuestionListInput';
import QuestionListHeader from '@components/questions/QuestionListHeader';
import useQuestionStore from '@hooks/useQuestionStore';
import { Question, QuestionCategoryType } from "@types"

import {
    Box,
} from "@chakra-ui/react"

const QuestionListSection = ({ id, hideCategory }: { id?: QuestionCategoryType, hideCategory?: boolean}) => {


    const refreshQuestionStore = useQuestionStore(state => state.store);
    const getActiveQuestions = useQuestionStore(state => state.getActiveQuestions);
   
    return (

        <>
            {getActiveQuestions(id).map((category) => {

                return (

                    <Box id={"one_category"} key={category.category}>

                        {category && !hideCategory && <QuestionListHeader cat={category.category} />}

                        {category?.questions?.map((question) => {


                            return (
                                <>
                                    {question.input ? <QuestionListInput key={question.uid} q={question}/> : <QuestionListItem key={question.uid} q={question} />}
                                </>
                            )


                        })}

                    </Box>)

            })}

        </>

    );
}

export default QuestionListSection;