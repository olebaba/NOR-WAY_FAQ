using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Castle.Core.Internal;
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
                    Epost = innSporsmal.Epost,
                    Sporring = innSporsmal.Sporring,
                    Kategori = innSporsmal.Kategori,
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

        public async Task<bool> Endre(Sporsmal endretSporsmal)
        {
            try
            {
                Sporsmal gammelSporsmal = await _db.Sporsmal.FindAsync(endretSporsmal.ID);
                gammelSporsmal.MuligeSvar = endretSporsmal.MuligeSvar;
                gammelSporsmal.GodkjentSvar = endretSporsmal.GodkjentSvar;
                gammelSporsmal.Kategori = endretSporsmal.Kategori;
                gammelSporsmal.Epost = endretSporsmal.Epost;

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

        public List<Sporsmal> HentUbesvarte()
        {
            try
            {
                List<Sporsmal> alleUbesvarteSporsmal = new List<Sporsmal>();
                foreach( var ubesvartSporsmal in _db.Sporsmal.Where(s => s.GodkjentSvar == null || s.GodkjentSvar == ""))
                {
                    alleUbesvarteSporsmal.Add(ubesvartSporsmal);
                }
                Console.WriteLine(alleUbesvarteSporsmal.Count);
                return alleUbesvarteSporsmal;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

    }
}