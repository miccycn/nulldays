( function() {
var cardList = new Vue({
    el: "#board",
    data: {
        lists: []
    },
    filters: {
        timeFormat: function(time) {
            var timing = new Date(time);
            return timing.getFullYear() + "年" + (timing.getMonth() + 1) + "月" + timing.getDate() + "日 " + timing.getHours() + ":" + timing.getMinutes() + ":" + timing.getSeconds();
        }
    }
})

var form = document.getElementById("form");
var input = document.getElementById("box");
var inputTextBefore = "";

input.onkeydown = function(event) {
    if (event.keyCode == 13) {
        var inputText = input.value.trim();
        if (inputText.length <= 0) {
            return false;
        }
        if (inputText == inputTextBefore) {
            alert("你已经说过了噢")
            input.value = "";
            return false;
        }
        if (inputText.length > 300) {
            alert("你说的话有点多了哈哈哈哈哈")
            return false;
        }
        if (inputText.length > 0 && inputText.length < 300) {
            inputTextBefore = inputText;
            this.form.submit();
            input.value = "";
        }
    }
};

var socket = io.connect(':4000');

socket.on("data", function(item) {
    cardList.lists.unshift(item);
});

socket.on("new", function(lists) {
    cardList.lists = lists;
});
} )()