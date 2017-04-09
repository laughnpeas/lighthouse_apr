var salesTaxRates = {
 AB: 0.05,
 BC: 0.12,
 SK: 0.10
};

var companySalesData = [
 {
   name: "Telus",
   province: "BC",
   sales: [ 100, 200, 400 ]
 },
 {
   name: "Bombardier",
   province: "AB",
   sales: [ 80, 20, 10, 100, 90, 500 ]
 },
 {
   name: "Telus",
   province: "SK",
   sales: [ 500, 100 ]
 }
];

function calculateSalesTax(salesData, taxRates) {
 var outputObject = {};
 for (var i in salesData) {
   salesData[i]["totalSales"] = 0;
   for (var j in salesData[i]["sales"]) {
     salesData[i]["totalSales"] += salesData[i]["sales"][j];
   }
   if (taxRates.hasOwnProperty(salesData[i]["province"])) {
     salesData[i]["taxRate"] = taxRates[salesData[i]["province"]];
   }
   salesData[i]["totalTaxes"] = salesData[i]["totalSales"] * salesData[i]["taxRate"];
   if (outputObject.hasOwnProperty(salesData[i]["name"])) {
     outputObject[salesData[i]["name"]]["totalSales"] += salesData[i]["totalSales"];
     outputObject[salesData[i]["name"]]["totalTaxes"] += salesData[i]["totalTaxes"];
   }
   else {
     outputObject[salesData[i]["name"]] = {};
     outputObject[salesData[i]["name"]]["totalSales"] = salesData[i]["totalSales"];
     outputObject[salesData[i]["name"]]["totalTaxes"] = salesData[i]["totalTaxes"];
   }
 }
 return outputObject;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);