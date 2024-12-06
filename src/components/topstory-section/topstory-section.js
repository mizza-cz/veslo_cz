$(".js-topstory").slick({
  slidesToShow: 1,
  arrows: true,
  infinite: !0,
  autoplay: !0,
  speed: 500,
  fade: !0,
  dots: true,
  nextArrow:
    ' <button class="slider__btn  slider__btnnext"><img src="images/ico/arrow-right.svg" alt="right" loading="lazy" /></button>',
  prevArrow:
    ' <button class="slider__btn  slider__btnprev"><img src="images/ico/arrow-left.svg" alt="left" loading="lazy" /></button>',
  responsive: [{ breakpoint: 931, settings: { arrows: false } }],
});
