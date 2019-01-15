function get_next_elem(){
    decision = Math.floor((Math.random() * 3) + 1);
    if(decision == 3){
        next_elem = 'plus'
    }
    else {
        next_elem = Math.floor((Math.random() * 3) + 1);
    }
    document.getElementById('new_element').innerHTML = next_elem;
    return next_elem
}

get_next_elem();
document.getElementById('end').style.display = "none";


function get_board() {
    board = document.getElementById('board');
    elements = board.getElementsByClassName('element');

    elem = [];
    for (i = 0; i < elements.length; i++) {
        elem.push(elements[i].innerHTML)
    }

    return elem
}

function evaluate_board() {
    var b = get_board();
    console.log(b)
    for(var i = 0; i < b.length; i++){
        if(b[i] == 'plus' && i > 0 && i < b.length-1){
            var j = 1;
            for(j; j < b.length; j++) {
                if (b[i - j] != b[i + j]) {
                        break;
                }
            }
            j = j - 1;
            if(j > 0){
                var parent = document.getElementById("board");
                k = i - j*2;
                for(k; k < i + j*2; k++) {
                    var child = document.getElementById(k);
                    parent.removeChild(child);
                }
            }
        }
    }
}

document.addEventListener('click', function (e) {

    e = e || window.event;
    var target = e.target || e.srcElement;
    console.log(target.id);
    if (target.className == 'additor') {
        var elem = document.createElement('div');
        elem.className = 'element';
        elem.innerHTML = next_elem;
        var additor = document.createElement('div');
        additor.className = 'additor';
        additor.innerHTML = '+';
        var parentElement = document.getElementById('board');
        parentElement.insertBefore(elem, parentElement.children[target.id]);
        parentElement.insertBefore(additor, parentElement.children[target.id]);
        next_elem = get_next_elem();
    }
    var pluses = document.getElementById('board').getElementsByTagName('div');
    for (var i = 0; i < pluses.length; i++) {
        pluses[i].id = i
    }
    evaluate_board();
    var pluses = document.getElementById('board').getElementsByTagName('div');
    for (var i = 0; i < pluses.length; i++) {
        pluses[i].id = i
    }
    var b = get_board();
    if(b.length > 18){
        document.getElementById('board').style.display = "none";
        document.getElementById('new_element').style.display = "none";
        document.getElementById('end').style.display = "inline-block";
    }

}, false);
