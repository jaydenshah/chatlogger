import { http, HttpRequest, HttpRequestMethod, HttpHeader, HttpClient, HttpResponse } from '@minecraft/server-net'
export function sendMsg(msg) {
    const request = new HttpRequest("https://chatlogger-bot.nw.r.appspot.com/send-msg")
    request.method = HttpRequestMethod.POST
    request.headers = [
        new HttpHeader('content-type', 'application/json')
    ]
    const payload = {
        message: msg
    }
    request.body = JSON.stringify(payload)
    http.request(request2).then((response) => {
        console.log(response.body)
    })
}

export function getTimeString() {
    const date = new Date()
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1, date.getMinutes(), date.getSeconds(), date.getMilliseconds())
    //const date_str = String(d.getFullYear()).concat("-", String(d.getMonth() + 1), "-", String(d.getDate()))
    //const time_str = String(d.getHours() + 1).concat(":", String(d.getMinutes()), ":", String(d.getSeconds()), ":", String(d.getMilliseconds()))
    const date_str = d.toISOString().substring(0, 10)
    const time_str = d.toISOString().substring(11, 23)
    return date_str.concat(" ", time_str)
}