import { useState, useEffect } from 'react';

import behaelter_4rad_multi from '@assets/img/behaelter_4rad_multi.png';
import behaelter_2rad_multi from '@assets/img/behaelter_2rad_multi.png';
import getFormattedFigure from "@hooks/getFormattedFigure";
import { containers } from "@assets/data/containerDB";
import { getWasteImages } from "@hooks/getWasteImages";
import { client } from "@styles/ClientStyle"
import TableCell from "@components/container/containerTable/TableCell"
import TableCellFull from "@components/container/containerTable/TableCellFull"
import TableCellImg from "@components/container/containerTable/TableCellImg"
import TableHeaderCell from "@components/container/containerTable/TableHeaderCell"
import text from "@assets/data/textDB";
import useQuestionStore from '@hooks/useQuestionStore';
import useDemandStore from '@hooks/useDemandStore';

import { useTheme } from "@chakra-ui/react"
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image
} from "@chakra-ui/react"

import { getEmptyingPrice , getTransportPrice , getBasicPrice , getProvisionPrice } from '@helpers/costHelper';

import { WasteType, DisposalType, ContainerAmountPerWaste } from "@types"
import React from 'react';

const images = getWasteImages(client);

// TABLE PROPS
// IMAGE 
const imagesColWidth = "3em";
const imageFit = "contain";
const boxSize = "44px";
// WIDTH
const colMinWidth = "7em";
const paddingCells = "0.5em";
// HEIGHT
const rowMinHeight = "4em";
const disposalHeight = "1.5em";
const textLineHeight = 1;
// TEXT
const textAlign = "right";


// const TableEntry = ({normal: string, detail:string, showDetail}:{showDetail: boolean})=>{

// }

