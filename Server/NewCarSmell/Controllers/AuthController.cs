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
    [RoutePrefix("api/Auth")]
    public class AuthController : ApiController
    {
        AuthService _authService;
        public AuthController()
        {
            _authService = new AuthService();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IHttpActionResult> Login(User user)
        {
            try
            {
                return Ok(await _authService.Authenticate(user));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(User user)
        {
            try
            {
                return Ok(await _authService.Register(user));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
