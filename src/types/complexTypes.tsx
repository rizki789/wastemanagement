import { WasteType, ContainerType, WasteContainerType, ContainerCategory , EmptyingCycleType, ApartmentType } from "./index";

/* --- primitive types --- */

/**
 * Size
 * @param width the expansion in width direction
 * @param depth the expansion in depth direction
 */
export type Size = {
	width: number,
	depth: number
}


/* --- complex types --- */

/**
 * HeuristicResult
 * @param rest the amount of waste which does not fit in the selected containers
 * @param containerAmount the sum of all containers
 * @param containerSelected the different containers used in this result
 */
 export type RecursiveResult = {
	rest: number,
	// containerSelected: Array<ContainerType>
	containerSelected: Array<{container: ContainerType, emptyingCycle: EmptyingCycleType, emptyingCapacity: number}>,
	fitness: number | undefined
}

/**
 * Waste
 * @param type the Wastetype
 * @param name friendly name
 */
export type Waste = {
	type: WasteType,
	name: string,
	// container: Record<ContainerType, Record<EmptyingCycleType, number | undefined> | undefined>,
	containers: Array<WasteContainerType>,
	wastePerUnit: Record<ApartmentType, number>,
	defaultEmptyingCycle: EmptyingCycleType,
}

/**
 * Container
 * @param type the ContainerType
 * @param name friendly name
 * @param capacity the amount of waste the Container can hold
 * @param containerCategory the ContainerCategory 
 * @param parkingSpace the space the container occupies
 * @param acquisitionCost the price when acquired
 */
export type Container = {
	type: ContainerType,
	name: string,
	capacity: number,
	containerCategory: ContainerCategory,
	parkingSpace: Size,
	acquisitionCost: number
}

/**
 * WasteContainer
 * @param container the Container
 * @param waste the kind of waste the container suppose to hold
 */
export type WasteContainer = {
	type: WasteContainerType,
	containerType: ContainerType,
	wasteType: WasteType,
	defaultEmptyingCycle: EmptyingCycleType
	emptyingCycleCost: Record<EmptyingCycleType, number | undefined>, // Array<EmptyingCycleType>
	acquisitionCost: number,
	provisionCost?: number
}

/**
 * EmptyingCycle
 * @param EmptyingCycleType the EmptyingCycleType
 * @param name friendly name
 * @param amountMultiplier the multiplier for the waste amount calculation
 * @param costMonthly monthly emptying cost of the waste/container/cycle
 */
export type EmptyingCycle = {
	type: EmptyingCycleType,
	name: string,
	amountMultiplier: number
}

