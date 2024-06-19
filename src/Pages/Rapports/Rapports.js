import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

const Rapports = () => {
  const columns = [
    {
      title: 'Nom du Client',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Nom du Produit',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Prix Unitaire',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} FCFA`,
    },
    {
      title: 'Prix Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `${text} FCFA`,
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date et Heure de la Commande',
      dataIndex: 'orderDateTime',
      key: 'orderDateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Date et Heure de la Livraison',
      dataIndex: 'deliveryDateTime',
      key: 'deliveryDateTime',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <div>
      <h2>Commandes Livrées</h2>
      <Table  columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      <h2>Commandes Échouées</h2>
      <Table  columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default Rapports;
