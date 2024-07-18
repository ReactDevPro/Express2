import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Table, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const initialProduits = [
  { id: 1, nom: 'Produit A', fournisseur: 1, seuil: 10, sku: 'SKU001', prix: 100, quantiteInitiale: 50, marque: 'Marque A' },
  { id: 2, nom: 'Produit B', fournisseur: 2, seuil: 5, sku: 'SKU002', prix: 200, quantiteInitiale: 30, marque: 'Marque B' },
];

const ProduitsModal = ({ visible, onCancel, onSelect }) => {
  const [produits, setProduits] = useState(initialProduits);
  const [isProduitModalVisible, setIsProduitModalVisible] = useState(false);
  const [editingProduit, setEditingProduit] = useState(null);
  const [form] = Form.useForm();

  const handleAddProduit = () => {
    setEditingProduit(null);
    form.resetFields();
    setIsProduitModalVisible(true);
  };

  const handleEditProduit = (produit) => {
    setEditingProduit(produit);
    form.setFieldsValue(produit);
    setIsProduitModalVisible(true);
  };

  const handleDeleteProduit = (produitId) => {
    const newProduits = produits.filter(p => p.id !== produitId);
    setProduits(newProduits);
    message.success('Produit supprimé avec succès');
  };

  const handleSubmitProduit = () => {
    form.validateFields().then(values => {
      if (editingProduit) {
        const newProduits = produits.map(p =>
          p.id === editingProduit.id ? { ...p, ...values } : p
        );
        setProduits(newProduits);
        message.success('Produit mis à jour avec succès');
      } else {
        const newProduit = { ...values, id: produits.length + 1 };
        setProduits([...produits, newProduit]);
        message.success('Produit ajouté avec succès');
      }
      setIsProduitModalVisible(false);
    });
  };

  const columns = [
    { title: 'Nom', dataIndex: 'nom', key: 'nom' },
    { title: 'Fournisseur', dataIndex: 'fournisseur', key: 'fournisseur' },
    { title: 'Seuil', dataIndex: 'seuil', key: 'seuil' },
    { title: 'Code SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Prix', dataIndex: 'prix', key: 'prix' },
    { title: 'Quantité Initiale', dataIndex: 'quantiteInitiale', key: 'quantiteInitiale' },
    { title: 'Marque', dataIndex: 'marque', key: 'marque' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditProduit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProduit(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={800}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduit} style={{ marginBottom: '16px' }}>
        Ajouter un Produit
      </Button>
      <Table columns={columns} dataSource={produits} rowKey="id" onRow={(record) => ({
        onClick: () => onSelect(record),
      })} />

      <Modal
        title={editingProduit ? 'Modifier Produit' : 'Ajouter Produit'}
        visible={isProduitModalVisible}
        onCancel={() => setIsProduitModalVisible(false)}
        onOk={handleSubmitProduit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fournisseur" label="Fournisseur" rules={[{ required: true, message: 'Veuillez entrer l\'ID du fournisseur' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="seuil" label="Seuil d'approvisionnement" rules={[{ required: true, message: 'Veuillez entrer le seuil d\'approvisionnement du produit' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="sku" label="Code SKU" rules={[{ required: true, message: 'Veuillez entrer le code SKU du produit' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prix" label="Prix" rules={[{ required: true, message: 'Veuillez entrer le prix du produit' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="quantiteInitiale" label="Quantité Initiale" rules={[{ required: true, message: 'Veuillez entrer la quantité initiale du produit' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="marque" label="Marque" rules={[{ required: true, message: 'Veuillez entrer la marque du produit' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};

export default ProduitsModal;
