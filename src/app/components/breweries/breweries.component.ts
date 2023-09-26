import { Component, OnInit, ViewChild } from '@angular/core';
import { Brewery } from 'src/app/models/brewery';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent implements OnInit {

  breweries: Brewery[] = [];
  filteredBreweries: Brewery[] = [];
  currentPage: Brewery[] = [];
  searchText = '';
  selectedState = '';
  states: string[] = ['All States'];
  state!: string;
  page: number = 0;
  pageSize: number = 9;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService){}

  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.allBreweries();
  }

  allBreweries(){
    this.dataService.getAllBreweries().subscribe({
      next: breweries => {
        this.breweries = breweries;
        this.filteredBreweries = [...this.breweries];
        this.updateCurrentPage();
        for (let i = 0; i < this.breweries.length; i++) {
          const brewery = this.breweries[i];
          this.states.push(brewery.state);
        }
        this.states = Array.from(new Set(this.states));
      },
      error: err => console.log('Error: ', err)
    });
  }

  filterBreweries() {
    this.filteredBreweries = this.breweries.filter(brewery => brewery.name.toLowerCase().startsWith(this.searchText.toLowerCase()));
    if (this.searchText === '') {
      this.filteredBreweries = this.breweries;
    }
    this.page = 0;
    this.updateCurrentPage();
  }

  filterByState(){
    if(this.selectedState && this.selectedState !== this.states[0]){
      this.filteredBreweries = this.breweries.filter(brewery => brewery.state === this.selectedState);
    } else {
      this.filteredBreweries = this.breweries;
    }
    this.page = 0;
    this.updateCurrentPage();
  }

  updateCurrentPage() {
    const startIndex = this.page * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPage = this.filteredBreweries.slice(startIndex, endIndex);
  }

  onPageChange(event: any){
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
