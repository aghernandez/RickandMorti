import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterListComponent } from '@characters/character-list/character-list.component';

const myComponents = [CharacterDetailsComponent, CharacterListComponent];

@NgModule({
  declarations: [
    ...myComponents
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...myComponents
  ],
})
export class CharactersModule { }
