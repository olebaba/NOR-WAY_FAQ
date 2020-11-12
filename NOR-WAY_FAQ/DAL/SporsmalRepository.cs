using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NOR_WAY_FAQ.Models;

namespace NOR_WAY_FAQ.DAL
{
    public class SporsmalRepository : ISporsmalRepository
    {
        private readonly SporsmalContext _db;

        public SporsmalRepository(SporsmalContext db)
        {
            _db = db;
        }

        public async Task<bool> Lagre(Sporsmal innSporsmal)
        {
            try
            {
                var nyttSporsmal = new Sporsmal()
                {
                    Sporring = innSporsmal.Sporring,
                    GodkjentSvar = innSporsmal.GodkjentSvar,
                    MuligeSvar = innSporsmal.MuligeSvar
                };
                _db.Sporsmal.Add(nyttSporsmal);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<List<Sporsmal>> HentAlle()
        {
            try
            {
                List<Sporsmal> alleSporsmal = await _db.Sporsmal.Select(s => new Sporsmal
                {
                    ID = s.ID,
                    Kategori = s.Kategori,
                    Sporring = s.Sporring,
                    Epost = s.Epost,
                    GodkjentSvar = s.GodkjentSvar,
                    MuligeSvar = s.MuligeSvar,
                }).ToListAsync();

                return alleSporsmal;
            }
            catch
            {
                return null;
            }
        }

    }
}