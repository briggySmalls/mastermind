import React from 'react';
import styled from 'styled-components';
import Slice from './Slice';
import Colour from "./Colour";

interface PizzaProps {
  colours: Colour[];
}

const Box = styled.div`
  display: flex;
`

function Pizza({ colours }: PizzaProps) {
  return (
    <>
      <Box>
        {colours.map((c) =>
          <Slice colour={c} />)
        }
      </Box>
    </>
  )
}

export default Pizza