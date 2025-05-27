import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '@post/interfaces/post.interface';

@Component({
  selector: 'post-table',
  imports: [RouterLink],
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.css'
})
export class PostTableComponent {

  posts = input.required<Post[]>();
  deleted = output<string>();
  offset = input.required<number>();

  emitDeleted(id: string) {
    this.deleted.emit(id);
  }

}
