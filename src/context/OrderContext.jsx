import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orderDetails, setOrderDetails] = useState(null);
  return (
    <OrderContext.Provider value={[orderDetails, setOrderDetails]}>
      {children}
    </OrderContext.Provider>
  );
};

//custom hook
const useOrderView = () => useContext(OrderContext);
export { OrderProvider, useOrderView };
