import TimestampManager from './TimestampManager.js';
import {formatTime} from './utils.js';

export default class VideoPlayer {
  constructor(){
    this.timestampManager = new TimestampManager({onRewind : this.setTime.bind(this)});
    //technical field needed for correct work of progressbar
    this.isPlaying = false;

    //initialize the fields for storing elements of the component
    this.video = document.querySelector('.armas-videoplayer__video');
    this.mainBtn = document.querySelector('.video-controls__main-btn');
    this.progressBar = document.querySelector('.video-controls__progress');
    this.currentTime = document.querySelector('.video-controls__current');
    this.addTimestampBtn = document.querySelector('.video-controls__add-timestamp');

    //This function is to be added and removed as an event listener multiple times,
    //so there is a need to bind it permanently
    this.updateProgress = this.updateProgress.bind(this);

    //-------EVENT LISTENERS--------
    this.video.addEventListener('durationchange', () => {
      document.querySelector('.video-controls__duration').textContent = formatTime(this.video.duration)
    });

    this.mainBtn.addEventListener('click', this.onMainButtonPressed.bind(this));

    this.video.addEventListener('timeupdate', this.updateProgress);

    this.progressBar.addEventListener('changestart', (e)=>{
      this.video.pause();
      //if not removed it overrides the change
      this.video.removeEventListener('timeupdate', this.updateProgress)
    })

    this.progressBar.addEventListener('change', ()=>{
      this.video.currentTime = this.video.duration * this.progressBar.value / 100;
      if (this.isPlaying){
        this.video.play();
      }
      this.video.addEventListener('timeupdate', this.updateProgress);
    });

    this.addTimestampBtn.addEventListener('click', this.addTimestamp.bind(this));

    document.querySelector('.video-controls__timestamps').addEventListener('click', (e) => {
      /* if(e.target.classList.contains('timestamp'))
        e.target.classList.toggle('timestamp_selected') */
      if(e.target.classList.contains('timestamp')){
        this.timestampManager.closeEditor();
        this.timestampManager.openEditor(e.target);
      }
    })
  }

  pause(){
    this.isPlaying = false;
    this.mainBtn.classList.remove('video-controls__main-btn_pause');
    this.mainBtn.classList.add('video-controls__main-btn_play');
    this.video.pause();
  }

  play(){
    this.isPlaying = true;
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
    this.timestampManager.addTimestamp(percent, this.video.currentTime);
  } 

  setTime(seconds){
    this.video.currentTime = seconds;
    this.updateProgress();
  }

  reset() {
    document.querySelector('.video-controls__timestamps').innerHTML = '';
    this.timestampManager.reset();
    this.progressBar.value = 0;
  }
}