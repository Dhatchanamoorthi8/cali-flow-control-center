import React, { useRef, useState, useCallback } from 'react';
import { HotTable } from '@handsontable/react';
import { HyperFormula } from 'hyperformula';
import { registerCellType, NumericCellType, DropdownCellType } from 'handsontable/cellTypes';
import 'handsontable/dist/handsontable.full.min.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Download, 
  Merge, 
  Split, 
  Calculator,
  Settings,
  FileSpreadsheet
} from 'lucide-react';

// Register the cell types
registerCellType('numeric', NumericCellType);
registerCellType('dropdown', DropdownCellType);

interface CalibrationSpreadsheetProps {
  deviceId?: string;
  deviceName?: string;
  onSave?: (data: any) => void;
  onComplete?: (data: any) => void;
}

export const CalibrationSpreadsheet: React.FC<CalibrationSpreadsheetProps> = ({
  deviceId,
  deviceName = "Digital Multimeter DMM-100",
  onSave,
  onComplete
}) => {
  const hotTableRef = useRef<any>(null);
  const [decimalPlaces, setDecimalPlaces] = useState(3);
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [calibrationStatus, setCalibrationStatus] = useState<'draft' | 'completed'>('draft');

  // Initialize HyperFormula engine
  const hfInstance = HyperFormula.buildEmpty({
    licenseKey: 'non-commercial-and-evaluation'
  });

  // Sample calibration data structure
  const initialData = [
    ['Point', 'Standard Value', 'Measured Value', 'Error', 'Uncertainty', 'Status', 'Notes'],
    ['1', '0.000', '', '=C2-B2', '±0.001', '', ''],
    ['2', '10.000', '', '=C3-B3', '±0.001', '', ''],
    ['3', '50.000', '', '=C4-B4', '±0.001', '', ''],
    ['4', '100.000', '', '=C5-B5', '±0.001', '', ''],
    ['5', '500.000', '', '=C6-B6', '±0.001', '', ''],
    ['6', '1000.000', '', '=C7-B7', '±0.001', '', ''],
    ['', '', '', '', '', '', ''],
    ['Statistics', '', '', '', '', '', ''],
    ['Max Error', '', '', '=MAX(D2:D7)', '', '', ''],
    ['Min Error', '', '', '=MIN(D2:D7)', '', '', ''],
    ['Average Error', '', '', '=AVERAGE(D2:D7)', '', '', ''],
    ['Standard Deviation', '', '', '=STDEV(D2:D7)', '', '', '']
  ];

  const [data, setData] = useState(initialData);

  const hotSettings = {
    data: data,
    rowHeaders: true,
    colHeaders: true,
    height: 'auto',
    width: '100%',
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'all' as const,
    contextMenu: true,
    mergeCells: [
      { row: 8, col: 0, rowspan: 1, colspan: 2 },
      { row: 9, col: 0, rowspan: 1, colspan: 2 },
      { row: 10, col: 0, rowspan: 1, colspan: 2 },
      { row: 11, col: 0, rowspan: 1, colspan: 2 },
      { row: 12, col: 0, rowspan: 1, colspan: 2 }
    ],
    formulas: {
      engine: hfInstance
    },
    columnSorting: true,
    filters: true,
    dropdownMenu: true,
    manualColumnResize: true,
    manualRowResize: true,
    columns: [
      { type: 'text', width: 80 },
      { type: 'numeric', numericFormat: { pattern: `0.${'0'.repeat(decimalPlaces)}` }, width: 120 },
      { type: 'numeric', numericFormat: { pattern: `0.${'0'.repeat(decimalPlaces)}` }, width: 120 },
      { type: 'numeric', numericFormat: { pattern: `0.${'0'.repeat(decimalPlaces)}` }, width: 100, readOnly: true },
      { type: 'text', width: 100 },
      { 
        type: 'dropdown',
        source: ['Pass', 'Fail', 'N/A'],
        width: 80
      },
      { type: 'text', width: 150 }
    ],
    cells: function(row: number, col: number) {
      const cellProperties: any = {};
      
      // Header row styling
      if (row === 0) {
        cellProperties.className = 'bg-blue-100 font-bold text-center';
        cellProperties.readOnly = true;
      }
      
      // Statistics section styling
      if (row >= 8 && row <= 12) {
        if (col === 0 || col === 1) {
          cellProperties.className = 'bg-gray-100 font-semibold';
          if (row === 8) cellProperties.readOnly = true;
        }
        if (col === 3 && row >= 9) {
          cellProperties.className = 'bg-yellow-50';
        }
      }
      
      // Error column styling based on value
      if (col === 3 && row > 0 && row < 7) {
        cellProperties.className = 'bg-red-50';
      }
      
      return cellProperties;
    }
  };

  const handleSave = useCallback(() => {
    if (hotTableRef.current) {
      const hotInstance = hotTableRef.current.hotInstance;
      const currentData = hotInstance.getData();
      console.log('Saving calibration data:', currentData);
      
      if (onSave) {
        onSave({
          deviceId,
          deviceName,
          calibrationData: currentData,
          status: calibrationStatus,
          timestamp: new Date().toISOString()
        });
      }
    }
  }, [deviceId, deviceName, calibrationStatus, onSave]);

  const handleComplete = useCallback(() => {
    setCalibrationStatus('completed');
    handleSave();
    
    if (onComplete) {
      const hotInstance = hotTableRef.current.hotInstance;
      const currentData = hotInstance.getData();
      onComplete({
        deviceId,
        deviceName,
        calibrationData: currentData,
        status: 'completed',
        timestamp: new Date().toISOString()
      });
    }
  }, [deviceId, deviceName, handleSave, onComplete]);

  const mergeCells = useCallback(() => {
    if (hotTableRef.current) {
      const hotInstance = hotTableRef.current.hotInstance;
      const selected = hotInstance.getSelected();
      if (selected && selected.length > 0) {
        const [startRow, startCol, endRow, endCol] = selected[0];
        hotInstance.getPlugin('mergeCells').mergeRange({
          row: startRow,
          col: startCol,
          rowspan: endRow - startRow + 1,
          colspan: endCol - startCol + 1
        });
      }
    }
  }, []);

  const unmergeCells = useCallback(() => {
    if (hotTableRef.current) {
      const hotInstance = hotTableRef.current.hotInstance;
      const selected = hotInstance.getSelected();
      if (selected && selected.length > 0) {
        const [startRow, startCol] = selected[0];
        hotInstance.getPlugin('mergeCells').unmergeRange(startRow, startCol);
      }
    }
  }, []);

  const updateDecimalPlaces = useCallback((places: number) => {
    setDecimalPlaces(places);
    if (hotTableRef.current) {
      const hotInstance = hotTableRef.current.hotInstance;
      hotInstance.updateSettings({
        columns: [
          { type: 'text', width: 80 },
          { type: 'numeric', numericFormat: { pattern: `0.${'0'.repeat(places)}` }, width: 120 },
          { type: 'numeric', numericFormat: { pattern: `0.${'0'.repeat(places)}` }, width: 120 },
          { type: 'numeric', numericFormat: { pattern: `0.${'0'.repeat(places)}` }, width: 100, readOnly: true },
          { type: 'text', width: 100 },
          { 
            type: 'dropdown',
            source: ['Pass', 'Fail', 'N/A'],
            width: 80
          },
          { type: 'text', width: 150 }
        ]
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5" />
                <span>Calibration Data Entry</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">{deviceName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={calibrationStatus === 'completed' ? 'default' : 'secondary'}>
                {calibrationStatus === 'completed' ? 'Completed' : 'Draft'}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimal-places">Decimal Places</Label>
              <Select 
                value={decimalPlaces.toString()} 
                onValueChange={(value) => updateDecimalPlaces(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 decimal</SelectItem>
                  <SelectItem value="2">2 decimals</SelectItem>
                  <SelectItem value="3">3 decimals</SelectItem>
                  <SelectItem value="4">4 decimals</SelectItem>
                  <SelectItem value="5">5 decimals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Cell Operations</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={mergeCells}>
                  <Merge className="w-4 h-4 mr-1" />
                  Merge
                </Button>
                <Button variant="outline" size="sm" onClick={unmergeCells}>
                  <Split className="w-4 h-4 mr-1" />
                  Unmerge
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Auto Calculate</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={autoCalculate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoCalculate(!autoCalculate)}
                >
                  <Calculator className="w-4 h-4 mr-1" />
                  {autoCalculate ? 'ON' : 'OFF'}
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Actions</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" onClick={handleComplete}>
                  <Download className="w-4 h-4 mr-1" />
                  Complete
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spreadsheet */}
      <Card>
        <CardContent className="p-4">
          <div className="w-full overflow-auto">
            <div className="min-w-[800px]">
              <HotTable
                ref={hotTableRef}
                settings={hotSettings}
                className="calibration-spreadsheet"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter measured values in the "Measured Value" column</li>
            <li>• Error calculations are automatic (Measured - Standard)</li>
            <li>• Right-click for context menu with merge/unmerge options</li>
            <li>• Use dropdown for Pass/Fail status</li>
            <li>• Statistics are calculated automatically at the bottom</li>
            <li>• Adjust decimal places using the control above</li>
            <li>• Save as draft or complete the calibration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
