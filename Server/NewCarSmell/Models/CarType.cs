using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NewCarSmell.Models
{
    public class CarType
    {
        [Key]
        public int TypeID { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public decimal DailyRate { get; set; }

        [Required]
        public decimal LateReturnFee { get; set; }

        [Required]
        public int YearOfManufacture { get; set; }

        [Required]
        public string GearType { get; set; }
    }
}