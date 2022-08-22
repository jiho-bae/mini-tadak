export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  children?: React.ReactNode;
  maxLength: number;
  autoComplete?: string;
  value: string;
}

const inputStyle = 'w(85%) h(28) pack c(black) placeholder(black)';

const Input = (props: InputProps): JSX.Element => {
  const { name } = props;

  return (
    <div className="hbox space-between w(100%)">
      <label htmlFor={name}>{name}</label>
      <input className={inputStyle} id={name} {...props} />
    </div>
  );
};

export default Input;
