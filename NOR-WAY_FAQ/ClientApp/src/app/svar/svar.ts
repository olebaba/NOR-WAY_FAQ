import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { sporsmal } from '../sporsmal';

@Component({
  templateUrl: "svar.html"
})
export class Svar {
  skjema: FormGroup;
  ubesvarteSporsmal: Array<sporsmal>;
  kategorier: Array<string> = new Array();
  laster: boolean = true;

  validering = {
    id: [""],
    svar: [
      null, Validators.required
    ]
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
      this.skjema = fb.group(this.validering);
  }

  ngOnInit() {
    this.laster = true;
    this.hentUbesvarteSporsmal();
  }

  vedSubmit(id) {
    this.sendSvar(id);
  }

  hentUbesvarteSporsmal() {
    this.http.get<sporsmal[]>("api/sporsmal/ubesvarte")
      .subscribe(sporsmalene => {
        this.ubesvarteSporsmal = sporsmalene;
        this.laster = false;
        console.log(this.ubesvarteSporsmal);
        this.ubesvarteSporsmal.forEach(us => {
          this.setKategorier(us);
        })
      },
        error => console.log(error)
      );
  };

  sendSvar(id) {
    const endretSporsmal = this.ubesvarteSporsmal.find(us => {
      return us.id == id;
    });
    console.log(endretSporsmal);
    if (endretSporsmal.muligeSvar != null) {
      endretSporsmal.muligeSvar += "@@@" + this.skjema.value.svar;
    } else {
      endretSporsmal.muligeSvar = this.skjema.value.svar;
    }
    
    this.endreEtSporsmal(endretSporsmal);
  }

  endreEtSporsmal(endretSporsmal) {
    console.log(endretSporsmal);

    this.http.put("api/sporsmal/", endretSporsmal)
      .subscribe(
        retur => {
          this.router.navigate(['/svar']);
        },
        error => console.log(error)
      );
  }

  setKategorier(sporsmal) {
    if (!this.kategorier.includes(sporsmal.kategori)) {
      this.kategorier.push(sporsmal.kategori);
    }
  }

  settRiktigSvar(id, svaret: string): void {
    const endretSporsmal = this.ubesvarteSporsmal.find(us => {
      return us.id == id;
    });
    console.log(endretSporsmal);
    endretSporsmal.godkjentSvar = svaret;

    this.endreEtSporsmal(endretSporsmal);
  }
}
