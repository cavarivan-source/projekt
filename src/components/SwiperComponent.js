// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import FeaturedImg from './zadaci/FeaturedImg';

export default ({posts}) => {
  console.log(posts);
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
        {posts.map((post) => {
            return (<SwiperSlide><FeaturedImg post={post} size="medium" fallback={"https://placehold.co/600x400"}></FeaturedImg></SwiperSlide>)
        })}

    </Swiper>
  );
};