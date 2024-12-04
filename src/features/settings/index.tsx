/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Upload, Database, FileDown } from 'lucide-react';

interface DataSource {
    id: string;
    name: string;
    connected: boolean;
}

interface Profile {
    name: string;
    email: string;
    avatar: File | null;
}

const SettingsTab = () => {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: null
  });

  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: 'google', name: 'Google Analytics', connected: false },
    { id: 'salesforce', name: 'Salesforce', connected: false },
    { id: 'stripe', name: 'Stripe', connected: false }
  ]);

  const [dataRetention, setDataRetention] = useState('6months');

  const handleProfileUpdate = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (event: any) => {
    const file = event.target.files[0];
    setProfile(prev => ({ ...prev, avatar: file }));
  };

  const toggleDataSourceConnection = (id: string) => {
    setDataSources(prev => 
      prev.map(source => 
        source.id === id 
          ? { ...source, connected: !source.connected } 
          : source
      )
    );
  };

  const exportData = () => {
    // Mock data export functionality
    console.log('Exporting user data...');
    alert('Data exported successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div>
            <label>Name</label>
            <Input 
              value={profile.name}
              onChange={(e) => handleProfileUpdate('name', e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <Input 
              value={profile.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
            />
          </div>
          <div>
            <label>Avatar</label>
            <div className="flex items-center space-x-4">
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                id="avatar-upload"
              />
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <Button variant="outline">
                  <Upload className="mr-2" size={16} /> Upload Avatar
                </Button>
              </label>
              {profile.avatar && <span>{profile.avatar.name}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">External Data Sources</h2>
        {dataSources.map((source) => (
          <div 
            key={source.id} 
            className="flex justify-between items-center border-b py-3 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <Database size={20} />
              <span>{source.name}</span>
            </div>
            <Switch 
              checked={source.connected}
              onCheckedChange={() => toggleDataSourceConnection(source.id)}
            />
          </div>
        ))}
      </div>

      {/* Data Retention Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
        <div className="space-y-4">
          <div>
            <label>Retain Data For</label>
            <Select 
              value={dataRetention}
              onValueChange={setDataRetention}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="forever">Forever</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={exportData}>
            <FileDown className="mr-2" size={16} /> Export All Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;