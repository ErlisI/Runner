const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth");
const { ForbiddenError, NotFoundError } = require("../errors");
const { Restaurant, rTable, Food, FoodCategory, Party_Order, Order_Food,DailyReport } = require("../models");

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
        throw new NotFoundError("food not found");
    }
    return category;
};
const getdaily = async (id) => {
    const report = await DailyReport.findByPk(parseInt(id, 10));
    if (!report) {
        throw new NotFoundError("Daily not found");
    }
    return report;
};

//Gets
const authorizeRTableGet = (session, table) => {
    if (parseInt(session.userId, 10) !== table.RestaurantId) {
        throw new ForbiddenError("You are not authorized to get this table");
    }
}

const authorizeFoodCategoryGet = (session, foodCategory) => {
    if (parseInt(session.userId, 10) !== foodCategory.RestaurantId) {
        throw new ForbiddenError("You are not authorized to get this category");
    }
}
const authorizedailyreportGet = (session, dailyReports) => {
    if (parseInt(session.userId, 10) !== dailyReports.RestaurantId) {
        throw new ForbiddenError("You are not authorized to get this daily");
    }
}

const authorizeFoodGet = (session, food) => {
    if (parseInt(session.userId, 10) !== food.RestaurantId) {
        throw new ForbiddenError("You are not authorized to get this food");
    }
}


//Deletes
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

        // Assuming you have the logged-in user's session data available in req.session
        const session = req.session;

        // Filter the tables based on authorization
        const authorizedTables = allTables.filter(table => {
            try {
                authorizeRTableGet(session, table);
                return true; // Include this table in the response
            } catch (error) {
                return false; // Exclude this table from the response
            }
        });

        res.status(200).json(authorizedTables);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Get a specific table
