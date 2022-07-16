const renderTableHeader = list => {
  return list.map((item, index) => {
    return (
      <th
        onClick={() => {
          console.log('Filter', item);
        }}
        className="p-3 text-sm font-semibold tracking-wide text-left"
        key={index}>
        {item}
      </th>
    );
  });
};

const renderTableBody = list => {
  return (
    list &&
    list.data &&
    list.data.map((item, index) => {
      return (
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
      );
    })
  );
};

export const DataTable = ({ tableHead, tableBody }) => {
  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <>{renderTableHeader(tableHead)}</>
        </thead>
        <tbody className="bg-white">
          <>{renderTableBody(tableBody)}</>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
