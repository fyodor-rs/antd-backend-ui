import {
    Storage
  }
  from '@/utils/storage';
const myUploadFn = (param) => {
    let storage = new Storage();
    let name = storage.getItem('nickname')
    let token = storage.getItem(name ? name.value : null);
    const serverURL = '/server/post/file'
    const xhr = new XMLHttpRequest
    const fd = new FormData()
  
    const successFn = (response) => {
      const file=JSON.parse(xhr.responseText);
      param.success({
        url: file.data.url,
        meta: {
          id: file.data.size,
          title:  file.data.originalname,
          alt: file.data.originalname,
        //   loop: true, // 指定音视频是否循环播放
        //   autoPlay: true, // 指定音视频是否自动播放
        //   controls: true, // 指定音视频是否显示控制栏
        //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    }
  
    const progressFn = (event) => {
      param.progress(event.loaded / event.total * 100)
    }
    const errorFn = (response) => {
      param.error({
        msg: 'unable to upload.'
      })
    }
    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)
    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    if(token){
       xhr.setRequestHeader('Authorization','Bearer ' + token.value)
    }
    xhr.send(fd)
  }
  export default myUploadFn