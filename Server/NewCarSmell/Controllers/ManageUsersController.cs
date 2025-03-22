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
    [RoutePrefix("api/ManageUsers")]
    public class ManageUsersController : ApiController
    {
        readonly ManageUsersService _manageUsersService;

        public ManageUsersController()
        {
            _manageUsersService = new ManageUsersService();
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IHttpActionResult> GetUsers()
        {
            try
            {
                return Ok(await _manageUsersService.GetUsers());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("DeleteUser/{userId}")]
        public async Task<IHttpActionResult> DeleteUser(int userId)
        {
            try
            {
                return Ok(await _manageUsersService.DeleteUser(userId));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("UpdateUser")]
        public async Task<IHttpActionResult> UpdateUser(User user)
        {
            try
            {
                return Ok(await _manageUsersService.UpdateUser(user));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
