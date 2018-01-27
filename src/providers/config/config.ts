import { Injectable } from '@angular/core';
import { useAnimation } from '@angular/core/src/animation/dsl';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let configKeyName = 'config';

@Injectable()
export class ConfigProvider {
  
  private config = {
    showSlide: true,
    name: "",
    username: ""
  };

  constructor(){}

  getConfigData():any {
    return localStorage.getItem(configKeyName);
  }

  setConfigData(showSlide?: boolean, name?: string, username?:string) {
    let config = {
      showSlide: true,
      name: "",
      username: ""
    };

    if (showSlide) {
      config.showSlide = showSlide;
    }

    if (name) {
      config.name = name;
    }

    if (username) {
      config.username = username;
    }

    localStorage.setItem(configKeyName, JSON.stringify(config));
  }
}
