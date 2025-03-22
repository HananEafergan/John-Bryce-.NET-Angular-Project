using System;
using System.Threading.Tasks;
using System.Web.Http;
using NewCarSmell.BLL;
using NewCarSmell.Models;

namespace NewCarSmell.Controllers
{
    [RoutePrefix("api/Cars")]
    public class CarsController : ApiController
    {
        private readonly CarsService _carsService;

        public CarsController()
        {
            _carsService = new CarsService();
        }

        [HttpGet]
        [Route("GetCars")]
        public async Task<IHttpActionResult> GetCars()
        {
            try
            {
                return Ok(await _carsService.GetCars());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("AddCar")]
        public async Task<IHttpActionResult> AddCar(Car car)
        {
            try
            {
                return Ok(await _carsService.AddCar(car));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("UpdateCar")]
        public async Task<IHttpActionResult> UpdateCar(Car car)
        {
            try
            {
                return Ok(await _carsService.UpdateCar(car));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("DeleteCar/{carId}")]
        public async Task<IHttpActionResult> UpdateCar(int carId)
        {
            try
            {
                return Ok(await _carsService.DeleteCar(carId));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
