
import { Logger }     from '../services/logger.service';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt';
import { Response }   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BlogService {

  constructor(private authHttp: AuthHttp,private log: Logger) {
      this.log.info("In constructor of blog service.");
  }

  //returns observable for posting a blog entry.
  saveBlog(blogEntry: string,heading: string): Observable<any> {
    this.log.info("Save blog observable invoked:"+blogEntry);

    let blog = {
      "text"    : blogEntry,
      "heading" : heading
    };

    return this.authHttp.post(`api/postBlog`,blog)
      .map((res:Response) => res.json());
  }

  fetchBlogs(): Observable<any> {
    this.log.info("Fetch blog observable invoked.");

    return this.authHttp.get('api/fetchBlogs')
      .map((res:Response) => res.json());
  }

}
