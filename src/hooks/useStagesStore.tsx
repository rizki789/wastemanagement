
//stages
import create from 'zustand'

type View =  "start" | "container" | "question" | "view3D";
 
type State = {
  stage: number,
  view: View,
  setStage: (newStage: number) => void,
  setView: (newView: View) => void,

}

const useStagesStore = create<State>((set, get) => ({
  // 0 start 1 container 2 questions 3 view3D
  stage: 0,
  setStage: (newStage) => set((state) => ({ ...state, stage: newStage })),

  view: "start",
  setView: (newView) => set((state) => ({ ...state, view: newView })),



}))

export default useStagesStore;