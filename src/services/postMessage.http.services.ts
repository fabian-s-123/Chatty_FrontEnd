import HttpService, { HTTPMETHOD } from './http.services';

export default class PostMessageService {

    static postMessage(values: any) {
        return HttpService.request(HTTPMETHOD.POST, "/messages", {
            "content": values,
            "user": {
                "id": sessionStorage.getItem("userId")
            }
        })
    }
}