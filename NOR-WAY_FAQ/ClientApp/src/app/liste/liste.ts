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

  sletteSporsmal(id: number) {
    this.http.delete("api/sporsmal/" + id)
      .subscribe(retur => {
        this.hentAlleSporsmal();
        this.router.navigate(['/liste']);
      },
       error => console.log(error)
      );
  };
}
