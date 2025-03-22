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
	public class ManageRentalsService
	{
		NewCarSmellContext _context;

        public ManageRentalsService()
        {
            _context = new NewCarSmellContext();
        }

        public async Task<ManageRentalObj> GetRentals()
		{
			try
			{
                ManageRentalObj rentalObj = new ManageRentalObj
                {
                    Cars = await _context.Cars.ToListAsync(),
                    Users = await _context.Users.ToListAsync(),
                    Rentals = await _context.Rentals.ToListAsync(),
                };

                return rentalObj;

            }
			catch (Exception ex)
			{

				throw ex;
			}

        }

        public async Task<bool> DeleteRental(int rentalId)
        {
			try
			{
				Rental rental = await _context.Rentals.FirstOrDefaultAsync(r => r.RentalID == rentalId);

				if (rental == null) {
					return false;
				}

                Car car = _context.Cars.FirstOrDefault(c => c.CarID == rental.CarID);
                if (car == null)
                {
                    return false;
                }

                car.IsAvailable = true;
                _context.Cars.AddOrUpdate(car);
                _context.Rentals.Remove(rental);
				await _context.SaveChangesAsync();
				return true;

			}
			catch (Exception ex)
			{
				throw ex;
			}
        }

        public async Task<bool> UpdateRental(Rental rental)
        {
            try
            {
                if(rental.Status == "Returned")
                {
                    Car car = _context.Cars.FirstOrDefault(c => c.CarID == rental.CarID);
                    if (car == null) {
                        return false; 
                    }
                    car.IsAvailable = true;

                    _context.Cars.AddOrUpdate(car);
                }
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