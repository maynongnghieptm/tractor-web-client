import React, { useState, useEffect } from "react";
import './loading.css'

const DEGEngine = (props) => {
  const { data, id } = props;

  const easing = "cubic-bezier(0.5, 1, 0.89, 1)";
  const duration = 500;

  const easeReversal = (y) => {
    return 1 - Math.sqrt((y - 1) / -1);
  };

  const [currentPercentageState, setCurrentPercentageState] = useState(0);

  const animate = (percentage) => {
    const blindClass = `blind.${id}`;

    let threshold = currentPercentageState / percentage < 0;


    if (!threshold && percentage !== 0) {
      let blind = percentage < 0 ? "left" : "right";
      const blindElement = document.querySelector(`.${blindClass}.${blind}`);
      // console.log(`.${blindClass}.${blind}`)
      if (blindElement) {
        blindElement.animate(
          [
            {
              transform: `translateX(${currentPercentageState}%)`,
              easing: easing,
            },
            {
              transform: `translateX(${percentage}%)`,
            },
          ],
          {
            fill: "forwards",
            duration: duration,

          }
        );
      }
    } else {
      let firstBlind = percentage < 0 ? "right" : "left";
      let secondBlind = percentage < 0 ? "left" : "right";

      let delta = Math.abs(currentPercentageState - percentage);
      let firstTravel = Math.abs(currentPercentageState / delta);
      let secondTravel = Math.abs(1 - firstTravel);



      const firstBlindElement = document.querySelector(`.${blindClass}.${firstBlind}`);
      const secondBlindElement = document.querySelector(`.${blindClass}.${secondBlind}`);

      firstBlindElement.animate(
        [
          {
            transform: `translateX(${currentPercentageState}%)`,
            easing: easing,
          },
          {
            transform: `translateX(${percentage}%)`,
          },
        ],
        {
          fill: "forwards",
          duration: duration,
          iterations: Math.max(0, Math.abs(easeReversal(firstTravel))),

        }
      );

      secondBlindElement.animate(
        [
          {
            transform: `translateX(${currentPercentageState}%)`,
            easing: easing,
          },
          {
            transform: `translateX(${percentage}%)`,
          },
        ],
        {
          fill: "forwards",
          duration: duration,
          iterationStart: Math.max(0, Math.abs(easeReversal(firstTravel))),
          iterations: Math.max(0, 1 - Math.abs(easeReversal(firstTravel))),
          delay: duration * Math.max(0, Math.abs(easeReversal(firstTravel))),

        }
      );
    }

    setCurrentPercentageState(percentage);
  };

  useEffect(() => {
    animate(data);
  }, [data]);

  return (
    <div className={`wrapper ${id}`}>
      <div className={`blind ${id} right`}></div>
      <div className={`blind ${id} left`}></div>

    </div>
  );
};
export default DEGEngine;
