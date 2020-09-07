/**
 * Websocket 创建类
 * 
 * @argument option : {
 *   url : "/xxx" ,//websocket url
 *   onopen : function() ,//websocket连接开启监听事件
 *   onmessage : function(evt),//websocket数据接收事件
 *   onclose : function(),//websocket关闭事件
 *   
 * }
 * 
 * 
 */
class WebSocketUtil {
    constructor(option){
        this.option = option;
        this.reconnect = true;
        //debugger;
        //this.url = this.getServerAddress(option.url);
        this.url = "ws://42.248.78.75:2031"+this.option.url;
        this.initWebsocket();
    }

    getServerAddress(address){
        let url = `ws://${this.getServerHost()}`
        // if(this.getServerPort()){
        //     url = url + ":" + this.getServerPort();
        // }
        url = url + address;
        return url;
    }

    initWebsocket(){
        let _this = this;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = function(){
            _this.onopen();
        };
        this.ws.onclose = function(){
            _this.onclose();
        };
        this.ws.onmessage = function(evt){
            _this.onmessage(evt);
        };
    }

    send(data){
        //this.reconnect = false;
        console.log("发送数据：" + JSON.stringify(data));
        this.ws.send(data);
    }

    close(){
        this.reconnect = false;
        this.ws.close();
    }

    onopen(){
        console.log("websocket开始连接");
        this.option.onopen();
    }

    onmessage(evt){
        this.option.onmessage(evt);
    }

    onclose(){
        this.option.onclose();
        console.log("websocket连接已关闭");
        if(this.reconnect){
            this.reconnectServer();
        }
    }

    reconnectServer(){
        this.initWebsocket();
        console.log("websocket非正常关闭，正在重连....");
    }

    

    getServerProtocol(){
        return window.location.protocol;
    }

    getServerHost() {
        return window.location.host;
    }

    getServerPort() {
        return window.location.port;
    }
} 
export default WebSocketUtil;