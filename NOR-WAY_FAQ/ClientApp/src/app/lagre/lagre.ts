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
      null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
    ],
    sporring: [
      null, Validators.required
    ],
    kategori: [
      null, Validators.required
    ]
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.skjema = fb.group(this.validering);
  }

  vedSubmit() {
      this.lagreSporsmal();
  }

  lagreSporsmal() {
    const nyttSporsmal = new sporsmal(this.skjema.value.epost, this.skjema.value.kategori, this.skjema.value.sporring);
    console.log(nyttSporsmal);

    this.http.post("api/sporsmal/", nyttSporsmal)
      .subscribe(retur => {
        this.router.navigate(['/liste']);
      },
       error => console.log(error)
      );
  };
}
