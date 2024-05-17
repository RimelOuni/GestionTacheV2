import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm='';
  userId: any = localStorage.getItem('userId');

  constructor(activatedRoute:ActivatedRoute,private router:Router,private authService: AuthService) { 

    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']){ this.searchTerm = params['searchTerm'];}
    });
  }

  ngOnInit(): void {
  }
  search(term:string):void{
    if(term && this.userId)
    this.router.navigateByUrl(`/search/${this.userId}/${term}`);
  }
}
