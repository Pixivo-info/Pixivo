import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  getStoredCustomSolutions, 
  updateCustomSolutionRequest, 
  deleteCustomSolutionRequest,
  getCustomSolutionsStats,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  SERVICE_TYPES,
  DESIGN_TYPES,
  WEBSITE_TYPES,
  TECHNOLOGIES
} from '../utils/customSolutionsData';
import CustomDropdown from '../components/CustomDropdown';

const CustomSolutionsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Filter and sort requests when filters change
  useEffect(() => {
    applyFilters();
  }, [requests, activeTab, searchTerm, filterStatus, filterService, sortBy, sortOrder]);

  const loadData = () => {
    const requestsData = getStoredCustomSolutions();
    const statsData = getCustomSolutionsStats();
    setRequests(requestsData);
    setStats(statsData);
  };

  const applyFilters = () => {
    let filtered = [...requests];

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(request => request.status === activeTab);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(request => request.status === filterStatus);
    }

    // Service filter
    if (filterService !== 'all') {
      filtered = filtered.filter(request => request.service === filterService);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'service':
          aValue = a.service;
          bValue = b.service;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'priority':
          aValue = a.priority;
          bValue = b.priority;
          break;
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRequests(filtered);
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    const success = updateCustomSolutionRequest(requestId, { status: newStatus });
    if (success) {
      loadData();
    }
  };

  const handlePriorityUpdate = async (requestId, newPriority) => {
    const success = updateCustomSolutionRequest(requestId, { priority: newPriority });
    if (success) {
      loadData();
    }
  };

  const handleNotesUpdate = async (requestId, notes) => {
    const success = updateCustomSolutionRequest(requestId, { notes });
    if (success) {
      loadData();
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleDeleteRequest = (request) => {
    setRequestToDelete(request);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      const success = deleteCustomSolutionRequest(requestToDelete.id);
      if (success) {
        loadData();
        setSelectedRequests(prev => prev.filter(id => id !== requestToDelete.id));
      }
    }
    setShowDeleteModal(false);
    setRequestToDelete(null);
  };

  const handleSelectRequest = (requestId) => {
    setSelectedRequests(prev =>
      prev.includes(requestId)
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map(r => r.id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const statusOption = STATUS_OPTIONS.find(s => s.value === status);
    return statusOption ? statusOption.color : 'gray';
  };

  const getPriorityColor = (priority) => {
    const priorityOption = PRIORITY_OPTIONS.find(p => p.value === priority);
    return priorityOption ? priorityOption.color : 'gray';
  };

  // Tab data
  const tabs = [
    { id: 'all', name: 'All Requests', count: stats.total || 0 },
    { id: 'pending', name: 'Pending', count: stats.pending || 0 },
    { id: 'in-progress', name: 'In Progress', count: stats.inProgress || 0 },
    { id: 'completed', name: 'Completed', count: stats.completed || 0 },
  ];

  // Filter options
  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    ...STATUS_OPTIONS
  ];

  const serviceFilterOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'frontend-development', label: 'Frontend Development' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Custom Solutions Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track custom solution requests from clients
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
            <span className="font-medium">This Month:</span> {stats.thisMonth || 0} requests
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600">Total Requests</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.total || 0}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600">Pending</p>
              <p className="text-lg md:text-2xl font-bold text-yellow-600">{stats.pending || 0}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 md:w-5 md:h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600">In Progress</p>
              <p className="text-lg md:text-2xl font-bold text-blue-600">{stats.inProgress || 0}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600">Completed</p>
              <p className="text-lg md:text-2xl font-bold text-green-600">{stats.completed || 0}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          {/* Mobile Tab Selector */}
          <div className="sm:hidden px-4 py-2">
            <CustomDropdown
              value={activeTab}
              onChange={setActiveTab}
              options={tabs.map(tab => ({
                value: tab.id,
                label: `${tab.name} (${tab.count})`
              }))}
              placeholder="Select tab"
              showLabel={false}
            />
          </div>

          {/* Desktop Tab Navigation */}
          <nav className="hidden sm:flex space-x-6 lg:space-x-8 px-4 md:px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="hidden md:inline">{tab.name}</span>
                <span className="md:hidden">{tab.name.split(' ')[0]}</span>
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Requests
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="Search by name, email, or message..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <CustomDropdown
                label="Filter by Status"
                options={statusFilterOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder="All Status"
              />
            </div>

            {/* Service Filter */}
            <div>
              <CustomDropdown
                label="Filter by Service"
                options={serviceFilterOptions}
                value={filterService}
                onChange={setFilterService}
                placeholder="All Services"
              />
            </div>
          </div>

          {/* Results Count and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Clear Filters */}
              {(searchTerm || filterStatus !== 'all' || filterService !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilterService('all');
                  }}
                  className="inline-flex items-center justify-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}

              {/* Bulk Actions */}
              {selectedRequests.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {selectedRequests.length} selected
                  </span>
                  <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-hidden">
          {/* Desktop and Tablet Table View */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 xl:px-6 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Details
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 xl:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRequests.includes(request.id)}
                          onChange={() => handleSelectRequest(request.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 xl:px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-48">{request.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-48">{request.email}</div>
                        </div>
                      </td>
                      <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {SERVICE_TYPES[request.service] || request.service}
                        </div>
                        {request.designType && (
                          <div className="text-xs text-gray-500">
                            {DESIGN_TYPES[request.designType]}
                          </div>
                        )}
                        {request.websiteType && (
                          <div className="text-xs text-gray-500">
                            {WEBSITE_TYPES[request.websiteType]}
                          </div>
                        )}
                        {request.technologies && request.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {request.technologies.slice(0, 2).map((tech) => (
                              <span key={tech} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {TECHNOLOGIES[tech] || tech}
                              </span>
                            ))}
                            {request.technologies.length > 2 && (
                              <span className="text-xs text-gray-500">+{request.technologies.length - 2} more</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                        <select
                          value={request.status}
                          onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 ${
                            getStatusColor(request.status) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            getStatusColor(request.status) === 'blue' ? 'bg-blue-100 text-blue-800' :
                            getStatusColor(request.status) === 'green' ? 'bg-green-100 text-green-800' :
                            getStatusColor(request.status) === 'red' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 xl:px-6 py-4 whitespace-nowrap">
                        <select
                          value={request.priority}
                          onChange={(e) => handlePriorityUpdate(request.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 ${
                            getPriorityColor(request.priority) === 'red' ? 'bg-red-100 text-red-800' :
                            getPriorityColor(request.priority) === 'orange' ? 'bg-orange-100 text-orange-800' :
                            getPriorityColor(request.priority) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {PRIORITY_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="hidden xl:block">{formatDate(request.createdAt)}</div>
                        <div className="xl:hidden">{new Date(request.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-4 xl:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleViewDetails(request)}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors duration-200"
                            title="View details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(request)}
                            className="text-red-600 hover:text-red-700 p-1 rounded transition-colors duration-200"
                            title="Delete request"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile and Small Tablet Card View */}
          <div className="lg:hidden">
            <div className="p-4 space-y-4">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => handleSelectRequest(request.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{request.name}</p>
                        <p className="text-xs text-gray-500 truncate">{request.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        getStatusColor(request.status) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        getStatusColor(request.status) === 'blue' ? 'bg-blue-100 text-blue-800' :
                        getStatusColor(request.status) === 'green' ? 'bg-green-100 text-green-800' :
                        getStatusColor(request.status) === 'red' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {STATUS_OPTIONS.find(s => s.value === request.status)?.label}
                      </span>
                    </div>
                  </div>
                  
                                     {/* Card Details */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                     <div>
                       <span className="font-medium text-gray-700">Service:</span>
                       <div className="text-gray-600 text-xs mt-1">
                         {SERVICE_TYPES[request.service] || request.service}
                         {request.designType && (
                           <div className="text-gray-500">{DESIGN_TYPES[request.designType]}</div>
                         )}
                         {request.websiteType && (
                           <div className="text-gray-500">{WEBSITE_TYPES[request.websiteType]}</div>
                         )}
                         {request.technologies && request.technologies.length > 0 && (
                           <div className="flex flex-wrap gap-1 mt-1">
                             {request.technologies.slice(0, 3).map((tech) => (
                               <span key={tech} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                 {TECHNOLOGIES[tech] || tech}
                               </span>
                             ))}
                             {request.technologies.length > 3 && (
                               <span className="text-xs text-gray-500">+{request.technologies.length - 3}</span>
                             )}
                           </div>
                         )}
                       </div>
                     </div>
                    <div>
                      <span className="font-medium text-gray-700">Priority:</span>
                      <select
                        value={request.priority}
                        onChange={(e) => handlePriorityUpdate(request.id, e.target.value)}
                        className={`block w-full mt-1 text-xs px-2 py-1 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                          getPriorityColor(request.priority) === 'red' ? 'bg-red-50 text-red-800' :
                          getPriorityColor(request.priority) === 'orange' ? 'bg-orange-50 text-orange-800' :
                          getPriorityColor(request.priority) === 'yellow' ? 'bg-yellow-50 text-yellow-800' :
                          'bg-gray-50 text-gray-800'
                        }`}
                      >
                        {PRIORITY_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Preview */}
                  {request.message && (
                    <div className="mt-3">
                      <span className="font-medium text-gray-700 text-sm">Message:</span>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">{request.message}</p>
                    </div>
                  )}
                  
                  {/* Card Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500">{formatDate(request.createdAt)}</span>
                      <select
                        value={request.status}
                        onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                        className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        {STATUS_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                                             <button 
                         className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors duration-200"
                         onClick={() => handleViewDetails(request)}
                       >
                         View Details
                       </button>
                      <button 
                        onClick={() => handleDeleteRequest(request)}
                        className="text-red-600 hover:text-red-700 text-xs font-medium transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all' || filterService !== 'all'
                  ? 'Try adjusting your search or filters to find what you\'re looking for'
                  : 'No custom solution requests have been submitted yet. Check back later or encourage visitors to submit requests through your website.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Client Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Client Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Status</label>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(selectedRequest.status) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      getStatusColor(selectedRequest.status) === 'blue' ? 'bg-blue-100 text-blue-800' :
                      getStatusColor(selectedRequest.status) === 'green' ? 'bg-green-100 text-green-800' :
                      getStatusColor(selectedRequest.status) === 'red' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {STATUS_OPTIONS.find(s => s.value === selectedRequest.status)?.label}
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Priority</label>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getPriorityColor(selectedRequest.priority) === 'red' ? 'bg-red-100 text-red-800' :
                      getPriorityColor(selectedRequest.priority) === 'orange' ? 'bg-orange-100 text-orange-800' :
                      getPriorityColor(selectedRequest.priority) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {PRIORITY_OPTIONS.find(p => p.value === selectedRequest.priority)?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Service Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Service Type</label>
                    <p className="mt-1 text-sm text-gray-900">{SERVICE_TYPES[selectedRequest.service] || selectedRequest.service}</p>
                  </div>
                  
                  {selectedRequest.designType && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Design Type</label>
                      <p className="mt-1 text-sm text-gray-900">{DESIGN_TYPES[selectedRequest.designType]}</p>
                    </div>
                  )}
                  
                  {selectedRequest.websiteType && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Website Type</label>
                      <p className="mt-1 text-sm text-gray-900">{WEBSITE_TYPES[selectedRequest.websiteType]}</p>
                    </div>
                  )}

                  {selectedRequest.technologies && selectedRequest.technologies.length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Technologies</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.technologies.map((tech) => (
                          <span key={tech} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {TECHNOLOGIES[tech] || tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              {selectedRequest.message && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Project Details</h4>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRequest.message}</div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Submitted</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedRequest.updatedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Admin Notes</h4>
                <textarea
                  value={selectedRequest.notes || ''}
                  onChange={(e) => handleNotesUpdate(selectedRequest.id, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add internal notes about this request..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <div className="flex-1">
                  <CustomDropdown
                    label="Update Status"
                    value={selectedRequest.status}
                    onChange={(value) => {
                      handleStatusUpdate(selectedRequest.id, value);
                      setSelectedRequest({...selectedRequest, status: value});
                    }}
                    options={STATUS_OPTIONS}
                    placeholder="Select status"
                  />
                </div>
                <div className="flex-1">
                  <CustomDropdown
                    label="Update Priority"
                    value={selectedRequest.priority}
                    onChange={(value) => {
                      handlePriorityUpdate(selectedRequest.id, value);
                      setSelectedRequest({...selectedRequest, priority: value});
                    }}
                    options={PRIORITY_OPTIONS}
                    placeholder="Select priority"
                  />
                </div>
              </div>

              {/* Contact Client Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${selectedRequest.email}?subject=Regarding your Custom Solution Request&body=Hello ${selectedRequest.name},%0D%0A%0D%0AThank you for your interest in our custom solution services.`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Delete Request</h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the request from <span className="font-medium">"{requestToDelete?.name}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomSolutionsManagement; 