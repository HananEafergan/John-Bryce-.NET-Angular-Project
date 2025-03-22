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
	public class BranchService
	{
		private readonly NewCarSmellContext _context;
		public BranchService() {
			_context = new NewCarSmellContext();
		}

		public async Task<List<Branch>>GetBranches()
		{
			try
			{
				return await _context.Branches.ToListAsync();
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public async Task<bool> AddBranch(Branch branch) {
			try
			{
				_context.Branches.Add(branch);
				await _context.SaveChangesAsync();

			}
			catch (Exception ex)
			{
				throw ex;
			}

			return true;
		}

        public async Task<bool> DeleteBranch(int branchId)
        {
			try
			{
				Branch branchToRemove = _context.Branches.FirstOrDefault(b => b.BranchID == branchId);

				if(branchToRemove != null)
				{
					_context.Branches.Remove(branchToRemove);
					await _context.SaveChangesAsync();
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}

			return true;
        }

        public async Task<bool> UpdateBranch(Branch branch)
        {
			try
			{
				_context.Branches.AddOrUpdate(branch);
				await _context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				throw ex;
			}

			return true;

        }
    }
}