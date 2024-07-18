import React, { useState } from 'react';
import { Modal, Form, Input, Button, Table, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const initialClients = [
  { id: 1, nom: 'Client A' },
  { id: 2, nom: 'Client B' },
];

const ClientsModal = ({ visible, onCancel, onSelect }) => {
  const [clients, setClients] = useState(initialClients);
  const [isClientModalVisible, setIsClientModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();

  const handleAddClient = () => {
    setEditingClient(null);
    form.resetFields();
    setIsClientModalVisible(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    form.setFieldsValue(client);
    setIsClientModalVisible(true);
  };

  const handleDeleteClient = (clientId) => {
    const newClients = clients.filter(c => c.id !== clientId);
    setClients(newClients);
    message.success('Client supprimé avec succès');
  };

  const handleSubmitClient = () => {
    form.validateFields().then(values => {
      if (editingClient) {
        const newClients = clients.map(c =>
          c.id === editingClient.id ? { ...c, ...values } : c
        );
        setClients(newClients);
        message.success('Client mis à jour avec succès');
      } else {
        const newClient = { ...values, id: clients.length + 1 };
        setClients([...clients, newClient]);
        message.success('Client ajouté avec succès');
      }
      setIsClientModalVisible(false);
    });
  };

  const columns = [
    { title: 'Nom', dataIndex: 'nom', key: 'nom' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditClient(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteClient(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={800}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClient} style={{ marginBottom: '16px' }}>
        Ajouter un Client
      </Button>
      <Table columns={columns} dataSource={clients} rowKey="id" onRow={(record) => ({
        onClick: () => onSelect(record),
      })} />

      <Modal
        title={editingClient ? 'Modifier Client' : 'Ajouter Client'}
        visible={isClientModalVisible}
        onCancel={() => setIsClientModalVisible(false)}
        onOk={handleSubmitClient}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du client' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};

export default ClientsModal;
