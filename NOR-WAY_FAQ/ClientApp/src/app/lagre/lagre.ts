import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { sporsmal } from "../sporsmal";

@Component({
  templateUrl: "lagre.html"
})
export class Lagre {
  skjema: FormGroup;
  
  validering = {
    id: [""],
    epost: [
      null, [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    ],
    sporring: [
      null, Validators.required
    ],
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.skjema = fb.group(this.validering);
  }

  vedSubmit() {
      this.lagreSporsmal();
  }

  lagreSporsmal() {
    const nyttSporsmal = new sporsmal(this.skjema.value.epost, this.skjema.value.sporring);
    nyttSporsmal.id = this.skjema.value.id;
    nyttSporsmal.godkjentSvar = this.skjema.value.godkjentSvar;
    nyttSporsmal.muligeSvar = this.skjema.value.muligeSvar;

    this.http.post("api/sporsmal/", nyttSporsmal)
      .subscribe(retur => {
        this.router.navigate(['/liste']);
      },
       error => console.log(error)
      );
  };
}
