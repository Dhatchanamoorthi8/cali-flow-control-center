
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
  Clock,
  History,
  FileText,
  Copy
} from 'lucide-react';

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - will be replaced with Supabase queries
  const instruments = [
    {
      id: 1,
      name: 'Digital Multimeter DMM-100',
      serialNumber: 'TC-001-2023',
      make: 'Fluke',
      model: '175',
      client: 'TechCorp Industries',
      clientId: 'client-1',
      range: '0-1000V AC/DC',
      accuracy: '±0.05%',
      calibrationFrequency: 365, // days
      lastCalibratedDate: '2024-05-15',
      nextDueDate: '2025-05-15',
      status: 'Active',
      calibrationStatus: 'Compliant',
      location: 'Main Lab',
      daysUntilDue: 165
    },
    {
      id: 2,
      name: 'Pressure Gauge PG-250',
      serialNumber: 'MC-045-2023',
      make: 'Ashcroft',
      model: 'T5500',
      client: 'Manufacturing Co.',
      clientId: 'client-2',
      range: '0-250 PSI',
      accuracy: '±0.1%',
      calibrationFrequency: 180,
      lastCalibratedDate: '2023-11-20',
      nextDueDate: '2024-05-20',
      status: 'Active',
      calibrationStatus: 'Overdue',
      location: 'Pressure Lab',
      daysUntilDue: -7
    },
    {
      id: 3,
      name: 'Temperature Sensor TS-500',
      serialNumber: 'PS-089-2023',
      make: 'Omega',
      model: 'RTD-850',
      client: 'Process Solutions Ltd.',
      clientId: 'client-3',
      range: '-200°C to 850°C',
      accuracy: '±0.1°C',
      calibrationFrequency: 365,
      lastCalibratedDate: '2024-01-10',
      nextDueDate: '2024-06-01',
      status: 'Active',
      calibrationStatus: 'Due Soon',
      location: 'Temperature Lab',
      daysUntilDue: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Due Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Retired': return 'bg-gray-100 text-gray-800';
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

  const getDaysUntilDueText = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days <= 30) return `Due in ${days} days`;
    return `Due in ${Math.ceil(days / 30)} months`;
  };

  const filteredInstruments = instruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instrument.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'compliant' && instrument.calibrationStatus === 'Compliant') ||
                         (filterStatus === 'duesoon' && instrument.calibrationStatus === 'Due Soon') ||
                         (filterStatus === 'overdue' && instrument.calibrationStatus === 'Overdue');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instrument Management</h1>
          <p className="text-gray-600">Manage calibration instruments and their schedules</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Instrument
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Instrument</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="instrumentName">Instrument Name *</Label>
                  <Input id="instrumentName" placeholder="Digital Multimeter DMM-100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number *</Label>
                  <Input id="serialNumber" placeholder="TC-001-2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make/Manufacturer *</Label>
                  <Input id="make" placeholder="Fluke" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input id="model" placeholder="175" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
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
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Main Lab" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="range">Measurement Range *</Label>
                  <Input id="range" placeholder="0-1000V AC/DC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accuracy">Accuracy *</Label>
                  <Input id="accuracy" placeholder="±0.05%" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Calibration Frequency (Days) *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 days (3 months)</SelectItem>
                      <SelectItem value="180">180 days (6 months)</SelectItem>
                      <SelectItem value="365">365 days (12 months)</SelectItem>
                      <SelectItem value="730">730 days (24 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastCalibrated">Last Calibrated Date</Label>
                  <Input id="lastCalibrated" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional instrument information..." />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Instrument</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Instruments</p>
                <p className="text-2xl font-bold">{instruments.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Compliant</p>
                <p className="text-2xl font-bold text-green-600">
                  {instruments.filter(i => i.calibrationStatus === 'Compliant').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {instruments.filter(i => i.calibrationStatus === 'Due Soon').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {instruments.filter(i => i.calibrationStatus === 'Overdue').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search instruments, serial numbers, or clients..."
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

      {/* Instruments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Instruments ({filteredInstruments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Instrument</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Serial Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Range & Accuracy</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Next Due</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstruments.map((instrument) => (
                  <tr key={instrument.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{instrument.name}</div>
                        <div className="text-sm text-gray-500">{instrument.make} {instrument.model}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{instrument.client}</td>
                    <td className="py-3 px-4 text-gray-900 font-mono text-sm">{instrument.serialNumber}</td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900 text-sm">{instrument.range}</div>
                      <div className="text-gray-500 text-xs">±{instrument.accuracy}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900">{instrument.nextDueDate}</div>
                      <div className={`text-sm ${instrument.daysUntilDue < 0 ? 'text-red-600' : 
                        instrument.daysUntilDue <= 30 ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {getDaysUntilDueText(instrument.daysUntilDue)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(instrument.calibrationStatus)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(instrument.calibrationStatus)}
                        <span>{instrument.calibrationStatus}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" title="Start Calibration">
                          <Calendar className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="View History">
                          <History className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Clone Instrument">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Generate Certificate">
                          <FileText className="w-4 h-4" />
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
