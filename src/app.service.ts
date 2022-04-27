import {HttpService} from "@nestjs/axios";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./users/interfaces/user.interface";
import {Widget} from "./widgets/interfaces/widget.interface";

@Injectable()
export class AppService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Widget') private readonly widgetModel: Model<Widget>,
        private httpService: HttpService
    ) {
    }

    getHello(): string {
        return 'Hello World!';
    }


    async getUserDetails() {
        const userDetails = await this.userModel.findById('61d55ec160ba94c788085d5b');
        return userDetails;
    }


    async XXXXgetMyWidgetsData() {
        // STEP fetch user's data via userId received from front end
        const userDetails = await this.userModel.findById('61d4b0d2408c35e595d33458');
        const {widgetsList} = userDetails;

        //STEP list of all api's endpoints
        const allEndpoints = {
            crypto: {
                bitcoin: 'https://api.coindesk.com/v1/bpi/currentprice.json'
            },
            weather: {
                paris: 'https://www.metaweather.com/api/location/44418/',
            },
            activities: {
                randomActivities: 'https://www.boredapi.com/api/activity'
            }
        }


        //Define function fetching from api
        const fetchDataFromApi = async (uri) => {
            const value = await this.httpService.get(uri).toPromise();
            const apiData = await value.data;
            return apiData;
        }

        // get all datas from api one by one
        const bitcoinData = await fetchDataFromApi(allEndpoints.crypto.bitcoin);
        // console.log(bitcoinData); OK
        const weatherParisData = await fetchDataFromApi(allEndpoints.weather.paris);
        // console.log(weatherParisData)



    }

}
