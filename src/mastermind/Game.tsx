import React, {useState} from 'react';
import styled from 'styled-components';
import Colour from "./Colour";
import Pizza from './Pizza';
import Keyboard from './Keyboard';
import * as R from 'ramda';
import {Score, calculateScore} from './data/Score';
import seedrandom from 'seedrandom';

const validChars = ["r", "g", "b", "p", "y"];
const charCount = 4;
const guessCount = 10;

const Input = styled.input`
  margin: 3em;
`

interface PizzaState {
  guess: Colour[];
  score?: Score;
}

function textToColours(text: String) {
  return text.padEnd(charCount, "n").split('').map(c => {
    switch (c) {
      case "r": return Colour.Red
      case "g": return Colour.Green
      case "b": return Colour.Blue
      case "p": return Colour.Purple
      case "y": return Colour.Yellow
      case "n": return Colour.Grey
      default: return Colour.Grey
    }
  })
}

function generateAnswer() {
  let today = new Date();
  let myrng = seedrandom(today.toDateString());
  const colours = [
    'r',
    'g',
    'b',
    'y',
    'p',
  ]
  return Array.from(Array(charCount)).map(_ => colours[Math.floor(myrng() * colours.length)]).join("");
}

function Game() {
  const answer = generateAnswer();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [pizzaStates, setPizzaStates] = useState<PizzaState[]>(Array.from(Array(guessCount).fill(
    {
      guess: Array.from(Array(charCount)).fill(Colour.Grey),
      score: null,
    }
  )));
  const [isEnded, setIsEnded] = useState(false);

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    let text = event.target.value;
    let validText = text.split('').filter(c => validChars.includes(c)).join('')
    setText(validText)
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    // Ensure we have a full guess
    if (text.length !== charCount) return
    // Update state
    const score = calculateScore(answer, text)
    console.log(score);
    let newStates = R.adjust(
      index,
      (s: PizzaState) => {
        return {
          guess: textToColours(text),
          score: score,
        }
      },
      pizzaStates
    );
    setPizzaStates(newStates);
    // Iterate
    if (score.exact === charCount || index === guessCount-1) {
      setIsEnded(true)
    }
    setIndex(index+1);
    setText("");
  }

  return (
    <>
      {
        pizzaStates.map((s, i) =>
          <Pizza key={`pizza-${i}`} colours={(i === index) ? textToColours(text) : s.guess} score={s.score} />
        )
      }
      <Keyboard />
    </>
  )
}

export default Game