const CostTable = ({ containerData, showUnterflur }: { containerData?: ContainerAmountPerWaste, showUnterflur?: boolean }) => {


  const list = useQuestionStore(state => state.store);
  const apartments = useDemandStore(state => state.apartmentCount);
  const { border } = useTheme()

  containerData && (Object.keys(containerData) as (keyof ContainerAmountPerWaste)[]).forEach((k, i) => {
    
    console.log("COST ~ list[\"T01\"].value", list["T01"].value ," - ", list["T02"].value);
    

    if (containerData[k]) {
      // containerData[k]!.emptyingPrice = 20 + i;
      containerData[k]!.emptyingPrice = getEmptyingPrice(containerData[k]!);
      // containerData[k]!.transportPrice = 10 + i;
      containerData[k]!.transportPrice = getTransportPrice(list, containerData[k]!);
      // containerData[k]!.ufsProvisionPrice = 45 + i;
      containerData[k]!.ufsProvisionPrice = getProvisionPrice(containerData[k]!);
    }
  })




  console.log("CONTAINER:", containerData)

  const baseCost = getBasicPrice(apartments ?? 0);
  

  // TODO: vier rad container filtern

  const [showDetails, setShowDetails] = useState<string>("hm")
  const [sum, setSum] = useState<number>(0)


  const handleMouseHover = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, newType: string) => {
    setShowDetails(newType);
  }

  const addCosts = (cost1: number | undefined, cost2: number | undefined) => {
    let num1 = 0
    let num2 = 0
    if (cost1 !== undefined) { num1 = cost1 }
    if (cost2 !== undefined) { num2 = cost2 }

    return num1 + num2
  }

  const getSum = () => {

    let sum = 0
    sum += baseCost;

    if (containerData) {
      if(showUnterflur){
        Object.keys(containerData).map((key) => {
          sum = sum + addCosts( containerData[key as WasteType]?.ufsProvisionPrice, containerData[key as WasteType]?.emptyingPrice)
        })
      }
      else{
        Object.keys(containerData).map((key) => {
          sum = sum + addCosts(list["C00"].approval ? containerData[key as WasteType]?.transportPrice : 0, containerData[key as WasteType]?.emptyingPrice)
        })

      }
     
    }
    return sum
  }

  // const test = getSum();


  useEffect(() => {
    setSum(getSum())
  }, [list, apartments])

  return (

    <Table variant="unstyled">

      <Thead>
        <Tr h={"42px"}>
          <TableHeaderCell id={"emptyHeaderCell"} />
          {showUnterflur === true ?
            <>
              <TableHeaderCell id={"costs_empty"} value={"Entsorgungs Gebühren"} />
              <TableHeaderCell id={"costs_provision"} value={"Gestaltungs Gebühren"} />
            </>
            :
            <>
              <TableHeaderCell id={"costs_empty"} value={"Entsorgungs Gebühren"} />
              <TableHeaderCell isDeactivated={!list["C00"].approval} id={"costs_trans"} value={"Transport Gebühren"} />
            </>
          }
          <TableHeaderCell id={"sum"} value={"Summe pro Monat"} />
        </Tr>
      </Thead>


      <Tbody>
        {containerData ? Object.keys(containerData).map((key, i ) => {

          return (

            <React.Fragment key={key}>

              <TableCellFull
                value={containerData[key as WasteType]?.title}
                isHover={showDetails === `${[key as WasteType]}`}
                textAlign={"left"} 
                layerStyle={i % 2 == 0? 'grayField' : showDetails === `${[key as WasteType]}` ? "colorField" : undefined}/>

              <Tr key={key} onMouseEnter={(e) => { handleMouseHover(e, `${[key as WasteType]}`) }} onMouseLeave={(e) => { handleMouseHover(e, "") }} layerStyle={i % 2 == 0? 'grayField' : showDetails === `${[key as WasteType]}` ? "colorField" : undefined}>

                {/* IMAGE */}
                <TableCellImg src={images !== undefined ? images[key as WasteType] : ""} />

                {showUnterflur === true ?
                  /* UNTERFLUR */
                  <>
                    {containerData[key as WasteType] !== undefined ?
                      <TableCell
                        containerCat={"unterflur"}
                        value={getFormattedFigure(containerData[key as WasteType]?.emptyingPrice, undefined, "€", 2)}

                        isHover={false} />
                      : null}
                    {containerData[key as WasteType] !== undefined ?
                      <TableCell
                        containerCat={"unterflur"}
                        value={getFormattedFigure(containerData[key as WasteType]?.ufsProvisionPrice, undefined, "€", 2)}

                        isHover={false} />
                      : null}
                  </>
                  :
                  <>
                    {/* Ensorgungsgebueren */}
                    {containerData[key as WasteType] !== undefined ?
                      <TableCell
                        containerCat={"zwei_rad"}
                        value={getFormattedFigure(containerData[key as WasteType]?.emptyingPrice, undefined, "€", 2)}

                        isHover={false} />
                      : null}

                    {/* Summe  pro Monat */}
                    {containerData[key as WasteType] !== undefined ?
                      <TableCell
                        containerCat={"vier_rad"}
                        value={getFormattedFigure(containerData[key as WasteType]?.transportPrice, undefined, "€", 2)}
                        isDeactivated={!list["C00"].approval}
                        isHover={false} />
                      : null}
                  </>
                }

                {/* Summe pro Monat */}

                {containerData[key as WasteType] !== undefined ?
                  <TableCell
                    containerCat={"all"}
                    value={containerData ? getFormattedFigure(addCosts(containerData[key as WasteType]?.emptyingPrice, list["C00"].approval ? containerData[key as WasteType]?.transportPrice : 0), undefined, "€", 2) : ""}
                    isHover={false} />
                  : null}
              </Tr>

              {/* empty line */}
              <TableCellFull
                value={""}
                isHover={false}
                textAlign={"left"} 
                layerStyle={i % 2 == 0? 'grayField' : showDetails === `${[key as WasteType]}` ? "colorField" : undefined}/>


            </React.Fragment>
          )
        }) : null}

        {/* Grundgebuehren */}
        <Tr borderTop={border.divider.borderBottom} borderColor={border.divider.borderColor}>
          <TableCell
            colSpan={3}
            textAlign={"left"}
            value={"Grundgebühr"}
            isHover={false} />

          <TableCell
            colSpan={1}
            textAlign={"right"}
            value={getFormattedFigure(baseCost, undefined, "€", 2)}
            isHover={false} />
        </Tr>

        {/* Summe */}
        <Tr >
          <TableCell
            colSpan={3}
            textAlign={"left"}
            value={"Summe Gesamt"}
            isHover={false} />

          <TableCell
            colSpan={1}
            textAlign={"right"}
            // value={getFormattedFigure(sum, undefined, "€", 3)}
            value={getFormattedFigure(sum, undefined, "€", 2)}
            isHover={false} />
        </Tr>
      </Tbody>


    </Table >

  );
}

export default CostTable;