import React, {useState} from 'react';
import styled from 'styled-components';
import Colour from "./Colour"

interface SliceProps {
}

function Slice(props: SliceProps) {
  const [colour, setColour] = useState(Colour.Blue);

  const SliceContainer = styled.div`
    border: 5px solid white;
    border-radius: 5px;
    background-color: ${colour};
    width: 3em;
    height: 3em;
  `
  function handleKeyPress(event: React.KeyboardEvent) {
    switch (event.key.toLowerCase()) {
      case "r": setColour(Colour.Red); break;
      case "g": setColour(Colour.Green); break;
      case "b": setColour(Colour.Blue); break;
      case "p": setColour(Colour.Purple); break;
      case "y": setColour(Colour.Yellow); break;
    }
  }

  return (
    <SliceContainer tabIndex={1} onKeyDown={handleKeyPress} />
  )
}

export default Slice