// jQuery
$(document).ready(function(){
  //header hide
  $(window).scroll(function(event){
      let st = $(this).scrollTop();
      console.log(st)
      if(st>386){
          $('.header').addClass('hide')
          $('.mb-bt').addClass('hide')

      }else{
          $('.header').removeClass('hide')
          $('.mb-bt').removeClass('hide')
      }

  })
// 헤더 색상 변경
let HeaderHeight = $('.header').outerHeight();
$(window).on('scroll',function(){
  if($(window).scrollTop() >= HeaderHeight){
      $('.header').addClass('active');
  }else{
      $('.header').removeClass('active');
  }
})
})


$(document).ready(function(){
  const firstMenu = $('nav>ul>li')
  const header = $('header')

  firstMenu.mouseenter(function(){
      header.stop().animate({height: '135px'},300)
      
      
      
  })

  firstMenu.mouseleave(function(){
      header.stop().animate({height: '80px'},300)

  
})

})

$(document).ready(function () {
    const section = $(".wrap > section");
    const footer = $(".footer");
  
    let sectionSpeed = 500;
    // 각각의 섹션의 위치값 저장
    let sectionPos = [];
    let sectionIndex = 0;

    // 연속휠막기
    let scrolling = false;
    // 화면사이즈 체크
    // 화면너비 1000px이하에서는 휠작동시켜도 fullpage식 섹션전환이 되지 않게 막아주는 변수
    // ture-> fullpage식 섹션전환이 작동됨
    // fullpage모드 on <= true / fullpage모드 off <= false
    let wheeling = true;
    const sectionMenu = $(".section-menu");
    // 윈도우너비가 1000이하이면 fullpage모드 off
    // 윈도우너비가 1000초과이면 fullpage모드 on

    function wheelCheckFn() {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 1000) {
          wheeling = false;
          sectionMenu.hide();
        } else {
          wheeling = true;
          sectionMenu.show();
        }
      }
      wheelCheckFn();
      
    // 위치파악(Y스크롤이동 px)
    // 화면리사이징이 일어날떄마다 호출됨
    // 화면리사이징시 변경되는 section위치값을 다시 sectionPos배열안에 저장함.
    function resetSection() {
        sectionPos = [];
        $.each(section, function (index, item) {
          // 각각의 seciton의 위치값 구함
          let tempY = $(this).offset().top;
          // console.log(index + ":" +tempY)
          tempY = Math.ceil(tempY);
          sectionPos[index] = tempY;
        });
        sectionPos[sectionPos.length] = Math.ceil(footer.offset().top);
        console.log(sectionPos);
      }
          // 최초에 새로고침 또는 실행시 위치값파악 =>sectionPos배열에 저장
    resetSection();
    //
    let sectionTotal = sectionPos.length;
    console.log("sectionTotal : " + sectionTotal);
  
    let resizeTimer;
    $(window).bind("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeFunction, 500);
    });
    function resizeFunction() {
        // 리사이즈시 실행할 코드
        wheelCheckFn();
        resetSection();
        if (wheeling) {
          // gsap.to($(요소명),durationTime,{설정})
          gsap.to($("html"), sectionSpeed / 1000, {
            scrollTop: sectionPos[sectionIndex],
            onComplete: function () {
              scrolling = false;
            },
          });
        }
      }
       //   $(window).resize(function () {
    //     wheelCheckFn();
    //     resetSection();
    //     if (wheeling) {
    //       // gsap.to($(요소명),durationTime,{설정})
    //       gsap.to($("html"), sectionSpeed / 1000, {
    //         scrollTop: sectionPos[sectionIndex],
    //         onComplete: function () {
    //           scrolling = false;
    //         },
    //       });
    //     }
    //   });
     // 마우스휠체크 및 섹션이동
     $(window).bind("mousewheel DOMMouseScroll", function (event) {
        let distance = event.originalEvent.wheelDelta;
        // 화면 사이즈에 따른 작동여부
        if (distance == null) {
          distance = event.originalEvent.detail * -1;
        }
        console.log(event.originalEvent.detail);
        console.log(distance);
        if (wheeling != true) {
          return;
        }
        // wheeling이 트루일때 연속휠 막아준다
        if (scrolling) {
          return;
        }
         // 연속마우스휠작동 막기
      scrolling = true;
      if (distance < 0) {
        sectionIndex++;
        if (sectionIndex >= sectionTotal) {
          sectionIndex = sectionTotal - 1;
        }
        console.log(sectionIndex);
      } else {
        sectionIndex--;
        if (sectionIndex <= 0) {
          sectionIndex = 0;
        }
        console.log(sectionIndex);
      }
      gsap.to($("html"), sectionSpeed / 1000, {
        scrollTop: sectionPos[sectionIndex],
        onComplete: function () {
          scrolling = false;
        },
      });
      sectionColor();
    });
   // 섹션메뉴클릭시 섹션이동
   const sectionLink = $(".section-menu a");
   // console.log(sectionLink)
   $.each(sectionLink, function (index, item) {
     $(this).click(function (e) {
       e.preventDefault();
       moveSection(index);
       sectionColor();
     });
   });
 
   function moveSection(_index) {
     sectionIndex = _index;
     gsap.to($("html"), sectionSpeed / 1000, {
       scrollTo: sectionPos[sectionIndex],
       onComplete: function () {
         scrolling = false;
       },
     });
   }
   function sectionColor() {
     // 포커스 표현
     sectionLink.removeClass("section-menu-active");
     sectionLink.eq(sectionIndex).addClass("section-menu-active");
     // 색상 표현
     sectionLink.removeClass("section-menu-blue");
     sectionLink.eq(sectionIndex).addClass("section-menu-blue");
   }
   // 최초 또는 새로고침시 색상 셋팅
   sectionColor();
   //검색필드기능
   //검색필드를 보여주는 버튼
   const searchBt = $('.search-bt')
   //검색필드요소
   const searchWrap = $('.search-wrap')
   searchWrap.click(function(e){
       e.stopPropagation();
      
       
       
   })
   searchBt.click(function(event){
       event.preventDefault();
       event.stopPropagation()
       searchWrap.fadeToggle(300)
       //검색버튼 이미지 교체 하기
       let imgName = $(this).find('img').attr('src');
       // console.log(imgName)
       if(imgName == 'images/search-icon.png'){
           $(this).find('img').attr('src','images/search_close.png')
           $(this).css('background','#3d66c4')

       }else{
           $(this).find('img').attr('src','images/search-icon.png')
           $(this).css('background','#fff')
       }

   })

   $('body').click(function(){
       searchWrap.fadeOut(300);
       searchBt.find('img').attr('src','images/search-icon.png')
       searchBt.css('background','#fff')
       

   })
 });
 
