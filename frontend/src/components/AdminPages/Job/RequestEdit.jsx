import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../../API/BackendApi";

const RequestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const { data } = await axios.get(SummaryApi.getRequestById.url(id));
        setRequest(data);
        setSelectedProduct(data.product);
        setQuantity(data.quantity);
        setTotalPrice(data.totalPrice); // Ensure totalPrice is set properly when request is fetched
      } catch (error) {
        setError("Error fetching request data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(SummaryApi.getProducts.url);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Recalculate total price when quantity or selected product changes
  useEffect(() => {
    if (selectedProduct && quantity) {
      setTotalPrice((quantity * selectedProduct.value).toFixed(2));
    }
  }, [selectedProduct, quantity]);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    // Recalculate total price based on the new quantity and selected product
    if (selectedProduct) {
      setTotalPrice((newQuantity * selectedProduct.value).toFixed(2));
    }
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const product = products.find((p) => p._id === selectedProductId);
    setSelectedProduct(product);
    // Recalculate total price when a new product is selected
    if (quantity) {
      setTotalPrice((quantity * product.value).toFixed(2));
    }
  };

  const handleSave = async () => {
    const updatedRequest = {
      quantity: quantity,
      totalPrice: totalPrice,
      product: selectedProduct._id,  // Use the selected product ID
      // Ensure `createdBy`, `createdDate`, `orderNumber`, `receiver`, `sender`, and `status` are unchanged
      createdBy: request.createdBy,  // Keep the original createdBy data
      createdDate: request.createdDate,  // Keep the original createdDate
      orderNumber: request.orderNumber,  // Keep the original order number
      receiver: request.receiver._id,  // Keep the original receiver data
      sender: request.sender._id,  // Keep the original sender data
      status: request.status,  // Keep the original status
    };
  
    console.log(updatedRequest);  // You can see the updated request format here
  
    try {
      await axios.put(SummaryApi.updateRequest.url(id), updatedRequest);
      navigate("/admin/request"); // Navigate back to the requests list after saving
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };
  

  if (loading) return <div className="text-center p-10 text-3xl font-bold">Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-3xl">{error}</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-semibold text-center mb-6">Edit Request</h2>
        
        <form className="space-y-6">
          {/* Product Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="product" className="font-medium text-lg">Product</label>
            <select
              id="product"
              value={selectedProduct ? selectedProduct._id : ""}
              onChange={handleProductSelect}
              className="border p-3 rounded-md mt-2 text-lg"
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-medium text-lg">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border p-3 rounded-md mt-2 text-lg"
              required
            />
          </div>

          {/* Product Value (Read-only) */}
          <div className="flex flex-col">
            <label htmlFor="productValue" className="font-medium text-lg">Product Value</label>
            <input
              type="text"
              id="productValue"
              value={selectedProduct ? selectedProduct.value : ""}
              className="border p-3 rounded-md mt-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Total Price (Read-only) */}
          <div className="flex flex-col">
            <label htmlFor="totalPrice" className="font-medium text-lg">Total Price</label>
            <input
              type="text"
              id="totalPrice"
              value={totalPrice}
              className="border p-3 rounded-md mt-2 bg-gray-100 text-gray-700 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition-all"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/request")}
              className="bg-gray-400 text-white px-8 py-3 rounded-md text-lg hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestEdit;
