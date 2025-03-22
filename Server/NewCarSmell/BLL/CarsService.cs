using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading.Tasks;
using NewCarSmell.Data;
using NewCarSmell.Models;

namespace NewCarSmell.BLL
{
    public class CarsService
    {
        private readonly NewCarSmellContext _context;

        public CarsService()
        {
            _context = new NewCarSmellContext();
        }

        public async Task<ManageCarsObj> GetCars()
        {
            try
            {
                return new ManageCarsObj
                {
                    branches = await _context.Branches.ToListAsync(),
                    cars = await _context.Cars.Include(c => c.CarType).ToListAsync()
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> AddCar(Car car)
        {
            try
            {
                car.Branch = null;
                _context.Cars.Add(car);
                _context.CarTypes.Add(car.CarType);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateCar(Car car)
        {
            try
            {
                _context.Cars.AddOrUpdate(car);
                _context.CarTypes.AddOrUpdate(car.CarType);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteCar(int carId)
        {
            try
            {
                Car carToRemove = await _context.Cars.FirstOrDefaultAsync(c => c.CarID == carId);
                if (carToRemove == null)
                {
                    return false;
                }

                CarType carTypeToRemove = await _context.CarTypes.FirstOrDefaultAsync(ct => ct.TypeID == carToRemove.TypeID);

                if(carTypeToRemove == null)
                {
                    return false;

                }

                _context.Cars.Remove(carToRemove);
                _context.CarTypes.Remove(carTypeToRemove);
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