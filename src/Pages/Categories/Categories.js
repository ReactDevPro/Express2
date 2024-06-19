import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Upload, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

const initialProducts = [
  { id: 1, name: 'Produit A', price: 100, image: 'https://via.placeholder.com/150', description: 'Description du produit A' },
  { id: 2, name: 'Produit B', price: 200, image: 'https://via.placeholder.com/150', description: 'Description du produit B' },
];

const Categories = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

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
    const newProducts = products.filter(product => product.id !== productId);
    setProducts(newProducts);
    message.success('Produit supprimé avec succès');
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    if (editingProduct) {
      const newProducts = products.map(product => 
        product.id === editingProduct.id ? { ...product, ...values } : product
      );
      setProducts(newProducts);
      message.success('Produit mis à jour avec succès');
    } else {
      const newProduct = { id: products.length + 1, ...values };
      setProducts([...products, newProduct]);
      message.success('Produit ajouté avec succès');
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Prix',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} FCFA`,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="product" style={{ width: 100 }} />,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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

  const uploadProps = {
    beforeUpload: file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Vous ne pouvez télécharger que des fichiers JPG/PNG!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('L\'image doit être inférieure à 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: info => {
      if (info.file.status === 'done') {
        form.setFieldsValue({ image: info.file.response.url });
        message.success(`${info.file.name} fichier téléchargé avec succès`);
      }
    },
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: '16px' }}>Ajouter un produit</Button>
      <Button type="primary" onClick={()=>{navigate('/')}}  style={{marginLeft: '750px'}} > <ArrowLeftOutlined/></Button>
      <Table 
        dataSource={products} 
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
          <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Prix" rules={[{ required: true, message: 'Veuillez entrer le prix du produit' }]}>
            <InputNumber min={0} formatter={value => `${value} FCFA`} parser={value => value.replace(' FCFA', '')} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Veuillez télécharger une image du produit' }]}>
            <Upload name="image" listType="picture" action="/upload.do" {...uploadProps}>
              <Button icon={<UploadOutlined />}>Télécharger</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Veuillez entrer la description du produit' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
