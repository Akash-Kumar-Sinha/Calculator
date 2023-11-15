import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import '.././App.css';

const Calculator = () => {
  const [output, setOutput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    try {
      const answer = math.evaluate(output.replace(/÷/g, '/'));
      setResult(answer.toString());
    } catch (error) {
      setResult('');
    }
  }, [output]);

  const handleButtonClick = (value) => {
    if (!output && !/\d/.test(value)) {
      return;
    }

    let displayValue = value;

    const lastChar = output.slice(-1);
    if (/[\+\-\*\.\÷]/.test(lastChar) && /[\+\-\*\.\÷]/.test(value)) {
      return;
    }

    if (value === '/') {
      displayValue = '÷';
    }

    setOutput((currentOutput) => currentOutput + displayValue);
  };

  const handleDeleteClick = () => {
    setOutput((currentOutput) => currentOutput.slice(0, -1));
  };

  const handleClearClick = () => {
    setOutput('');
    setResult('');
  };

  const handleEqualsClick = () => {
    // No need to update the result here since it's handled by useEffect
  };

  return (
    <div className="Calculator">
    <div className="notch"></div>
      <div className="border flexed space">
        <div className="PreviousResult">{output}</div>
        <div className="Result">{result}</div>
      </div>

      <div className="border button">
        <div className="number">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map((num) => (
            <button
              key={num}
              className="normal"
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </button>
          ))}
          <button className="normal" onClick={handleEqualsClick}>
            =
          </button>
        </div>

        <div className="logo">
          <button className="special" onClick={handleDeleteClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-backspace-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z" />
            </svg>
          </button>
          <button className="special ding" onClick={handleClearClick}>
            <strong>Clr</strong>
          </button>
          {['-', '÷', '*', '+'].map((operator) => (
            <button
              key={operator}
              className="special"
              onClick={() => handleButtonClick(operator)}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
