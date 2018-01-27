import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objetoFeed = {
    titulo: "Thiago Bernardo",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível...",
    qtdLikes: 12,
    qtdComments: 4,
    timeComment: "11h ago"
  };

  public listaFilmes = new Array<any>();
  public page = 1;

  public nomeUsuario:string = "Thiago Bernardo do Código";

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {}

  public somaDoisNumeros(num1:number, num2:number): void {
    // alert('Soma: ' +  num1 + num2);
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id} );
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();

    setTimeout(() => {
      console.log('Async operatio has ended...');
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;

    this.carregarFilmes(true);
  }

  carregarFilmes(newPage: boolean = false) {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);

        if (newPage) {
          this.listaFilmes = this.listaFilmes.concat(response.results);
          this.infiniteScroll.complete();
        } else {
          this.listaFilmes = response.results;
        }

        console.log(data);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      error => {
          console.log(error);
          this.fechaCarregando();
          if (this.isRefreshing) {
            this.refresher.complete();
            this.isRefreshing = false;
          }
      }
    );
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

}
