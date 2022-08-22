import { TiDelete } from 'react-icons/ti';
import { SEARCH_BAR } from 'src/utils/styleConstant';

interface SearchBarProps {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset: () => void;
}

function SearchBar({ search, onChange, onReset }: SearchBarProps): JSX.Element {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <form className="ml(30) pack relative" onSubmit={onSubmitForm}>
      <input
        type="text"
        onChange={onChange}
        value={search}
        placeholder="방 제목을 검색하세요."
        className="font(1.8rem) w(100%) "
      />
      <TiDelete className="hover:opacity(0.8)" style={SEARCH_BAR.initBtn} onClick={onReset} />
    </form>
  );
}

export default SearchBar;
