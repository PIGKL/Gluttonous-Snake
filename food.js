//自调用函数创建一个食物自定义构造函数
(function () {
    var arr = [];

    function Food(width, height, color, x, y) {
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
        this.x = 0;
        this.y = 0;
        //向食物的原型中添加方法生成小方块
        Food.prototype.inte = function (map) {
            //生成食物的同时先执行一次删除食物，避免出现多个食物
            remove();
            var div = document.createElement("div");
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = this.color;
            div.style.position = "absolute";
            map.appendChild(div);
            //生成随机数  并设置为食物的坐标   随机数出来后在乘以食物的宽度
            this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
            this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";
            //把div追加到数组中
            arr.push(div);
        };
    }

    //把食物的对象暴露给window   供外部访问
    window.Food = Food;

    //定义私人的函数----删除食物
    function remove() {
        //循环遍历数组并删除元素
        for (var i = 0; i < arr.length; i++) {
            var ele = arr[i];
            //删除页面中的div
            ele.parentNode.removeChild(ele);
            //再删除数组中的数据
            arr.splice(i, 1);
        }
    }


}());