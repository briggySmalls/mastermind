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
  border-radius: 1em;
  background-color: grey;
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

const allColours = Object.values(Colour)
console.log("allColours: "  + allColours)

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

  return (
    <KeyBoardContainer>
        {allColours.map(c =>
          <ColourKey colour={c} onClick={e => handleColourSubmit(c)} />
        )}
        <KeyBoardRow />
        <SubmitKey onClick={e => handleColourRemove()}>Back</SubmitKey>
        <SubmitKey onClick={e => handleSubmit()} >Enter</SubmitKey>
    </KeyBoardContainer>
  )
}

export default Slice