/* Catalogue indicatif pour la simulation. Les performances réelles dépendent de
   la variante, de la masse, de la motorisation et des conditions du jour. */
window.OPS_EXTRA_AIRCRAFT = {
  // Aviation générale, utilitaire et turbopropulseurs
  C172:{name:'Cessna 172 Skyhawk',categories:['business'],pax_max:3,range_nm:640,cruise_kt:124,cruise_fl:'FL100',fuel_burn_kgh:32,fuel_taxi:5,fuel_reserve:18,mtow:1111,fuel_cap:144},
  DA40:{name:'Diamond DA40 NG',categories:['business'],pax_max:3,range_nm:940,cruise_kt:154,cruise_fl:'FL160',fuel_burn_kgh:25,fuel_taxi:4,fuel_reserve:14,mtow:1310,fuel_cap:148},
  DA62:{name:'Diamond DA62',categories:['business'],pax_max:6,range_nm:1280,cruise_kt:192,cruise_fl:'FL200',fuel_burn_kgh:52,fuel_taxi:8,fuel_reserve:28,mtow:2300,fuel_cap:326},
  SR22:{name:'Cirrus SR22T',categories:['business'],pax_max:4,range_nm:1020,cruise_kt:213,cruise_fl:'FL250',fuel_burn_kgh:72,fuel_taxi:10,fuel_reserve:38,mtow:1633,fuel_cap:348},
  BE36:{name:'Beechcraft Bonanza G36',categories:['business'],pax_max:5,range_nm:920,cruise_kt:176,cruise_fl:'FL180',fuel_burn_kgh:58,fuel_taxi:8,fuel_reserve:32,mtow:1656,fuel_cap:280},
  BE58:{name:'Beechcraft Baron G58',categories:['business'],pax_max:5,range_nm:1480,cruise_kt:202,cruise_fl:'FL200',fuel_burn_kgh:115,fuel_taxi:15,fuel_reserve:60,mtow:2495,fuel_cap:735},
  B350:{name:'Beechcraft King Air 350i',categories:['business','cargo'],pax_max:11,range_nm:1806,cruise_kt:312,cruise_fl:'FL350',fuel_burn_kgh:420,fuel_taxi:55,fuel_reserve:220,mtow:6804,fuel_cap:2450,cargo_max:1100},
  B190:{name:'Beechcraft 1900D',categories:['scheduled','cargo'],pax_max:19,range_nm:1400,cruise_kt:280,cruise_fl:'FL250',fuel_burn_kgh:520,fuel_taxi:65,fuel_reserve:260,mtow:7764,fuel_cap:2980,cargo_max:2100},
  C408:{name:'Cessna 408 SkyCourier',categories:['scheduled','cargo'],pax_max:19,range_nm:920,cruise_kt:210,cruise_fl:'FL250',fuel_burn_kgh:360,fuel_taxi:45,fuel_reserve:190,mtow:8618,fuel_cap:2180,cargo_max:2720},
  DHC6:{name:'De Havilland DHC-6 Twin Otter',categories:['scheduled','cargo'],pax_max:19,range_nm:775,cruise_kt:182,cruise_fl:'FL200',fuel_burn_kgh:300,fuel_taxi:40,fuel_reserve:160,mtow:5670,fuel_cap:1170,cargo_max:1900},
  SF34:{name:'Saab 340B',categories:['scheduled','cargo'],pax_max:34,range_nm:920,cruise_kt:283,cruise_fl:'FL250',fuel_burn_kgh:610,fuel_taxi:80,fuel_reserve:300,mtow:13155,fuel_cap:3330,cargo_max:3700},
  SW4:{name:'Fairchild Swearingen Metroliner',categories:['scheduled','cargo'],pax_max:19,range_nm:1100,cruise_kt:285,cruise_fl:'FL250',fuel_burn_kgh:460,fuel_taxi:60,fuel_reserve:240,mtow:7484,fuel_cap:2460,cargo_max:2000},

  // Jets d'affaires
  F2TH:{name:'Dassault Falcon 2000LXS',categories:['business'],pax_max:10,range_nm:4000,cruise_kt:470,cruise_fl:'FL470',fuel_burn_kgh:1150,fuel_taxi:150,fuel_reserve:520,mtow:19414,fuel_cap:7350},
  FA50:{name:'Dassault Falcon 50EX',categories:['business'],pax_max:9,range_nm:3260,cruise_kt:459,cruise_fl:'FL490',fuel_burn_kgh:1150,fuel_taxi:150,fuel_reserve:520,mtow:18800,fuel_cap:7020},
  FA7X:{name:'Dassault Falcon 7X',categories:['business'],pax_max:16,range_nm:5950,cruise_kt:488,cruise_fl:'FL510',fuel_burn_kgh:1450,fuel_taxi:190,fuel_reserve:650,mtow:31750,fuel_cap:14900},
  FA8X:{name:'Dassault Falcon 8X',categories:['business'],pax_max:16,range_nm:6450,cruise_kt:488,cruise_fl:'FL510',fuel_burn_kgh:1480,fuel_taxi:195,fuel_reserve:670,mtow:33000,fuel_cap:15600},
  GLF4:{name:'Gulfstream G450',categories:['business'],pax_max:16,range_nm:4350,cruise_kt:476,cruise_fl:'FL450',fuel_burn_kgh:1450,fuel_taxi:190,fuel_reserve:650,mtow:34019,fuel_cap:13100},
  GLF5:{name:'Gulfstream G550',categories:['business'],pax_max:19,range_nm:6750,cruise_kt:488,cruise_fl:'FL510',fuel_burn_kgh:1650,fuel_taxi:220,fuel_reserve:740,mtow:41277,fuel_cap:18730},
  GL6T:{name:'Gulfstream G650ER',categories:['business'],pax_max:19,range_nm:7500,cruise_kt:488,cruise_fl:'FL510',fuel_burn_kgh:1850,fuel_taxi:235,fuel_reserve:820,mtow:48807,fuel_cap:22000},
  GLEX:{name:'Bombardier Global 6000',categories:['business'],pax_max:17,range_nm:6000,cruise_kt:488,cruise_fl:'FL510',fuel_burn_kgh:1750,fuel_taxi:225,fuel_reserve:780,mtow:45359,fuel_cap:20430},
  CL60:{name:'Bombardier Challenger 650',categories:['business'],pax_max:12,range_nm:4000,cruise_kt:459,cruise_fl:'FL410',fuel_burn_kgh:1250,fuel_taxi:160,fuel_reserve:560,mtow:21863,fuel_cap:9120},
  LJ45:{name:'Bombardier Learjet 45',categories:['business'],pax_max:8,range_nm:1824,cruise_kt:445,cruise_fl:'FL510',fuel_burn_kgh:680,fuel_taxi:90,fuel_reserve:310,mtow:9752,fuel_cap:2800},
  E50P:{name:'Embraer Phenom 100EV',categories:['business'],pax_max:6,range_nm:1178,cruise_kt:406,cruise_fl:'FL410',fuel_burn_kgh:430,fuel_taxi:55,fuel_reserve:210,mtow:4800,fuel_cap:1270},
  C510:{name:'Cessna Citation Mustang',categories:['business'],pax_max:4,range_nm:1167,cruise_kt:340,cruise_fl:'FL410',fuel_burn_kgh:360,fuel_taxi:50,fuel_reserve:190,mtow:3930,fuel_cap:1175},
  C525:{name:'Cessna Citation CJ1+',categories:['business'],pax_max:6,range_nm:1300,cruise_kt:389,cruise_fl:'FL410',fuel_burn_kgh:460,fuel_taxi:60,fuel_reserve:220,mtow:4853,fuel_cap:1460},
  H25B:{name:'Hawker 800XP',categories:['business'],pax_max:8,range_nm:2540,cruise_kt:447,cruise_fl:'FL410',fuel_burn_kgh:900,fuel_taxi:120,fuel_reserve:400,mtow:12701,fuel_cap:4540},

  // Transport régional et monocouloir
  AT43:{name:'ATR 42-500',categories:['scheduled','cargo'],pax_max:48,range_nm:716,cruise_kt:300,cruise_fl:'FL250',fuel_burn_kgh:560,fuel_taxi:75,fuel_reserve:260,mtow:18600,fuel_cap:4500,cargo_max:5000},
  AT72:{name:'ATR 72-500',categories:['scheduled','cargo'],pax_max:72,range_nm:825,cruise_kt:275,cruise_fl:'FL250',fuel_burn_kgh:660,fuel_taxi:90,fuel_reserve:300,mtow:22800,fuel_cap:5000,cargo_max:7200},
  CRJ2:{name:'Bombardier CRJ-200',categories:['scheduled'],pax_max:50,range_nm:1700,cruise_kt:430,cruise_fl:'FL410',fuel_burn_kgh:1250,fuel_taxi:160,fuel_reserve:530,mtow:24041,fuel_cap:6490},
  CRJ7:{name:'Bombardier CRJ-700',categories:['scheduled'],pax_max:78,range_nm:1378,cruise_kt:447,cruise_fl:'FL410',fuel_burn_kgh:1450,fuel_taxi:180,fuel_reserve:610,mtow:34019,fuel_cap:8820},
  E170:{name:'Embraer E170',categories:['scheduled'],pax_max:80,range_nm:2150,cruise_kt:447,cruise_fl:'FL410',fuel_burn_kgh:1550,fuel_taxi:195,fuel_reserve:650,mtow:38790,fuel_cap:11790},
  E175:{name:'Embraer E175',categories:['scheduled'],pax_max:88,range_nm:2200,cruise_kt:447,cruise_fl:'FL410',fuel_burn_kgh:1600,fuel_taxi:200,fuel_reserve:680,mtow:40900,fuel_cap:11790},
  E195:{name:'Embraer E195-E2',categories:['scheduled'],pax_max:146,range_nm:2600,cruise_kt:447,cruise_fl:'FL410',fuel_burn_kgh:2050,fuel_taxi:250,fuel_reserve:860,mtow:62400,fuel_cap:17100},
  BCS1:{name:'Airbus A220-100',categories:['scheduled'],pax_max:135,range_nm:3450,cruise_kt:470,cruise_fl:'FL410',fuel_burn_kgh:2000,fuel_taxi:250,fuel_reserve:850,mtow:63956,fuel_cap:21800},
  BCS3:{name:'Airbus A220-300',categories:['scheduled'],pax_max:160,range_nm:3400,cruise_kt:470,cruise_fl:'FL410',fuel_burn_kgh:2150,fuel_taxi:270,fuel_reserve:920,mtow:70900,fuel_cap:21800},
  A318:{name:'Airbus A318',categories:['scheduled','business'],pax_max:132,range_nm:3100,cruise_kt:447,cruise_fl:'FL390',fuel_burn_kgh:2200,fuel_taxi:280,fuel_reserve:950,mtow:68000,fuel_cap:24210},
  A320:{name:'Airbus A320-200',categories:['scheduled'],pax_max:180,range_nm:3300,cruise_kt:450,cruise_fl:'FL390',fuel_burn_kgh:2500,fuel_taxi:310,fuel_reserve:1080,mtow:78000,fuel_cap:24210},
  A321:{name:'Airbus A321-200',categories:['scheduled'],pax_max:220,range_nm:3200,cruise_kt:450,cruise_fl:'FL390',fuel_burn_kgh:2850,fuel_taxi:350,fuel_reserve:1220,mtow:93500,fuel_cap:30030},
  B736:{name:'Boeing 737-600',categories:['scheduled'],pax_max:149,range_nm:3235,cruise_kt:453,cruise_fl:'FL410',fuel_burn_kgh:2350,fuel_taxi:300,fuel_reserve:1000,mtow:65544,fuel_cap:26020},
  B739:{name:'Boeing 737-900ER',categories:['scheduled'],pax_max:220,range_nm:2950,cruise_kt:453,cruise_fl:'FL410',fuel_burn_kgh:2850,fuel_taxi:350,fuel_reserve:1200,mtow:85139,fuel_cap:26020},
  B39M:{name:'Boeing 737 MAX 9',categories:['scheduled'],pax_max:220,range_nm:3550,cruise_kt:453,cruise_fl:'FL410',fuel_burn_kgh:2650,fuel_taxi:330,fuel_reserve:1140,mtow:88314,fuel_cap:25800},

  // Gros-porteurs passagers
  A332:{name:'Airbus A330-200',categories:['scheduled'],pax_max:260,range_nm:7250,cruise_kt:470,cruise_fl:'FL410',fuel_burn_kgh:5700,fuel_taxi:720,fuel_reserve:2450,mtow:242000,fuel_cap:139090},
  A333:{name:'Airbus A330-300',categories:['scheduled'],pax_max:300,range_nm:6350,cruise_kt:470,cruise_fl:'FL410',fuel_burn_kgh:5900,fuel_taxi:740,fuel_reserve:2520,mtow:242000,fuel_cap:97530},
  A359:{name:'Airbus A350-900',categories:['scheduled'],pax_max:350,range_nm:8100,cruise_kt:488,cruise_fl:'FL430',fuel_burn_kgh:5800,fuel_taxi:730,fuel_reserve:2500,mtow:283000,fuel_cap:141000},
  A35K:{name:'Airbus A350-1000',categories:['scheduled'],pax_max:410,range_nm:8700,cruise_kt:488,cruise_fl:'FL430',fuel_burn_kgh:6500,fuel_taxi:820,fuel_reserve:2780,mtow:322000,fuel_cap:164000},
  A388:{name:'Airbus A380-800',categories:['scheduled'],pax_max:555,range_nm:8000,cruise_kt:488,cruise_fl:'FL430',fuel_burn_kgh:11800,fuel_taxi:1450,fuel_reserve:4900,mtow:575000,fuel_cap:253980},
  B752:{name:'Boeing 757-200',categories:['scheduled','cargo'],pax_max:239,range_nm:3900,cruise_kt:461,cruise_fl:'FL420',fuel_burn_kgh:3600,fuel_taxi:450,fuel_reserve:1500,mtow:115680,fuel_cap:43490,cargo_max:35000},
  B763:{name:'Boeing 767-300ER',categories:['scheduled'],pax_max:269,range_nm:5990,cruise_kt:470,cruise_fl:'FL430',fuel_burn_kgh:5000,fuel_taxi:630,fuel_reserve:2120,mtow:186880,fuel_cap:91380},
  B772:{name:'Boeing 777-200ER',categories:['scheduled'],pax_max:400,range_nm:7065,cruise_kt:490,cruise_fl:'FL430',fuel_burn_kgh:7000,fuel_taxi:880,fuel_reserve:2950,mtow:297550,fuel_cap:171170},
  B77W:{name:'Boeing 777-300ER',categories:['scheduled'],pax_max:440,range_nm:7370,cruise_kt:490,cruise_fl:'FL430',fuel_burn_kgh:7600,fuel_taxi:950,fuel_reserve:3200,mtow:351535,fuel_cap:181280},
  B788:{name:'Boeing 787-8',categories:['scheduled'],pax_max:248,range_nm:7305,cruise_kt:488,cruise_fl:'FL430',fuel_burn_kgh:5300,fuel_taxi:670,fuel_reserve:2280,mtow:227930,fuel_cap:101456},
  B78X:{name:'Boeing 787-10',categories:['scheduled'],pax_max:336,range_nm:6330,cruise_kt:488,cruise_fl:'FL430',fuel_burn_kgh:6100,fuel_taxi:760,fuel_reserve:2600,mtow:254000,fuel_cap:101456},
  B744:{name:'Boeing 747-400',categories:['scheduled'],pax_max:416,range_nm:7260,cruise_kt:493,cruise_fl:'FL450',fuel_burn_kgh:10500,fuel_taxi:1250,fuel_reserve:4300,mtow:396890,fuel_cap:216840},
  B748:{name:'Boeing 747-8 Intercontinental',categories:['scheduled'],pax_max:467,range_nm:7730,cruise_kt:493,cruise_fl:'FL430',fuel_burn_kgh:9900,fuel_taxi:1200,fuel_reserve:4100,mtow:447700,fuel_cap:238610},
  MD11:{name:'McDonnell Douglas MD-11',categories:['scheduled','cargo'],pax_max:323,range_nm:6840,cruise_kt:490,cruise_fl:'FL430',fuel_burn_kgh:8500,fuel_taxi:1050,fuel_reserve:3500,mtow:286000,fuel_cap:146200,cargo_max:91000},

  // Fret spécialisé
  A306F:{name:'Airbus A300-600F',categories:['cargo'],pax_max:0,range_nm:4050,cruise_kt:470,cruise_fl:'FL410',fuel_burn_kgh:6000,fuel_taxi:750,fuel_reserve:2500,mtow:171700,fuel_cap:68150,cargo_max:54000},
  A332F:{name:'Airbus A330-200F',categories:['cargo'],pax_max:0,range_nm:4000,cruise_kt:470,cruise_fl:'FL410',fuel_burn_kgh:5900,fuel_taxi:740,fuel_reserve:2500,mtow:233000,fuel_cap:97530,cargo_max:65000},
  B752F:{name:'Boeing 757-200F',categories:['cargo'],pax_max:0,range_nm:3150,cruise_kt:461,cruise_fl:'FL420',fuel_burn_kgh:3700,fuel_taxi:470,fuel_reserve:1550,mtow:115680,fuel_cap:43490,cargo_max:36000},
  B748F:{name:'Boeing 747-8F',categories:['cargo'],pax_max:0,range_nm:4390,cruise_kt:493,cruise_fl:'FL430',fuel_burn_kgh:10200,fuel_taxi:1250,fuel_reserve:4200,mtow:447700,fuel_cap:226100,cargo_max:137700}
};
