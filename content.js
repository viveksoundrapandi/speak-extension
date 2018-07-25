var recognition, div;

const init = () => {
  div = document.createElement('div');
  div.className.list = 'live-caption';

  setDivStyle(div);

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-AU";

  recognition.onaudiostart = event => {
    console.log("starting")
  }

  recognition.onresult = event => {
    let last = event.results.length - 1;
    let transcript = event.results[last][0].transcript;
    // let transcript = event.results[0][0].transcript;
    div.textContent = transcript;
    document.body.appendChild(div);
  }

  recognition.onerror = event => {
    console.log("error", event.error)
  }

  recognition.onspeechstart = event => {
    console.log("speech started")
  }

  recognition.onsoundend = event => {
    console.log("sound end")
  }

  recognition.onspeechend = event => {
    console.log("speech end")
  }

  recognition.onaudioend = event => {
    console.log("end")
  }

  recognition.onstop = event => {
    console.log("stop");
  }
}

const startTracking = () => {
  console.log("start");
  recognition.start()
}

const setDivStyle = div => {
  div.style.bottom = '10px';
  div.style.left = 0;
  div.style.textAlign = 'center';
  div.style.backgroundColor = 'rgba(0,0,0,0.8)';
  div.style.position = 'absolute';
  div.style.color = 'white';
  div.style.padding = '10px';
  div.style.fontSize = '16px';
  div.style.width = '50%';
  div.style.transform = 'translate(50%)';
  div.style.border = '2px solid white';
  div.style.borderRadius = "5px";
  div.style.zIndex= "10000";
  div.style.fontFamily = "Arial";
}

const stopTracking = () => {
  console.log("tracking stopped");
  recognition.stop();
  document.body.removeChild(div);
}

init();

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  console.log("something happening from the extension", request.data);

  if(request.data){
    startTracking();
  } else {
    stopTracking();
  }
});
