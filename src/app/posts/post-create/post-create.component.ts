import { Component, ɵConsole, EventEmitter,Output } from '@angular/core';

import { Post } from '../../posts/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['post-create.component.css']
})


export class PostCreateComponent {
enteredContent= '';
enteredTitle="";
// @Output() postCreated= new EventEmitter<Post>();


  ///newPost= "heyyyy"////sets default value for on screen element
constructor(public postService: PostService){


}
  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }
    ///  postInput: H TMLTextAreaElement = parameter tell angular to use selected id (postInput)
                                           /// as value of text to be manipulated in one way binding
    // console.dir(postInput);
    // this.newPost = postInput.value;////sets deafualt post into the typed post  in one way binding
    ///this.newPost = this.enteredValue

    // const post: Post = {
    //   title:form.value.title,
    //   content:form.value.content
    // }
    // this.postCreated.emit(post)
    this.postService.AddPost(form.value.title, form.value.content);
form.resetForm()
  }

}
