
import {
  Td,
  Text,
  Image,

} from "@chakra-ui/react"

import { ContainerAmount, WasteType, ContainerCategory, ContainerType } from "@types"
import { containers } from "@assets/data/containerDB";



const TableCellImg = ({ src }: { src: string }) => {

  // TABLE PROPS
  // IMAGE 
  const imagesColWidth = "4em";
  const imageFit = "contain";
  const boxSize = "44px";
  // WIDTH
  const paddingCells = "0.5em";
  // HEIGHT
  const rowMinHeight = "4em";



  return (

    <Td id={"tableCellImg"} h={rowMinHeight} w={imagesColWidth} p={paddingCells}>
      <Image width={boxSize} src={src} alt={`tableCellImg`} objectFit={imageFit} />
    </Td>


  );
}

export default TableCellImg;