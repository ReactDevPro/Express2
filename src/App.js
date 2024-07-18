import React from 'react';
import AppRouter from './Components/Routes/Routes';
import AppSider from './Components/Sider/Sider';
import { Layout, Button, message } from 'antd';
import Login from './Pages/Connexion/Login';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import SignUp from './Pages/inscription/SignUp';
import ResetPassword from './Pages/Reinitialiser/ResetPassword';






const {Header, Footer, Content} = Layout;

function App(){

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'signup', 'resetPassword', 'dashboard',
  const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);



  const handleLogin = ({ username }) => {
    setUser({ username });
    setIsLoggedIn(true);
    message.success('Connexion réussie!');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setView('login');
    message.success('Déconnexion réussie!');
  };

  const handleSignUp = (newUser) => {
    setUsers([...users, newUser]);
    handleLogin(newUser); // Connecte automatiquement l'utilisateur après l'inscription
  };

  const handleResetPassword = () => {
    message.success('Réinitialisation réussie! Vérifiez votre email pour les instructions.');
  };

  const switchToSignUp = () => setView('signup');
  const switchToLogin = () => setView('login');
  const switchToResetPassword = () => setView('resetPassword');

  if (!isLoggedIn) {
    if (view === 'login') {
      return <Login onLogin={handleLogin} onSwitchToSignUp={switchToSignUp} onSwitchToResetPassword={switchToResetPassword} users={users} />;
    } else if (view === 'signup') {
      return <SignUp onSignUp={handleSignUp} onSwitchToLogin={switchToLogin} />;
    } else if (view === 'resetPassword') {
      return <ResetPassword onResetPassword={handleResetPassword} onSwitchToLogin={switchToLogin} />;
    }
  }

  return(
      <Layout style={{height: '100vh'}}>
          <AppSider style={{height: '100vh'}}/>

          <Layout className='site-layout'>
              <Header className='site-layout-background' style={{padding: 0, backgroundColor: 'rgb(0, 44, 95)'}}>
              

                <div style={{display: "flex"}}>
                   <div style={{marginLeft: "20px"}}><span style={{color : 'white'}}><UserOutlined type='primary'/></span><span style={{color:'orange', fontWeight:'bold', fontSize: '12px'}}> {user.username}</span></div>
                   <div style={{textAlign: 'right', marginLeft: '750px'}}> 
                       <Button type="danger" style={{backgroundColor: 'blue', color: 'white'}} onClick={handleLogout}>
                           Deconnexion
                       </Button>
                   </div>
                </div>
              
              </Header>
              <Content style= {{margin : '0 16px'}}>
                  <div className='site-layout-background' style={{padding: 24, minHeight: 360}}>
                      <AppRouter/>
                      
                     
                    
                  </div>
              </Content>
              <Footer style={{textAlign : 'left',  zIndex: '1', backgroundColor: "rgb(0, 44, 95)", fontWeight: 'bold',fontSize: "20px" }}>
                  <span style={{color : "#fff"}}>Express management</span>  <span style={{color : "orange"}}>activity</span> 
              </Footer>

          </Layout>

      </Layout>
  )
}

export default App;