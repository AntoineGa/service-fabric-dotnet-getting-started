﻿var timeout;
var newEntityData = new Object();
var EntityData;

function getStatefulBackendServiceDictionary() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status < 400) {
                entityData = JSON.parse(http.responseText);
                if (entityData) {
                    renderStatefulBackendServiceDictionary(entityData);
                }
                /* myAlert(""); */
            } else {
                myAlert(http.statusText);
            }
        }
    };
    http.open("GET", "/api/StatefulBackendService/");
    http.send();
}

function addStatefulBackendServiceKeyValuePair() {
    var keyValue = {
        key: keyInput.value,
        value: valueInput.value
    };
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
            if (http.status < 400) {
                returnData = JSON.parse(http.responseText);
                if (returnData) {
                    /* myAlert(returnData); */
                    getStatefulBackendServiceDictionary();
                    keyInput.value = '';
                    valueInput.value = '';
                }
            } else {
                myAlert(http.statusText);
            }
        }
    };
    http.open("POST", "/api/StatefulBackendService/");
    http.setRequestHeader("content-type", "application/json");
    http.send(JSON.stringify(keyValue));
}

/* This function renders the output of the call to the Stateful Backend Service in a table */
function renderStatefulBackendServiceDictionary(dictionary) {
    var table = document.getElementById('statefulBackendServiceTable').childNodes[1];

    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }

    for (var i = 0; i < dictionary.length; i++) {
        var tr = document.createElement('tr');
        var tdKey = document.createElement('td');
        tdKey.appendChild(document.createTextNode(dictionary[i].key));
        tr.appendChild(tdKey);
        var tdValue = document.createElement('td');
        tdValue.appendChild(document.createTextNode(dictionary[i].value));
        tr.appendChild(tdValue);
        table.appendChild(tr);
    }
}

/* Inspiration 

function myAlert(text) {
    clearTimeout(timeout);
    document.getElementById("message").textContent = text;

    timeout = setTimeout(function () {
        document.getElementById("message").textContent = null;
    }, 5000)
}

function startValuesEntity(next) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            if (http.status < 400) {
                entityData = JSON.parse(http.responseText);
                populateValues(entityData.values);
                if (next) {
                    next();
                }
            } else {
                myAlert(http.statusText);
            }
        }
    };
    http.open("POST", "/api/values/");
    http.setRequestHeader("Content-Type", "application/json");
    http.send();
}

function refreshEntity() {
    if (!entityData) return;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            if (http.status < 400) {
                entityData = JSON.parse(http.responseText);
                populateValues(entityData.values);
                myAlert("");
            } else {
                myAlert(http.statusText);
            }
        }
    };
    http.open("GET", "/api/values/" + entityData.Id + "?randomAvoidCache=" + Math.random());
    http.send();

    document.getElementById("newValueContent").value = '';
}



function populateValues(values) {
    if (!values) return;
    var list = document.getElementById('valuesList');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (var i = 0; i < values.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(values[i]));
        tr.appendChild(td);
        list.appendChild(tr);
    }
    if (values.length > 0) {
        document.getElementById('btnReset').disabled = false;
    } else {
        document.getElementById('btnReset').disabled = true;
    }
}

function addNewValue() {
    myAlert("adding value ...");

    if (!entityData) {
        startValuesEntity(addNewValue);
        return;
    }
    var content = document.getElementById("newValueContent").value;
    if (!content) return;
    if (!entityData.values) {
        entityData.values = [content];
    } else {
        entityData.values.push(content);
    }
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            if (http.status < 400) {
                refreshEntity();
            } else {
                myAlert(http.statusText);
            }
        }
    }
    http.open("PUT", "/api/values/" + entityData.Id);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(entityData));
}

function deleteEntity() {
    if (!entityData) {
        startValuesEntity();
        return;
    }
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            if (http.status < 400) {
                startValuesEntity();
            } else {
                myAlert(http.statusText);
            }
        }
    }
    http.open("DELETE", "/api/values/" + entityData.Id);
    http.send();
}

/*        document.getElementById('newValueContent').onkeypress = function (e) {
            if (e.keyCode == 13) {
                // press Enter will invoke button click
                document.getElementById('btnAdd').click();
                return false;
            }
            return true;
        }*/