import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, DatePicker, message } from 'antd';
import moment from 'moment';

const { Option } = Select;

const initialOrders = [
  { 
    id: 1, 
    customerName: 'Jean Dupont', 
    productName: 'Produit A', 
    quantity: 2, 
    price: 150, 
    status: 'en cours', 
    orderDateTime: moment(), 
    deliveryDateTime: moment().add(2, 'days'),
    totalPrice: 300 
  },
  { 
    id: 2, 
    customerName: 'Marie Curie', 
    productName: 'Produit B', 
    quantity: 1, 
    price: 200, 
    status: 'livré', 
    orderDateTime: moment(), 
    deliveryDateTime: moment().add(1, 'days'),
    totalPrice: 200 
  },
];

const ComdClient = ({ sendReportData }) => {
  const [orders, setOrders] = useState(initialOrders);
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
    form.setFieldsValue({
      ...order,
      orderDateTime: moment(order.orderDateTime),
      deliveryDateTime: moment(order.deliveryDateTime),
    });
    setIsModalVisible(true);
  };

  const handleDeleteOrder = (orderId) => {
    const newOrders = orders.filter(order => order.id !== orderId);
    setOrders(newOrders);
    message.success('Commande supprimée avec succès');
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const totalPrice = values.price * values.quantity;
    const newOrder = {
      ...values,
      totalPrice,
      orderDateTime: values.orderDateTime.format('YYYY-MM-DD HH:mm:ss'),
      deliveryDateTime: values.deliveryDateTime.format('YYYY-MM-DD HH:mm:ss'),
    };

    if (editingOrder) {
      const newOrders = orders.map(order => 
        order.id === editingOrder.id ? { ...order, ...newOrder } : order
      );
      setOrders(newOrders);
      message.success('Commande mise à jour avec succès');
    } else {
      newOrder.id = orders.length + 1;
      setOrders([...orders, newOrder]);
      message.success('Commande ajoutée avec succès');
    }
    setIsModalVisible(false);
  };



  const columns = [
    {
      title: 'Nom du Client',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Nom du Produit',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Prix Unitaire',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} FCFA`,
    },
    {
      title: 'Prix Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `${text} FCFA`,
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date et Heure de la Commande',
      dataIndex: 'orderDateTime',
      key: 'orderDateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Date et Heure de la Livraison',
      dataIndex: 'deliveryDateTime',
      key: 'deliveryDateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
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
      <Button type="primary" onClick={handleAddOrder} style={{ marginBottom: '16px' }}>Ajouter une commande</Button>

      <Table 
        dataSource={orders} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingOrder ? 'Modifier Commande' : 'Ajouter Commande'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="customerName" label="Nom du Client" rules={[{ required: true, message: 'Veuillez entrer le nom du client' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="productName" label="Nom du Produit" rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantité" rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="price" label="Prix Unitaire" rules={[{ required: true, message: 'Veuillez entrer le prix' }]}>
            <InputNumber min={0} formatter={value => `${value} FCFA`} parser={value => value.replace(' FCFA', '')} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Statut" rules={[{ required: true, message: 'Veuillez sélectionner le statut de la commande' }]}>
            <Select>
              <Option value="en cours">En cours</Option>
              <Option value="livré">Livré</Option>
              <Option value="échoué">Échoué</Option>
            </Select>
          </Form.Item>
          <Form.Item name="orderDateTime" label="Date et Heure de la Commande" rules={[{ required: true, message: 'Veuillez entrer la date et l\'heure de la commande' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="deliveryDateTime" label="Date et Heure de la Livraison" rules={[{ required: true, message: 'Veuillez entrer la date et l\'heure de la livraison' }]}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ComdClient;
