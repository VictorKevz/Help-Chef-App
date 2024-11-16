import chickenBg from "../../../../assets/images/home/hero/carousel/chicken-bg.svg"
import chickenImg from "../../../../assets/images/home/hero/carousel/chicken-img.svg"
import dessertBg from "../../../../assets/images/home/hero/carousel/dessert-bg.svg";
import dessertImg from "../../../../assets/images/home/hero/carousel/dessert-img.svg";
import breakfastBg from "../../../../assets/images/home/hero/carousel/breakfast-bg.svg";
import breakfastImg from "../../../../assets/images/home/hero/carousel/breakfast-img.svg";

import pastaBg from "../../../../assets/images/home/hero/carousel/pasta-bg.svg";
import pastaImg from "../../../../assets/images/home/hero/carousel/pasta-img.svg";
import vegBg from "../../../../assets/images/home/hero/carousel/veg-bg.svg";
import vegImg from "../../../../assets/images/home/hero/carousel/veg-img.svg";

export const carouselData = [
    {
        id: 0,
        heading: "All Your Favorite Desserts in One Place!",
        tagline: "Satisfy your sweet cravings",
        cta: "/categories/Dessert",
        textBg: dessertBg,
        imgBg: dessertImg
    },
    {
        id: 1,
        heading: "Rise and Shine with Delicious Breakfasts!",
        tagline: "Start your day with a tasty boost",
        cta: "/categories/Breakfast",
        textBg: breakfastBg,
        imgBg: breakfastImg
    },
    {
        id: 2,
        heading: "Irresistible Chicken Recipes Await!",
        tagline: "Perfect for every occasion",
        cta: "/categories/Chicken",
        textBg: chickenBg,
        imgBg: chickenImg
    },
    
    {
        id: 3,
        heading: "Indulge in Rich, Authentic Pasta Flavors!",
        tagline: "Taste Italy from your home",
        cta: "/categories/Pasta",
        textBg: pastaBg,
        imgBg: pastaImg
    },
    {
        id: 4,
        heading: "Explore Flavorful Vegetarian Meals!",
        tagline: "Nutritious and delicious",
        cta: "/categories/Vegetarian",
        textBg: vegBg,
        imgBg: vegImg
    },
];