import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { PostsPage } from "./posts.page";

describe("PostsPage", () => {
  let component: PostsPage;
  let fixture: ComponentFixture<PostsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
