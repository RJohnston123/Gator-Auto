using Microsoft.EntityFrameworkCore.Migrations;

namespace FA19.P05.Web.Migrations
{
    public partial class AddedCarImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Make",
                table: "MakeList",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "InventoryItem",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MakeList_Make",
                table: "MakeList",
                column: "Make",
                unique: true,
                filter: "[Make] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_MakeList_Make",
                table: "MakeList");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "InventoryItem");

            migrationBuilder.AlterColumn<string>(
                name: "Make",
                table: "MakeList",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
