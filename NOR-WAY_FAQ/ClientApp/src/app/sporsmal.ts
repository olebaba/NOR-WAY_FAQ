export class sporsmal {
  id: number;
  epost: string;
  sporring: string;
  godkjentSvar: string;
  muligeSvar: Array<string> = [];

  constructor(epost: string, sporring: string) {
    this.epost = epost;
    this.sporring = sporring;
  }

  setEtSvar(svarforslag: string) {
    this.muligeSvar.push(svarforslag);
  }

  setFaktiskSvar(svar: string) {
    this.godkjentSvar = svar;
  }
}
