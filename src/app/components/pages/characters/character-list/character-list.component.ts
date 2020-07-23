import { Component, OnInit } from '@angular/core';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from "rxjs/operators";
import { Character } from '@app/shared/interfaces/character.interface';

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

  constructor(private characterSvc: CharacterService) { }

  ngOnInit(): void {
  }

  private getDataFromService ():void{
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(
      take(1)
    ).subscribe((res:any) =>{
      console.log('Response ->', res);
      const {info, results } = res;
      this.characters = [... this.characters, ...results];
      this.info = info;
    })
  }

}
