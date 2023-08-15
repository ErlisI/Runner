const exportDailyReportsToExcel = async (dailyReports, restaurantId) => {
    try {
        const ExcelJS = require('exceljs');

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Daily Reports');
        
        // Add headers
        worksheet.addRow(['Date', 'Party Order Total', 'eCost', 'sCost', 'Net Profit']);

        // Add data
        dailyReports.forEach(report => {
            worksheet.addRow([
                report.date.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
                report.partyOrderTotal,
                report.eCost,
                report.sCost,
                report.netProfit,
            ]);
        });

        // Save the Excel file with a custom name based on the RestaurantId
        const fileName = `daily_reports_${restaurantId}.xlsx`;
        await workbook.xlsx.writeFile(fileName);

        console.log(`Excel file ${fileName} created successfully`);
    } catch (error) {
        console.error('Error exporting daily reports to Excel:', error.message);
    }
};

module.exports = { exportDailyReportsToExcel };
