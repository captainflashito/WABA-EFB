/*
 * Profils opérateurs destinés à la simulation.
 * Ils décrivent une logique de réseau représentative et ne constituent ni un
 * horaire commercial, ni une source opérationnelle en temps réel.
 */
(function(){
  const EUROPE=['LFPG','LFPO','LFMN','LFML','LFLL','LFBO','LFBD','EHAM','EBBR','EDDF','EDDM','EDDB','EDDH','EGLL','EGKK','EGCC','EIDW','LEMD','LEBL','LEMG','LPPT','LPPR','LIRF','LIMC','LIPZ','LOWW','LKPR','EKCH','ESSA','ENGM','EFHK','LSZH','LSGG','LGAV','LTFM','EPWA','LHBP','LROP'];
  const ATLANTIC=['KJFK','KEWR','KBOS','KIAD','KORD','KMIA','KLAX','KSFO','CYYZ','CYUL'];
  const GLOBAL=['OMDB','OMAA','OTHH','WSSS','VHHH','RJAA','RJTT','VIDP','VTBS','YSSY','YMML','FAOR','SBGR'];
  const p=(name,telephony,network,hubs,shortHaul,longHaul,fleet,flightNumbers={min:100,max:8999,digits:3})=>({name,telephony,network,hubs,shortHaul,longHaul,fleet,flightNumbers});
  const c=(name,telephony,hubs,shortHaul,longHaul,fleet)=>({...p(name,telephony,'cargo-hub',hubs,shortHaul,longHaul,fleet,{min:1,max:9999,digits:3}),kind:'cargo'});
  const profiles={
    AFR:p('Air France','AIRFRANS','hub',['LFPG','LFPO'],EUROPE,ATLANTIC.concat(GLOBAL),['A318','A319','A320','A20N','A321','A21N','BCS3','A332','A359','B772','B77W','B789']),
    KLM:p('KLM','KLM','hub',['EHAM'],EUROPE,ATLANTIC.concat(GLOBAL),['E175','E190','E195','B738','B739','B38M','A332','A333','B772','B77W','B788','B789']),
    DLH:p('Lufthansa','LUFTHANSA','hub',['EDDF','EDDM'],EUROPE,ATLANTIC.concat(GLOBAL),['CRJ9','A319','A320','A20N','A321','A21N','A333','A359','A388','B744','B748','B789']),
    BAW:p('British Airways','SPEEDBIRD','hub',['EGLL','EGKK','EGLC'],EUROPE,ATLANTIC.concat(GLOBAL),['A319','A320','A20N','A321','A21N','A35K','A388','B772','B77W','B788','B789','B78X']),
    IBE:p('Iberia','IBERIA','hub',['LEMD'],EUROPE,ATLANTIC.concat(['MMMX','SCEL','SAEZ','SPJC','SKBO']),['CRJ9','A319','A320','A20N','A321','A21N','A332','A333','A359']),
    TAP:p('TAP Air Portugal','AIR PORTUGAL','hub',['LPPT','LPPR'],EUROPE,ATLANTIC.concat(['SBGR','SBRJ','SBSG','GVAC','GOBD']),['E190','E195','A319','A320','A20N','A321','A21N','A332','A339']),
    SWR:p('SWISS','SWISS','hub',['LSZH','LSGG'],EUROPE,ATLANTIC.concat(['OMDB','VHHH','WSSS','RJAA','FAOR']),['A20N','A21N','BCS1','BCS3','A320','A321','A333','A343','B77W']),
    BEL:p('Brussels Airlines','BEELINE','hub',['EBBR'],EUROPE,ATLANTIC.concat(['GOBD','DGAA','DNAA','FZAA','FKKD','GLRB']),['A319','A320','A20N','A333']),
    SAS:p('SAS','SCANDINAVIAN','hub',['EKCH','ESSA','ENGM'],EUROPE,ATLANTIC.concat(['RJAA']),['CRJ9','E195','A319','A320','A20N','A321','A21N','A333','A359']),
    FIN:p('Finnair','FINNAIR','hub',['EFHK'],EUROPE,ATLANTIC.concat(['RJAA','RJTT','VHHH','WSSS','VIDP']),['AT72','E190','A319','A320','A321','A359']),
    EIN:p('Aer Lingus','SHAMROCK','hub',['EIDW'],EUROPE,ATLANTIC,['AT72','A320','A20N','A321','A21N','A333']),
    AEE:p('Aegean Airlines','AEGEAN','hub',['LGAV','LGTS'],EUROPE.concat(['LCLK','LCPH']),['HECA','LLBG','OERK'],['AT72','A20N','A21N','A320','A321']),
    THY:p('Turkish Airlines','TURKISH','hub',['LTFM','LTFJ'],EUROPE.concat(['UGTB','UAAA','OIIE']),ATLANTIC.concat(GLOBAL),['B738','B739','B38M','A20N','A21N','A321','A332','A333','A359','B77W','B789']),
    RYR:p('Ryanair','RYANAIR','point-to-point',['EIDW','EGSS','EGBB','EDDB','EDDM','LIME','LEMD'],EUROPE,[],['B738','B38M'],{min:100,max:9999,digits:3}),
    EZY:p('easyJet','EASY','multi-base',['EGKK','EGGW','EGCC','LFPG','LFMN','LSGG','LIMC','EDDB','LEMD'],EUROPE,[],['A319','A320','A20N','A321','A21N'],{min:100,max:9999,digits:3}),
    WZZ:p('Wizz Air','WIZZ AIR','multi-base',['LHBP','EPWA','LROP','LTBJ','LTFJ','EGGW'],EUROPE.concat(['UGTB','OERK','OMAA']),[],['A320','A20N','A321','A21N'],{min:100,max:9999,digits:3}),
    AAL:p('American Airlines','AMERICAN','hub',['KDFW','KCLT','KORD','KPHL','KPHX','KMIA','KLAX','KJFK'],['KATL','KBOS','KIAD','KLAS','KSFO','KSEA','KDEN','MMMX','CYYZ','CYUL'],EUROPE.concat(['RJAA','YSSY']),['A319','A320','A321','A21N','B738','B38M','B772','B77W','B788','B789']),
    DAL:p('Delta Air Lines','DELTA','hub',['KATL','KDTW','KMSP','KJFK','KLGA','KSLC','KLAX','KSEA','KBOS'],['KORD','KDFW','KMIA','KDEN','KSFO','KIAD','CYYZ','CYUL'],EUROPE.concat(['RJAA','YSSY','FAOR']),['BCS1','BCS3','A319','A320','A321','A21N','B738','B739','A332','A333','A339','A359','B763']),
    UAL:p('United Airlines','UNITED','hub',['KORD','KEWR','KIAD','KDEN','KIAH','KLAX','KSFO'],['KATL','KDFW','KMIA','KBOS','KSEA','KLAS','CYYZ','CYUL'],EUROPE.concat(GLOBAL),['A319','A320','A321','A21N','B738','B739','B38M','B39M','B752','B763','B772','B77W','B788','B789']),
    ACA:p('Air Canada','AIR CANADA','hub',['CYYZ','CYUL','CYVR','CYYC'],['CYOW','CYHZ','CYEG','CYWG'].concat(ATLANTIC),EUROPE.concat(GLOBAL),['BCS3','A319','A320','A321','A21N','B38M','B77W','B788','B789']),
    UAE:p('Emirates','EMIRATES','hub',['OMDB'],['OTHH','OMAA','OERK','OKKK','VIDP','VABB','WSSS'],EUROPE.concat(ATLANTIC,GLOBAL),['A388','B77W','B789']),
    QTR:p('Qatar Airways','QATARI','hub',['OTHH'],['OMDB','OMAA','OERK','OKKK','VIDP','VABB'],EUROPE.concat(ATLANTIC,GLOBAL),['A320','A321','A359','A35K','A388','B772','B77W','B788','B789']),
    ETD:p('Etihad Airways','ETIHAD','hub',['OMAA'],['OMDB','OTHH','OERK','OKKK','VIDP','VABB'],EUROPE.concat(ATLANTIC,GLOBAL),['A20N','A21N','A359','A388','B77W','B789','B78X']),
    SIA:p('Singapore Airlines','SINGAPORE','hub',['WSSS'],['WMKK','VTBS','VVTS','WIII','RPLL','VHHH'],EUROPE.concat(ATLANTIC,GLOBAL),['B38M','A359','A388','B77W','B789']),
    QFA:p('Qantas','QANTAS','hub',['YSSY','YMML','YBBN','YPPH'],['YSCB','YSSY','YMML','YBBN','YPAD','YPPH','NZAA'],['WSSS','VHHH','RJAA','EGLL','KLAX','KSFO'],['B738','A332','A333','A359','A388','B789']),
    ANA:p('All Nippon Airways','ALL NIPPON','hub',['RJTT','RJAA'],['RJBB','RJCC','RJFF','ROAH'],EUROPE.concat(ATLANTIC,['WSSS','VHHH','YSSY']),['A20N','A21N','A320','A321','B738','B77W','B788','B789']),
    JAL:p('Japan Airlines','JAPANAIR','hub',['RJTT','RJAA'],['RJBB','RJCC','RJFF','ROAH'],EUROPE.concat(ATLANTIC,['WSSS','VHHH','YSSY']),['B738','A359','B763','B77W','B788','B789'])
  };
  Object.assign(profiles,{
    ANZ:p('Air New Zealand','NEW ZEALAND','hub',['NZAA','NZCH','NZWN'],['NZQN','NZDN','YSSY','YMML','YBBN','NFFN'],['KLAX','KSFO','VHHH','WSSS','RJAA'],['AT72','A20N','A21N','B77W','B789']),
    JST:p('Jetstar Airways','JETSTAR','multi-base',['YMML','YSSY','YBBN','YPPH'],['YSCB','YPAD','YBCS','NZAA','NZCH'],['WSSS','VTBS','VHHH','RJAA'],['A320','A20N','A321','A21N','B788']),
    VOZ:p('Virgin Australia','VELOCITY','multi-base',['YBBN','YMML','YSSY'],['YSCB','YPAD','YPPH','YBCS','NZAA'],[],['B738','B38M']),
    ACI:p('Aircalin','AIRCALIN','hub',['NWWW'],['NFFN','NZAA','YSSY','YBBN'],['WSSS','RJAA'],['A20N','A320','A321','A332']),
    THT:p('Air Tahiti Nui','TAHITI AIRLINES','hub',['NTAA'],['NTTG','NFFN','NZAA'],['KLAX','KSEA','LFPG','RJAA'],['B789']),
    ANG:p('Air Niugini','NIUGINI','hub',['AYPY'],['AYWK','AYGA','AYMH','YBCS','YBBN'],['WSSS','RPLL','RJAA'],['DH8D','B763']),
    RON:p('Nauru Airlines','AIR NAURU','hub',['ANYN'],['YBBN','NFFN','AGGH','NGFU','PGUM'],[],['B738'])
  });
  Object.assign(profiles,{
    FDX:c('FedEx Express','FEDEX',['KMEM','KIND','KAFW'],['KEWR','KORD','KMIA','KLAX','KSFO','KSEA','CYYZ','CYUL'],['EDDK','LFPG','VHHH','RJAA','WSSS','OMDB'],['B752','B763','B772','B77F','MD11']),
    UPS:c('UPS Airlines','UPS',['KSDF','KONT','KPHL'],['KDFW','KORD','KMIA','KEWR','KLAX','KSFO','CYYZ'],['EDDK','VHHH','ZGSZ','WSSS','OMDB'],['B752','B763','B744F','B748','MD11']),
    CLX:c('Cargolux','CARGOLUX',['ELLX'],['EDDF','EDDK','EBLG','EGSS','LIMC','LPPT'],['KJFK','KORD','KMIA','KLAX','VHHH','ZGGG','OMDB','OTHH'],['B744F','B748']),
    GEC:c('Lufthansa Cargo','LUFTHANSA CARGO',['EDDF'],['EDDK','EBLG','EGSS','LIMC','LEMD'],['KORD','KLAX','VHHH','RJAA','WSSS','OMDB','OTHH'],['B77F','MD11']),
    BOX:c('AeroLogic','GERMAN CARGO',['EDDP'],['EDDF','EDDK','EBLG','EGSS'],['KORD','KLAX','VHHH','ZGGG','WSSS','OMDB'],['B77F']),
    GTI:c('Atlas Air','GIANT',['KCVG','KORD'],['KJFK','KDFW','KMIA','KLAX','KSEA'],['EDDF','EDDK','VHHH','RJAA','WSSS','OMDB'],['B763F','B744F','B748','B77F']),
    CKS:c('Kalitta Air','CONNIE',['KYIP','KCVG'],['KJFK','KORD','KDFW','KLAX','KSEA'],['EDDK','EGSS','VHHH','RJAA','OMDB'],['B744F','B77F']),
    PAC:c('Polar Air Cargo','POLAR',['KLAX','KCVG'],['KJFK','KORD','KDFW','KSEA'],['VHHH','RJAA','ZGGG','WSSS','EDDK'],['B763F','B744F']),
    NCA:c('Nippon Cargo Airlines','NIPPON CARGO',['RJAA'],['RJTT','RJBB','VHHH','ZGGG','WSSS'],['KORD','KLAX','KSFO','EDDF','EDDK','EHAM'],['B744F','B748']),
    AZG:c('Silk Way West Airlines','SILK WEST',['UBBB'],['LTFM','UGTB','OMDB','OTHH','OERK'],['EDDF','EGSS','VHHH','ZGGG','WSSS'],['B744F','B748','B77F']),
    MNB:c('MNG Airlines','BLACK SEA',['LTFM'],['EDDF','EDDK','EBLG','EGSS','LIMC','OMDB'],['VHHH','WSSS','KJFK'],['A332','A333','B763F']),
    TAY:c('ASL Airlines Belgium','QUALITY',['EBLG'],['EDDK','EDDP','EGSS','LFPG','LIMC','LEMD'],['KJFK','OMDB','VHHH'],['B738F','B744F','B752'])
  });
  profiles.EJU=profiles.EZY;
  profiles.EZS=profiles.EZY;
  window.OPS_OPERATOR_PROFILES=profiles;
})();
