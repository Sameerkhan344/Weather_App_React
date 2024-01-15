import React, { useState } from "react";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind from "../assets/wind.png";
import axios from "axios";

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);
  const searchHandler = async () => {
    let api_key = "aed268d6f3949d6bc81ef01e6efcd6f9";

    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    try {
      let response = await axios.get(url);
      let { data } = response;

      console.log(data);
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      temprature[0].innerHTML = Math.floor(data.main.temp) + "°c";
      location[0].innerHTML = data.name;
      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container w-full h-max md:h-[829px] lg:h-[829px] xl:h-[829px] md:w-[607px] lg:w-[607px] xl:w-[607px] m-auto md:mt-[75px] rounded-[12px] bg-gradient-to-b from-purple-600 to-blue-600 ">
        <div className="weather_img mt-[29px] flex justify-center">
          <img
            src={wicon}
            alt=""
            className="h-[150px] md:h-[180px] lg:h-[180px] xl:h-[180px]"
          />
        </div>
        <div className="weather-temp flex justify-center text-white text-[70px] md:text-[100px] lg:text-[100px] xl:text-[100px] font-normal">
          24°c
        </div>
        <div className="weather-location flex justify-center text-white text-[50px] md:text-[80px] lg:text-[80px] xl:text-[80px] font-normal">
          London
        </div>
        <div className="data-container mt-[30px] md:mt-[80px] lg:mt-[80px] xl:mt-[80px] text-white flex justify-center">
          <div className="element m-auto flex content-start gap-[12px]">
            <img src={humidity} className="icon mt-[10px]" alt="" />
            <div className="data text-[34px] font-normal">
              <div className="humidity-percent">64</div>
              <div className="text text-[25px] font-normal">Humidity</div>
            </div>
          </div>
          <div className="element m-auto flex content-start gap-[12px]">
            <img src={wind} className="icon mt-[10px]" alt="" />
            <div className="data text-[34px] font-normal">
              <div className="wind-rate">18 km/h</div>
              <div className="text text-[25px] font-normal">Wind Speed</div>
            </div>
          </div>
        </div>
        <div className="top-bar flex justify-center gap-[14px] py-[50px] md:py-[70px] lg:py-[70px] xl:py-[70px]">
          <input
            type="text"
            className="cityInput flex w-[280px] md:w-[400px] lg:w-[400px] xl:w-[400px] h-[70px] md:h-[78px] lg:h-[78px] xl:h-[78px] bg-[#ebfffc] border-none outline-none rounded-[40px] pl-[40px] text-[#626262] text-[20px] font-normal"
            placeholder="Search"
          />
          <div
            className="search-icon flex justify-center items-center w-[70px] md:w-[78px] lg:w-[78px]  h-[70px] md:h-[78px] lg:h-[78px] xl:h-[78px] bg-[#ebfffc] rounded-[40px] cursor-pointer"
            onClick={() => {
              searchHandler();
            }}
          >
            <img src={search} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
