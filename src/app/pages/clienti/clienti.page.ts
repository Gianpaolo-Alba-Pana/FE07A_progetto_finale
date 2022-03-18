import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Fattura } from 'src/app/models/fattura';
import { ClientiService } from './clienti.service';
@Component({
  templateUrl: './clienti.page.html',
  styleUrls: ['./clienti.page.scss'],
})
export class ClientiPage implements OnInit {
  clienti: Cliente[] | undefined;
  pagina = 0;
  isLoading = false;
  booleanoFiltro = false;
  fatturatoValore = false;
  fattureCliente: Fattura[] | undefined;
  isLoadingModale = false;
  idDaEliminare: number | undefined;

  constructor(private clSrv: ClientiService) {}

  ngOnInit(): void {
    this.getClienti();
  }

  getClienti() {
    this.clSrv
      .getClienti(this.pagina)
      .subscribe((response) => (this.clienti = response.content));
  }

  async onRemoveCliente() {
    this.clSrv.eliminaFattureCLiente(this.idDaEliminare!).subscribe((response) => {
      this.clSrv.removeCliente(this.idDaEliminare!);
  setTimeout(() => {
    this.getClienti();
  }, 200);
    });
  }

  cambiaPagina(param: string) {
    if (param == '+') {
      this.pagina++;
    } else if (param == '-') {
      this.pagina--;
    }
    this.getClienti();
  }


  getFattureCliente(id: number) {
    this.isLoadingModale = true;
    this.clSrv.getAllFattureCliente(id).subscribe((res) => {
      this.fattureCliente = res.content;
      this.isLoadingModale = false;
      this.idDaEliminare = id;
      console.log(this.idDaEliminare)
    });
  }
}
