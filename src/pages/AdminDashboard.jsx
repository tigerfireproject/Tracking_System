// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Spin, Alert } from 'antd';
import BusMap from '../components/BusMap/BusMap';
import DashboardCards from '../components/DashboardCards/DashboardCards';
import FuelStatus from '../components/FuelStatus/FuelStatus';
import NotificationCenter from '../components/NotificationCenter/NotificationCenter';
import Reports from '../components/Reports/Reports';
import { fetchBuses, fetchFuelData } from '../services/api';
import './AdminDashboard.css';
import { initializeSocket, disconnectSocket } from '../services/socket';

const { Header, Content, Sider } = Layout;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [buses, setBuses] = useState([]);
  const [fuelData, setFuelData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [error, setError] = useState(null);

  // Update the useEffect in AdminDashboard.jsx
useEffect(() => {
  const loadData = async () => {
    try {
      const [busesData, fuelData] = await Promise.all([
        fetchBuses(),
        fetchFuelData()
      ]);
      setBuses(busesData);
      setFuelData(fuelData);
      setLoading(false);
      
      // Initialize socket connection
      const socket = initializeSocket((updatedBus) => {
        setBuses(prevBuses => 
          prevBuses.map(bus => 
            bus.id === updatedBus.id ? updatedBus : bus
          )
        );
      });
      
      return () => disconnectSocket();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  loadData();
}, []);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return (
          <>
            <DashboardCards buses={buses} fuelData={fuelData} />
            <BusMap buses={buses} />
          </>
        );
      case 'fuel':
        return <FuelStatus data={fuelData} />;
      case 'notifications':
        return <NotificationCenter />;
      case 'reports':
        return <Reports buses={buses} />;
      default:
        return null;
    }
  };

  if (loading) return <Spin size="large" className="loading-spinner" />;

  return (
    <Layout className="admin-dashboard">
      <Header className="header">
        <div className="logo">Chalo Admin Dashboard</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={({ key }) => setSelectedMenu(key)}
          >
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="fuel">Fuel Status</Menu.Item>
            <Menu.Item key="notifications">Notifications</Menu.Item>
            <Menu.Item key="reports">Reports</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {error && <Alert message={error} type="error" showIcon />}
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;