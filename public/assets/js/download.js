const axios = require('axios');
const fs = require('fs');
const https = require('https');

function downloadURL(url) {
  axios.get(url).then(res => {
    const pathname = res.request._redirectable._options.pathname;
    const videoId = pathname.match(/\/video\/(\d+)/)[1];
    const urlApi = `https://api19-core-useast5.us.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}&version_code=262&app_name=musical_ly&channel=App&device_id=null&os_version=14.4.2&device_platform=iphone&device_type=iPhone9`;

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

    axios.get(urlApi)
    .then(result => {
      const video_props = result.data.aweme_list[0].video.play_addr;
      const urlNoWaterMark = video_props.url_list[0];
      saveFile(urlNoWaterMark);
    })
    .catch(err => console.log(err));
    })
  .catch(err => console.log(err));
}

module.exports = downloadURL;
