import { useState, useRef } from "react";
import { ContainerAmountPerWaste } from "@types";
import { IconButton, Box, Tag, HStack, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { IoArrowUpSharp, IoArrowDownSharp, IoChevronBackSharp, IoArrowForwardSharp, IoChevronForwardSharp, IoChevronDownSharp, IoChevronUpSharp, IoChevronForwardOutline, IoContrastOutline } from "react-icons/io5";
import { BiRuler } from "react-icons/bi";
import { AiOutlineLayout } from "react-icons/ai";
import { Canvas } from "@react-three/fiber";
import useStagesStore from '@hooks/useStagesStore';
import Viewport from "@components/3d/Viewport";
import { Tooltip } from "@components/3d/Rulers";
import useQuestionStore from '@hooks/useQuestionStore';
import useContainerData from '@hooks/useContainerData';

export interface ContainerBarProps {

}

const View3DBar = ({ isMobile, onOpen }: { isMobile: boolean, onOpen: () => void }) => {
  const [sideView, setSideView] = useState(0.5); // holds the viewing direction of the camera (SE = 0 is start / NE = 1 / NW = 2 / SW = 3)
  const [topView, setTopView] = useState(false);
  const [showRuler, setShowRuler] = useState(false);// defines if Ruler is shown and updated

  const isAllChecked = useQuestionStore(state => state.getIsAllChecked);
  const setCriteria = useContainerData(state => state.setCriteria)
  const layoutCriteria = useContainerData(state => state.layoutCriteria)
  const stage = useStagesStore(state => state.stage);

  const rotateLeft = () => {
    setSideView(sideView - 1);
    // setSideView((sideView - 1) < 0 ? 4 - sideView : sideView - 1);
    // setSideView((sideView - 1) < -4 ? sideView + 3 : sideView - 1);
    // setSideView((sideView - 1) < -8 ? sideView + 7 : sideView - 1);
  }

  const rotateRight = () => {
    setSideView(sideView + 1);
    // setSideView((sideView + 1) > 4 ? sideView - 4 : sideView + 1);
    // setSideView((sideView + 1) > 4 ? sideView - 3 : sideView + 1);
    // setSideView((sideView + 1) > 8 ? sideView - 7 : sideView + 1);
  }

  return (
    <Box id="view3DBar" w="full" h="full" pos={"relative"}>

      <Box w="full" h="full" id="viewPort">
        <Viewport sideView={sideView} topView={topView} showRuler={showRuler} visHelpers={[]} />
      </Box>

      <Box w="full" id="stickyView3D" layerStyle={["halfFrame"]} pos={"absolute"} bottom={isMobile ? 24 : 0} bg={isMobile ? "transparent" : "unset"}>

        <HStack spacing={2} layerStyle={["frameBottom"]} justify={"flex-end"}>



          <IconButton
            isRound
            id="turn_left"
            aria-label={"Sicht Links"}
            icon={<IoChevronBackSharp />}
            onClick={rotateRight}
            variant={"baseStyle"}

          // position={"absolute"}
          // zIndex={"overlay"}
          // right={"110px"}
          // bottom={"10px"}
          />
          <IconButton
            isRound
            id="turn_up"
            aria-label={topView ? "Sicht von Oben" : "Sicht von Seite"}
            icon={topView ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
            onClick={() => {
              setTopView(!topView);
            }}
            variant={"baseStyle"}
          // position={"absolute"}
          // zIndex={"overlay"}
          // right={"60px"}
          // bottom={"10px"}
          />
          <IconButton
            isRound
            id="turn_right"
            aria-label={"Sicht Rechts"}
            icon={<IoChevronForwardSharp />}
            onClick={rotateLeft}
            variant={"baseStyle"}
          // position={"absolute"}
          // zIndex={"overlay"}
          // right={"10px"}
          // bottom={"10px"}
          />
          <IconButton
            isRound
            id="show_measurements"
            aria-label={"Zeige Bemaßung"}
            icon={<BiRuler />}
            onClick={() => {
              setShowRuler(!showRuler);
            }}
            variant={"baseStyle"}
          // position={"absolute"}
          // zIndex={"overlay"}
          // right={"160px"}
          // bottom={"10px"}
          />
          <IconButton
            isRound
            aria-label={"Next Layout"}
            icon={<AiOutlineLayout />}
            onClick={() => {
              console.log("angle - sideView : ", sideView);
              setCriteria(layoutCriteria === "compact" ? "slim" : "compact") // toggle layoutCriteria
            }}
            variant={"baseStyle"}
          // position={"absolute"}
          // zIndex={"overlay"}
          // right={"160px"}
          // bottom={"10px"}
          />
          <Menu>
            {/*@ts-ignore*/}
            <MenuButton as={IconButton}
              isRound
              icon={<IoContrastOutline />}
              aria-label={"3D Darstellung"}
              onClick={() => {
              }}
              variant={"baseStyle"}
            />

            <MenuList>
              <MenuItem icon={<IoChevronForwardOutline />}>Hecke</MenuItem>
              <MenuItem icon={<IoChevronForwardOutline />}>Zaun</MenuItem>
              <MenuItem icon={<IoChevronForwardOutline />}>Innenraum</MenuItem>

            </MenuList>
          </Menu>



        </HStack>

      </Box>


    </Box>
  );
}

export default View3DBar;