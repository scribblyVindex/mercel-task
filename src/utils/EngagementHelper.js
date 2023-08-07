const chartOptions = {
  chart: {
    backgroundColor: "#22222c",
    type: "spline",
  },
  title: { text: "" },
  plotOptions: {
    series: {
      connectNulls: true,
      color: "cyan",
    },
  },

  xAxis: {
    allowDecimals: false,
    labels: {
      step: 1,
      style: {
        color: "grey",
      },
    },
    lineColor: "grey",
    plotLines: [
      {
        color: "grey",
        width: 2,
        value: 1665964800000,
      },
    ],
    type: "datetime",
    title: {
      text: "",
    },
  },
  yAxis: {
    labels: {
      style: {
        color: "grey",
      },
    },
    gridLineWidth: 0,

    title: {
      text: "",
    },
  },
  series: [],
  legend: {
    itemStyle: {
      color: "grey",
    },
  },
};

function getDatesBetween(datesArray) {
  let startDate = new Date(Math.min.apply(null, datesArray));
  let endDate = new Date(Math.max.apply(null, datesArray));

  const currentDate = new Date(startDate.getTime());
  const dates = [];
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    // Filtering channels
    const channelsWithMultipleDates = channels.filter((channel) => {
      const channelMessageCounts = messageCountList.filter(
        (message) => message.channelId === channel.value
      );

      return channelMessageCounts.length > 1;
    });

    // data
    const seriesData = channelsWithMultipleDates.map((channel) => {
      const channelMessageCounts = messageCountList.filter(
        (message) => message.channelId === channel.value
      );

      let allDates = getDatesBetween(
        channelMessageCounts.map((count) => new Date(count.timeBucket))
      );

      const data = allDates.map((date) => {
        let yValue = channelMessageCounts.find((message) => {
          return new Date(message.timeBucket).getTime() === date.getTime();
        })?.count;

        let obj = { x: date.getTime() };
        obj.y = parseInt(yValue || null);

        return obj;
      });

      return {
        name: channel.name,
        data: data,
      };
    });

    // options
    const options = { ...chartOptions, series: seriesData };

    return options;
  },
};

export default EngagementHelper;
