import React, { useState } from 'react';
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

const ShareButton = styled.button`
`;

function displayText(length: number) {
  return `You completed it in ${length} ${length === 1 ? "attempt" : "attempts"}`;
}

function shareText(scores: readonly Score[]) {
  const scoresText = scores.map(s => s.text()).join("\n");
  return `Pizza ${(new Date()).toLocaleDateString()}
${scoresText}
https://pippyjames.pizza
  `
}

function CompletedModal({ scores }: CompletedProps) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Box>
      <p>🎉 ¡Congratulations! 🎉</p>
      <p>{displayText(scores.length)}</p>
      <ShareButton onClick={() => {
          navigator.clipboard.writeText(shareText(scores));
          setIsCopied(true);
        }}>
        Share!
      </ShareButton>
      { isCopied && 
        <p>Score copied to clipboard!</p>
      }
    </Box>
  )
}

export default CompletedModal