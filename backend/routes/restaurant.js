const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { ForbiddenError, NotFoundError } = require("../errors");
const { rTable, Food, FoodCategory } = require("../models");

const getRTable = async (id) => {
    const table = await rTable.findByPk(parseInt(id, 10));
    if (!table) {
        throw new NotFoundError("Table not found");
    }
    return table;
};

const getFoodCategory = async (id) => {
    const category = await FoodCategory.findByPk(parseInt(id, 10));
    if (!category) {
        throw new NotFoundError("Category not found");
    }
    return category;
};

const getFood = async (id) => {
    const category = await Food.findByPk(parseInt(id, 10));
    if (!category) {
        throw new NotFoundError("Category not found");
    }
    return category;
};

const authorizeRTableDelete = (session, table) => {
    if (parseInt(session.userId, 10) !== table.RestaurantId) {
        throw new ForbiddenError("You are not authorized to delete this table");
    }
}

const authorizeFoodCategoryDelete = (session, foodCategory) => {
    if (parseInt(session.userId, 10) !== foodCategory.RestaurantId) {
        throw new ForbiddenError("You are not authorized to delete this category");
    }
}

const authorizeFoodDelete = (session, food) => {
    if (parseInt(session.userId, 10) !== food.RestaurantId) {
        throw new ForbiddenError("You are not authorized to delete this food");
    }
}

const handleErrors = (err, res) => {
    console.error(err);
    if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    res.status(500).send({ message: err.message });
}


// ---------- rTable ---------- //

// Get all the tables
router.get("/rTables", authenticateUser, async (req, res) => {
    try {
        const allTables = await rTable.findAll();

        res.status(200).json(allTables);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Get a specific table
router.get("/rTables/:id", authenticateUser, async (req, res) => {
    try {
        const table = await getRTable(req.params.id);

        if (table) {
            res.status(200).json(table);
        } else {
            res.status(404).send({ message: "Table not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Create a new table
router.post("/rTables", authenticateUser, async (req, res) => {
    const { tableNum } = req.body;

    try {
        const existingRecord = await rTable.findOne({
            where: {
                tableNum: tableNum,
            },
        });
        if (existingRecord)
            return res.status(409).json({ error: "Table number already exists" });


        const newTable = await rTable.create(req.body);
        res.status(201).json(newTable);

    } catch (err) {
        handleErrors(err, res);
    }
});


// Delete a specific table
router.delete("/rTables/:id", authenticateUser, async (req, res) => {
    try {
        const table = await getRTable(req.params.id);
        await authorizeRTableDelete(req.session, table);
        await table.destroy();
        res.status(200).send({ message: "Table deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// ---------- FoodCategory ---------- //

// Get all the categories
router.get("/foodCategories", authenticateUser, async (req, res) => {
    try {
        const allCategories = await FoodCategory.findAll();

        res.status(200).json(allCategories);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Get a specific category
router.get("/foodCategories/:id", authenticateUser, async (req, res) => {
    try {
        const category = await getFoodCategory(req.params.id);

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).send({ message: "Category not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Create a new category
router.post("/foodCategories", authenticateUser, async (req, res) => {
    const { type } = req.body;

    try {
        const existingRecord = await FoodCategory.findOne({
            where: {
                type: type,
            },
        });
        if (existingRecord)
            return res.status(409).json({ error: "Category already exists" });


        const newCategory = await FoodCategory.create(req.body);
        res.status(201).json(newCategory);

    } catch (err) {
        handleErrors(err, res);
    }
});


// Delete a specific category
router.delete("/foodCategories/:id", authenticateUser, async (req, res) => {
    try {
        const category = await getFoodCategory(req.params.id);
        await authorizeFoodCategoryDelete(req.session, category);
        await category.destroy();
        res.status(200).send({ message: "Category deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// ---------- Food ---------- //

// Get all the food
router.get("/foodCategories/:id/foods", authenticateUser, async (req, res) => {
    const categoryId = req.params.id;

    try {
        const allFoods = await Food.findAll({ where: { FoodCategoryId: categoryId } });

        res.status(200).json(allFoods);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Get a specific food
router.get("/foodCategories/:catId/foods/:id", authenticateUser, async (req, res) => {
    const foodId = req.params.id;

    try {
        const food = await Food.findByPk(foodId);

        if (food) {
            res.status(200).json(food);
        } else {
            res.status(404).send({ message: "Food not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Create a new food
router.post("/foodCategories/:id/foods", authenticateUser, async (req, res) => {
    const { name } = req.body;

    try {
        const existingRecord = await Food.findOne({
            where: {
                name: name,
            },
        });
        if (existingRecord)
            return res.status(409).json({ error: "Food already exists" });


        const newFood = await Food.create(req.body);
        res.status(201).json(newCategory);

    } catch (err) {
        handleErrors(err, res);
    }
});


// Delete a specific category
router.delete("/foodCategories/:catId/foods/:id", authenticateUser, async (req, res) => {
    try {
        const food = await getFood(req.params.id);
        await authorizeFoodDelete(req.session, food);
        await food.destroy();
        res.status(200).send({ message: "Food deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


module.exports = router;
