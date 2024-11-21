import React, { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainCategory from "./pages/Category/MainCategory";
import SingleCategory from "./pages/SingleCategory/SingleCategory";
import Favorites from "./pages/Favorites/Favorites";
import DetailsPage from "./pages/Details/DetailsPage";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
export const ThemeAppContext = createContext();
export const DataContext = createContext();

const mealReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_OFF":
      return {
        ...state,
        isLoading: false,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "UPDATE_DATA":
      const { key, data } = action.payload;
      return {
        ...state,
        [key]: data,
      };
    case "UPDATE_FAVORITES":
      const isLiked = state.favorites.some(
        (item) => item?.idMeal === action.meal.idMeal
      );
      if (isLiked) {
        return {
          ...state,
          favorites: state.favorites.filter(
            (item) => item?.idMeal !== action.meal?.idMeal
          ),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, { ...action.meal }],
        };
      }
    default:
      return state;
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      const { name, value } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value,
        },
        isValid: {
          ...state.isValid,
          [name]: true,
        },
      };
    case "VALIDATE_FORM":
      return {
        ...state,
        isValid: {
          ...state.isValid,
          ...action.newValid,
        },
      };
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        showModal: false,
      };
    case "CLEAR_FORM":
      return {
        formData: {
          fullName: "",
          email: "",
          phone: "",
          message: "",
        },
        isValid: {
          fullName: true,
          email: true,
          phone: true,
          message: true,
        },
        showModal: false,
      };
    default:
      return state;
  }
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUERY":
      const { value } = action.payload;
      return {
        ...state,
        query: value.toLowerCase(),
        queryValid: true,
      };
    case "CAPTURE_QUERY":
      return {
        ...state,
        capturedQuery: action.payload.query,
      };
    case "SHOW_ERROR":
      return {
        ...state,
        queryValid: false,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        capturedQuery: "",
        query: "",
        queryValid: true,
      };

    default:
      return state;
  }
};
function App() {
  const [isDark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  //MEAL DATA DECLARATION & FAVORITES.......................................
  const initialData = {
    categoriesData: JSON.parse(localStorage.getItem("categories")) || [],
    singleCategoryData: [],
    singleMealData: [],
    categoryList: JSON.parse(localStorage.getItem("categoryList")) || [],
    isLoading: true,
    error: "",
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    searchResults: [],
  };
  const [mealData, dispatchMeal] = useReducer(mealReducer, initialData);
  //MEAL DATA DECLARATION.......................................

  //CONTANCT PAGE DECLARATION.......................................
  const initialForm = {
    formData: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
    isValid: {
      fullName: true,
      email: true,
      phone: true,
      message: true,
    },
    showModal: false,
  };
  const [form, dispatchForm] = useReducer(formReducer, initialForm);
  //CONTANCT PAGE DECLARATION.......................................

  const searchInitial = {
    query: "",
    capturedQuery: "",
    queryValid: true,
  };
  const [search, dispatchSearch] = useReducer(searchReducer, searchInitial);
  // DYNAMIC REUSABLE FUNCTION FOR DATA FETCHING......................
  const fetchData = async (url, key) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data!");
      }
      const data = await res.json();
      let formattedData;
      if (key === "categoriesData") {
        formattedData = data.categories;
      }
      if (
        key === "singleCategoryData" ||
        key === "singleMealData" ||
        key === "categoryList"
      ) {
        formattedData = data.meals;
      }
      if (key === "searchResults") {
        formattedData = data;
      }
      dispatchMeal({
        type: "UPDATE_DATA",
        payload: { key, data: formattedData },
      });

      dispatchMeal({ type: "LOADING_OFF" });
    } catch (err) {
      dispatchMeal({ type: "UPDATE_ERROR", payload: { error: err.message } });
      dispatchMeal({ type: "LOADING_OFF" });
    }
  };
  // DYNAMIC REUSABLE FUNCTION FOR DATA FETCHING....................

  useEffect(() => {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    if (mealData?.categoriesData.length === 0) {
      fetchData(url, "categoriesData");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(mealData.categoriesData));
    localStorage.setItem("favorites", JSON.stringify(mealData.favorites));
  }, [mealData.categoriesData, mealData.favorites]);

  return (
    <ThemeAppContext.Provider value={{ isDark, setDark }}>
      <DataContext.Provider
        value={{
          mealData,
          fetchData,
          dispatchMeal,
          form,
          dispatchForm,
          dispatchSearch,
          search,
        }}
      >
        <main className={`outer-container `}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<MainCategory />} />
            <Route
              path="/categories/:categoryName"
              element={<SingleCategory />}
            />
            <Route path="/meals/:mealName" element={<DetailsPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer/>
        </main>
      </DataContext.Provider>
    </ThemeAppContext.Provider>
  );
}

export default App;
