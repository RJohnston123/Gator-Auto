using Microsoft.EntityFrameworkCore.Migrations;

namespace FA19.P05.Web.Migrations
{
    public partial class SeededDealership : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Dealership",
                columns: new[] { "Id", "OpenHours", "SalesPhoneNumber", "StoreName", "Address_City", "Address_Line1", "Address_Line2", "Address_State", "Address_ZipCode" },
                values: new object[] { 1, "9-5", "+19857431545", "Gator Auto", "Hammond", "101 Gator Dr.", "", "LA", "70403" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Dealership",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
