import { Component, OnInit, VERSION } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { switchMap, tap, first } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private numberSubject: ReplaySubject<number> = new ReplaySubject<number>(1);

  private number$ = this.numberSubject.asObservable();

  public constructor(private appService: AppService) {}

  public ngOnInit(): void {
    this.appService
      .fetchData()
      .pipe(
        tap({
          complete: () => {
            console.log('normal fetch completed');
          }
        })
      )
      .subscribe();

    this.number$
      .pipe(
        switchMap(() => this.appService.fetchData()),
        tap({
          complete: () => {
            console.log('switchMap fetch completed');
          }
        })
      )
      .subscribe();
  }

  public generateNewNumber(): void {
    this.numberSubject.next(Math.floor(Math.random() * 10) + 1);
  }
}
