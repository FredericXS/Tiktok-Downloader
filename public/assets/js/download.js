const axios = require('axios');
const fs = require('fs');
const https = require('https');

function downloadURL(url) {
  const urlApi = `https://api19-core-useast5.us.tiktokv.com/aweme/v1/feed/?aweme_id=${url}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9`;

  // Getting url data
  axios.get(urlApi)
  .then(result => {
    // Getting video no-watermark url
    const video_props = result.data.aweme_list[0].video.play_addr;
    const urlNoWaterMark = video_props.url_list[0];
    
    // Downloading video
    saveFile(urlNoWaterMark);
  })
  .catch(err => console.log(err));
}

function saveFile(fileUrl) {
  const file = fs.createWriteStream('video.mp4');

  const request = https.get(fileUrl, res => {
    res.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log('Video saved successfully!');
    });
  });
}

module.exports = downloadURL;