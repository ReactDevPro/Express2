import React from 'react';
import '../Clients/index.css';
import { Button, Form, Input } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';



const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};


function AjoutClient() {
  let navigate = useNavigate();
  return (
    <div>
          <div className="escence">
            <p> <span className='symbole'>i</span> Note:</p>
            <p>
              Dans cette page, vous pouvez enregistrer vos donnees clients dans la base de donnees afin de pouvoir 
              les utiliser ulterieurement pour creer des bons de livraison et meme relancer les clients.
            </p>
          </div>
          <div className='logo'>
              <p className='log1'>Ajouter Client</p><p className='log3'><DashboardOutlined/>Ajout Clients</p>
          </div>
          <div className="forma">
                <button className='btn4' title="voir clients" onClick={()=>{navigate('/Clients')}}>Liste Clients</button>
                <hr></hr><br></br>
                <Form
                   {...layout}
                    name="nest-messages"
                      onFinish={onFinish}
                    style={{
                              maxWidth: 600,
                    }}
                     validateMessages={validateMessages}
                >
            <div className='encercle'>
              <div>
                <Form.Item
                 name={['user', 'nom']}
                 label="Nome"
                 rules={[
                {
                  required: true,
                },
                ]}
                 >
               <Input />
               </Form.Item>
               <Form.Item
                  name={['user', 'adresse']}
                  label="Adresse"
                  rules={[
                 {
                   required: true,
                 },
                 ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'telephone']}
                  label="Telephone"
                  rules={[
                 {
                   required: true,
                 },
                 ]}
                >
                <Input />
                </Form.Item>

               <Form.Item
                  name={['user', 'email']}
                  label="Email"
                  rules={[
                 {
                   type: 'email',
                   required: true,
                 },
                 ]}
                >
                <Input />
                </Form.Item>
              </div>
              <div className='minicercle'>
                <Form.Item
                  name={['user', 'date']}
                  label="Inscription"
                  rules={[
                 {
                   type: 'date',
                   required: true,
                 },
                 ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'statut']}
                  label="Statut Client"
                  rules={[
                 {
                   required: true,
                 },
                 ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  name={['user', 'preferences']}
                  label="Preferences"
                  rules={[
                 {
                   required: true,
                 },
                 ]}
                >
                <Input />
                </Form.Item>
              </div>
            </div>  
                <Form.Item
                  wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                     Ajouter
                  </Button>
                </Form.Item>
                </Form>

          </div>
    </div>
  )
}



export default AjoutClient;
