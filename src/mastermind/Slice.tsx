import React from 'react';
import styled from 'styled-components';
import Colour from "./Colour"

interface SliceProps {
  colour: Colour;
}

interface SliceContainerProps {
  colour: string;
}

const SliceContainer = styled.div<SliceContainerProps>`
  border: 5px solid white;
  border-radius: 5px;
  background-color: ${props => props.colour};
  width: 3em;
  height: 3em;
`

function Slice({ colour }: SliceProps) {
  return (
    <SliceContainer colour={colour} />
  )
}

export default Slice