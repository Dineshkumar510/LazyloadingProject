import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DataManageServiceService} from './dataManageService.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('scrollTrigger') scrollTrigger!: ElementRef;

  results: any[] = [];
  page = 5;
  assignedValue:any;
  contentValue:any;
  loading: boolean = false;

  ngOnInit(): void {
    //this.fetchApi();
    this.loadMoreResults();
  }

  constructor(private http: HttpClient, private DataManageServiceService : DataManageServiceService) {

  }

  loadMoreResults() {
    this.loading = true;
    this.DataManageServiceService.getMoreResults(this.page).subscribe(
      (data: any) => {
      this.results = this.results.concat(data);
      this.page++;
      this.assignedValue = data;
      console.log(this.assignedValue)
    });
    this.loading = true;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // setTimeout(()=> {
    //   if (this.bottomReached()) {
    //     this.loadMoreResults();
    //   }
    // }, 2000)

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1
    ) {
      this.loadMoreResults();
    }

    // setTimeout(()=> {
    //   const triggerBottom = this.scrollTrigger.nativeElement.getBoundingClientRect().bottom;
    //   if (triggerBottom <= window.innerHeight) {
    //     this.loadMoreResults();
    //   }
    // }, 2000)

  }


  private bottomReached(): boolean {
    const scrollPosition = window.pageYOffset;
    const windowSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    return scrollPosition > bodyHeight - windowSize - 100;
  }

  // fetchApi() {
  //   this.http.get('https://randomuser.me/api/?page=3&results=100').subscribe(
  //     data => {
  //       this.assignedValue = data;
  //       console.log(this.assignedValue);
  //     }
  //   )
  // }

}
