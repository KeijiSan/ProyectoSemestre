import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {
  conversor: any
  euro:any
  peso_chileno:any
  constructor(public httpClient: HttpClient){
    this.loadData()
  }
    

    loadData(){
    this.httpClient.get(`https://mindicador.cl/api`).subscribe(results =>{
      console.log(results);
      this.conversor =results['dolar']
      console.log(this.conversor);
      this.euro =results['euro']
      console.log(this.euro);
      

    })
  }

  ngOnInit() {
  }

}
