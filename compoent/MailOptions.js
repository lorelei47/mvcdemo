//监听对象返回信息
function MailOptions(from, to, subject, text) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
}
module.exports = MailOptions;