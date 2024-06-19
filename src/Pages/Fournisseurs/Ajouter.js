import React from 'react';
import '../Fournisseurs/style.css';
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


function Ajouter() {
  let navigate = useNavigate();
  return (
    <div>
          <div className="espace" id='pro'>
            <p> <span className='symbole'>i</span> Note:</p>
            <p>
              Dans cette page, vous pouvez enregistrer vos donnees fournisseurs dans la base de donnees afin de pouvoir 
              les utiliser plustard lorsque vous recevez vos commande pour gardez la trace d'ou vous obtenez vos produits.
            </p>
          </div>
          <div className='logo'>
              <p className='log1'>Ajouter Fournisseurs</p><p className='log2'><DashboardOutlined/>Ajouter fournisseurs ici</p>
          </div>
          <div className="form">
                <button className='btn4' title="voir fournisseurs" onClick={()=>{navigate('/Fournisseurs')}}>Liste Fournisseurs</button>
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



export default Ajouter;
