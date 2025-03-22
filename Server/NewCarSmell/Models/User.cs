using System;
using System.ComponentModel.DataAnnotations;

namespace NewCarSmell.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required, MaxLength(20)]
        public string IDNumber { get; set; }

        [Required, MaxLength(50)]
        public string Username { get; set; }

        public DateTime? BirthDate { get; set; }

        [Required]
        [StringLength(1)]
        public string Gender { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string ProfilePicture { get; set; }

        [Required]
        public string Role { get; set; }
    }
}