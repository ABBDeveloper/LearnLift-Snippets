import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  async upload(imageBlob: Blob, folderName: string): Promise<string> {
   // Privater Code
  }

  async deleteImage(filePath: string): Promise<void> {
    const fileRef = this.storage.ref(filePath);
    await firstValueFrom(fileRef.delete());
  }
}

