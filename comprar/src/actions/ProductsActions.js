import database from '../firebase';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const CHANGE_PRODUCT_ITEM = 'CHANGE_PRODUCT_ITEM';


export const fetchProducts = () => async (dispatch) => {
  try {
    const productsRef = await database.collection('produtos').get();
    const productsDocs = productsRef.docs;
    const productsData = await productsDocs.reduce(async (products, productRef) => {
      const asyncProducts = await products;
      const productId = productRef.id;
      const productData = productRef.data();
      const { valorPadrao } = productData;
      const productItemsRef = await database.collection('produtos').doc(productId).collection('itens').get();
      const productItemsDocs = productItemsRef.docs;
      let productItems = productItemsDocs.reduce((allItems, productItem) => ({ ...allItems, [productItem.id]: productItem.data() }), {});
      productItems = { ...productItems, valorPadrao: valorPadrao || 0 };
      return {
        ...asyncProducts,
        [productId]: productItems,
      };
    }, Promise.resolve({}));
    console.log(productsData);
    dispatch({
      type: FETCH_PRODUCTS,
      payload: productsData,
    });
    Promise.resolve(productsData);
  } catch (error) {
    Promise.reject(error);
  }
};

export const changeProductItem = ({ productName, productValue }) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PRODUCT_ITEM,
      payload: {
        productName,
        productValue,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
