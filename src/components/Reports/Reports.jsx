// src/components/Reports/Reports.jsx
import React, { useState } from 'react';
import { DatePicker, Card, Table, Select, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Reports.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports = ({ buses }) => {
  const [dateRange, setDateRange] = useState(null);
  const [reportType, setReportType] = useState('fuel');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState([]);

  // Mock data generation - replace with actual API calls
  const generateReportData = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let data = [];
      
      if (reportType === 'fuel') {
        data = buses.map(bus => ({
          name: bus.id,
          fuelLevel: bus.fuelLevel,
          avgConsumption: Math.random() * 10 + 5
        }));
      } else if (reportType === 'utilization') {
        data = buses.map(bus => ({
          name: bus.id,
          trips: Math.floor(Math.random() * 10) + 1,
          hours: (Math.random() * 8 + 4).toFixed(1)
        }));
      }
      
      setReportData(data);
      setLoading(false);
    }, 1000);
  };

  const columns = {
    fuel: [
      {
        title: 'Bus ID',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Fuel Level (%)',
        dataIndex: 'fuelLevel',
        key: 'fuelLevel',
        sorter: (a, b) => a.fuelLevel - b.fuelLevel,
      },
      {
        title: 'Avg Consumption (km/L)',
        dataIndex: 'avgConsumption',
        key: 'avgConsumption',
        sorter: (a, b) => a.avgConsumption - b.avgConsumption,
      },
    ],
    utilization: [
      {
        title: 'Bus ID',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Trips Completed',
        dataIndex: 'trips',
        key: 'trips',
        sorter: (a, b) => a.trips - b.trips,
      },
      {
        title: 'Operational Hours',
        dataIndex: 'hours',
        key: 'hours',
        sorter: (a, b) => a.hours - b.hours,
      },
    ],
  };

  return (
    <div className="reports-container">
      <Card title="Generate Report" className="report-controls">
        <div className="controls-row">
          <RangePicker
            style={{ width: '40%', marginRight: 16 }}
            onChange={setDateRange}
            disabledDate={current => current && current > new Date()}
          />
          
          <Select
            style={{ width: '30%', marginRight: 16 }}
            value={reportType}
            onChange={setReportType}
          >
            <Option value="fuel">Fuel Consumption</Option>
            <Option value="utilization">Bus Utilization</Option>
            <Option value="maintenance">Maintenance</Option>
          </Select>
          
          <Button
            type="primary"
            onClick={generateReportData}
            disabled={!dateRange}
            loading={loading}
          >
            Generate
          </Button>
        </div>
      </Card>

      {reportData.length > 0 && (
        <>
          <Card title="Chart View" className="report-chart">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {reportType === 'fuel' ? (
                  <>
                    <Bar dataKey="fuelLevel" fill="#8884d8" name="Fuel Level (%)" />
                    <Bar dataKey="avgConsumption" fill="#82ca9d" name="Avg Consumption (km/L)" />
                  </>
                ) : (
                  <>
                    <Bar dataKey="trips" fill="#ffc658" name="Trips Completed" />
                    <Bar dataKey="hours" fill="#ff8042" name="Operational Hours" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Data Table" className="report-table">
            <Table
              columns={columns[reportType]}
              dataSource={reportData}
              rowKey="name"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default Reports;