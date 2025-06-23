
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const devices = [
    {
      id: 1,
      name: 'Digital Multimeter DMM-100',
      serial: 'TC-001-2023',
      make: 'Fluke',
      model: '175',
      client: 'TechCorp Industries',
      range: '0-1000V AC/DC',
      frequency: '12 months',
      lastCal: '2024-05-15',
      nextDue: '2025-05-15',
      status: 'Compliant',
      location: 'Main Lab',
      technician: 'John Smith'
    },
    {
      id: 2,
      name: 'Pressure Gauge PG-250',
      serial: 'MC-045-2023',
      make: 'Ashcroft',
      model: 'T5500',
      client: 'Manufacturing Co.',
      range: '0-250 PSI',
      frequency: '6 months',
      lastCal: '2023-11-20',
      nextDue: '2024-05-20',
      status: 'Overdue',
      location: 'Pressure Lab',
      technician: 'Sarah Wilson'
    },
    {
      id: 3,
      name: 'Temperature Sensor TS-500',
      serial: 'PS-089-2023',
      make: 'Omega',
      model: 'RTD-850',
      client: 'Process Solutions Ltd.',
      range: '-200°C to 850°C',
      frequency: '12 months',
      lastCal: '2024-01-10',
      nextDue: '2024-06-01',
      status: 'Due Soon',
      location: 'Temperature Lab',
      technician: 'Mike Johnson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Due Soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle className="w-4 h-4" />;
      case 'Overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'Due Soon': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status.toLowerCase().replace(' ', '') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600">Manage calibration devices and their schedules</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Device</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceName">Device Name</Label>
                  <Input id="deviceName" placeholder="Digital Multimeter DMM-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input id="serialNumber" placeholder="TC-001-2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" placeholder="Fluke" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" placeholder="175" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techcorp">TechCorp Industries</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing Co.</SelectItem>
                      <SelectItem value="process">Process Solutions Ltd.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Calibration Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 months</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="12months">12 months</SelectItem>
                      <SelectItem value="24months">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="range">Measurement Range</Label>
                  <Input id="range" placeholder="0-1000V AC/DC" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional device information..." />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Device</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search devices, serial numbers, or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="duesoon">Due Soon</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Device Table */}
      <Card>
        <CardHeader>
          <CardTitle>Devices ({filteredDevices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Device</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Serial Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Range</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Next Due</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.make} {device.model}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{device.client}</td>
                    <td className="py-3 px-4 text-gray-900 font-mono text-sm">{device.serial}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{device.range}</td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900">{device.nextDue}</div>
                      <div className="text-sm text-gray-500">Every {device.frequency}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(device.status)} flex items-center space-x-1`}>
                        {getStatusIcon(device.status)}
                        <span>{device.status}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="w-4 h-4" />
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

export default Devices;
