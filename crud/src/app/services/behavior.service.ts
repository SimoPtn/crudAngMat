import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor(private http : HttpClient) { }

  postBehavior(data: any) {
    return this.http.post<any>("http://localhost:3000/behaviorList/", data);
  }
  getBehavior() {
    return this.http.get<any>("http://localhost:3000/behaviorList/");
  }
  putBehavior(data:any, id : number) {
    return this.http.put<any>("http://localhost:3000/behaviorList/"+id , data);
  }
  deleteBehavior(id: number) {
    return this.http.delete<any>("http://localhost:3000/behaviorList/"+id);
  }
}
