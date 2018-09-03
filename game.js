//自调用函数创建游戏对象
(function () {
    var that = null;

    function Game(map) {
        this.food = new Food();
        this.snake = new Sanke();
        that = this;
        this.map = map;
    }

    //初始化游戏
    Game.prototype.init = function (map) {
         map = this.map;
        //调用初始化食物
        this.food.inte(map);
        //调用初始化小蛇
        this.snake.inte(map);
        //调用小蛇自己动
        this.ranSnake();
        //调用键盘监听改变小蛇的方向
        this.bindKey();
    };

    //小蛇自己动

    Game.prototype.ranSnake = function () {
        var timeId = setInterval(function () {
            //设置小蛇的移动
            this.snake.move(this.food, this.map);
            //初始化小蛇
            this.snake.inte(this.map);

            //获取小蛇移动的横坐标最大范围
            var maxX = this.map.offsetWidth / this.snake.width;
            //获取小蛇移动的纵坐标最大范围
            var maxY = this.map.offsetHeight / this.snake.height;
            //获取小蛇头的x坐标
            var headX = this.snake.body[0].x;
            //获取小蛇头的y坐标
            var headY = this.snake.body[0].y;
            //判断横坐标是否撞墙
            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("游戏结束");
            }
            //判断纵坐标是否撞墙
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that), 150);
    };

    //判断用户键盘按下的值  改变小蛇的移动方向
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    if(this.snake.direction != "right"){
                        this.snake.direction = "left";
                    }
                    break;
                case 38:
                    if (this.snake.direction != "bottom"){
                        this.snake.direction = "top";
                    }
                    break;
                case 39:
                    if (this.snake.direction != "left"){
                        this.snake.direction = "right";
                    }
                    break;
                case 40:
                    if(this.snake.direction != "top"){
                        this.snake.direction = "bottom";
                    }
                    break;
            }
        }.bind(that), false);
    };
    window.Game = Game;
}());
