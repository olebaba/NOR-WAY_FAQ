using NOR_WAY_FAQ.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NOR_WAY_FAQ.DAL
{
    public interface ISporsmalRepository
    {
        Task<bool> Lagre(Sporsmal innSporsmal);
        Task<List<Sporsmal>> HentAlle();
    }
}
