import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

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

  public nomeUsuario:string = "Thiago Bernardo do Código";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private movieProvider: MovieProvider
  ) {}

  public somaDoisNumeros(num1:number, num2:number): void {
    // alert('Soma: ' +  num1 + num2);
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovies().subscribe(
      data => {
        const response = (data as any);
        this.listaFilmes = response.results;
        console.log(data);
    },
    error => {
        console.log(error);
    }
    );
  }

}
