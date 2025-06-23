
import React, { useState } from 'react';
import { CalibrationSpreadsheet } from '@/components/CalibrationSpreadsheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Calendar, Thermometer, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalibrationEntry = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState('dmm-100');
  const [technician, setTechnician] = useState('');
  const [environmentalConditions, setEnvironmentalConditions] = useState({
    temperature: '',
    humidity: '',
    pressure: ''
  });
  const [comments, setComments] = useState('');

  const devices = [
    { id: 'dmm-100', name: 'Digital Multimeter DMM-100', serial: 'TC-001-2023' },
    { id: 'pg-250', name: 'Pressure Gauge PG-250', serial: 'MC-045-2023' },
    { id: 'ts-500', name: 'Temperature Sensor TS-500', serial: 'PS-089-2023' }
  ];

  const technicians = [
    { id: 'john', name: 'John Smith' },
    { id: 'sarah', name: 'Sarah Wilson' },
    { id: 'mike', name: 'Mike Johnson' }
  ];

  const handleSaveCalibration = (data: any) => {
    console.log('Saving calibration:', data);
    // Here you would typically save to your backend
  };

  const handleCompleteCalibration = (data: any) => {
    console.log('Completing calibration:', data);
    // Here you would typically finalize the calibration and generate certificates
    navigate('/calibrations');
  };

  const selectedDeviceInfo = devices.find(d => d.id === selectedDevice);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/calibrations')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calibrations
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calibration Data Entry</h1>
            <p className="text-gray-600">Enter calibration measurements and calculations</p>
          </div>
        </div>

        {/* Device and Setup Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Device Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="device">Select Device</Label>
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map(device => (
                      <SelectItem key={device.id} value={device.id}>
                        {device.name} ({device.serial})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedDeviceInfo && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">{selectedDeviceInfo.name}</p>
                  <p className="text-sm text-gray-600">S/N: {selectedDeviceInfo.serial}</p>
                </div>
              )}

              <div>
                <Label htmlFor="technician">Assigned Technician</Label>
                <Select value={technician} onValueChange={setTechnician}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    {technicians.map(tech => (
                      <SelectItem key={tech.id} value={tech.id}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Environmental Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <div className="relative">
                  <Input
                    id="temperature"
                    value={environmentalConditions.temperature}
                    onChange={(e) => setEnvironmentalConditions(prev => ({
                      ...prev,
                      temperature: e.target.value
                    }))}
                    placeholder="23.2"
                  />
                  <Thermometer className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="humidity">Humidity (%)</Label>
                <div className="relative">
                  <Input
                    id="humidity"
                    value={environmentalConditions.humidity}
                    onChange={(e) => setEnvironmentalConditions(prev => ({
                      ...prev,
                      humidity: e.target.value
                    }))}
                    placeholder="45"
                  />
                  <Droplets className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="pressure">Atmospheric Pressure (hPa)</Label>
                <Input
                  id="pressure"
                  value={environmentalConditions.pressure}
                  onChange={(e) => setEnvironmentalConditions(prev => ({
                    ...prev,
                    pressure: e.target.value
                  }))}
                  placeholder="1013.25"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">Calibration Date</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="standard">Calibration Standard</Label>
                <Input
                  id="standard"
                  placeholder="Fluke 5522A"
                />
              </div>

              <div>
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Additional observations or notes..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calibration Spreadsheet */}
        <CalibrationSpreadsheet
          deviceId={selectedDevice}
          deviceName={selectedDeviceInfo?.name}
          onSave={handleSaveCalibration}
          onComplete={handleCompleteCalibration}
        />
      </div>
    </div>
  );
};

export default CalibrationEntry;
