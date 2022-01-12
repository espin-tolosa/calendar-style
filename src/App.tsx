import { useEffect, useState, useRef } from "react";
import "./styles.css";

const events = [
  { id: 1, start: 1, job: "Starting 1" },
  { id: 2, start: 22, job: "Starting 2" },
  { id: 3, start: 22, job: "Starting 3" },
  { id: 4, start: 22, job: "Starting 4" },
  { id: 5, start: 22, job: "Starting 5" }
];

function DayStart({ weekday }: { weekday: string }) {
  const options = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  if (!options.some((opt) => opt === weekday)) {
    console.warn(
      "DayStart: weekday " +
        weekday +
        " is not an option, defaulted to mon, options are:",
      options
    );
    weekday = "mon";
  }

  const classNameTemplate = `month-start-${weekday}`;
  return <div className={classNameTemplate}></div>;
}

const Day = ({ day }: { day: number }) => {
  const tempDay = String(day);
  const dayPadd = day < 10 ? `0${tempDay}` : tempDay;

  return (
    <div
      className="day"
      onMouseUp={() => {
        console.log("leaving action at day:", dayPadd);
      }}
      onMouseEnter={() => console.log("passing over:", dayPadd)}
    >
      <div className="day-header">{dayPadd}</div>
      {events
        .filter((evt) => evt.start === day)
        .map((evt) => {
          const classNameTemplate = `event span-${evt.id}`;
          const classNameTemplate2 = `extend-event extend-event-${evt.id} extend-span-${evt.id}`;
          return (
            <>
              <div className="container">
                <div
                  key={evt.id}
                  className={classNameTemplate}
                  onMouseDownCapture={() => {
                    console.log("Event:", evt.job);
                  }}
                >
                  {evt.job}
                </div>
                <div
                  className={classNameTemplate2}
                  onMouseDownCapture={() => {
                    console.log("extend event:", evt.id);
                  }}
                  onMouseOut={() => {
                    console.log("leaving extend event");
                  }}
                >
                  {"_"}
                </div>
                <div key={"p" + evt.id} className="event-holder"></div>
              </div>
            </>
          );
        })}
    </div>
  );
};

const DaySpot = ({ day }: { day: number }) => {
  const tempDay = String(day);
  const dayPadd = day < 10 ? `0${tempDay}` : tempDay;

  return <div className="day-spot">{dayPadd}</div>;
};

export default function App(): JSX.Element {
  const days = Array.from(Array(30).keys()).map((day) => day + 1);

  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  /*
  useEffect(() => {
    setHeight(ref.current.clientHeight);
    console.log(height)
  })
*/
  /*
        <DayStart weekday={"wed"}/>
        {
          days.map(day => <DaySpot key={day.toString()} day={day}/>)
        }
        </div>

 Calendar
       <div ref={ref} className="board">
        <div className="month">
          <DayStart weekday={"mon"}/>
          {
            days.map(day => <Day key={day.toString()} day={day}/>)
          }
        </div>
      
        <div className="month">
          <DayStart weekday={"wed"}/>
          {
            days.map(day => <Day key={day.toString()} day={day}/>)
          }
        </div>

      </div>



      */

  const Header = () => {
    return (
      <div className="header-layout sticky">
        <div className="flex sticky">
          <div className="header">
            <div className="left-header">JH Diary</div>
            <div className="center-header hidden">
              Today: 10 of January of 2022
            </div>
            <div className="right-header">Logout</div>
          </div>
        </div>
      </div>
    );
  };

  const CreateEvent = () => {
    return (
      <form className="create-event flex flex-column" action="post">
        <input className="create-event-button" type="submit" value="Create" />

        <input
          className="create-event-text"
          type="text"
          name="job"
          id="job"
          value="New job with a long title more long"
          placeholder="Job"
        />
        <div className="from-to-dates">
          <input
            className="create-event-text"
            type="text"
            name="start"
            id="start"
            value="31/01/2022"
            placeholder="start"
          />
          <input
            className="create-event-text"
            type="text"
            name="end"
            id="end"
            value=""
            placeholder="end"
          />
        </div>
      </form>
    );
  };

  const Month = () => {
    return (
      <div className="month">
        <DayStart weekday={"wed"} />
        {days.map((day) => (
          <Day key={day.toString()} day={day} />
        ))}
      </div>
    );
  };

  const [toogleCreate, setToogleCreate] = useState(false);

  let stateToggle = "";
  if (toogleCreate) {
    stateToggle = "smooth-display-on";
  } else {
    stateToggle = "smooth-display-off";
  }
  const controllerLayoutClassName = `controller-layout smooth ${stateToggle} sticky top-controller`;

  return (
    <div className="App">
      <div
        className="header-layout sticky"
        onClick={() => setToogleCreate((prev) => !prev)}
      >
        <div className="flex sticky">
          <div className="header">
            <div className="left-header">JH Diary</div>
            <div className="center-header hidden">
              Today: 10 of January of 2022
            </div>
            <div className="right-header">Logout</div>
          </div>
        </div>
      </div>

      <div className="main-layout">
        <div className={controllerLayoutClassName}>
          <div className="controller sticky top-controller">
            {true && <CreateEvent />}
          </div>
        </div>

        <div className="calendar-layout">
          {true && (
            <div className="calendar">
              <Month />
              <Month />
              <Month />
              <Month />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
