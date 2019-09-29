class ImgBuf {
  constructor ({handler}) {
    this.handler = handler;
    this.reset();
  }

  reset() {
    this.lastImageArr = [];
    this.lastImageBytesLength = -1;
    this.lastImageBytesLeft = 0;
  }

  pushToArr(imageBuffer) {
    const imgBufferLength = imageBuffer.length;
    this.lastImageArr.push(imageBuffer);
    this.lastImageBytesLeft = this.lastImageBytesLeft - imgBufferLength;

    if (this.lastImageBytesLeft <= 0 ) {
      const fullImageBuffer = Buffer.concat(this.lastImageArr);
      this.handler(fullImageBuffer);
      this.reset();
    }
  }

  handleNext(buffer) {
    const bufferLength = buffer.length;
    if (bufferLength <= this.lastImageBytesLeft) {
      this.pushToArr(buffer);
    } else {
      const diff = bufferLength - this.lastImageBytesLeft;
      const imgBuffer = buffer.slice(0, diff);
      const nextBuffer = buffer.slice(diff + 1);

      this.pushToArr(imgBuffer);
      this.newImg(nextBuffer);
    }
  }

  newImg(buffer) {
    this.lastImageArr = [];
    this.lastImageBytesLength = buffer.readUInt32LE();
    this.lastImageBytesLeft = this.lastImageBytesLength;

    const imgBuffer = buffer.slice(ImgBuf.IMG_MSG_LENGTH_BYTES);

    if (imgBuffer.length) {
      this.pushToArr(imgBuffer);
    }
  }

  push(buffer) {
    if (this.lastImageBytesLength < 0) {
      this.newImg(buffer);
    } else {
      this.handleNext(buffer);
    }
  }

  static get IMG_MSG_LENGTH_BYTES() {
    return 4;
  };
}

module.exports = {
  ImgBuf
};
