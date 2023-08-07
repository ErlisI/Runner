import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import FoodCategories from "./FoodCategories";
import Form from "../forms/addFoodCategorryForm";
import AddFoodForm from "../forms/addFoodForm";
import AddOrderedFood from "../forms/addOrderedFoods";
import Modal from "../ui/modal";

// eslint-disable-next-line react/prop-types
export default function Second({ selectedTableId, partyOrderId }) {
  const { fCategories } = useLoaderData();
  const [categoryData, setCategoryData] = useState({});
  const [sortedCategories, setSortedCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);
  const [isAddOFModalVisible, setIsAddOFModalVisible] = useState(false);
  const [foodsInSelectedCategory, setFoodsInSelectedCategory] = useState([]);
  const [isStartOrderLoading, setIsStartOrderLoading] = useState(false);

  /////////////////////////////

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  const showAddFoodModal = () => {
    setIsAddFoodModalVisible(true);
  };

  const hideAddFoodModal = () => {
    setIsAddFoodModalVisible(false);
  };

  const showAddOrderedFood = () => {
    setIsAddOFModalVisible(true);
  };

  const hideAddOrderedFood = () => {
    setIsAddOFModalVisible(false);
  };

  const onAddCategory = (newcategory) => {
    hideModal();
    setSortedCategories((cetegory) => {
      return [...cetegory, newcategory];
    });
  };

  useEffect(() => {
    const handleAddCategory = () => {
      if (!categoryData.type) {
        return;
      }

      const apiEndpoint = "/api/restaurant/foodCategories";

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response from server:", data);

          setSortedCategories((prevCategories) => [...prevCategories, data]);

          setCategoryData({});
        })
        .catch((error) => {
          console.error("Error during the POST request:", error);
        });
    };

    const addButton = document.getElementById("addCategoryButton");
    addButton.addEventListener("click", handleAddCategory);

    return () => {
      addButton.removeEventListener("click", handleAddCategory);
    };
  }, [categoryData]);


  useEffect(() => {
    const sortedCategories = [...fCategories].sort((a, b) =>
      a.type.localeCompare(b.type)
    );
    setSortedCategories(sortedCategories);
  }, [fCategories]);


  const handleDeleteCategory = (categoryId) => {
    const apiEndpoint = `/api/restaurant/foodCategories/${categoryId}`;

    fetch(apiEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setSortedCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      })
      .catch((error) => {
        console.error("Error during the DELETE request:", error);
      });
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(
        `/api/restaurant/foodCategories/${categoryId}/foods`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const foods = await response.json();
      console.log(foods);
      setFoodsInSelectedCategory(foods);
      showAddOrderedFood();
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const handleStartOrder = () => {
    setIsStartOrderLoading(true);

    const apiEndpoint = `/api/restaurant/rTables/${selectedTableId}/partyOrders`;

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from server:", data);
        setIsStartOrderLoading(false);
      })
      .catch((error) => {
        console.error("Error during the POST request:", error);
        setIsStartOrderLoading(false);
      });
  };

  const renderCategories = sortedCategories.map((category) => (
    <FoodCategories
      fCategories={category}
      key={category.id}
      onDelete={handleDeleteCategory}
      onClick={() => handleCategoryClick(category.id)}
    />
  ));

  return (
    <div className="flex flex-col h-[80vh] items-center justify-center py-15 shadow-md shadow-black/5">
      <div className="grid grid-cols-5 gap-4 mx-auto mb-auto overflow-y-auto">
        {renderCategories}
      </div>

      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <Form hModal={hideModal} onAddCategory={onAddCategory} />
      </Modal>

      <Modal isVisible={isAddFoodModalVisible} hideModal={hideAddFoodModal}>
        <AddFoodForm hModal={hideAddFoodModal} fCategories={fCategories} />
      </Modal>

      <Modal isVisible={isAddOFModalVisible} hideModal={hideAddOrderedFood}>
        <AddOrderedFood
          hModal={hideAddOrderedFood}
          fCategories={fCategories}
          foods={foodsInSelectedCategory}
          partyOrderId={partyOrderId}
        />
      </Modal>

      <div className="flex">
        <button
          className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 mr-4 rounded-full border border-red-600"
          onClick={showAddFoodModal}
        >
          Add Food
        </button>
        
        <button
          id="addCategoryButton"
          className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 rounded-full border border-red-600"
          onClick={showModal}
        >
          Add Menu Category
        </button>

        <button
          className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 ml-4 rounded-full border border-red-600"
          onClick={handleStartOrder}
          disabled={isStartOrderLoading}
        >
          {isStartOrderLoading ? "Starting Order..." : "Start Order"}
        </button>
      </div>
    </div>
  );
}
