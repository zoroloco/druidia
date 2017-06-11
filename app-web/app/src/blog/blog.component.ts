//Component for a blog.
import { Component,
         OnInit,
         OnDestroy }   from '@angular/core';
import { BlogService } from './blog.service';
import { Logger }      from '../services/logger.service';
import * as _          from 'underscore';

@Component({
    selector: 'Blog',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/blog.template.html'
  })
  export class BlogComponent implements OnInit{
    blogs = [''];

    constructor(private log: Logger,private blogService: BlogService){
      this.log.info("Instantiating blog component.");
    }

    onBlog(blogEntry: string,heading: string){
      this.log.info("User submitted new blog entry:"+blogEntry);

      if(_.isEmpty(heading)){
        heading = "Untitled";
      }

      //subscribing to save Blog observable
      this.blogService.saveBlog(blogEntry,heading).subscribe(
        savedBlogEntry => {
          this.log.info("Save of blog entry returned:"+JSON.stringify(savedBlogEntry));
          this.blogs.push(savedBlogEntry);
        },
        error => this.log.error(error)
      );
    }

    ngOnInit(){
      this.log.info("Initializing blog component.");

      this.blogService.fetchBlogs().subscribe(
        fetchedBlogs => {
          this.log.info("Fetched blogs:"+JSON.stringify(fetchedBlogs));
          this.blogs = fetchedBlogs;
        },
        error => this.log.error(error)
      );
    }

    ngOnDestroy(){
      this.log.info("Destroying blog component.");
    }
  }
