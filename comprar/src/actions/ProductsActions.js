import database from '../firebase';

const FETCH_PRODUCTS = 'FETCH_PRODUCTS';


export const fetchProducts = () => async (dispatch) => {
  try {
    const productsRef = await database.collection('produtos').get();
    const productsDocs = productsRef.docs;
    const productsData = productsDocs.reduce((products, productRef) => {
      const productId = productRef.id;
      const productData = productRef.data();
      return { ...products, [productId]: productData };
    }, {});
    dispatch({
      type: FETCH_PRODUCTS,
      payload: productsData,
    });
    Promise.resolve(productsData);
  } catch (error) {
    Promise.reject(error);
  }
};
