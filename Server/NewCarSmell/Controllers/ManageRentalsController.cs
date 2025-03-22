using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using NewCarSmell.BLL;
using NewCarSmell.Models;

namespace NewCarSmell.Controllers
{
    [RoutePrefix("api/ManageRentals")]
    public class ManageRentalsController : ApiController
    {
        readonly ManageRentalsService _manageRentalsService;

        public ManageRentalsController()
        {
            _manageRentalsService = new ManageRentalsService();
        }

        [HttpGet]
        [Route("GetRentals")]
        public async Task<IHttpActionResult> GetRentals()
        {
            try
            {
                return Ok(await _manageRentalsService.GetRentals());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("DeleteRental/{rentalId}")]
        public async Task<IHttpActionResult> GetRentals(int rentalId)
        {
            try
            {
                return Ok(await _manageRentalsService.DeleteRental(rentalId));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("UpdateRental")]
        public async Task<IHttpActionResult> UpdateRental(Rental rental)
        {
            try
            {
                return Ok(await _manageRentalsService.UpdateRental(rental));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
