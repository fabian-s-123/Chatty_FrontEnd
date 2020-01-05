import HttpService, { HTTPMETHOD } from "./http.services";

export default class GetChatsHttpService {

    static getChats(callBack: any) {
        HttpService.request(HTTPMETHOD.GET, "/messages")
            .then(response => {
                callBack(response);
            }
        );
    }
}