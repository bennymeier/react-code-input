import React, { useEffect, useState } from 'react';
import Input from './Input';

const App = () => {
  const [currentField, setCurrentField] = useState<HTMLInputElement>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.currentTarget;
    const fieldId = field.getAttribute('data-field') as string;
    const fieldIdNr = parseInt(fieldId);
    const nextFieldIdNr = fieldIdNr === 5 ? -1 : fieldIdNr + 1;
    const nextField = document.body.querySelector(
      `input[data-field='${nextFieldIdNr}']`
    ) as HTMLInputElement;
    if (nextFieldIdNr !== -1) {
      nextField.focus();
      nextField.select();
      setCurrentField(nextField);
    }
  };

  const getField = (dir: 'l' | 'r' = 'r') => {
    const fieldId = (currentField as HTMLInputElement).getAttribute(
      'data-field'
    ) as string;
    const fieldIdNr = parseInt(fieldId);
    let nextFieldIdNr = fieldIdNr;
    if (dir === 'l' && nextFieldIdNr !== 0) {
      nextFieldIdNr = nextFieldIdNr - 1;
    } else if (dir === 'r' && nextFieldIdNr !== 5) {
      nextFieldIdNr = nextFieldIdNr + 1;
    }
    const nextField = document.body.querySelector(
      `input[data-field='${nextFieldIdNr}']`
    ) as HTMLInputElement;
    setCurrentField(nextField);
    return nextField;
  };

  const arrowKeyListener = (event: KeyboardEvent) => {
    let field: HTMLInputElement;
    if (event.key === 'ArrowLeft') {
      field = getField('l');
      if (field) {
        field.focus();
        field.select();
      }
    } else if (event.key === 'ArrowRight') {
      field = getField();
      if (field) {
        field.focus();
        field.select();
      }
    }
  };

  const addEventListeners = () => {
    document.body.addEventListener('keydown', arrowKeyListener);
  };
  const removeEventListeners = () => {
    document.body.removeEventListener('keydown', arrowKeyListener);
  };
  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentField]);

  useEffect(() => {
    const firstField = document.body.querySelector(
      "input[data-field='0']"
    ) as HTMLInputElement;
    if (firstField) {
      setCurrentField(firstField);
      firstField.focus();
    }
  }, []);
  return (
    <div className="container">
      {[...Array(6)].map((_, i) => (
        <Input key={i} onChange={handleChange} dataField={i} />
      ))}
    </div>
  );
};

export default App;
