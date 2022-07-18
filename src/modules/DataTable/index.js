import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  Table,
  SearchInput,
  Filter,
  PaginationComponent,
} from '../../components';
import { callGetRandomUser } from './call';
import { mappingRandomUserData } from './transformer';

const DataTable = () => {
  const [user, setUser] = useState([]);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [keywords, setKeywords] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortingField, setSortingField] = useState('');
  const [sortingOrder, setSortingOrder] = useState('ascend');
  const [currentPage, setCurrentPage] = useState(1);

  const listHeaderTable = [
    { name: 'UserName', field: 'user_name' },
    { name: 'Name', field: 'name' },
    { name: 'Email', field: 'email' },
    { name: 'Gender', field: 'gender' },
    { name: 'Register Date', field: 'register_date' },
  ];

  const fetchRandomUser = useCallback(
    async (param = '') => {
      const defaultParam = `?${
        currentPage === 1 ? 'page=1' : `page=${currentPage}`
      }&pageSize=10&results=10`;
      const resp = await callGetRandomUser(`${defaultParam}&${param}`);

      return resp.results;
    },
    [currentPage]
  );

  useEffect(() => {
    fetchRandomUser();
  }, [fetchRandomUser]);

  const userFromRedux = useSelector(state =>
    _.get(state.http, 'randomUser.response.data.results', [])
  );
  const userData = mappingRandomUserData(userFromRedux);

  useEffect(() => {
    setUser(userData);
  }, [userFromRedux]);

  const searchKeyword = _.debounce(async (keyword = '') => {
    const resp = await fetchRandomUser(
      `?keywords=${keyword}${filter === 'all' ? '' : `&gender=${filter}`}`
    );
    return resp;
  }, 500);

  // console.log('sorting', sorting);
  const setKeywordsSearch = async value => {
    console.log('value search', value);

    setKeywords(value);
    if (value === '') {
      setUser(userData);
    }
    searchKeyword(value);
  };

  const onClickSearch = async () => {
    const resp = await fetchRandomUser(
      `?keywords=${keywords}${filter === 'all' ? '' : `&gender=${filter}`}`
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

  const onChangePagination = async page => {
    setCurrentPage(page);
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
        <div className="flex justify-end mt-3">
          <PaginationComponent
            total={100}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={page => onChangePagination(page)}
          />
        </div>
      </div>
    </>
  );
};

export default DataTable;
