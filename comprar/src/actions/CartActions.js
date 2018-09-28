export const CHANGE_INTENDED_PRODUCT_CATEGORY = 'CHANGE_INTENDED_PRODUCT_CATEGORY';

export const changeIntendedProductCategory = ({ productCategory }) => (dispatch) => {
  dispatch({
    type: CHANGE_INTENDED_PRODUCT_CATEGORY,
    payload: productCategory,
  });
};
