import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {

  movies = [
    {name : '3 Idiots', desc: 'This is 3 idiots movie', rating: 5,
    link: 'https://www.filmibeat.com/img/2017/01/3idiotsposter-17-1484649482.jpg' },
    {name : 'Ghatak', desc: 'This is Ghatak movie', rating: 4,
  link: 'https://images.firstpost.com/wp-content/uploads/2016/02/Ghatak.jpg' },
    {name : 'Sultan', desc: 'This is Sultan idiots movie', rating: 3,
  link: 'https://i.ytimg.com/vi/RnCpVUjJgeI/maxresdefault.jpg'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
