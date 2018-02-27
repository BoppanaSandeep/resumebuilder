import { Injectable } from '@angular/core';

@Injectable()
export class UserVariables{
    public reg_id=0;
    public rb_id;
    public name = '';
    public profile_pic = '';
    public email;
    public phonenumber;
    public joined_on;
    public logged_in;
}