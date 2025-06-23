
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Download,
  Calendar,
  TrendingUp,
  Users,
  ClipboardList,
  FileText,
  AlertTriangle
} from 'lucide-react';

const Reports = () => {
  const reportCards = [
    {
      title: 'Monthly Calibration Summary',
      description: 'Summary of calibrations completed this month',
      icon: Calendar,
      value: '156',
      change: '+18%',
      color: 'bg-blue-500'
    },
    {
      title: 'Technician Performance',
      description: 'Calibrations completed by each technician',
      icon: Users,
      value: '3',
      change: 'Active',
      color: 'bg-green-500'
    },
    {
      title: 'Device Statistics',
      description: 'Device calibration frequency analysis',
      icon: ClipboardList,
      value: '1,247',
      change: '+12 devices',
      color: 'bg-purple-500'
    },
    {
      title: 'Compliance Rate',
      description: 'Percentage of on-time calibrations',
      icon: TrendingUp,
      value: '94.2%',
      change: '+2.1%',
      color: 'bg-orange-500'
    }
  ];

  const monthlyData = [
    { month: 'Jan', calibrations: 120, overdue: 5 },
    { month: 'Feb', calibrations: 135, overdue: 3 },
    { month: 'Mar', calibrations: 142, overdue: 8 },
    { month: 'Apr', calibrations: 128, overdue: 12 },
    { month: 'May', calibrations: 156, overdue: 7 }
  ];

  const technicianData = [
    { name: 'John Smith', completed: 45, efficiency: '95%' },
    { name: 'Sarah Wilson', completed: 52, efficiency: '97%' },
    { name: 'Mike Johnson', completed: 38, efficiency: '92%' },
    { name: 'Lisa Rodriguez', completed: 41, efficiency: '94%' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Monitor lab performance and generate insights</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="thismonth">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisweek">This Week</SelectItem>
              <SelectItem value="thismonth">This Month</SelectItem>
              <SelectItem value="thisquarter">This Quarter</SelectItem>
              <SelectItem value="thisyear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className={`w-8 h-8 ${card.color} rounded-md flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <p className="text-xs text-gray-600 mt-1">{card.description}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-xs text-green-600">{card.change}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Calibration Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Monthly Calibration Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${(data.calibrations / 160) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{data.calibrations}</div>
                    {data.overdue > 0 && (
                      <div className="text-xs text-red-600">{data.overdue} overdue</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technician Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Technician Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicianData.map((tech, index) => (
                <div key={tech.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">
                        {tech.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tech.name}</div>
                      <div className="text-sm text-gray-500">{tech.completed} calibrations</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{tech.efficiency}</div>
                    <div className="text-xs text-gray-500">Efficiency</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-600" />
            Quick Report Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 mb-2 text-blue-600" />
              <span className="font-medium">Monthly Summary</span>
              <span className="text-xs text-gray-500">Calibration overview</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <AlertTriangle className="w-6 h-6 mb-2 text-red-600" />
              <span className="font-medium">Overdue Report</span>
              <span className="text-xs text-gray-500">Late calibrations</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <Users className="w-6 h-6 mb-2 text-green-600" />
              <span className="font-medium">Client Report</span>
              <span className="text-xs text-gray-500">By client analysis</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <ClipboardList className="w-6 h-6 mb-2 text-purple-600" />
              <span className="font-medium">Device Report</span>
              <span className="text-xs text-gray-500">Equipment status</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <TrendingUp className="w-6 h-6 mb-2 text-orange-600" />
              <span className="font-medium">Trend Analysis</span>
              <span className="text-xs text-gray-500">Performance trends</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
              <FileText className="w-6 h-6 mb-2 text-gray-600" />
              <span className="font-medium">Custom Report</span>
              <span className="text-xs text-gray-500">Build your own</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
