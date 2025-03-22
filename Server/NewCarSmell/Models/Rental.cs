using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NewCarSmell.Models;

namespace NewCarSmell.Models
{
    public class Rental
    {
        public int RentalID { get; set; }

        [Required]
        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public User User { get; set; }

        [Required]
        public int CarID { get; set; }

        [ForeignKey("CarID")]
        public Car Car { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime ExpectedReturnDate { get; set; }

        public DateTime? ActualReturnDate { get; set; }

        public decimal? TotalCost { get; set; }

        [Required]
        public string Status { get; set; }
    }
}