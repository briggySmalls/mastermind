import React from 'react';
import styled from 'styled-components';
import { Score } from './data/Score';

interface CompletedProps {
  scores: readonly Score[];
}

const Box = styled.div`
  position: fixed;
  top: 0%;
  transform: translateY(50%);
  background-color: #282c34;
  padding: 3em;
  border: 0.1em solid white;
  border-radius: 1em;
`

function displayText(length: number) {
  return `You completed it in ${length} ${length === 1 ? "attempt" : "attempts"}`;
}

function CompletedModal({ scores }: CompletedProps) {
  return (
    <Box>
      <p>🎉 ¡Congratulations! 🎉</p>
      <p>{displayText(scores.length)}
      </p>
    </Box>
  )
}

export default CompletedModal