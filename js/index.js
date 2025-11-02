document.getElementById('overview-next').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(list[0]);
}

document.getElementById('overview-prev').onclick = function() {
    let list = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(list[list.length - 1]);
}

