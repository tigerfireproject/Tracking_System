// src/components/NotificationCenter/NotificationCenter.jsx
import React, { useState, useEffect } from 'react';
import { List, Button, Input, Select, Modal, Badge } from 'antd';
import { sendNotification } from '../../services/api';
import './NotificationCenter.css';

const { Option } = Select;
const { TextArea } = Input;

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch notifications from your API
        const mockNotifications = [
          {
            id: 1,
            busId: 'BUS001',
            message: 'Low fuel warning (15%)',
            timestamp: new Date(Date.now() - 3600000),
            read: false
          },
          {
            id: 2,
            busId: 'BUS042',
            message: 'Route deviation detected',
            timestamp: new Date(Date.now() - 7200000),
            read: true
          }
        ];
        
        const mockBuses = [
          { id: 'BUS001', route: 'Route 101' },
          { id: 'BUS042', route: 'Route 204' },
          { id: 'BUS056', route: 'Route 305' }
        ];
        
        setNotifications(mockNotifications);
        setBuses(mockBuses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendNotification = async () => {
    if (!selectedBus || !message.trim()) return;
    
    try {
      await sendNotification(selectedBus, message);
      
      // Add to local state
      setNotifications(prev => [
        {
          id: Date.now(),
          busId: selectedBus,
          message,
          timestamp: new Date(),
          read: false
        },
        ...prev
      ]);
      
      setIsModalVisible(false);
      setMessage('');
      setSelectedBus(null);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h2>Notifications</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Send Notification
        </Button>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={notifications}
        loading={loading}
        renderItem={item => (
          <List.Item
            onClick={() => markAsRead(item.id)}
            className={!item.read ? 'unread-notification' : ''}
          >
            <List.Item.Meta
              title={<>
                {!item.read && <Badge dot />}
                <span className="bus-id">{item.busId}</span>
              </>}
              description={item.message}
            />
            <div className="notification-time">
              {item.timestamp.toLocaleTimeString()}
            </div>
          </List.Item>
        )}
      />

      <Modal
        title="Send New Notification"
        visible={isModalVisible}
        onOk={handleSendNotification}
        onCancel={() => setIsModalVisible(false)}
        okText="Send"
        cancelText="Cancel"
      >
        <Select
          style={{ width: '100%', marginBottom: 16 }}
          placeholder="Select Bus"
          onChange={setSelectedBus}
          value={selectedBus}
        >
          {buses.map(bus => (
            <Option key={bus.id} value={bus.id}>
              {bus.id} - {bus.route}
            </Option>
          ))}
        </Select>
        <TextArea
          rows={4}
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default NotificationCenter;