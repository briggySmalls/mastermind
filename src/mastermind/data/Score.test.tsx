import React from 'react';
import { calculateScore } from './Score';

describe('calculates score correctly', () => {
  it.each([
    ["yybgg", "ygybp", {exact: 1, partial: 3}],
    ["yybbg", "ygybp", {exact: 2, partial: 2}],
    ["yybgp", "ygybp", {exact: 2, partial: 3}],
    ["yyyyy", "ygybp", {exact: 2, partial: 0}],
    ["rrgg", "ypyp", {exact: 0, partial: 0}],
    ["yypp", "ypyp", {exact: 2, partial: 2}],
    ["gypr", "ypyp", {exact: 0, partial: 2}],
  ])(
    `when guessing '%s' for answer '%s' should calculate score %o`,
    (guess, answer, score) => {
    expect(calculateScore(answer, guess)).toEqual(score);
  })
});
