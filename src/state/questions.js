import data from "../helpers/data"
import { normalize, schema } from "normalizr"

const question = new schema.Entity("questions")
const mySchema = { questions: [question] }
const { entities, result } = normalize(data, mySchema)

// Actions
export const changeCurrentQuestion = id => ({
  type: "QUESTIONS/CHANGE_CURRENT_QUESTION",
  id
})

// Reducer
const initialState = {
  byId: entities.questions,
  all: result.questions,
  currentQuestion: data.questions[0].id
}
const questions = (state = initialState, action) => {
  switch (action.type) {
    case "QUESTIONS/CHANGE_CURRENT_QUESTION":
      const currentQuestion = state.byId[state.currentQuestion]
      return {
        ...state,
        currentQuestion: currentQuestion ? currentQuestion.next : null
      }
    default:
      return state
  }
}

export default questions
