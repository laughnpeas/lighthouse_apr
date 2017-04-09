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

 //initialize object to return
 var outputObject = {};

 // iterate through each data object in the salesDataArray
 for (var i = 0; i < salesData.length; i++) {

   // initiate "total sales" key in each data object
   salesData[i]["totalSales"] = 0;

   // loop through the sales in each object's "sales" keys
   // add them up and store them in a new key for total sales
   for (var j = 0; j < salesData[i]["sales"].length; j++) {
     salesData[i]["totalSales"] += salesData[i]["sales"][j];
   }

   // for each data object, add a new key for the tax rate
   // we get the tax rate by accessing the corresponding province name in the taxRates array
   if (taxRates.hasOwnProperty(salesData[i]["province"])) {
     salesData[i]["taxRate"] = taxRates[salesData[i]["province"]];
   }

   // calculate the total taxes for each province
   salesData[i]["totalTaxes"] = salesData[i]["totalSales"] * salesData[i]["taxRate"];

   // now we begin populating the object we initialized at the beginning
   // we use an if/else block here to account for multiple instances of a company in differennt provinces
   // if the company object already exists in the return object, we just add the new sales and taxes to the original values
   // if it doesn't exist yet, we initiate a new object for that company, and set its sales and taxes
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