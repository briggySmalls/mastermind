import React, {useState} from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import Colour from "./Colour";
import Pizza from './Pizza';
import Score from './data/Score';

const validChars = ["r", "g", "b", "p", "y"];
const charCount = 5;
const guessCount = 6;

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

function Game() {
  const answer = "yyyyy";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [pizzaStates, setPizzaStates] = useState<PizzaState[]>(Array.from(Array(guessCount).fill(
    {
      guess: Array.from(Array(charCount)).fill(Colour.Grey),
      score: null,
    }
  )));

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    let text = event.target.value;
    let validText = text.split('').filter(c => validChars.includes(c)).join('')
    setText(validText)
  }

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    let newStates = R.adjust(
      index,
      (s: PizzaState) => {
        return {guess: textToColours(text), score: s.score}
      },
      pizzaStates
    );
    setPizzaStates(newStates);
    setIndex(index+1);
    setText("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input key="input"
          type="text"
          maxLength={5}
          onChange={handleTextChange}
          value={text}
          />
        <input type="submit" value="Submit" />
      </form>
      {
        pizzaStates.map((s, i) =>
          <Pizza colours={(i == index) ? textToColours(text) : s.guess} score={s.score} />
        )
      }
    </>
  )
}

export default Game