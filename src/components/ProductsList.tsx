import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productsSlice";
import ProductItem from "./ProductItem";
import { AppDispatch, RootState } from "../redux/store";
import { IProduct } from "../models/Product";

interface ProductListProps {
  sortOption: "name" | "creationDate";
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}

const ProductList = ({
  sortOption,
  searchQuery,
  currentPage,
  itemsPerPage,
}: ProductListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  const filteredProducts = products.filter(
    (product: IProduct) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const sortedProducts = [...filteredProducts].sort(
    (a: IProduct, b: IProduct) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "creationDate") {
        return (
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
        );
      }
      return 0;
    }
  );
  // Calculate products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="productsList">
      {paginatedProducts.map((product: IProduct) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
