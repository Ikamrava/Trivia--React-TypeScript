import React from 'react'
import { nanoid } from 'nanoid'
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';




  type Props = {
    question: string,
    answers:string[],
    callback:(e:React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNum: number,
    totalQuestion: number

  }
const QuestionCards: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestion,
})=>(
    <Wrapper>
      <p className='number'>
        Question: {questionNum} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question}}></p>
      <div>
        {answers.map(answer => (
           <ButtonWrapper
           key={answer}
           correct={userAnswer?.correctanswer === answer}
           userClicked={userAnswer?.answer === answer} 
           >
            <button disabled = {userAnswer ? true : false} onClick={callback} value = {answer}>
              <span dangerouslySetInnerHTML={{ __html:answer}}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>

    </Wrapper>

  
  );



export default QuestionCards
