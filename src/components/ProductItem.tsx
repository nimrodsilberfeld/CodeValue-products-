import React from "react";
import { IProduct } from "../models/Product";
import productImg from "../assets/svg/product.svg";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import {
  setAddingProductStatus,
  setSelectedProduct,
} from "../redux/productsSlice";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  product: IProduct;
  onDelete: () => void;
}

const ProductItem = ({ product, onDelete }: ProductItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="productItem"
      onClick={() => {
        navigate(`/products/${product.id}`);
        dispatch(setAddingProductStatus(false));
        dispatch(setSelectedProduct(product));
      }}
    >
      <div className="productInfo">
        <img src={productImg} alt={product.name} />
        <div className="productInfo_content">
          <div className="name">{product.name}</div>
          <div className="description">{product.description}</div>
        </div>
      </div>
      <div>
        <MyButton
          text="Delete"
          onClick={onDelete}
          textColor="white"
          backgroundColor="#E78F81"
          fontSize="14px"
        />
        {/* <button onClick={onDelete}>Delete</button> */}
      </div>
    </div>
  );
};

export default ProductItem;
