import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-subject-and-observable';

  first_subscriber_observable?: number;
  second_subscriber_observable?: number
  thrid_subscriber_observable?: number;

  first_subscriber_subject?: number;
  second_subscriber_subject?: number;
  third_subscriber_subject?: number;

  first_subscriber_behaviorSubject?: number;
  second_subscriber_behaviorSubject?: number;

  first_subscriber_asyncSubject?: number;
  second_subscriber_asyncSubject?: number;

  first_subscriber_replaySubject: any[] = [];
  second_subscriber_replaySubject: any[] = [];

  ngOnInit() {

    //------------------Observables are unicast-----------------
    //observable
    let observable = new Observable<number>(ele =>
      ele.next(Math.random()))

    //first subscriber
    observable.subscribe(result => {
      this.first_subscriber_observable = result;
      console.log(result)
    })

    //second subscriber
    observable.subscribe(result => {
      this.second_subscriber_observable = result;
      console.log(result)
    })

    //third subscriber
    observable.subscribe(result => {
      this.thrid_subscriber_observable = result;
      console.log(result)
    })
    //--------------------------------------------------------

    //------------------Subjects are multicast-----------------
    //subject
    let subject = new Subject<number>()

    //first subscriber
    subject.subscribe(result => {
      this.first_subscriber_subject = result;
      console.log(result)
    })

    //second subscriber
    subject.subscribe(result => {
      this.second_subscriber_subject = result;
      console.log(result)
    })

    //third subscriber
    subject.subscribe(result => {
      this.third_subscriber_subject = result;
      console.log(result)
    })

    subject.next(Math.random())
    //--------------------------------------------------------

    //----------Behavior Subject has default or last emitted value---------------
    var behaviorSubject = new BehaviorSubject<number>(123)

    behaviorSubject.subscribe(ele => {
      this.first_subscriber_behaviorSubject = ele
      console.log(`first subscriber ${ele}`)
    })

    behaviorSubject.next(456)

    behaviorSubject.subscribe(ele => {
      this.second_subscriber_behaviorSubject = ele
      console.log(`second subscriber ${ele}`)
    })

    //--------------------------------------------------------------------------

    //---------------Replay subject buffers old values not default one-----------

    const replaySuject = new ReplaySubject(2) //If we we want to show only last 2 buffered value otherwise it will show all

    replaySuject.next(111)
    replaySuject.next(222)
    replaySuject.next(333)

    replaySuject.subscribe(e => {
      console.log(`First Subscriber ${e}`)
      this.first_subscriber_replaySubject.push(e);
    })

    //new values show to existing subsriber
    replaySuject.next(444)

    replaySuject.subscribe(e => {
      console.log(`Second Subscriber ${e}`)
      this.second_subscriber_replaySubject.push(e);
    })

    replaySuject.next(555)
    //--------------------------------------------------------------------------

    //---------------Async subject sends the latest value to subscribers when it's completed-----------
    const asyncSubject = new AsyncSubject<number>();

    asyncSubject.subscribe(e => 
      {
        console.log(`First Subscriber: ${e}`)
        this.first_subscriber_asyncSubject=e;
    });

    asyncSubject.next(111);
    asyncSubject.next(222);
    asyncSubject.next(333);
    asyncSubject.next(444);

    asyncSubject.subscribe(e => {
      console.log(`Second Subscriber: ${e}`)
      this.second_subscriber_asyncSubject=e;
    });

    asyncSubject.next(555);
    asyncSubject.complete();

    //--------------------------------------------------------------------------

  }

}
