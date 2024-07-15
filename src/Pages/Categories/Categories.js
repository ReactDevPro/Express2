import React, { useState } from 'react';
import {  Button, Modal, Form, Input, message, Card, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const initialCategories = [
  { id: 1, name: 'Catégorie A' },
  { id: 2, name: 'Catégorie B' },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  const handleAddCategory = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const newCategories = categories.filter(category => category.id !== categoryId);
    setCategories(newCategories);
    message.success('Catégorie supprimée avec succès');
  };

  const handleSubmitCategory = () => {
    form.validateFields().then(values => {
      const newCategory = { ...values };

      if (editingCategory) {
        const newCategories = categories.map(category => 
          category.id === editingCategory.id ? { ...category, ...newCategory } : category
        );
        setCategories(newCategories);
        message.success('Catégorie mise à jour avec succès');
      } else {
        newCategory.id = categories.length + 1;
        setCategories([...categories, newCategory]);
        message.success('Catégorie ajoutée avec succès');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCategory} style={{ marginBottom: '16px' }}>
        Ajouter une catégorie
      </Button>
      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card
              actions={[
                <EditOutlined key="edit" onClick={() => handleEditCategory(category)} />,
                <DeleteOutlined key="delete" onClick={() => handleDeleteCategory(category.id)} />
              ]}
            >
              <Card.Meta title={category.name} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingCategory ? 'Modifier Catégorie' : 'Ajouter Catégorie'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmitCategory}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom de la catégorie' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
