import React, {useState} from 'react';
import styled from 'styled-components';
import Colour from "./Colour";
import Pizza from './Pizza';

const validChars = ["r", "g", "b", "p", "y"];
const charCount = 5;
const guessCount = 6;

const Input = styled.input`
  margin: 3em;
`

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
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [guesses, setGuesses] = useState(Array.from(Array(guessCount).fill(
    Array.from(Array(charCount)).fill(Colour.Grey)
  )));

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Preserve content
    let text = event.target.value;
    let validText = text.split('').filter(c => validChars.includes(c)).join('')
    setText(validText)
  }

  return (
    <>
      <Input key="input"
        type="text"
        maxLength={5}
        onChange={e => setText(e.target.value)}
        value={text}
        />
      <Pizza colours={colours} />
        <Input key="input"
          type="text"
          maxLength={5}
          onChange={handleTextChange}
          value={text}
          />
      {
        guesses.map((g, i) =>
          <Pizza colours={(i == index) ? textToColours(text) : g} />
        )
      }
    </>
  )
}

export default Game