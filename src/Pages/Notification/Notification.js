import React from 'react';
import { List, Typography } from 'antd';

const Notification = ({ notification }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography.Title level={3}>Notifications</Typography.Title>
      <List
        bordered
        dataSource={notification}
        renderItem={item => (
          <List.Item>
            <Typography.Text>{item.message}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notification;
