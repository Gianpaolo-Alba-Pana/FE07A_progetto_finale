import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from './fatture.service';

@Component({
  templateUrl: './fatture.page.html',
  styleUrls: ['./fatture.page.scss'],
})
export class FatturePage implements OnInit {
  fatture!: Fattura[];
  isLoading = false;
  pagina = 0;
  booleanoFiltro = false;
  constructor(private router: ActivatedRoute, private fatSrv: FattureService) {}

  ngOnInit(): void {
    this.onGetAllFatture();
  }

  onGetAllFatture() {
    this.fatSrv.getAllFatture(this.pagina).subscribe((response) => {
      this.fatture = response.content;
    });
  }


  cambiaPagina(param: string) {
    if (param == '+') {
      this.pagina++;
    } else if (param == '-') {
      this.pagina--;
    }
    this.onGetAllFatture();
  }


  rimuoviFattura(fattura: Fattura) {
    this.fatSrv.removeFattura(fattura).subscribe(response => {this.onGetAllFatture()})
  }

}
