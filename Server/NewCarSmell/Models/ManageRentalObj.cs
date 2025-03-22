using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewCarSmell.Models
{
	public class ManageRentalObj
	{
        public List<Car> Cars { get; set; }
        public List<User> Users { get; set; }
        public List<Rental> Rentals { get; set; }
    }
}