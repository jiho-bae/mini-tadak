import React from 'react';

type OptionProps = {
  value: string | number;
  label: string | number;
};

type SelectProps = {
  name: string;
  options: OptionProps[];
  selected: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const selectStyle = 'w(85%) h(28) pack c(black) placeholder(black)';

const Select = ({ name, options, selected, onChange }: SelectProps): JSX.Element => {
  return (
    <div className="hbox space-between w(100%)">
      <label htmlFor={name}>{name}</label>
      <select id={name} className={selectStyle} onChange={onChange} defaultValue={selected}>
        <option value="">{name} 선택</option>
        {options.map(({ value, label }, idx) => (
          <option key={idx} value={value} className="c(black)">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
