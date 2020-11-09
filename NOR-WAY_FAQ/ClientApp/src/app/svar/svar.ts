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
  alleSporsmal: Array<sporsmal>;
  laster: boolean = true;

  validering = {
    id: [""],
    epost: [
      null, Validators.compose([Validators.required, Validators.pattern("/^ [^@\s]+@[^@\s\.]+\.[^@\.\s]+$/")])
    ],
  }

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
      this.skjema = fb.group(this.validering);
  }

  ngOnInit() {
    this.laster = true;
    this.hentAlleSporsmal();
  }

  vedSubmit() {
      this.endreEtSporsmal();
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

  endreSporsmal(id: number) {
    this.http.get<sporsmal>("api/sporsmal/" + id)
      .subscribe(
        sporsmal => {
          this.skjema.patchValue({ id: sporsmal.id });
          this.skjema.patchValue({ epost: sporsmal.epost });
          this.skjema.patchValue({ godkjentSvar: sporsmal.godkjentSvar });
          this.skjema.patchValue({ sporring: sporsmal.sporring });
          this.skjema.patchValue({ muligeSvar: sporsmal.muligeSvar });
        },
        error => console.log(error)
      );
  }

  endreEtSporsmal() {
    const endretSporsmal = new sporsmal(this.skjema.value.epost, this.skjema.value.sporring);
    endretSporsmal.id = this.skjema.value.id;
    endretSporsmal.godkjentSvar = this.skjema.value.godkjentSvar;
    endretSporsmal.muligeSvar = this.skjema.value.muligeSvar;

    this.http.put("api/sporsmal/", endretSporsmal)
      .subscribe(
        retur => {
          this.router.navigate(['/liste']);
        },
        error => console.log(error)
      );
  }
}
