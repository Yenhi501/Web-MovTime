import React from 'react';
import { Carousel } from 'antd';
import './index.scss'

const images = [
  'https://static2.vieon.vn/vieplay-image/promotion_banner/2024/05/22/au1qvk6a_homebanner_khanhdunienweb_2388x3712_2388_458.jpg',
  'https://static2.vieon.vn/vieplay-image/promotion_banner/2024/05/23/kmmab8k0_web18ce19a0c0167a03a57e2b4bd93f5dd15_2388_458.jpg',
  'https://static2.vieon.vn/vieplay-image/promotion_banner/2024/05/27/9ex8qx1n_7nam_hb_web_2388_458.jpg',
  'https://static2.vieon.vn/vieplay-image/promotion_banner/2024/05/16/n9htjg31_web_2388_458.png',
  'https://static2.vieon.vn/vieplay-image/promotion_banner/2024/04/19/iw982h39_qvs8_hb_web32281ddbbe9229b71a49d07205f62923_2388_458.jpg'
];

const SlideShow = () => {
  return (
    <Carousel autoplay arrows className='mb-10'>
    {images.map((url, index) => (
      <div  className='px-20'key={index}>
        <img src={url} alt={`slide-${index}`} className="slide-image" />
      </div>
    ))}
  </Carousel>
  );
}

export default SlideShow;
