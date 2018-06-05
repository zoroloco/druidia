// Component for login.
import { Component, OnInit } from '@angular/core';
import {LoggerService, MovieService} from '../../services';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{
  datasource: any;
  displayedColumns = ['index','title'];

  constructor(private log: LoggerService, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.fetchMovies().subscribe(movies=>{
      this.datasource = new MatTableDataSource(movies);
    }, error=> {
      this.log.error('Error fetching movies.');
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.datasource.filter = filterValue;
  }
}
