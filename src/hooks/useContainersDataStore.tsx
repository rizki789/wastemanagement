
//stages
import create from 'zustand'
import { WasteType, EmptyingCycleType, ContainerAmountPerWaste } from "@types"
 

type EmptyingCycles = {
  [key: string]:  EmptyingCycleType
}

type ContainersState = {
  emptyingCycles: EmptyingCycles,
  setEmptyingCycles:  (wasteKey: WasteType, cycle: EmptyingCycleType) => void,
}

const useContainersDataStore = create<ContainersState>((set, get) => ({
  
  emptyingCycles: {},

  setEmptyingCycles: (wasteKey: WasteType, cycle: EmptyingCycleType) => set((state) => ({ ...state, emptyingCycles: {...state.emptyingCycles, [wasteKey]: cycle } })),

}))

export default useContainersDataStore;