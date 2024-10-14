import { useEffect, useState } from "react";
import ProductsActions from "../components/ProductsActions";
import ProductList from "../components/ProductsList";
import ProductDetails from "../components/ProductDetails";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setProducts } from "../redux/productsSlice";
const itemsPerPage = 5;

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [sortOption, setSortOption] = useState<"name" | "creationDate">("name");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { products } = useSelector((state: RootState) => state.products);

  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state

  const handleNextPage = (totalPages: number) => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      dispatch(setProducts(JSON.parse(storedProducts))); // Parse and set the products from localStorage
    }
  }, []);

  return (
    <div className="homePage">
      <div className="homeProducts">
        <ProductsActions
          value={sortOption}
          onChangeSortOption={(sort) => {
            setSortOption(sort);
          }}
          onSearch={(query) => setSearchQuery(query)}
        />
        <ProductList
          sortOption={sortOption}
          searchQuery={searchQuery}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </div>
      <div className="homeProductDetails">
        <ProductDetails />
      </div>
    </div>
  );
};

export default HomePage;
