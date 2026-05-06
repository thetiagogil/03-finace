import { PiArrowsLeftRightThin, PiChartLineThin, PiLayoutThin } from "react-icons/pi";

const iconSize = 20;

export const linksArray = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icons: {
      icon: <PiLayoutThin size={iconSize} />,
      iconSelected: <PiLayoutThin size={iconSize} />
    }
  },
  {
    title: "Overview",
    path: `/overview`,
    icons: {
      icon: <PiChartLineThin size={iconSize} />,
      iconSelected: <PiChartLineThin size={iconSize} />
    }
  },
  {
    title: "Activity",
    path: "/activity",
    icons: {
      icon: <PiArrowsLeftRightThin size={iconSize} />,
      iconSelected: <PiArrowsLeftRightThin size={iconSize} />
    }
  }
];
