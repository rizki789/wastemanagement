

import{ useRef, useEffect, useMemo, useState} from "react"
import {Canvas, useThree} from "@react-three/fiber"
import * as THREE from "three"

import View3D from "@components/3d/View3D"

export interface ContainerBarProps {

}

type Tooltip = {
    x: number, y: number, text: string
}

const Viewport = ({sideView, topView, showRuler, visHelpers}: {sideView: number, topView: boolean, showRuler: boolean, visHelpers: string[]}) => {

    
    return (
        <Canvas>
            <View3D sideView={sideView} topView={topView} showRuler={showRuler} visHelpers={visHelpers}></View3D>
        </Canvas>

        );
}

export default Viewport;