import {
  FiMapPin,
  FiHome,
  FiHeart,
  FiPlus,
  FiBriefcase,
} from "react-icons/fi";

import { FaCarSide } from "react-icons/fa";

function Future() {
  const plans = [
  {
    icon: <FiMapPin />,
    category: "TRAVEL",
    title: "See the World Together",
    text: `I really want us to travel, my love. I want to start somewhere close to the Philippines, like Thailand or Vietnam, just like you suggested.

And further into our future, I want Japan for the thrifting and food, the EU and UK for the castles and scenery — and, of course, all the Bridgerton stuff.

Once we're finally together, I'd also love for us to take one long road trip across the US. Just us, a car, and way too many stops along the way.`,
  },

  {
    icon: <FiHome />,
    category: "HOME",
    title: "A Place That's Ours",
    text: `I would most definitely surrender all of my home-designing rights to you once we get there lol.

All I ask for is a backyard where Hera and Hestia can run around — and one day, our future kids too. Maybe a pool if we get rich, a garage where I can work on our cars, and one requirement that is absolutely non-negotiable:

A game room for us. `,
  },

  {
    icon: <FaCarSide />,
    category: "CARS",
    title: "Our Dream Garage",
    text: `I hope one day we get something fun for us — maybe a Camaro, or even a classic Skyline or Supra. Something that can be our daily, our date car, or just the car we take out because we feel like it.

Then we'll need a bigger pickup or SUV as our family car, with enough room for our future kids, Hera, and Hestia when we go on those road trips together.`,
  },

  {
    icon: <FiBriefcase />,
    category: "CAREER",
    title: "Something That Makes Us Happy",
    text: `I hope you find something that genuinely makes you happy, babe. A career that feels fulfilling to you, where you're not only there for the money.

For me, IT feels like that middle ground. I enjoy it, and I know it can give us more opportunities down the road.

Whatever we both end up doing, I hope we're able to build lives we're proud of while still having enough time left to actually enjoy them together.`,
  },

  {
    icon: <FiHeart />,
    category: "US",
    title: "Keep Growing Together",
    text: `More than anything, I want our relationship to keep growing stronger.

I want us to understand each other more and learn how to love each other as the imperfect people we both are. I know I still have things to work on myself, especially becoming defensive during arguments, and I want to keep working on those things for us.

I also hope we keep finding more things we genuinely enjoy doing together beyond gaming and watching TV — although, to be fair, those options are a little limited while we're still long-distance.

There's still so much of life we haven't gotten to experience side by side yet. `,
  },
];

  return (
    <div className="future-app">
      <div className="future-header">
        <p className="app-kicker">WHAT'S NEXT</p>
        <h2>Our Future</h2>
        <p>
          Things I'm looking forward to doing with you.
        </p>
      </div>

      <div className="future-grid">
        {plans.map((plan, index) => (
          <div className="future-card" key={index}>
            <div className="future-card-icon">
              {plan.icon}
            </div>

            <div className="future-card-content">
              <span>{plan.category}</span>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
            </div>
          </div>
        ))}

        <div className="future-card future-more">
          <FiPlus />

          <div>
            <span>TO BE CONTINUED</span>
            <h3>And everything we haven't planned yet.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Future;