import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
} from 'reactstrap';

const items = [
    <div className='company' style={{width:"384px", height:"335px"}}>
        <img src='https://picsum.photos/id/123/1200/400'/>
        <div>
            안녕하세요
        </div>
    </div>
//   {
//     src: 'https://picsum.photos/id/123/1200/400',
//     altText: 'Slide 1',
//     caption: 'Slide 1',
//     key: 1,
//   },
//   {
//     src: 'https://picsum.photos/id/456/1200/400',
//     altText: 'Slide 2',
//     caption: 'Slide 2',
//     key: 2,
//   },
//   {
//     src: 'https://picsum.photos/id/678/1200/400',
//     altText: 'Slide 3',
//     caption: 'Slide 3',
//     key: 3,
//   },
//   {
//     src: 'https://picsum.photos/id/678/1200/400',
//     altText: 'Slide 3',
//     caption: 'Slide 3',
//     key: 3,
//   },
];

const CompanyList =() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };



  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div><img src={item.src}/></div>
        {/* <img src={item.src} alt={item.altText} style={{ width: '100%', height: 'auto' }}/>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      style={{width:"1200px", height:"335px"}}
    >
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default CompanyList;