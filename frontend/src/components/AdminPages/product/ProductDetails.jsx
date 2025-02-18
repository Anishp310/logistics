import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../../../API/BackendApi";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(SummaryApi.getProductById.url(id));
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
        setUpdatedProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(SummaryApi.updateProduct.url(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Failed to update product");

      const updatedData = await response.json();
      setProduct(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading)
    return <div className="text-center p-10 text-3xl font-bold">Loading product details...</div>;
  if (error)
    return <div className="text-red-500 text-center text-3xl">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-5xl font-bold mb-6 text-center">Product Details</h2>

        <div className="space-y-6 text-3xl">
          {[
            { label: "Name", key: "name" },
            { label: "Quantity", key: "quantity" },
            { label: "Value", key: "value" },
            { label: "Dimensions", key: "dimensions" },
            { label: "Weight", key: "weight" },
            { label: "HS Code", key: "hs_code" },
            { label: "Type", key: "type", value: product.type?.name },
            { label: "Nature", key: "nature", value: product.nature?.map((n) => n.name).join(", ") },
          ].map(({ label, key, value }) => (
            <div key={key} className="flex items-center">
              <label className="w-48 font-bold">{label}:</label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={updatedProduct[key] || value || ""}
                  onChange={handleChange}
                  className="border px-4 py-2 rounded-md w-full text-2xl"
                />
              ) : (
                <span className="text-gray-700">{value || product[key]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-6 justify-center">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-2xl hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-6 py-3 rounded-md text-2xl"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-md text-2xl hover:bg-green-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
