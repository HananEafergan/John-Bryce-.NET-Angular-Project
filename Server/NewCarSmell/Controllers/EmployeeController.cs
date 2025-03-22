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
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiController
    {
        EmployeeService _employeeService;

        public EmployeeController()
        {
            _employeeService = new EmployeeService();
        }

        [HttpGet]
        [Route("GetRentals")]
        public async Task<IHttpActionResult> GetRentals()
        {
            try
            {
                return Ok(await _employeeService.GetRentals());
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpPost]
        [Route("ReturnCar")]
        public async Task<IHttpActionResult> ReturnCar(Rental rental)
        {
            try
            {
                return Ok(await _employeeService.ReturnCar(rental));
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
