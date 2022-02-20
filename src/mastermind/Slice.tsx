import React from 'react';
import styled from 'styled-components';
import Colour from "./Colour"

interface SliceProps {
  colour?: Colour;
}

interface SliceContainerProps {
  colour?: string;
}

const SliceContainer = styled.div<SliceContainerProps>`
  border: 0.2em solid white;
  border-radius: 20%;
  background-color: ${props => props.colour ?? "grey" };
  width: 3em;
  height: 3em;
  margin: 0.7em 0.3em;
`

function Slice({ colour }: SliceProps) {
  return (
    <SliceContainer key={`slice-${colour}`} colour={colour} />
  )
}

export default Slice