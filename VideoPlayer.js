class VideoPlayer {
  constructor(){
    this.timestampManager = new TimestampManager();
    this.isPlaying = false;
    this.video = document.querySelector('.armas-videoplayer__video');
    this.mainBtn = document.querySelector('.video-controls__main-btn');
    this.progressBar = document.querySelector('.video-controls__progress');
    this.currentTime = document.querySelector('.video-controls__current');
    this.addTimestampBtn = document.querySelector('.video-controls__add-timestamp');
    this.video.addEventListener('durationchange', () => {
      document.querySelector('.video-controls__duration').textContent = formatTime(this.video.duration)
    });
    this.mainBtn.addEventListener('click', this.onMainButtonPressed.bind(this));
    this.video.addEventListener('timeupdate', this.updateProgress.bind(this));
    this.progressBar.addEventListener('change', ()=>{
      this.video.currentTime = this.video.duration * this.progressBar.value / 100;
    });
    this.addTimestampBtn.addEventListener('click', this.addTimestamp.bind(this));
  }

  pause(){
    this.mainBtn.classList.remove('video-controls__main-btn_pause');
    this.mainBtn.classList.add('video-controls__main-btn_play');
    this.video.pause();
  }

  play(){
    this.mainBtn.classList.remove('video-controls__main-btn_play');
    this.mainBtn.classList.add('video-controls__main-btn_pause');
    this.video.play();
  }

  onMainButtonPressed(){
    if (this.video.paused){
      this.play();
    } else {
      this.pause();
    }
  }

  updateProgress(){
    this.progressBar.value = this.video.currentTime / this.video.duration * 100;
    this.currentTime.textContent = formatTime(this.video.currentTime);
  }

  addTimestamp(){
    const percent = this.video.currentTime / this.video.duration * 100;
    console.log('percent : ' + percent)
    this.timestampManager.addTimestamp(percent);
  }
}

function formatTime(secondsNumber){
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let seconds = Math.floor(secondsNumber % 60);
  return `${hours ? hours + ':' : ''}${minutes ? minutes : '0'}:${seconds > 9 ? seconds : '0' + seconds}`;
}

document.querySelector('.video-controls__timestamps').addEventListener('click', (e) => {
  if(e.target.classList.contains('timestamp'))
    e.target.classList.toggle('timestamp_selected')
})