import * as React from "react"

export function VotdPage() {
  const [shape, setShape] = React.useState("16x9");

  const getShape = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = width / height;

    const diff1x1 = Math.abs(ratio - 1);
    const diff16x9 = Math.abs(ratio - 1.777);
    const diff9x16 = Math.abs(ratio - 0.5625);
    let result = "1x1";
    if (diff16x9 < diff1x1) result = "16x9";
    else if (diff9x16 < diff1x1) result = "9x16"
    setShape(result);
    //return result;
  }

  const getDayOfYear = () => {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now.getTime() - start.getTime();
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    return day;
  }

  window.addEventListener("resize", getShape)
  React.useEffect(getShape, []);

  const day = getDayOfYear();
  return (
    <img src={"https://livechurchsolutions.github.io/VotdContent/v1/" + day + "/" + shape + ".jpg"} className="full-frame" alt="Verse of the Day" />
  )
}
