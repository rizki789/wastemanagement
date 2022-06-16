import wasteDB from "@assets/data/wasteDemandDB";
import containerRulesDB from "@assets/data/containerRulesDB";
// import { calculateContainerAmount } from "@helpers/containerHelperOld";
// new stuff
import { calculateContainerAmountNew, getContainerAmount } from "@helpers/containerHelper";
import { containers, emptyings, waste } from "@assets/data/containerDB";

import { WasteType, Waste, EmptyingCycleType, WasteDBEntry, ApartmentType,ContainerCategory, ContainerCategoryCapacity, ContainerAmountPerWaste, ContainerAmount, Capacity, emptyingContainer, ContainerType } from "@types";
import { useEffect, useState, useMemo } from "react";
import useDemandStore from '@hooks/useDemandStore';
import useQuestionStore from '@hooks/useQuestionStore';
import useContainerData from "@hooks/useContainerData";
import useContainersDataStore from "@hooks/useContainersDataStore";


export const useContainerDataUpdate = () => {

    const store = useQuestionStore(state => state.store);
    const deniedContainer = useQuestionStore(state => state.getDeniedContainers)();
    const apartments = useDemandStore(state => state.apartmentCount);
    const setContainerData = useContainerData(state => state.setStore);
    const emptyingCycles = useContainersDataStore(state => state.emptyingCycles);
    
    // console.log("🚀 ~ useContainerDataUpdate ~ setContainerData", setContainerData);

    const calcDisposals = (containerAmount: ContainerAmount) => {
        return containerAmount !== undefined ? (1 / containerAmount.disposals) : undefined;
    }
    //calculates amount of waste by number of apartments
    // const wasteByApartment = (wasteDBEntry: WasteDBEntry, apartmentType: ApartmentType, apartmentCount: number, disposals: number) => {
    //     return Math.round((wasteDBEntry[apartmentType] * apartmentCount) / disposals);
    // }

    const wasteByApartmentNew = (waste: Waste, apartmentType: ApartmentType, apartmentCount: number, disposals: number) => {
        return Math.round((waste.wastePerUnit[apartmentType] * apartmentCount) /disposals);
    }

    const getSimpleContainerAmountPerType = (containerAmount: ContainerAmount, category: ContainerCategory) => {
        // return (containerAmount !== undefined && containerAmount.categories[category] !== undefined) ? (containerAmount.categories[category]!.containerSizes.length) : "X";
        return (containerAmount !== undefined && containerAmount.categories[category] !== undefined) ? (containerAmount.categories[category]!.containers.length) : "X";
    }

    /*
    const getPreciseContainerAmountPerType = (containerAmount: ContainerAmount, category: ContainerCategory): Array<{containerSize: Capacity, amount: number}> => {

        const newDict = containerAmount.categories[category] !== undefined ? containerAmount.categories[category]!.containerSizes.reduce((acc: {[key: string]: number}, x) => {
            const capacity = x.toString();
            return {...acc, [capacity]: (acc[capacity] ?? 0) + 1};
        }, {}) : {}

        // if (Object.entries(dict).length === 0 && dict.constructor === Object)
        // {
        //     return "X"; //this should not happen, so make sure containerAmountDict is not "empty"
        // }
        // else
        // {
        //     // var newDict = {};
        // for(var key in dict[wasteType.type][category]){
        //     var container = dict[wasteType.type][category][key]
        //     if(newDict[container] != null){
        //         newDict[container] += 1;
        //     }else{
        //         newDict[container] = 1;
        //     }
        // }
        const capacityKeys = (Object.keys(newDict) as Array<string>)
        return capacityKeys.length > 0
        ? capacityKeys.map(capacity => {
                return {containerSize: parseInt(capacity) as Capacity, amount: newDict[capacity]}
            }) 
        : [{containerSize: 0 as Capacity, amount: 0}]
        // var amountByCategory =[];
        // for(const container of Object.keys(newDict)){
        //     amountByCategory.push({"type": container.toString(), "amount": newDict[container].toString()});
        // }
        // if(amountByCategory.length == 0){
        //     amountByCategory.push({"type":"", "amount":"0"});
        // }
        //return amountByCategory;
        
    }
    */

    const getPreciseContainerAmountPerTypeNew = (
        containerAmount: ContainerAmount,
        category: ContainerCategory)
        : Array<{container: ContainerType, containerSize: Capacity, amount: number}> => {

            let resultNew: Array<{container: emptyingContainer, containerSize: Capacity, amount: number}> = [];

            let containerDict: {[key in ContainerType]? : number} = {};
            if (containerAmount.categories[category] !== undefined) {
                for (let i = 0; i < containerAmount.categories[category]!.containers.length; i++) {
                    const containerNow: ContainerType = containerAmount.categories[category]!.containers[i].container;
                    // const emptyingNow: EmptyingCycleType = containerAmount.categories[category]!.containers[i].emptyingCycle;
                    containerDict[containerNow] = (containerDict[containerNow] ?? 0) + 1;
                }
            }

            let result: Array<{container: ContainerType, containerSize: Capacity, amount: number}> = [];
            const containerKeys = (Object.keys(containerDict) as Array<ContainerType>);
            for (let i = 0; i < containerKeys.length; i++) {
                result.push({container: containerKeys[i], containerSize: containers[containerKeys[i]]!.capacity as Capacity, amount: containerDict[containerKeys[i]]!});
            }

            return result;
        }

    const getNew = (
        containerAmount: ContainerAmount,
        category: ContainerCategory)
        : Array<emptyingContainer> => {

            let containerDict: {[key in ContainerType]? : number} = {};
            let result: Array<emptyingContainer> = [];
            if (containerAmount.categories[category] !== undefined) {
                for (let i = 0; i < containerAmount.categories[category]!.containers.length; i++) {
                    // const containerNow: ContainerType = containerAmount.categories[category]!.containers[i].container;
                    // containerDict[containerNow] = (containerDict[containerNow] ?? 0) + 1;
                    result.push(containerAmount.categories[category]!.containers[i]);
                }
            }

            return result;
        }

    
    // const getContainerAmountPerType = (containerAmount: ContainerAmount, category: ContainerCategory, precise: boolean) => {
    //     return precise ? getPreciseContainerAmountPerType(containerAmount, category) : getSimpleContainerAmountPerType(containerAmount, category)
    // }
    // const getZweiradContainerAmount = (containerAmount: ContainerAmount, precise = false) => {
    //         return getContainerAmountPerType(containerAmount, "zwei_rad", precise);
    // }
    // const getVierradContainerAmount = (containerAmount: ContainerAmount, precise = false) => {
    //     return getContainerAmountPerType(containerAmount, "vier_rad", precise);
    // }

    const data = useMemo(()=>{
        
        if(apartments && store && Object.keys(store).length > 0){
            console.log("run new data")
            let amount: ContainerAmountPerWaste = {};
            for (const key in waste) {
                let keyNow: WasteType = key as WasteType;

                const amountNow = waste[keyNow].wastePerUnit["3-5"] * apartments;

                console.log("deniedCategories : ", deniedContainer);

                // const resultNowNew = calculateContainerAmountNew(amountNow, waste[keyNow], deniedCategories);
                const resultNowNew = getContainerAmount(amountNow, waste[keyNow], deniedContainer);

                amount[keyNow] = {
                    categories: resultNowNew,
                    wasteType: keyNow,
                    // disposals: emptyings[waste[keyNow].defaultEmptyingCycle].amountMultiplier
                   
                    disposals: emptyings[emptyingCycles[keyNow]].amountMultiplier
                }
                
            }
            
            // const amount = wasteDB.reduce((acc: ContainerAmountPerWaste, entry) => {
            //     // BUGPOTENTIAL rounding ok? earlier version: parseInt
            //     // calculates the emptying rhythm from the emptying-per-week
            //     const disposals = Math.round(1 / entry.disposalsPerWeek)
            //     // take biggest apartment
            //     const amount = entry["3-5"] * apartments * disposals;
            //     const amountNew = entry["3-5"] * apartments;
            //     console.log("amount : ", amount);

            //     // new calculations
            //     // calculateContainerAmountNew(amount, entry, containers, waste[entry.wasteType]);
            //     const resultNow = calculateContainerAmount(amount, entry, containerRulesDB, deniedCategories);
            //     // const resultNowNew = calculateContainerAmountNew(amountNew, entry, containers, waste[entry.wasteType]);
            //     // console.log("🚀 ~ amount ~ resultNow: ", resultNow, " -- resultNowNew: ", resultNowNew);

            //     return {...acc, [entry.wasteType]:  {
            //             // categories: calculateContainerAmount(amount, entry, containerRulesDB, deniedCategories),
            //             categories: resultNow,
            //             disposals: disposals
            //         }
            //     }
            // }, {})
            
            const keys = (Object.keys(amount) as Array<WasteType>)
            const containerData = keys.reduce((acc: ContainerAmountPerWaste, key: WasteType) => {
                if(amount[key] !== undefined){
                    const categories = Object.keys(amount[key]!.categories as Array<ContainerCategory>)
                    // const containerPerCategory = categories.map(x => {
                    //     return {
                    //         type: x,
                    //         amount: getSimpleContainerAmountPerType(amount[key]!, x as ContainerCategory),
                    //         preciseAmount: getPreciseContainerAmountPerType(amount[key]!, x as ContainerCategory),
                    //     }
                    // })

                    const containerPerCategory = categories.reduce((acc: ContainerCategoryCapacity, x) => {
                        return {...acc, [x]: {
                            amount: getSimpleContainerAmountPerType(amount[key]!, x as ContainerCategory),
                            // preciseAmount: getPreciseContainerAmountPerType(amount[key]!, x as ContainerCategory),
                            containers: getNew(amount[key]!, x as ContainerCategory),
                            preciseAmount: getPreciseContainerAmountPerTypeNew(amount[key]!, x as ContainerCategory),
                            }
                        }
                    }, {})
                    console.log("🚀 ~ containerPerCategory ~ containerPerCategory", containerPerCategory);
                    const disposals = calcDisposals(amount[key]!);
                    // const wasteDBEntry = wasteDB.find(x => x.wasteType === key);
                    // const waste = wasteDBEntry && disposals ? wasteByApartment(wasteDBEntry, "3-5", apartments, disposals) : 0;
                    const wasteNow = waste[key];
                    const wasteByApartment = wasteNow && disposals ? wasteByApartmentNew(wasteNow, "3-5", apartments, disposals) : 0;

                    return {...acc, 
                        [key]:{
                            disposals: disposals,
                            wasteType: key,
                            title: wasteNow?.name,
                            // color: wasteDBEntry?.color,
                            color: "#687F8D",
                            wasteByApartment: wasteByApartment,
                            categories: containerPerCategory,
                        }
                    }
                }else{
                    return acc;
                }
            }, {})
            return containerData;
        }
        return undefined;
    },[apartments, deniedContainer, emptyingCycles])

    data && setContainerData(data);
    return data;
}

