import { Component, OnInit } from '@angular/core';
import { sporsmal } from './sporsmal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  sporring: string;
  epost: string;
  svar: string;

  alleSporsmal: Array<sporsmal> = [];



  slettSporsmal(etSporsmal: sporsmal): void {
    const index = this.alleSporsmal.indexOf(etSporsmal);
    this.alleSporsmal.splice(index, 1);
  }

  svarSporsmal(id): void{
    var sporsmalID = id;
    this.alleSporsmal[sporsmalID].setEtSvar(this.svar);
    console.log(this.alleSporsmal);
    this.svar = "";
  }

  settRiktigSvar(id, svaret: string): void {
    var sporsmalID = id;
    this.alleSporsmal[sporsmalID].setFaktiskSvar(svaret);
    console.log(this.alleSporsmal);
  }
}
