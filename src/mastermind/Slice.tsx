import React, {useState} from 'react';
import styled from 'styled-components';
import Colour from "./Colour"

interface SliceProps {
  colour: Colour;
}

function Slice({ colour }: SliceProps) {
  const SliceContainer = styled.div`
    border: 5px solid white;
    border-radius: 5px;
    background-color: ${colour};
    width: 3em;
    height: 3em;
  `

  return (
    <SliceContainer/>
  )
}

export default Slice