import React from 'react';
import {
  Td,
  Tr,
  Text,

} from "@chakra-ui/react"

import { ContainerAmount, WasteType, ContainerCategory, ContainerType } from "@types"

const TableCellFull = ({value, isHover, textAlign, layerStyle }: { value?: number | string , isHover: boolean, textAlign: "right" | "left", layerStyle?: string | undefined}) => {

  // TABLE PROPS
  // WIDTH
  const paddingCells = "0.5em";
  // HEIGHT
  const disposalHeight = "1.5em";
  

  return (

    <Tr layerStyle={layerStyle} >
    <Td id={"tableCellFull"} colSpan={4} h={disposalHeight} p={paddingCells}>

      <Text fontSize={"sm"} lineHeight={0.5} textAlign={textAlign}>
        {value ? value : " "}
      </Text>

    </Td>
  </Tr>


  );
}

export default TableCellFull;