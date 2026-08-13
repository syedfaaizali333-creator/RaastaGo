/* RAASTAGO demo data — framework-free version */
const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Hyderabad","Quetta"];

const REPORT_TYPES = [
  {value:"accident",label:"Accident",icon:"🚨"},
  {value:"traffic",label:"Heavy Traffic",icon:"🚗"},
  {value:"roadblock",label:"Road Block",icon:"⛔"},
  {value:"flooding",label:"Flooded Road",icon:"💧"},
  {value:"construction",label:"Road Construction",icon:"🚧"},
  {value:"signal",label:"Broken Traffic Signal",icon:"🚦"},
  {value:"pothole",label:"Pothole",icon:"🕳️"},
  {value:"other",label:"Other",icon:"⚠️"}
];

const REPORT_META = {
  accident:{label:"Accident",icon:"🚨"},
  traffic:{label:"Heavy Traffic",icon:"🚗"},
  roadblock:{label:"Road Block",icon:"⛔"},
  flooding:{label:"Flooded Road",icon:"💧"},
  construction:{label:"Road Construction",icon:"🚧"},
  signal:{label:"Broken Traffic Signal",icon:"🚦"},
  pothole:{label:"Pothole",icon:"🕳️"},
  other:{label:"Other",icon:"⚠️"}
};

const STATUS_META = {
  active:{label:"Active",desc:"Problem is currently affecting traffic."},
  review:{label:"Under Review",desc:"Recently submitted and waiting for verification."},
  resolved:{label:"Resolved",desc:"Problem is no longer active."},
  expired:{label:"Expired",desc:"Old report that is no longer relevant."}
};

const CITY_COORDS = {
  Karachi:[24.8607,67.0011],
  Lahore:[31.5204,74.3587],
  Islamabad:[33.6844,73.0479],
  Rawalpindi:[33.5651,73.0169],
  Faisalabad:[31.4504,73.1350],
  Multan:[30.1575,71.5249],
  Peshawar:[34.0151,71.5249],
  Hyderabad:[25.3960,68.3578],
  Quetta:[30.1798,66.9750]
};

const REPORT_COORDS = {
  "Main University Road":[24.9207,67.1370],
  "Shahrah-e-Faisal":[24.8740,67.0846],
  "Korangi Road":[24.8312,67.0917],
  "Clifton Bridge":[24.8138,67.0305],
  "Ferozepur Road, Kalma Chowk":[31.4970,74.3270],
  "Jinnah Avenue, Blue Area":[33.7077,73.0500],
  "Murree Road, Committee Chowk":[33.6305,73.0670],
  "Ring Road, Peshawar":[34.0043,71.5600]
};

const MOCK_REPORTS = [
  {id:"rp-1",type:"construction",location:"Main University Road",city:"Karachi",reportedAt:"12 minutes ago",status:"active",description:"Two lanes closed near NIPA Chowrangi for drainage work. Expect slow movement towards Safora.",confirmations:23,reporter:"Bilal A.",delay:"+12 min"},
  {id:"rp-2",type:"traffic",location:"Shahrah-e-Faisal",city:"Karachi",reportedAt:"26 minutes ago",status:"active",description:"Slow moving traffic from Nursery to Karsaz during evening rush.",confirmations:41,reporter:"Hina S.",delay:"+7 min"},
  {id:"rp-3",type:"flooding",location:"Korangi Road",city:"Karachi",reportedAt:"38 minutes ago",status:"active",description:"Standing rainwater near the underpass. Small cars should avoid the left lane.",confirmations:17,reporter:"Usman R.",delay:"+15 min"},
  {id:"rp-4",type:"accident",location:"Clifton Bridge",city:"Karachi",reportedAt:"1 hour ago",status:"review",description:"Minor collision reported on the bridge ramp, one lane blocked.",confirmations:9,reporter:"Sana M.",delay:"+12 min"},
  {id:"rp-5",type:"signal",location:"Ferozepur Road, Kalma Chowk",city:"Lahore",reportedAt:"2 hours ago",status:"active",description:"Traffic signal not working. Wardens managing the intersection manually.",confirmations:31,reporter:"Ahmed K.",delay:"+9 min"},
  {id:"rp-6",type:"pothole",location:"Jinnah Avenue, Blue Area",city:"Islamabad",reportedAt:"3 hours ago",status:"review",description:"Deep pothole in the middle lane after recent rain. Risky for motorcyclists.",confirmations:12,reporter:"Zoya T."},
  {id:"rp-7",type:"roadblock",location:"Murree Road, Committee Chowk",city:"Rawalpindi",reportedAt:"5 hours ago",status:"resolved",description:"Temporary closure for a public event has been cleared.",confirmations:54,reporter:"Faisal N."},
  {id:"rp-8",type:"traffic",location:"Ring Road, Peshawar",city:"Peshawar",reportedAt:"Yesterday",status:"expired",description:"Congestion reported near the industrial estate exit.",confirmations:8,reporter:"Kamran W."}
];

