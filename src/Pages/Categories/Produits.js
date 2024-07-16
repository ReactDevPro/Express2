import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, InputNumber, message, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const initialProducts = [
  {
    id: 1,
    name: 'Produit A',
    supplier: 'Fournisseur X',
    category: 'Catégorie A',
    threshold: 10,
    sku: 'SKU001',
    price: 100,
    initialQuantity: 50,
    brand: 'Marque A',
    image: null,
  },
  {
    id: 2,
    name: 'Produit B',
    supplier: 'Fournisseur Y',
    category: 'Catégorie B',
    threshold: 5,
    sku: 'SKU002',
    price: 200,
    initialQuantity: 30,
    brand: 'Marque B',
    image: null,
  },
];

const Produits = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (category) {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setImage(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setImage(product.image);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (productId) => {
    const newProducts = products.filter(product => product.id !== productId);
    setProducts(newProducts);
    message.success('Produit supprimé avec succès');
  };

  const handleSubmitProduct = () => {
    form.validateFields().then(values => {
      const newProduct = { ...values, category, image };

      if (editingProduct) {
        const newProducts = products.map(product => 
          product.id === editingProduct.id ? { ...product, ...newProduct } : product
        );
        setProducts(newProducts);
        message.success('Produit mis à jour avec succès');
      } else {
        newProduct.id = products.length + 1;
        setProducts([...products, newProduct]);
        message.success('Produit ajouté avec succès');
      }
      setIsModalVisible(false);
    });
  };

  

  const columns = [
    {
      title: 'Code SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fournisseur',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Catégorie',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Seuil d\'Approvisionnement',
      dataIndex: 'threshold',
      key: 'threshold',
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} €`,
    },
    {
      title: 'Quantité Initiale',
      dataIndex: 'initialQuantity',
      key: 'initialQuantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditProduct(record)}>Modifier</Button>
          <Button type="link" onClick={() => handleDeleteProduct(record.id)}>Supprimer</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#87CEFA'}}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct} style={{ marginBottom: '16px' }}>
        Ajouter un produit
      </Button>
      <Table columns={columns} dataSource={filteredProducts} rowKey="id" />

      <Modal
        title={editingProduct ? 'Modifier Produit' : 'Ajouter Produit'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmitProduct}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="supplier" label="Fournisseur" rules={[{ required: true, message: 'Veuillez entrer le fournisseur du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Catégorie" initialValue={category}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="threshold" label="Seuil d'Approvisionnement" rules={[{ required: true, message: 'Veuillez entrer le seuil d\'approvisionnement du produit' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="sku" label="Code SKU" rules={[{ required: true, message: 'Veuillez entrer le code SKU du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Prix" rules={[{ required: true, message: 'Veuillez entrer le prix du produit' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="initialQuantity" label="Quantité Initiale" rules={[{ required: true, message: 'Veuillez entrer la quantité initiale du produit' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="brand" label="Marque" rules={[{ required: true, message: 'Veuillez entrer la marque du produit' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Produits;
