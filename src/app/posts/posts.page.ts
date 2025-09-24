import { Router } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { Component, OnInit } from "@angular/core";
import { PostService } from "../services/post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.page.html",
  styleUrls: ["./posts.page.scss"],
})
export class PostsPage implements OnInit {
  posts: any[] = [];
  newPost: string = "";

  constructor(
    private postService: PostService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts; // ← é aqui que você popula
    });
  }

  createPost(description: string, picture: string = "") {
    this.postService.createPost(description, picture).subscribe((newPost) => {
      // garante que this.posts já existe antes de unshift
      if (!this.posts) this.posts = [];
      this.posts.unshift(newPost); // ← aqui pode estar dando erro se this.posts for null
    });
  }

  logout() {
    this.api.post("usuario/logout", {}).subscribe({
      next: () => this.router.navigate(["/login"]),
      error: () => this.router.navigate(["/login"]),
    });
  }
}
