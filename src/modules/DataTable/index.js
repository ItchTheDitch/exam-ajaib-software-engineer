import { useState } from 'react';
import Table from '../../components/Table';
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
  const listHeaderTable = [
    { name: 'UserName', field: 'user_name' },
    { name: 'Name', field: 'name' },
    { name: 'Email', field: 'email' },
    { name: 'Gender', field: 'gender' },
    { name: 'Register Date', field: 'register_date' },
  ];
  // console.log('sorting', sorting);
  return (
    <div className="p-5 h-screen bg-gray-100">
      <Table
        tableHead={listHeaderTable}
        tableBody={DUMMYDATA}
        onSorting={(field, order) => setSorting({ field, order })}
      />
    </div>
  );
};

export default DataTable;
