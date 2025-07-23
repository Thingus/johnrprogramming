// Based on https://codeburst.io/getting-started-with-react-and-webassembly-using-hooks-441818c91608
// src/useWasm.js
import { useEffect, useState } from 'react';
import init from 'canvas_exploration'

export const useFlowmap = () => {
  const [wasm_instance, setWasmInstance] = useState(null);
  useEffect(() => {
    init().then((instance) => setWasmInstance(instance))
  }, []);
  return wasm_instance;
}



