const Filter = ({ onSelectFilter, value }) => {
  const selectFilter = value => {
    onSelectFilter(value);
  };

  console.log('value', value);
  return (
    <div className="py-3 ml-2 w-24">
      <select
        value={value}
        onChange={e => selectFilter(e.target.value)}
        className="form-select appearance-none block w-full px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded"
        id="gender">
        <option value="All">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default Filter;
