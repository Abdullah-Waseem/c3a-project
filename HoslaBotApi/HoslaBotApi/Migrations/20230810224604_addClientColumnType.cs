using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HoslaBotApi.Migrations
{
    /// <inheritdoc />
    public partial class addClientColumnType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientOfC3A",
                table: "C3A",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientOfC3A",
                table: "C3A");
        }
    }
}
