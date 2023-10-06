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
  page = 10;
  assignedValue:any;
  contentValue:any;
  loading: boolean = false;

  ngOnInit(): void {
    //this.fetchApi();
  }

  constructor(private http: HttpClient, private DataManageServiceService : DataManageServiceService) {
    this.loadMoreResults();
  }

  loadMoreResults() {
    this.DataManageServiceService.getMoreResults(this.page).subscribe(
      (data: any) => {
      this.results = this.results.concat(data.results);
      this.page++;
      this.assignedValue = data;
      console.log(this.assignedValue)
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // this.loading = false;
    // setTimeout(()=> {
    //   if (this.bottomReached()) {
    //     this.loadMoreResults();
    //   }
    //   this.loading = true;
    // }, 2000)
    // this.loading = false;

    setTimeout(()=> {
      const triggerBottom = this.scrollTrigger.nativeElement.getBoundingClientRect().bottom;
      if (triggerBottom <= window.innerHeight) {
        this.loadMoreResults();
      }
    }, 2000)

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
