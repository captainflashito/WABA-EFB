(function(global){
  'use strict';

  const VERSION='1.0.0';
  const SOURCE_PRIORITY={
    scenario:10,ops_plan:30,ofp:40,live_data:55,network:65,
    crew_report:70,crew_atc:80,crew_decision:90,crew_emergency:100
  };
  const ICAO_WORDS={
    ALPHA:'A',ALFA:'A',BRAVO:'B',CHARLIE:'C',DELTA:'D',ECHO:'E',FOXTROT:'F',FOX:'F',
    GOLF:'G',HOTEL:'H',INDIA:'I',JULIETT:'J',JULIET:'J',KILO:'K',LIMA:'L',MIKE:'M',
    NOVEMBER:'N',OSCAR:'O',PAPA:'P',QUEBEC:'Q',ROMEO:'R',SIERRA:'S',TANGO:'T',
    UNIFORM:'U',VICTOR:'V',WHISKEY:'W',WHISKY:'W',XRAY:'X','X-RAY':'X',YANKEE:'Y',ZULU:'Z'
  };
  const DIGIT_WORDS={
    ZERO:'0',ZÉRO:'0',UN:'1',UNE:'1',ONE:'1',DEUX:'2',TWO:'2',TROIS:'3',THREE:'3',
    QUATRE:'4',FOUR:'4',CINQ:'5',FIVE:'5',SIX:'6',SEPT:'7',SEVEN:'7',HUIT:'8',EIGHT:'8',
    NEUF:'9',NINE:'9'
  };
  const DISPATCHER_PROFILES={
    sophie:{id:'sophie',specialties:['planning','weather','slot','regulation'],tone:'methodical',
      constraints:['network workload','slot coordination','technical decisions require CAMO review']},
    marc:{id:'marc',specialties:['night supervision','emergency','complex decisions'],tone:'calm',
      constraints:['reduced night staffing','slower external-station response','limited overnight services']},
    hind:{id:'hind',specialties:['international','handling','permits','customs'],tone:'diplomatic',
      constraints:['local-agent confirmation','permit lead time','time-zone and language delays']},
    antoine:{id:'antoine',specialties:['technical','diversion','in-flight follow-up'],tone:'direct',
      constraints:['CAMO controls technical release','exact defect details required','maintenance response time']}
  };

  function nowIso(){return new Date().toISOString();}
  function clean(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase()
      .replace(/[’']/g,' ').replace(/[^A-Z0-9.,:?/\-\s]/g,' ').replace(/\s+/g,' ').trim();
  }
  function parseDigitSequence(value){
    const words=clean(value).split(/\s+/),digits=[];
    for(const word of words){
      if(/^\d$/.test(word))digits.push(word);
      else if(DIGIT_WORDS[word]!==undefined)digits.push(DIGIT_WORDS[word]);
      else return null;
    }
    return digits.length?digits.join(''):null;
  }
  function recoverIcaoSequences(text,isAirport){
    const normalized=clean(text).replace(/\bX\s+RAY\b/g,'XRAY');
    const tokens=normalized.split(' '),recovered=[],codes=[];
    for(let index=0;index<tokens.length;){
      let letters=[];
      for(let cursor=index;cursor<tokens.length&&letters.length<4;cursor++){
        const token=tokens[cursor];
        const letter=ICAO_WORDS[token]||(/^[A-Z]$/.test(token)?token:null);
        if(!letter)break;
        letters.push(letter);
      }
      if(letters.length===4){
        const code=letters.join('');
        if(!isAirport||isAirport(code)){
          recovered.push(code);codes.push(code);index+=4;continue;
        }
      }
      recovered.push(tokens[index]);index++;
    }
    const joined=recovered.join(' ');
    for(const match of joined.matchAll(/\b[A-Z]{4}\b/g)){
      if((!isAirport||isAirport(match[0]))&&!codes.includes(match[0]))codes.push(match[0]);
    }
    return{normalized:joined,codes};
  }
  function timeFromWords(value){
    const normalized=clean(value);
    const numeric=normalized.match(/\b([01]?\d|2[0-3])[:H ]([0-5]\d)\s*(?:Z|ZULU|UTC)?\b/);
    if(numeric)return`${String(Number(numeric[1])).padStart(2,'0')}${numeric[2]}Z`;
    const compact=normalized.match(/\b([01]\d|2[0-3])([0-5]\d)\s*(?:Z|ZULU|UTC)\b/);
    return compact?`${compact[1]}${compact[2]}Z`:null;
  }
  function analyzeUtterance(text,context={}){
    const recovered=recoverIcaoSequences(text,context.isAirport),value=recovered.normalized;
    const question=/\?|\b(?:POURQUOI|COMMENT|QUEL|QUELLE|EST CE QUE|PEUT ON|POURRAIT|CAN WE|COULD|WHY|WHAT|HOW)\b/.test(value);
    const emergency=/\b(?:MAYDAY|PAN PAN|URGENCE|EMERGENCY|DETRESSE|MINIMUM FUEL)\b/.test(value);
    const confirmedDiversion=/\b(?:NOUS DEROUTONS|ON DEROUTE|JE DEROUTE|DIVERTING|DIVERSION CONFIRMED|DEROUTEMENT CONFIRME|DEROUTEMENT DECIDE)\b/.test(value);
    const confirmedChange=!question&&/\b(?:NOUS DECIDONS|ON RETIENT|JE CONFIRME|NOUS CONFIRMONS|DECISION EQUIPAGE|WE ARE CHANGING|WE WILL PROCEED)\b/.test(value);
    const structuredChange=!question&&/\b(?:PAX\s+\d+|PASSAGERS?\s+\d+|PARKING\s+[A-Z0-9-]+|STAND\s+[A-Z0-9-]+|RETARD\s+\d+|DELAY\s+\d+|NEW\s+DEP|NOUVEAU\s+DEPART|CHG\s+DEST|ALTN\s+[A-Z]{4})\b/.test(value);
    const changeRequest=!question&&(/\b(?:MODIFIE|MODIFIER|CHANGE|CHANGER|REMPLACE|REMPLACER|SUPPRIME|SUPPRIMER|AJOUTE|AJOUTER|DECALE|DECALER|ANNULE|ANNULER)\b/.test(value)||structuredChange);
    const studyRequest=/\b(?:ETUDIE|ETUDIER|REGARDE|VERIFIE|PEUT ON|POURRAIT|ENVISAGE|OPTION|PROPOSE|REQUEST)\b/.test(value)&&question;
    const atc=/\b(?:ATC|IVAO|VATSIM|CONTROLE|CONTROL|AUTORISE|AUTORISES|CLEARED|CLEARANCE|DIRECT|ATIS)\b/.test(value);
    let intent='conversation';
    if(emergency)intent='emergency';
    else if(confirmedDiversion||confirmedChange)intent='confirmed_decision';
    else if(changeRequest)intent='change_request';
    else if(studyRequest)intent='study_request';
    else if(/\b(?:METEO|WEATHER|METAR|TAF|SIGMET|CONDITIONS)\b/.test(value))intent='weather_request';
    else if(/\bNOTAM\b/.test(value))intent='notam_request';
    else if(/\b(?:POURQUOI|EXPLIQUE|JUSTIFIE|WHY)\b.*\b(?:FUEL|CARBURANT|EXTRA)\b|\b(?:FUEL|CARBURANT|EXTRA)\b.*\b(?:POURQUOI|WHY)\b/.test(value))intent='fuel_explanation';
    else if(atc)intent='tactical_update';
    else if(/\b(?:ONBLK|ON BLOCK|OFFBLK|OFF BLOCK|READY|RDY|AIRBORNE|DESCENTE|DESCENT|ETA|STATUT|STATUS)\b/.test(value))intent='status_report';
    else if(/\b(?:FUEL|CARBURANT)\b/.test(value))intent='fuel_report';
    else if(/^(?:ACK|ROGER|WILCO|RECU|BIEN RECU|COPIE|COPY)(?:\b|$)/.test(value))intent='acknowledgement';

    let flightLevel=null;
    const levelMatch=value.match(/\b(?:FL|NIVEAU(?: DE VOL)?|FLIGHT LEVEL)\s*([0-9]{2,3}|(?:ZERO|UN|ONE|DEUX|TWO|TROIS|THREE|QUATRE|FOUR|CINQ|FIVE|SIX|SEPT|SEVEN|HUIT|EIGHT|NEUF|NINE)(?:\s+(?:ZERO|UN|ONE|DEUX|TWO|TROIS|THREE|QUATRE|FOUR|CINQ|FIVE|SIX|SEPT|SEVEN|HUIT|EIGHT|NEUF|NINE)){1,2})\b/);
    if(levelMatch){
      const digits=/^\d+$/.test(levelMatch[1])?levelMatch[1]:parseDigitSequence(levelMatch[1]);
      if(digits)flightLevel=`FL${digits}`;
    }
    let runway=null;
    const runwayMatch=value.match(/\b(?:RWY|RUNWAY|PISTE)\s*([0-3]?\d|(?:ZERO|UN|ONE|DEUX|TWO|TROIS|THREE)(?:\s+(?:ZERO|UN|ONE|DEUX|TWO|TROIS|THREE|QUATRE|FOUR|CINQ|FIVE|SIX|SEPT|SEVEN|HUIT|EIGHT|NEUF|NINE))?)\s*(LEFT|RIGHT|CENTER|GAUCHE|DROITE|CENTRE|L|R|C)?\b/);
    if(runwayMatch){
      const number=/^\d+$/.test(runwayMatch[1])?runwayMatch[1]:parseDigitSequence(runwayMatch[1]);
      const side={LEFT:'L',GAUCHE:'L',L:'L',RIGHT:'R',DROITE:'R',R:'R',CENTER:'C',CENTRE:'C',C:'C'}[runwayMatch[2]]||'';
      if(number)runway=`${String(Number(number)).padStart(2,'0')}${side}`;
    }
    let fuelKg=null;
    const fuelMatch=value.match(/\b(\d+(?:[.,]\d+)?)\s*(KG|KILOS?|TONNES?|T|LB|LBS)\b/);
    if(fuelMatch&&/\b(?:FUEL|CARBURANT|EXTRA|RESTANT|REMAINING)\b/.test(value)){
      let amount=Number(fuelMatch[1].replace(',','.'));
      if(/^T(?:ONNE)?S?$/.test(fuelMatch[2]))amount*=1000;
      if(/^LBS?$/.test(fuelMatch[2]))amount*=0.453592;
      fuelKg=Math.round(amount);
    }
    const ctotCancelled=/\b(?:CTOT|SLOT)\b.*\b(?:ANNULE|ANNULEE|CANCELLED|CANCELED)\b|\b(?:ANNULE|ANNULEE|CANCELLED|CANCELED)\b.*\b(?:CTOT|SLOT)\b/.test(value);
    const ctotMention=/\b(?:CTOT|SLOT)\b/.test(value);
    const reportTime=timeFromWords(value);
    return{
      raw:String(text||''),normalized:value,intent,question,emergency,atc,
      shouldAnalyzeDossier:['confirmed_decision','change_request'].includes(intent),
      entities:{icaoCodes:recovered.codes,flightLevel,runway,fuelKg,ctotMention,ctotCancelled,time:reportTime}
    };
  }

  function createMemory(seed={}){
    return Object.assign({version:1,createdAt:nowIso(),updatedAt:nowIso(),facts:{},events:[],openActions:[],amendments:[],voiceTurns:[],scenarioState:{lastId:null,majorCount:0,lastAt:0}},seed||{});
  }
  function ensureMemory(value){
    const memory=value&&typeof value==='object'?value:createMemory();
    memory.facts=memory.facts||{};memory.events=Array.isArray(memory.events)?memory.events:[];
    memory.openActions=Array.isArray(memory.openActions)?memory.openActions:[];
    memory.amendments=Array.isArray(memory.amendments)?memory.amendments:[];
    memory.voiceTurns=Array.isArray(memory.voiceTurns)?memory.voiceTurns:[];
    memory.scenarioState=memory.scenarioState||{lastId:null,majorCount:0,lastAt:0};
    return memory;
  }
  function recordEvent(memory,event){
    memory=ensureMemory(memory);const item=Object.assign({id:`EVT-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,at:nowIso(),status:'RECORDED'},event||{});
    memory.events.push(item);if(memory.events.length>120)memory.events=memory.events.slice(-120);memory.updatedAt=item.at;return item;
  }
  function setFact(memory,key,value,meta={}){
    memory=ensureMemory(memory);const source=meta.source||'crew_report',priority=SOURCE_PRIORITY[source]||0,previous=memory.facts[key];
    const item={value,source,priority,at:meta.at||nowIso(),confidence:meta.confidence||'reported'};
    if(!previous||priority>=Number(previous.priority||0))memory.facts[key]=item;
    return memory.facts[key];
  }
  function absorbCrewReport(memory,analysis,meta={}){
    memory=ensureMemory(memory);const source=analysis.emergency?'crew_emergency':analysis.intent==='confirmed_decision'?'crew_decision':analysis.atc?'crew_atc':'crew_report';
    recordEvent(memory,{type:'CREW_REPORT',source,flightNo:meta.flightNo||null,phase:meta.phase,summary:analysis.normalized,intent:analysis.intent,entities:analysis.entities});
    setFact(memory,'lastCrewReport',analysis.normalized,{source});
    if(analysis.entities.flightLevel)setFact(memory,analysis.atc?'clearedFlightLevel':'reportedFlightLevel',analysis.entities.flightLevel,{source});
    if(analysis.entities.runway)setFact(memory,analysis.atc?'atcRunway':'reportedRunway',analysis.entities.runway,{source});
    if(Number.isFinite(analysis.entities.fuelKg))setFact(memory,'reportedFuelKg',analysis.entities.fuelKg,{source});
    if(analysis.entities.ctotCancelled)setFact(memory,'ctot',{status:'CANCELLED',reportedAt:analysis.entities.time||null},{source});
    else if(analysis.entities.ctotMention&&analysis.entities.time)setFact(memory,'ctot',{status:'ACTIVE',time:analysis.entities.time},{source});
    if(analysis.entities.icaoCodes.length){
      setFact(memory,'lastMentionedAirports',analysis.entities.icaoCodes,{source});
      if(analysis.atc)setFact(memory,'clearedRoute',analysis.entities.icaoCodes,{source});
      else if(analysis.intent==='status_report')setFact(memory,'reportedRoute',analysis.entities.icaoCodes,{source});
    }
    return memory;
  }
  function rememberVoiceTurn(memory,role,text,meta={}){
    memory=ensureMemory(memory);memory.voiceTurns.push({at:nowIso(),role,text:String(text||'').slice(0,700),flightNo:meta.flightNo||null});
    if(memory.voiceTurns.length>16)memory.voiceTurns=memory.voiceTurns.slice(-16);memory.updatedAt=nowIso();return memory;
  }
  function addAction(memory,action){
    memory=ensureMemory(memory);const item=Object.assign({id:`ACT-${Date.now()}-${Math.random().toString(36).slice(2,5)}`,createdAt:nowIso(),status:'PENDING',priority:'ACTION'},action||{});
    memory.openActions.push(item);if(memory.openActions.length>30)memory.openActions=memory.openActions.slice(-30);return item;
  }
  function closeAction(memory,id,result){
    const action=ensureMemory(memory).openActions.find(item=>item.id===id);if(!action)return null;
    action.status='CLOSED';action.closedAt=nowIso();action.result=result||'';return action;
  }
  function acknowledgeLatestAction(memory,result='ACKNOWLEDGED BY CREW'){
    memory=ensureMemory(memory);const action=[...memory.openActions].reverse().find(item=>item.status!=='CLOSED');
    return action?closeAction(memory,action.id,result):null;
  }
  function createAmendment(memory,flight,changeSet,meta={}){
    memory=ensureMemory(memory);const revision=memory.amendments.length+1;
    const amendment={
      id:`AMDT-${String(revision).padStart(2,'0')}`,revision,issuedAt:nowIso(),flightNo:flight?.flightNo||'',
      kind:meta.kind||'OPERATIONAL AMENDMENT',priority:meta.priority||'ACTION',status:meta.status||'ISSUED',
      source:meta.source||'OPS',reason:meta.reason||changeSet?.summary||'OPERATIONAL CHANGE',
      position:meta.position||null,fuelReportedKg:meta.fuelReportedKg??memory.facts.reportedFuelKg?.value??null,
      original:{departure:flight?.dep||'',destination:flight?.arr||'',alternate:flight?.alt||'',route:flight?.simbrief?.ofp?.route||''},
      changes:Array.isArray(changeSet?.changes)?changeSet.changes:[],weather:meta.weather||null,notams:meta.notams||null,
      dispatcher:meta.dispatcher||'',crewStatus:meta.crewStatus||'ACKNOWLEDGED',openItems:meta.openItems||[]
    };
    memory.amendments.push(amendment);recordEvent(memory,{type:'AMENDMENT',source:meta.source||'OPS',flightNo:amendment.flightNo,summary:`${amendment.id} ${amendment.reason}`,amendmentId:amendment.id});return amendment;
  }
  function compactContext(memory){
    memory=ensureMemory(memory);const facts=Object.entries(memory.facts).slice(-12).map(([key,item])=>`${key}=${JSON.stringify(item.value)} (${item.source}, ${item.at})`).join('; ');
    const actions=memory.openActions.filter(item=>item.status!=='CLOSED').slice(-8).map(item=>`${item.id} ${item.category||item.priority}: ${item.summary||item.title||''} [${item.status}]`).join('; ');
    const turns=memory.voiceTurns.slice(-6).map(item=>`${item.flightNo?`[${item.flightNo}] `:''}${item.role}: ${item.text}`).join(' | ');
    const amendments=memory.amendments.slice(-3).map(item=>`${item.id} ${item.kind} ${item.status}: ${item.reason}`).join('; ');
    return `MÉMOIRE OPS PERSISTANTE. FAITS: ${facts||'aucun'}. ACTIONS OUVERTES: ${actions||'aucune'}. AMENDEMENTS: ${amendments||'aucun'}. DERNIERS ÉCHANGES VOCAUX: ${turns||'aucun'}.`;
  }
  function formatAcars(message={}){
    const priority=String(message.priority||'INFO').toUpperCase(),category=String(message.category||'OPS').toUpperCase();
    const title=`${category} ${message.sequence?`UPDATE ${String(message.sequence).padStart(2,'0')}`:'MESSAGE'} // ${priority}`;
    const header=`FLT ${message.flightNo||'---'} // ${message.time||'----Z'}`;
    const lines=(message.lines||[]).filter(Boolean).map(line=>String(line).trim().toUpperCase());
    if(message.action)lines.push(`ACTION: ${String(message.action).toUpperCase()}`);
    if(message.reply)lines.push(`REPLY: ${String(message.reply).toUpperCase()}`);
    if(message.source)lines.push(`SOURCE: ${String(message.source).toUpperCase()}`);
    return[title,header,...lines].join('\n');
  }

  const SCENARIOS={
    scheduled:[
      ['SCH01','NOMINAL TURNAROUND','turnaround','routine','sophie'],['SCH02','GATE OR STAND CHANGE','handling','minor','hind'],
      ['SCH03','BOARDING DELAY','load','minor','sophie'],['SCH04','PASSENGER DISCREPANCY','load','minor','sophie'],
      ['SCH05','LOADSHEET REVISION','load','minor','sophie'],['SCH06','CTOT OR NETWORK REGULATION','slot','minor','sophie'],
      ['SCH07','INBOUND AIRCRAFT DELAY','network','minor','marc'],['SCH08','AIRCRAFT SWAP','network','major','sophie'],
      ['SCH09','TURNAROUND TECHNICAL DEFECT','technical','major','antoine'],['SCH10','DESTINATION WEATHER OR RUNWAY CHANGE','weather','minor','sophie'],
      ['SCH11','CREW DUTY OR CREW CHANGE','crew','major','marc'],['SCH12','IRREGULAR OPERATIONS RECOVERY','recovery','major','marc']
    ],
    cargo:[
      ['CGO01','NOMINAL CARGO TURNAROUND','turnaround','routine','sophie'],['CGO02','LATE ARRIVING FREIGHT','load','minor','sophie'],
      ['CGO03','PAYLOAD OR PIECE COUNT REVISION','load','minor','sophie'],['CGO04','ULD MISSING OR DAMAGED','load','minor','antoine'],
      ['CGO05','DANGEROUS GOODS DOCUMENT REVIEW','dangerous_goods','major','antoine'],['CGO06','SECURITY INSPECTION','security','minor','marc'],
      ['CGO07','CUSTOMS OR MANIFEST HOLD','customs','minor','hind'],['CGO08','TEMPERATURE CONTROLLED SHIPMENT','special_load','minor','hind'],
      ['CGO09','GROUND LOADING EQUIPMENT FAILURE','handling','minor','antoine'],['CGO10','CTOT VERSUS HUB BANK','slot','minor','sophie'],
      ['CGO11','CURFEW WEATHER OR AIRPORT CLOSURE','airport','major','marc'],['CGO12','CARGO REROUTE OR TECHNICAL STOP','recovery','major','marc']
    ],
    business:[
      ['BUS01','NOMINAL QUICK TURN','turnaround','routine','hind'],['BUS02','CLIENT EARLY OR LATE','client','minor','sophie'],
      ['BUS03','PASSENGER LIST CHANGE','client','minor','hind'],['BUS04','CLIENT DESTINATION CHANGE','client','major','sophie'],
      ['BUS05','EMPTY REPOSITIONING','positioning','minor','sophie'],['BUS06','FBO OR HANDLING AVAILABILITY','handling','minor','hind'],
      ['BUS07','PERMIT CUSTOMS OR IMMIGRATION','permit','major','hind'],['BUS08','CATERING OR GROUND TRANSPORT','service','minor','hind'],
      ['BUS09','PARKING OR HANGAR CONSTRAINT','handling','minor','hind'],['BUS10','RUNWAY LIGHTING OR WEATHER LIMIT','airport','major','antoine'],
      ['BUS11','CREW DUTY REST OR OVERNIGHT','crew','major','marc'],['BUS12','TECHNICAL DIVERSION OR RECOVERY','recovery','major','marc']
    ]
  };
  const SCENARIO_DETAILS={
    SCH01:{phase:'ground',priority:'INFO',facts:['TURNAROUND ON SCHEDULE','LOAD AND HANDLING NOMINAL'],action:'REPORT READY WHEN AVAILABLE'},
    SCH02:{phase:'ground',priority:'ADVISORY',facts:['STATION PROPOSES A NEW GATE OR STAND'],action:'USE UPDATED STAND SUBJECT TO ATC CONFIRMATION',call:true},
    SCH03:{phase:'ground',priority:'ADVISORY',facts:['BOARDING COMPLETION IS RUNNING LATE'],action:'REPORT DOORS CLOSED AND NEW READY TIME'},
    SCH04:{phase:'ground',priority:'ACTION',facts:['BOOKED AND BOARDED PASSENGER COUNTS DO NOT MATCH'],action:'CONFIRM FINAL PAX COUNT BEFORE LOADSHEET'},
    SCH05:{phase:'ground',priority:'REVISION',facts:['LOAD CONTROL HAS ISSUED A COMMERCIAL LOAD REVISION'],action:'REVIEW NEW LOADSHEET DATA BEFORE ACCEPTANCE',call:true},
    SCH06:{phase:'ground',priority:'ACTION',facts:['NETWORK REGULATION OR CTOT IS ACTIVE'],action:'REPORT ANY ATC REVISION OR START-UP APPROVAL'},
    SCH07:{phase:'ground',priority:'ADVISORY',facts:['INBOUND AIRCRAFT DELAY AFFECTS THE ROTATION'],action:'STANDBY FOR UPDATED BOARDING AND OFF-BLOCK TARGET'},
    SCH08:{phase:'ground',priority:'REVISION',facts:['FLEET CONTROL IS STUDYING AN AIRCRAFT SWAP'],action:'DO NOT ACCEPT A NEW AIRCRAFT UNTIL FORMALLY CONFIRMED',call:true},
    SCH09:{phase:'ground',priority:'URGENT',facts:['A TURNAROUND TECHNICAL DEFECT REQUIRES CAMO REVIEW'],action:'REPORT TECH LOG WORDING AND HOLD DEPARTURE',call:true},
    SCH10:{phase:'any',priority:'ADVISORY',facts:['DESTINATION WEATHER OR RUNWAY CONFIGURATION IS CHANGING'],action:'REQUEST CURRENT ARRIVAL PACKAGE WHEN REQUIRED'},
    SCH11:{phase:'ground',priority:'ACTION',facts:['CREW CONTROL IS REVIEWING DUTY OR CREW COVERAGE'],action:'CONFIRM CREW STATUS AND LATEST ACCEPTABLE OFF-BLOCK',call:true},
    SCH12:{phase:'ground',priority:'URGENT',facts:['IRREGULAR OPERATIONS RECOVERY PLAN IS BEING BUILT'],action:'HOLD CURRENT PLAN AND CONTACT OPS',call:true},

    CGO01:{phase:'ground',priority:'INFO',facts:['CARGO TURNAROUND AND DOCUMENTATION NOMINAL'],action:'REPORT LOAD COMPLETE'},
    CGO02:{phase:'ground',priority:'ADVISORY',facts:['BOOKED FREIGHT HAS NOT YET REACHED THE AIRCRAFT'],action:'REPORT LATEST LOAD-CLOSE TIME'},
    CGO03:{phase:'ground',priority:'REVISION',facts:['LOAD CONTROL REPORTS A PAYLOAD OR PIECE-COUNT CHANGE'],action:'CONFIRM FINAL FIGURES BEFORE LOADSHEET'},
    CGO04:{phase:'ground',priority:'ACTION',facts:['A ULD IS MISSING OR REPORTED DAMAGED'],action:'CONFIRM ULD ID AND AIRWORTHINESS STATUS',call:true},
    CGO05:{phase:'ground',priority:'URGENT',facts:['DANGEROUS GOODS DOCUMENTATION REQUIRES REVIEW'],action:'HOLD LOADING AND CONTACT LOAD CONTROL',call:true},
    CGO06:{phase:'ground',priority:'ACTION',facts:['SECURITY INSPECTION HAS BEEN REQUESTED'],action:'DO NOT CLOSE LOAD UNTIL SECURITY RELEASE'},
    CGO07:{phase:'ground',priority:'ACTION',facts:['CUSTOMS OR MANIFEST RELEASE IS PENDING'],action:'STANDBY FOR FORMAL RELEASE',call:true},
    CGO08:{phase:'ground',priority:'ADVISORY',facts:['TEMPERATURE-CONTROLLED SHIPMENT REQUIRES MONITORING'],action:'REPORT LOADING TIME AND COMPARTMENT STATUS'},
    CGO09:{phase:'ground',priority:'ADVISORY',facts:['GROUND LOADING EQUIPMENT IS UNSERVICEABLE'],action:'REPORT REVISED LOAD-COMPLETE ESTIMATE'},
    CGO10:{phase:'ground',priority:'ACTION',facts:['CTOT CONFLICTS WITH HUB SORT OR CONNECTION BANK'],action:'REPORT ATC STATUS AND LOAD-CLOSE LIMIT'},
    CGO11:{phase:'any',priority:'URGENT',facts:['CURFEW WEATHER OR AIRPORT CLOSURE MAY AFFECT ARRIVAL'],action:'REQUEST RECOVERY OPTIONS FROM OPS',call:true},
    CGO12:{phase:'any',priority:'REVISION',facts:['CARGO REROUTE OR TECHNICAL STOP IS UNDER REVIEW'],action:'HOLD ORIGINAL PLAN UNTIL A FORMAL REVISION IS ISSUED',call:true},

    BUS01:{phase:'ground',priority:'INFO',facts:['QUICK TURN HANDLING AND CLIENT PROGRAM NOMINAL'],action:'REPORT READY STATUS'},
    BUS02:{phase:'ground',priority:'ADVISORY',facts:['CLIENT REPORTS EARLY OR LATE ARRIVAL AT THE FBO'],action:'CONFIRM CREW READY WINDOW'},
    BUS03:{phase:'ground',priority:'REVISION',facts:['PASSENGER LIST CHANGE REPORTED BY CLIENT REPRESENTATIVE'],action:'CONFIRM FINAL PAX AND DOCUMENTATION',call:true},
    BUS04:{phase:'ground',priority:'PROPOSAL',facts:['CLIENT REQUESTS A DESTINATION CHANGE'],action:'HOLD CURRENT DOSSIER WHILE OPS CHECKS FEASIBILITY',call:true},
    BUS05:{phase:'ground',priority:'ADVISORY',facts:['AN EMPTY POSITIONING SECTOR MAY BE REQUIRED'],action:'STANDBY FOR CONFIRMED ROUTING'},
    BUS06:{phase:'ground',priority:'ACTION',facts:['FBO OR HANDLING AVAILABILITY IS CONSTRAINED'],action:'CONFIRM ACCEPTABLE SERVICE WINDOW',call:true},
    BUS07:{phase:'ground',priority:'URGENT',facts:['PERMIT CUSTOMS OR IMMIGRATION CLEARANCE IS NOT CONFIRMED'],action:'HOLD DEPARTURE UNTIL RELEASE',call:true},
    BUS08:{phase:'ground',priority:'ADVISORY',facts:['CATERING OR GROUND TRANSPORT TIMING HAS CHANGED'],action:'CONFIRM CLIENT-READY TIME'},
    BUS09:{phase:'ground',priority:'ADVISORY',facts:['DESTINATION PARKING OR HANGAR CAPACITY IS LIMITED'],action:'STANDBY FOR FBO CONFIRMATION'},
    BUS10:{phase:'any',priority:'URGENT',facts:['RUNWAY LIGHTING OR WEATHER LIMIT MAY AFFECT DESTINATION SUITABILITY'],action:'REVIEW ALTERNATE AND REPORT CREW INTENTION',call:true},
    BUS11:{phase:'ground',priority:'ACTION',facts:['DUTY REST OR OVERNIGHT CONSTRAINT AFFECTS THE PROGRAM'],action:'CONFIRM CREW LIMIT AND REST REQUIREMENT',call:true},
    BUS12:{phase:'any',priority:'URGENT',facts:['TECHNICAL DIVERSION OR RECOVERY SUPPORT IS REQUIRED'],action:'CONTACT OPS WITH POSITION FUEL AND CREW INTENTION',call:true}
  };
  function scenarioObjects(type){
    return(SCENARIOS[type]||SCENARIOS.scheduled).map(row=>({id:row[0],operationType:type,title:row[1],category:row[2],severity:row[3],dispatcher:row[4],allowedPhases:row[3]==='routine'?[0,4]:[0,2,3,4]}));
  }
  function chooseScenario(memory,type,mode='normal',random=Math.random){
    memory=ensureMemory(memory);const state=memory.scenarioState,now=Date.now();
    const eventChance=mode==='challenging'?0.42:mode==='intense'?0.58:0.24;
    if(random()>eventChance){
      const routine=scenarioObjects(type).find(item=>item.severity==='routine')||null;
      if(routine){state.lastId=routine.id;state.lastAt=now;}return routine;
    }
    let pool=scenarioObjects(type).filter(item=>item.id!==state.lastId&&item.severity!=='routine');
    if(state.majorCount>=1&&mode==='normal')pool=pool.filter(item=>item.severity!=='major');
    if(!pool.length)return null;
    const minor=pool.filter(item=>item.severity==='minor'),major=pool.filter(item=>item.severity==='major');
    const chooseMajor=mode==='intense'?random()<0.35:mode==='challenging'?random()<0.22:random()<0.10;
    const candidates=chooseMajor&&major.length?major:minor.length?minor:pool;
    const selected=candidates[Math.floor(random()*candidates.length)];
    state.lastId=selected.id;state.lastAt=now;if(selected.severity==='major')state.majorCount++;
    return selected;
  }
  function scenarioDetail(id){return SCENARIO_DETAILS[id]||{phase:'any',priority:'INFO',facts:['OPERATIONAL UPDATE'],action:'ACKNOWLEDGE'};}

  global.OPS_CORE={VERSION,SOURCE_PRIORITY,DISPATCHER_PROFILES,SCENARIOS,SCENARIO_DETAILS,clean,recoverIcaoSequences,analyzeUtterance,
    createMemory,ensureMemory,recordEvent,setFact,absorbCrewReport,rememberVoiceTurn,addAction,closeAction,acknowledgeLatestAction,
    createAmendment,compactContext,formatAcars,scenarioObjects,chooseScenario,scenarioDetail};
})(typeof window!=='undefined'?window:globalThis);
