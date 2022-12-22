import React from 'react'
import shaffle from './utils'


export type Question =  {
    category: string,
    correct_answer : string,
    difficalty: string,
    incorrect_answers : string[],
    question:string,
    type:string
}

export type QuestionState = Question & {
 answers : string[]
}

export enum Difficalty{
    EASY = "easy",
    MEDIUN = "medium",
    HARD = "hard"
}

const API = async(amount:number,difficalty:Difficalty)=> {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficalty=${Difficalty}&type=multiple`
  const data = await(await fetch(endpoint)).json();
  
  return data.results.map((question: Question)=>
   (
        {
          ...question ,
          answers: shaffle([...question.incorrect_answers,question.correct_answer])
        }
  )
  )}



export default API
