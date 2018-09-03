//自调用函数创建小蛇的构造函数
(function () {
    //存储小蛇的身体
    var arr1 = [];

    //创建小蛇的对象
    function Snake(width, height, direction) {
        this.height = height || 20;
        this.width = width || 20;
        //小蛇的方向
        this.direction = direction || "right";
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ]
    }

    //为小蛇的原型添加自定义属性   初始化小蛇
    Snake.prototype.inte = function (map) {
        //先删除之前的小蛇
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            //把小蛇追加到地图中
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.borderRadius = "50%";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;

            //方向

            //把div追加到数组中   ---目的  删除小蛇
            arr1.push(div);
        }
    };
    //为小蛇的原型添加属性  动起来

    Snake.prototype.move = function (food, map) {
        //改变小蛇的身体的移动位置
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        //判断方向   改变小蛇头的坐标
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断小蛇头的坐标与食物的坐标
        if (food.x == this.body[0].x * this.width && food.y == this.body[0].y * this.height) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });

            food.inte(map);
        }
    };

    //构造一个小蛇私有的函数    删除小蛇
    function remove() {
        var i = arr1.length - 1;
        for (; i >= 0; i--) {
            var ele = arr1[i];
            //删除小蛇的身体
            ele.parentNode.removeChild(ele);
            //同时删除数组中储存的数据
            arr1.splice(i, 1)
        }
    }

    window.Sanke = Snake;
}());