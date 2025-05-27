import { DatePipe } from '@angular/common';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PostImagePipe } from '@dashboard/pages/post/pipes/post-image.pipe';
import { PostService } from '@post/services/post.service';
import { UserImagePipe } from '@users/pipes/user-image.pipe';

@Component({
  selector: 'app-post-page',
  imports: [PostImagePipe,DatePipe,RouterLink,UserImagePipe],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent {

  id = input.required<string>();
  postService = inject(PostService);

  postId = linkedSignal(this.id);

  postResource = rxResource({
    request: () => ({ id: this.postId() }),
    loader: ({ request }) => {
      return this.postService.getPost(request.id);
    },
  });


}
