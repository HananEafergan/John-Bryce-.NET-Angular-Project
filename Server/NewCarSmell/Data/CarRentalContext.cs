using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;
using NewCarSmell.Models;

namespace NewCarSmell.Data
{
	public class NewCarSmellContext: DbContext
	{
        public NewCarSmellContext()
            : base(ConfigurationManager.ConnectionStrings["NewCarSmellContext"].ConnectionString) { }


        public DbSet<User> Users { get; set; }
        public DbSet<CarType> CarTypes { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Rental> Rentals { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.IDNumber)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }
    }
}