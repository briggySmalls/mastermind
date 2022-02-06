import React from 'react';
import styled from 'styled-components';
import Slice from './Slice';


function Pizza() {
  const Box = styled.div`
    display: flex;
  `
  return (
    <Box>
      {Array.from(Array(5).keys()).map((n) =>
        <Slice />)
      }
    </Box>
  )
}

export default Pizza