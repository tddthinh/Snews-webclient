import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  private isPageLoading: boolean = false;
  constructor() { }
  isLoading(){
    return this.isPageLoading;
  }
  setLoading(i:boolean){
    this.isPageLoading = i;
  }
}