//  vanilla Javascript
//  window.onload = function () {
//    // 메뉴 기능
//    const header = $(".header");
//    const gnb = $(".gnb");
//    let gnbHeight = gnb.height();
//    // console.log(gnbHeight)
 
//    gnb.mouseenter(function () {
//      header.css("height", gnbHeight);
//    });
//    gnb.mouseleave(function () {
//      header.css("height", 70);
//    });
//  };
 

  //.sw-visual슬라이드 

  let swVisualPc = new Swiper('.sw-visual',{
    autoplay: true,
    slidesPerView: 1,
    loop:true,
    loopFillGroupWithBlank: true,
            delay:6000,
            disableOnInteraction: false,
    // navigation: {
    //   nextEl: ".btn-next",
    //   prevEl: ".btn-prev",
    //    },

       pagination: {
                    el: ".My-pagination",
                    clickable: true,
                    
                },
  
});




const swiper = new Swiper('.sw-item', {
  // Optional parameters
  autoplay : true,
  spaceBetween : 10,
  slidesPerView: 3,
  direction: 'horizontal',
  delay : 6000, 
  loop: true,
  disableOnInteraction : false,
  centeredSlides : true ,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});







$(window).load(function(){
    // 로딩이미지 보여주기
    $('.circle').delay("3000").fadeOut()
})




    
    // $(document).ready(function(){
    //   // 검색필드 기능
    // // 검색필드를 보여주는 버튼
    // const searchBt = $('.search-bt')
    // // 검색필드 요소
    // const searchWrap = $('.search-wrap')
    // searchWrap.click(function(e){
    //     e.stopPropagation();
    // })
    // searchBt.click(function(event){
    //     event.preventDefault();
    //     event.stopPropagation();
    //     // 막는거...!
    //     searchWrap.fadeToggle(300)
    //     // 검색버튼 이미지 교체하기
    //     let imgName = $(this).find('img').attr('src') 
    //     // this는 searchBt다. 겟 atrr는 attr('src') 셋 attr : attr('src','블라블라')블라블라로 가져옴?
    //     if(imgName == 'images/search-icon.png'){
    //         $(this).find('img').attr('src','images/search_close.png')
    //         // $(this).css('background', '#3d66c4')
    //     }else{
    //         $(this).find('img').attr('src','images/search-icon.png')
    //         // $(this).css('background', '#fff')
    //     }
    //     $('body').click(function(){
    //         searchWrap.fadeOut(300) ; 
    //         searchBt.find('img').attr('src','images/main_search.png')
    //         // searchBt.css('background', '#fff')
    //     })
    // })
    // })

