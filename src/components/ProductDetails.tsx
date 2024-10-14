import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import productImg from "../assets/svg/product.svg";
import { Product } from "../models/Product";
import { addProduct, updateProduct } from "../redux/productsSlice";
import Input from "./Input";
import MyButton from "./MyButton";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [creationDate, setCreationDate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id?: string }>(); // Get the product ID from the URL

  const { products,isAddingNewProduct} = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate price as a number
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        throw new Error("Price must be a valid number.");
      }

      // Create and validate a new product instance
      let newProduct = new Product(name, description, parsedPrice, creationDate);
      if (inEditMode && product) {
        newProduct = { ...newProduct, id: product.id }; // Use the existing product ID
        dispatch(updateProduct(newProduct));
      } else {
        dispatch(addProduct(newProduct));
      }

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCreationDate(new Date());
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };


  useEffect(() => {
    if (isAddingNewProduct) {
      setInEditMode(false);
      setName("");
      setDescription("");
      setPrice("");
      setCreationDate(new Date());
      setError(null);
    }
  }, [isAddingNewProduct]);

  // Update form fields when a product ID is passed in the URL
  useEffect(() => {
    if (id) {
      const searchedProduct = products.find((p) => p.id === id);
      if (searchedProduct) {
        setName(searchedProduct.name);
        setDescription(searchedProduct.description || "");
        setPrice(searchedProduct.price.toString());
        setCreationDate(new Date(searchedProduct.creationDate));
        setProduct(searchedProduct); // Set the product in state
        setInEditMode(true); // Put the form in edit mode
      }
    }
  }, [id, products]); // Re-run when the `id` or `products` change

  // Ensure that the button is disabled when form fields are incomplete
  const handleIsButtonDisabled = () => {
    return name === "" || price === "" || creationDate === null;
  };

  return (
    <div className="productDetails">
      <img src={productImg} className="productImg" alt="Product" />
      <form onSubmit={handleSubmit} className="productDetailsForm">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Input
          type="text"
          placeholder="Product Name"
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label style={{ display: "flex", flexDirection: "column" }}>
          Description
          <textarea
            style={{ margin: "10px 0", padding: "10px" }}
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          />
        </label>
        <Input
          type="number"
          placeholder="Price"
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Creation Date"
          type="date"
          label="Creation Date"
          value={creationDate.toISOString().split("T")[0]}
          onChange={(e) => {
            if (e.target.valueAsDate) {
              setCreationDate(e.target.valueAsDate);
            } else {
              setCreationDate(new Date()); // Default to current date if input is invalid
            }
          }}
        />
        <MyButton
          type="submit"
          text={inEditMode ? "Update Product" : "Add Product"}
          backgroundColor="#2c3e50"
          onClick={() => {}}
          disabled={handleIsButtonDisabled()}
          textColor="white"
        />
      </form>
    </div>
  );
};

export default ProductDetails;