import React, { useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, DatePicker, Space, message, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FournisseursModal from './FournisseursModal';
import ProduitsModal from './ProduitsModal';

const initialCommandesFournisseurs = [
  {
    id: 1,
    fournisseur: { id: 1, nom: 'Fournisseur A' },
    produit: { id: 1, nom: 'Produit A' },
    quantite: 10,
    dateLivraison: '2023-07-20',
    statut: 'En cours',
  },
];

const Reception = () => {
  const [commandesFournisseurs, setCommandesFournisseurs] = useState(initialCommandesFournisseurs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFournisseursModalVisible, setIsFournisseursModalVisible] = useState(false);
  const [isProduitsModalVisible, setIsProduitsModalVisible] = useState(false);
  const [editingCommandeFournisseur, setEditingCommandeFournisseur] = useState(null);
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [form] = Form.useForm();

  const handleAddCommandeFournisseur = () => {
    setEditingCommandeFournisseur(null);
    setSelectedFournisseur(null);
    setSelectedProduit(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCommandeFournisseur = (commandeFournisseur) => {
    setEditingCommandeFournisseur(commandeFournisseur);
    setSelectedFournisseur(commandeFournisseur.fournisseur);
    setSelectedProduit(commandeFournisseur.produit);
    form.setFieldsValue({
      ...commandeFournisseur,
      fournisseur: commandeFournisseur.fournisseur.id,
      produit: commandeFournisseur.produit.id,
    });
    setIsModalVisible(true);
  };

  const handleDeleteCommandeFournisseur = (commandeFournisseurId) => {
    const newCommandesFournisseurs = commandesFournisseurs.filter(c => c.id !== commandeFournisseurId);
    setCommandesFournisseurs(newCommandesFournisseurs);
    message.success('Commande fournisseur supprimée avec succès');
  };

  const handleSubmitCommandeFournisseur = () => {
    form.validateFields().then(values => {
      const newCommandeFournisseur = {
        ...values,
        fournisseur: selectedFournisseur,
        produit: selectedProduit,
        dateLivraison: values.dateLivraison.format('YYYY-MM-DD'),
      };

      if (editingCommandeFournisseur) {
        const newCommandesFournisseurs = commandesFournisseurs.map(c =>
          c.id === editingCommandeFournisseur.id ? { ...c, ...newCommandeFournisseur } : c
        );
        setCommandesFournisseurs(newCommandesFournisseurs);
        message.success('Commande fournisseur mise à jour avec succès');
      } else {
        newCommandeFournisseur.id = commandesFournisseurs.length + 1;
        setCommandesFournisseurs([...commandesFournisseurs, newCommandeFournisseur]);
        message.success('Commande fournisseur ajoutée avec succès');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Fournisseur', dataIndex: ['fournisseur', 'nom'], key: 'fournisseur' },
    { title: 'Produit', dataIndex: ['produit', 'nom'], key: 'produit' },
    { title: 'Quantité', dataIndex: 'quantite', key: 'quantite' },
    { title: 'Date de Livraison', dataIndex: 'dateLivraison', key: 'dateLivraison' },
    { title: 'Statut', dataIndex: 'statut', key: 'statut' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditCommandeFournisseur(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCommandeFournisseur(record.id)} />
        </Space>
      ),
    },
  ];

  const handleSelectFournisseur = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setIsFournisseursModalVisible(false);
  };

  const handleSelectProduit = (produit) => {
    setSelectedProduit(produit);
    setIsProduitsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCommandeFournisseur} style={{ marginBottom: '16px' }}>
        Ajouter une Commande Fournisseur
      </Button>
      <Table columns={columns} dataSource={commandesFournisseurs} rowKey="id" />

      <Modal
        title={editingCommandeFournisseur ? 'Modifier Commande Fournisseur' : 'Ajouter Commande Fournisseur'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmitCommandeFournisseur}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Fournisseur">
            <Input value={selectedFournisseur ? selectedFournisseur.nom : ''} readOnly addonAfter={<Button onClick={() => setIsFournisseursModalVisible(true)}>Sélectionner</Button>} />
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

      <FournisseursModal visible={isFournisseursModalVisible} onCancel={() => setIsFournisseursModalVisible(false)} onSelect={handleSelectFournisseur} />
      <ProduitsModal visible={isProduitsModalVisible} onCancel={() => setIsProduitsModalVisible(false)} onSelect={handleSelectProduit} />
    </div>
  );
};

export default Reception;
