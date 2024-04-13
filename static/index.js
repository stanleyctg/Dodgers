const stars = 100

function createStars() {
    const previousStars = document.querySelectorAll('.stars');
    previousStars.forEach(star => star.remove());

    for (let i = 0; i < stars; i++) {
        let star = document.createElement("div");
        star.className = 'stars';
        var xy = randomPosition();
        star.style.top = xy[0] + 'px';
        star.style.left = xy[1] + 'px';
        document.body.append(star);
    }
}

function randomPosition() {
    var y = window.innerWidth
    var x = window.innerHeight
    var randomX = Math.floor(Math.random() * x)
    var randomY = Math.floor(Math.random() * y)
    return [randomX, randomY]
}

createStars();

setInterval(createStars, 5000);

const observer = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hiddenL, .hiddenR, .introAnimation');
hiddenElements.forEach((el)=> observer.observe(el));

