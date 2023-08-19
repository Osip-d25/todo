(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const addButton = document.getElementById("addButton");
    const titleTask = document.getElementById("title-task");
    const textTask = document.getElementById("text-task");
    const dataList = document.getElementById("dataList");
    let dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
    function updateList() {
        dataList.innerHTML = "";
        dataArray.forEach(((data, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list__item");
            const titleTasks = document.createElement("div");
            titleTasks.classList.add("list__title");
            titleTasks.textContent = `${data.title}`;
            const textTasks = document.createElement("div");
            textTasks.classList.add("list__text");
            textTasks.textContent = `${data.text}`;
            const delTasks = document.createElement("div");
            delTasks.classList.add("list__delete");
            delTasks.addEventListener("click", (() => {
                dataArray.splice(index, 1);
                localStorage.setItem("dataArray", JSON.stringify(dataArray));
                updateList();
            }));
            listItem.appendChild(titleTasks);
            listItem.appendChild(textTasks);
            listItem.appendChild(delTasks);
            dataList.appendChild(listItem);
        }));
    }
    addButton.addEventListener("click", (() => {
        const title = titleTask.value;
        const text = textTask.value;
        if (title && text) {
            const newData = {
                title,
                text
            };
            dataArray.push(newData);
            localStorage.setItem("dataArray", JSON.stringify(dataArray));
            titleTask.value = "";
            textTask.value = "";
            updateList();
        }
    }));
    updateList();
    window["FLS"] = true;
    isWebp();
})();