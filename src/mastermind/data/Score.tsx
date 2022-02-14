import * as R from 'ramda';

export interface Score {
  exact: number;
  partial: number;
}

/**
 * See https://stackoverflow.com/a/2005930/6224353
 * @param answer The answer we're guessing for
 * @param guess The guess
 */
 export function calculateScore(answer: String, guess: String): Score {
  const ansArr = answer.split('');
  const guessArr = guess.split('');
  const exact =  R.zipWith((a, g) => a === g, ansArr, guessArr).filter(Boolean).length
  const common = R.intersection(ansArr, guessArr)
  const matching = R.sum(common.map(c => R.min(
    ansArr.filter(v => v === c).length,
    guessArr.filter(v => v === c).length,
  )));
  return {
    exact: exact,
    partial: matching - exact,
  }
}
