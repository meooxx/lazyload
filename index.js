function isInSight(el) {
    const clientHeight = window.innerHeight // 获取屏幕可视窗口高度
    const scrollTop = document.body.scrollTop // 滚动条滚动的距离
        // el.offsetTop 元素相对于文档顶部的距离 
        // +100是为了提前加载
    return el.offsetTop <= clientHeight + scrollTop + 100
}

function isInSight1(el) {
    const bound = el.getBoundingClientRect()
    const clientHeight = window.innerHeight
    return bound.top <= clientHeight + 100
}

function loadImg(el) {
    if (!el.src) {
        const source = el.dataset.src
        el.src = source
        console.log(el.src)
        el.removeAttribute('data-src')
    }
}

function checkImgs() {
    const imgs = document.querySelectorAll('img[data-src]')
    Array.from(imgs).forEach(el => {
        if (isInSight1(el)) {
            loadImg(el)
        }
    })

}

const io = new IntersectionObserver(ioes => {
    ioes.forEach(ioe => {
        const el = ioe.target
        const intersectionRatio = ioe.intersectionRatio
        if (intersectionRatio > 0 && intersectionRatio <= 1) {
            loadImg(el)
        }
        el.onload = el.onerror = () => io.unobserve(el)
    })
})

function checkImgs2() {
    if (!io) {
        alert('您的浏览器不资辞 IntersectionObserver')
    }
    const imgs = Array.from(document.querySelectorAll('img[data-src]'))
    imgs.forEach(item => io.observe(item))
}

function backToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}
