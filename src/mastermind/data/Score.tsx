import * as R from 'ramda';

export interface Score {
  exact: number;
  partial: number;
}

export const nullScore = {
  exact: 0,
  partial: 0,
};

/**
 * See https://stackoverflow.com/a/2005930/6224353
 * @param answer The answer we're guessing for
 * @param guess The guess
 */
 export function calculateScore<T>(answer: readonly T[], guess: readonly T[]): Score {
  const exact =  R.zipWith((a, g) => a === g, answer, guess).filter(Boolean).length
  const common = R.intersection(answer, guess)
  const matching = R.sum(common.map(c => R.min(
    answer.filter(v => v === c).length,
    guess.filter(v => v === c).length,
  )));
  return {
    exact: exact,
    partial: matching - exact,
  }
}
