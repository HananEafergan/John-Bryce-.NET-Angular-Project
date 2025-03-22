using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewCarSmell.Models
{
    public class Car
    {
        public int CarID { get; set; }

        [Required]
        public int TypeID { get; set; }

        [ForeignKey("TypeID")]
        public CarType CarType { get; set; }

        [Required]
        public int CurrentMileage { get; set; }

        public string Image { get; set; }

        [Required]
        public bool IsAvailable { get; set; }

        [Required]
        public bool IsOperational { get; set; }

        [Required, MaxLength(20)]
        public string LicensePlate { get; set; }

        [Required]
        public int BranchID { get; set; }

        [ForeignKey("BranchID")]
        public Branch Branch { get; set; }
    }
}
