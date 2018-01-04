import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 11, name: 'Mr. Nicea'},
      {id: 12, name: 'Narcoa'},
      {id: 13, name: 'Bombastoa'},
      {id: 14, name: 'Celeritasa'},
      {id: 15, name: 'Magnetaa'},
      {id: 16, name: 'RubberMana'},
      {id: 17, name: 'Dynamaa'},
      {id: 18, name: 'Dr IQa'},
      {id: 19, name: 'Magmaa'},
      {id: 20, name: 'Tornadoa'}
    ];
    return {heroes};
  }
}
