import { useEffect, ReactNode } from 'react';
import { QuestionStore } from '@hooks/useQuestionStore';
import { Question, QuestionCategory } from "@types"
import useQuestionStore from '@hooks/useQuestionStore';
import useDemandStore from '@hooks/useDemandStore';
import useStagesStore from '@hooks/useStagesStore';
import useContainersStore from '@hooks/useContainersDataStore';
import { QueryParamProvider } from 'use-query-params';
import { waste } from "@assets/data/containerDB"
import { WasteType } from "@types"


import {
  useQueryParams,
  StringParam,
  NumberParam,
  NumericObjectParam,
  ArrayParam,
  withDefault,
} from 'use-query-params';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import questionDB from '@assets/data/questionsDB';

export const version = "0.1"
export type xType = { [key: string]: number | undefined }

// GENERTATE QUESTIONS QUERY AS ARRAY OF NUMBERS
// export const generateQuery = (store: QuestionStore) => {

//   let queryArray: number[] = [];

//   Object.keys(store).map((key, CIndex) => {

//     if (store[key]?.approval == true) { queryArray.push(1) }
//     else if (store[key]?.approval == false) { queryArray.push(2) }
//     else if (store[key]?.approval == undefined) { queryArray.push(0) }

//   })

//   return queryArray
// }


// Generate questions an their values object
export const generateXQuery = (store: QuestionStore) => {

  let xQuery: xType = {};

  Object.keys(store).map((key, CIndex) => {

    if (store[key]?.value !== undefined) { xQuery[key] = store[key]?.value! }
    else if (store[key]?.approval == true) { xQuery[key] = 1 }
    else if (store[key]?.approval == false) { xQuery[key] = 2 }
    else if (store[key]?.approval == undefined) { xQuery[key] = 0 }

  })

  console.log("GENERATE X QUERY")
  console.log(xQuery)
  return xQuery
}


// CONVERT NUMBERS ARRAY TO STRING FOR URL ADRESS
// export const generateQLinkAdress = (queryArray: number[]) => {
//   return queryArray.join('')
// }

