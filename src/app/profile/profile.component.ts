import { Component, OnInit } from "@angular/core";
import { ApiService } from 'src/app/sared/api.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: any;
  posts: any[] = [];
  newPost: string = "";

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProfile();
    this.loadPosts();
  }

  loadProfile() {
    this.api.post("usuario/perfil", {}).subscribe((res: any) => {
      this.user = res;
    });
  }

  loadPosts() {
    this.api.get("post/all").subscribe((res: any) => {
      this.posts = res;
    });
  }

  createPost() {
    if (this.newPost.trim() !== "") {
      this.api.post("post/create", { content: this.newPost }).subscribe(() => {
        this.newPost = "";
        this.loadPosts(); // recarrega com a nova postagem
      });
    }
  }
}
