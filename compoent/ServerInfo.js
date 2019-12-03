//监听对象

//监听对象信息
function ServerInfo(addcheck,host,port,path,method){
        this.addcheck = addcheck;
        this.host = host;
        this.port = port;
        this.path = path;
        this.method = method;
}
module.exports = ServerInfo;