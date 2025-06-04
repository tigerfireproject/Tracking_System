// src/components/FuelStatus/FuelStatus.jsx
import React from 'react';
import { Table, Progress } from 'antd';
import './FuelStatus.css';

const FuelStatus = ({ data }) => {
  const columns = [
    {
      title: 'Bus ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Route',
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: 'Fuel Level',
      dataIndex: 'fuelLevel',
      key: 'fuelLevel',
      render: (level) => (
        <Progress
          percent={level}
          status={level < 20 ? 'exception' : level < 50 ? 'warning' : 'normal'}
          showInfo={false}
        />
      ),
      sorter: (a, b) => a.fuelLevel - b.fuelLevel,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`status-${status.toLowerCase()}`}>
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Last Refuel',
      dataIndex: 'lastRefuel',
      key: 'lastRefuel',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="fuel-status">
      <h2>Fuel Status Overview</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default FuelStatus;