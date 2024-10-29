import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";

const EditUserContext = createContext();

const EditUserProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(null);
  const [proposalTemplateDetails, setProposalTemplateDetails] = useState();
  const [productDetails, setProductDetails] = useState([]);

  // Function to fetch products from the API
  // const getProducts = async (authToken) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/product/getProducts`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     setProductDetails(res.data);
  //     console.log("Fetched Products:", res.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  return (
    <EditUserContext.Provider
      value={[
        UserDetails,
        setUserDetails,
        proposalTemplateDetails,
        setProposalTemplateDetails,
        productDetails,
        setProductDetails,
       // getProducts, // Adding getProducts function to the context
      ]}
    >
      {children}
    </EditUserContext.Provider>
  );
};

// Custom Hook
const useEditUserContext = () => useContext(EditUserContext);

export { useEditUserContext, EditUserProvider };
