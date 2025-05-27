import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostService } from '@post/services/post.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PostImagePipe } from "../../../../admin-dashboard/pages/post/pipes/post-image.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-page',
  imports: [PostImagePipe, RouterLink],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent {

  postService = inject(PostService)
  paginationService = inject(PaginationService);
  limit = signal(5);

  setLimit = (limit: string) => {
    this.limit.set(Number(limit));
  };

  PostResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage(),
      limit: this.limit(),
    }),
    loader: ({ request }) => {
      return this.postService.getPosts({
        limit: request.limit,
        page: request.page,
      });
    },
  });

}
