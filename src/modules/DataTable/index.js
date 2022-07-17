import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, SearchInput, Filter } from '../../components';
import { callGetRandomUser } from './call';
import { mappingRandomUserData } from './transformer';

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
  const [user, setUser] = useState([]);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [keywords, setKeywords] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('ascend');
  const listHeaderTable = [
    { name: 'UserName', field: 'user_name' },
    { name: 'Name', field: 'name' },
    { name: 'Email', field: 'email' },
    { name: 'Gender', field: 'gender' },
    { name: 'Register Date', field: 'register_date' },
  ];

  const fetchRandomUser = async (param = '') => {
    const defaultParam = '?page=1&pageSize=10&results=10';
    const resp = await callGetRandomUser(`${defaultParam}&${param}`);

    return resp.results;
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const userFromRedux = useSelector(state =>
    _.get(state.http, 'randomUser.response.data.results', [])
  );
  const userData = mappingRandomUserData(userFromRedux);

  useEffect(() => {
    setUser(userData);
  }, [userFromRedux]);

  // console.log('sorting', sorting);
  const setKeywordsSearch = async value => {
    console.log('value search', value);
    setKeywords(value);
    // _.debounce(calculateLayout, 150);
    if (value === '') {
      setUser(userData);
    }
  };

  const onClickSearch = async () => {
    console.log('onClickSearch', keywords);
    // console.log('ruby', user);
    // search input function

    const resp = await callGetRandomUser(
      `?page=1&pageSize=10&results=10&keywords=${keywords}${
        filter === 'all' ? '' : `&gender=${filter}`
      }`
    );
    const results =
      user &&
      user.data.filter(item => {
        return item.name.toLowerCase().startsWith(keywords.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });

    setUser({ data: results });
    return resp.results;
  };

  const onSelectFilter = async value => {
    console.log('value Filter', value);
    setFilter(value);

    const resp = await fetchRandomUser(
      `gender=${value}${keywords === '' ? '' : `&keywords=${keywords}`}`
    );
    return resp.results;
    // const data = mappingRandomUserData(resp.results);
    // console.log('data', data);
  };

  const onSort = async (field, order) => {
    console.log('field', field);
    console.log('order', order);
    setSortingField(field);
    setSortingOrder(order);
    setSorting({ field, order });
    const resp = await fetchRandomUser(
      `sortBy=${field}&order=${order}${
        keywords === '' ? '' : `&keywords=${keywords}`
      }`
    );
    return resp.results;
  };

  const onResetFilter = async () => {
    setFilter('all');
    setKeywords('');
    onSort('', '');
    fetchRandomUser();
  };
  // console.log('user', user);

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
          tableBody={user}
          onSorting={(field, order) => onSort(field, order)}
          sortingField={sortingField}
          sortingOrder={sortingOrder}
        />
      </div>
    </>
  );
};

export default DataTable;
