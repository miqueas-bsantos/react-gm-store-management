import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Input } from 'antd';
import ReviewProduct from './reviewProduct'
import './product.css'
import { URL_PRODUCTS } from '../../common/template/urls'
import UploadImage from './uploadImage'

const { Search } = Input

const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
};

const  handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
};

const suffix = (
  <div
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const Products = (props) => {
    const columns = [
        {
          title: 'Produto',
          dataIndex: 'imageUri',
          key: 'imageUri',
          width: 100,
          render: record => <img src={record} className="m-1" width="45" height="60" alt="" />
        },
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'title',
          width: '30%',
        },
        {
          title: 'Categoria',
          dataIndex: 'category',
          key: 'category',
          width: '30%',
        },
        {
          title: 'Preço',
          dataIndex: 'price',
          key: 'price',
          width: '30%',
          render: record => (`R$ ${record}`)
        }
      ];
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState({
      pageSize: 10,
      total: 10,
      current: 1
    })
    const [currentProduct, setCurrentProduct] = useState({})


    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setCurrentProduct(selectedRows[0])
        // console.log(currentProduct)
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };


    useEffect(function () {
      axios.get(`${URL_PRODUCTS}?category=all&order_by=default`)
           .then(resp => {
            setData(resp.data.data)
            console.log(resp.data.data)
           })
    }, [])      
    

    return (
        <div>
            <Search placeholder="Nome do Produto"
                    className="mb-3 w-50"
                    onSearch={(value) => console.log(value)} 
                    enterButton={suffix}/>
            <Table  rowSelection={{
                      type: "radio",
                      ...rowSelection,
                    }} 
                    rowKey={(record) => record.id}
                    columns={columns} 
                    dataSource={data} 
                    pagination={{}}
                    scroll={{ y: 500 }}/>
            <ReviewProduct product={currentProduct}/>
            {currentProduct.id ? <UploadImage product={currentProduct}/> : null}
        </div>
    )
}

export default Products;