import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const RenderTableHeader = (header, sortingField, sortingOrder, onSorting) => {
  // const [sortingField, setSortingField] = useState('');
  // const [sortingOrder, setSortingOrder] = useState('ascend');

  const onSortingChange = field => {
    console.log('fielddddd', field);
    const order =
      field === sortingField && sortingOrder === 'ascend'
        ? 'descend'
        : 'ascend';

    console.log('orderrrr', order);
    // console.log('sortingField', sortingField);
    // console.log('sortingOrder', sortingOrder);

    // setSortingField(field);
    // setSortingOrder(order);
    onSorting(field, order);
  };
  return header.map((item, index) => {
    return (
      <>
        <th
          onClick={() => {
            onSortingChange(item.field);
          }}
          className="p-3 text-sm font-semibold tracking-wide text-left cursor-pointer"
          key={index}>
          {item.name}
          <>
            {sortingField && sortingField === item.field && (
              <FontAwesomeIcon
                icon={sortingOrder === 'ascend' ? faArrowDown : faArrowUp}
                className="ml-2"
                size="xs"
              />
            )}
          </>
        </th>
      </>
    );
  });
};

const renderTableBody = list => {
  return (
    list &&
    list.data &&
    list.data.map((item, index) => {
      return (
        <tbody key={index} className="bg-white">
          <tr key={index}>
            <td className="p-3 text-sm font-semibold tracking-wide text-left">
              {item.userName}
            </td>
            <td className="p-3 text-sm font-semibold tracking-wide text-left">
              {item.name}
            </td>
            <td className="p-3 text-sm font-semibold tracking-wide text-left">
              {item.email}
            </td>
            <td className="p-3 text-sm font-semibold tracking-wide text-left">
              {item.gender}
            </td>
            <td className="p-3 text-sm font-semibold tracking-wide text-left">
              {item.register_date}
            </td>
          </tr>
        </tbody>
      );
    })
  );
};

export const Table = ({
  tableHead,
  tableBody,
  sortingField,
  sortingOrder,
  onSorting,
}) => {
  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <>
            {RenderTableHeader(
              tableHead,
              sortingField,
              sortingOrder,
              onSorting
            )}
          </>
        </thead>
        {renderTableBody(tableBody)}
      </table>
    </div>
  );
};

export default Table;
