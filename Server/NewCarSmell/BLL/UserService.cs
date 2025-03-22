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
	public class UserService
	{
		NewCarSmellContext _context;

        public UserService()
        {
            _context = new NewCarSmellContext();
        }

        public async Task<bool> RentCar(Rental rental)
        {
            try
            {
                Car car = _context.Cars.FirstOrDefault(c => c.CarID == rental.CarID);
                car.IsAvailable = false;
                _context.Rentals.Add(rental);
                _context.Cars.AddOrUpdate(car);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Rental>>GetUserRentals(int userId)
        {
            try
            {
                return await _context.Rentals.Where(r => r.UserID == userId).Include(r => r.Car.CarType).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}