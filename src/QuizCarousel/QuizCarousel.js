
import React, { Component } from 'react'
import { Button } from 'reactstrap';

import { Navigation } from "./Navigation"
import { Question } from "./Question"
import { SubmitModal } from "./SubmitModal"

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import characters from './marvel.json'

import "./carousel.scss"
export class QuizCarousel extends Component {
  state = {
    currentId: 1,
    characters: characters,
    askToSubmitModal: false
  }

  componentDidMount(){
    const reducer = (acc, char, i) => {
      acc[i + 1] = null
      return acc
    }
    const answersInitial = characters.reduce(reducer, {})
    
    this.setState({
      answers: answersInitial
    })
  }

  handleAnsweringQuestion = (id, answer) => {
    let { answers: answersNextState } = this.state
    answersNextState[id] = answer
    this.setState({
      answers: answersNextState
    })
  }
  
  handleMainArrowClick = (val) => {
    const { currentId,
    } = this.state
    
    const nextValue = currentId + val
    
    this.setState({
      currentId: nextValue
    })
  }

  setCharacter=(id)=>{
    this.setState({
      currentId: id
    })
  }

  toggleSubmitModal = () => {
    this.setState(prevState => ({
      askToSubmitModal: !prevState.askToSubmitModal
    }));
  }
  
  render() {
    const {
      currentId,
      characters,
      answers,
      askToSubmitModal
    } = this.state
  
    const currentCharacter = characters[currentId - 1]
    
    const currentAnswer = answers ? answers[currentId] : null

    return (
      <div className="quiz-carousel">
        <div className="arrow-button-wrapper left">
          <button disabled={currentId === 1} onClick={() => this.handleMainArrowClick(-1)}>
            <FaAngleLeft className="arrow-button-left"/>
          </button>
        </div>
        <div className="quiz-body">
          <Navigation currentId={currentId} characters={characters} handleClick={this.setCharacter} />
          {
            currentCharacter && 
            <Question
              currentId={currentId}
              handleAnswer={this.handleAnsweringQuestion}
              userAnswer={currentAnswer}
              {...currentCharacter}
            />
          }
        </div>
        <div className="arrow-button-wrapper right">
          <button disabled={currentId === characters.length} onClick={() => this.handleMainArrowClick(1)}>
            <FaAngleRight className="arrow-button-right" />
          </button>
        </div>
        <section id="submit-section">
          <Button color="danger" onClick={this.toggleSubmitModal}>Submit Quiz</Button>
          <SubmitModal modalOpen={askToSubmitModal} toggle={this.toggleSubmitModal}/>
        </section>
      </div>
    )
  }
}