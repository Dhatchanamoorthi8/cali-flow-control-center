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
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit,
  FileText,
  Thermometer,
  Droplets,
  FileSpreadsheet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Calibrations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const calibrations = [
    {
      id: 1,
      device: 'Digital Multimeter DMM-100',
      serial: 'TC-001-2023',
      client: 'TechCorp Industries',
      technician: 'John Smith',
      scheduledDate: '2024-05-25',
      status: 'In Progress',
      type: 'Routine',
      location: 'Main Lab',
      temperature: '23.2°C',
      humidity: '45%',
      standardUsed: 'Fluke 5522A',
      beforeValues: '999.8V',
      afterValues: '1000.0V',
      uncertainty: '±0.05%',
      result: 'Pass'
    },
    {
      id: 2,
      device: 'Pressure Gauge PG-250',
      serial: 'MC-045-2023',
      client: 'Manufacturing Co.',
      technician: 'Sarah Wilson',
      scheduledDate: '2024-05-20',
      status: 'Completed',
      type: 'Due',
      location: 'Pressure Lab',
      temperature: '22.8°C',
      humidity: '48%',
      standardUsed: 'DH-Budenberg 380',
      beforeValues: '249.2 PSI',
      afterValues: '250.0 PSI',
      uncertainty: '±0.1%',
      result: 'Pass'
    },
    {
      id: 3,
      device: 'Temperature Sensor TS-500',
      serial: 'PS-089-2023',
      client: 'Process Solutions Ltd.',
      technician: 'Mike Johnson',
      scheduledDate: '2024-06-01',
      status: 'Scheduled',
      type: 'Routine',
      location: 'Temperature Lab',
      temperature: '23.5°C',
      humidity: '42%',
      standardUsed: 'Hart 1590',
      beforeValues: '',
      afterValues: '',
      uncertainty: '±0.1°C',
      result: 'Pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Scheduled': return <Calendar className="w-4 h-4" />;
      case 'Overdue': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredCalibrations = calibrations.filter(calibration => {
    const matchesSearch = calibration.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calibration.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         calibration.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || calibration.status.toLowerCase().replace(' ', '') === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calibration Workflow</h1>
          <p className="text-gray-600">Manage calibration processes and record results</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Bulk Import
          </Button>
          <Button onClick={() => navigate('/calibration-entry')}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            New Calibration Entry
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search calibrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calibrations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCalibrations.map((calibration) => (
          <Card key={calibration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{calibration.device}</CardTitle>
                  <p className="text-sm text-gray-500">{calibration.client} • {calibration.serial}</p>
                </div>
                <Badge className={`${getStatusColor(calibration.status)} flex items-center space-x-1`}>
                  {getStatusIcon(calibration.status)}
                  <span>{calibration.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{calibration.technician}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{calibration.scheduledDate}</span>
                </div>
              </div>

              {calibration.status === 'Completed' && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Before:</span>
                      <span className="ml-2 font-medium">{calibration.beforeValues}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">After:</span>
                      <span className="ml-2 font-medium">{calibration.afterValues}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Uncertainty:</span>
                      <div className="font-medium">{calibration.uncertainty}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Result:</span>
                      <div className={`font-medium ${calibration.result === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
                        {calibration.result}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Temp:</span>
                      <div className="font-medium">{calibration.temperature}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate('/calibration-entry')}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Data Entry
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Calibrations;
