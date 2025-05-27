import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";

const baseUrl = environment.apiURL;

@Pipe({
    name: 'postImage',
})
export class PostImagePipe implements PipeTransform {

    transform(value: string): string {
        if (value === 'new') {
            return `./assets/post/post-image.jpg`;
        }
        return `${baseUrl}/posts/image/${value}`;
    }
}