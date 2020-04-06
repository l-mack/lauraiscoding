// name space
const myPortfolio = {};

// typewriter 
const TxtType = function(e1, toRotate, period){
    this.toRotate = toRotate;
    this.e1 = e1;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function(){
    const i = this.loopNum % this.toRotate.length;
    const fullText = this.toRotate[i];

    if (this.isDeleting){
        this.txt = fullText.substring(0, this.txt.length -1);
    } else{
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.e1.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullText){
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function(){
        that.tick();
    }, delta);
};

window.onload = function(){
    const elements =
    document.getElementsByClassName('typewrite');

    for (let i=0; i<elements.length; i++){
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate){
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // css
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap {border-right: 1.5px solid #fff}";
    document.body.appendChild(css);
};


// event listeners 
myPortfolio.navBackground = function(){
    
    // add/remove nav background
    const nav = $('.clearNav');
    $(window).scroll(function(){
        const scroll = $(window).scrollTop();

        if (scroll >= 100){
            nav.removeClass('clearNav').addClass('whiteNav');
        }else {
            nav.removeClass('whiteNav').addClass('clearNav');
        }
    })

}

// hightlight links on scorll
let lastId,
  topMenu = $("#topMenu"),
  topMenuHeight = topMenu.outerHeight() + 15,
  
  menuItems = topMenu.find("a"),
  
  scrollItems = menuItems.map(function() {
    let item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// click handler on menu items for scroll animation 
menuItems.click(function(e){
    const href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// bind to scroll 
$(window).scroll(function(){
    // get container scroll position 
    const fromTop = $(this).scrollTop() + topMenuHeight;

    // get id of current scroll item
    let currentId = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });

    // get id of current element 

    currentId = currentId[currentId.length - 1];
    const id = currentId && currentId.length ? currentId[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // add/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#" + id + "']").parent().addClass("active");
      }
});

// filp skill items on hover 

$('.skillItem').hover(function(){
    $(this).addClass('flip');
}, function(){
    $(this).removeClass('flip');
});

// arrow scroll

$('.indicator').click(function(){
    $('html, body').animate({
        scrollTop: $('#about').offset().top
    }, 500);
});

$('.up').click(function(){
    $('html, body').animate({
        scrollTop: $('#home').offset().top
    }, 500);
});

$('#toggle').click(function(){
    $(this).toggleClass('active');
    $('#topMenu').toggleClass('open');
});

// init method
myPortfolio.init = function(){

    myPortfolio.navBackground();

}

// doc ready
$(function(){
    myPortfolio.init();

})