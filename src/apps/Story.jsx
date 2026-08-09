function Story() {
  const events = [

  {
    date: "August 9, 2024",
    title: "The First Time I Came Home to You",
    text: `The first time I arrived. I remember being so nervous when I stepped off the plane and started walking through the halls of T3. I was so conscious of whether I looked presentable or if I looked good. I'll never forget the excitement and anticipation I felt knowing I was finally about to meet you for the very first time.`,
    image: "/photos/prep.jpg",
  },
  {
    date: "September 27, 2024",
    title: "Our First Beach Trip",
    text: `One of the most unforgettable experiences for me. I felt on top of the world being with you and getting to enjoy one of the things we both find so much joy in — the beach. It was our first beach trip together, and I'll always remember it.`,
    image: "/photos/launion.jpg",
  },
  {
    date: "October 14, 2024",
    title: "The Day You Made Me the Happiest Man",
    text: `Most definitely one of the most bittersweet moments in our relationship. I held onto that ring for too long because I was hesitant to propose, and I missed what would've been the perfect timing — I should've done it at La Union. I remember how heavy everything felt knowing I would be leaving soon, but despite the circumstances, you made me the happiest man on Earth that day.`,
    image: "/photos/ring.jpg",
  },
  {
    date: "February 14, 2025",
    title: "And Then Came Hera",
    text: `And then came the little girl — golden and sweet, yet somehow acts like a dinosaur. I knew you felt alone and sad in your room, especially when Naynay left. I wanted to give you a companion who could ease some of that loneliness. And so, Hera became part of our little family.`,
    image: "/photos/hera.jpg",
  },
  {
    date: "August 10, 2025",
    title: "Our First Anniversary",
    text: `Our first anniversary. It was really hard being so far away from each other. I remember sending you a bouquet and that letter puzzle that took you SO long to finish lol. And of course, I still remember the Netflix-inspired poster I sent you. Even from far away, I wanted that day to feel special.`,
    image: "/photos/puzzle.jpg",
  },
  {
    date: "September 9, 2025",
    title: "Coming Home to You Again",
    text: `My second time going home. I remember our first pasabuy service, all the stuff I bought for you, and the tumbler, stuffed toy, and cap I bought for Hera that didn't even last her a day. I was so tired from the flight, but none of that mattered because I was finally with you again. I even remember us having Jollibee that night. I missed you so much, my sweet. I yearn to be with you again soon.`,
    image: "/photos/2home.jpg",
  },
  {
    date: "September 10, 2025",
    title: "Our First Car Together",
    text: `The day we picked up the Subaru — our very first car together. I loved that car, and I'll always miss driving for you in something that was ours. It was such a special feeling finally having our own car together.

And then I crashed it in the parking lot on the same day AHAHAHAHAHAHA.`,
    image: "/photos/subaru.jpg",
  },
  {
    date: "October 10, 2025",
    title: "Our Ravine Getaway",
    text: `Our Ravine getaway. That place was nice, baby. I had so much fun with the little aerial obstacle course, even though I struggled for a bit. It sucked that it rained and we couldn't finish the rest of the activities they offered, but I still loved being there with you.

I also loved this photo I took of you — it looked so aesthetic to me. And I definitely remember being so horny that day because it was finally just the two of us, without Hera jumping onto the bed while we were trying to do something. `,
    image: "/photos/ravine.jpg",
  },
  {
    date: "December 12, 2025",
    title: "Your Birthday",
    text: `The first birthday I actually got to spend with you. I remember setting up the spare room at Maricielo with the flying-lantern-inspired design I wanted for your birthday. I wanted you to feel special because I don't get to be beside you for every birthday — at least, not yet.

I wish I could be with you on your birthdays, our anniversaries and monthsaries, on the days you miss me or need me, and on every ordinary day for the rest of our lives.`,
    image: "/photos/bday.jpg",
  },
  {
    date: "January 1, 2026",
    title: "Our First New Year Together",
    text: `Our first New Year together. I remember our dinner the night before. It was simple because we were broke after taking a loss on the car, and everything had to be budgeted already.

But I was happy. Even if we were broke, as long as I got to be with you and Hera, I was content. That's one of those memories that reminds me that I don't need much to be happy when I'm with you.`,
    image: "/photos/newyear2.jpg",
  },
  {
    date: "February 26, 2026",
    title: "Welcome, Hestia",
    text: `The day Hestia came — probably the most well-behaved dog I've ever seen... although maybe not when they eat. I look forward to finally meeting her too.

Hera seems so happy nowadays, and I don't think she ever gets bored anymore. With those two, it's always playing time. Our little family got a little bigger.`,
    image: "/photos/hestia.jpg",
  },
];

  return (
    <div className="story-app">
      <div className="story-header">
        <p className="app-kicker">OUR STORY</p>
        <h2>How We Got Here</h2>
        <p>
          The events that happened in our relationship.
        </p>
      </div>

      <div className="timeline">
        {events.map((event, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-marker">
              <span></span>
            </div>

            <div className="timeline-card">
              <img src={event.image} alt={event.title} />

              <div className="timeline-content">
                <span className="timeline-date">
                  {event.date}
                </span>

                <h3>{event.title}</h3>

                <p>{event.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Story;