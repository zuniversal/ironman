import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

import InputCom from '@/components/Widgets/InputCom'; //
import SmartVideo from '@/common/SmartVideo'; //
// import video from '@/static/D37852477_1_2.m3u8';
// console.log(' video ： ', video,  )//

const CsHomeVideo = props => {
  console.log(' CsHomeVideo   props, ,   ： ', props);
  return (
    <div className="csHomeVideo ">
      <SmartVideo
        // src={'https://www.playergogo.com/video.php?url=http://bobo.okokbo.com/20171219/FbHA8ero/index.m3u8'}
        // src={"https://cn7.kankia.com/hls/20191215/f0bdccd9d46df8600c445e8c6b0c3169/1576378697/index.m3u8"}
        src={
          'https://www.playergogo.com/video.php?url=http://bobo.okokbo.com/20171219/FbHA8ero/index.m3u8'
        }
      ></SmartVideo>
    </div>
  );
};

export default CsHomeVideo;
