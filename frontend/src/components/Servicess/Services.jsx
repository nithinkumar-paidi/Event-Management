import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./services.css"

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      url: "/birthDay.webp",
      title: "Birthday Planning",
      link: "/birthday",
    },
    {
      id: 2,
      url: "/parties.jpg",
      title: "Anniversary Planning",
      link: "/anniversary"
    },
    {
      id: 3,
      url: "/camping.jpg",
      title: "Camping Trip Planning",
      link: "/camping"
    },
    {
      id: 4,
      url: "/nightGames.webp",
      title: "Game Night Planning",
      link: "/gamenight"
    },
    {
      id: 5,
      url: "/party.jpg",
      title: "Party Planning",
      link: "/party"
    },
    {
      id: 6,
      url: "/wedding.jpg",
      title: "Wedding Planning",
      link: "/wedding"
    },
  ];

  const handleClick = (link, e) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <div id="services" className="services container">
      <h2>OUR SERVICES</h2>
      <div className="banner">
        {services.map((element) => (
          <div className="item" key={element.id} onClick={(e) => handleClick(element.link, e)}>
            <h3>{element.title}</h3>
            <img src={element.url} alt={element.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;