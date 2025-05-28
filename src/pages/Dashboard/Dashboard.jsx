import { FaArrowRight, FaChevronDown, FaSearchPlus } from "react-icons/fa";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import User from "../../components/User/User";
import Card from "../../components/Card/Card";
import HumanBodyVentral from "../../assets/human-body-ventral.png";
import Lungs from "../../assets/lungs.png";
import Bone from "../../assets/bone.png";
import Tooth from "../../assets/tooth.png";
import CalendarView from "../../components/CalendarView/CalendarView";
import BarChartStackedBySign from "../../components/Charts/BarChartStackedBySign";
import healthData from "../../data/healthData.json";
// import { prepareAppointmentsWeekData } from "../../utils/helper/prepareAppointmentWeekData";
// import appointments from "../../data/appointments.json";
import "./Dashboard.css";

const imageMap = {
  lungs: Lungs,
  teeth: Tooth,
  bone: Bone,
};

const chartData = [
  { name: "Mon", uv: 4000, pv: 2400 },
  { name: "Tue", uv: -3000, pv: 1398 },
  { name: "Wed", uv: -2000, pv: -9800 },
  { name: "Thu", uv: 2780, pv: 3908 },
  { name: "Fri", uv: -1890, pv: 4800 },
  { name: "Sat", uv: 2390, pv: -3800 },
  { name: "Sun", uv: 3490, pv: 4300 },
];

// const chartData = prepareAppointmentsWeekData(appointments);
const keys = ["pv", "uv"];
const colors = ["var(--secondary-color)", "var(--primary-color)"];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="overview-content">
          <Header className="hidden">
            <SearchBar />
          </Header>
          <div className="overview">
            <div className="overview-header">
              <h2>Dashboard</h2>
              <span>
                This Week <FaChevronDown />
              </span>
            </div>
            <div className="overview-body">
              <div className="analytics">
                <div className="analytics-main">
                  <Card className="analytics-main-card">
                    <span className="card-title">
                      <FaSearchPlus />
                    </span>
                    <img src={HumanBodyVentral} alt="Human anatomy" />
                  </Card>
                </div>
                <div className="analytics-submain">
                  {healthData.map((item) => (
                    <Card key={item.id} className="analytics-submain-card">
                      <div className="analytics-submain-header">
                        <img src={imageMap[item.imageKey]} alt={item.organ} />
                        <h5>{item.organ}</h5>
                      </div>
                      <div className="analytics-submain-body">
                        <p>Date: {item.date}</p>
                        <div className="progress-bar">
                          <div
                            className="progress"
                            style={{
                              width: `${item.progress}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <span className="analytics-submain-footer">
                    Details <FaArrowRight />
                  </span>
                </div>
              </div>
              <div className="weekly-stats">
                <h3>Activity</h3>
                <BarChartStackedBySign
                  data={chartData}
                  keys={keys}
                  colors={colors}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="activity-content">
          <Header className="hidden">
            <User />
          </Header>
          <div className="activity">
            <CalendarView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
