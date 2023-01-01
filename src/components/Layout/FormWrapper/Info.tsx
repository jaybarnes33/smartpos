import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Info = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider className="flex items-center h-full" {...settings}>
      <div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <Image
              src="/manage.svg"
              alt=""
              width={250}
              height={400}
              style={{ objectFit: "contain" }}
            />
            <h1 className="text-2lg font-bold text-center">Manage your shop</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/stats.svg"
            alt=""
            width={220}
            height={300}
            style={{ objectFit: "contain" }}
          />
          <h1 className="text-2lg font-bold text-center">Track sales</h1>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/go.svg"
            alt=""
            width={200}
            height={300}
            style={{ objectFit: "contain" }}
          />
          <h1 className="text-2lg font-bold text-center">
            View statistics anywhere
          </h1>
        </div>
      </div>
    </Slider>
  );
};

export default Info;
