// name space
const myPortfolio = {};


// event listeners 
myPortfolio.navBackground = function() {

    let scrollPos = window.scrollY

    const nav = document.querySelector('nav')

    const navHeight = nav.offsetHeight

    const addClassOnScroll = () => nav.classList.add('white-nav')

    const removeClassOnScroll = () => nav.classList.remove('white-nav')

    window.addEventListener('scroll', function() {
        scrollPos = window.scrollY

        if (scrollPos >= navHeight) {
            addClassOnScroll()
        } 

        else {
            removeClassOnScroll()
        }
    })
    
    // // add/remove nav background
    // const nav = $('.clearNav');
    // $(window).scroll(function(){
    //     const scroll = $(window).scrollTop();

    //     if (scroll >= 100){
    //         nav.removeClass('clearNav').addClass('whiteNav');
    //     }else {
    //         nav.removeClass('whiteNav').addClass('clearNav');
    //     }
    // })

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