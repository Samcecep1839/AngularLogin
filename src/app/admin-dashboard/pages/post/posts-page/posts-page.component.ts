import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostService } from '@post/services/post.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PostTableComponent } from "@post/components/post-table/post-table.component";
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts-page',
  imports: [PaginationComponent, PostTableComponent, RouterLink],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent {

  postService = inject(PostService);
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

  deletedPost(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletedPost(id).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your user has been deleted.',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        });
      }
    });
  }


}