const ROUTES = [
  {id:"r-1",name:"Recommended Route",kind:"recommended",time:"31 min",distance:"14.2 km",traffic:"moderate",trafficLabel:"Moderate",delay:"+4 min",via:["Shahrah-e-Faisal","Karsaz","University Road"],notes:["2 signals reported working","No closures on this route"]},
  {id:"r-2",name:"Alternative Route",kind:"alternative",time:"38 min",distance:"12.8 km",traffic:"heavy",trafficLabel:"Heavy",delay:"+11 min",via:["Rashid Minhas Road","NIPA Chowrangi"],notes:["Shorter distance but slower movement"]},
  {id:"r-3",name:"Avoid Route",kind:"avoid",time:"52 min",distance:"15.1 km",traffic:"heavy",trafficLabel:"Severe",delay:"+24 min",via:["Korangi Road","Qayyumabad"],notes:["Flooded section reported 38 minutes ago"],warning:"Heavy congestion reported"}
];

const TRAFFIC_STATS = {clear:67,moderate:21,heavy:12,activeReports:128,incidents:24,averageDelay:"18 min",resolvedToday:43};

const CORRIDORS = [
  {name:"Main University Road",city:"Karachi",level:"heavy",delay:"+18 min",speed:"12 km/h"},
  {name:"Shahrah-e-Faisal",city:"Karachi",level:"moderate",delay:"+7 min",speed:"26 km/h"},
  {name:"Clifton Bridge",city:"Karachi",level:"moderate",delay:"+12 min",speed:"21 km/h"},
  {name:"Korangi Road",city:"Karachi",level:"closed",delay:"Closed",speed:"—"},
  {name:"Rashid Minhas Road",city:"Karachi",level:"clear",delay:"+1 min",speed:"44 km/h"},
  {name:"Ferozepur Road",city:"Lahore",level:"heavy",delay:"+16 min",speed:"14 km/h"},
  {name:"Jinnah Avenue",city:"Islamabad",level:"clear",delay:"+2 min",speed:"48 km/h"},
  {name:"Murree Road",city:"Rawalpindi",level:"moderate",delay:"+8 min",speed:"24 km/h"}
];

const SAFETY_GUIDES = [
  {icon:"🛵",title:"Motorcycle Safety",summary:"Motorcyclists are among the most exposed road users in Pakistani cities.",tips:["Always wear a certified helmet, including for short trips.","Stay out of the blind spots of buses and trucks.","Slow down before painted road markings when wet.","Use reflective clothing after sunset."],warning:"Never overtake heavy vehicles from the left side."},
  {icon:"🚗",title:"Car Safety",summary:"Small habits reduce many city collisions during rush-hour traffic.",tips:["Keep a three-second gap from the vehicle ahead.","Check mirrors before every lane change.","Keep headlights on in dust and haze.","Service brakes before long intercity travel."],warning:"Do not use a mobile phone while moving, even in slow traffic."},
  {icon:"🌧️",title:"Driving During Heavy Rain",summary:"Urban flooding can quickly make a normal route unusable.",tips:["Avoid underpasses and low-lying roads during heavy rain.","Reduce speed on wet roads.","Avoid standing water of unknown depth.","Watch for exposed or fallen electrical wires."],warning:"If water is too deep to judge safely, turn back."},
  {icon:"🌫️",title:"Low Visibility",summary:"Winter fog and smog sharply reduce reaction distance.",tips:["Use low beam and fog lights, never high beam.","Follow lane markings instead of the vehicle ahead.","Increase following distance significantly.","Pull fully off the road if you must stop."],warning:"Never stop in a live lane during fog."},
  {icon:"🚧",title:"Road Construction Safety",summary:"Construction zones can change quickly and may have temporary diversions.",tips:["Slow down as soon as you see barriers or cones.","Expect loose gravel and sudden lane merges.","Watch for workers and machinery.","Report unmarked excavation on RAASTAGO."],warning:"Diversions may be unlit at night. Reduce speed early."},
  {icon:"🚦",title:"Traffic Signal Safety",summary:"Broken or unmanaged signals can make intersections unpredictable.",tips:["Treat a dead signal as an all-way stop.","Make eye contact before crossing an intersection.","Never enter a junction you cannot clear.","Follow warden instructions over signal lights."],warning:"Yellow means prepare to stop, not accelerate."}
];

const SAVED_ROUTES = [
  {name:"Home → Office",origin:"Gulshan-e-Iqbal",destination:"I.I. Chundrigar Road",time:"34 min"},
  {name:"Weekend Drive",origin:"DHA Phase 6",destination:"Seaview",time:"18 min"}
];

const RECENT_SEARCHES = [
  {origin:"Nazimabad",destination:"Saddar",when:"Today, 9:12 AM"},
  {origin:"Malir Cantt",destination:"Clifton",when:"Yesterday, 6:40 PM"},
  {origin:"Model Town, Lahore",destination:"Gulberg",when:"2 days ago"}
];

const NOTIFICATIONS = [
  {text:"Your report on Main University Road was confirmed by 23 users.",time:"10 min ago"},
  {text:"Traffic has increased on your saved route Home → Office.",time:"48 min ago"},
  {text:"A reported road problem on Murree Road has been resolved.",time:"3 hours ago"}
];
