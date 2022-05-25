import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Role } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

type BannerColors = {
  colorOne: string;
  colorTwo: string;
  colorThree: string;
};

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
})
export class ProfileSummaryComponent implements OnInit {
  form: FormGroup;

  // validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
  // validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];
  
  // userFullImagePath: string;
  // private userImagePathSubscription: Subscription;

  fullName$ = new BehaviorSubject<string>(null);
  fullName = '';


  bannerColors: BannerColors = {
    colorOne: '#a0b4b7',
    colorTwo: '#dbe7e9',
    colorThree: '#bfd3d6',
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null),
    });
    
    this.authService.userRole.pipe(take(1)).subscribe((role: Role) => {
      this.bannerColors = this.getBannerColors(role);
    });

    this.authService.userFullName
      .pipe(take(1))
      .subscribe((fullName: string) => {
        this.fullName = fullName;
        this.fullName$.next(fullName);
      });

    // this.userImagePathSubscription =
    //   this.authService.userFullImagePath.subscribe((fullImagePath: string) => {
    //     this.userFullImagePath = fullImagePath;
    //   });
  }

  private getBannerColors(role: Role): BannerColors {
    switch (role) {
      case 'admin':
        return {
          colorOne: '#510364',
          colorTwo: '#7e2372',
          colorThree: '#bb7cbd',
        };

      case 'headmaster':
        return {
          colorOne: '#bc8f8f',
          colorTwo: '#c09999',
          colorThree: '#fafad2',
        };
      default:
        return this.bannerColors;
    }
  }

  // onFileSelect(event: Event): void {
  //   const file: File = (event.target as HTMLInputElement).files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   from(file.arrayBuffer())
  //     .pipe(
  //       switchMap((buffer: Buffer) => {
  //         return from(fromBuffer(buffer)).pipe(
  //           switchMap((fileTypeResult: FileTypeResult) => {
  //             if (!fileTypeResult) {
  //               // TODO: error handling
  //               console.log({ error: 'file format not supported!' });
  //               return of();
  //             }
  //             const { ext, mime } = fileTypeResult;
  //             const isFileTypeLegit = this.validFileExtensions.includes(
  //               ext as any
  //             );
  //             const isMimeTypeLegit = this.validMimeTypes.includes(mime as any);
  //             const isFileLegit = isFileTypeLegit && isMimeTypeLegit;
  //             if (!isFileLegit) {
  //               // TODO: error handling
  //               console.log({
  //                 error: 'file format does not match file extension!',
  //               });
  //               return of();
  //             }
  //             return this.authService.uploadUserImage(formData);
  //           })
  //         );
  //       })
  //     )
  //     .subscribe();

  //   this.form.reset();
  // }

  // ngOnDestroy() {
  //   this.userImagePathSubscription.unsubscribe();
  // }
}
