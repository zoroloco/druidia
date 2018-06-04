// Component for login.
import { Component, OnInit } from '@angular/core';
import {LoggerService, MovieService} from '../../services';
import {Movie} from "../../models";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{
  movies: Array<Movie>;
  displayedColumns = ['title'];

  constructor(private log: LoggerService, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.fetchMovies().subscribe(result=>{
      this.movies = result;
    }, error=> {
      this.log.error('Error fetching movies.');
    })
  }
}
