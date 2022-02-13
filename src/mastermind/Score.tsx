import styled from 'styled-components';

interface ScoreProps {
  exact: number;
  partial: number;
}

const ScoreBoard = styled.ul`
`
const ExactMatch = styled.li`
color: red;
`
const PartialMatch = styled.li`
color: white;
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