import React from 'react';
import { Table } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import {useState} from 'react';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
import {useNavigate,} from 'react-router-dom';
import { Button } from 'antd'; 
import '../Clients/index.css';




const columns = [
  {
    title: '#',
    dataIndex: 'key',
    width: 100,
  },
  {
    title: 'Nom',
    dataIndex: 'nom',
    width: 150,
  },
  {
    title: 'Adresse',
    dataIndex: 'adresse',
    width: 100,
  },
  {
    title: 'Telephone',
    dataIndex: 'tel',
    width: 120,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 150,
  },
  {
    title: 'Date Inscription',
    dataIndex: 'date',
    width: 100,
  },
  {
    title: 'Statut Client',
    dataIndex: 'statut',
    width: 130,
  },
  {
    title: 'Preferences',
    dataIndex: 'preferences',
    width: 150,
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
    email: 'fodouopfranky@gmail.com',
    date: '',
    statut: 'Actif',
    preferences: 'fruits'
  },
  {
    key: 2,
    nom: 'Kevin',
    adresse: 'Logpom/Douala',
    tel: '6 50759276',
    email: 'kevin@gmail.com',
    date: '',
    statut: 'Non actif',
    preferences: 'fruits'
  },
  {
    key: 3,
    nom: 'Darlin',
    adresse: 'Logpom/Douala',
    tel: '6 59003445',
    email: 'Darlin@gmail.com',
    date: '',
    statut: 'Actif',
    preferences: 'Electromenagers'
  }
];


const Clients = () =>{
  const navigate = useNavigate();
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
  <div className='mont'>
      <p className='titre'>Liste des Clients</p>
      <Button onClick={()=>{navigate('/')}}>Back</Button>
  </div>
  <div className="cicle">
    <span className='zone-text'>Ajout Clients ici </span>
    <button className='btn3' title='Add client' onClick={()=>{navigate('/AjoutClient')}}>+</button>
    <input type="text" className='text' style={{backgroundColor: '#F8F8FF'}} placeholder='Search' onChange={handleFilter}/>
  </div>
  <Table
    style={{ color: "#00FFFF"}}

    columns={columns}
    dataSource={search}
    pagination={{
      pageSize: 5,
    }}
    scroll={{
      y: 240,
    }}
  />
  </>
)};

export default Clients;


