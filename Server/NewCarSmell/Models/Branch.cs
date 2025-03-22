using System.ComponentModel.DataAnnotations;

namespace NewCarSmell.Models
{
    public class Branch
    {
        public int BranchID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
    }
}