//apartmentCount
import create from 'zustand'
import { Question, QuestionCategory, ContainerCategory, ContainerType, QuestionCategoryType } from "@types"
import questionDB from '@assets/data/questionsDB';
import { xType } from "@components/utils/ReactRouter"
import useDemandStore from "./useDemandStore"

export type QuestionStore = {
    [key: string]: {
        approval: undefined | boolean
        denyCategory: undefined | ContainerType[]
        service: boolean,
        serviceText?: string
        value?: number,
    }
}

export type QueryUrl = {
    sppV: string | undefined,
    sppX: xType | undefined,
    sppC: number | undefined
} | undefined



type Store = {

    store: QuestionStore,
    displayRequired: boolean,
    setDisplayRequired: (value: boolean) => void,
    setQuestion: (uid: string, service: boolean, toggle?: boolean, denyCategory?: ContainerType[], serviceText?: string, value?: number) => void,
    getActiveQuestions: (categoryType?: QuestionCategoryType) => QuestionCategory[],
    getServiceCount: (categoryType?: QuestionCategoryType) => number,
    getServiceText: (categoryType?: QuestionCategoryType) => string[],
    getDeniedContainers: (categoryType?: QuestionCategoryType) => ContainerType[],
    getIsAllChecked: (categoryType?: QuestionCategoryType) => boolean,

    url: QueryUrl,
    setUrl: (sppV?: string, sppX?: xType, sppC?: number) => void;
    getUrl: () => string;

}

const checkSingleDependency = (d: string[], preferredState: boolean, store: QuestionStore) => {
    return d.length > 0 ? (d.findIndex((dUid) => (store[dUid] && store[dUid].approval === preferredState)) === -1 ? false : true) : true;
}

const checkDependency = (q: Question, store: QuestionStore) => {

    // Wenn nur eine dependency falsch (deny) ist, dann soll frage angezeigt werden.
    let denyApproval = checkSingleDependency(q.deny.dependency, false, store);
    let affirmApproval = checkSingleDependency(q.affirm.dependency, true, store);
    let approval = denyApproval && affirmApproval;

    return approval;
}



const useQuestionStore = create<Store>((set, get) => ({

    store: {

    },
    displayRequired: true,
    setDisplayRequired: (value: boolean) => set((state) => { return {...state, displayRequired: value}}),

    setQuestion: (uid: string, service: boolean, toggle?: boolean, denyCategory?: ContainerType[], serviceText?: string, value?: number) => set((state) => {
        // console.log("RUN: getContainerAmount ",questionDB)
        return {
            ...state, store: {
                ...state.store, [uid]: { approval: toggle ?? undefined, denyCategory: denyCategory, service: service, serviceText: serviceText, value: value }
            }
        }
    }),

    getActiveQuestions: (categoryType?: QuestionCategoryType) => {
        let store = get().store;
        let displayRequired = get().displayRequired;
        let demandState = useDemandStore.getState().apartmentCount;

        let categories = questionDB.filter((category) => {
            if (!categoryType || category.id === categoryType) {
                return true;
            } else {
                return false;
            }
        })
            .map((category, CIndex) => {
                if (category !== undefined) {
                let questions = category?.questions?.filter((question, Qindex) => {
                    let show = false;
                    // check if question has dependencies on other questions
                    // and if it should be shown
                    if (checkDependency(question, store)) {
                        // check if only required questions should be shown
                        if (displayRequired) {
                            if (question.required) { 
                                show = true; 
                            } 
                        }
                        else {
                            show = true;
                        }
                    }
                    return show;

                })

                return { ...category, questions: questions }
            } else {
                return category;
            }

            })

        // delete empty categories
        const cleanCategories = categories.filter((category) => {
            if (category.questions.length === 0) {
                return false;
            } else {
                return true;
            }
        })

        return cleanCategories
    },

    getServiceCount: (categoryType?: QuestionCategoryType) => {
        let activeQuestions = get().getActiveQuestions(categoryType);
        let count = 0;
        let store = get().store;


        activeQuestions?.forEach((c) => {
            c.questions.forEach((q, index) => {
                if (store[q.uid]?.approval === false && q.service === true) { count = count + 1 }
            })
        })

        return count;
    },

    getServiceText: (categoryType?: QuestionCategoryType) => {
        let store = get().store;
        let servText: string[] = [];
        get().getActiveQuestions(categoryType)?.forEach((c) => {
            c.questions.forEach((q, index) => {
                if (store[q.uid]?.approval === false && store[q.uid]?.serviceText !== undefined) {
                    servText.push(store[q.uid]?.serviceText!);
                }

            })
        })
        return servText;
    },

    getIsAllChecked: (categoryType?: QuestionCategoryType) => {
        let activeQuestions = get().getActiveQuestions(categoryType);

        let confirm = true;
        let store = get().store;

        activeQuestions?.forEach((c) => {
            c.questions.forEach((q, index) => {
                // check if boolean toggle is defined
                // or if it is a value input, check if that one is not undefined
                // if (store[q.uid]?.approval == undefined || (store[q.uid]?.approval == undefined && store[q.uid]?.value !== undefined)) { confirm = false }
                if (!(store[q.uid]?.approval !== undefined || store[q.uid]?.value !== undefined)) {
                    confirm = false
                }
            })
        })

        return confirm;
    },


    getDeniedContainers: (categoryType?: QuestionCategoryType) => {
        let activeQuestions = get().getActiveQuestions(categoryType);
        // active Questions is hierarchical ({category: {questions}})
        // is reduced to flat array of question uids        
        // let activeQuestionUids = activeQuestions.flatMap(c => c.questions.map(q => q.uid))
        let activeQuestionUids = activeQuestions?.reduce((acc: string[], c) =>
            acc.concat(
                c.questions.map((q, index) => q.uid)
            ), [])
        let store = get().store;
        // console.log("get denied")
        // each store item might have a denyCategory list
        // items in denyCategory exist multiple times
        // therefore we reduce the store object and create a list of denied categories (acc)
        // denied categories are only pushed, if they are not already inside the list (acc)
        // console.log("RUN: getContainerAmount 2",store)

        const deniedContainers = activeQuestionUids.reduce((acc: ContainerType[], k) => {

            store[k] && store[k].approval !== undefined && store[k].denyCategory?.forEach(c => {
                if (!acc.includes(c)) {
                    acc.push(c);
                }
            })
            return acc;
        }, [])
        // console.log("RUN: getContainerAmount 2",deniedContainers)
        return deniedContainers;
    },

    url: undefined,
    setUrl: (sppV?: string, sppX?: xType, sppC?: number) => set((state) => { return { ...state, url: { sppV, sppX, sppC } } }),

    getUrl: () => {

        let url = get().url
        return `http://localhost:3000/?sppC=${url?.sppC}&sppQ=${url?.sppX}&sppV=${url?.sppV}`
    }
}))

