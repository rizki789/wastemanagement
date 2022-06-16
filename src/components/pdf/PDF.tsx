import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Page, View, Text, Document, StyleSheet, usePDF, BlobProvider,PDFDownloadLink } from '@react-pdf/renderer';
import {
 Button
} from "@chakra-ui/react"
import ReactDOM from 'react-dom';
import PDFPage from "@components/pdf/PDFPage"
import useDemandStore from '@hooks/useDemandStore'
import useContainerData from '@hooks/useContainerData'
import useQuestionStore from '@hooks/useQuestionStore'
import pdfHelper from "@helpers/pdfHelper"
import {createSvgToPDFComponent} from "@components/pdf/SvgToPDFComponent"
import {containers, categories} from "@assets/data/containerDB";


// // Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const PDF = ({children}:{children: React.ReactNode}) => {

  const demand = useDemandStore(state => state.apartmentCount);
    const data = useContainerData(state => state.store)
    const layout = useContainerData(state => state.layoutDict)    //vorletzte pdf seite
    const getActiveQuestions = useQuestionStore(state => state.getActiveQuestions);
    const list = useQuestionStore(state => state.store);
    const getUrl = useQuestionStore(state => state.getUrl);
    const [svg, setSvg] = useState<React.ReactNode | undefined>(undefined)
    const getDeniedContainers = useQuestionStore(state => state.getDeniedContainers);

    const isContainer = getDeniedContainers().includes(categories.unterflur[0])

    useEffect(()=>{
      //async code, um modal schneller zu laden - lebt aber wohl immer noch auf dem main thread...
      pdfHelper.makeSvgContainerLayout(layout).then(r => {
        return createSvgToPDFComponent(r, 595, 842)
      }).then(result =>{
          setSvg(result)
        })
    },[]) 
   
  // const [instance, updateInstance] = usePDF({ document: pdf})

//   const pdf = svg ? <PDFPage demand={demand} url={getUrl()} list={list} activeQuestions={getActiveQuestions()} data={data} svg={svg}/> : undefined;

//   console.log(instance)

//    if (instance.loading) {
//     return (<Text>Loading</Text>)
//  }

//   if (instance.error) {
//      return (<Text>Error</Text>)
//   }

   console.log("PDF ACTIVE")
   return <Button aria-label="Download PDF" variant="solid" w={'full'}> 
   {svg ? <PDFDownloadLink document={
            <PDFPage 
              demand={demand as number}
              url={getUrl()} 
              list={list} 
              activeQuestions={getActiveQuestions(isContainer?"container":"unterflur")} 
              data={data} 
              svg={svg}
              />} 
              fileName={"test.pdf"}>
        {({ blob, url, loading, error }) =>
        (loading ? 'PDF wird erstellt' : url ? 'PDF Download' : '...')
          }
      </PDFDownloadLink>
      : '...'

    }
   </Button>
  //  return(pdf && instance.url !== null ? <a href={instance.url} download={"test.pdf"}>
  //   PDF
  //  </a> : <></>)
  
}






