import { useState, useEffect } from "react";

function useVisualMode (initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (nextMode, replace = false) => {
    if(replace) {
      setHistory((prev) => [...prev].slice(0, prev.length - 1))
    }

    setHistory((prev) => [...prev, nextMode]);

    // setMode(nextMode);
    // console.log("transition: ", setMode(nextMode));
    // return setHistory([...history, nextMode]);
  }
  
  const back = () => {
    // const historyCopy = [...history]
    if(history.length > 1) {
      setHistory([...history].slice(0, history.length - 1))
    }
  }
  
  useEffect(() => {
    setMode(history[history.length - 1])
  }, [history])

  return ({ mode, transition, back })

}

export default useVisualMode;