class TimestampManager{
  constructor(){
    this.offsets = this.initializeOffsets();
    /* this.nextIndex = 0; */
    this.container = document.querySelector('.video-controls__timestamps');
    /* this.timestamps = timestamps.map((data)=>{
      const element = this.addTimestamp(data);
      return{
        ...data,
      }
    }) */
  }

  initializeOffsets(){
    const progress = document.querySelector('.video-controls__progress');
    const player = document.querySelector('.armas-videoplayer');
    const progressBox = progress.getBoundingClientRect();
    const playerBox = player.getBoundingClientRect();
    const offsets = {
      start : progressBox.left - playerBox.left + 10,
      end : progressBox.right - playerBox.left - 8,
      length : progressBox.right - progressBox.left
    }
    console.log(offsets);
    return offsets;
  }

  getTimestampOffset(percent){
    const offset =  this.offsets.start + percent * this.offsets.length / 100;
    console.log('offset : ' + offset);
    return offset;
  }

  addTimestamp(percent){
    console.log(percent);
    let timestamp = document.createElement('li');
    timestamp.classList.add('timestamp');
    timestamp.style.left = this.getTimestampOffset(percent) + 'px';
    this.container.insertAdjacentElement('beforeend', timestamp);
  }
}