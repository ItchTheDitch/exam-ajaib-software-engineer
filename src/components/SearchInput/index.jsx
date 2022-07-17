import { BsSearch } from 'react-icons/bs';

const SearchInput = ({ setKeywords, onClickSearch, valueSearch }) => {
  const onSearch = value => {
    setKeywords(value);
  };

  return (
    <>
      <div className="py-3 flex">
        <input
          onInput={e => onSearch(e.target.value)}
          type="text"
          value={valueSearch}
        />
        <button
          onClick={() => onClickSearch()}
          className="bg-sky-500/100 w-10 border text-white flex justify-center items-center">
          <div>
            <BsSearch />
          </div>
        </button>
      </div>
    </>
  );
};
export default SearchInput;
