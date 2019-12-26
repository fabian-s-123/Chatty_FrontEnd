import HttpService, { HTTPMETHOD } from "./http.services";

export default class SignInHttpService {

    static signIn(values: any) {
        return HttpService.request(HTTPMETHOD.POST, "/user", values)
    }
}