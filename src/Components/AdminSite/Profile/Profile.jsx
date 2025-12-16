import React, { useEffect, useState } from 'react';
import * as API from "../../Endpoint/Endpoint";
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axiosInstance.get(API.PROFILE)
      .then((res) => setData(res.data))
      .catch((err) => {
        const message = err.response?.data?.message || "Failed to fetch profile.";
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <h1 className="text-center text-xl font-semibold">Loading...</h1>;

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-red-500">{error}</p>
        <button onClick={getData} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex justify-center">
        {data?.image ? (
          <img src={`http://localhost:5351/${data.image}`} alt="User" className="w-40 h-40 rounded-full object-cover border" />
        ) : (
          <p>No profile image available.</p>
        )}
      </div>

      <div className="space-y-2 text-gray-700">
        <div><strong>Name:</strong> {data?.name || 'N/A'}</div>
        <div><strong>Email:</strong> {data?.email || 'N/A'}</div>
        <div><strong>Mobile:</strong> {data?.mobileNumber || 'N/A'}</div>
        <div><strong>Address:</strong> {data?.address || 'N/A'}</div>
        <div><strong>City:</strong> {data?.city || 'N/A'}</div>
        <div><strong>State:</strong> {data?.state || 'N/A'}</div>
        <div><strong>Country:</strong> {data?.country || 'N/A'}</div>
        <div><strong>Postal Code:</strong> {data?.postalCode || 'N/A'}</div>
      </div>
    </div>
  );
};

export default Profile;

