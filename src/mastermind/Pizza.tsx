import React from 'react';
import styled from 'styled-components';
import Slice from './Slice';
import Colour from './Colour';
import ScoreComponent from './Score';
import { Score } from './data/Score';

interface PizzaProps {
  colours: readonly (Colour | undefined)[];
  score?: Score;
  isActive: Boolean;
}

const Box = styled.div<{isActive: Boolean}>`
  display: flex;
  align-items: center;
`

function Pizza({ colours, score, isActive }: PizzaProps) {
  return (
    <>
      <Box isActive={isActive}>
        {colours.map((c, i) =>
          <Slice key={`slice-${i}`} colour={c} />)
        }
        <ScoreComponent score={score} />
      </Box>
    </>
  )
}

export default Pizza