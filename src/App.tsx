import { useState } from 'react'
import QuestionCards from './components/QuestionCards'
import API from './components/API';
import { Difficalty } from './components/API';
import { QuestionState } from './components/API';
import { GlobalStyle } from './App.styles';
import { Wrapper } from './App.styles';

export type AnswerObject = {
  question:string,
  answer:string,
  correct:boolean,
  correctanswer:string
}

const TOTAL_QUESTIONS = 5;
function App() {
  const [loading,setLoadin] = useState(false)
  const [questions,setQuestions] = useState<QuestionState[]>([])
  const [number,setNumber] = useState(0)
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([])
  const [score,setScore] = useState(0)
  const [gameover,setGameover] = useState(true)
  


  const startTrivia =async () => {
    setLoadin(true)
    setGameover(false)

  const newQuestions = await API(TOTAL_QUESTIONS,Difficalty.EASY)
    console.log(newQuestions)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoadin(false)
        
  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{
    if(!gameover){
      const answer = e.currentTarget.value
      
      const correct = questions[number].correct_answer === answer
  
      if(correct){
        setScore(prev=> prev + 1)
      }

      const answerobj = {
        question:questions[number].question,
        answer: answer,
        correct: correct,
        correctanswer:questions[number].correct_answer,

      }
      setUserAnswers(prev => [...prev,answerobj])
    }

  }

  const nextQuestion = ()=>{
     const nextQuestion = number+1
     if(nextQuestion === TOTAL_QUESTIONS){
       setGameover(true)
     }else{
      setNumber(nextQuestion)
     }

  }
  return (
    <>
    <GlobalStyle></GlobalStyle>
    
    <Wrapper className="App">
      <h1>REACT QUIZ</h1>
      {gameover||userAnswers.length === TOTAL_QUESTIONS ? 
      <button className='"start' onClick={startTrivia}>Start</button>: null }
      {!gameover ? 
      <p className='score'>Score:{score}</p> : null}
      {loading ? <p>Loading Qestions ....</p> : null}
      
      {!loading && !gameover && 
      
      <QuestionCards
          questionNum={number + 1}
          totalQuestion={TOTAL_QUESTIONS}
          question ={questions[number].question}
          answers= {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number]:undefined}
          callback = {checkAnswer}
      />}

      {!gameover && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS ?
       <button className='nexr' onClick={nextQuestion}> {number + 1 !== TOTAL_QUESTIONS ? "Next Question":"start Again"}</button> :  null
      }

     
    </Wrapper>
    </>
  )
}

/**
|--------------------------------------------------
| https://opentdb.com/api.php?amount=5&type=multiple
|--------------------------------------------------
*/
export default App
