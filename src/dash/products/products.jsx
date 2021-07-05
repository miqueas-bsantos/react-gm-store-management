import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button } from 'antd';
import ReviewProduct from './reviewProduct';
import './product.css';
import { URL_PRODUCTS } from '../../common/template/urls';
import UploadImage from './uploadImage';

const { Search } = Input;

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setState({
    searchText: selectedKeys[0],
    searchedColumn: dataIndex
  });
};

const handleReset = clearFilters => {
  clearFilters();
  setState({ searchText: '' });
};

const suffix = (
  <div
    style={{
      fontSize: 16,
      color: '#00'
    }}
  >
    Adicionar Novo produto
  </div>
);

const Products = props => {
  const columns = [
    {
      title: 'Produto',
      dataIndex: 'imagesUriDetail',
      key: 'imagesUriDetail',
      width: 100,
      render: record =>
        record.length ? (
          <img
            src={record[0].path}
            className="m-1"
            width="45"
            height="60"
            alt=""
          />
        ) : null
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      width: '30%'
    },
    {
      title: 'Categoria',
      dataIndex: 'subcategory',
      key: 'subcategory',
      width: '30%',
      render: record => `${record.name}`
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      width: '30%',
      render: record => `R$ ${record}`
    },
    {
      title: 'Delete',
      width: '10%',
      dataIndex: 'delete',
      // key: 'delete',
      render: (_, record) => (
        <Button danger onClick={() => deleteProduct(record.id)}>
          {' '}
          Deletar{' '}
        </Button>
      )
    }
  ];
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState({
    pageSize: 10,
    total: 10,
    current: 1
  });
  const [currentProduct, setCurrentProduct] = useState({});

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCurrentProduct(selectedRows[0]);
      console.log(selectedRows[0]);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  };

  const deleteProduct = id => {
    axios.delete(`${URL_PRODUCTS}/${id}`).then(resp => {
      setData(resp.data.data);
    });
  };

  useEffect(function() {
    axios.get(`${URL_PRODUCTS}?category=all&order_by=default`).then(resp => {
      setData(resp.data.data);
      // console.log(resp.data.data);
    });
  }, []);

  const filterProduct = value => {};

  const createProduct = name => {
    const product = {
      code: null,
      imagesUriDetail: [],
      title: name,
      content: name,
      price: 0,
      currency: 'BRL',
      sizes: [
        {
          size: 'PP',
          quantity: 0
        },
        {
          size: 'P',
          quantity: 0
        },
        {
          size: 'M',
          quantity: 0
        },
        {
          size: 'G',
          quantity: 0
        },
        {
          size: 'EG',
          quantity: 0
        },
        {
          size: 'EGG',
          quantity: 0
        }
      ],
      subcategory: {
        id: 1
      },
      discount: [],
      brand: 'GMSTORE',
      tags: [],
      isActive: false,
      plan: 1
    };
    console.log(product);
    axios.post(`${URL_PRODUCTS}`, product).then(resp => {
      setData(resp.data.data);
      setCurrentProduct({});
      // console.log(resp.data.data);
    });
  };

  return (
    <div>
      <Search
        placeholder="Nome do Produto"
        className="mb-3 w-50"
        onSearch={value => createProduct(value)}
        onChange={value => filterProduct(value.target.value)}
        enterButton={suffix}
      />
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection
        }}
        rowKey={record => record.id}
        columns={columns}
        dataSource={data}
        pagination={{}}
        scroll={{ y: 500 }}
      />
      <ReviewProduct product={currentProduct} setData={setData} />
      {currentProduct.id >= 0 ? <UploadImage product={currentProduct} /> : null}
    </div>
  );
};

export default Products;
