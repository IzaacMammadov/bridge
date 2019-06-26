import React, { useState, useRef } from 'react';

import useInterval from 'lib/useInterval';

// TODO: make these characters display as the same width
export const kLoadingCharacter = '▓';
export const kInterstitialCharacter = '░';
const kBlinkAfterMs = 2500; // ms

export const matchBlinky = obj =>
  obj.matchWith({
    Nothing: () => <Blinky />,
    Just: p => p.value,
  });

export default function Blinky({
  a = kLoadingCharacter,
  b = kInterstitialCharacter,
}) {
  const [value, setValue] = useState(true);
  const now = useRef(new Date());

  useInterval(() => {
    // only start blinking if we've elapsed enough time
    if (new Date() - now.current > kBlinkAfterMs) {
      setValue(val => !val);
    }
  }, 1000);

  return value ? a : b;
}
