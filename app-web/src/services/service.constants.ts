import {HttpHeaders} from '@angular/common/http';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

export const numOfRetries = 3;

const hostnameUrl = 'http://localhost:8080';
const resourcePath = '/restSecureServices';
const restUrl = hostnameUrl + resourcePath;

export const restfulUrls = {
  user_post: restUrl + '/UserService/user-post',
  user_get: restUrl + '/UserService/user-get',
  user_put: restUrl + '/UserService/user-put',
  user_delete: restUrl + '/UserService/user-delete'
};
