
import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookies from 'js-cookie';  // ✅ Import js-cookie
import toast, { Toaster } from 'react-hot-toast';
import { PRODUCT_CATEGORY } from '../../Endpoint/Endpoint';

const ProductCategories = () => {
  // State Management
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    CategoryName: '',
    Description: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // ✅ Get token from cookies instead of localStorage
  const getAuthToken = () => Cookies.get('accessToken') || '';

  // Axios Config
  const getAxiosConfig = () => ({
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });

  // Fetch Categories
  const fetchCategories = async (limit = 10, offset = 0, search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        PRODUCT_CATEGORY.GET_ALL(limit, offset, search),
        getAxiosConfig()
      );
      
      if (response.data) {
        setCategories(response.data.data || []);
        setPagination(response.data.pagination || {});
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchCategories(pagination.limit, pagination.offset, searchTerm);
  }, []);

  // Search Handler with Debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCategories(pagination.limit, 0, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Form Validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.CategoryName.trim()) {
      errors.CategoryName = 'Category name is required';
    } else if (formData.CategoryName.length > 100) {
      errors.CategoryName = 'Category name must not exceed 100 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create Category
  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        PRODUCT_CATEGORY.CREATE,
        formData,
        getAxiosConfig()
      );
      
      toast.success('Category created successfully!');
      setShowCreateModal(false);
      resetForm();
      fetchCategories(pagination.limit, pagination.offset, searchTerm);
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error(error.response?.data?.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        PRODUCT_CATEGORY.UPDATE(selectedCategory.Id),
        formData,
        getAxiosConfig()
      );
      
      toast.success('Category updated successfully!');
      setShowEditModal(false);
      resetForm();
      fetchCategories(pagination.limit, pagination.offset, searchTerm);
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(error.response?.data?.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        PRODUCT_CATEGORY.SOFT_DELETE(selectedCategory.Id),
        getAxiosConfig()
      );
      
      toast.success('Category deleted successfully!');
      setShowDeleteModal(false);
      setSelectedCategory(null);
      fetchCategories(pagination.limit, pagination.offset, searchTerm);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  // Export to CSV
  const handleExport = () => {
    if (categories.length === 0) {
      toast.error('No data to export');
      return;
    }

    const csvContent = [
      ['ID', 'Category Name', 'Description', 'Created At'],
      ...categories.map(cat => [
        cat.Id,
        cat.CategoryName,
        cat.Description || '',
        new Date(cat.CreatedAt).toLocaleDateString()
      ])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `product-categories-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('Categories exported successfully!');
  };

  // Reset Form
  const resetForm = () => {
    setFormData({ CategoryName: '', Description: '' });
    setFormErrors({});
    setSelectedCategory(null);
  };

  // Open Edit Modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      CategoryName: category.CategoryName,
      Description: category.Description || ''
    });
    setShowEditModal(true);
  };

  // Open Delete Modal
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  // Open View Modal
  const openViewModal = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  // Pagination Handlers
  const handlePageChange = (newPage) => {
    const newOffset = (newPage - 1) * pagination.limit;
    fetchCategories(pagination.limit, newOffset, searchTerm);
  };

  const handleLimitChange = (newLimit) => {
    fetchCategories(newLimit, 0, searchTerm);
  };

  // Format Date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />
      
      <section className="py-1 bg-blueGray-50 min-h-screen">
        <div className="w-full xl:w-10/12 px-4 mx-auto mt-6">
          {/* Header Card */}
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <h6 className="text-blueGray-700 text-2xl font-bold">
                    Product Categories
                  </h6>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {pagination.total} Total
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => fetchCategories(pagination.limit, pagination.offset, searchTerm)}
                    className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center gap-2"
                    disabled={loading}
                  >
                    <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                  
                  <button
                    onClick={handleExport}
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center gap-2"
                    disabled={categories.length === 0}
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    Export CSV
                  </button>
                  
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Category
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 pb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="border-0 px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Search by category name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      ID
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Category Name
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Description
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Created At
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                          <span className="ml-2 text-blueGray-500">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-blueGray-500">
                          <ExclamationTriangleIcon className="h-12 w-12 mb-2 text-blueGray-300" />
                          <p className="text-lg font-semibold">No categories found</p>
                          <p className="text-sm">
                            {searchTerm ? 'Try adjusting your search' : 'Click "Add Category" to create one'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category.Id} className="hover:bg-blueGray-50 transition-colors">
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span className="font-bold text-blueGray-600">{category.Id}</span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span className="font-semibold text-blueGray-700">
                            {category.CategoryName}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 max-w-xs">
                          <span className="text-blueGray-500">
                            {category.Description 
                              ? category.Description.length > 60 
                                ? category.Description.substring(0, 60) + '...' 
                                : category.Description
                              : <span className="italic text-blueGray-400">No description</span>
                            }
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span className="text-blueGray-500">
                            {formatDate(category.CreatedAt)}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => openViewModal(category)}
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(category)}
                              className="text-green-500 hover:text-green-700 transition-colors"
                              title="Edit Category"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(category)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Delete Category"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.total > 0 && (
              <div className="px-6 py-4 border-t border-blueGray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blueGray-600">Show:</label>
                    <select
                      value={pagination.limit}
                      onChange={(e) => handleLimitChange(Number(e.target.value))}
                      className="border-0 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span className="text-sm text-blueGray-600">
                      Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevious}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Previous
                    </button>
                    
                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                              page === pagination.currentPage
                                ? 'text-white bg-pink-500 shadow-md'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === pagination.currentPage - 2 ||
                        page === pagination.currentPage + 2
                      ) {
                        return <span key={page} className="px-2 text-gray-500">...</span>;
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-blueGray-700">Create New Category</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6">
              <div className="mb-4">
                <label className="block text-blueGray-600 text-sm font-bold mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.CategoryName}
                  onChange={(e) => setFormData({ ...formData, CategoryName: e.target.value })}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
                    formErrors.CategoryName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter category name"
                  maxLength="100"
                />
                {formErrors.CategoryName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.CategoryName}</p>
                )}
                <p className="text-blueGray-400 text-xs mt-1">
                  {formData.CategoryName.length}/100 characters
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-blueGray-600 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={formData.Description}
                  onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Enter description (optional)"
                  rows="4"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="bg-gray-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-pink-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-blueGray-700">Edit Category</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6">
              <div className="mb-4">
                <label className="block text-blueGray-600 text-sm font-bold mb-2">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.CategoryName}
                  onChange={(e) => setFormData({ ...formData, CategoryName: e.target.value })}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${
                    formErrors.CategoryName ? 'ring-2 ring-red-500' : ''
                  }`}
                  placeholder="Enter category name"
                  maxLength="100"
                />
                {formErrors.CategoryName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.CategoryName}</p>
                )}
                <p className="text-blueGray-400 text-xs mt-1">
                  {formData.CategoryName.length}/100 characters
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-blueGray-600 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={formData.Description}
                  onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Enter description (optional)"
                  rows="4"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="bg-gray-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedCategory && (
        <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-blueGray-700">Category Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start">
                <span className="inline-block w-32 text-blueGray-600 text-sm font-bold">ID:</span>
                <span className="text-blueGray-700 font-semibold">{selectedCategory.Id}</span>
              </div>

              <div className="flex items-start">
                <span className="inline-block w-32 text-blueGray-600 text-sm font-bold">Category Name:</span>
                <span className="text-blueGray-700 font-semibold">{selectedCategory.CategoryName}</span>
              </div>

              <div className="flex items-start">
                <span className="inline-block w-32 text-blueGray-600 text-sm font-bold">Description:</span>
                <span className="text-blueGray-700 flex-1">
                  {selectedCategory.Description || <span className="italic text-blueGray-400">No description</span>}
                </span>
              </div>

              <div className="flex items-start">
                <span className="inline-block w-32 text-blueGray-600 text-sm font-bold">Created At:</span>
                <span className="text-blueGray-700">{formatDate(selectedCategory.CreatedAt)}</span>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedCategory);
                  }}
                  className="bg-green-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-gray-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 backdrop-blur-xs  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold text-center text-blueGray-700 mb-2">
                Delete Category
              </h3>
              
              <p className="text-center text-blueGray-600 mb-6">
                Are you sure you want to delete "<strong>{selectedCategory.CategoryName}</strong>"? 
                This action will mark it as deleted and it can be recovered later.
              </p>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                  }}
                  className="bg-gray-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default ProductCategories;
