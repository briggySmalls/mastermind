import React, {useState} from 'react';
import styled from 'styled-components';
import Slice from './Slice';
import Colour from "./Colour";


const validChars = ["r", "g", "b", "p", "y"];
const charCount = 5;

const Container = styled.div`
  position: relative;
`

const Box = styled.div`
  display: flex;
`
const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  // color: transparent;
`

function textToColours(text: String) {
  return text.padEnd(charCount, "n").split('').map(c => {
    switch (c) {
      case "r": return Colour.Red
      case "g": return Colour.Green
      case "b": return Colour.Blue
      case "p": return Colour.Purple
      case "y": return Colour.Yellow
      case "n": return Colour.Grey
      default: return Colour.Grey
    }
  })
}

function Pizza() {
  const [text, setText] = useState("");

  let colours = textToColours(text);

  return (
    <Container key="pizza">
      <Box>
        {colours.map((c) =>
          <Slice colour={c} />)
        }
      </Box>
      <Input key="input"
        type="text"
        maxLength={5}
        onChange={e => setText(e.target.value)}
        value={text}
        />
    </Container>
  )
}

export default Pizza