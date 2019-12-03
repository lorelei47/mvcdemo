function Person(name,age){
    this.name = name;
    this.age = age;
    var that = this;
    setInterval(function(){
        console.log(that.name);
    },1000)
}
// var test = new Person('lore','16');


var ay = [{name:'张三',age:'16'},{name:'李四',age:'17'},{name:'王五',age:'18'}]

ay.forEach(function(item){
    new Person(item.name,item.age);
})