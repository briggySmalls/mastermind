import React from 'react';
import { calculateScore } from './Score';

test('calculates score correctly', () => {
  const params = [
    {guess: "yybgg", answer: "ygybp", score: {exact: 1, partial: 3}},
    {guess: "yybbg", answer: "ygybp", score: {exact: 2, partial: 2}},
    {guess: "yybgp", answer: "ygybp", score: {exact: 2, partial: 3}},
    {guess: "yyyyy", answer: "ygybp", score: {exact: 2, partial: 0}},
  ]
  params.forEach(({guess, answer, score}) => {
    expect(calculateScore(answer, guess)).toEqual(score);
  })
});
