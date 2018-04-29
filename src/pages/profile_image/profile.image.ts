import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Urls } from '../shared/urls';

declare var cordova: any;

@Component({
    selector: 'profile-image',
    templateUrl: 'profile.image.html'
})
export class ProfileImage {
    lastImage: string = null;
    loading: Loading;
    public url = new Urls();
    rb_id = '';
    res;

    constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public storage: Storage, public viewCtrl: ViewController) {

        this.storage.get('rb_id').then((val) => {
            var p = val == null ? 0 : val;
            if (p != 0) {
                this.rb_id = p;
            }
        }).catch(function (err) {
            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
        });

    }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }

    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 5000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        this.storage.get('reg_id').then((val) => {
            if (val != null) {
                // Destination URL
                var url = this.url.profile_image_upload;
                // File for Upload
                var targetPath = this.pathForImage(this.lastImage);

                // File name only
                var filename = this.lastImage;

                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    params: { 'fileName': filename, reg_id: val, rb_id: this.rb_id }
                };

                const fileTransfer: TransferObject = this.transfer.create();

                this.loading = this.loadingCtrl.create({
                    content: 'Uploading...',
                });
                this.loading.present();
                // Use the FileTransfer to upload the image
                fileTransfer.upload(targetPath, url, options).then(data => {
                    this.loading.dismissAll()
                    //this.r = data.response; for testing
                    this.res = JSON.parse(data.response);
                    if (this.res.status == 200) {
                        this.presentToast(this.res.message);
                        this.navCtrl.pop();
                    } else {
                        this.presentToast(this.res.message);
                    }
                }, err => {
                    this.loading.dismissAll()
                    this.presentToast('Error while uploading file.');
                });
            } else {
                this.presentToast('Error while uploading file.');
            }
        }).catch(function (err) {
            this.toast.showToast('Something went Wrong, try again later!!!', 3000, 'bottom');
        });
    }
}