router.get("/rTables/:id", authenticateUser, async (req, res) => {
    try {
        const table = await getRTable(req.params.id);

        if (!table) {
            return res.status(404).send({ message: "Table not found" });
        }

        const session = req.session;

        try {
            authorizeRTableGet(session, table);
            res.status(200).json(table);
        } catch (error) {
            res.status(403).send({ message: "You are not authorized to access this table" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Create a new table
router.post("/rTables", authenticateUser, async (req, res) => {
    const rUser = await Restaurant.findByPk(req.session.userId);

    try {
        // Check authorization to create a table for the restaurant
        authorizeRTableGet(req.session, { RestaurantId: rUser.id });

        // Find the highest existing table number for the restaurant
        const maxTableNumRecord = await rTable.findOne({
            where: {
                RestaurantId: rUser.id,
            },
            order: [['tableNum', 'DESC']],
        });

        let nextTableNum = 1;

        if (maxTableNumRecord) {

            // Loop through existing table numbers to find the next available one
            for (let i = 1; i <= maxTableNumRecord.tableNum + 1; i++) {
                const table = await rTable.findOne({
                    where: {
                        RestaurantId: rUser.id,
                        tableNum: i,
                    },
                });

                if (!table) {
                    nextTableNum = i;
                    break;
                }
            }
        }

        const newTableData = {
            tableNum: nextTableNum,
            RestaurantId: rUser.id,
        };

        const newTable = await rTable.create(newTableData);
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

        const session = req.session;

        // Filter the categories based on authorization
        const authorizedCategories = allCategories.filter(category => {
            try {
                authorizeFoodCategoryGet(session, category);
                return true;
            } catch (error) {
                return false;
            }
        });

        res.status(200).json(authorizedCategories);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


// Get a specific category
router.get("/foodCategories/:id", authenticateUser, async (req, res) => {
    try {
        const category = await getFoodCategory(req.params.id);

        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }

        // Assuming you have the logged-in user's session data available in req.session
        const session = req.session;

        try {
            authorizeFoodCategoryGet(session, category);
            res.status(200).json(category);
        } catch (error) {
            res.status(403).send({ message: "You are not authorized to access this category" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});


router.post("/foodCategories", authenticateUser, async (req, res) => {
    const { type } = req.body;
    const rUser = await Restaurant.findByPk(req.session.userId);

    try {
        // Check authorization to create a category for the restaurant
        authorizeFoodCategoryGet(req.session, { RestaurantId: rUser.id });

        const existingRecord = await FoodCategory.findOne({
            where: {
                type: type,
                RestaurantId: rUser.id, // Ensure the category belongs to the same restaurant
            },
        });
        if (existingRecord)
            return res.status(409).json({ error: "Category already exists for this restaurant" });

        const newCategory = await FoodCategory.create({ ...req.body, RestaurantId: rUser.id });
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
        res.status(201).json(newFood);

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


// ---------- Party Order ---------- //


router.get('/partyOrders/:rTableId', async (req, res) => {
    const { rTableId } = req.params;

    try {
        const partyOrder = await Party_Order.findOne({
            where: { 
                rTableId, 
                open: true 
            },
            
            include: [
                {
                    model: Food,
                    attributes: ['price', 'name'],
                    through: {
                        attributes: ['Quantity']
                    }
                }
            ]
        });

        if (partyOrder) {
            res.status(200).json(partyOrder);
        } else {
            res.status(404).json({ message: 'No party order found for the specified table' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred while retrieving party order', error: err });
    }
});


// Create a new party order
router.post('/rTables/:id/partyOrders', async (req, res) => {

    const rTableId = req.params.id;

    try {

        const existingOpenOrder = await Party_Order.findOne({
            where: {
                rTableId: rTableId,
                open: true
            }
        });

        if (existingOpenOrder) {
            return res.status(400).json({ message: 'An open party order already exists for this table' });
        }

        // Create a new party order
        const newPartyOrder = await Party_Order.create({
            date: new Date(),
            Total: 0,
            rTableId: rTableId,
            open: true,
        });

        res.status(201).json(newPartyOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred while creating party order', error: err });
    }
});


router.patch('/rTables/:id/partyOrders/:partyOrderId/close', async (req, res) => {
    const PartyOrderId = req.params.partyOrderId;
    const rTableId = req.params.id;

    try {
        const partyOrder = await Party_Order.findOne({
            where: {
                id: PartyOrderId,
                rTableId: rTableId,
                open: true
            }
        });

        if (!partyOrder) {
            return res.status(404).json({ message: 'Open party order not found for this table' });
        }

        // Update the 'open' status to false
        await partyOrder.update({ open: false });

        res.status(200).json({ message: 'Party order closed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred while closing party order', error: err });
    }
});



// ---------- Order Food ---------- //

router.post('/orderFoods', async (req, res) => {
    const orderFoods = req.body.orderFoods;

    try {
        let totalFoodPrice = 0;

        for (const { FoodId, PartyOrderId, Quantity } of orderFoods) {
            const food = await Food.findByPk(FoodId);
            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }

            // Find the associated Party_Order
            const partyOrder = await Party_Order.findByPk(PartyOrderId);
            if (!partyOrder) {
                return res.status(404).json({ message: 'Party order not found' });
            }

            // Check if the Party_Order is open
            if (!partyOrder.open) {
                return res.status(400).json({ message: 'Cannot create Order_Food for a closed party order' });
            }

            // Check if the Order_Food already exists
            let orderFood = await Order_Food.findOne({
                where: {
                    FoodId: FoodId,
                    PartyOrderId: PartyOrderId
                }
            });

            if (orderFood) {
                // Update the existing Order_Food's Quantity
                const newQuantity = orderFood.Quantity + Quantity;
                await orderFood.update({ Quantity: newQuantity });
            } else {
                // Create a new Order_Food
                orderFood = await Order_Food.create({
                    FoodId: FoodId,
                    PartyOrderId: PartyOrderId,
                    Quantity: Quantity
                });
            }

            // Calculate the price of the added food item
            const foodPrice = food.price * Quantity;
            totalFoodPrice += foodPrice;

            // Update the total price in the Party_Order table
            const newTotal = partyOrder.Total + foodPrice;
            await partyOrder.update({ Total: newTotal });
        }

        res.status(201).json({ message: 'Order foods created successfully', totalFoodPrice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred while creating order foods', error: err });
    }
});
router.get("/dailyReports",authenticateUser, async (req,res)=>{
   try{ const alldailyReports = await DailyReport.findAll();
    const session = req.session; 

    const authorizated1=alldailyReports.filter(daily=>{
        try {
            authorizedailyreportGet(session, daily);
                return true;
        } catch (error) {
            return false;
        }
        
    })
    res.status(200).json(authorizated1);
    }
    catch(err){
        console.error(err);
        res.status(500).send({ message: err.message });
    }
})
router.get("/dailyReports/:id",authenticateUser, async (req,res)=>{
        try{ 
        const daily=await getdaily(req.params.id);
        if (!daily) {
            return res.status(404).send({ message: "daily not found" });
        }
        const session = req.session; 
         try {
             authorizedailyreportGet(session, daily);
             res.status(200).json(daily);
         } catch (error) {
             return false;
         }
     }
     catch(err){
         console.error(err);
         res.status(500).send({ message: err.message });
     }
 })
router.post("/dailyReports",authenticateUser,async (req,res)=>{
    try {
        const partyOrder = await Party_Order.findAll();
        if (partyOrder) {
        let total=0 ;
        for(let i=0;i<partyOrder.length;i++)
        {
            // const totalpertable = await Party_Order.findOne({
            //     where: {
            //         RestaurantId: rUser.id, //need to change
            //     },})
            // total += totalpertable[i].Total;
            total+=partyOrder[i].Total;
        }
        
        
        const Alltotal = await DailyReport.create({
            RestaurantId:1,
            eCost : total
        }
        );
            res.status(200).json(Alltotal);}}
     catch (error) {
        console.error('Error:', error);
    }
        

})
module.exports = router;