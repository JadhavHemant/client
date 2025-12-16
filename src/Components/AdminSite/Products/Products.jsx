import React, { useState, useEffect } from 'react';
import {
    PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon,
    ArrowPathIcon, ArrowDownTrayIcon, EyeIcon, XMarkIcon,
    CubeIcon, ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import * as productService from '../../../services/productService.js';
import * as categoryService from '../../../services/categoryService.js';
import * as companyService from '../../../services/companyService.js';
import * as unitService from '../../../services/unitService';

// ✅ API URL Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0, limit: 10, offset: 0, totalPages: 0, currentPage: 1,
        hasNext: false, hasPrevious: false
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        categoryId: '',
        companyId: '',
        isActive: '',
        lowStock: false,
        sortBy: 'CreatedAt',
        sortOrder: 'DESC'
    });

    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [formData, setFormData] = useState({
        ProductName: '', ProductCode: '', Description: '', CategoryId: '',
        UnitId: '', Price: '', Cost: '', StockQuantity: '', MinimumStock: '',
        MaximumStock: '', ReorderLevel: '', Barcode: '', SKU: '', HSNCode: '',
        TaxRate: '', Discount: '', CompanyId: '', IsActive: true,
        NotifyStockOut: true, NotifyStockReload: true, productImage: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const companiesData = await companyService.getActiveCompanies();
            setCompanies(companiesData.data || []);

            const categoriesData = await categoryService.getActiveCategories();
            setCategories(categoriesData.data || []);

            const unitsData = await unitService.getActiveUnits();
            setUnits(unitsData.data || []);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            toast.error('Failed to load form data');
        }
    };

    const fetchProducts = async (limit = 10, offset = 0, search = '') => {
        setLoading(true);
        try {
            const data = await productService.getProducts(limit, offset, search, filters);
            setProducts(data.data || []);

            const total = data.pagination?.total || 0;
            const currentLimit = data.pagination?.limit || limit;
            const currentOffset = data.pagination?.offset || offset;
            const totalPages = Math.ceil(total / currentLimit) || 1;
            const currentPage = Math.floor(currentOffset / currentLimit) + 1;

            setPagination({
                total, limit: currentLimit, offset: currentOffset,
                totalPages, currentPage,
                hasNext: data.pagination?.hasNext || (currentPage < totalPages),
                hasPrevious: data.pagination?.hasPrevious || (currentPage > 1)
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(pagination.limit, 0, searchTerm);
    }, [filters]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchProducts(pagination.limit, 0, searchTerm);
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const resetForm = () => {
        setFormData({
            ProductName: '', ProductCode: '', Description: '', CategoryId: '',
            UnitId: '', Price: '', Cost: '', StockQuantity: '', MinimumStock: '',
            MaximumStock: '', ReorderLevel: '', Barcode: '', SKU: '', HSNCode: '',
            TaxRate: '', Discount: '', CompanyId: '', IsActive: true,
            NotifyStockOut: true, NotifyStockReload: true, productImage: null
        });
        setImagePreview(null);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB');
                return;
            }
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Only JPEG, PNG, and WEBP images allowed');
                return;
            }
            setFormData(prev => ({ ...prev, productImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.ProductName.trim()) newErrors.ProductName = 'Product name is required';
        if (!formData.ProductCode.trim()) newErrors.ProductCode = 'Product code is required';
        if (!formData.CompanyId) newErrors.CompanyId = 'Company is required';
        if (formData.Price && isNaN(formData.Price)) newErrors.Price = 'Invalid price';
        if (formData.Cost && isNaN(formData.Cost)) newErrors.Cost = 'Invalid cost';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const openCreateModal = () => {
        resetForm();
        setModalMode('create');
        setSelectedProduct(null);
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setFormData({
            ProductName: product.ProductName || '',
            ProductCode: product.ProductCode || '',
            Description: product.Description || '',
            CategoryId: product.CategoryId || '',
            UnitId: product.UnitId || '',
            Price: product.Price || '',
            Cost: product.Cost || '',
            StockQuantity: product.StockQuantity || '',
            MinimumStock: product.MinimumStock || '',
            MaximumStock: product.MaximumStock || '',
            ReorderLevel: product.ReorderLevel || '',
            Barcode: product.Barcode || '',
            SKU: product.SKU || '',
            HSNCode: product.HSNCode || '',
            TaxRate: product.TaxRate || '',
            Discount: product.Discount || '',
            CompanyId: product.CompanyId || '',
            IsActive: product.IsActive,
            NotifyStockOut: product.NotifyStockOut,
            NotifyStockReload: product.NotifyStockReload,
            productImage: null
        });
        // ✅ FIXED
        if (product.ProductImage) {
            setImagePreview(`${API_BASE_URL}${product.ProductImage}`);
        }
        setModalMode('edit');
        setSelectedProduct(product);
        setShowModal(true);
    };

    const openViewModal = (product) => {
        setFormData({
            ProductName: product.ProductName || '',
            ProductCode: product.ProductCode || '',
            Description: product.Description || '',
            CategoryId: product.CategoryId || '',
            UnitId: product.UnitId || '',
            Price: product.Price || '',
            Cost: product.Cost || '',
            StockQuantity: product.StockQuantity || '',
            MinimumStock: product.MinimumStock || '',
            MaximumStock: product.MaximumStock || '',
            ReorderLevel: product.ReorderLevel || '',
            Barcode: product.Barcode || '',
            SKU: product.SKU || '',
            HSNCode: product.HSNCode || '',
            TaxRate: product.TaxRate || '',
            Discount: product.Discount || '',
            CompanyId: product.CompanyId || '',
            IsActive: product.IsActive,
            NotifyStockOut: product.NotifyStockOut,
            NotifyStockReload: product.NotifyStockReload,
            productImage: null
        });
        // ✅ FIXED
        if (product.ProductImage) {
            setImagePreview(`${API_BASE_URL}${product.ProductImage}`);
        }
        setModalMode('view');
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modalMode === 'view') return;

        if (!validateForm()) {
            toast.error('Please fix validation errors');
            return;
        }

        setLoading(true);
        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'productImage' && formData.productImage) {
                    submitData.append('productImage', formData.productImage);
                } else if (key !== 'productImage' && formData[key] !== '') {
                    submitData.append(key, formData[key]);
                }
            });

            if (modalMode === 'create') {
                await productService.createProduct(submitData);
                toast.success('Product created successfully!');
            } else if (modalMode === 'edit') {
                await productService.updateProduct(selectedProduct.Id, submitData);
                toast.success('Product updated successfully!');
            }

            setShowModal(false);
            resetForm();
            fetchProducts(pagination.limit, pagination.offset, searchTerm);
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedProduct) return;
        try {
            await productService.deleteProduct(selectedProduct.Id);
            toast.success('Product deleted successfully!');
            setShowDeleteModal(false);
            setSelectedProduct(null);
            fetchProducts(pagination.limit, pagination.offset, searchTerm);
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error(error.response?.data?.message || 'Failed to delete product');
        }
    };

    const handleToggleActive = async (product) => {
        try {
            const response = await productService.toggleActiveStatus(product.Id);
            toast.success(response.message);
            fetchProducts(pagination.limit, pagination.offset, searchTerm);
        } catch (error) {
            console.error('Error toggling active:', error);
            toast.error(error.response?.data?.message || 'Failed to toggle status');
        }
    };

    const handleExport = () => {
        if (products.length === 0) {
            toast.error('No data to export');
            return;
        }
        const csvContent = [
            ['ID', 'Product Name', 'Code', 'Category', 'Unit', 'Price', 'Stock', 'Status'],
            ...products.map(p => [
                p.Id, p.ProductName, p.ProductCode, p.CategoryName || '',
                p.UnitName || '', p.Price || 0, p.StockQuantity || 0,
                p.IsActive ? 'Active' : 'Inactive'
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success('Products exported successfully!');
    };

    const handlePageChange = (newPage) => {
        const newOffset = (newPage - 1) * pagination.limit;
        fetchProducts(pagination.limit, newOffset, searchTerm);
    };

    const handleLimitChange = (newLimit) => {
        fetchProducts(newLimit, 0, searchTerm);
    };

    const isViewMode = modalMode === 'view';
    const modalTitle = modalMode === 'create' ? 'Create New Product' : modalMode === 'edit' ? 'Edit Product' : 'Product Details';

    return (
        <>
            <Toaster position="top-right" />

            <section className="py-1 bg-blueGray-50 min-h-screen">
                <div className="w-full xl:w-11/12 px-4 mx-auto mt-6">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">

                        {/* Header */}
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <CubeIcon className="h-8 w-8 text-blue-500" />
                                    <div className="text-left">
                                        <h6 className="text-blueGray-700 text-2xl font-bold">Products Management</h6>
                                        <p className="text-sm text-blueGray-500">Manage products & inventory</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {pagination.total} Total
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    <button onClick={() => fetchProducts(pagination.limit, pagination.offset, searchTerm)}
                                        className="bg-gray-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md flex items-center gap-2 transition"
                                        disabled={loading}>
                                        <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                        Refresh
                                    </button>

                                    <button onClick={handleExport}
                                        className="bg-green-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md flex items-center gap-2 transition"
                                        disabled={products.length === 0}>
                                        <ArrowDownTrayIcon className="h-4 w-4" />
                                        Export
                                    </button>

                                    <button onClick={openCreateModal}
                                        className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md flex items-center gap-2 transition">
                                        <PlusIcon className="h-4 w-4" />
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="px-6 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <select value={filters.companyId} onChange={(e) => setFilters({ ...filters, companyId: e.target.value })}
                                    className="border-0 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring">
                                    <option value="">All Companies</option>
                                    {companies.map(c => (
                                        <option key={c.Id} value={c.Id}>{c.CompanyName}</option>
                                    ))}
                                </select>

                                <select value={filters.categoryId} onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                                    className="border-0 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring">
                                    <option value="">All Categories</option>
                                    {categories.map(c => (
                                        <option key={c.Id} value={c.Id}>{c.CategoryName}</option>
                                    ))}
                                </select>

                                <select value={filters.isActive} onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
                                    className="border-0 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring">
                                    <option value="">All Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>

                                <label className="flex items-center px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow">
                                    <input type="checkbox" checked={filters.lowStock}
                                        onChange={(e) => setFilters({ ...filters, lowStock: e.target.checked })}
                                        className="mr-2" />
                                    Low Stock Only
                                </label>
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="text"
                                    className="border-0 px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                    placeholder="Search by name, code, barcode..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 flex items-center pr-3">
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
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Product</th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Code</th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">Category</th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right bg-blueGray-50 text-blueGray-500 border-blueGray-100">Price</th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100">Stock</th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100">Status</th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-8">
                                                <div className="flex justify-center items-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                    <span className="ml-2 text-blueGray-500">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : products.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-8">
                                                <CubeIcon className="h-12 w-12 mx-auto mb-2 text-blueGray-300" />
                                                <p className="text-lg font-semibold text-blueGray-500">No products found</p>
                                                <p className="text-sm text-blueGray-400">
                                                    {searchTerm ? 'Try adjusting your search' : 'Click "Add Product" to create one'}
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((product) => (
                                            <tr key={product.Id} className="hover:bg-blueGray-50 transition-colors">
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex items-center gap-3">
                                                        {product.ProductImage ? (
                                                            <img 
                                                                src={`${API_BASE_URL}${product.ProductImage}`}
                                                                alt={product.ProductName}
                                                                className="h-10 w-10 rounded object-cover border-2 border-blueGray-200" 
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                                                                <CubeIcon className="h-6 w-6 text-blue-500" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-semibold text-blueGray-700">{product.ProductName}</p>
                                                            {product.UnitName && <p className="text-xs text-blueGray-500">Unit: {product.UnitName}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <span className="font-mono text-blueGray-700">{product.ProductCode}</span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <span className="text-blueGray-700">{product.CategoryName || 'Uncategorized'}</span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                    <span className="font-semibold text-blueGray-700">₹{parseFloat(product.Price || 0).toFixed(2)}</span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    <span className={`${product.StockQuantity <= product.ReorderLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} text-xs font-semibold px-2.5 py-1 rounded`}>
                                                        {product.StockQuantity || 0}
                                                    </span>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                                                    <button onClick={() => handleToggleActive(product)}
                                                        className={`${product.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs font-semibold px-2.5 py-1 rounded`}>
                                                        {product.IsActive ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex gap-2 justify-center">
                                                        <button onClick={() => openViewModal(product)} className="text-blue-500 hover:text-blue-700" title="View">
                                                            <EyeIcon className="h-5 w-5" />
                                                        </button>
                                                        <button onClick={() => openEditModal(product)} className="text-green-500 hover:text-green-700" title="Edit">
                                                            <PencilIcon className="h-5 w-5" />
                                                        </button>
                                                        <button onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }}
                                                            className="text-red-500 hover:text-red-700" title="Delete">
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
                                        <select value={pagination.limit} onChange={(e) => handleLimitChange(Number(e.target.value))}
                                            className="border-0 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring">
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                        </select>
                                        <span className="text-sm text-blueGray-600">
                                            Showing {pagination.offset + 1} to {Math.min(pagination.offset + products.length, pagination.total)} of {pagination.total}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                            Previous
                                        </button>

                                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => {
                                            if (page === 1 || page === pagination.totalPages || (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)) {
                                                return (
                                                    <button key={page} onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-2 text-sm font-medium rounded-md ${page === pagination.currentPage
                                                            ? 'text-white bg-blue-500 shadow-md' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}>
                                                        {page}
                                                    </button>
                                                );
                                            } else if (page === pagination.currentPage - 2 || page === pagination.currentPage + 2) {
                                                return <span key={page} className="px-2 text-gray-500">...</span>;
                                            }
                                            return null;
                                        })}

                                        <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}
                                            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ✅ FIXED MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="flex items-start justify-center min-h-full p-4 sm:p-8">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
                            {/* Header - Sticky */}
                            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10 rounded-t-xl">
                                <div className="flex items-center gap-2">
                                    <CubeIcon className="h-6 w-6 text-blue-500" />
                                    <h3 className="text-xl font-bold text-blueGray-700">{modalTitle}</h3>
                                </div>
                                <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600 transition">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Form Content - Scrollable */}
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                        {/* Product Image */}
                                        <div className="col-span-3">
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Product Image</label>
                                            <div className="flex items-center gap-4">
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Product" className="h-24 w-24 rounded-lg object-cover border-2 border-blueGray-200" />
                                                ) : (
                                                    <div className="h-24 w-24 rounded-lg bg-blueGray-100 flex items-center justify-center">
                                                        <CubeIcon className="h-12 w-12 text-blueGray-400" />
                                                    </div>
                                                )}
                                                {!isViewMode && (
                                                    <div className="flex-1">
                                                        <input type="file" accept="image/*" onChange={handleImageChange}
                                                            className="border-0 px-3 py-2 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
                                                        <p className="text-xs text-blueGray-400 mt-1">Max 5MB, JPG/PNG/WEBP</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Product Name */}
                                        <div className="col-span-2">
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">
                                                Product Name <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${errors.ProductName ? 'ring-2 ring-red-500' : ''} ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="Enter product name" />
                                            {errors.ProductName && <p className="text-red-500 text-xs mt-1">{errors.ProductName}</p>}
                                        </div>

                                        {/* Product Code */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">
                                                Product Code <span className="text-red-500">*</span>
                                            </label>
                                            <input type="text" name="ProductCode" value={formData.ProductCode} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${errors.ProductCode ? 'ring-2 ring-red-500' : ''} ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="PRD001" />
                                            {errors.ProductCode && <p className="text-red-500 text-xs mt-1">{errors.ProductCode}</p>}
                                        </div>

                                        {/* Company Dropdown */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">
                                                Company <span className="text-red-500">*</span>
                                            </label>
                                            <select name="CompanyId" value={formData.CompanyId} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${errors.CompanyId ? 'ring-2 ring-red-500' : ''} ${isViewMode ? 'bg-gray-100' : ''}`}>
                                                <option value="">Select Company</option>
                                                {companies.map(c => (
                                                    <option key={c.Id} value={c.Id}>{c.CompanyName}</option>
                                                ))}
                                            </select>
                                            {errors.CompanyId && <p className="text-red-500 text-xs mt-1">{errors.CompanyId}</p>}
                                        </div>

                                        {/* Category Dropdown */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Category</label>
                                            <select name="CategoryId" value={formData.CategoryId} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}>
                                                <option value="">Select Category</option>
                                                {categories.map(c => (
                                                    <option key={c.Id} value={c.Id}>{c.CategoryName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Unit Dropdown */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Unit</label>
                                            <select name="UnitId" value={formData.UnitId} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}>
                                                <option value="">Select Unit</option>
                                                {units.map(u => (
                                                    <option key={u.Id} value={u.Id}>{u.UnitName} ({u.Symbol})</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-3">
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Description</label>
                                            <textarea name="Description" value={formData.Description} onChange={handleChange} rows="2"
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="Product description" />
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Price (₹)</label>
                                            <input type="number" step="0.01" name="Price" value={formData.Price} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${errors.Price ? 'ring-2 ring-red-500' : ''} ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0.00" />
                                            {errors.Price && <p className="text-red-500 text-xs mt-1">{errors.Price}</p>}
                                        </div>

                                        {/* Cost */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Cost (₹)</label>
                                            <input type="number" step="0.01" name="Cost" value={formData.Cost} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${errors.Cost ? 'ring-2 ring-red-500' : ''} ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0.00" />
                                            {errors.Cost && <p className="text-red-500 text-xs mt-1">{errors.Cost}</p>}
                                        </div>

                                        {/* Tax Rate */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Tax Rate (%)</label>
                                            <input type="number" step="0.01" name="TaxRate" value={formData.TaxRate} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0.00" />
                                        </div>

                                        {/* Stock Quantity */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Stock Quantity</label>
                                            <input type="number" name="StockQuantity" value={formData.StockQuantity} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0" />
                                        </div>

                                        {/* Minimum Stock */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Minimum Stock</label>
                                            <input type="number" name="MinimumStock" value={formData.MinimumStock} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0" />
                                        </div>

                                        {/* Reorder Level */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Reorder Level</label>
                                            <input type="number" name="ReorderLevel" value={formData.ReorderLevel} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0" />
                                        </div>

                                        {/* Barcode */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Barcode</label>
                                            <input type="text" name="Barcode" value={formData.Barcode} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="123456789" />
                                        </div>

                                        {/* SKU */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">SKU</label>
                                            <input type="text" name="SKU" value={formData.SKU} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="SKU-001" />
                                        </div>

                                        {/* HSN Code */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">HSN Code</label>
                                            <input type="text" name="HSNCode" value={formData.HSNCode} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="1234" />
                                        </div>

                                        {/* Discount */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Discount (%)</label>
                                            <input type="number" step="0.01" name="Discount" value={formData.Discount} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0.00" />
                                        </div>

                                        {/* Maximum Stock */}
                                        <div>
                                            <label className="block text-blueGray-600 text-sm font-bold mb-2">Maximum Stock</label>
                                            <input type="number" name="MaximumStock" value={formData.MaximumStock} onChange={handleChange}
                                                disabled={isViewMode}
                                                className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ${isViewMode ? 'bg-gray-100' : ''}`}
                                                placeholder="0" />
                                        </div>

                                        {/* Checkboxes */}
                                        {!isViewMode && (
                                            <div className="col-span-3 flex gap-6">
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="IsActive" checked={formData.IsActive} onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                                    <span className="ml-2 text-sm text-blueGray-600">Active</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="NotifyStockOut" checked={formData.NotifyStockOut} onChange={handleChange}
                                                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                                                    <span className="ml-2 text-sm text-blueGray-600">Notify Stock Out</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="NotifyStockReload" checked={formData.NotifyStockReload} onChange={handleChange}
                                                        className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500" />
                                                    <span className="ml-2 text-sm text-blueGray-600">Notify Stock Reload</span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer Buttons - Sticky */}
                                <div className="flex justify-end gap-3 p-6 border-t sticky bottom-0 bg-white rounded-b-xl">
                                    <button type="button" onClick={() => { setShowModal(false); resetForm(); }}
                                        className="bg-gray-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md transition">
                                        {isViewMode ? 'Close' : 'Cancel'}
                                    </button>
                                    {!isViewMode && (
                                        <button type="submit" disabled={loading}
                                            className="bg-blue-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md disabled:opacity-50 flex items-center gap-2 transition">
                                            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                                            {loading ? 'Saving...' : modalMode === 'create' ? 'Create' : 'Update'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ FIXED DELETE MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center p-6 border-b">
                            <div className="flex items-center gap-2">
                                <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                                <h3 className="text-xl font-bold text-blueGray-700">Delete Product</h3>
                            </div>
                            <button onClick={() => { setShowDeleteModal(false); setSelectedProduct(null); }} className="text-gray-400 hover:text-gray-600 transition">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-blueGray-600">Are you sure you want to delete "{selectedProduct?.ProductName}"? This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button onClick={() => { setShowDeleteModal(false); setSelectedProduct(null); }}
                                className="bg-gray-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md transition">
                                Cancel
                            </button>
                            <button onClick={handleDelete}
                                className="bg-red-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Products;
