using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using NewCarSmell.BLL;
using NewCarSmell.Data;
using NewCarSmell.Models;

namespace NewCarSmell.Controllers
{
    [RoutePrefix("api/User")]
    public class UsersController : ApiController
    {
        private readonly UserService _userService;

        public UsersController()
        {
            this._userService = new UserService();
        }

        [HttpPost]
        [Route("RentCar")]
        public async Task<IHttpActionResult> RentCar(Rental rental)
        {
            try
            {
                return Ok(await _userService.RentCar(rental));
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Database Error: {ex.Message}");
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("GetUserRentals/{userId}")]
        public async Task<IHttpActionResult>GetUserRentals(int userId)
        {
            try
            {
                return Ok(await _userService.GetUserRentals(userId));
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Database Error: {ex.Message}");
                return InternalServerError(ex);
            }
        }

    }
}
