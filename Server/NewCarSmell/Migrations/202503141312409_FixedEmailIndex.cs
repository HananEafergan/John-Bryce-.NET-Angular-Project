namespace NewCarSmell.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixedEmailIndex : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Branches",
                c => new
                    {
                        BranchID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        Latitude = c.Decimal(precision: 18, scale: 2),
                        Longitude = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.BranchID);
            
            CreateTable(
                "dbo.Cars",
                c => new
                    {
                        CarID = c.Int(nullable: false, identity: true),
                        TypeID = c.Int(nullable: false),
                        CurrentMileage = c.Int(nullable: false),
                        Image = c.String(),
                        IsAvailable = c.Boolean(nullable: false),
                        IsOperational = c.Boolean(nullable: false),
                        LicensePlate = c.String(nullable: false, maxLength: 20),
                        BranchID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CarID)
                .ForeignKey("dbo.Branches", t => t.BranchID, cascadeDelete: true)
                .ForeignKey("dbo.CarTypes", t => t.TypeID, cascadeDelete: true)
                .Index(t => t.TypeID)
                .Index(t => t.BranchID);
            
            CreateTable(
                "dbo.CarTypes",
                c => new
                    {
                        TypeID = c.Int(nullable: false, identity: true),
                        Manufacturer = c.String(nullable: false),
                        Model = c.String(nullable: false),
                        DailyRate = c.Decimal(nullable: false, precision: 18, scale: 2),
                        LateReturnFee = c.Decimal(nullable: false, precision: 18, scale: 2),
                        YearOfManufacture = c.Int(nullable: false),
                        GearType = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.TypeID);
            
            CreateTable(
                "dbo.Rentals",
                c => new
                    {
                        RentalID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        CarID = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        ExpectedReturnDate = c.DateTime(nullable: false),
                        ActualReturnDate = c.DateTime(),
                        TotalCost = c.Decimal(precision: 18, scale: 2),
                        Status = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.RentalID)
                .ForeignKey("dbo.Cars", t => t.CarID, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserID, cascadeDelete: true)
                .Index(t => t.UserID)
                .Index(t => t.CarID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        FullName = c.String(nullable: false),
                        IDNumber = c.String(nullable: false, maxLength: 20),
                        Username = c.String(nullable: false, maxLength: 50),
                        BirthDate = c.DateTime(),
                        Email = c.String(nullable: false, maxLength: 255),
                        PasswordHash = c.String(nullable: false),
                        ProfilePicture = c.String(),
                        Role = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.UserID)
                .Index(t => t.IDNumber, unique: true)
                .Index(t => t.Username, unique: true)
                .Index(t => t.Email, unique: true);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rentals", "UserID", "dbo.Users");
            DropForeignKey("dbo.Rentals", "CarID", "dbo.Cars");
            DropForeignKey("dbo.Cars", "TypeID", "dbo.CarTypes");
            DropForeignKey("dbo.Cars", "BranchID", "dbo.Branches");
            DropIndex("dbo.Users", new[] { "Email" });
            DropIndex("dbo.Users", new[] { "Username" });
            DropIndex("dbo.Users", new[] { "IDNumber" });
            DropIndex("dbo.Rentals", new[] { "CarID" });
            DropIndex("dbo.Rentals", new[] { "UserID" });
            DropIndex("dbo.Cars", new[] { "BranchID" });
            DropIndex("dbo.Cars", new[] { "TypeID" });
            DropTable("dbo.Users");
            DropTable("dbo.Rentals");
            DropTable("dbo.CarTypes");
            DropTable("dbo.Cars");
            DropTable("dbo.Branches");
        }
    }
}
