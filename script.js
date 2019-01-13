i = 1
function addRow() {
    var div = document.createElement('div');

    div.id = i;

    div.innerHTML = i;
    i += 1;
    document.getElementById('board').appendChild(div);
}

function get_board(){
  board = document.getElementById('board')
  elements = board.getElementsByTagName('div')
  elem = []
  for(i = 0; i < elements.length; i++){
    elem.push(elements[i].innerHTML)
  }
  console.log(elem)
  return elem
}
