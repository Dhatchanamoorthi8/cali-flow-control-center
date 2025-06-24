
-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'technician', 'client');
CREATE TYPE device_status AS ENUM ('active', 'inactive', 'maintenance', 'retired');
CREATE TYPE calibration_status AS ENUM ('scheduled', 'in_progress', 'completed', 'overdue', 'cancelled');

-- Create profiles table for extended user information
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'technician',
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create clients table
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  industry TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create devices table
CREATE TABLE devices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  model TEXT,
  serial_number TEXT UNIQUE NOT NULL,
  manufacturer TEXT,
  device_type TEXT,
  calibration_interval INTEGER DEFAULT 365,
  status device_status DEFAULT 'active',
  last_calibration_date DATE,
  next_calibration_date DATE,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create calibrations table
CREATE TABLE calibrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES profiles(id),
  client_id UUID REFERENCES clients(id),
  scheduled_date DATE NOT NULL,
  completed_date DATE,
  status calibration_status DEFAULT 'scheduled',
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  pressure DECIMAL(6,2),
  calibration_standard TEXT,
  measurement_data JSONB,
  comments TEXT,
  certificate_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create certificates table
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  calibration_id UUID REFERENCES calibrations(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_date DATE DEFAULT CURRENT_DATE,
  valid_until DATE,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data::json->>'full_name', 'User'),
    CASE 
      WHEN NEW.email = 'admin@calibrationlab.com' THEN 'admin'::user_role
      ELSE 'technician'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE calibrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients policies
CREATE POLICY "Authenticated users can view clients" ON clients
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and technicians can manage clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'technician')
    )
  );

-- Devices policies
CREATE POLICY "Authenticated users can view devices" ON devices
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and technicians can manage devices" ON devices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'technician')
    )
  );

-- Calibrations policies
CREATE POLICY "Users can view calibrations" ON calibrations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Technicians can manage their calibrations" ON calibrations
  FOR ALL USING (
    technician_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Certificates policies
CREATE POLICY "Authenticated users can view certificates" ON certificates
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage certificates" ON certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_devices_client_id ON devices(client_id);
CREATE INDEX idx_devices_next_calibration ON devices(next_calibration_date);
CREATE INDEX idx_calibrations_device_id ON calibrations(device_id);
CREATE INDEX idx_calibrations_technician_id ON calibrations(technician_id);
CREATE INDEX idx_calibrations_status ON calibrations(status);
CREATE INDEX idx_calibrations_scheduled_date ON calibrations(scheduled_date);

-- Insert sample data
INSERT INTO clients (name, contact_person, email, phone, address, industry) VALUES
('TechCorp Industries', 'John Smith', 'john@techcorp.com', '+1-555-0101', '123 Tech Street, Silicon Valley', 'Technology'),
('Manufacturing Co.', 'Sarah Wilson', 'sarah@manufacturing.com', '+1-555-0202', '456 Industrial Ave, Detroit', 'Manufacturing'),
('Process Solutions Ltd.', 'Mike Johnson', 'mike@processsolutions.com', '+1-555-0303', '789 Process Blvd, Houston', 'Chemical');

-- Insert sample devices
INSERT INTO devices (client_id, name, model, serial_number, manufacturer, device_type, last_calibration_date, next_calibration_date) VALUES
((SELECT id FROM clients WHERE name = 'TechCorp Industries'), 'Digital Multimeter DMM-100', 'DMM-100', 'TC-001-2023', 'Fluke', 'Electrical', '2024-01-15', '2025-01-15'),
((SELECT id FROM clients WHERE name = 'Manufacturing Co.'), 'Pressure Gauge PG-250', 'PG-250', 'MC-045-2023', 'Omega', 'Pressure', '2024-02-20', '2025-02-20'),
((SELECT id FROM clients WHERE name = 'Process Solutions Ltd.'), 'Temperature Sensor TS-500', 'TS-500', 'PS-089-2023', 'Honeywell', 'Temperature', '2024-03-10', '2025-03-10');
