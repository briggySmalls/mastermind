import { all } from 'ramda';
import React from 'react';
import styled from 'styled-components';
import Colour from "./Colour"

const KeyBoardContainer = styled.div`
  position: sticky;
  bottom: 1em;
  display: flex;
  border-radius: 1em;
  background-color: grey;
`

const ColourKey = styled.button<{colour: Colour}>`
  background-color: ${props => props.colour};
  display: inline-block;
  margin: 1em;  
  width: 3em;
  height: 3em;
  border-radius: 50%;
`

const allColours = Object.values(Colour)
console.log("allColours: "  + allColours)

function Slice() {
  return (
    <KeyBoardContainer>
      {allColours.map(c =>
        <ColourKey colour={c} />
      )}
    </KeyBoardContainer>
  )
}

export default Slice