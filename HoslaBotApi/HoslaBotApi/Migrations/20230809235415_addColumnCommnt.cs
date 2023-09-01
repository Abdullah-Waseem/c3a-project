using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HoslaBotApi.Migrations
{
    /// <inheritdoc />
    public partial class addColumnCommnt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_C3A",
                table: "C3A");

            migrationBuilder.AlterColumn<int>(
                name: "CMS_ID",
                table: "C3A",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_C3A",
                table: "C3A",
                column: "CMS_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_C3A",
                table: "C3A");

            migrationBuilder.AlterColumn<int>(
                name: "CMS_ID",
                table: "C3A",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");


            migrationBuilder.AddPrimaryKey(
                name: "PK_C3A",
                table: "C3A",
                column: "Id");
        }
    }
}
