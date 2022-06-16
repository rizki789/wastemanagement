
import {ContainerCategory, ContainerType} from "./index"

export type QuestionCategoryType = "filter" | "unterflur" | "container" | "costs"

export type Question = {
    uid: string,
    service: boolean,
    checked?: boolean,
    demandRange?: [number, number],
    input?: {
      min: number,
      max: number,
      default?: number
    },
    text: string,
    required: boolean,
    serviceText?: string,
    schleppkurve?: boolean,
    affirm:{
      dependency: Array<string>,
      visHelper: Array<string>,
      denyContainer: Array<ContainerType>
    },
    deny:{
      dependency: Array<string>,
      visHelper: Array<string>,
      denyContainer: Array<ContainerType>
    }
  }
  
  export type QuestionCategory = {
    category: string,
    id: QuestionCategoryType,
    serviceComment: string,
    questions: Array<Question>
  }