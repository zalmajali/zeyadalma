import { Component, OnInit } from '@angular/core';
import {AlertController,LoadingController, MenuController,ModalController, NavController, Platform, ToastController} from "@ionic/angular";
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import {Storage} from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import {UsersService} from "../../service/users.service";
import {WorkorderService} from "../../service/workorder.service";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import {CustomerinfoComponent} from "../customerinfo/customerinfo.component";
import {InstructionsComponent} from "../instructions/instructions.component";
import {FollowupComponent} from "../followup/followup.component";
import {LocationinformationComponent} from "../locationinformation/locationinformation.component";
import {NotifiComponent} from "../notifi/notifi.component";
import { Device } from '@awesome-cordova-plugins/device/ngx';
import {CompletetasksComponent} from "../completetasks/completetasks.component";
import {WorkorderstatusComponent} from "../workorderstatus/workorderstatus.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public pageTitle: any;
  public isdisabled:boolean=true;
  public workorders_options_one: any;
  public workorders_options_tow: any;
  public workorders_options_three: any;
  public workorders_options_fore: any;
  public workorders_options_five: any;
  public workorders_options_six: any;
  public workorders_options_seven: any;
  public workorders_options_nine: any;
  public workorders_call_msg: any;
  public workorders_loc_msg_one: any;
  public workorders_loc_msg_tow: any;
  public workorders_filter: any;
  public teamId: any;
  public branchId: any;
  public inDayes:any = 2;
  public routId:any;
  public error_no_orders_large:any;
  public error_no_orders_small:any;
  public error_no_orders_routes:any;
  public start_route:any;
  public error_select_employee_routes:any;
  public returnWorkordersData:any;
  public returnArrayWorkordersFromServer:any;
  public returnWorkordersArray:any = [];
  public operationWorkordersResult:any;
  public returnStartWorkordersData:any;
  public operationStartWorkordersResult:any;
  public workorders:any;
  public critical:any;
  public high:any;
  public medium:any;
  public low:any;
  public today:any;
  public select:any;
  public showStartOrderLink:any=1;
  public returnWorkordersRun:any;
  public operationResultWorkordersRun:any;
  public error_start_orders:any;
  public error_start_orders_failed:any;
  public workorder_followup: any;
  public order_priority_one: any;
  public order_priority_tow: any;
  public order_date_one: any;
  public order_date_tow: any;
  public hours: any;
  public minutes: any;
  public userName: any;
  public returnInsertLogin: any;
  public workorders_options_ten: any;
  public floatD: any;
  public tasks_status_one:any;
  public tasks_status_tow:any;
  public tasks_status_three:any;
  public tasks_status_for:any;
  public tasks_status_five:any;
  public branchType: any;
  public are_you_sure: any;
  public yes:any;
  public no:any;
  //check route Log
  public returnCheckRoutsLog:any;
  public operationResultCheckRoutsLog:any;
  public employeesLogArray:any = [];
  public checkRoute:any = 3;
  public sortingData:any=1;

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
  constructor(private alertController:AlertController,private device: Device,private geolocation: Geolocation,private launchNavigator: LaunchNavigator,private workorderService: WorkorderService,private usersService: UsersService,private callNumber: CallNumber,private globalization: Globalization, private translate: TranslateService,private modalController: ModalController,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','forgotpassword');//edit in heare
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/forgotpassword");//edit in heare
    });
  }
  initialiseTranslation(){
    this.translate.get('menuDirection').subscribe((res: string) => {
      this.menuDirection = res;
    });
    this.translate.get('menuDirectionTow').subscribe((res: string) => {
      this.menuDirectionTow = res;
    });
    this.translate.get('workorders_title').subscribe((res: string) => {
      this.pageTitle = res;
    });
    this.translate.get('workorders_options_one').subscribe((res: string) => {
      this.workorders_options_one = res;
    });
    this.translate.get('workorders_options_tow').subscribe((res: string) => {
      this.workorders_options_tow = res;
    });
    this.translate.get('workorders_options_three').subscribe((res: string) => {
      this.workorders_options_three = res;
    });
    this.translate.get('workorders_options_fore').subscribe((res: string) => {
      this.workorders_options_fore = res;
    });
    this.translate.get('workorders_options_five').subscribe((res: string) => {
      this.workorders_options_five = res;
    });
    this.translate.get('workorders_options_six').subscribe((res: string) => {
      this.workorders_options_six = res;
    });
    this.translate.get('workorders_options_seven').subscribe((res: string) => {
      this.workorders_options_seven = res;
    });
    this.translate.get('workorders_options_nine').subscribe((res: string) => {
      this.workorders_options_nine = res;
    });
    this.translate.get('workorders_call_msg').subscribe((res: string) => {
      this.workorders_call_msg = res;
    });
    this.translate.get('workorders_loc_msg_one').subscribe((res: string) => {
      this.workorders_loc_msg_one = res;
    });
    this.translate.get('workorders_loc_msg_tow').subscribe((res: string) => {
      this.workorders_loc_msg_tow = res;
    });
    this.translate.get('workorders_filter').subscribe((res: string) => {
      this.workorders_filter = res;
    });
    this.translate.get('workorders_filter').subscribe((res: string) => {
      this.workorders_filter = res;
    });
    this.translate.get('error_no_orders_large').subscribe((res: string) => {
      this.error_no_orders_large = res;
    });
    this.translate.get('error_no_orders_small').subscribe((res: string) => {
      this.error_no_orders_small = res;
    });
    this.translate.get('error_no_orders_routes').subscribe((res: string) => {
      this.error_no_orders_routes = res;
    });
    this.translate.get('start_route').subscribe((res: string) => {
      this.start_route = res;
    });
    this.translate.get('error_select_employee_routes').subscribe((res: string) => {
      this.error_select_employee_routes = res;
    });
    this.translate.get('critical').subscribe((res: string) => {
      this.critical = res;
    });
    this.translate.get('high').subscribe((res: string) => {
      this.high = res;
    });
    this.translate.get('medium').subscribe((res: string) => {
      this.medium = res;
    });
    this.translate.get('low').subscribe((res: string) => {
      this.low = res;
    });
    this.translate.get('error_start_orders').subscribe((res: string) => {
      this.error_start_orders = res;
    });
    this.translate.get('error_start_orders_failed').subscribe((res: string) => {
      this.error_start_orders_failed = res;
    });
    this.translate.get('workorder_followup').subscribe((res: string) => {
      this.workorder_followup = res;
    });
    this.translate.get('order_priority_one').subscribe((res: string) => {
      this.order_priority_one = res;
    });
    this.translate.get('order_priority_tow').subscribe((res: string) => {
      this.order_priority_tow = res;
    });
    this.translate.get('order_date_one').subscribe((res: string) => {
      this.order_date_one = res;
    });
    this.translate.get('order_date_tow').subscribe((res: string) => {
      this.order_date_tow = res;
    });
    this.translate.get('select').subscribe((res: string) => {
      this.select = res;
    });
    this.translate.get('hours').subscribe((res: string) => {
      this.hours = res;
    });
    this.translate.get('minutes').subscribe((res: string) => {
      this.minutes = res;
    });
    this.translate.get('workorders_options_ten').subscribe((res: string) => {
      this.workorders_options_ten = res;
    });
    this.translate.get('floatD').subscribe((res: string) => {
      this.floatD = res;
    });
    this.translate.get('tasks_status_one').subscribe((res: string) => {
      this.tasks_status_one = res;
    });
    this.translate.get('tasks_status_tow').subscribe((res: string) => {
      this.tasks_status_tow = res;
    });
    this.translate.get('tasks_status_three').subscribe((res: string) => {
      this.tasks_status_three = res;
    });
    this.translate.get('tasks_status_for').subscribe((res: string) => {
      this.tasks_status_for = res;
    });
    this.translate.get('tasks_status_five').subscribe((res: string) => {
      this.tasks_status_five = res;
    });
    this.translate.get('are_you_sure').subscribe((res: string) => {
      this.are_you_sure = res;
    });
    this.translate.get('yes').subscribe((res: string) => {
      this.yes = res;
    });
    this.translate.get('no').subscribe((res: string) => {
      this.no = res;
    });
  }
  async ngOnInit() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    await this.getDeviceLanguage();
    await this.checkLoginUser();
    this.userId = await this.storage.get('userId');
    this.teamId = await this.storage.get('team_id');
    this.inDayes = await this.storage.get('inDayes');
    this.branchId = await this.storage.get('branch_id');
    this.branchType = await this.storage.get('branch_type');
    if(this.teamId == null || this.teamId == 0 || this.teamId == undefined || this.branchId == undefined || this.branchId == 0 || this.branchId == null)
      this.navCtrl.navigateRoot('login');
    this.functionCheckRoutsLog(this.teamId,this.branchId);
    this.checkLogin();
    await loading.present();
  }
  async checkLogin(){
    let udid = await this.device.uuid;
    this.userName = await this.storage.get('username');
    let sendValues = {'userName':this.userName,'uuid':udid};
    this.workorderService.insertLogin(sendValues).then(async data=>{
    })
    let timeCheck = setTimeout(() => {
      this.checkLogin();
    }, 2000);
    await this.storage.set('timeCheck',timeCheck);
  }
  async functionCompleteTasks(eventId:any,ordersId:any,workSiteAddressId:any,barcodeRequired:any,type:any){
    if(type == 6){
      let model = await this.modalController.create({
        component:CompletetasksComponent,
        animated:true,
        componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId,barcodeRequired:barcodeRequired},
        cssClass:"modalFilterSortCss"
      });
      model.onDidDismiss().then((data):any=>{
        this.ngOnInit();
      });
      await model.present();
    }else{
      let model = await this.modalController.create({
        component:WorkorderstatusComponent,
        animated:true,
        componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId,type:type},
        cssClass:"modalFilterSortCss"
      });
      model.onDidDismiss().then((data):any=>{
        this.ngOnInit();
      });
      await model.present();
    }
  }

  async functionCheckRoutsLog(teamId:any,branchId:any){
    let sendValues = {'teamId':this.teamId,'branchId':this.branchId};
    await this.workorderService.checkRoutsLog(sendValues).then(async data=>{
      this.returnCheckRoutsLog = data;
      this.operationResultCheckRoutsLog = this.returnCheckRoutsLog.Error.ErrorCode;
      if(this.operationResultCheckRoutsLog==1){
        this.checkRoute = 0;
        this.routId = this.returnCheckRoutsLog.Data.routId;
        await this.storage.set('routeLogId',this.returnCheckRoutsLog.Data.routLogId);
        await this.storage.set('routeId',this.routId);
        this.functionGetWorkorders(this.routId,branchId)
        this.checkWorkordersRun(this.routId,branchId);
      }else if(this.operationResultCheckRoutsLog==5){
        this.routId = this.returnCheckRoutsLog.Data.routId;
        this.checkRoute = 1;
        await this.storage.set('routeId',this.returnCheckRoutsLog.Data.routId);
        this.functionGetWorkorders(this.routId,branchId)
        this.checkWorkordersRun(this.routId,branchId);
      }
      else{
        this.checkRoute = 2;
      }
    })
  }
  async checkWorkordersRun(routId:any,branchId:any){
    let sendValues = {'routeId':routId,'branchId':branchId};
    await this.workorderService.checkWorkordersRun(sendValues).then(async data=>{
      this.returnWorkordersRun = data;
      this.operationResultWorkordersRun = this.returnWorkordersRun.Error.ErrorCode;
      if(this.operationResultWorkordersRun==1)
        this.showStartOrderLink = 0;
      else
        this.showStartOrderLink = 1;
    })
  }
  async functionEmployeeStartRoute(){
    this.navCtrl.navigateRoot('employees');
    this.displayResult(this.error_select_employee_routes);
  }
  async selectSortingBy(val:any){
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: '',
      duration: 1500,
    });
    if(val == 1)
      this.sortingData = 2;
    else
      this.sortingData = 1;
    this.functionGetWorkorders(this.routId,this.branchId,val)
    await loading.present();
  }
  async functionGetWorkorders(routId:any,branchId:any,sorting:any=0){
    let sendValues = {'routId':routId,'branchId':branchId,sorting:sorting};
    this.workorderService.getWorkorders(sendValues).then(async data=>{
      this.returnWorkordersData = data;
      this.operationWorkordersResult = this.returnWorkordersData.Error.ErrorCode;
      if(this.operationWorkordersResult==1){
        this.returnArrayWorkordersFromServer = this.returnWorkordersData.Data.orders;
        this.returnWorkordersArray=[];
        for(let i = 0; i < this.returnArrayWorkordersFromServer.length;i++) {
          this.returnWorkordersArray[i]=[];
          this.returnWorkordersArray[i]['scheid'] = this.returnArrayWorkordersFromServer[i].scheid;//this from workorder_event_schedule.id
          this.returnWorkordersArray[i]['startDate'] = this.returnArrayWorkordersFromServer[i].startDate;//this from workorder_event_schedule.start_date هذا التاريخ مهم على شان سحب االاوردر من تاريخ الى تاريخ
          this.returnWorkordersArray[i]['scheduledTimeType'] = this.returnArrayWorkordersFromServer[i].scheduledTimeType;//this from workorder_event_schedule.scheduled_time_type نوع الوقت الخاص بالراوت هل هو من وقت الى وقت او من خلال وقت مفتوح      done
          this.returnWorkordersArray[i]['specificTime'] = this.returnArrayWorkordersFromServer[i].specificTime;//this from workorder_event_schedule.specific_time تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 1      done
          this.returnWorkordersArray[i]['timeRange'] = this.returnArrayWorkordersFromServer[i].timeRange;//this from workorder_event_schedule.time_range تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 2      done
          this.returnWorkordersArray[i]['rangeStartTime'] = this.returnArrayWorkordersFromServer[i].rangeStartTime;//this from workorder_event_schedule.range_start_time تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 2      done
          this.returnWorkordersArray[i]['rangeEndTime'] = this.returnArrayWorkordersFromServer[i].rangeEndTime;//this from workorder_event_schedule.range_end_time تحدد الوتق اللازم للعمل عندما تكون القيمة scheduled_time_type تكون 2      done
          this.returnWorkordersArray[i]['eventId'] = this.returnArrayWorkordersFromServer[i].eventId;//this event_id from workorder_events      done
          this.returnWorkordersArray[i]['eventName'] = this.returnArrayWorkordersFromServer[i].eventName;//this event_name from workorder_events       done
          this.returnWorkordersArray[i]['ordersId'] = this.returnArrayWorkordersFromServer[i].ordersId;//this id from workorders       done
          this.returnWorkordersArray[i]['sourceName'] = this.returnArrayWorkordersFromServer[i].sourceName;//this source_name from workorders
          this.returnWorkordersArray[i]['ordType'] = this.returnArrayWorkordersFromServer[i].ordType;//this source_name from workorders
          if(this.returnArrayWorkordersFromServer[i].priority == 1)
            this.returnWorkordersArray[i]['priority'] =this.critical;
          if(this.returnArrayWorkordersFromServer[i].priority == 2)
            this.returnWorkordersArray[i]['priority'] =this.high;
          if(this.returnArrayWorkordersFromServer[i].priority == 3)
            this.returnWorkordersArray[i]['priority'] =this.medium;
          if(this.returnArrayWorkordersFromServer[i].priority == 4)
            this.returnWorkordersArray[i]['priority'] =this.low
          this.returnWorkordersArray[i]['firstName'] = this.returnArrayWorkordersFromServer[i].firstName;//this first_name from workorder_customer_info    done
          this.returnWorkordersArray[i]['middleName'] = this.returnArrayWorkordersFromServer[i].middleName;//this middle_name from workorder_customer_info    done
          this.returnWorkordersArray[i]['lastName'] = this.returnArrayWorkordersFromServer[i].lastName;//this last_name from workorder_customer_info    done
          this.returnWorkordersArray[i]['businessName'] = this.returnArrayWorkordersFromServer[i].businessName;//this business_name from workorder_customer_info      done
          this.returnWorkordersArray[i]['streetNo'] = this.returnArrayWorkordersFromServer[i].streetNo;//this street_no from workorder_site_address      done
          this.returnWorkordersArray[i]['streetName'] = this.returnArrayWorkordersFromServer[i].streetName;//this street_name from workorder_site_address      done
          this.returnWorkordersArray[i]['extraPhone'] = this.returnArrayWorkordersFromServer[i].extraPhone;//this id from workorder_site_address
          this.returnWorkordersArray[i]['extraMobile'] = this.returnArrayWorkordersFromServer[i].extraPhone;//this id from workorder_site_address
          this.returnWorkordersArray[i]['extraFax'] = this.returnArrayWorkordersFromServer[i].extraPhone;//this id from workorder_site_address
          this.returnWorkordersArray[i]['addressLineOne'] = this.returnArrayWorkordersFromServer[i].addressLineOne;//this address_line_1 from workorder_site_address       done
          this.returnWorkordersArray[i]['propertyName'] = this.returnArrayWorkordersFromServer[i].propertyName;//this property_name from workorder_site_address      done
          this.returnWorkordersArray[i]['propertyNumberRequired'] = this.returnArrayWorkordersFromServer[i].propertyNumberRequired;//this property_number_required from workorder_site_address
          this.returnWorkordersArray[i]['propertyNumber'] = this.returnArrayWorkordersFromServer[i].propertyNumber;//this property_number from workorder_site_address
          this.returnWorkordersArray[i]['barcodeRequired'] = this.returnArrayWorkordersFromServer[i].barcodeRequired;//this barcode_required from workorder_site_address
          this.returnWorkordersArray[i]['siteAddBarcode'] = this.returnArrayWorkordersFromServer[i].siteAddBarcode;//this barcode from workorder_site_address
          this.returnWorkordersArray[i]['qrCode'] = this.returnArrayWorkordersFromServer[i].qrCode;//this qr_code from workorder_site_address
          this.returnWorkordersArray[i]['siteAddGeolocation'] = this.returnArrayWorkordersFromServer[i].siteAddGeolocation;//this geolocation from workorder_site_address
          this.returnWorkordersArray[i]['siteAddImage'] = this.returnArrayWorkordersFromServer[i].siteAddImage;//this image from workorder_site_address
          this.returnWorkordersArray[i]['workSiteAddressId'] = this.returnArrayWorkordersFromServer[i].workSiteAddressId;//this id from workorder_site_address
          this.returnWorkordersArray[i]['hours'] = this.returnArrayWorkordersFromServer[i].hours;//this id from workorder_site_address
          this.returnWorkordersArray[i]['minutes'] = this.returnArrayWorkordersFromServer[i].minutes;//this id from workorder_site_address
          this.returnWorkordersArray[i]['customerId'] = this.returnArrayWorkordersFromServer[i].customerId;//this id from events
          this.returnWorkordersArray[i]['startWorkingTime'] = this.returnArrayWorkordersFromServer[i].startWorkingTime;//this id from events
          this.returnWorkordersArray[i]['approveStatus'] = this.returnArrayWorkordersFromServer[i].approveStatus;//this id from events
        }
        this.today = this.returnWorkordersData.Data.today;
        let countOfData = this.returnWorkordersArray.length;
        if(countOfData == 0)
          this.workorders = 0;
        else{
          this.workorders = 1;
        }
      }else
        this.workorders = 0;
    }).catch(error=>{
      this.functionGetWorkorders(routId,branchId)
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
  async functionFollowupWorkorder(eventId:any,ordersId:any){
    let model = await this.modalController.create({
      component:FollowupComponent,
      animated:true,
      componentProps:{eventId:eventId,ordersId:ordersId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async functionNotifi(){
    let model = await this.modalController.create({
      component:NotifiComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async functionLocatioInformation(eventId:any,ordersId:any,workSiteAddressId:any){
    let model = await this.modalController.create({
      component:LocationinformationComponent,
      animated:true,
      componentProps:{eventId:eventId,ordersId:ordersId,workSiteAddressId:workSiteAddressId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  functionGoLocation(location:any){
    this.geolocation.getCurrentPosition().then(position=>{
      let options: LaunchNavigatorOptions = {
        app: this.launchNavigator.APP.GOOGLE_MAPS,
      };
      let res = location.split(",");
      this.launchNavigator.navigate([res[0], res[1]],options)
        .then(success =>{
          this.displayResult(this.workorders_loc_msg_tow);
        },error=>{
          this.displayResult(this.workorders_loc_msg_tow);
        })
    }).catch(e=>{
      this.displayResult(this.workorders_loc_msg_one);
    })
  }
  async functionCustomerInformation(customerId:any,eventId:any,orderId:any){
    let model = await this.modalController.create({
      component:CustomerinfoComponent,
      animated:true,
      componentProps:{eventId:eventId,orderId:orderId,customerId:customerId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{

    });
    await model.present();
  }

  async functionInstructions(eventId:any,orderId:any){
    let model = await this.modalController.create({
      component:InstructionsComponent,
      animated:true,
      componentProps:{eventId:eventId,orderId:orderId},
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then((data):any=>{
    });
    await model.present();
  }
  async functionStartWorkorder(eventName:any,eventId:any,ordersId:any,workSiteAddressId:any,siteAddGeolocation:any=0){
    const alert = await this.alertController.create({
      cssClass: 'alertBac',
      mode: 'ios',
      message:this.are_you_sure,
      buttons: [
        {
          text: this.no,
          cssClass: 'alertButton',
          handler: () => {
          }
        }, {
          text: this.yes,
          cssClass: 'alertButton',
          handler: async () => {
            if(this.showStartOrderLink == 0)
              this.displayResult(this.error_start_orders);
            else {
              let branchId = await this.storage.get('branch_id');
              let routeLogId = await this.storage.get('routeLogId');
              let routeId = await this.storage.get('routeId');
              let sendValues = {
                'eventId': eventId,
                'ordersId': ordersId,
                'locationInfo': siteAddGeolocation,
                'routId': routeId,
                'branchId': branchId,
                'routLogId': routeLogId,
                'userId': this.userId
              };
              this.workorderService.startWorkorders(sendValues).then(async data => {
                this.returnStartWorkordersData = data;
                this.operationStartWorkordersResult = this.returnStartWorkordersData.Error.ErrorCode;
                if (this.operationStartWorkordersResult == 1) {
                  this.navCtrl.navigateRoot(['/zones', {
                    eventName: eventName,
                    eventId: eventId,
                    ordersId: ordersId,
                    workSiteAddressId: workSiteAddressId
                  }]);
                } else
                  this.displayResult(this.error_start_orders_failed);
              }).catch(error => {
                this.displayResult(this.error_start_orders_failed);
              });
            }
          }
        }
      ]
    });
    await alert.present();
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
}
