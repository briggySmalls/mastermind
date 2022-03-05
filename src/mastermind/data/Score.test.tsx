import React from 'react';
import { calculateScore, ScoreClass } from './Score';
import Colour from '../Colour';

describe('calculates score correctly', () => {
  it.each([
    [
      [Colour.Yellow, Colour.Yellow, Colour.Blue, Colour.Green, Colour.Green],
      [Colour.Yellow, Colour.Green, Colour.Yellow, Colour.Blue, Colour.Purple],
      {exact: 1, partial: 3}
    ],
    [
      [Colour.Yellow, Colour.Yellow, Colour.Blue, Colour.Blue, Colour.Green],
      [Colour.Yellow, Colour.Green, Colour.Yellow, Colour.Blue, Colour.Purple],
      {exact: 2, partial: 2}
    ],
    [
      [Colour.Yellow, Colour.Yellow, Colour.Blue, Colour.Green, Colour.Purple],
      [Colour.Yellow, Colour.Green, Colour.Yellow, Colour.Blue, Colour.Purple],
      {exact: 2, partial: 3}
    ],
    [
      [Colour.Yellow, Colour.Yellow, Colour.Yellow, Colour.Yellow, Colour.Yellow],
      [Colour.Yellow, Colour.Green, Colour.Yellow, Colour.Blue, Colour.Purple],
      {exact: 2, partial: 0}
    ],
    [
      [Colour.Red, Colour.Red, Colour.Green, Colour.Green],
      [Colour.Yellow, Colour.Purple, Colour.Yellow, Colour.Purple],
      {exact: 0, partial: 0}
    ],
    [
      [Colour.Yellow, Colour.Yellow, Colour.Purple, Colour.Purple],
      [Colour.Yellow, Colour.Purple, Colour.Yellow, Colour.Purple],
      {exact: 2, partial: 2}
    ],
    [
      [Colour.Green, Colour.Yellow, Colour.Purple, Colour.Red],
      [Colour.Yellow, Colour.Purple, Colour.Yellow, Colour.Purple],
      {exact: 0, partial: 2}
    ],
  ])(
    `when guessing '%s' for answer '%s' should calculate score %o`,
    (guess, answer, score) => {
    expect(calculateScore(answer, guess)).toEqual(score);
  })
});

describe('renders score correctly', () => {
  it.each([
    [new ScoreClass(0, 0), `nnnn`],
    [new ScoreClass(1, 0), "⚫️nnn"],
    [new ScoreClass(0, 4), "⚪️⚪️⚪️⚪️"],
    [new ScoreClass(1, 3), "⚫️⚪️⚪️⚪️"],
    [new ScoreClass(2, 2), "⚫️⚫️⚪️⚪️"],
    [new ScoreClass(3, 1), "⚫️⚫️⚫️⚪️"],
    [new ScoreClass(4, 0), "⚫️⚫️⚫️⚫️"],
  ])(
    `handles %o`,
    (score, text) => expect(score.text()).toEqual(text)
  )
})