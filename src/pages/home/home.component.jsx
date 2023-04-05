import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";

export default function Home() {
  const categories = [
    {
      id: 1,
      title: "Hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      url: "/shop/hats",
    },
    {
      id: 2,
      title: "Jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      url: "/shop/jackets",
    },
    {
      id: 3,
      title: "Sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      url: "/shop/sneakers",
    },
    {
      id: 4,
      title: "Women",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      url: "/shop/womens",
    },
    {
      id: 5,
      title: "Men",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      url: "/shop/mens",
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
}
