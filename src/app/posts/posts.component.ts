import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { faTrash,faPencil,faAdd,faA } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  deleteIcon = faTrash;
  editIcon = faPencil;
  addIcon = faAdd;
  icon = faA;
  postsArray:any[] = [];

  postID = "";

  postTitle: string = "";
  postBody: string = "";

  constructor(private http: HttpClient){
    this.getAllPosts();
  }
  getAllPosts() {
    this.http.get("http://localhost:5000/api/posts")
    .subscribe((resultData: any)=>{
      console.log(resultData);
      this.postsArray = resultData;
    })
  }

  createPost(){
    let bodyData = {
      "title": this.postTitle,
      "body": this.postBody
    };
    this.http.post("http://localhost:5000/api/posts",bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      this.postTitle = '';
      this.postBody = '';
      this.getAllPosts();
      alert("created");
    });
  };




  updatePost(data: any) {
    this.postTitle = data.title;
    this.postBody = data.body;
    this.postID = data._id;

  }

  updatePostDetails(){
    let bodyData = {
      "title": this.postTitle,
      "body": this.postBody
    };
    this.http.patch(`http://localhost:5000/api/posts/${this.postID}`,bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      this.postTitle = '';
      this.postBody = '';
      alert("updated");
      this.getAllPosts();
    });
  }

  deletePost(data: any) {
    this.http.delete(`http://localhost:5000/api/posts/${data._id}`)
    .subscribe((resultData: any)=>{
      console.log(resultData);
      this.getAllPosts();

    })
  }

// common method
  save() {
    if(this.postID ==='') {
      this.createPost();
    }
    else {
      this.updatePostDetails();
    }
  }
}




