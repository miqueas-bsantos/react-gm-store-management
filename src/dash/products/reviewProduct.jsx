import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { getDiscount } from '../../common/template/dependencies';
import axios from 'axios';
import { URL_PRODUCTS } from '../../common/template/urls';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
const tailLayoutItem = {
  wrapperCol: { col: 5 }
};

const ReviewProduct = props => {
  const [formProduct] = Form.useForm();
  const formRef = useRef(null);
  const [formState, setFormState] = useState(props.product);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});

  const onFinish = values => {
    console.log('Success:', {
      ...formProduct.getFieldValue(),
      ...formState,
      ...values
    });
    axios
      .put(URL_PRODUCTS, {
        ...formProduct.getFieldValue(),
        ...formState,
        ...values
      })
      .then(resp => {
        props.setData(resp.data.data);
      })
      .catch(error => console.log(error));
  };

  const getCurrentCategory = id => {
    const category = categories.filter(cat => cat.id === id)[0];
    // setCurrentCategory()
    return category;
  };

  const getCategories = () => {
    axios.get(`${URL_PRODUCTS}/category`).then(resp => {
      setCategories(resp.data.data);
    });
  };

  useEffect(() => {
    setFormState(props.product);
    getCategories();
    if (
      formRef.current &&
      props.product.id !== formProduct.getFieldsValue().id
    ) {
      formProduct.setFieldsValue(props.product);
    }
  }, [formRef, props.product]);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return formState.id >= 0 ? (
    <div className="row">
      <div className="col bg-white">
        <h3 className="text-center m-2 m-2 p-2">Dados cadastrais do Produto</h3>
        <Form
          form={formProduct}
          initialValues={formState}
          {...layout}
          name="productForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={values => setFormState({ ...formState, ...values })}
          ref={formRef}
        >
          <Form.Item label="ID Produto" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Titúlo da vitrine"
            name="title"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Marca"
            name="brand"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Código do produto" name="code">
            <Input />
          </Form.Item>

          <Form.Item
            label="Categoria"
            // name="category"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
          >
            <Select
              onChange={value => {
                const current = categories.filter(cat => cat.id === value);
                setCurrentCategory(current);
                setFormState({
                  ...formState,
                  subcategory: {
                    ...formState.subcategory,
                    category_id: value
                  }
                });
              }}
              defaultValue={
                getCurrentCategory(props.product.subcategory.category_id).name
              }
            >
              {categories.map((cat, index) => {
                return (
                  <Select.Option key={index} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="SubCategoria"
            // name="category"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
          >
            <Select
              onChange={value =>
                setFormState({
                  ...formState,
                  subcategory: {
                    ...formState.subcategory,
                    id: value
                  }
                })
              }
              defaultValue={formState.subcategory.name}
            >
              {getCurrentCategory(
                formState.subcategory.category_id
              ).subcategories.map((cat, index) => {
                return (
                  <Select.Option key={index} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Conteúdo" name="content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            {...tailLayout}
            // name="isActive"
            valuePropName={formState.isActive ? 'checked' : null}
          >
            <Checkbox
              checked={formState.isActive}
              onChange={e =>
                setFormState({ ...formState, isActive: e.target.checked })
              }
            >
              {formState.isActive ? 'Ativo' : 'Inativo'}
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Salva
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="col h-100 ">
        <Form
          className=" p-4 bg-white"
          form={formProduct}
          initialValues={formState}
          {...layout}
          name="paymentForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // onValuesChange={(values)=> console.log(values)}
          ref={formRef}
        >
          <h3 className="text-center m-2 p-2">Pagamento</h3>
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-col-8 ant-form-item-label">
              <label htmlFor="plan">Qtd de Parcelas</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              <div className="ant-form-item-control-input-content">
                <select
                  className="ant-input"
                  value={formState.plan}
                  name="plan"
                  onChange={e =>
                    setFormState({
                      ...formState,
                      [e.target.name]: e.target.value
                    })
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
          </div>
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-col-8 ant-form-item-label">
              <label htmlFor="currency">Moeda Padrão</label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              <div className="ant-form-item-control-input-content">
                <select
                  className="ant-input"
                  name="currency"
                  value={formState.currency}
                  onChange={e =>
                    setFormState({
                      ...formState,
                      [e.target.name]: e.target.value
                    })
                  }
                >
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
          <Form.Item
            label="Preço"
            name="price"
            rules={[{ required: true, message: 'Este campo é obrigatório' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Salva
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-3 bg-white p-4">
          <h3 className="text-center m-2 p-2">Tamanhos e Estoque</h3>
          {formState.sizes.map((item, index) => {
            return (
              <div className="ant-row ant-form-item" key={index}>
                <div className="ant-col ant-col-8 ant-form-item-label">
                  <label htmlFor="currency">{item.size}</label>
                </div>
                <div className="ant-col ant-col-16 ant-form-item-control">
                  <div className="ant-form-item-control-input-content">
                    <input
                      className="ant-input"
                      name="size"
                      type="number"
                      value={item.quantity}
                      onChange={e => {
                        item.quantity = parseInt(e.target.value);
                        let sizes = formState.sizes.map(currentItem => {
                          if (currentItem.id == item.id) {
                            currentItem.quantity = parseInt(e.target.value);
                          }
                          return currentItem;
                        });
                        // sizes.push(item);
                        setFormState({ ...formState, sizes });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onFinish({})}
            >
              Salva
            </Button>
          </Form.Item>
        </div>
      </div>
      <div className="col p-0">
        <div className="bg-white p-4">
          <h3 className="text-center p-2">Descontos</h3>
          {getDiscount(formState.discount).map((item, index) => {
            return (
              <div className="ant-row ant-form-item" key={index}>
                <div className="ant-col ant-col-8 ant-form-item-label">
                  <label htmlFor="currency">De:</label>
                </div>
                <div className="ant-col ant-col-16 ant-form-item-control">
                  <div className="ant-form-item-control-input-content">
                    <input
                      className="ant-input"
                      name="discount"
                      type="datetime"
                      value={new Date(item.start).toLocaleString()}
                      disabled
                    />
                  </div>
                </div>
                <div className="ant-col ant-col-8 ant-form-item-label">
                  <label htmlFor="currency">Até:</label>
                </div>
                <div className="ant-col ant-col-16 ant-form-item-control">
                  <div className="ant-form-item-control-input-content">
                    <input
                      className="ant-input"
                      name="size"
                      type="datetime"
                      value={new Date(item.end).toLocaleString()}
                      disabled
                    />
                  </div>
                </div>
                <div className="ant-col ant-col-8 ant-form-item-label">
                  <label htmlFor="currency">Porcentagem:</label>
                </div>
                <div className="ant-col ant-col-16 ant-form-item-control">
                  <div className="ant-form-item-control-input-content">
                    <input
                      className="ant-input"
                      name="size"
                      type="text"
                      value={parseFloat(item.value * 10) + '%'}
                      disabled
                    />
                  </div>
                </div>
                <div className="ant-col ant-col-8 ant-form-item-label">
                  <label htmlFor="currency">Preço com desc:</label>
                </div>
                <div className="ant-col ant-col-16 ant-form-item-control">
                  <div className="ant-form-item-control-input-content">
                    <input
                      className="ant-input"
                      name="pricedescount"
                      type="number"
                      value={
                        formState.price -
                        parseFloat(formState.price * (item.value / 10))
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="btn-group w-100 text-center align-center mt-3">
                  <Button
                    className="ml-5"
                    type="danger"
                    htmlType="submit"
                    onClick={() => onFinish({})}
                  >
                    Remover disconto
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => onFinish({})}
                  >
                    Editar Descontos
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default ReviewProduct;
