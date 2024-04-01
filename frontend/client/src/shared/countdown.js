import React, { useEffect, useState } from 'react';

function Countdown({ releaseDay, releaseTime, timezone }) {
  // Adjust releaseDay to match the keys in dayMapping
  const adjustedReleaseDay = releaseDay.slice(0, -1); // Remove the "s" to match "Friday"

  const [countdown, setCountdown] = useState(calculateCountdown(adjustedReleaseDay, releaseTime, timezone));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown(adjustedReleaseDay, releaseTime, timezone));
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [adjustedReleaseDay, releaseTime, timezone]);

  function calculateCountdown(day, time, zone) {
    const now = new Date();
    const releaseDate = getNextReleaseDate(now, day, time, zone);

    const timeDifference = releaseDate - now;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function getNextReleaseDate(currentDate, releaseDay, releaseTime, timezone) {
    const dayMapping = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const releaseDate = new Date(currentDate);
    const currentDay = currentDate.getDay();
    const targetDay = dayMapping[releaseDay];
    const daysUntilNextRelease = targetDay - currentDay + (targetDay < currentDay ? 7 : 0);

    releaseDate.setDate(currentDate.getDate() + daysUntilNextRelease);
    releaseDate.setHours(...releaseTime.split(':'), 0, 0);

    const releaseDateInTimezone = convertToTimezone(releaseDate, timezone);

    return releaseDateInTimezone;
  }

  function convertToTimezone(date, timezone) {
    const options = { timeZone: timezone };
    return new Date(date.toLocaleString('en-US', options));
  }

  return <p>{countdown}</p>;
}

export default Countdown;