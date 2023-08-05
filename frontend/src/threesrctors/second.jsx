import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import FoodCategories from './FoodCategories';
import Form from "../forms/addFoodCategorryForm";
import AddFoodForm from "../forms/addFoodForm"
import Modal from "../ui/modal";

export default function Second() {
    const { fCategories } = useLoaderData();
    const [categoryData, setCategoryData] = useState({});
    const [sortedCategories, setSortedCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);
    

    const showModal = () => {
        setIsModalVisible(true);
      }
    
      const hideModal = () => {
        setIsModalVisible(false);
      }

      const showAddFoodModal = () => {
        setIsAddFoodModalVisible(true);
      };
      
      const hideAddFoodModal = () => {
        setIsAddFoodModalVisible(false);
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

            const apiEndpoint = '/api/restaurant/foodCategories';

            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response from server:', data);

                    setSortedCategories(prevCategories => [...prevCategories, data]);

                    setCategoryData({});
                })
                .catch(error => {
                    console.error('Error during the POST request:', error);
                });
        };

        const addButton = document.getElementById('addCategoryButton');
        addButton.addEventListener('click', handleAddCategory);

        return () => {
            addButton.removeEventListener('click', handleAddCategory);
        };
    }, [categoryData]);

    useEffect(() => {
        // Sort the food categories based on their type
        const sortedCategories = [...fCategories].sort((a, b) => a.type.localeCompare(b.type));
        setSortedCategories(sortedCategories);
    }, [fCategories]);

    const handleDeleteCategory = (categoryId) => {
        const apiEndpoint = `/api/restaurant/foodCategories/${categoryId}`;

        fetch(apiEndpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setSortedCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
            })
            .catch(error => {
                console.error('Error during the DELETE request:', error);
            });
    };

    const renderCategories = sortedCategories.map((category) => (
        <FoodCategories
            fCategories={category}
            key={category.id}
            onDelete={handleDeleteCategory}
        />
    ));

    return (
        <div className="flex flex-col h-[80vh] items-center justify-center py-15 shadow-md shadow-black/5">
            
                <div className="grid grid-cols-5 gap-4 mx-auto mb-auto overflow-y-auto">{renderCategories}</div>
            
            <Modal isVisible={isModalVisible}  hideModal={hideModal}>
                <Form hModal={hideModal} onAddCategory={onAddCategory} />
            </Modal>

            <Modal isVisible={isAddFoodModalVisible} hideModal={hideAddFoodModal}>
                <AddFoodForm hModal={hideAddFoodModal}  fCategories={fCategories} />
            </Modal>
            <div className='flex'>
                <button id="addCategoryButton" className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 mr-4 rounded-full border border-red-600" onClick={showModal}>
                    Add Menu Category
                </button>
                <button className="bg-white hover:bg-red-600 hover:border-red-600 hover:text-white text-red-600 font-bold py-1 px-6 mb-4 ml-4 rounded-full border border-red-600"  onClick={showAddFoodModal}>
                    Add Food
                </button>
            </div>
        </div>
    );
}
