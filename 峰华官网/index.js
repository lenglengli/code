// 固定导航
const headerEl = document.querySelector("header");
window.addEventListener("scroll",()=>{
    let height = headerEl.getBoundingClientRect().height;
    if(window.pageYOffset - height > 800){
        if(!headerEl.classList.contains("sticky")){
            headerEl.classList.add("sticky");
        }
    }else{
        headerEl.classList.remove("sticky");
    }
})

// 轮播组件  glide
const glide = new Glide(".glide");
glide.mount();

//标题的动画 anime
const captionsEl = document.querySelectorAll(".slide-caption");
glide.on(["mount.after","run.after"],() => {
    const caption = captionsEl[glide.index];
    //让标题依次显示
    anime({
      targets: caption.children,
      opacity: [0,1],
      duration: 400,
      easing: "linear",
      delay: anime.stagger(400,{start: 300}),
      translateY: [anime.stagger([40,10]),0] 
    });
});
glide.on("run.before",() =>{
    document.querySelectorAll(".slide-caption > *").forEach(el =>{
        el.style.opacity = 0;
    })
})

//成功案例 isotope
const isotope = new Isotope(".cases",{
    layoutMode: "fitRows",
    itemSelector: ".case-item"
})

const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", e => {
    let{target} = e;//解构赋值
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");
        isotope.arrange({filter: filterOption});
    }
})