import React from 'react';

type OptionProps = {
  value: string | number;
  label: string | number;
};

type SelectProps = {
  name: string;
  options: OptionProps[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const selectStyle = 'w(100%) h(28) pack border(1px/solid/grey) br(10) c(black) placeholder(black)';

const Select = ({ name, options, onChange }: SelectProps): JSX.Element => {
  return (
    <select className={selectStyle} onChange={onChange} defaultValue="">
      <option value="">{name} 선택</option>
      {options.map(({ value, label }, idx) => (
        <option key={idx} value={value} className="c(black)">
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
