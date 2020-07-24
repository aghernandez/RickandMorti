import { Component, OnInit } from '@angular/core';
import { CharacterService } from '@app/shared/services/character.service';
import { take, filter } from "rxjs/operators";
import { Character } from '@app/shared/interfaces/character.interface';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';

type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  info: RequestInfo = {
    next: null,
  };

  private pageNum=1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeright = 500;

  constructor(private characterSvc: CharacterService, private route: ActivatedRoute, private router: Router) {
    this.getCharactersByQuery();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  private onUrlChanged():void {
    this.router.events.pipe(
      filter((events) => event instanceof NavigationEnd)).subscribe(() => {
        this.characters=[];
        this.pageNum=1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void{
    this.route.queryParams.pipe(
      take(1)).subscribe((params:ParamMap) => {
        console.log('Params->', params );
        this.query = params['q'];
        this.getDataFromService();
      })
  }

  private getDataFromService ():void{
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(
      take(1)
    ).subscribe((res:any) =>{
      if(res?. results?. length) {
        const {info, results } = res;
        this.characters = [... this.characters, ...results];
        this.info = info;
      } else {
        this.characters = [];
      }
    })
  }
}
