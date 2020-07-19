using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FA19.P05.Web.Migrations
{
    public partial class SeededData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Dealership",
                columns: new[] { "Id", "OpenHours", "SalesPhoneNumber", "StoreName", "Address_City", "Address_Line1", "Address_Line2", "Address_State", "Address_ZipCode" },
                values: new object[] { 2, "9-5", "+19857283746", "Gator Auto", "Slidell", "101 Gator Dr.", "", "LA", "70458" });

            migrationBuilder.InsertData(
                table: "InventoryItem",
                columns: new[] { "Id", "AddedToStockUtc", "BaseCost", "DealershipId", "Image", "Make", "Model", "VIN", "Year" },
                values: new object[,]
                {
                    { 1, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 3000m, 1, "https://i.imgur.com/xJYcO50.png", "NISSAN", "Sentra", "3N1CB51D96L487364", 2006 },
                    { 2, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 20000m, 1, "https://i.imgur.com/rD8ShNd.png", "FORD", "Fusion", "3FAHP0JA3CR394884", 2012 },
                    { 5, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 20000m, 1, "https://i.imgur.com/5CDUcon.png", "TOYOTA", "Corolla", "5YFBURHE5FP260426", 2015 }
                });

            migrationBuilder.InsertData(
                table: "InventoryOption",
                columns: new[] { "Id", "Make", "Model", "OptionDescription", "Price", "Year" },
                values: new object[,]
                {
                    { 1, "NISSAN", "Sentra", @"-Includes Floor Mats 
                -Heated Seats", 4000m, 2006 },
                    { 2, "NISSAN", "Sentra", @"-Includes Floor Mats 
                -Heated Seats 
                -Bluetooth Radio", 4100m, 2006 },
                    { 3, "FORD", "F150", @"-Includes Floor Mats 
                -Heated Seats 
                -Bluetooth Radio", 35000m, 2012 }
                });

            migrationBuilder.InsertData(
                table: "MakeList",
                columns: new[] { "Id", "Make" },
                values: new object[,]
                {
                    { 1, "NISSAN" },
                    { 2, "FORD" },
                    { 3, "TOYOTA" }
                });

            migrationBuilder.InsertData(
                table: "MakeModelOption",
                columns: new[] { "Id", "Make", "Model" },
                values: new object[,]
                {
                    { 1, "NISSAN", "Sentra" },
                    { 2, "FORD", "Fusion" },
                    { 3, "FORD", "F150" },
                    { 4, "TOYOTA", "Prius Prime" },
                    { 5, "TOYOTA", "Corolla" }
                });

            migrationBuilder.InsertData(
                table: "InventoryItem",
                columns: new[] { "Id", "AddedToStockUtc", "BaseCost", "DealershipId", "Image", "Make", "Model", "VIN", "Year" },
                values: new object[] { 3, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 30000m, 2, "https://i.imgur.com/oLsO8Bw.png", "FORD", "F150", "1FTFW1CT6CFB64889", 2012 });

            migrationBuilder.InsertData(
                table: "InventoryItem",
                columns: new[] { "Id", "AddedToStockUtc", "BaseCost", "DealershipId", "Image", "Make", "Model", "VIN", "Year" },
                values: new object[] { 4, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), 35000m, 2, "https://i.imgur.com/gzpjD4f.png", "TOYOTA", "Prius Prime", "JTDKARFP9J3071163", 2018 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "InventoryOption",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "InventoryOption",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "InventoryOption",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "MakeList",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "MakeList",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "MakeList",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "MakeModelOption",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "MakeModelOption",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "MakeModelOption",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "MakeModelOption",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "MakeModelOption",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Dealership",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
