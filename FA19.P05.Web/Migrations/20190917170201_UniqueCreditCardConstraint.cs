using Microsoft.EntityFrameworkCore.Migrations;

namespace FA19.P05.Web.Migrations
{
    public partial class UniqueCreditCardConstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CreditScore_UserId",
                table: "CreditScore");

            migrationBuilder.CreateIndex(
                name: "IX_CreditScore_UserId",
                table: "CreditScore",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CreditScore_UserId",
                table: "CreditScore");

            migrationBuilder.CreateIndex(
                name: "IX_CreditScore_UserId",
                table: "CreditScore",
                column: "UserId");
        }
    }
}
