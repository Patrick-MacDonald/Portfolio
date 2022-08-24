function prefill() {
    let url = window.location.href
    let ind = url.lastIndexOf("#")
    if (ind >= 0) {
        prefillValueArr = url.slice(ind+1).split("_")
        let e = document.getElementsByClassName("office-form-question-textbox")
        for (let i = 0; i < Math.min(e.length,prefillValueArr.length); i++) {
            e[i].removeAttribute("placeholder")
            e[i].setAttribute("value", prefillValueArr[i])
            console.log("set attribute")
        }
    }
    console.log("this script ran")
}

(function startObservation() {
    console.log("observer")
    let observer = new MutationObserver(prefill)
    let options = {
        childList: true,
        subtree: true
    }
    let target = document.body
    observer.observe(target, options)
})()
