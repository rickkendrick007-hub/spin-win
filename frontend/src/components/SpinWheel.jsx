import { Wheel } from "react-custom-roulette";
import { useEffect, useState } from "react";

export default function SpinWheel({ offers, winningOffer, onStop }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

//   useEffect(() => {
//     if (winningOffer) {
//       const index = offers.findIndex(
//         (o) => o.option === winningOffer
//       );
//       setPrizeNumber(index);
//       setMustSpin(true);
//     }
//   }, [winningOffer]);

  useEffect(() => {
  if (winningOffer && !mustSpin) {
    const index = offers.findIndex(
      (o) => o.option === winningOffer
    );
    setPrizeNumber(index);
    setMustSpin(true);
  }
}, [winningOffer]);


  return (
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={offers}
      backgroundColors={["#6C63FF", "#FF6584"]}
      textColors={["#ffffff"]}
      outerBorderColor="#ddd"
      outerBorderWidth={8}
      innerRadius={20}
      radiusLineColor="#ffffff"
      radiusLineWidth={2}
      fontSize={14}
      onStopSpinning={() => {
        setMustSpin(false);
        onStop();
      }}
    />
  );
}
