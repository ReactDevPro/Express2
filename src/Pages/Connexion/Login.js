import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const Login = ({ onLogin, onSwitchToSignUp, onSwitchToResetPassword, users }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    const { username, password} = values;

    // Vérifier les informations d'identification par rapport aux utilisateurs inscrits
    const user = users.find(user => user.username === username && user.password === password);

    setTimeout(() => {
      if (user) {
        onLogin({ username });
        message.success('Connexion réussie!');
      } else {
        message.error('Nom d\'utilisateur ou mot de passe incorrect');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <h2>Connexion</h2>
      <Form onFinish={handleLogin}>
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
            Connexion
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={onSwitchToSignUp}>
        S'inscrire
      </Button>
      <Button type="link" onClick={onSwitchToResetPassword}>
        Mot de passe oublié?
      </Button>
    </div>
  );
};

export default Login;
