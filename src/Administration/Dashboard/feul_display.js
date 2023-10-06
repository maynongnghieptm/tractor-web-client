import React from "react";
import GaugeChart from "react-gauge-chart";

const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

const Dial = ({ id, value, title }) => {
  let percent = value / 100;

  // Tính toán giá trị arcStart và arcEnd
  const arcStart = 330; // Góc bắt đầu
  const arcEnd = 20;   // Góc kết thúc
  const arcSweep = arcEnd > arcStart ? arcEnd - arcStart : 360 - arcStart + arcEnd; // Góc quét

  return (
    <div style={styles.dial}>
<GaugeChart
  id={id}
  nrOfLevels={30}
  colors={["#00cccc", "#00ffff", "#ff0000"]}
  arcWidth={0.5}
  percent={percent}
  textColor={"#FFFFFF"}
  arcsLength={[0.25, 0.5, 0.25]} // Chỉ hiển thị 1/4 cung tròn
  formatTextValue={(value) => value}
  arcPadding={0.1}
  cornerRadius={3}
/>
      <div style={styles.title}>{title}</div>
    </div>
  );
};

export default Dial;
