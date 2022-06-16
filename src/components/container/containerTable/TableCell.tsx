import React from 'react';
import {
  Td,
  Text,

} from "@chakra-ui/react"

import { ContainerAmount, WasteType, ContainerCategory, ContainerType } from "@types"
import { containers } from "@assets/data/containerDB";



const TableCell = ({containerCat, value, containerDetails, isHover, colSpan, textAlign, isDeactivated }: { containerCat?: ContainerCategory, value: number | string | undefined, containerDetails?: ContainerAmount | undefined, isHover: boolean, imageSrc?:string, colSpan?: number, textAlign?: "left" | "right", isDeactivated?: boolean }) => {

  // TABLE PROPS
  // WIDTH
  const colWidth = "5em";
  const paddingCells = "0.5em";
  // HEIGHT
  const rowMinHeight = "4em";
  const disposalHeight = "1.5em";
  const textLineHeight = 1;

  return (

    <Td id={"tableCell"+containerCat} isNumeric h={rowMinHeight} w={colWidth} minW={colWidth} maxW={colWidth} p={paddingCells} colSpan={colSpan??1}>
      <Text lineHeight={textLineHeight} whiteSpace={"nowrap"} color={isDeactivated? 'lightgrey': 'unset'}>

        {isHover && containerCat?

          containerDetails?.categories[containerCat]?.preciseAmount?.map(x => {
            return (<React.Fragment key={x.container}>
              {
                x.amount > 0
                  ? x.amount + " x " + containers[x.container]!.name
                  : "0"}<br />

            </React.Fragment>)
          })
          :
          value}
      </Text>
    </Td>


  );
}

export default TableCell;