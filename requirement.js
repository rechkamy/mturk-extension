const url = chrome.runtime.getURL('mturk-info-cat.json');
var json = '';
var classifications = [];

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => getCategory(json));
//console.log(json);

categories = ["Nothing", "Audio Transcription", "Categorization", "Data Collection",
              "Image Transcription", "Image Tagging/Labeling", "Survey",
              "Writing", "Other"]

function getCategory(json) {
    for (let i = 100; i > 0; i--) {
        if(document.getElementById("title-"+i) != null) {
            var category = categories[json["tasks"][i-1]["category"]];
            var google = document.getElementById("title-"+i);
            var button = document.createElement("button");
            if(category == "Audio Transcription") {
                button.className = "btn-success";
                button.style.background = '#FFC0CB';
                button.style.borderColor = '#FFC0CB';
            }
            else if(category == "Categorization") {
                button.className = "btn-success";
                button.style.background = '#FDDA0D';
                button.style.borderColor = '#FDDA0D';
            }
            else if(category == "Data Collection") {
                button.className = "btn-success";
            }
            else if(category == "Image Transcription") {
                button.className = "btn-info";
            }
            else if(category == "Image Tagging/Labeling") {
                button.className = "btn-success";
                button.style.background = "#D3D3D3";
                button.style.borderColor = "#D3D3D3";
                button.style.color = "black";
            }
            else if(category == "Survey") {
                button.className = "btn-warning";
            }
            else if(category == "Writing") {
                button.className = "btn-danger";
            }
            else {
                button.className = "btn-success";
                button.style.background = "#CBC3E3";
                button.style.borderColor = "#CBC3E3";

            }
            button.appendChild(document.createTextNode(category));
            google.appendChild(button);
        }
        //classifications.push(categories[json["tasks"][i]["category"]]);
        //console.log(categories[json["tasks"][i]["category"]]);
    }
}

for (let i = 100; i > 0; i--) {
    if(document.getElementById("title-"+i) != null) {
        var google = document.getElementById("title-"+i);
        var button = document.createElement("button");
        button.id = i;
        button.className = "button";
        button.appendChild(document.createTextNode("Feedback"));
        var modal = document.createElement("form");
        modal.innerHTML += 'Did you have difficulty completing this task? Tell us about it here: ';
        var input = document.createElement('input');
        var button2 = document.createElement('button');
        button2.appendChild(document.createTextNode("Submit"));
        modal.appendChild(input);
        modal.appendChild(button2);
        modal.id = "modal-"+i;
        modal.style.display = "none";
        google.appendChild(button);
        google.appendChild(modal);
    }
    //classifications.push(categories[json["tasks"][i]["category"]]);
    //console.log(categories[json["tasks"][i]["category"]]);
}

[...document.querySelectorAll('.button')].forEach(function(item) {
  item.addEventListener('click', function() {
    console.log(item.id);
    var modal = document.getElementById("modal-"+item.id)
    modal.style.display = "block";
  });
});

var task = document.getElementById("title-"+97);
var taskButton = document.createElement("button");
taskButton.className = "btn-default";
//taskButton.appendChild(document.createTextNode("Takes too long to complete"));
//task.appendChild(taskButton);
//button2.addEventListener("click", function () {
//    modal.style.display = "block";
//    console.log("button pressed");
//});
//window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//};

//window.onload = () => {
var header = document.getElementById("tabs");
var skillButton = document.createElement("button");
skillButton.className = "tablinks";
skillButton.id = "skill-btn";
skillButton.appendChild(document.createTextNode("Update Skills"));
skillButton.onclick = "openPage('skill-btn')";
header.appendChild(skillButton);
var modal = document.createElement("form");

var input = document.createElement("INPUT");
input.setAttribute("type", "checkbox");
input.id = "check1";
var label = document.createElement('label')
label.htmlFor = "check1";
label.appendChild(document.createTextNode('Hearing '));

var input2 = document.createElement("INPUT");
input2.setAttribute("type", "checkbox");
input2.id = "check2";
var label2 = document.createElement('label')
label2.htmlFor = "check2";
label2.appendChild(document.createTextNode('Vision '));

var input3 = document.createElement("INPUT");
input3.setAttribute("type", "checkbox");
input3.id = "check3";
var label3 = document.createElement('label')
label3.htmlFor = "check3";
label3.appendChild(document.createTextNode('Math '));

var input4 = document.createElement("INPUT");
input4.setAttribute("type", "checkbox");
input4.id = "check4";
var label4 = document.createElement('label')
label4.htmlFor = "check4";
label4.appendChild(document.createTextNode('Writing '));

var input5 = document.createElement("INPUT");
input5.setAttribute("type", "checkbox");
input5.id = "check5";
var label5 = document.createElement('label')
label5.htmlFor = "check5";
label5.appendChild(document.createTextNode('Ability to complete long tasks '));

var button2 = document.createElement('button');
button2.appendChild(document.createTextNode("Submit"));
modal.appendChild(input);
modal.appendChild(label);
modal.appendChild(input2);
modal.appendChild(label2);
modal.appendChild(input3);
modal.appendChild(label3);
modal.appendChild(input4);
modal.appendChild(label4);
modal.appendChild(input5);
modal.appendChild(label5);
modal.appendChild(button2);
modal.id = "skillModal";
modal.style.display = "none";
header.appendChild(modal);

document.getElementById("skill-btn").onclick = function() {
    document.getElementById("skillModal").style.display = "block";
};

var recButton = document.createElement("button");
recButton.className = "tablinks";
recButton.id = "rec-btn";
recButton.appendChild(document.createTextNode("View Recommendations"));
recButton.onclick = "openPage('rec-btn')";
header.appendChild(recButton);

var google = document.getElementById("title-98");
google.style.backgroundColor = "gold";

var google = document.getElementById("title-99");
google.style.backgroundColor = "gold";

var google = document.getElementById("title-95");
google.style.backgroundColor = "gold";

//}
//header.appendChild(div);
//for (let i = 100; i > 0; i--) {
//    if(document.getElementById("title-"+i) != null) {
        //var data = JSON.parse(fs.readFileSync("mturk-info.json"));
        //var x = document.getElementById("title-"+i).textContent;
        //var y = document.getElementById("collapse-"+i).textContent;
        //console.log(x + '|' + y);
        //var text = document.createTextNode(categories[json["tasks"][i-1]["category"]]));
        //console.log(text);
//        console.log(classifications[i-1]);
//        var google = document.getElementById("title-"+i);
//        var button = document.createElement("button");
//        button.appendChild(document.createTextNode("Other"));
//        google.appendChild(button);
//    }
//}
