( function() {
var cardList = new Vue({
    el: "#board",
    data: {
        lists: []
    },
    filters: {
        timeFormat: function(time) {
            var timing = new Date(time);
            function singleNumFormat(num) {
                var str = num.toString();
                str = (str.length == 1) ? ("0" + str) : str;
                return str;
            }

            return timing.getFullYear() + "年" + (timing.getMonth() + 1) + "月" + timing.getDate() + "日 " + timing.getHours() + ":" + singleNumFormat(timing.getMinutes()) + ":" + singleNumFormat(timing.getSeconds());
        }
    }
})

var form = document.getElementById("form");
var input = document.getElementById("box");
var inputTextBefore = "";

input.onkeydown = function(event) {
    if (event.keyCode == 13) {
        var inputText = input.value.trim();
        if (inputText == inputTextBefore && inputText.length > 0) {
            alert("你已经说过了噢")
            input.value = "";
        } else if (inputText.length > 0 && inputText.length < 300) {
            inputTextBefore = inputText;
            this.form.submit()
            setTimeout(function() {
                input.value = ""
            }, 0)
        } else if (inputText.length > 300) {
            alert("你说的话有点多了哈哈哈哈哈")
        }
    }
};

var socket = io.connect(':4000');

socket.on("data", function(item) {
    cardList.lists.unshift(item);
});

socket.on("new", function(lists) {
    var len = Math.min(lists.length, 10);
    for (var i = 0; i < len; i++) {
        ( function(a) {
            setTimeout(function() {
                if (a != len - 1) {
                    cardList.lists.push(lists[a]);
                } else {
                    cardList.lists = lists;
                }
            }, 50 * a);
        } )(i);
    }
});
} )()