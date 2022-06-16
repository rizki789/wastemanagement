
// export type WasteType = "bio" | "hm" | "ppk" | "wertstoffe" | "glas_bunt" | "glas_weiss";
export type WasteType = "bio" | "hm" | "ppk" | "wertstoffe";
export type ViewType = "container" | "questions" | "modelView";
export type DisposalType = 0.25 | 0.5 | 1 | 2;
export type EmptyingCycleType = "W1X" | "W1/2X" | "W1/4X" // "W1X" = 1xWöchentlich | "W1/2X" = 14Täglich | "W1/4X" = 4-wöchentlich
export type ApartmentType = "1-1.5" | "2-2.5" | "3-5";
export type ContainerType = "L60" | "L120" | "L240" | "L660" | "L1100" | "L2000" | "L3000" | "L4000" | "L5000";
export type WasteContainerType = "L120bio" | "L240bio" | "L660bio" | "L1100bio" | "L2000bio" | "L3000bio" |
  "L120hm" | "L240hm" | "L660hm" | "L1100hm" | "L2000hm" | "L3000hm" | "L4000hm" | "L5000hm" |
  "L240ppk" | "L660ppk" | "L1100ppk" | "L2000ppk" | "L3000ppk" | "L4000ppk" | "L5000ppk" |
  "L240wertstoffe" | "L660wertstoffe" | "L1100wertstoffe" | "L2000wertstoffe" | "L3000wertstoffe" | "L4000wertstoffe" | "L5000wertstoffe";

export type ContainerCategory = "zwei_rad" | "vier_rad" | "unterflur" | "all";
export type StandTag = "Normal" | "UFS" | "MBox";
export type LayoutCriteria = "compact" | "slim";

export type NavigationView = "container" | "question" | "view" | "desktop";
// export type Capacity = number;
export type Capacity = 0 | 60 | 120 | 240 | 660 | 1100;
export type ContainerCapacity = { [key in ContainerType]?: Capacity }

export type ContainerCategoryCapacity = { [key in ContainerCategory]?: {
    containers: Array<emptyingContainer>,
    // containerSizes: Array<Capacity>,
    amount: number,
    preciseAmount?: Array<{
      container: ContainerType,
      // containerSize: Capacity,
      amount: number
    }>,
  }
}



export type ContainerAmount = {
  categories: ContainerCategoryCapacity,
  disposals: number,
  wasteType: WasteType,
  title?: string,
  color?: string,
  wasteByApartment?: number,
  emptyingPrice?: number,
  transportPrice?: number,
  ufsProvisionPrice?: number,
}

export type ContainerAmountPerWaste = {
  [key in WasteType]?: ContainerAmount }

export type emptyingContainer = {
  container: ContainerType,
  emptyingCycle: EmptyingCycleType,
  emptyingCapacity: number
}

/**
 * HeuristicResult
 * @param rest the amount of waste which does not fit in the selected containers
 * @param containerAmount the sum of all containers
 * @param containerSelected the different containers used in this result
 */
export type HeuristicResult = {
  rest: number,
  containerAmount: number, // TODO: rename this property because there is already a containerAmount type (confusing)
  containerSelected: Array<Capacity>
}

/**
 * WasteDBEntry
 * @param wasteType the type of waste
 * @param image the path, pointing to the image/logo file
 * @param text the friendly name of the waste type
 * @param containerTypes an array of containerTypes which can be used for this wasteType
 * @param color the color hex-code of the wasteType
 */
export type WasteDBEntry = { [key in ApartmentType]: number } & {
  wasteType: WasteType,
  image: string,
  text: string,
  containerTypes: Array<ContainerType>,
  color: string,
  disposalsPerWeek: number
}

/**
 * ContainerRulesDBEntry
 * @param name the containerType of this rules
 * @param capacity the capacity of the container in liter
 * @param use whether or not this container is in use
 * @param load ...?
 * @param size the size in width (x) and depth (y)
 * @param category the category of the container (zwei-rad / vier-rad / ...)
 * @param obj the path, pointing to the 3D object (.obj) file
 * @param gltf the path, pointing to the 3D gltf (.glb) file
 * @param tex: the path, pointing to the texture of the 3D object
 */
export type ContainerRulesDBEntry = {
  name: ContainerType,
  capacity: number,
  use: boolean,
  load: boolean,
  size: {
    depth: number,
    width: number,
  },
  category: ContainerCategory,
  obj: string,
  gltf: string,
  tex: Array<string>
}

/**
 * StandRulesDB
 * @param layout_types array of WasteTypes used in this Stand
 * @param size // TODO:should this not be the container size 
 * @param wastTypes // ...
 * @param distribution array with information about the distribution and size of a Stand-version
 */
// export type StandRulesDB = {
//     wasteTypesUsed: Array<WasteType>,
//     containerSizesOrder: Array<Capacity>,     // size: number[],
//     wastTypesOrder: Array<WasteType>,
//     distribution:  {
//       [key: string] :{
//       name: string,
//       use: boolean,
//       size: number,
//       container_typs_lane_0: Array<number>,
//       container_typs_lane_1: Array<number>,
//       lane_size: Array<number>,
//       all_sizes: Array<number>
//     }},
//   }
export type StandRulesDB = {
  wasteTypesUsed: Array<WasteType>,
  distribution: {
    [key: string]: StandRule
  },
}

/**
 * StandRule
 */
export type StandRule = {
  name: string,
  use: boolean,
  tags?: Array<StandTag>,
  size: number,
  preferedLane?: number,
  containerLane0: Array<WasteContainerType>,
  containerLane1: Array<WasteContainerType>,
  laneWidth: Array<number>,
  containerAll: Array<ContainerType>,
  wastTypesOrder: Array<WasteType>,
  containerTypeOrder: Array<ContainerType>,
  staffage: Array<string>
}

// sizeY is the side of the Door
export type Layout = {
  rule: string,
  lane0: {
    sizeX: number,
    sizeY: number,
    // container: never[];
    // container: Array<{type?: string, size?: string}>
    container: Array<ContainerL>
  },
  lane1: {
    sizeX: number,
    sizeY: number,
    // container: Array<{type?: string, size?: string}>;
    container: Array<ContainerL>;
  },
  size: {
    sizeX: number,
    sizeY: number,
  }
}

/**
 * Container
 * hold the info about a container
 * @param type this should actually wasteType
 * @param size this should actually containerSize
 */
export type ContainerL = {
  wasteType: WasteType,
  containerType: ContainerType,
  // containerSize: Capacity
}