/* eslint-disable camelcase */
import { GET_PAYMENT_SYSTEMS_DATA } from '../actions/index.actions';

const initialState = {
  paymentData: [],
};

function getCardRef(name) {
  let ref = 0;
  let isLeftCard = true;
  switch (name) {
    case 'RTGS':
      ref = 0;
      isLeftCard = true;
      break;
    case 'National Switch':
      ref = 1;
      isLeftCard = true;
      break;
    case 'CSD':
      ref = 2;
      isLeftCard = true;
      break;
    case 'Card and Switch System':
      ref = 0;
      isLeftCard = false;
      break;
    case 'PSPs/PSOs':
      ref = 1;
      isLeftCard = false;
      break;
    case 'NCHL':
      ref = 2;
      isLeftCard = false;
      break;
    case 'BFIS':
      ref = 3;
      isLeftCard = false;
      break;
    case 'Capital Market Players':
      ref = 4;
      isLeftCard = false;
      break;

    default:
      break;
  }

  return { ref, isLeftCard };
}

const getPaymentData = (state, action) => {
  const paymentData = action.payload.map(item => ({
    ...item,
    ref: getCardRef(item.component).ref,
    isLeftCard: getCardRef(item.component).isLeftCard,
  }));

  const contentData = paymentData.map(
    ({
      id,
      component,
      ref,
      isLeftCard,
      component_value,
      description,
    }) => ({
      id,
      component,
      ref,
      isLeftCard,
      component_value,
      description,
    }),
  );

  return { ...state, paymentData, contentData };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENT_SYSTEMS_DATA:
      return getPaymentData(state, action);

    default:
      return state;
  }
}
