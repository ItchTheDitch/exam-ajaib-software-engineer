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
          className="bg-sky-500/100 w-24 ml-3 border text-white">
          search
        </button>
      </div>
    </>
  );
};
export default SearchInput;
