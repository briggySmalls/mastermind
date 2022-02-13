import React from 'react';
import styled from 'styled-components';
import Slice from './Slice';
import Colour from './Colour';
import Score from './Score';

interface Score {
  exact: number;
  partial: number;
}

interface PizzaProps {
  colours: Colour[];
  score?: Score;
}

const Box = styled.div`
display: flex;
align-items: center
`

function Pizza({ colours, score }: PizzaProps) {
  return (
    <>
      <Box>
        {colours.map((c) =>
          <Slice colour={c} />)
        }
        {score && <Score exact={score.exact} partial={score.partial} />}
      </Box>
    </>
  )
}

export default Pizza