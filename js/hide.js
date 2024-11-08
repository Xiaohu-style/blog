var timeoutId; window.addEventListener("mousemove", function (e) {
    document.querySelectorAll(".magical").forEach(n => {
        n.querySelector(".show") || n.insertAdjacentHTML("beforeend", "<div class='show'></div>");
        const t = n.getBoundingClientRect(), i = e.clientX - t.left,
            o = e.clientY - t.top; n.style.setProperty("--mouse-x", `${i}px`),
                n.style.setProperty("--mouse-y", `${o}px`); const l = n.querySelector(".show");
        l && (l.style.opacity = i >= 0 && i <= n.clientWidth && o >= 0 && o <= n.clientHeight ? 1 : 0)
    }
    )
}),
    document.addEventListener("DOMContentLoaded", function () {
        var e = document.getElementById("emailCopied");
        e && e.addEventListener("click", function () {
            clearTimeout(timeoutId);
            var e = document.createElement("input"); e.value = this.textContent, document.body.appendChild(e),
                e.select(), document.execCommand("copy"), document.body.removeChild(e);
            var n = document.getElementsByClassName("copied")[0]; n.style.opacity = 1,
                timeoutId = setTimeout(function () { n.style.opacity = 0 }, 1e3)
        })
    });
const menuExpand = document.getElementById("menu-expand"),
    menuExpandChild = document.getElementById("menu-expand-child"),
    menuPanel = document.getElementById("menu-panel");
let isMenuOpen = !1; menuExpand.addEventListener("click", function (e) {
    e.stopPropagation(),
        isMenuOpen ? (menuPanel.style.left = "100vw", menuPanel.style.transition = "left .5s") :
            (menuPanel.style.left = "40px", menuPanel.style.transition = "left .5s"),
        isMenuOpen = !isMenuOpen, menuExpand.classList.toggle("active"),
        menuExpandChild.children[0].style.transition = "transform .5s",
        menuExpandChild.children[0].style.transform = isMenuOpen ? "rotate(45deg)" :
            "rotate(0deg)", menuExpand.style.pointerEvents = "none",
        menuPanel.addEventListener("transitionend", function () { menuExpand.style.pointerEvents = "auto", menuPanel.style.transition = "none" }
            , { once: !0 })
}), document.addEventListener("click", function (e) {
    isMenuOpen && e.target !== menuExpand && e.target !== menuPanel && (menuPanel.style.left = "100vw",
        menuPanel.style.transition = "left .5s", isMenuOpen = !1, menuExpand.classList.remove("active"),
        menuExpandChild.children[0].style.transition = "transform .5s",
        menuExpandChild.children[0].style.transform = "rotate(0deg)")
}
);