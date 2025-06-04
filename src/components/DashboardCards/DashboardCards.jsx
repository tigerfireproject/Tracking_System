// src/components/DashboardCards/DashboardCards.jsx
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import './DashboardCards.css';

const DashboardCards = ({ buses, fuelData }) => {
  const totalBuses = buses.length;
  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const lowFuelBuses = buses.filter(bus => bus.fuelLevel < 20).length;
  const avgFuelLevel = buses.reduce((sum, bus) => sum + bus.fuelLevel, 0) / totalBuses || 0;

  return (
    <div className="dashboard-cards">
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Buses"
              value={totalBuses}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Buses"
              value={activeBuses}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Low Fuel Buses"
              value={lowFuelBuses}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Avg Fuel Level"
              value={avgFuelLevel.toFixed(1)}
              suffix="%"
              valueStyle={{ color: avgFuelLevel > 50 ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;