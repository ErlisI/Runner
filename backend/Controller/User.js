const { DailyReport } = require("../models");
const excelJS = require("exceljs");
const exportUser = async (req, res) => {
   // WRITE DOWNLOAD EXCEL LOGIC
   const workbook = new excelJS.Workbook();  // Create a new workbook
   const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
   const path = "./Controller";  // Path to download excel
   worksheet.columns = [
    { header: "id", key: "id", width: 10 }, 
    { header: "RestaurantId", key: "RestaurantId", width: 10 },
    { header: "date", key: "date", width: 10 },
    { header: "eCost", key: "eCost", width: 10 },
    { header: "sCost", key: "sCost", width: 10 },
    { header: "NetProfit", key: "netprofit", width: 10 },
    { header: "CreatedAt", key: "createdAt", width: 10 },
    { header: "UpdatedAt", key: "updatedAt", width: 10 },
];
const dailyreport = await DailyReport.findAll();
const rUser = req.session.userId;
console.log("\nID of the resturent is that \n"+rUser);
for(let i=0;i<dailyreport.length;i++)
{
    if(dailyreport[i].RestaurantId==rUser)
    worksheet.addRow(dailyreport[i]);
}
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
     .then(() => {
       res.send({
         status: "success",
         message: "file successfully downloaded",
         path: `${path}/users.xlsx`,
        });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
};




module.exports = exportUser;