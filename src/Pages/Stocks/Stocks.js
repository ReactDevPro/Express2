import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, Input, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const initialInventory = [
  { id: 1, product: 'Produit A', quantity: 50, reorderLevel: 20, reorderQuantity: 100 },
  { id: 2, product: 'Produit B', quantity: 30, reorderLevel: 10, reorderQuantity: 50 },
];

const Stocks = ({ supplierOrders, setSupplierOrders, addNotification }) => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(initialInventory);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  const handleUpdateStock = useCallback((productName, quantity) => {
    setInventory((prevInventory) => 
      prevInventory.map(product =>
        product.product === productName ? { ...product, quantity: product.quantity + quantity } : product
      )
    );
  }, []);

  const handleAutoReorder = useCallback((item) => {
    if (!supplierOrders) {
      return;
    }

    const newOrder = {
      id: supplierOrders.length + 1,
      supplier: 'Default Supplier',
      product: item.product,
      date: new Date().toISOString().split('T')[0],
      quantity: item.reorderQuantity,
    };

    setSupplierOrders((prevOrders) => [...prevOrders, newOrder]);
    handleUpdateStock(newOrder.product, newOrder.quantity);

    addNotification({ message: `Le stock du produit ${item.product} est bas. Quantité actuelle : ${item.quantity}. Un réapprovisionnement de ${item.reorderQuantity} a été commandé.`,
    });
  }, [supplierOrders, setSupplierOrders, handleUpdateStock, addNotification]);

  useEffect(() => {
    inventory.forEach(item => {
      if (item.quantity <= item.reorderLevel) {
        
        notification.warning({
          message: 'Stock Bas',
          description: `Le stock du produit ${item.product} est bas. Quantité actuelle : ${item.quantity}. Un réapprovisionnement de ${item.reorderQuantity} a été commandé.`,
          
        });
        handleAutoReorder(item);
      }
    });
  }, [inventory, handleAutoReorder]);                                                                                                                                                                    
    

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (productId) => {
    const newInventory = inventory.filter(product => product.id !== productId);
    setInventory(newInventory);
    message.success('Produit supprimé avec succès');
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    if (editingProduct) {
      const newInventory = inventory.map(product => 
        product.id === editingProduct.id ? { ...product, ...values } : product
      );
      setInventory(newInventory);
      message.success('Produit mis à jour avec succès');
    } else {
      const newProduct = { id: inventory.length + 1, ...values };
      setInventory([...inventory, newProduct]);
      message.success('Produit ajouté avec succès');
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Produit',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Niveau de Réapprovisionnement',
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
    },
    {
      title: 'Quantité de Réapprovisionnement',
      dataIndex: 'reorderQuantity',
      key: 'reorderQuantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEditProduct(record)}>Modifier</Button>
          <Button type="link" onClick={() => handleDeleteProduct(record.id)}>Supprimer</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: '16px' }}>Ajouter un produit</Button>
      <Button type="primary" onClick={()=>{navigate('/')}}  style={{marginLeft: '755px'}} > <ArrowLeftOutlined/></Button>
      <Table 
        dataSource={inventory} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingProduct ? 'Modifier Produit' : 'Ajouter Produit'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="product" label="Produit" rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantité" rules={[{ required: true, message: 'Veuillez entrer la quantité' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="reorderLevel" label="Niveau de Réapprovisionnement" rules={[{ required: true, message: 'Veuillez entrer le niveau de réapprovisionnement' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="reorderQuantity" label="Quantité de Réapprovisionnement" rules={[{ required: true, message: 'Veuillez entrer la quantité de réapprovisionnement' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
};


export default Stocks;
