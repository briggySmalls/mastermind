import React, {useState} from 'react';
import styled from 'styled-components';
import Colour from "./Colour";
import Pizza from './Pizza';
import Keyboard from './Keyboard';
import * as R from 'ramda';
import {Score, calculateScore} from './data/Score';
import seedrandom from 'seedrandom';

const codeLength = 4;
const guessCount = 10;

const Input = styled.input`
  margin: 3em;
`

interface PizzaState {
  guess: readonly (Colour | undefined)[];
  score?: Score;
}

function generateAnswer(): readonly Colour[] {
  let today = new Date();
  let myrng = seedrandom(today.toDateString());
  const allColours = Object.values(Colour)
  return Array.from(Array(codeLength)).map(_ => allColours[Math.floor(myrng() * allColours.length)]);
}

function Game() {
  const answer = generateAnswer();
  console.log(answer);
  const [index, setIndex] = useState(0);
  const [pizzaStates, setPizzaStates] = useState<PizzaState[]>(Array.from(Array(guessCount).fill(
    {
      guess: Array.from(Array(codeLength)).fill(undefined),
      score: undefined,
    }
  )));
  const [isEnded, setIsEnded] = useState(false);

  function updateGuess(guess: readonly Colour[]) {
    console.log(guess);
    const newGuess: readonly (Colour | undefined)[] = R.times((i) => i < guess.length ? guess[i] : undefined, codeLength);
    setPizzaStates(
      R.adjust(
        index,
        (s: PizzaState) => {
          return {
            guess: newGuess,
            score: undefined,
          }
        },
        pizzaStates
      )
    )
  }

  function submitGuess(guess: readonly Colour[]) {
    const score = calculateScore(answer, guess)
    let newStates = R.adjust(
      index,
      (s: PizzaState) => {
        return {
          guess: guess,
          score: score,
        }
      },
      pizzaStates
    );
    setPizzaStates(newStates);
    // Iterate
    if (score.exact === codeLength || index === guessCount-1) {
      setIsEnded(true)
    }
    setIndex(index+1);
  }

  return (
    <>
      {
        pizzaStates.map((s, i) =>
          <Pizza key={`pizza-${i}`} colours={s.guess} score={s.score} isActive={i >= index} />
        )
      }
      <Keyboard codeLength={codeLength} submitGuess={submitGuess} updateGuess={updateGuess} />
    </>
  )
}

export default Game