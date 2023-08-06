import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function AddFoodForm({ hModal, fCategories, foods }) {
  const [foodsInCategory, setFoodsInCategory] = useState(foods);

  useEffect(() => {
    if (fCategories && fCategories.id) {
      fetchFoodsInCategory(fCategories.id);
    }
  }, [fCategories]);

  return (
    <div>
      {/* Display the list of foods in the selected category */}
      <h2>Foods in Selected Category:</h2>
      <ul>
        {foodsInCategory.map((food) => (
          <li key={food.id}>
            {food.name} {food.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

AddFoodForm.propTypes = {
  hModal: PropTypes.func.isRequired,
  fCategories: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
