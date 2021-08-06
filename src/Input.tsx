import { useState } from 'react';
interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataField: number | string;
}
const Input: React.FC<InputProps> = ({ onChange, dataField }) => {
  const [input, setInput] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    const input = event.target.value;
    if (input === '') {
      setInput('');
    } else {
      const number = parseInt(input);
      if (Number.isNaN(number)) {
        setInput('');
      } else if (Number.isInteger(number)) {
        setInput(`${number}`);
      }
    }
  };

  return (
    <div className="code-container">
      <input
        className="code-input"
        type="tel"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        maxLength={1}
        value={input}
        onChange={handleChange}
        data-field={dataField}
        onClick={(event) => event.currentTarget.select()}
      />
    </div>
  );
};

export default Input;
