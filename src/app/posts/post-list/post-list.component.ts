import { Component, ɵConsole, Input, OnInit, OnDestroy } from '@angular/core';


import {Subscription} from 'rxjs'
import { Post } from '../../posts/post.model';
import { PostService } from '../posts.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: "1", content: "this is the first post"},
  //    {title: "2", content: "this is the second post"},
  //     {title: "3", content: "this is the third post"}
  // ]
  @Input() posts: Post[] = [];
  private postsSub: Subscription;
  ngOnInit() {



    this.postsService.getPost();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {

        
        this.posts = posts;
      });
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  constructor(public postsService: PostService) {}
}
