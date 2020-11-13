import { Input } from "@angular/core";

export class sporsmal {
  id: number;
  kategori: string;
  epost: string;
  sporring: string;
  muligeSvar: string;

  constructor(epost: string, kategori: string, sporring: string) {
    this.epost = epost;
    this.kategori = kategori;
    this.sporring = sporring;
  }

  @Input()
  set godkjentSvar(svar: string) {
    this.godkjentSvar = svar;
  }
}
