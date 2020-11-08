
    let div = document.querySelectorAll('footer div')
    for (let i = 0; i < div.length; i++) {
        div[i].onclick = function () {
            switch (i) {
                case 0:
                    location.href = 'index.html'
                    break;
                case 1:
                    location.href = 'classify.html'
                    break;
                case 2:
                    location.href = 'shopcart.html'
                    break;
                case 3:
                    location.href = 'my.html'
                    break;
            }
        }
    }
    

