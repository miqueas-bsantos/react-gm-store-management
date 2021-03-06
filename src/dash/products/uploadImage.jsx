import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { URL_PRODUCTS } from '../../common/template/urls'
import axios from 'axios'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function split_images(images) { 
  return images.map(file => {
        file.url = file.path
        file.uid = file.path.split("/")
        if (file.uid.length === 4) {
          file.uid = (file.uid[3])
          file.uid = file.uid.split(".")[0]
        } else {
          file.uid = file.path.split(".")[0]
        }
        
        return file
    })
  
}

export default class PicturesWall extends React.Component { 
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: split_images(this.props.product.imagesUriDetail)
  };

  componentDidUpdate(prevProps) {
    // Uso típico, (não esqueça de comparar as props):
    if (this.props.product.id !== prevProps.product.id) {
      axios.get(`${URL_PRODUCTS}/images/${this.props.product.id}`)
            .then(resp => {
              // console.log(resp.data.data)
              this.setState({fileList: resp.data.data})
            }) 
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  
  handleChange = ({ file, fileList }) => {
    this.setState({ fileList});
  }
  
  handleRemove = (file) => {
    axios.delete(`${URL_PRODUCTS}/images/${this.props.product.id}/${file.uid}`)
              .then(resp => console.log(resp))
              .catch(error => console.log(error))  
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          customRequest={(componentsData) => {
            let formData = new FormData();
            formData.append('file', componentsData.file);
            // formData.append('uuid', uuidv4());
            formData.append('domain', 'POST');
            formData.append('filename', componentsData.file.name);
            fetch(`${URL_PRODUCTS}/images`, {
              method: 'POST',
              headers: {
                Accept: 'multipart/form-data',
                Uid: componentsData.file.uid,
                productId: this.props.product.id
              },
              body: formData
            })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            componentsData.onSuccess()
          })
          .catch(error => {
              console.log('Error fetching profile ' + error)
              componentsData.onError("Error uploading image")
            })      
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          multiple={true}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
