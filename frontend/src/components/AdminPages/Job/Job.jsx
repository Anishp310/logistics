import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SummaryApi from '../../../API/BackendApi';

const Job = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users for Consignee and Consigner selection
    const fetchUsers = async () => {
      try {
        const response = await fetch(SummaryApi.getAllUsers.url, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(SummaryApi.createJob.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Job created successfully');
      } else {
        alert(result.message || 'Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('An error occurred while creating the job');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Job</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Consignee & Consigner Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Consignee */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Consignee Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Consignee ID</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('consigneeDetails.consigneeId', { required: 'Consignee ID is required' })}
                >
                  <option value="">Select Consignee ID</option>
                  {users.length > 0 && users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                {errors.consigneeDetails?.consigneeId && <p className="text-red-500 text-sm">{errors.consigneeDetails.consigneeId.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Consignee Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('consigneeDetails.consigneeName', { required: 'Consignee Name is required' })}
                />
                {errors.consigneeDetails?.consigneeName && <p className="text-red-500 text-sm">{errors.consigneeDetails.consigneeName.message}</p>}
              </div>
            </div>

            {/* Consigner */}
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Consigner Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Consigner ID</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('consignerDetails.consignerId', { required: 'Consigner ID is required' })}
                >
                  <option value="">Select Consigner ID</option>
                  {users.length > 0 && users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                {errors.consignerDetails?.consignerId && <p className="text-red-500 text-sm">{errors.consignerDetails.consignerId.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Consigner Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('consignerDetails.consignerName', { required: 'Consigner Name is required' })}
                />
                {errors.consignerDetails?.consignerName && <p className="text-red-500 text-sm">{errors.consignerDetails.consignerName.message}</p>}
              </div>
            </div>
          </div>

          {/* Billing and Job Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Billing Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('billingDetails.billingAddress', { required: 'Billing Address is required' })}
                />
                {errors.billingDetails?.billingAddress && <p className="text-red-500 text-sm">{errors.billingDetails.billingAddress.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Billing Contact</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('billingDetails.billingContact', { required: 'Billing Contact is required' })}
                />
                {errors.billingDetails?.billingContact && <p className="text-red-500 text-sm">{errors.billingDetails.billingContact.message}</p>}
              </div>
            </div>

            <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Job Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Container Type</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('jobInformation.containerType', { required: 'Container Type is required' })}
                />
                {errors.jobInformation?.containerType && <p className="text-red-500 text-sm">{errors.jobInformation.containerType.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Weight</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('jobInformation.weight', { required: 'Weight is required' })}
                />
                {errors.jobInformation?.weight && <p className="text-red-500 text-sm">{errors.jobInformation.weight.message}</p>}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register('jobInformation.status')}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
<div className='p-6 bg-gray-100 rounded-lg shadow-sm'>
          {/* Location and Time Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Get Out Time</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('dateAndTime.getOutTime', { required: 'Get Out Time is required' })}
              />
              {errors.dateAndTime?.getOutTime && <p className="text-red-500 text-sm">{errors.dateAndTime.getOutTime.message}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Estimated Arrival Time</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('dateAndTime.estimatedArrivalTime', { required: 'Estimated Arrival Time is required' })}
              />
              {errors.dateAndTime?.estimatedArrivalTime && <p className="text-red-500 text-sm">{errors.dateAndTime.estimatedArrivalTime.message}</p>}
            </div>
          </div>

          {/* Final Destination and Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Loading Port/Airport</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('locationDetails.loadingPortAirport', { required: 'Loading Port/Airport is required' })}
              />
              {errors.locationDetails?.loadingPortAirport && <p className="text-red-500 text-sm">{errors.locationDetails.loadingPortAirport.message}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Final Destination</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register('locationDetails.finalDestination', { required: 'Final Destination is required' })}
              />
              {errors.locationDetails?.finalDestination && <p className="text-red-500 text-sm">{errors.locationDetails.finalDestination.message}</p>}
            </div>
          </div>

          {/* Commodity Name */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Commodity Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('additionalInformation.commodityName', { required: 'Commodity Name is required' })}
            />
            {errors.additionalInformation?.commodityName && <p className="text-red-500 text-sm">{errors.additionalInformation.commodityName.message}</p>}
          </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Job;
