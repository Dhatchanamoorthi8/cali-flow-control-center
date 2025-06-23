
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Search, 
  Download,
  Mail,
  Edit,
  Eye,
  Calendar,
  Building2,
  QrCode,
  Printer
} from 'lucide-react';

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const certificates = [
    {
      id: 1,
      certificateNumber: 'CAL-2024-001',
      device: 'Digital Multimeter DMM-100',
      serial: 'TC-001-2023',
      client: 'TechCorp Industries',
      issueDate: '2024-05-20',
      technician: 'John Smith',
      result: 'Pass',
      validUntil: '2025-05-20',
      status: 'Issued',
      downloaded: true,
      emailSent: true
    },
    {
      id: 2,
      certificateNumber: 'CAL-2024-002',
      device: 'Pressure Gauge PG-250',
      serial: 'MC-045-2023',
      client: 'Manufacturing Co.',
      issueDate: '2024-05-18',
      technician: 'Sarah Wilson',
      result: 'Pass',
      validUntil: '2024-11-18',
      status: 'Issued',
      downloaded: false,
      emailSent: true
    },
    {
      id: 3,
      certificateNumber: 'CAL-2024-003',
      device: 'Temperature Sensor TS-500',
      serial: 'PS-089-2023',
      client: 'Process Solutions Ltd.',
      issueDate: '2024-05-15',
      technician: 'Mike Johnson',
      result: 'Pass',
      validUntil: '2025-05-15',
      status: 'Draft',
      downloaded: false,
      emailSent: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Issued': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Pass': return 'text-green-600';
      case 'Fail': return 'text-red-600';
      case 'Limited': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
          <p className="text-gray-600">Generate and manage calibration certificates</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Bulk Print
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Generate Certificate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Certificate Preview</DialogTitle>
              </DialogHeader>
              <div className="bg-white border rounded-lg p-8 space-y-6">
                {/* Certificate Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold">CalibLab Certified</h2>
                    <p className="text-sm text-gray-600">ISO/IEC 17025 Accredited</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">CALIBRATION CERTIFICATE</div>
                    <div className="text-lg">Certificate No: CAL-2024-004</div>
                    <div className="flex items-center justify-end mt-2">
                      <QrCode className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Client Information</h3>
                      <div className="space-y-1 text-sm">
                        <div><strong>Company:</strong> TechCorp Industries</div>
                        <div><strong>Address:</strong> 123 Industrial Blvd, Tech City, TC 12345</div>
                        <div><strong>Contact:</strong> John Anderson</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Device Information</h3>
                      <div className="space-y-1 text-sm">
                        <div><strong>Description:</strong> Digital Multimeter DMM-100</div>
                        <div><strong>Manufacturer:</strong> Fluke</div>
                        <div><strong>Model:</strong> 175</div>
                        <div><strong>Serial Number:</strong> TC-001-2023</div>
                        <div><strong>Range:</strong> 0-1000V AC/DC</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Calibration Information</h3>
                      <div className="space-y-1 text-sm">
                        <div><strong>Date of Calibration:</strong> May 20, 2024</div>
                        <div><strong>Technician:</strong> John Smith</div>
                        <div><strong>Standard Used:</strong> Fluke 5522A</div>
                        <div><strong>Temperature:</strong> 23.2°C ± 0.1°C</div>
                        <div><strong>Humidity:</strong> 45% ± 2%</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
                      <div className="space-y-1 text-sm">
                        <div><strong>Before Calibration:</strong> 999.8V</div>
                        <div><strong>After Calibration:</strong> 1000.0V</div>
                        <div><strong>Uncertainty:</strong> ±0.05% (k=2)</div>
                        <div className="flex items-center">
                          <strong>Result:</strong> 
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">PASS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Footer */}
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-2">Traceability</h4>
                      <p className="text-sm text-gray-600">
                        This calibration is traceable to National Institute of Standards and Technology (NIST)
                        through an unbroken chain of calibrations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next Calibration Due</h4>
                      <p className="text-lg font-medium text-blue-600">May 20, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="border-t border-gray-400 pt-2 w-48">
                        <p className="text-sm font-medium">John Smith</p>
                        <p className="text-xs text-gray-600">Calibration Technician</p>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>Certificate generated on: {new Date().toLocaleDateString()}</p>
                      <p>Valid until next calibration due date</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Edit Template</Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Certificate
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificates ({filteredCertificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Certificate #</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Device</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Issue Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Valid Until</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Result</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-blue-600">{cert.certificateNumber}</div>
                      <div className="text-sm text-gray-500">by {cert.technician}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{cert.device}</div>
                      <div className="text-sm text-gray-500">{cert.serial}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{cert.client}</td>
                    <td className="py-3 px-4 text-gray-900">{cert.issueDate}</td>
                    <td className="py-3 px-4 text-gray-900">{cert.validUntil}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getResultColor(cert.result)}`}>
                        {cert.result}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        {cert.status === 'Draft' && (
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
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

export default Certificates;
