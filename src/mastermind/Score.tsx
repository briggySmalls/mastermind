import styled from 'styled-components';
import { Score } from './data/Score';

interface ScoreProps {
  score?: Score;
}

const markerWidth = 1;

const ScoreBoard = styled.div`
  margin-left: 1em;
  width: ${markerWidth * 2}em;
  height: ${markerWidth * 2}em;
  border: 0.1em solid white;
  border-radius: 20%;
  display: flex;
  flex-wrap: wrap;
`

const Match = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
`

const ExactMatch = styled(Match)`
  background-color: red;
`
const PartialMatch = styled(Match)`
  background-color: white;
`

function ScoreComponent({ score }: ScoreProps) {
  return (
    <ScoreBoard>
      {score && Array.from(Array(score.exact)).map(_ => <ExactMatch />)}
      {score && Array.from(Array(score.partial)).map(_ => <PartialMatch />)}
    </ScoreBoard>
  )
}

export default ScoreComponent