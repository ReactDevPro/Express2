import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, DatePicker, Space, message,Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ClientsModal from './ClientsModal';
import ProduitsModal from './ProduitsModal';

const initialCommandesClients = [
  {
    id: 1,
    client: { id: 1, nom: 'Client A' },
    produit: { id: 1, nom: 'Produit A' },
    quantite: 10,
    dateLivraison: '2023-07-20',
    statut: 'En cours',
  },
];

const ComdClient = () => {
  const [commandesClients, setCommandesClients] = useState(initialCommandesClients);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClientsModalVisible, setIsClientsModalVisible] = useState(false);
  const [isProduitsModalVisible, setIsProduitsModalVisible] = useState(false);
  const [editingCommandeClient, setEditingCommandeClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [form] = Form.useForm();

  const handleAddCommandeClient = () => {
    setEditingCommandeClient(null);
    setSelectedClient(null);
    setSelectedProduit(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCommandeClient = (commandeClient) => {
    setEditingCommandeClient(commandeClient);
    setSelectedClient(commandeClient.client);
    setSelectedProduit(commandeClient.produit);
    form.setFieldsValue({
      ...commandeClient,
      client: commandeClient.client.id,
      produit: commandeClient.produit.id,
    });
    setIsModalVisible(true);
  };

  const handleDeleteCommandeClient = (commandeClientId) => {
    const newCommandesClients = commandesClients.filter(c => c.id !== commandeClientId);
    setCommandesClients(newCommandesClients);
    message.success('Commande client supprimée avec succès');
  };

  const handleSubmitCommandeClient = () => {
    form.validateFields().then(values => {
      const newCommandeClient = {
        ...values,
        client: selectedClient,
        produit: selectedProduit,
        dateLivraison: values.dateLivraison.format('YYYY-MM-DD'),
      };

      if (editingCommandeClient) {
        const newCommandesClients = commandesClients.map(c =>
          c.id === editingCommandeClient.id ? { ...c, ...newCommandeClient } : c
        );
        setCommandesClients(newCommandesClients);
        message.success('Commande client mise à jour avec succès');
      } else {
        newCommandeClient.id = commandesClients.length + 1;
        setCommandesClients([...commandesClients, newCommandeClient]);
        message.success('Commande client ajoutée avec succès');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Client', dataIndex: ['client', 'nom'], key: 'client' },
    { title: 'Produit', dataIndex: ['produit', 'nom'], key: 'produit' },
    { title: 'Quantité', dataIndex: 'quantite', key: 'quantite' },
    { title: 'Date de Livraison', dataIndex: 'dateLivraison', key: 'dateLivraison' },
    { title: 'Statut', dataIndex: 'statut', key: 'statut' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditCommandeClient(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCommandeClient(record.id)} />
        </Space>
      ),
    },
  ];

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setIsClientsModalVisible(false);
  };

  const handleSelectProduit = (produit) => {
    setSelectedProduit(produit);
    setIsProduitsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCommandeClient} style={{ marginBottom: '16px' }}>
        Ajouter une Commande Client
      </Button>
      <Table columns={columns} dataSource={commandesClients} rowKey="id" />

      <Modal
        title={editingCommandeClient ? 'Modifier Commande Client' : 'Ajouter Commande Client'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmitCommandeClient}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Client">
            <Input value={selectedClient ? selectedClient.nom : ''} readOnly addonAfter={<Button onClick={() => setIsClientsModalVisible(true)}>Sélectionner</Button>} />
          </Form.Item>
          <Form.Item label="Produit">
            <Input value={selectedProduit ? selectedProduit.nom : ''} readOnly addonAfter={<Button onClick={() => setIsProduitsModalVisible(true)}>Sélectionner</Button>} />
          </Form.Item>
          <Form.Item name="quantite" label="Quantité" rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="dateLivraison" label="Date de Livraison" rules={[{ required: true, message: 'Veuillez entrer la date de livraison' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="statut" label="Statut" rules={[{ required: true, message: 'Veuillez entrer le statut de la commande' }]}>
            <Select>
              <Select.Option value="En cours">En cours</Select.Option>
              <Select.Option value="Livré">Livré</Select.Option>
              <Select.Option value="Annulé">Annulé</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <ClientsModal visible={isClientsModalVisible} onCancel={() => setIsClientsModalVisible(false)} onSelect={handleSelectClient} />
      <ProduitsModal visible={isProduitsModalVisible} onCancel={() => setIsProduitsModalVisible(false)} onSelect={handleSelectProduit} />
    </div>
  );
};

export default ComdClient;
