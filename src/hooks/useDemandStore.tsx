
//apartmentCount
import create from 'zustand'

type State = {
apartmentCount: number | undefined,
  setApartmentCount: (apartmentCount: number) => void,
  reset: () => void;
}


const useDemandStore = create<State>((set, get) => ({
  
  apartmentCount: undefined,
  setApartmentCount: (newAppCount) => set((state) => ({ ...state, apartmentCount: newAppCount})),
  reset: () => set((state) => ({...state, apartmentCount: 0}))

}))

export default useDemandStore;