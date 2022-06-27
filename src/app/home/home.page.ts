import { environment } from '../../environments/environment';
import { MovieService } from './../service/movie.service';
import { InfiniteScrollCustomEvent,LoadingController } from '@ionic/angular';
import { Component} from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  profile: null;
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  
  
  constructor(
    private movieService: MovieService,
    private LoadingCtrl: LoadingController

  ) { }
  ngOnInit() {
    this.loadMovies();
    }
  async loadMovies(event?) {
    const loading = await this.LoadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();


    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res=>{
      loading.dismiss();
      
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if(event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
  });

  
}
  loadMore(event:InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
}



