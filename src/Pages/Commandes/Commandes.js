import React, {useState, useEffect} from 'react';
import '../Commandes/com.css';
import Projet from './projet.jpg';
import Client from './client.jpg';
import  Four from './fournisseur.jpg';
import {useNavigate} from 'react-router-dom';
import { Button } from 'antd'; 



// fonction principale
function Commandes() {
   
  const navigate = useNavigate();  
  const [visible, setVisible] = useState(false);
  
  useEffect(()=>{
      const showTimeout = setTimeout(()=>{setVisible(true)}, 2000);
      // nettoyage de l'effet
      return ()=>{
          clearTimeout(showTimeout);
      }
  },[])

  return (
    <div>
      <div>
        <div className='cloud'>
            <p> <span className='mot'>i</span> Note:</p> 
            <p>
              Dans cette page, vous avez la possibiliter de choisir le type de commande a gerer a savoir les
              commandes clients provenant des clients et les commandes de reception provenant des fournisseurs <span className='mot'>!</span>
            </p>        
        </div>
        {visible && (<div className="groupe">
          <div>
            <p className='premier'>BIENVENUE DANS LE GESTIONNAIRE DES COMMANDES</p>
            <img src={Projet} alt="" height="400px" width="500px"/>
          </div>
          <div className='contient'>
             <p><img src= {Client} alt="Commandes clients" width="220px" height="120px"/></p>
             <p>Commande Client</p>
             <p style={{color:'#E6E6FA'}}>Gerer les commandes clients ici</p>
             <p><Button onClick={()=>{navigate('/ComdClient')}}>Enter</Button></p>
          </div>
          <div className='zone'>
          <p><img src= {Four} alt="Reception" width="225px" height="210px"/></p>
             <p>Reception</p>
             <p style={{color:'#E6E6FA'}}>Gerer les receptions des commandes fournisseurs</p>
             <p><Button onClick={()=>{navigate('/Reception')}}>Enter</Button></p>
          </div> 
        </div>)}
      </div>
    </div>
  )
}

export default Commandes
