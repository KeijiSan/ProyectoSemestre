import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageTitle = 'home';
  isNotHome = false;
  loading : HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {}

  ngOnInit(): void {
    this.cargarLoading('Bienvendo a RegistraAPP');
  }

  cargarLoading(message: string){
    this.presentLoading(message);
    setTimeout(() => {
      this.loading.dismiss();
    },4000);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });

    await this.loading.present();

  }

  

}
