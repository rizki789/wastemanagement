import wasteDB from "@assets/data/wasteDemandDB";
import containerRulesDB from "@assets/data/containerRulesDB";
// import { calculateContainerAmount } from "@helpers/containerHelper";
import { LayoutCriteria, Layout, WasteType, WasteDBEntry, ApartmentType,ContainerCategory, ContainerCategoryCapacity, ContainerAmountPerWaste, ContainerAmount } from "@types"
// import { useEffect, useState, useMemo } from "react";
// import useDemandStore from '@hooks/useDemandStore';
// import useQuestionStore from '@hooks/useQuestionStore';
import standRulesDB from "@assets/data/standRulesDB";
// import layoutHelper from "@helpers/layoutHelper";
import { getBestLayout, deepcopy, deepcopyContainerAmountPerWaste } from "@helpers/layoutHelper";

//apartmentCount
import create from 'zustand'


                        // {[key in WasteType]?: {disposals: number, 
                        //     wasteByApartment: number, 
                        //     containerPerCategoy: {type: ContainerCategory, 
                        //                           amount: number,
                        //                          preciseAmount: {
                        //                              type: string,
                        //                              amount: string
                        //                          }}[]
                        //     }
                        // }






const getLayout = (containerData?: ContainerAmountPerWaste, criteria?: LayoutCriteria) => {
    if(containerData){
      console.log("--- GET LAYOUT ------------------------------------------------------------", criteria);
      // remove unnecessary wastetypes for layout calculation (for example Glas bunt/weiß). They are defined in modules.standRulesDB["layout_types"];
      //var containerAmountNow = modules.layoutHelper.deepcopy(this.containerAmountDict);
      // BUGPOTENTIAL ? need for deepcopy of containeramount ?
      //const objKeys = Object.keys(containerAmount) as Array<keyof typeof containerAmount>
      // const containerAmountNow = objKeys.filter((key)=>{
      //                                     (! (standRulesDB["layout_types"].includes(key)))
      //                                 }).map(key => containerAmount[key])

      // let containerAmountNow = deepcopy(containerData);
      let containerAmountNow = deepcopyContainerAmountPerWaste(containerData);

      let wasteKey: keyof typeof containerAmountNow;
      for (wasteKey in containerAmountNow)
      {
          //@ts-ignore
          if (! standRulesDB.wasteTypesUsed.includes(wasteKey))
          {
              delete containerAmountNow[wasteKey];
          }
      }
      return getBestLayout(containerAmountNow, containerRulesDB, standRulesDB, criteria ?? "compact");
    }else{
      return undefined;
    }
}



type State = {
  store: ContainerAmountPerWaste,
  layoutCriteria: LayoutCriteria | undefined,
  layoutDict: Layout | undefined,
  setStore: (entry: ContainerAmountPerWaste) => void,
  setCriteria: (layoutCriteria: LayoutCriteria) => void
}


const useContainerData = create<State>((set, get) => ({
  store: {},
  layoutCriteria: "compact",
  layoutDict: undefined,
  setStore: (entry: ContainerAmountPerWaste) => set((state) => {
    return ({...state, store: entry, layoutDict: getLayout(entry, state.layoutCriteria)})
  }),
  setCriteria: (layoutCriteria: LayoutCriteria) => set((state) => { 
    return ({...state, layoutCriteria: layoutCriteria, layoutDict: getLayout(state.store, layoutCriteria)})
  })
}))

export default useContainerData;
