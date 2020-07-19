using Microsoft.EntityFrameworkCore.Migrations;

namespace FA19.P05.Web.Migrations
{
    public partial class UserFavoritesFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "UserFavorites",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavorites_UserName_InventoryId",
                table: "UserFavorites",
                columns: new[] { "UserName", "InventoryId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserFavorites_UserName_InventoryId",
                table: "UserFavorites");

            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "UserFavorites",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
