import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';


const initialUsers = [
  { id: 1, name: 'Jean Dupont', adress: 'Douala', phone: '650759276', email: 'jean.dupont@example.com', role: 'Administrateur' },
  { id: 2, name: 'Marie Durand', adress: 'Douala', phone: '650759276', email: 'marie.durand@example.com', role: 'Administrateur'},
  // Ajoutez plus d'utilisateurs pour tester la pagination
  { id: 3, name: 'Pierre Martin', adress: 'Douala', phone: '650759276', email: 'pierre.martin@example.com', role: 'Administrateur'},
  { id: 4, name: 'Claire Bernard', adress: 'Douala', phone: '650759276', email: 'claire.bernard@example.com', role: 'Administrateur'},
  { id: 5, name: 'Jacques Petit', adress: 'Douala', phone: '650759276', email: 'jacques.petit@example.com', role: 'Administrateur'},
];

const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    message.success('Utilisateur supprimé avec succès');
  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    if (editingUser) {
      const newUsers = users.map(user => 
        user.id === editingUser.id ? { ...user, ...values } : user
      );
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      message.success('Utilisateur mis à jour avec succès');
    } else {
      const newUser = { id: users.length + 1, ...values };
      setUsers([...users, newUser]);
      setFilteredUsers([...users, newUser]);
      message.success('Utilisateur ajouté avec succès');
    }
    setIsModalVisible(false);
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const newFilteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(newFilteredUsers);
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Adresse',
      dataIndex: 'adress',
      key: 'adress',
    },
    {
      title: 'Telephone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEditUser(record)}>Modifier</Button>
          <Button type="link" onClick={() => handleDeleteUser(record.id)}>Supprimer</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      
      <Button type="primary" onClick={handleAddUser} style={{ marginBottom: '16px' }}>Ajouter un utilisateur</Button>
      <Input.Search 
        placeholder="Rechercher par nom ou email" 
        onSearch={handleSearch} 
        style={{ marginBottom: '16px', width: '300px' }} 
      />

      <Button type="primary" onClick={()=>{navigate('/')}}  style={{marginLeft: '450px'}} > <ArrowLeftOutlined/></Button>
      
      <Table 
        dataSource={filteredUsers} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingUser ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="adress" label="Adresse" rules={[{ required: true, message: 'Veuillez entrer l\'adresse' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telephone" rules={[{ required: true, message: 'Veuillez entrer le numero de telephone' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Veuillez entrer l\'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Veuillez entrer votre role' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
