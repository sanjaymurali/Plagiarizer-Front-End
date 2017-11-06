import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class UploadService {

  constructor(private $http: HttpClient) { }

  // upload(data) {
  //   return this.$http
  //     .post('http://localhost:8080/upload', data);
  // }


  upload(data) {
    const req = new HttpRequest('POST', 'http://localhost:8080/upload', data, {
      reportProgress: true,
    });

    return this.$http.request(req);
  }


}
