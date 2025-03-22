using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using NewCarSmell.Data;
using NewCarSmell.Models;

namespace NewCarSmell.BLL
{
	public class EmployeeService
	{
		NewCarSmellContext _context;
        public EmployeeService()
        {
            _context = new NewCarSmellContext();
        }

        public async Task<List<Rental>> GetRentals()
        {
			try
			{
				return await _context.Rentals.Include(r => r.User).Include(r => r.Car.CarType).ToListAsync();
			}
			catch (Exception ex)
			{
				throw ex;
			}
        }

        public async Task<bool> ReturnCar(Rental rental)
        {
            try
            {
                rental.Car.IsAvailable = true;
                _context.Cars.AddOrUpdate(rental.Car);
                _context.Rentals.AddOrUpdate(rental);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}