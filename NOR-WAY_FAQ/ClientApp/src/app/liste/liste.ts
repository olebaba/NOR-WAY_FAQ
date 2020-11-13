import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { sporsmal } from "../sporsmal";

@Component({
  templateUrl: "liste.html"
})
export class Liste {
  kategorier: Array<string> = new Array();
  alleSporsmal: Array<sporsmal>;
  laster: boolean;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.laster = true;
    this.hentAlleSporsmal();
  }

  setKategorier(sporsmal) {
    if (!this.kategorier.includes(sporsmal.kategori)) {
      this.kategorier.push(sporsmal.kategori);
    }
  }

  kategoriHarSporsmal(kategori) {
    var finnes = false;
    this.alleSporsmal.forEach(s => {
      if (s.kategori == kategori && s.godkjentSvar != null)
        finnes = true;
    });
    return finnes;
  }

  hentAlleSporsmal() {
    this.http.get<sporsmal[]>("api/sporsmal/")
      .subscribe(sporsmalene => {
        this.alleSporsmal = sporsmalene;
        this.laster = false;
        console.log(this.alleSporsmal);
        this.alleSporsmal.forEach(s => {
          this.setKategorier(s);
        });
        console.log(this.kategorier);
      },
       error => console.log(error)
      );
  };

  settRiktigSvar(id, svaret: string): void {
    const endretSporsmal = this.alleSporsmal.find(us => {
      return us.id == id;
    });
    console.log(endretSporsmal);
    endretSporsmal.godkjentSvar = svaret;

    this.endreEtSporsmal(endretSporsmal);
  }

  endreEtSporsmal(endretSporsmal) {
    console.log(endretSporsmal);

    this.http.put("api/sporsmal/", endretSporsmal)
      .subscribe(
        retur => {
          this.router.navigate(['/']);
        },
        error => console.log(error)
      );
  }

  tommelOpp(id) {
    const endretSporsmal = this.alleSporsmal.find(us => {
      return us.id == id;
    });

    endretSporsmal.rating++;

    this.endreEtSporsmal(endretSporsmal);
  }
}
