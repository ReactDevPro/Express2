import React, { useState } from 'react';
import { Modal, Form, Input, Button, Table, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const initialFournisseurs = [
  { id: 1, nom: 'Fournisseur A' },
  { id: 2, nom: 'Fournisseur B' },
];

const FournisseursModal = ({ visible, onCancel, onSelect }) => {
  const [fournisseurs, setFournisseurs] = useState(initialFournisseurs);
  const [isFournisseurModalVisible, setIsFournisseurModalVisible] = useState(false);
  const [editingFournisseur, setEditingFournisseur] = useState(null);
  const [form] = Form.useForm();

  const handleAddFournisseur = () => {
    setEditingFournisseur(null);
    form.resetFields();
    setIsFournisseurModalVisible(true);
  };

  const handleEditFournisseur = (fournisseur) => {
    setEditingFournisseur(fournisseur);
    form.setFieldsValue(fournisseur);
    setIsFournisseurModalVisible(true);
  };

  const handleDeleteFournisseur = (fournisseurId) => {
    const newFournisseurs = fournisseurs.filter(f => f.id !== fournisseurId);
    setFournisseurs(newFournisseurs);
    message.success('Fournisseur supprimé avec succès');
  };

  const handleSubmitFournisseur = () => {
    form.validateFields().then(values => {
      if (editingFournisseur) {
        const newFournisseurs = fournisseurs.map(f =>
          f.id === editingFournisseur.id ? { ...f, ...values } : f
        );
        setFournisseurs(newFournisseurs);
        message.success('Fournisseur mis à jour avec succès');
      } else {
        const newFournisseur = { ...values, id: fournisseurs.length + 1 };
        setFournisseurs([...fournisseurs, newFournisseur]);
        message.success('Fournisseur ajouté avec succès');
      }
      setIsFournisseurModalVisible(false);
    });
  };

  const columns = [
    { title: 'Nom', dataIndex: 'nom', key: 'nom' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditFournisseur(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteFournisseur(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={800}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddFournisseur} style={{ marginBottom: '16px' }}>
        Ajouter un Fournisseur
      </Button>
      <Table columns={columns} dataSource={fournisseurs} rowKey="id" onRow={(record) => ({
        onClick: () => onSelect(record),
      })} />

      <Modal
        title={editingFournisseur ? 'Modifier Fournisseur' : 'Ajouter Fournisseur'}
        visible={isFournisseurModalVisible}
        onCancel={() => setIsFournisseurModalVisible(false)}
        onOk={handleSubmitFournisseur}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom du fournisseur' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};

export default FournisseursModal;
