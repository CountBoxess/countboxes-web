const MAIN = '/work';
const ORDERLIST = '/work/orders';
const ORDERDETAILS = '/work/orders/:orderId';
const ITEMSCANNER = '/work/orders/:orderId/items/:itemId/scan';
const LOADEDORDERLIST = '/work/loaded/orders';
const LOADEDORDERDETAILS = '/work/loaded/orders/:orderId';
const ITEMUNLOADSCANNER = '/work/loaded/orders/:orderId/items/:itemId/scan'

export default {
  MAIN,
  ORDERLIST,
  ORDERDETAILS,
  ITEMSCANNER,
  LOADEDORDERLIST,
  LOADEDORDERDETAILS,
  ITEMUNLOADSCANNER
};
