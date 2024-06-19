import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const initialSupplierOrders = [
  { id: 1, supplier: 'Fournisseur A', product: 'Produit A', date: '2023-06-01', quantity: 100 },
  { id: 2, supplier: 'Fournisseur B', product: 'Produit B', date: '2023-06-15', quantity: 150 },
];

const Reception = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialSupplierOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialSupplierOrders);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [form] = Form.useForm();

  const handleAddOrder = () => {
    setEditingOrder(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    form.setFieldsValue({ ...order, date: moment(order.date) });
    setIsModalVisible(true);
  };

  const handleDeleteOrder = (orderId) => {
    const newOrders = orders.filter(order => order.id !== orderId);
    setOrders(newOrders);
    setFilteredOrders(newOrders);
    message.success('Réception supprimée avec succès');
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    values.date = values.date.format('YYYY-MM-DD');
    if (editingOrder) {
      const newOrders = orders.map(order => 
        order.id === editingOrder.id ? { ...order, ...values } : order
      );
      setOrders(newOrders);
      setFilteredOrders(newOrders);
      message.success('Réception mise à jour avec succès');
    } else {
      const newOrder = { id: orders.length + 1, ...values };
      setOrders([...orders, newOrder]);
      setFilteredOrders([...orders, newOrder]);
      message.success('Réception ajoutée avec succès');
    }
    setIsModalVisible(false);
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const newFilteredOrders = orders.filter(order => 
      order.supplier.toLowerCase().includes(searchValue) || 
      order.product.toLowerCase().includes(searchValue)
    );
    setFilteredOrders(newFilteredOrders);
  };

  const columns = [
    {
      title: 'Fournisseur',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Produit',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEditOrder(record)}>Modifier</Button>
          <Button type="link" onClick={() => handleDeleteOrder(record.id)}>Supprimer</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddOrder} style={{ marginBottom: '16px' }}>Ajouter une réception</Button>
      <Input.Search 
        placeholder="Rechercher par fournisseur ou produit" 
        onSearch={handleSearch} 
        style={{ marginBottom: '16px', width: '300px' }} 
      />

      <Button type="primary" onClick={()=>{navigate('/Commandes')}}  style={{marginLeft: '400px'}} > <ArrowLeftOutlined/></Button>

      <Table 
        dataSource={filteredOrders} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingOrder ? 'Modifier Réception' : 'Ajouter Réception'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="supplier" label="Fournisseur" rules={[{ required: true, message: 'Veuillez entrer le nom du fournisseur' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="product" label="Produit" rules={[{ required: true, message: 'Veuillez entrer le produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Veuillez sélectionner la date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quantity" label="Quantité" rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Reception;
