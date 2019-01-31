var points = 0;
get_next_elem();
maximum_element();
document.getElementById('end').style.display = "none";
var last_plus = 0;
var move_count = 0;

var ctx = document.getElementById('points_chart').getContext('2d');

points_chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    scaleStartValue: 0,
    // The data for our dataset
    data: {
        labels: [0],
        datasets: [{
            label: "Points",
            backgroundColor: "rgb(117, 167, 37, 0.5)",
            data: [0]
        }]
    },

    // Configuration options go here
    options: {
        responsive: true, maintainAspectRatio: false,
        title: {
            display: true,
            fontSize: 15,
            padding: 10,
            text: 'Amount of points over moves'
        },
        scales: {
            yAxes: [{
                display: true,
            }]
        }
    }
});

function get_next_elem() {
    var decision = Math.floor((Math.random() * 20)) - last_plus;
    var level = Math.floor(Math.sqrt(points) / 10) + 1;
    last_plus++;
    if (decision < 5) {
        next_elem = '+';
        last_plus = 0;
    }
    else if (decision === 5 && get_board().length > 2) {
        next_elem = '-';
    }
    else if (decision === 6) {
        next_elem = 'C';
    }
    else if (decision === 7) {
        next_elem = 'X';
    }
    else {
        next_elem = Math.floor((Math.random() * 4) + level);
    }
    document.getElementById('new_element').innerHTML = next_elem;
}

function maximum_element() {
    var b = get_board();
    var max = 0;
    for (var i = 0; i < b.length; i++) {
        if (parseInt(b[i]) > max) {
            max = b[i];
        }
    }
    //document.getElementById('max_element').innerHTML = max;
    return parseInt(max)
}

function get_board() {
    var board = document.getElementById('board');
    var elements = board.getElementsByClassName('element');

    var elem = [];
    for (var i = 0; i < elements.length; i++) {
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
    reset_ids();
    var is_changed = true;
    while (is_changed) {
        is_changed = false;
        var b = get_board();
        for (var i = 0; i < b.length; i++) {
            if (b[i] === '+' || b[i] === 'X' && i > 0 && i < b.length - 1) {
                // if merger is in the board and can merge something
                var j = 1;
                if (b[i] === 'X') {
                    // if a merger is of type any
                    var double_X_test = 0;
                    if (b[i - 1] === '+' || b[i - 1] === 'X') {
                        b[i - 1] = 1;
                        double_X_test++;
                    }
                    if (b[i + 1] === '+' || b[i + 1] === 'X') {
                        b[i + 1] = 1;
                        double_X_test++;
                    }
                    if (double_X_test === 2) {
                        break;
                    }
                    j = 2;
                }
                for (j; j < b.length; j++) {
                    // counts how many pairs to merge
                    if (b[i - j] !== b[i + j] || i - j < 0 || i + j === b.length || b[i - j] === '+' || b[i + j] === '+' || b[i - j] === 'X' || b[i + j] === 'X') {
                        // break if no more pairs to merge
                        break;
                    }
                }
                j = j - 1;

                if (j > 0) {
                    var arr = [];
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
                        points += parseInt(arr[t]) * Math.ceil(maximum_element() / 5);
                    }
                    document.getElementById('points').innerHTML = points;
                }
            }
        }
        reset_ids();
    }
    maximum_element();
    if (get_board().length > 17 || get_board().length < 1) {
        game_over()
    }
}

function add_element(target) {
    var elem = document.createElement('div');
    elem.className = 'element';
    elem.innerHTML = next_elem;
    var additor = document.createElement('div');
    additor.className = 'additor';
    additor.innerHTML = '+';
    var parentElement = document.getElementById('board');
    parentElement.insertBefore(elem, parentElement.children[target]);
    parentElement.insertBefore(additor, parentElement.children[target]);
    get_next_elem();
}

function copy_element(target) {
    next_elem = target.innerHTML;
    document.getElementById('new_element').innerHTML = next_elem;
}

function delete_element(target) {
    document.getElementById('board').removeChild(document.getElementById(parseInt(target) + 1));
    document.getElementById('board').removeChild(document.getElementById(target));
    get_next_elem();
}

function game_over() {
    document.getElementById('board').style.display = "none";
    document.getElementById('new_element').style.display = "none";
    document.getElementById('end').style.display = "inline-block";
}

function action(target) {
    if (target.className === 'element') {
        if (next_elem === '-') {
            delete_element(target.id);
            return true
        }
        else if (next_elem === 'C') {
            copy_element(target);
            return false
        }
    }
    else if (target.className === 'additor' && next_elem !== '-' && next_elem !== 'C') {
        add_element(target.id);
        return true
    }
    return false
}

function addData(chart, label, data) {
    var chart_labels =  chart.data.labels;
    chart_labels.push(label);
    chart.data.labels = chart_labels.slice(-30);
    var chart_data = chart.data.datasets[0].data;
    chart_data.push(data);
    chart.data.datasets[0].data = chart_data.slice(-30);
    chart.update();
}

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if(action(target)){
        evaluate_board();
        addData(points_chart, ++move_count, points);
    }
}, false);

function AI_make_move(){
    var b = get_board();
    
}



