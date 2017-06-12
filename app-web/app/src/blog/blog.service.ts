
import { Logger }     from '../services/logger.service';
import { Injectable } from '@angular/core';
import { AuthHttp }   from 'angular2-jwt';
import { Response }   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Blog }       from './blog';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BlogService {

  constructor(private authHttp: AuthHttp,private log: Logger) {
      this.log.info("In constructor of blog service.");
  }

  deleteBlog(deleteBlog: Blog): Observable<boolean> {
    this.log.info("Delete blog observable invoked:"+deleteBlog._id);

    return this.authHttp.post('api/deleteBlog',deleteBlog)
      .map((res:Response) => {
        if(res.status !=200)
          return false;
        return true;
      })
      .catch(error=> Observable.throw(error));
  }

  //returns observable for posting a blog entry.
  saveBlog(newBlog: Blog): Observable<any> {
    this.log.info("Save blog observable invoked:"+newBlog.text);

    let blog = {
      "text"    : newBlog.text,
      "heading" : newBlog.heading
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
