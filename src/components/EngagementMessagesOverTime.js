import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { channels } from "../constants/channels";
import { messageCountList } from "../constants/messageCountList";
import engagementHelper from "../utils/EngagementHelper";

const EngagementMessagesOverTime = () => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
