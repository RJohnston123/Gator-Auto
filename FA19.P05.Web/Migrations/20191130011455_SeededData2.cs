using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FA19.P05.Web.Migrations
{
    public partial class SeededData2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(2019, 11, 30, 1, 14, 55, 50, DateTimeKind.Unspecified).AddTicks(1185), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(2019, 11, 30, 1, 14, 55, 50, DateTimeKind.Unspecified).AddTicks(2413), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 3,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(2019, 11, 30, 1, 14, 55, 50, DateTimeKind.Unspecified).AddTicks(2434), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 4,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(2019, 11, 30, 1, 14, 55, 50, DateTimeKind.Unspecified).AddTicks(2437), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 5,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(2019, 11, 30, 1, 14, 55, 50, DateTimeKind.Unspecified).AddTicks(2439), new TimeSpan(0, 0, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 3,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 4,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "InventoryItem",
                keyColumn: "Id",
                keyValue: 5,
                column: "AddedToStockUtc",
                value: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
