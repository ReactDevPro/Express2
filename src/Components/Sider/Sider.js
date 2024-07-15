import React from 'react';
import type from './image/type.png';
import {
    HomeOutlined,
    UserOutlined,
    StockOutlined,
    FileTextOutlined,
    ShoppingOutlined,
    CarOutlined,
    ShopOutlined,
    DollarCircleOutlined,
  } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {Menu, Layout} from 'antd';

  const {Sider} = Layout;

  function AppSider(){

    let navigate = useNavigate();
    
    return (
        <Sider collapsible>
               <img src ={type} alt='logo' width={200} height={64}/>
               <p style={{color: '#fff', textAlign: 'center', fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif'}}>Bienvenue chez </p>
               <p style={{color: 'orange', textAlign: 'center', fontFamily: 'Arial Narrow'}}>Express managment activity</p>
            <Menu theme='dark ' defaultSelectedKeys={['']} mode='inline' >
                <Menu.Item  Key='' icon={<HomeOutlined/>} onClick={()=>{navigate('/')}}>
                    Home
                </Menu.Item>
                <Menu.Item  Key='User' icon={<UserOutlined/>} onClick={()=>{navigate('/User')}}>
                    Users
                </Menu.Item>
                <Menu.Item  Key='Clients' icon={<UserOutlined/>} onClick={()=>{navigate('/Clients')}}>
                    Clients
                </Menu.Item>
                <Menu.Item  Key='Stocks' icon={<StockOutlined/>} onClick={()=>{navigate('/Stocks')}}>
                    Stocks
                </Menu.Item>
                <Menu.Item  Key='Rapports' icon={<FileTextOutlined/>} onClick={()=>{navigate('/Rapports')}}>
                    Rapports
                </Menu.Item>
                <Menu.Item  Key='Categories' icon={<ShoppingOutlined/>} onClick={()=>{navigate('/Produit')}}>
                    Produits
                </Menu.Item>
                <Menu.Item  Key='Categories' icon={<ShoppingOutlined/>} onClick={()=>{navigate('/Categories')}}>
                    Categories
                </Menu.Item>
                <Menu.Item  Key='Commandes' icon={<CarOutlined/>} onClick={()=>{navigate('/Commandes')}}>
                    Commandes
                </Menu.Item>
                <Menu.Item  Key='Fournisseurs' icon={<ShopOutlined/>} onClick={()=>{navigate('/Fournisseurs')}}>
                    Fournisseurs
                </Menu.Item>
                <Menu.Item  Key='Fournisseurs' icon={<DollarCircleOutlined/>} onClick={()=>{navigate('/Finance')}}>
                    Finance
                </Menu.Item>
                
                  
            </Menu>
          </Sider>
    )
  }

  export default AppSider;