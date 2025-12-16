import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReusableTable from '../utils/ReusableTable';
import * as API from '../../Endpoint/Endpoint';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [columns, setColumns] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API.GETALLUSERS, {
        params: {
          search: search,
          page: page,
          limit: limit
        }
      });
      const usersData = response.data.users;
      setUsers(usersData);
      setTotalPages(response.data.totalPages);

      if (usersData.length > 0) {
        const keys = Object.keys(usersData[0]);
        const dynamicColumns = keys.map(key => ({
          header: key.charAt(0).toUpperCase() + key.slice(1),
          accessor: key
        }));
        setColumns(dynamicColumns);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <input
        type="text"
        placeholder="Search by name, email, or mobile..."
        value={search}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <ReusableTable columns={columns} data={users} />
      <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className={`px-4 py-2 rounded ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded ${page >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