const QueryUpdate = () => {
  const store = useQuestionStore(state => state.store);
  const setQuestion = useQuestionStore(state => state.setQuestion);
  const demand = useDemandStore(state => state.apartmentCount);
  const setApartmentCount = useDemandStore(state => state.setApartmentCount);
  const setUrl = useQuestionStore(state => state.setUrl);
  const stage = useStagesStore(state => state.stage);
  const setStage = useStagesStore(state => state.setStage);
  const setView = useStagesStore(state => state.setView);
  const setDisplayRequired = useQuestionStore(state => state.setDisplayRequired);
  const setEmptyingCycles = useContainersStore(state => state.setEmptyingCycles);
  



  const [query, setQuery] = useQueryParams({
    sppV: StringParam,
    // sppQ: StringParam,
    sppC: NumberParam,
    sppS: NumberParam,
    sppX: NumericObjectParam,

  });

  //ON LOAD ASSIGN QUESTIONS BY URL
  // useEffect(() => {
  //   console.log("FIRST LOAD", query.sppQ)

  // Set questions
  //   let initialQuery = query.sppQ ?? "";
  //   let queryArray = initialQuery.split("");  //query.sppQ.split("").map(x=>{})
  //   console.log("FIRST INITTIAL QUERY", initialQuery)

  //   let queryIndex = 0;
  //   questionDB.map((category) => {

  //     if (category !== undefined) {

  //       category?.questions?.map((question) => {

  //         if (question !== undefined) {

  //           let qState = queryArray[queryIndex] === "1" ? true : queryArray[queryIndex] === "2" ? false : question.checked
  //           let denyContainer = qState ? question.affirm.denyContainer : qState === false ? question.deny.denyContainer : []
  //           setQuestion(question.uid, question.service, qState, denyContainer, question.serviceText)
  //           queryIndex = queryIndex + 1;
  //         }
  //       })
  //     }
  //   })

  //   // Set demand
  //   if (query.sppC) {
  //     setApartmentCount(query.sppC)
  //   }
  //   // Set version
  //   setQuery({ "sppV": version })

  //   // Set stage and view from url
  //   if (query.sppS) {
  //     setStage(query.sppS)
  //     if (query.sppS >= 2) { setView("question") } else { setView("container") }
  //   }
  // }, [])


  //on load set all app properties from URL

  useEffect(() => {
    console.log("FIRST LOAD", query.sppX)

    // Set questions
    let xQuery = query.sppX !== undefined && query.sppX !== null ? query.sppX : {};

    questionDB.map((category) => {

      if (category !== undefined) {

        category?.questions?.map((question) => {

          if (question !== undefined) {

            let qState = xQuery[question.uid] === 1 ? true : xQuery[question.uid] === 2 ? false : question.checked
            let denyContainer = qState ? question.affirm.denyContainer : qState === false ? question.deny.denyContainer : []
            let value = question.input !== undefined && question.input !== null ? xQuery[question.uid] : undefined;
            setQuestion(question.uid, question.service, qState, denyContainer, question.serviceText, value !== null ? value : undefined)

          }
        })
      }
    })

    // Set demand
    if (query.sppC) {
      setApartmentCount(query.sppC)
    }
    // Set version
    setQuery({ "sppV": version })

    // Set stage and view from url
    if (query.sppS) {
      setStage(query.sppS)
      if (query.sppS >= 2) { setView("question"); } else { setView("container") }
      if (query.sppS >= 3) { setDisplayRequired(false) }
    }

    // set waste emptying cycles
    if (waste) {
      Object.keys(waste).map((key, i) => {

        setEmptyingCycles(key as WasteType, waste[key as WasteType]?.defaultEmptyingCycle)
      })
    }

  }, [])




  // UPDATE URL
  useEffect(() => {
    if (store && Object.keys(store).length > 0) {
      // let qLink: string = generateQLinkAdress(generateQuery(store))
      // setQuery({ "sppQ": qLink })
      setQuery({ "sppC": demand })
      setQuery({ "sppS": stage })
      setQuery({ "sppX": generateXQuery(store) })
    }
  }, [store, demand, stage])

  //save url to store
  useEffect(() => {

    if (query.sppV !== null && query.sppX !== null && query.sppC !== null) {
      // setUrl(query.sppV, query.sppX, query.sppC)
    }

  }, [query])



  
  return <></>
}




const ReactRouter = ({ children }: { children: ReactNode }) => {

  // const store = useQuestionStore(state => state.store);
  // const setQuestion = useQuestionStore(state => state.setQuestion);



  


  // const SearchQuestion = ({ match, location }: { match?: any, location?: any }) => {

  //   handleQLink(location?.search)

  //   return (
  //     <>
  //       <h3>SearchQuestion</h3>
  //       <strong>Location Props: </strong>
  //       {JSON.stringify(location, null, 2)}
  //     </>
  //   );
  // }

  //  const handleQLink = (qLink: string) => {

  //   // example of QLink: "?q=1210000000000000000"

  //   let query: string = qLink.replace(/\D/g, '')

  //   let queryArray: number[] = Array.from(String(query), Number);

  //   console.log(queryArray)

  //   Object.keys(store).map((key, qIndex) => {

  //     // if (queryArray[qIndex - 1] == 1) { setQuestion(key, store[key].service = store[key].service, true) }
  //     // else if (queryArray[qIndex - 1] == 2) { setQuestion(key, store[key].service = store[key].service, false) }
  //     // else { setQuestion(key, store[key].service = store[key].service, undefined) }

  //   })


  //   // if(store !== undefined )

  //   // queryArray.map((q, qIn) => {

  //   //   setQuestion( Object.keys(store)[qIn-1]. , question.service, undefined, question.denyContainerCategory, question.serviceText)
  //   // })
  // }

  return (
    <>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <QueryUpdate></QueryUpdate>
          {children}

          {/* <Route exact path="/questions" component={SearchQuestion} /> */}

        </QueryParamProvider>
      </Router>



    </>);
}




export default ReactRouter;