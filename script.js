
function addRow() {
    var elem = document.createElement('div');
    elem.className = 'element';
    elem.innerHTML = Math.floor((Math.random() * 30) + 1);;
    var additor = document.createElement('div');
    additor.className = 'additor';
    additor.innerHTML = '+';
    //document.getElementById('board').insertBefore(newElement, parentElement.children[2]);
    document.getElementById('board').appendChild(elem);
    document.getElementById('board').appendChild(additor);
}

function get_board(){
  board = document.getElementById('board')
  elements = board.getElementsByClassName('element')

  elem = []
  for(i = 0; i < elements.length; i++){
    elem.push(elements[i].innerHTML)
  }
  console.log(elem)
  return elem
}

document.addEventListener('click', function(e) {
    pluses = board.getElementsByClassName('additor')
    for(i = 0; i < pluses.length; i++){
      pluses[i].id = i
    }
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
    console.log(target.id);
    if (target.className == 'additor'){
      var elem = document.createElement('div');
      elem.className = 'element';
      elem.innerHTML = Math.floor((Math.random() * 30) + 1);;
      var additor = document.createElement('div');
      additor.className = 'additor';
      additor.innerHTML = '+';
      parentElement = document.getElementById('board')
      //parentElement.insertBefore(additor, parentElement.children[target.id]);
      parentElement.insertBefore(elem, parentElement.children[target.id]);
    }


}, false);
