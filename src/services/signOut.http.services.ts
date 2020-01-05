import HttpService, { HTTPMETHOD } from './http.services';

export default class SignOutHttpService {

    static signOut() {
        return HttpService.request(HTTPMETHOD.PUT, "/user/" + localStorage.getItem("userId"), "")
    }
}