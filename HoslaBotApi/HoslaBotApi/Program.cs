using HoslaBotApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// Here, you need to replace "Your_MySQL_Connection_String_Here" with your actual MySQL connection string.
// It should look something like "server=myServerAddress;database=myDataBase;user=myUsername;password=myPassword;"
string? connection_string = builder.Configuration.GetConnectionString("HoslaBotConnection");
builder.Services.AddDbContext<UserContext>(options=>options.UseSqlServer(connection_string));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
