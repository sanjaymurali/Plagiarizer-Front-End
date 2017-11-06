import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UploadService {

  private BASE_URL = environment['BASE_URL'] || 'http://localhost:8080/';

  constructor(private $http: HttpClient) { }

  upload(data) {
    const req = new HttpRequest('POST', this.BASE_URL + 'upload', data, {
      reportProgress: true,
    });

    return this.$http.request(req);
  }


}
