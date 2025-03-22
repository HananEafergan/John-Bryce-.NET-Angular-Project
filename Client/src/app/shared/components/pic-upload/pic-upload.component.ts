import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pic-upload',
  standalone: false,
  templateUrl: './pic-upload.component.html',
  styleUrl: './pic-upload.component.scss'
})
export class PicUploadComponent {
  @Input() label: string = '';
  @Output() stringOuput: EventEmitter<string> = new EventEmitter<string>();

  async handleFile(files: FileList): Promise<void> {
    const fileUploaded = files.item(0);
    console.log(fileUploaded);
    let fileBase64Str: any;
    if (fileUploaded) {
      fileBase64Str = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(fileUploaded);
      });
      this.stringOuput.emit(fileBase64Str);
    }
  }
}
