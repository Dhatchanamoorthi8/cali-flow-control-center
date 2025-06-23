
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  User,
  Mail,
  Shield,
  Edit,
  Settings,
  CheckCircle,
  Clock
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@caliblab.com',
      role: 'Senior Technician',
      permissions: 'Calibrate, View Reports',
      status: 'Active',
      lastLogin: '2024-05-22 10:30 AM',
      calibrationsCount: 45,
      department: 'Electrical Lab'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@caliblab.com',
      role: 'Lab Manager',
      permissions: 'All Permissions',
      status: 'Active',
      lastLogin: '2024-05-22 11:15 AM',
      calibrationsCount: 52,
      department: 'Pressure Lab'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@caliblab.com',
      role: 'Technician',
      permissions: 'Calibrate, View Devices',
      status: 'Active',
      lastLogin: '2024-05-21 3:45 PM',
      calibrationsCount: 38,
      department: 'Temperature Lab'
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@caliblab.com',
      role: 'QA Specialist',
      permissions: 'View All, Quality Control',
      status: 'Active',
      lastLogin: '2024-05-22 9:20 AM',
      calibrationsCount: 41,
      department: 'Quality Assurance'
    },
    {
      id: 5,
      name: 'David Chen',
      email: 'david.chen@caliblab.com',
      role: 'Admin',
      permissions: 'System Administration',
      status: 'Inactive',
      lastLogin: '2024-05-15 2:10 PM',
      calibrationsCount: 0,
      department: 'IT Department'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Lab Manager': return 'bg-blue-100 text-blue-800';
      case 'Senior Technician': return 'bg-green-100 text-green-800';
      case 'Technician': return 'bg-yellow-100 text-yellow-800';
      case 'QA Specialist': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Inactive': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage lab users, roles, and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.smith@caliblab.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="senior">Senior Technician</SelectItem>
                    <SelectItem value="manager">Lab Manager</SelectItem>
                    <SelectItem value="qa">QA Specialist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical">Electrical Lab</SelectItem>
                    <SelectItem value="pressure">Pressure Lab</SelectItem>
                    <SelectItem value="temperature">Temperature Lab</SelectItem>
                    <SelectItem value="qa">Quality Assurance</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">View Devices</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Manage Devices</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Perform Calibrations</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Generate Certificates</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">View Reports</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Manage Users</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lab Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Calibrations</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{user.department}</td>
                    <td className="py-3 px-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{user.calibrationsCount}</div>
                        <div className="text-xs text-gray-500">this month</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(user.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(user.status)}
                        <span>{user.status}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
