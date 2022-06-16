import { useState } from 'react';

import behaelter_4rad_multi from '@assets/img/behaelter_4rad_multi.png';
import behaelter_2rad_multi from '@assets/img/behaelter_2rad_multi.png';
import getFormattedFigure from "@hooks/getFormattedFigure";
import { containers, emptyings } from "@assets/data/containerDB";
import { getWasteImages } from "@hooks/getWasteImages";
import { client } from "@styles/ClientStyle"
import TableCell from "@components/container/containerTable/TableCell"
import TableCellFull from "@components/container/containerTable/TableCellFull"
import TableCellImg from "@components/container/containerTable/TableCellImg"
import TableHeaderCell from "@components/container/containerTable/TableHeaderCell"
import text from "@assets/data/textDB";

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

const ContainerTable = ({ containerData, isPrice, showUnterflur }: { containerData?: ContainerAmountPerWaste, isPrice?: boolean, showUnterflur?: boolean }) => {


  // TODO: vier rad container filtern

  const [showDetails, setShowDetails] = useState<string>("hm")


  const handleMouseHover = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, newType: string) => {
    setShowDetails(newType);
  }

  // returns the capacity per emptying
  const capacityPerEmptying = (key: WasteType) => {
    if (containerData) {
      return containerData[key as WasteType]?.wasteByApartment;
    }
  }

  // calculates the container capacity per week (preferred by SRH)
  const capacityPerWeek = (key: WasteType) => {
    let result = 0.0;
    if (containerData) {
      if (containerData[key as WasteType]?.categories.all !== undefined) {
        for (let i = 0; i < containerData[key as WasteType]!.categories.all!.containers.length; i++) {
          const containerNow = containerData[key as WasteType]!.categories.all!.containers[i];
          
          let capacityNow = containers[containerNow.container]?.capacity;
          let emptyingNow = emptyings[containerNow.emptyingCycle]?.amountMultiplier;
          if (capacityNow !== undefined && emptyingNow !== undefined) {
            result += capacityNow / emptyingNow;
          }
        }
      }
    }
    return result;
  }

  // const s = {
  //   header: [
  //     { id: "image_ufc", value: "UFS" },
  //     { id: "image_2rad", src: behaelter_2rad_multi },
  //     { id: "...", value: "Liter pro Entleerung" }
  //   ],
  //   row: Object.keys(containerData).map((key) => {
  //     return {
  //       title: containerData[key as WasteType]?.title,
  //       id: key,
  //       cells: [
  //         showUnterflur ? { value: containerData[key as WasteType]?.categories["unterflur"].amount, detail: containerData[key as WasteType] }
  //           : [{ value: containerData[key as WasteType]?.categories["zwei_rad"].amount, detail: containerData[key as WasteType] },
  //           { value: containerData[key as WasteType]?.categories["zwei_rad"].amount, detail: containerData[key as WasteType] }]
  //             { value: getFormattedFigure(containerData[key as WasteType]?.wasteByApartment, undefined, undefined, 3), detail: undefined }
  //       ],
  //       subtitle: text.containerBar.disposals[containerData[key as WasteType]?.disposals as DisposalType]
  //     }
  //   })
  // }


  return (

    <Table variant="unstyled">

      <Thead>
        <Tr h={"42px"}>

          <TableHeaderCell id={"emptyHeaderCell"} />
          {showUnterflur === true ?
            <TableHeaderCell id={"image_ufc"} value={"UFS"} />
            :
            <>
              <TableHeaderCell id={"image_2rad"} imgSrc={behaelter_2rad_multi} />
              <TableHeaderCell id={"image_4rad"} imgSrc={behaelter_4rad_multi} />
            </>
          }
          <TableHeaderCell id={"l_pro_enleerung"} value={"Behältervolumen pro Woche"} />
        </Tr>
      </Thead>


      <Tbody>
        {containerData ? Object.keys(containerData).map((key,i) => {

          return (

            <React.Fragment key={key}>

              <TableCellFull value={containerData[key as WasteType]?.title} isHover={showDetails === `${[key as WasteType]}`} textAlign={"left"} layerStyle={i % 2 == 0? 'grayField' : showDetails === `${[key as WasteType]}` ? "colorField" : undefined} />

              <Tr key={key} onMouseEnter={(e) => { handleMouseHover(e, `${[key as WasteType]}`) }} onMouseLeave={(e) => { handleMouseHover(e, "") }} layerStyle={i % 2 == 0? 'grayField' : showDetails === `${[key as WasteType]}` ? "colorField" : undefined}>

                {/* IMAGE */}
                <TableCellImg src={images !== undefined ? images[key as WasteType] : ""} />

                {showUnterflur === true ?
                  /* UNTERFLUR */

                  containerData[key as WasteType] !== undefined ?
                    <TableCell
                      containerCat={"unterflur"}
                      value={containerData[key as WasteType]?.categories["unterflur"]?.amount}
                      containerDetails={containerData[key as WasteType]}
                      isHover={showDetails === `${[key as WasteType]}`} />
                    : null

                  :
                  <>
                    {/* 2 RAD */}
                    {containerData[key as WasteType] !== undefined ?
                      <TableCell
                        containerCat={"zwei_rad"}
                        value={containerData[key as WasteType]?.categories["zwei_rad"]?.amount}
                        containerDetails={containerData[key as WasteType]}
                        isHover={showDetails === `${[key as WasteType]}`} />
                      : null}

                    {/* 4 RAD */}
                    {containerData[key as WasteType] !== undefined ?
                      <TableCell
                        containerCat={"vier_rad"}
                        value={containerData[key as WasteType]?.categories["vier_rad"]?.amount}
                        containerDetails={containerData[key as WasteType]}
                        isHover={showDetails === `${[key as WasteType]}`} />
                      : null}
                  </>
                }

                {/* Entleerung */}
                {containerData[key as WasteType] !== undefined ?
                  <TableCell
                    containerCat={"all"}
                    // value={containerData ? getFormattedFigure(capacityPerEmptying(key as WasteType), undefined, undefined, 3) : ""}
                    value={containerData ? getFormattedFigure(capacityPerWeek(key as WasteType), undefined, undefined, 2) : ""}
                    isHover={showDetails === `${[key as WasteType]}`} />
                  : null}
              </Tr>

              {/* Entleerung x Wochentlich */}

              <TableCellFull
                value={showDetails === `${[key as WasteType]}` ? text.containerBar.disposals[containerData[key as WasteType]?.disposals as DisposalType] : ""}
                isHover={showDetails === `${[key as WasteType]}`}
                textAlign={"right"} 
                layerStyle={i % 2 == 0? 'grayField' : showDetails === `${[key as WasteType]}` ? "colorField" : undefined}
                />

            </React.Fragment>
          )
        }) : null}

      </Tbody>


    </Table>

  );
}

export default ContainerTable;