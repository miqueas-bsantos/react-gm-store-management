// import 'modules/admin-lte/plugins/jQueryUI/jquery-ui.min'
// import 'modules/admin-lte/plugins/fastclick/fastclick'
// import 'modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min'
// import 'modules/admin-lte/dist/js/app.min'

// import 'modules/font-awesome/css/font-awesome.min.css'
// import 'modules/ionicons/dist/css/ionicons.min.css'
// import 'modules/admin-lte/bootstrap/css/bootstrap.min.css'
// import 'modules/admin-lte/dist/css/AdminLTE.min.css'
// import 'modules/admin-lte/dist/css/skins/_all-skins.min.css'
// import 'modules/admin-lte/plugins/iCheck/flat/blue.css'

// import 'modules/jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import 'modules/bootstrap/dist/js/bootstrap.min.js'
// import 'modules/bootstrap/js/src/popover.js'
// import 'modules/bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'popper.js';
// import 'modules/antd/dist/antd.css';
// import 'modules/antd/dist/antd.js';
// import 'bootstrap';
// import 'bootstrapjs';
// import 'modules/react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import './custom.css';
import { sum } from 'lodash';

export const getDiscount = function(discounts) {
  const currentDate = new Date();
  return discounts.filter(
    discount =>
      currentDate >= new Date(discount.start) &&
      currentDate <= new Date(discount.end) &&
      discount.value
  );
};

export const getSubTotal = function(prices) {
  return sum(prices);
};

export const objeto = {
  id: 0,
  code: 'XPA4-5578Q',
  imageUri: 'http://localhost:8080/7665-01.webp',
  imagesUriDetail: [
    'http://localhost:8080/7665-01.webp',
    'http://localhost:8080/7665-01.webp',
    'http://localhost:8080/136036-060-01.webp',
    'http://localhost:8080/136036-060-01.webp'
  ],
  title: 'Vestido Tomara Que Caia Frente Única Planet Girls Prata',
  content: 'Vestido Tomara Que Caia Frente Única Planet Girls Prata',
  price: 50.0,
  currency: 'BRL',
  sizes: [
    { size: 'PP', quantity: 1 },
    { size: 'P', quantity: 1 },
    { size: 'GG', quantity: 1 },
    { size: 'GG', quantity: 0 },
    { size: 'M', quantity: 1 },
    { size: 'XL', quantity: 1 }
  ],
  posts: [
    {
      comment: '',
      user: {},
      score: 4
    }
  ],
  quantity: 5,
  currentQuantity: 0,
  discount: [
    {
      value: 0.2,
      start: '2021-01-01T00:00:00',
      end: '2021-07-01T00:00:00'
    }
  ],
  category: 'Roupas',
  brand: 'G&M Store',
  tags: [],
  owner: {
    name: 'LOJA FULANO',
    cnpj: '454545454',
    phone: 'asdasd',
    user: {
      name: 'alguem que cadastrio',
      email: 'fulano@email.com',
      scope: 'admin|operacional|comprador',
      cpf: '',
      address: {
        number: '',
        street: '',
        city: '',
        state: '',
        zipcode: ''
      }
    }
  },
  isActive: true,
  plan: 3
};

const sale = {
  id: '',
  items: [],
  total: 0,
  delivery: 0,
  status: '',
  creatAt: '',
  user: {
    name: 'alguem que cadastrio',
    email: 'fulano@email.com',
    scope: 'admin|operacional|comprador',
    cpf: '',
    address: {
      number: '',
      street: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }
};
