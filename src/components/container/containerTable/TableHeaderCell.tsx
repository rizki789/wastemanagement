
import {
  Th,
  Text,
  Image,

} from "@chakra-ui/react"

import { ContainerAmount, WasteType, ContainerCategory, ContainerType } from "@types"
import { containers } from "@assets/data/containerDB";



const TableHeaderCell = ({ id, value, imgSrc,  isDeactivated }: { id: string, value?: string | number, imgSrc?: string, isDeactivated?: boolean }) => {

  // TABLE PROPS
  // IMAGE 
  const imageFit = "contain";
  const boxSize = "44px";
  // WIDTH
  const colMinWidth = "7em";
  const paddingCells = "0.5em";
  // HEIGHT
  const rowMinHeight = "6em";



  return (

    <Th w={imgSrc ? colMinWidth : undefined} minH={rowMinHeight} h={rowMinHeight} isNumeric={imgSrc || value ? true : false } p={imgSrc || value ? paddingCells : undefined}>

      {imgSrc && <Image id={id} width={boxSize} src={imgSrc} alt={id} objectFit={imageFit} />}

        {value !== undefined ? <Text color={isDeactivated? 'lightgrey': 'unset'}>{value}</Text> : null}  

     </Th>


  );
}

      export default TableHeaderCell;