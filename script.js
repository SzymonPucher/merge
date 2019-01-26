points = 0;
get_next_elem();
document.getElementById('end').style.display = "none";

function get_next_elem() {
    decision = Math.floor((Math.random() * 15));
    var level = Math.floor(Math.sqrt(points) / 10) + 1;
    if (decision < 5) {
        next_elem = '+'
    }
    else if (decision === 5 && get_board().length > 2) {
        next_elem = '-'
    }
    else {
        next_elem = Math.floor((Math.random() * 3) + level);
    }
    document.getElementById('new_element').innerHTML = next_elem;
    return next_elem
}

function maximum_element() {
    var b = get_board();
    var max = 0;
    for (var i = 0; i < b.length; i++) {
        if (parseInt(b[i]) > max) {
            max = parseInt(b[i]);
        }
    }
    document.getElementById('max_element').innerHTML = max;
}

function get_board() {
    board = document.getElementById('board');
    elements = board.getElementsByClassName('element');

    elem = [];
    for (i = 0; i < elements.length; i++) {
        elem.push(elements[i].innerHTML)
    }
    return elem
}

function reset_ids() {
    var pluses = document.getElementById('board').getElementsByTagName('div');
    for (var i = 0; i < pluses.length; i++) {
        pluses[i].id = i;
    }
}

function get_id_based_on_element_number(elem_num) {
    return elem_num * 2 + 1;
}

function evaluate_board() {
    var is_changed = true;
    while (is_changed) {
        is_changed = false;
        var b = get_board();
        for (var i = 0; i < b.length; i++) {
            if (b[i] === '+' && i > 0 && i < b.length - 1) {
                var j = 1;
                for (j; j < b.length; j++) {
                    if (b[i - j] !== b[i + j] || i - j < 0 || i + j === b.length || b[i - j] === '+' || b[i + j] === '+') {
                        break;
                    }
                }
                j = j - 1;

                if (j > 0) {
                    arr = [];
                    for (var m = i - j; m <= i + j; m++) {
                        if (m !== i) {
                            arr.push(b[m])
                        }
                    }
                    var parent = document.getElementById("board");
                    for (var k = get_id_based_on_element_number(i) - j * 2; k < get_id_based_on_element_number(i) + j * 2; k++) {
                        var child = document.getElementById(k);
                        parent.removeChild(child);
                        is_changed = true;
                    }
                    document.getElementById(get_id_based_on_element_number(i) + j * 2).innerHTML = Math.max.apply(null, arr) + j;
                    for (var t = 0; t < arr.length; t++) {
                        points += parseInt(arr[t]);
                    }
                    document.getElementById('points').innerHTML = points;

                }
            }
        }
        reset_ids();
    }
    maximum_element();
}

function add_element(target) {
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

function copy_element(target) {
    next_elem = target.innerHTML;
    document.getElementById('new_element').innerHTML = next_elem;
}

function delete_element(target) {
    document.getElementById('board').removeChild(document.getElementById(parseInt(target.id) + 1));
    document.getElementById('board').removeChild(document.getElementById(target.id));
    next_elem = get_next_elem();
}

function game_over() {
    document.getElementById('board').style.display = "none";
    document.getElementById('new_element').style.display = "none";
    document.getElementById('end').style.display = "inline-block";
}

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (next_elem === '-') {
        if (target.className === 'element') {
            delete_element(target);
        }
    }
    else if (next_elem === 'C') {
        if (target.className === 'element') {
            copy_element(target);
        }
    }
    else if (next_elem === 'X') {
        if (target.className === 'additor') {
            add_element(target);
        }
    }
    else if (target.className === 'additor') {
        add_element(target)
    }

    reset_ids();
    evaluate_board();
    if (get_board().length > 17) {
        game_over()
    }

}, false);
