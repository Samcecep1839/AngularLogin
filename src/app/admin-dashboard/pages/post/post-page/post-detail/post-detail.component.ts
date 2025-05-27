import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PostImagePipe } from '../../pipes/post-image.pipe';
import { Post } from '@post/interfaces/post.interface';
import { Router } from '@angular/router';
import { PostService } from '@post/services/post.service';
import { UserService } from '@users/services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'post-detail',
  imports: [ReactiveFormsModule,PostImagePipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {

   post = input.required<Post>();
  router = inject(Router);
  fb = inject(FormBuilder);
  previewIMG = false;
  previewURl: string | null = null;
  imageFile: File | null = null;

  postService = inject(PostService);
  userService = inject(UserService);

  postForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    author_id: ['', [Validators.required]],
    image: [''],
  });

  
  ngOnInit() {
    this.postForm.patchValue({
      title: this.post().title,
      content: this.post().content,
      author_id: this.post()?.author_id ?? this.post().Author.id ??  0,
      image: this.post().image,
    });
    
  }

userResource = rxResource({
  request: () => ({ limit: 50 }),
  loader: ({ request }) => {
    return this.userService.getUsers({ limit: request.limit });
  },
});
  
  onSubmit() {
    const isValid = this.postForm.valid;
    this.postForm.markAllAsTouched();


    if (!isValid) return;

    const formValue = this.postForm.value;

   if (this.post().id === 'new') {
    this.postService.created(formValue).subscribe((resp) => {
        if (this.imageFile) {
            this.postService.uploadImage(
                resp.data.id,
                this.imageFile
            ).subscribe(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User created',
                    showConfirmButton: false,
                    timer: 1500,
                });
                this.router.navigate(['/dashboard/posts', resp.data.id]);
            });
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User created',
            showConfirmButton: false,
            timer: 1500,
        });
        this.router.navigate(['/dashboard/posts', resp.data.id]);
    });
    } else {
      this.postService.updated(this.post().id, formValue).subscribe((resp) => {

        if (this.imageFile) {
          this.postService.uploadImage(
            this.post().id,
            this.imageFile
          ).subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'post  Updated',
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'post Updated',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  }


  onFilesChange(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file && file.length > 0) {
      this.previewIMG = true;
      this.previewURl = URL.createObjectURL(file[0]);
      this.imageFile = file[0];
    }
  }


}
