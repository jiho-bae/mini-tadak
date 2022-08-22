import React, { useCallback } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

export default function useInput(initialState: RecoilState<string>): [string, typeof onChange, typeof onReset] {
  const [input, setInput] = useRecoilState(initialState);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInput(() => e.target.value),
    [setInput],
  );
  const onReset = useCallback(() => setInput(() => ''), [setInput]);

  return [input, onChange, onReset];
}
