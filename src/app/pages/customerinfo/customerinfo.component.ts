import { Component, OnInit,Input } from '@angular/core';
import {LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import {ActivatedRoute, Router} from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {WorkorderService} from "../../service/workorder.service";
@Component({
  selector: 'app-customerinfo',
  templateUrl: './customerinfo.component.html',
  styleUrls: ['./customerinfo.component.scss'],
})
export class CustomerinfoComponent  implements OnInit {
  @Input() eventId: number | any;
  @Input() orderId: number | any;
  @Input() customerId: number | any;
  public isdisabled:boolean=true;
  public pageTitle: any;

  public firstName: any;
  public middleName: any;
  public lastName: any;
  public businessName: any;
  public mobile: any;
  public phone: any;
  public fax: any;
  public firstNameEx:any;
  public middleNameEx:any;
  public lastNameEx:any;
  public businessNameEx:any;
  public extraPhone:any;
  public extraMobile:any;
  public extraFax:any;

  public workorders_options_one: any;
  public workorders_customers_full_name: any;
  public workorders_customers_businessName: any;
  public workorders_customers_extraPhone: any;
  public workorders_customers_extraFax: any;
  public workorders_call_msg: any;
  public returnAccountNotesData: any;
  public operationAccountNotesResult: any;
  public returnAccountNotesArray:any=[];
  public returnArrayAccountNotesFromServer: any;
  public accountNotes: any;
  public extra: any;
  public workorders_customers_Mobile: any;
  public private_note: any;
  //check login
  public fullName:any;
  public userId:any;
  public username:any;
  public password:any;
  //add for all pages
  public menuDirection: any;
  public menuDirectionTow: any;
  public checkLanguage: any=0;
  public language: any;
  public showMenueValue: any=2;
  public showNotificationIcon: any=1;
  constructor(private workorderService : WorkorderService,private activaterouter : ActivatedRoute,private callNumber: CallNumber,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');//edit in heare
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss({})
    });
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('workorders_options_one').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('workorders_customers_full_name').subscribe((res: string) => {
      this.workorders_customers_full_name = res;
    });
    this.translate.get('workorders_customers_businessName').subscribe((res: string) => {
      this.workorders_customers_businessName = res;
    });
    this.translate.get('workorders_customers_extraPhone').subscribe((res: string) => {
      this.workorders_customers_extraPhone = res;
    });
    this.translate.get('workorders_customers_extraFax').subscribe((res: string) => {
      this.workorders_customers_extraFax = res;
    });
    this.translate.get('workorders_call_msg').subscribe((res: string) => {
      this.workorders_call_msg = res;
    });
    this.translate.get('extra').subscribe((res: string) => {
      this.extra = res;
    });
    this.translate.get('workorders_customers_Mobile').subscribe((res: string) => {
      this.workorders_customers_Mobile = res;
    });
    this.translate.get('private_note').subscribe((res: string) => {
      this.private_note = res;
    });
  }
  functionCallNumber(numer:any){
    this.callNumber.callNumber(numer, true)
      .then(async res =>{
      })
      .catch(err =>{
        this.displayResult(this.workorders_call_msg);
      });
  }
  async ngOnInit() {
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.functionGetAccountNotes(this.eventId,this.orderId,this.customerId);
  }
  functionGetAccountNotes(eventId:any,orderId:any,customerId:any){
    let sendValues = {'eventId':eventId,'orderId':orderId,'customerId':customerId};
    this.workorderService.accountInfo(sendValues).then(async data=>{
      this.returnAccountNotesData = data;
      this.operationAccountNotesResult = this.returnAccountNotesData.Error.ErrorCode;
      if(this.operationAccountNotesResult==1) {
        this.accountNotes = this.returnAccountNotesData.Data.note;
        this.firstName = this.returnAccountNotesData.Data.firstName;
        this.middleName = this.returnAccountNotesData.Data.middleName;
        this.lastName = this.returnAccountNotesData.Data.lastName;
        this.businessName = this.returnAccountNotesData.Data.businessName;
        this.mobile = this.returnAccountNotesData.Data.mobile;
        this.phone = this.returnAccountNotesData.Data.phone;
        this.fax = this.returnAccountNotesData.Data.fax;
        this.firstNameEx = this.returnAccountNotesData.Data.exFirstName;
        this.middleNameEx = this.returnAccountNotesData.Data.exMiddleName;
        this.lastNameEx = this.returnAccountNotesData.Data.exLastName;
        this.businessNameEx = this.returnAccountNotesData.Data.exBusinessName;
        this.extraMobile = this.returnAccountNotesData.Data.extraMobile;
        this.extraPhone = this.returnAccountNotesData.Data.extraPhone;
        this.extraFax = this.returnAccountNotesData.Data.extraFax;
      }
    }).catch(error=>{
      this.functionGetAccountNotes(eventId,orderId,customerId)
    });
  }
  async checkLoginUser(){
    this.username = await this.storage.get('username');
    this.fullName = await this.storage.get('full_name');
    this.userId = await this.storage.get('userId');
    this.password = await this.storage.get('password');
    if(this.userId == null || this.fullName == null || this.password == null || this.username == null){
      this.storage.remove('userId');
      this.storage.remove('company_id');
      this.storage.remove('branch_id');
      this.storage.remove('role_id');
      this.storage.remove('username');
      this.storage.remove('password');
      this.storage.remove('full_name');
      this.storage.remove('mobile');
      this.storage.remove('login_days');
      this.storage.remove('login_start_time');
      this.storage.remove('login_end_time');
      this.storage.remove('mobile_user_udid');
      this.storage.remove('team_id');
      this.storage.remove('team_name');
      this.storage.remove('team_target_pests_cat_id');
      this.storage.remove('team_target_pests_name');
      this.navCtrl.navigateRoot('login');
    }
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0] == "ar" || Val[0] == "en" || Val[0] == "ur")
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0] == "ar" || Val[0] == "en" || Val[0] == "ur")
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  async functionOpenMenue(){
    if(this.showMenueValue == 1){
      this.menu.enable(true,"first");
      this.menu.open("first");
    }else{
      this.menu.enable(true,"last");
      this.menu.open("last");
    }
  }
  async displayResult(message:any){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  functionClosePage(){
    this.modalController.dismiss({
      "key":1
    })
  }
}
