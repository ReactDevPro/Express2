import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Card, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../Categories/styleCategorie.css';

const initialCategories = [
  { id: 1, name: 'Javascript', image: null },
  { id: 2, name: 'Python', image: null},
 
];

const CategoriesManagement = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    setEditingCategory(null);
    setImage(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setImage(category.image);
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
      const newCategory = { ...values, image };

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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const viewProducts = (categoryName) => {
    navigate(`/produits/${categoryName}`);
  };

  return (
    <div style={{ padding: '20px'}}  className='zone'>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCategory} style={{ marginBottom: '16px', fontWeight:'bold' }}>
        Ajouter une catégorie
      </Button>
      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card
              className="category-card"
              cover={category.image ? <img alt={category.name} src={category.image} /> : null}
              actions={[
                <EyeOutlined alt='Ajout produit' key="view" onClick={() => viewProducts(category.name)} />,
                <EditOutlined key="edit" onClick={() => handleEditCategory(category)} />,
                <DeleteOutlined key="delete" onClick={() => handleDeleteCategory(category.id)} />,
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
          <Form.Item label="Image">
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="preview" style={{ width: '100%', marginTop: '10px' }} />}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesManagement;
