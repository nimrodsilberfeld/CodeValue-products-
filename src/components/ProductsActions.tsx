import React from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import {
  setAddingProductStatus,
} from "../redux/productsSlice";
import MyButton from "./MyButton";

interface ProductsActionsProps {
  value: any;
  onChangeSortOption: (sortOption: "name" | "creationDate") => void;
  onSearch: (query: string) => void;
}

const ProductsActions = ({
  onChangeSortOption,
  value,
  onSearch,
}: ProductsActionsProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeSortOption(e.target.value as "name" | "creationDate");
  };
  return (
    <div className="productsActions">
      <MyButton
        text="Add new Product"
        onClick={() => {
          // navigate("/products/");
          dispatch(setAddingProductStatus(true));
        }}
        textColor="white"
        backgroundColor="#16a085"
        fontSize="1.2rem"
      />
      <input
        className="searchInput"
        type="text"
        placeholder="Search product"
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={value} onChange={handleSortChange} className="sortSelect">
        <option value="">Sort by</option>
        <option value="creationDate">Most recent</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default ProductsActions;
