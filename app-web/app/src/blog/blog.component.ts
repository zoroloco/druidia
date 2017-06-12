//Component for a blog.
import { Component,
         OnInit,
         OnDestroy }   from '@angular/core';
import { BlogService } from './blog.service';
import { Blog }        from './blog';
import { Logger }      from '../services/logger.service';
import * as _          from 'underscore';

declare var $ :any;

@Component({
    selector: 'Blog',
    styleUrls: ['resources/global.css'],
    templateUrl: 'html/blog.template.html'
  })
  export class BlogComponent implements OnInit{
    blogs: Array<Blog> = [];
    newBlog: Blog;
    editorContent: string;

    //froala editor options.
    options: Object = {
      placeholderText: 'Enter Text',
      charCounterCount: true,
      spellcheck: true,
      emoticonsStep: 10,
      toolbarButtons: ['bold','italic','underline','fontFamily','fontSize','colors','emoticons','undo','redo','submitBlog'],
      toolbarButtonsXS: ['bold','italic','underline','fontFamily','fontSize','colors','emoticons','undo','redo','submitBlog'],
      toolbarButtonsSM: ['bold','italic','underline','fontFamily','fontSize','colors','emoticons','undo','redo','submitBlog'],
      toolbarButtonsMD: ['bold','italic','underline','fontFamily','fontSize','colors','emoticons','undo','redo','submitBlog']
    };

    constructor(private log: Logger,private blogService: BlogService){
      this.log.info("Instantiating blog component.");
    }

    ngOnInit(){
      this.log.info("Initializing blog component.");
      this.newBlog = new Blog();
      //define our post blog custom button to froala editor toolbar.
      $.FroalaEditor.DefineIconTemplate('submit_icon', '<i class="zmdi zmdi-upload"></i>');
      $.FroalaEditor.DefineIcon('submitIcon',{NAME: 'submit', template: 'submit_icon'});
      $.FroalaEditor.RegisterCommand('submitBlog',{
        title: 'Submit',
        focus: false,
        undo: false,
        icon: 'submitIcon',
        refreshAfterCallback: true,

        callback: () => {
          this.saveBlog();
        }
      });

      this.blogService.fetchBlogs().subscribe(
        fetchedBlogs => {
          this.log.info("Fetched blogs:"+JSON.stringify(fetchedBlogs));
          this.blogs = fetchedBlogs;
          this.blogs = this.blogs.reverse();
        },
        error => this.log.error(error)
      );
    }

    public deleteBlog(deleteBlog: Blog){
      this.log.info("User wants to delete blog:"+deleteBlog._id);

      this.blogService.deleteBlog(deleteBlog).subscribe(
        ()=> {
          this.log.info("Blog deleted successfully.");
          //update the model.
          //find the one you were deleting in array.
          let i: any;
          for(i in this.blogs){
            this.log.info("traversing blogs:"+this.blogs[i]);
            if(_.isEqual(this.blogs[i]._id,deleteBlog._id)){
              this.log.info("Found blog model entry at index:"+i);
              this.blogs.splice(i,1);
            }
          }
        },
        error => this.log.error(error)
      );
    }

    private saveBlog(){
      this.log.info("User submitted new blog entry:"+this.newBlog.text);

      if(_.isEmpty(this.newBlog.heading)){
        this.newBlog.heading = "Untitled";
      }

      //subscribing to save Blog observable
      this.blogService.saveBlog(this.newBlog).subscribe(
        savedBlogEntry => {
          this.log.info("Save of blog entry returned:"+JSON.stringify(savedBlogEntry));
          //this.blogs.push(savedBlogEntry);
          this.blogs.splice(0,0,savedBlogEntry);//at 0 element, insert new blog to top of array.
          this.newBlog = new Blog();//reset.
        },
        error => this.log.error(error)
      );
    }

    ngOnDestroy(){
      this.log.info("Destroying blog component.");
    }
  }
