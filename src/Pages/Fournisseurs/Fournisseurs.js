import React from 'react';
import { Table } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import {useState} from 'react';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
import {useNavigate,} from 'react-router-dom';
import '../Fournisseurs/style.css';
import {Button} from 'antd';



const columns = [
  {
    title: '#',
    dataIndex: 'key',
    width: 100,
  },
  {
    title: 'Nom',
    dataIndex: 'nom',
    width: 100,
  },
  {
    title: 'Adresse',
    dataIndex: 'adresse',
    width: 100,
  },
  {
    title: 'Telephone',
    dataIndex: 'tel',
    width: 100,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 100,
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    width: 100,
    render: () => <div className='btn'><button className='btn1' title='Edit'><EditOutlined/></button><button className='btn2' title='Delete'><DeleteOutlined/></button></div>
  }
];
const data = [
  {
    key: 1,
    nom: 'Franky',
    adresse: 'Logpom/Douala',
    tel: '6 50759276',
    email: 'fodouopfranky@gmail.com'
  },
  {
    key: 2,
    nom: 'Kevin',
    adresse: 'Logpom/Douala',
    tel: '6 50759276',
    email: 'kevin@gmail.com'
  },
  {
    key: 3,
    nom: 'Darlin',
    adresse: 'Logpom/Douala',
    tel: '6 59003445',
    email: 'Darlin@gmail.com'
  },
  {
    key: 4,
    nom: 'Dorine',
    adresse: 'Logpom/Douala',
    tel: '6 59003445',
    email: 'Darlin@gmail.com'
  },
  {
    key: 5,
    nom: 'Stive',
    adresse: 'Logpom/Douala',
    tel: '6 44446000',
    email: 'stive@gmail.com'
  },
  {
    key: 6,
    nom: 'Robine',
    adresse: 'Logpom/Douala',
    tel: '6 44446000',
    email: 'stive@gmail.com'
  },
  {
    key: 7,
    nom: 'Nina',
    adresse: 'Logpom/Douala',
    tel: '6 44446000',
    email: 'stive@gmail.com'
  },
  {
    key: 8,
    nom: 'Nono',
    adresse: 'Logpom/Douala',
    tel: '6 44446000',
    email: 'stive@gmail.com'
  },
  {
    key: 9,
    nom: 'Frede',
    adresse: 'Logpom/Douala',
    tel: '6 44446000',
    email: 'stive@gmail.com'
  },
  {
    key: 10,
    nom: 'Fredy',
    adresse: 'Logpom/Douala',
    tel: '6 44446000',
    email: 'stive@gmail.com'
  }
];


const Fournisseurs = () =>{
  let navigate = useNavigate();
  const [search, setSearch] = useState(data); 

  // fonction de filtrage 
  function handleFilter(event){
    const newData = data.filter(row =>{
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setSearch(newData)
  }

  return( 
  <>
  <div className="haut">
      <p className='titre'>Liste des Fournisseurs</p>
      <Button>Back</Button>
  </div>
 
  <div className="zone">
    <span className='zone-text'>Ajout Fournisseurs ici></span>
    <button className='btn3' title='Add fournisseurs' onClick={()=>{navigate('/Ajouter')}}>+</button>
    <input type="text" className='text' style={{backgroundColor: '#F8F8FF'}} placeholder='Search' onChange={handleFilter}/>
  </div>
  <Table
    style={{borderTopStyle: "solid", color: "blue"}}

    columns={columns}
    dataSource={search}
    pagination={{
      pageSize: 10,
    }}
    scroll={{
      y: 240,
    }}
  />
  </>
)};

export default Fournisseurs;


