import {Post} from './post.model'
import {Subject} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
// @Injectable({ providedIn: 'root' })
// export class PostService {
//   private posts: Post[] = [];
//   private postUpdated = new Subject<Post[]>();

//   constructor(private http: HttpClient) {}

//   getPost() {
//     this.http
//       .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')

//       .pipe(
//         map((postData) => {
//           return postData.posts.map((post) => {
//             return {
//               title: post.title,
//               content: post.content,
//               id: post._id,
//             };
//           });
//         })
//       )
//       .subscribe((transformedPosts) => {
//         this.posts = transformedPosts;
//         this.postUpdated.next([...this.posts]);
//       });
//     //  return [...this.posts];
//   }

//   getPostUpdateListener() {
//     return this.postUpdated.asObservable();
//   }

//   deletePost(postId: string) {
//     this.http
//       .delete('http://localhost:3000/api/posts/' + postId)
//       .subscribe(() => {
//         const updatedPosts = this.posts.filter((post) => post.id !== postId);
//         this.posts = updatedPosts;
//         this.postUpdated.next([...this.posts]);
//       });
//   }
//   AddPost(title: string, content: string) {
//     const post: Post = { id: null, title: title, content: content };
//     this.http
//       .post<{ message: string }>('http://localhost:3000/api/posts', post)
//       .subscribe((responseData) => {
//         console.log(responseData);

//         this.posts.push(post);
//         this.postUpdated.next([...this.posts]);
//       });
//   }
// }

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  AddPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/'])
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

