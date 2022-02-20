import * as R from 'ramda';
import React, {useState} from 'react';
import styled from 'styled-components';
import Colour from "./Colour"

interface KeyboardProps {
  codeLength: number;
  updateGuess(guess: ReadonlyArray<Colour>): void
  submitGuess(guess: ReadonlyArray<Colour>): void
}

const KeyBoardContainer = styled.div`
  position: sticky;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  bottom: 1em;
  margin-bottom: 1em;
  border-radius: 1em;
  border: 0.1em solid white;
  background-color: #e5e5e5;
  width: 80vw;
  max-width: 500px;
  padding: 0.5em;
`

const KeyBoardRow = styled.hr`
  width: 100%;
  visibility: hidden;
`

const Key = styled.button`
  display: inline-block;
  height: 3em;
  border-radius: 20%;
`

const ColourKey = styled(Key)<{colour: Colour}>`
  background-color: ${props => props.colour};
  width: 3em;
`

const SubmitKey = styled(Key)`
  background-color: white;
`

const colourMap: ReadonlyMap<string, Colour> = new Map([
  ["r", Colour.Red],
  ["g", Colour.Green],
  ["b", Colour.Blue],
  ["y", Colour.Yellow],
  ["p", Colour.Purple],
])

function Slice({ codeLength, updateGuess, submitGuess }: KeyboardProps) {
  const [guess, setGuess] = useState<ReadonlyArray<Colour>>([]);

  function handleColourSubmit(colour: Colour) {
    if (guess.length === codeLength) return;
    const newGuess = [...guess, colour]
    setGuess(newGuess);
    updateGuess(newGuess);
  }

  function handleColourRemove() {
    const newGuess = R.dropLast(1, guess)
    setGuess(newGuess);
    updateGuess(newGuess);
  }

  function handleSubmit() {
    if (guess.length !== codeLength) return
    submitGuess(guess);
    setGuess([]);
  }

  function handleKeypress(event: React.KeyboardEvent) {
    const key = event.key.toLowerCase();
    switch (key) {
      case "enter": handleSubmit(); break;
      case "backspace": handleColourRemove(); break;
      default:
        const colour = colourMap.get(key);
        if (colour !== undefined) handleColourSubmit(colour);
        break;
    }
  }

  return (
    <KeyBoardContainer tabIndex={-1} onKeyDown={handleKeypress}>
        {Array.from(colourMap.entries()).map(pair =>
          <ColourKey colour={pair[1]} onClick={e => handleColourSubmit(pair[1])} >{pair[0]}</ColourKey>
        )}
        <KeyBoardRow />
        <SubmitKey onClick={e => handleColourRemove()}>⌫</SubmitKey>
        <SubmitKey onClick={e => handleSubmit()} >⏎</SubmitKey>
    </KeyBoardContainer>
  )
}

export default Slice