export default useQuestionStore;







// //apartmentCount
// import create from 'zustand'
// import { Question, QuestionCategory, ContainerType } from "@types"
// import questionDB from '@assets/data/questionsDB';

// type Store = {[key: string]: {
//     approval: undefined | boolean
//     denyCategory: undefined | ContainerType[]
//     service: boolean,
// }
// }
// type QuestionStore = {

//     store: Store,
//     // serviceCount: { [key: string]:boolean},

//     setQuestion: (uid: string, service: boolean, toggle?: boolean, denyCategory?: ContainerType[], ) => void,
//     getActiveQuestions: () => QuestionCategory[],
//     getDeniedCategories: () => ContainerType[],
//     // setServiceCount:  (uid:string, toggle: boolean) => void,

// }

// const checkSingleDependency = (d: string[], preferredState: boolean, store: Store) => {
//     return d.length > 0 ? (d.findIndex((dUid) => (store[dUid] && store[dUid].approval === preferredState)) === -1 ? false : true) : true;
// }

// const checkDependency = (q: Question, store: Store) => {

//     // Wenn nur eine dependency falsch (deny) ist, dann soll frage angezeigt werden.
//     let denyApproval = checkSingleDependency(q.deny.dependency, false, store);
//     let affirmApproval = checkSingleDependency(q.affirm.dependency, true, store);
//     let approval = denyApproval && affirmApproval;

//     return approval;
// }



// const useQuestionStore = create<QuestionStore>((set, get) => ({

//     store: {

//     },

//     // serviceCount: {

//     // },

//     // setServiceCount:(uid: string, toggle: boolean) => set((state) => { return { ...state, serviceCount: { ...state.serviceCount, [uid]: toggle } } }),


//     setQuestion: (uid: string, service: boolean, toggle?: boolean, denyCategory?: ContainerType[], ) => set((state) => { return { ...state, store: { ...state.store, [uid]: { approval: toggle ?? undefined, denyCategory: denyCategory, service: service } } } }),
//     getActiveQuestions: () => {
//         let store = get().store;
//         return questionDB.filter((oneCat, CIndex) => {
//             if (oneCat !== undefined) {
//                 oneCat?.questions?.map((oneQue, Qindex) => {
//                     if (oneQue !== undefined) { 
//                         if(checkDependency(oneQue, store))
//                             return true;
//                     }
//                 })
//             }
//             return false;
//         })
//     },
//     getServiceCount: () => {
//         let activeQuestions = get().getActiveQuestions();
//         let serviceCount = 0;
//         activeQuestions.map((x) => {
//             x.
//         })
//     },
//     getDeniedCategories: () => {
//         let activeQuestions = get().getActiveQuestions();
//         let store = get().store;
//         console.log("get denied")
//         // each store item might have a denyCategory list
//         // items in denyCategory exist multiple times
//         // therefore we reduce the store object and create a list of denied categories (acc)
//         // denied categories are only pushed, if they are not already inside the list (acc)
//         return Object.keys(store).reduce((acc: ContainerCategory[], k) => {
//             store[k].approval === false && store[k].denyCategory?.forEach(c => {
//                 if (!acc.includes(c)) {
//                     acc.push(c);
//                 }
//             })
//             return acc;
//         }, [])
//     }

// }))

// export default useQuestionStore;


// // type Store = {
// //     [key: string]: { 
// //         toggle: undefined | boolean
// //     }
// // }

// // const store: Store = {
// // "C0-Q001" : { toggle: true},
// // "C0-Q002" : { toggle: true}
// // }

// // q.affirm.dependency.find(d => store[d] === true)

// // store["C0-Q001"].toggle