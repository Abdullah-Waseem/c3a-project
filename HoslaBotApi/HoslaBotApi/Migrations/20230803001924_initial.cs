using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HoslaBotApi.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "C3A",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CMS_ID = table.Column<int>(type: "int", nullable: false),
                    NAME = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EMAIL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Anger_Score = table.Column<int>(type: "int", nullable: true),
                    Depression_Score = table.Column<int>(type: "int", nullable: true),
                    Anxiety_Score = table.Column<int>(type: "int", nullable: true),
                    Selfesteem_Score = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_C3A", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "C3A");
        }
    }
}
