import React from 'react';
import styled from 'styled-components';
import Slice from './Slice';
import Colour from './Colour';
import ScoreComponent from './Score';
import { Score } from './data/Score';

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
        {colours.map((c, i) =>
          <Slice key={`slice-${i}`} colour={c} />)
        }
        <ScoreComponent score={score} />
      </Box>
    </>
  )
}

export default Pizza