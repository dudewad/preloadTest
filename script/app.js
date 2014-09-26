/**
 * Author: Ghost
 * Date: 9/25/2014
 */
var q = null;
var manifest = [
    "./asset/video/someFile.mp4"
];
var debugMsg = document.getElementById("debug");
var video = document.getElementById("vid");


var xhrClicked = function (event) {
    event.preventDefault();
    dLog("Load via XHR initiated.");
    q = new createjs.LoadQueue(true);
    q.off("complete");
    q.on("complete", function(){
        loadComplete("XHR")
    });
    q.loadManifest(manifest);
};

var tagLoadClicked = function(event){
    event.preventDefault();
    dLog("Load via tag initiated.");
    var loadVideo = document.createElement("video");
    var vidSrc = document.createElement("source");
    vidSrc.src = manifest[0];
    vidSrc.type = "video/mp4";
    loadVideo.appendChild(vidSrc);
    var watcher = window.setInterval(function(){
        videoLoadProgress(loadVideo, watcher);
    }, 500);
};

var videoLoadProgress = function(v, timeout){
    if(v.readyState && v.readyState === 4){
        var buffered = v.buffered.end(0);
        var total = v.duration;
        //Videos will stop loading because browsers will only request partial ranges (206 request).
        //Advancing the time on the video will make the browser continue to request content until the end of the file.
        v.currentTime = buffered;
        clearDebug();
        dLog("Currently buffered: " + buffered);
        dLog("Total to buffer: " + total);
        dLog("Buffered amount: " + (buffered / total));
    }
};

var showVideo = function(event){
    event.preventDefault();
    video.innerHTML = "";
    var vidSrc = document.createElement("source");
    vidSrc.src = manifest[0];
    vidSrc.type = "video/mp4";
    video.appendChild(vidSrc);
    video.play();
};

var loadComplete = function(method){
    dLog("Load complete via " + method);
};

var dLog = function(msg){
    debugMsg.innerHTML += "<br>" + msg;
};

var clearDebug = function(event){
    event && event.preventDefault();
    debugMsg.innerHTML = "";
};