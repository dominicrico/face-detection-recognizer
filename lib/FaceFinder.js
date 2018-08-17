const cv = require('opencv4nodejs')
const path = require('path')

export default class FaceFinder {

  constructor() {
    this.foundFaces = 0
    this.foundRects = null
    this.classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2)
    // this.recognizer = new cv.FisherFaceRecognizer()
  };

  detectFaces = (frame) => {
    // Find faces in current frame

    frame = frame.replace('data:image/png;base64,', '')
    frame = Buffer.from(frame, 'base64');

    try {
      this.baseFrame = cv.imdecode(frame, 1)
      this.frame = cv.imread(path.join(__dirname, '../public/got.jpg'))
      console.log(this.frame, this.baseFrame)
      const opts = {
        minSize: new cv.Size(100, 100),
        scaleFactor: 1.4,
        minNeighbors: 10
      };

      const found = this.classifier.detectMultiScale(this.baseFrame.bgrToGray())

      this.foundRects = found.objects
      this.foundFaces = found.numDetections
      if (this.foundFaces.lenght && this.foundRects.length) {
        return this.foundRects
      } else {
        return null
      }
    } catch (e) {
      console.log(e)
    }
  };

  recognizeFace = () => {
    // Check if we allready know that face

  };

  addNewFace = () => {
    // Save an image of that face to recognize it

  };

}
