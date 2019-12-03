//监听操作
// import ServerInfo from './ServerInfo.js';
var ServerInfo = require('./ServerInfo');
// import MailOptions from './MailOptions.js';
var MailOptions = require('./MailOptions');
//mail配置
var mail = require('../config');

var http = require('http');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(mail);

function MonitorMain( options, restartOptions, errorOptions) {
    this.options = options;
    this.restartOptions = restartOptions;
    this.errorOptions = errorOptions;
    http.request(options, function () {
        //发送邮件的代码
        if (!options.addcheck) {
            //发送邮件的代码
            transporter.sendMail(restartOptions, function (error) {
                //回调函数
                if (!error) {
                    console.log(restartOptions.subject+" 服务恢复短信发送成功");
                } else {
                    console.log(error);
                }
            })
            options.addcheck = true;
        }
    }).on('error', function () { //当请求网站返回错误，也就是网站不可访问时的处理代码
        if (options.addcheck) {
            transporter.sendMail(errorOptions, function (error) {
                //回调函数
                if (!error) {
                    console.log(errorOptions.subject+" 服务挂掉发送成功");
                } else {
                    console.log(error);
                }
            });
            options.addcheck = false;
        }
    }).end();
    console.log((new Date()).toLocaleString() + " " + restartOptions.subject + ":监听运行中...");
}
module.exports = MonitorMain;

