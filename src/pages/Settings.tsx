
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings as SettingsIcon, 
  Building2,
  FileText,
  Mail,
  Bell,
  Shield,
  Database,
  Upload
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Settings</h1>
          <p className="text-gray-600">Configure your calibration lab preferences and settings</p>
        </div>
        <Button>Save All Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
              Lab Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="labName">Laboratory Name</Label>
              <Input id="labName" defaultValue="CalibLab Certified" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labCode">Lab Code</Label>
                <Input id="labCode" defaultValue="CL-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accreditationNumber">Accreditation #</Label>
                <Input id="accreditationNumber" defaultValue="ISO-17025-2024" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Lab Address</Label>
              <Textarea id="address" defaultValue="123 Calibration Blvd, Science City, SC 12345" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-CALIB" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Lab Email</Label>
                <Input id="email" defaultValue="info@caliblab.com" />
              </div>
            </div>
            <div className="pt-4">
              <Label className="text-sm font-medium">Lab Logo</Label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Certificate Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certPrefix">Certificate Prefix</Label>
              <Input id="certPrefix" defaultValue="CAL-" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certTemplate">Default Template</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Template</SelectItem>
                  <SelectItem value="nabl">NABL Template</SelectItem>
                  <SelectItem value="iso">ISO Template</SelectItem>
                  <SelectItem value="custom">Custom Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signatory">Default Signatory</Label>
              <Input id="signatory" defaultValue="Dr. John Smith, Lab Director" />
            </div>
            <div className="space-y-2">
              <Label>Certificate Features</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="qrCode" className="text-sm">Include QR Code</Label>
                  <Switch id="qrCode" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="watermark" className="text-sm">Add Watermark</Label>
                  <Switch id="watermark" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="graphs" className="text-sm">Include Measurement Graphs</Label>
                  <Switch id="graphs" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-purple-600" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpServer">SMTP Server</Label>
              <Input id="smtpServer" defaultValue="smtp.caliblab.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpPort">Port</Label>
                <Input id="smtpPort" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="encryption">Encryption</Label>
                <Select defaultValue="tls">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input id="fromEmail" defaultValue="noreply@caliblab.com" />
            </div>
            <div className="space-y-2">
              <Label>Email Templates</Label>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Edit Due Date Reminder Template
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Edit Certificate Delivery Template
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Edit Overdue Notice Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-orange-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Due Date Reminders</Label>
                  <p className="text-xs text-gray-500">Notify clients before calibration due</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="ml-6 grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-xs">30 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-xs">15 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-xs">7 days</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Overdue Notifications</Label>
                <p className="text-xs text-gray-500">Alert when calibrations are overdue</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Certificate Generation</Label>
                <p className="text-xs text-gray-500">Notify when certificates are ready</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">System Alerts</Label>
                <p className="text-xs text-gray-500">Important system notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
                <Select defaultValue="60">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="120">120</SelectItem>
                    <SelectItem value="240">240</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Password Complexity</Label>
                <Switch defaultChecked />
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                View Audit Log
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Backup Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2 text-gray-600" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select defaultValue="est">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="cst">Central Time</SelectItem>
                    <SelectItem value="mst">Mountain Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupFreq">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Auto-backup to Cloud</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Data Retention (years)</Label>
              <Select defaultValue="7">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="forever">∞</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
