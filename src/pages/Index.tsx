
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  ClipboardList, 
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

const Index = () => {
  const stats = [
    {
      title: 'Total Devices',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: ClipboardList,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Overdue Calibrations',
      value: '23',
      change: '-8%',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'This Month',
      value: '156',
      change: '+18%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  const overdueDevices = [
    {
      device: 'Digital Multimeter DMM-100',
      client: 'TechCorp Industries',
      serial: 'TC-001-2023',
      dueDate: '2024-05-15',
      daysOverdue: 12,
      status: 'Overdue'
    },
    {
      device: 'Pressure Gauge PG-250',
      client: 'Manufacturing Co.',
      serial: 'MC-045-2023',
      dueDate: '2024-05-20',
      daysOverdue: 7,
      status: 'Overdue'
    },
    {
      device: 'Temperature Sensor TS-500',
      client: 'Process Solutions Ltd.',
      serial: 'PS-089-2023',
      dueDate: '2024-05-22',
      daysOverdue: 5,
      status: 'Overdue'
    }
  ];

  const upcomingCalibrations = [
    {
      device: 'Flow Meter FM-300',
      client: 'Energy Systems Inc.',
      serial: 'ES-234-2023',
      dueDate: '2024-06-05',
      technician: 'John Smith',
      status: 'Scheduled'
    },
    {
      device: 'Oscilloscope OSC-1000',
      client: 'Electronics Hub',
      serial: 'EH-567-2023',
      dueDate: '2024-06-08',
      technician: 'Sarah Wilson',
      status: 'Pending'
    },
    {
      device: 'Power Supply PS-2000',
      client: 'Research Labs',
      serial: 'RL-890-2023',
      dueDate: '2024-06-10',
      technician: 'Mike Johnson',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your calibration lab operations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Calibration
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 ${stat.color} rounded-md flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className={`w-3 h-3 mr-1 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-xs ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Calibrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Overdue Calibrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overdueDevices.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{device.device}</h4>
                    <p className="text-sm text-gray-600">{device.client} • {device.serial}</p>
                    <p className="text-xs text-red-600">Due: {device.dueDate} ({device.daysOverdue} days overdue)</p>
                  </div>
                  <Badge variant="destructive">Overdue</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Overdue Items
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Calibrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Clock className="w-5 h-5 mr-2" />
              Upcoming Calibrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingCalibrations.map((calibration, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{calibration.device}</h4>
                    <p className="text-sm text-gray-600">{calibration.client} • {calibration.serial}</p>
                    <p className="text-xs text-blue-600">Due: {calibration.dueDate} • Tech: {calibration.technician}</p>
                  </div>
                  <Badge variant={calibration.status === 'Scheduled' ? 'default' : 'secondary'}>
                    {calibration.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View Calibration Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <ClipboardList className="w-6 h-6 mb-2" />
              Add Device
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Users className="w-6 h-6 mb-2" />
              New Client
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              Schedule Cal.
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <CheckCircle className="w-6 h-6 mb-2" />
              Record Results
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Generate Cert.
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <TrendingUp className="w-6 h-6 mb-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
