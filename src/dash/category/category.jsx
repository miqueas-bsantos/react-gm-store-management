import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { URL_PRODUCTS } from '../../common/template/urls';
import axios from 'axios';
import SubCategory from './subcategory'
import './category.css';


const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Ordem',
        dataIndex: 'order',
        width: '30%',
        editable: true
      },
      {
        editable: true,
        title: 'Categoria',
        dataIndex: 'name'
      },
      {
        title: 'Opera????o',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null
      }
    ];
    this.state = {
      dataSource: [],
      // rowSelection object indicates the need for row selection,
      currentCategorySelected: null,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.setState({...this.state, currentCategorySelected: selectedRows[0]});
          // console.log(selectedRows[0]);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name
        })
      }
    };
  }

  componentWillMount() {
    axios.get(`${URL_PRODUCTS}/category`).then(resp => {
      console.log(resp.data.data);
      this.setState({ ...this.state, dataSource: resp.data.data });
    });
  }

  handleDelete = id => {
    axios.delete(`${URL_PRODUCTS}/category/${id}`).then(resp => {
      this.setState({ ...this.state, dataSource: resp.data.data });
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      name: `Nova Categoria`,
      order: 0
    };
    axios.post(`${URL_PRODUCTS}/category`, newData).then(resp => {
      this.setState({ ...this.state, dataSource: resp.data.data });
    });
  };
  handleSave = row => {
    console.log('chamou', row);
    axios.put(`${URL_PRODUCTS}/category`, row).then(resp => {
      this.setState({ ...this.state, dataSource: resp.data.data });
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16
          }}
        >
          Adicionar nova Categoria
        </Button>
        <Table
          rowKey={record => record.id}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          rowSelection={{
            type: 'radio',
            ...this.state.rowSelection
          }}
          dataSource={dataSource}
          columns={columns}
        />
        {
          this.state.currentCategorySelected !== null ? <SubCategory category={this.state.currentCategorySelected} /> : null 
        }
      </div>
    );
  }
}

export default EditableTable;
