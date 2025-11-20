import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { shopDataContext, useShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import Card from "../components/Card";

const Collection = () => {
  const [showFilters, setShowFilters] = useState(false);
  let { products, search, showSearch } = useShopContext();
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavant");
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const togglesubCategory = (e) => {
    if (category.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilters = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search)
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProduct(productCopy);
  };
  const sortProduct = () => {
    let productCopy = filterProduct.slice();
    switch (sortType) {
      case "high-low":
        setFilterProduct(productCopy.sort((a, b) => b.price - a.price));
        break;
      case "low-high":
        setFilterProduct(productCopy.sort((a, b) => a.price - b.price));
        break;
      default:
        applyFilters();
        break;
    }
  };
  useEffect(() => {
    sortProduct();
  }, [sortType]);
  useEffect(() => {
    setFilterProduct(products);
  }, [products]);
  useEffect(() => {
    applyFilters();
  }, [category, subCategory, showSearch, search]);

  return (
    <div className="w-[99vw]  min-h-[100vh] flex flex-col justify-start items-start bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] md:flex-row pt-[70px] overflow-x-hidden z-[2] ">
      <div className="md:w-[30vw]  lg:w-[20vw] w-[100vw] md:min-h-[100vw] p-[20px] border-r-[1px] border-gray-400 text-gray-400 lg:fixed">
        <p
          className="text-[25px] font-semibold flex gap-[5px] cursor-pointer items-center justify-start"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          FILTERS{" "}
          {!showFilters && <FaChevronRight className="text-[18px] md:hidden" />}
          {showFilters && <FaChevronDown className="text-[18px] md:hidden" />}
        </p>

        <div
          className={`border-[2px] border-[#dedcde] pl-5 py-3 mt-6 rounded-md bg-[#4c3630] ${
            showFilters ? "" : "hidden md:block"
          } `}
        >
          <p className="text-[18px] text-gray-300">CATEGORIES</p>
          <div className="w-[230px] h-[120px] flex flex-col items-start justify-center gap-[10px]">
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light text-gray-300 ">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value={"Boys"}
                className="w-3"
              />
              Boys
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light  text-gray-300 ">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value={"Girls"}
                className="w-3"
              />
              Girls
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light  text-gray-300 ">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value={"Both"}
                className="w-3"
              />
              Both
            </p>
          </div>
        </div>
      </div>
      <div className="lg:pl-[20%] md:py-[10px]">
        <div className="md:w-[80vw] w-[100vw] p-[20px] justify-between flex flex-col lg:flex-row lg:px-[50px]">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            name=""
            id=""
            className=" bg-[#4c3630] w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg hover:border-[#46d1f7] border-[2px]"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavant" className="w-[100%] h-[100%]">
              Sort by: Relavant
            </option>
            <option value="low-high" className="w-[100%] h-[100%]">
              Sort by: Low to High
            </option>
            <option value="high-low" className="w-[100%] h-[100%]">
              Sort by: High to Low
            </option>
          </select>
        </div>
        <div className="lg:w-[80vw] mb-[110px] md:w-[60vw] w-[100vw] min-h-[70vh] flex justify-center items-center flex-wrap gap-[30px]">
          {filterProduct.map((item, index) => (
            <Card
              id={item._id}
              key={index}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
