var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btn = document.getElementById("btn")
var mainDiv = document.getElementById("mainDiv");
var secondaryDiv = document.getElementById("secondaryDiv")
var siteList;
var mainIndex = 0;

if (localStorage.getItem("list") != null) {
    siteList = JSON.parse(localStorage.getItem("list"))
    displaySite(siteList)
} else {
    siteList = []
}

function addSite() {
    if (validateSiteName() && validateSiteUrl()) {


        if (btn.innerText == "update") {
            btn.innerHTML = "Add Product"
            var site = {
                name: siteName.value,
                siteUrl: siteUrl.value
            }
            siteList.splice(mainIndex, 1, site)
        } else {
            var site = {
                name: siteName.value,
                siteUrl: siteUrl.value
            }
            siteList.push(site)
        }

        setLocalStorage()
        displaySite(siteList)
        clearForm()
        goToList()
    }

}
function goToList() {
    mainDiv.classList.add("d-none");
    secondaryDiv.classList.replace("d-none", "d-block")
}

function displaySite(list) {
    var cartona = ``;
    for (let i = 0; i < list.length; i++) {
        cartona += `<tr><td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td>${list[i].siteUrl}</td>
    <td>
        <button class="btn btn-outline-info fw-bold fst-italic" id="visitBtn"><a class="text-decoration-none" href="https://${list[i].siteUrl}">Visit</a></button>
    </td>
    <td>
        <button class="btn btn-outline-danger fw-bold fst-italic mb-2"
            id="deleteBtn" onclick="deleteSite(${i})">Delete</button>
    </td>
    <td>
        <button class="btn btn-outline-warning fw-bold fst-italic mb-2"
            id="updateBtn" onclick="getSiteData(${i})">Update</button>
    </td></tr>`
    }
    document.getElementById("tableData").innerHTML = cartona
}
function setLocalStorage() {
    localStorage.setItem("list", JSON.stringify(siteList))
}
function clearForm(flag) {
    siteName.value = flag ? flag.name : "";
    siteUrl.value = flag ? flag.siteUrl : ""
}

function back() {
    mainDiv.classList.remove("d-none");
    secondaryDiv.classList.replace("d-block", "d-none")
}

function deleteSite(index) {
    siteList.splice(index, 1);
    displaySite(siteList);
    setLocalStorage()
}

function getSiteData(index) {
    back()
    clearForm(siteList[index]);
    btn.innerText = "update";
    mainIndex = index;
}

function search(searchKey) {
    var searchlist = []
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
            searchlist.push(siteList[i])
        }
    }
    displaySite(searchlist)
}

function validateSiteName() {
    var regex = /^[A-Za-z]{1,}$/
    if (regex.test(siteName.value)) {
        document.getElementById("errorName").classList.add("d-none")

        return true
    } else {
        document.getElementById("errorName").classList.remove("d-none")

        return false
    }
}

function validateSiteUrl() {
    var regex = /^www\.[a-z]{1,}\.com$/;
    if (regex.test(siteUrl.value)) {
        document.getElementById("errorUrl").classList.add("d-none")
        return true
    } else {
        document.getElementById("errorUrl").classList.remove("d-none")
        return false
    }
}

