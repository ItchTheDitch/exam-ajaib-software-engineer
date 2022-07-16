import { useState } from 'react';
import { Table, SearchInput, Filter } from '../../components';
import dynamic from 'next/dynamic';

const DUMMYDATA = {
  data: [
    {
      id: 1,
      userName: 'John Doe',
      name: 'John Doe',
      email: 'JohnDoe@email.com',
      gender: 'male',
      register_date: '04-01-2004:17.50',
    },
    {
      id: 2,
      userName: 'Sarah Doe',
      name: 'Sarah Doe',
      email: 'SarahDoe@email.com',
      gender: 'female',
      register_date: '04-01-2004:17.50',
    },
    {
      id: 3,
      userName: 'Lexi ',
      name: 'Lexi Doe',
      email: 'LexiDoe@email.com',
      gender: 'female',
      register_date: '04-01-2004:17.50',
    },
    {
      id: 4,
      userName: 'Thor',
      name: 'Thor Doe',
      email: 'ThorDoe@email.com',
      gender: 'Male',
      register_date: '04-01-2004:17.50',
    },
    {
      id: 5,
      userName: 'Luna ',
      name: 'Luna Doe',
      email: 'LunaDoe@email.com',
      gender: 'female',
      register_date: '04-01-2004:17.50',
    },
  ],
};
const DataTable = () => {
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [keywords, setKeywords] = useState('');
  const [filter, setFilter] = useState('all');
  const listHeaderTable = [
    { name: 'UserName', field: 'user_name' },
    { name: 'Name', field: 'name' },
    { name: 'Email', field: 'email' },
    { name: 'Gender', field: 'gender' },
    { name: 'Register Date', field: 'register_date' },
  ];
  // console.log('sorting', sorting);
  const setKeywordsSearch = value => {
    console.log('value search', value);
    setKeywords(value);
  };

  const onClickSearch = () => {
    console.log('onClickSearch', keywords);
  };

  const onSelectFilter = value => {
    console.log('value Filter', value);
    setFilter(value);
  };

  const onResetFilter = () => {
    setFilter('all');
    setKeywords('');
  };

  return (
    <>
      <div className="p-5 h-screen bg-gray-100">
        <div className="flex">
          <div>
            <h5 className="font-bold mb-2">Search</h5>
            <SearchInput
              setKeywords={e => setKeywordsSearch(e)}
              onClickSearch={() => onClickSearch()}
              valueSearch={keywords}
            />
          </div>
          <div className="ml-3">
            <h5 className="font-bold mb-2">Gender</h5>
            <Filter onSelectFilter={e => onSelectFilter(e)} value={filter} />
          </div>
          <div className="self-end mb-3 ml-2 border px-3 bg-white">
            <button onClick={() => onResetFilter()}>Reset Filter</button>
          </div>
        </div>
        <Table
          tableHead={listHeaderTable}
          tableBody={DUMMYDATA}
          onSorting={(field, order) => setSorting({ field, order })}
        />
      </div>
    </>
  );
};

export default DataTable;
