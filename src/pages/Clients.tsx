
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Building2,
  Mail,
  Phone,
  MapPin,
  Users,
  ClipboardList,
  Edit,
  Eye
} from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    {
      id: 1,
      name: 'TechCorp Industries',
      contact: 'John Anderson',
      email: 'john.anderson@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Industrial Blvd, Tech City, TC 12345',
      deviceCount: 45,
      overdueCount: 3,
      status: 'Active',
      lastActivity: '2024-05-20',
      industry: 'Manufacturing'
    },
    {
      id: 2,
      name: 'Manufacturing Co.',
      contact: 'Sarah Williams',
      email: 'sarah.w@manufacturing.com',
      phone: '+1 (555) 987-6543',
      address: '456 Factory St, Industrial Park, IP 67890',
      deviceCount: 28,
      overdueCount: 1,
      status: 'Active',
      lastActivity: '2024-05-18',
      industry: 'Manufacturing'
    },
    {
      id: 3,
      name: 'Process Solutions Ltd.',
      contact: 'Michael Chen',
      email: 'm.chen@processsolutions.com',
      phone: '+1 (555) 456-7890',
      address: '789 Process Way, Solution City, SC 13579',
      deviceCount: 67,
      overdueCount: 0,
      status: 'Active',
      lastActivity: '2024-05-22',
      industry: 'Chemical Processing'
    },
    {
      id: 4,
      name: 'Energy Systems Inc.',
      contact: 'Lisa Rodriguez',
      email: 'l.rodriguez@energysys.com',
      phone: '+1 (555) 234-5678',
      address: '321 Power Ave, Energy District, ED 24680',
      deviceCount: 92,
      overdueCount: 2,
      status: 'Active',
      lastActivity: '2024-05-15',
      industry: 'Energy'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage your calibration clients and their information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="TechCorp Industries" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person</Label>
                <Input id="contactName" placeholder="John Anderson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" placeholder="Manufacturing" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="contact@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Street address, city, state, zip code" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional client information..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Client</Button>
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
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <p className="text-sm text-gray-500">{client.industry}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {client.contact}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="truncate">{client.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{client.deviceCount}</div>
                  <div className="text-xs text-gray-500">Total Devices</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${client.overdueCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {client.overdueCount}
                  </div>
                  <div className="text-xs text-gray-500">Overdue</div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <ClipboardList className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
