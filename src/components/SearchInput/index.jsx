const SearchInput = ({ setKeywords }) => {
  return (
    <>
      <h5 className="font-bold mb-2">Search</h5>
      <div className="py-3  border-b flex">
        <input onInput={e => setKeywords(e.target.value)} type="text" />
        <button className="ml-3 border"> search</button>
      </div>
    </>
  );
};
export default SearchInput;
