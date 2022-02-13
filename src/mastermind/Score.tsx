import styled from 'styled-components';

interface ScoreProps {
  exact: number;
  partial: number;
}

const ScoreBoard = styled.div`
margin-left: 1em;
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

function Score({ exact, partial }: ScoreProps) {
  return (
      <ScoreBoard>
        {Array.from(Array(exact)).map(_ => <ExactMatch />)}
        {Array.from(Array(partial)).map(_ => <PartialMatch />)}
      </ScoreBoard>
  )
}

export default Score