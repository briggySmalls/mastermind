import React, {useState} from 'react';
import Colour from "./Colour";
import Pizza from './Pizza';
import Keyboard from './Keyboard';
import Completed from './Completed';
import * as R from 'ramda';
import {Score, calculateScore, nullScore} from './data/Score';
import GameState from './data/GameState';
import seedrandom from 'seedrandom';

const codeLength = 4;
const guessCount = 10;

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

const answer = generateAnswer();

function Game() {
  console.log(answer);
  const [index, setIndex] = useState(0);
  const [pizzaStates, setPizzaStates] = useState<PizzaState[]>(Array.from(Array(guessCount).fill(
    {
      guess: Array.from(Array(codeLength)).fill(undefined),
      score: undefined,
    }
  )));
  const [gameState, setGameState] = useState(GameState.RUNNING);

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
    if (score.exact === codeLength) {
      setGameState(GameState.COMPLETE)
    } else if (index === guessCount-1) {
      setGameState(GameState.FAILED)
    }
    setIndex(index+1);
  }

  function overlayComponent(): React.ReactElement {
    switch (gameState) {
      case GameState.RUNNING:
        return (
          <Keyboard codeLength={codeLength} submitGuess={submitGuess} updateGuess={updateGuess} />
        )
      case GameState.COMPLETE:
        return (
          <Completed scores={
            pizzaStates
              .map(s => s.score)
              .filter(s => s !== undefined)
              .map(s => R.defaultTo(nullScore, s))
            } />
        )
      default:
        return (
          <></>
        );
    }
  }

  return (
    <>
      {
        pizzaStates.map((s, i) =>
          <Pizza key={`pizza-${i}`} colours={s.guess} score={s.score} isActive={i >= index} />
        )
      }
      { overlayComponent() }
    </>
  )
}

export default Game