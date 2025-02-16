// import React from 'react';
import { User, Mail, Settings, Bell, Phone, MapPin, Building } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-4 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Viswas</h2>
                <p className="text-gray-500 dark:text-gray-400">Website Administrator</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="dark:text-white">viswas@example.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-gray-500" />
                <span className="dark:text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="dark:text-white">123,Farm Street,India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-4 rounded-full">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Farm Details</h2>
                <p className="text-gray-500 dark:text-gray-400">Project Information</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <Settings className="h-5 w-5 text-gray-500" />
                <span className="dark:text-white">System Preferences</span>
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="dark:text-white">Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}