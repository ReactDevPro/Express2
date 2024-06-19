import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const ResetPassword = ({ onResetPassword, onSwitchToLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (values) => {
    setLoading(true);
    const { username } = values;

    // Simuler la réinitialisation de mot de passe
    setTimeout(() => {
      message.success(`Un email de réinitialisation a été envoyé à ${username}.`);
      setLoading(false);
      onSwitchToLogin();
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <h2>Réinitialiser le mot de passe</h2>
      <Form onFinish={handleResetPassword}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur!' }]}
        >
          <Input placeholder="Nom d'utilisateur" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Réinitialiser
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={onSwitchToLogin}>
        Retour à la connexion
      </Button>
    </div>
  );
};

export default ResetPassword;
