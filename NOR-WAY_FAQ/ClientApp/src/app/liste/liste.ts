import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { sporsmal } from "../sporsmal";

@Component({
  templateUrl: "liste.html"
})
export class Liste {
  alleSporsmal: Array<sporsmal>;
  laster: boolean;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.laster = true;
    this.hentAlleSporsmal();
  }

  hentAlleSporsmal() {
    this.http.get<sporsmal[]>("api/sporsmal/")
      .subscribe(kundene => {
        this.alleSporsmal = kundene;
        this.laster = false;
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
