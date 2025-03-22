using System;
using System.Threading.Tasks;
using System.Web.Http;
using NewCarSmell.BLL;
using NewCarSmell.Models;

namespace NewCarSmell.Controllers
{
    [RoutePrefix("api/Branches")]
    public class BranchController : ApiController
    {
        private readonly BranchService _branchService;

        public BranchController()
        {
            _branchService = new BranchService();
        }

        [HttpGet]
        [Route("GetBranches")]
        public async Task<IHttpActionResult> GetBranches()
        {
            try
            {
                return Ok(await _branchService.GetBranches());
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("AddBranch")]
        public async Task<IHttpActionResult> AddBranch(Branch branch)
        {
            try
            {
                await _branchService.AddBranch(branch);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("UpdateBranch")]
        public async Task<IHttpActionResult> UpdateBranch(Branch branch)
        {
            try
            {
                await _branchService.UpdateBranch(branch);
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("DeleteBranch/{branchId}")]
        public async Task<IHttpActionResult> DeleteBranch(int branchId)
        {
            await _branchService.DeleteBranch(branchId);
            return Ok();
        }
    }
}
