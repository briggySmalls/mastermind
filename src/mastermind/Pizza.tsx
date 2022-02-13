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
`

function Pizza({ colours, score }: PizzaProps) {
  return (
    <>
      <Box>
        {colours.map((c) =>
          <Slice colour={c} />)
        }
      </Box>
      {score && <Score exact={score.exact} partial={score.partial} />}
    </>
  )
}

export default Pizza