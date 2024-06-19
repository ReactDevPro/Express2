import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const SignUp = ({ onSignUp, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = (values) => {
    setLoading(true);
    const { username, password } = values;

    // Simuler l'inscription d'un utilisateur
    setTimeout(() => {
      onSignUp({ username, password });
      message.success('Inscription réussie! Vous pouvez maintenant vous connecter.');
      setLoading(false);
      onSwitchToLogin();
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <h2>Inscription</h2>
      <Form onFinish={handleSignUp}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur!' }]}
        >
          <Input placeholder="Nom d'utilisateur" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
        >
          <Input.Password placeholder="Mot de passe" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            S'inscrire
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={onSwitchToLogin}>
        Retour à la connexion
      </Button>
    </div>
  );
};

export default SignUp;
