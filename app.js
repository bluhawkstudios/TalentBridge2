const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const BRAND_NAME = "G-NEXT";
const BRAND_SOURCE_NAME = "G-NEXT Database";
const APP_OPTIONS = {
  departments:["Engineering","Product","Design","Data & Analytics","Quality Assurance","Information Security","Sales","Marketing","Finance","Human Resources","Operations","Customer Success"],
  cities:["Ahmedabad","Bengaluru","Bhopal","Bhubaneswar","Chandigarh","Chennai","Coimbatore","Delhi","Delhi NCR","Gurugram","Hyderabad","Indore","Jaipur","Kochi","Kolkata","Lucknow","Mumbai","Mysuru","Nagpur","Noida","Pune","Surat","Thiruvananthapuram","Vadodara","Visakhapatnam","Remote"],
  locationsByState:{
    "Andhra Pradesh":["Visakhapatnam","Vijayawada","Tirupati"],"Assam":["Guwahati"],"Bihar":["Patna"],
    "Chandigarh":["Chandigarh"],"Delhi":["Delhi","Delhi NCR"],"Goa":["Panaji"],
    "Gujarat":["Ahmedabad","Surat","Vadodara","Rajkot"],"Haryana":["Gurugram","Faridabad"],
    "Karnataka":["Bengaluru","Mysuru","Mangaluru","Hubballi"],"Kerala":["Kochi","Thiruvananthapuram","Kozhikode"],
    "Madhya Pradesh":["Bhopal","Indore"],"Maharashtra":["Mumbai","Pune","Nagpur","Nashik"],
    "Odisha":["Bhubaneswar"],"Punjab":["Ludhiana","Amritsar"],"Rajasthan":["Jaipur","Jodhpur"],
    "Tamil Nadu":["Chennai","Coimbatore","Madurai"],"Telangana":["Hyderabad"],"Uttar Pradesh":["Noida","Lucknow","Ghaziabad"],
    "West Bengal":["Kolkata"],"Remote":["Remote"]
  },
  skills:["Java","Spring Boot","Microservices","Python","Django","JavaScript","TypeScript","React","Angular","Vue.js","Node.js","AWS","Azure","Google Cloud","Docker","Kubernetes","Terraform","SQL","PostgreSQL","MongoDB","Spark","Kafka","Databricks","Figma","UX Research","Product Strategy","Agile","Scrum","Selenium","API Testing","Cybersecurity","Data Analytics","Power BI","Tableau"],
  permanentSalary:["₹3–5 LPA","₹5–8 LPA","₹8–12 LPA","₹12–18 LPA","₹18–25 LPA","₹25–35 LPA","₹35–50 LPA","₹50–75 LPA","₹75 LPA+"],
  contractSalary:["₹50,000–₹75,000 / month","₹75,000–₹1,00,000 / month","₹1,00,000–₹1,25,000 / month","₹1,25,000–₹1,50,000 / month","₹1,50,000–₹2,00,000 / month","₹2,00,000–₹3,00,000 / month","₹3,00,000+ / month"],
  workModes:["Hybrid","Remote","Onsite"],
  urgency:["Critical","High","Medium","Low"]
};
function profileStateForCity(city){
  return Object.entries(APP_OPTIONS.locationsByState).find(([,cities])=>cities.includes(city))?.[0]||"";
}
function displayDate(date){
  return date.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
}
function formatProfileDate(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value||""))return value||"";
  const [year,month,day]=value.split("-").map(Number);
  return displayDate(new Date(year,month-1,day));
}
function lastWorkingDateFromNotice(notice){
  const value=String(notice||"").trim();
  if(/immediate/i.test(value))return "To be confirmed";
  const days=Number((value.match(/\d+/)||[])[0]||0);
  if(!days)return "To be confirmed";
  const date=new Date();
  date.setDate(date.getDate()+days);
  return displayDate(date);
}
function candidateLastWorkingDate(candidate){
  return formatProfileDate(candidate.lastWorkingDay)||formatProfileDate(candidate.lastWorkingDate)||lastWorkingDateFromNotice(candidate.notice);
}
const LEAVING_REASONS=[
  "Looking for stronger career growth and a wider technical scope.",
  "Seeking a role with better alignment to long-term career goals.",
  "Project ending and candidate is exploring a stable opportunity.",
  "Relocation preference and better work-mode fit.",
  "Compensation and responsibility growth expectations."
];
const PROFILE_EXPERIENCE_DEMO=[
  {company:"Northstar Design Studio",designation:"Senior Product Designer",startMonth:"2021-04",endMonth:"2026-06",reasonForLeaving:"Seeking a larger product mandate with deeper ownership across research, design systems, and business impact."},
  {company:"PixelCraft Labs",designation:"Product Designer",startMonth:"2018-07",endMonth:"2021-03",reasonForLeaving:"Moved to a senior role with broader stakeholder exposure and platform-level design responsibilities."},
  {company:"BluePeak Digital",designation:"UX Designer",startMonth:"2016-06",endMonth:"2018-06",reasonForLeaving:"Wanted to transition from execution-focused UX work into end-to-end product design."}
];
const DEMO_COMPANIES=["Accenture","Infosys","TCS","Wipro","Cognizant","Capgemini","HCLTech","Tech Mahindra","Zoho","Freshworks","Mindtree","Publicis Sapient"];
const DEMO_DESIGNATIONS=["Associate","Executive","Analyst","Consultant","Specialist","Senior Specialist","Lead"];
function demoExperienceFor(candidate,index){
  if(candidate?.name==="Rohan Kapoor"||candidate?.email===state?.profile?.email)return PROFILE_EXPERIENCE_DEMO;
  const role=candidate?.role||"Professional";
  const previousRole=role.includes("Manager")?"Team Lead":role.includes("Designer")?"UX Designer":role.includes("Engineer")?"Software Engineer":role.includes("Analyst")?"Business Analyst":DEMO_DESIGNATIONS[index%DEMO_DESIGNATIONS.length];
  return [
    {company:candidate?.client||DEMO_COMPANIES[index%DEMO_COMPANIES.length],designation:role,startMonth:`${2021+(index%2)}-0${1+(index%6)}`,endMonth:"2026-06",reasonForLeaving:LEAVING_REASONS[index%LEAVING_REASONS.length]},
    {company:DEMO_COMPANIES[(index+3)%DEMO_COMPANIES.length],designation:previousRole,startMonth:`${2018+(index%2)}-0${1+((index+2)%6)}`,endMonth:`2021-0${1+((index+3)%6)}`,reasonForLeaving:LEAVING_REASONS[(index+1)%LEAVING_REASONS.length]},
    {company:DEMO_COMPANIES[(index+6)%DEMO_COMPANIES.length],designation:DEMO_DESIGNATIONS[index%DEMO_DESIGNATIONS.length],startMonth:`2015-0${1+((index+4)%6)}`,endMonth:`2018-0${1+((index+5)%6)}`,reasonForLeaving:LEAVING_REASONS[(index+2)%LEAVING_REASONS.length]}
  ];
}
const EDUCATION_LEVELS=["Graduation","HSC","SSC"];
function normalizeEducationEntries(entries=[]){
  const source=Array.isArray(entries)?entries:[];
  const byLevel=new Map(source.map(entry=>[entry.level,entry]));
  return EDUCATION_LEVELS.map((level,index)=>{
    const entry=byLevel.get(level)||source[index]||{};
    return {
      level,
      degree:entry.degree||"",
      year:entry.year||"",
      university:entry.university||entry.institute||""
    };
  });
}
const PIPELINE_STAGES=["Sourced","Screened","AI Interview","Client Review","L1 Interview","L2 Interview","L3 Interview","Offered","Joined"];
const INTERVIEW_ROUNDS=["Recruiter Screen","AI Technical","Client L1","L2 – Portfolio","L3 – Leadership / Final","HR Round"];
const STAGE_ALIASES={Applied:"Sourced",AI:"AI Interview",Client:"Client Review",Interview:"L1 Interview",Offer:"Offered"};
const stageName = value => STAGE_ALIASES[String(value)]||String(value);
const stageClass = value => {
  const name=stageName(value);
  return PIPELINE_STAGES.includes(name)?`stage-color stage-${name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`:"";
};
const pipelineBarHeight = (value,max,plotHeight=145) => value>0?Math.max(18,Math.round(value/Math.max(max,1)*plotHeight)):3;
const matchesPipelineFilter = (candidate,value) => {
  if(value==="All")return true;
  if(value==="Interview")return /L[123] Interview/.test(candidate.stage);
  if(value==="Offer")return candidate.stage==="Offered";
  return candidate.type===value||candidate.stage===value;
};
const pipelineDestination = role => role==="Client"?"cv-review":role==="Recruiter"?"sourcing":role==="Candidate"?"applications":"candidates";

const roles = {
  Client: {
    user: "Ananya Sharma", company: "Northstar Systems", email: "client@gnext.ai",
    nav: [["dashboard","Dashboard","⌂"],["job-type","Post a Job","＋"],["jobs","My Job Listings","▤"],["cv-review","CV Review","◫"],["interviews","Interviews","◷"],["offers","Offers & Contracts","◇"],["documents","Documents","▱"]]
  },
  Admin: {
    user: "Arjun Mehta", company: "G-NEXT Admin", email: "admin@gnext.ai",
    nav: [["dashboard","Dashboard","⌂"],["users","User Management","♙"],["clients","Client Management","▦"],["jobs","Job Management","▤"],["candidates","Candidates & Contractors","♧"],["interviews","Interviews","◷"],["ai-sourcing","AI Sourcing","✦"],["integrations","Integrations","⚡"],["leads","Lead Generation","⌁"],["reports","Reports & Analytics","▥"],["settings","Settings","⚙"]]
  },
  Recruiter: {
    user: "Priya Nair", company: "G-NEXT Recruitment", email: "recruiter@gnext.ai",
    nav: [["dashboard","Dashboard","⌂"],["jobs","My Assigned Jobs","▤"],["sourcing","Candidate Sourcing","✦"],["ai-sourcing","AI Sourcing","✦"],["interviews","Interview Scheduling","◷"],["communication","Communication Hub","✉"],["ai-interview","AI Technical Interview","◎"]]
  },
  Candidate: {
    user: "Rohan Kapoor", company: "Candidate Portal", email: "candidate@gnext.ai",
    nav: [["dashboard","Dashboard","⌂"],["profile","My Profile","♙"],["applications","My Applications","▤"],["interviews","Interviews & Assessments","◷"],["communication","Communication","✉"],["offers","Offer & Joining","◇"]]
  }
};

const seed = {
  jobs: [
    {id:"JOB-1042",title:"Senior Product Designer",type:"Permanent",client:"Northstar Systems",location:"Bengaluru",mode:"Hybrid",status:"Active",recruiter:"Priya Nair",openings:2,cv:18,interviews:6,offers:1,skills:"Figma, Product strategy, Design systems",salary:"₹28–34 LPA",date:"08 Jun 2026"},
    {id:"JOB-1039",title:"Data Engineer",type:"Contract",client:"Acme Fintech",location:"Remote",mode:"Remote",status:"Active",recruiter:"Karan Shah",openings:4,cv:24,interviews:8,offers:2,skills:"Python, Spark, AWS",salary:"₹1.8L / month",date:"04 Jun 2026"},
    {id:"JOB-1035",title:"Engineering Manager",type:"Permanent",client:"Northstar Systems",location:"Pune",mode:"Hybrid",status:"On Hold",recruiter:"Priya Nair",openings:1,cv:12,interviews:3,offers:0,skills:"Engineering leadership, Java",salary:"₹42–48 LPA",date:"30 May 2026"},
    {id:"JOB-1028",title:"React Developer",type:"Contract",client:"Orbit Labs",location:"Hyderabad",mode:"Onsite",status:"Active",recruiter:"Priya Nair",openings:3,cv:31,interviews:11,offers:3,skills:"React, TypeScript, Node.js",salary:"₹1.4L / month",date:"21 May 2026"}
  ],
  candidates: [
    {id:"CAN-2041",name:"Rohan Kapoor",role:"Senior Product Designer",type:"Permanent",stage:"L2 Interview",score:92,location:"Bengaluru",notice:"30 days",email:"rohan.k@example.com",phone:"+91 98765 43120",ctc:"₹24 LPA",skills:"Figma, Research, Design systems"},
    {id:"CAN-2038",name:"Meera Iyer",role:"Data Engineer",type:"Contract",stage:"Client Review",score:88,location:"Chennai",notice:"Immediate",email:"meera.i@example.com",phone:"+91 98711 22990",ctc:"₹1.5L / month",skills:"Python, Spark, Databricks"},
    {id:"CAN-2033",name:"Vikram Singh",role:"React Developer",type:"Contract",stage:"AI Interview",score:84,location:"Hyderabad",notice:"15 days",email:"vikram.s@example.com",phone:"+91 98845 78012",ctc:"₹1.2L / month",skills:"React, TypeScript, Next.js"},
    {id:"CAN-2027",name:"Sara Khan",role:"Engineering Manager",type:"Permanent",stage:"Sourced",score:79,location:"Pune",notice:"60 days",email:"sara.k@example.com",phone:"+91 98201 39211",ctc:"₹38 LPA",skills:"Java, Leadership, Cloud"},
    {id:"CAN-2021",name:"Aditya Rao",role:"Data Engineer",type:"Contract",stage:"Offered",score:95,location:"Remote",notice:"Immediate",email:"aditya.r@example.com",phone:"+91 98011 65432",ctc:"₹1.7L / month",skills:"AWS, Python, Kafka"}
  ],
  interviews: [
    {id:"INT-502",candidate:"Rohan Kapoor",role:"Senior Product Designer",round:"L2 – Portfolio",date:"15 Jun 2026",time:"11:00 AM",mode:"Video",interviewer:"Neha Gupta",status:"Confirmed"},
    {id:"INT-499",candidate:"Vikram Singh",role:"React Developer",round:"AI Technical",date:"14 Jun 2026",time:"3:30 PM",mode:"AI Room",interviewer:"G-NEXT AI",status:"Confirmed"},
    {id:"INT-495",candidate:"Meera Iyer",role:"Data Engineer",round:"Client L1",date:"16 Jun 2026",time:"2:00 PM",mode:"Video",interviewer:"Rakesh Menon",status:"Pending"}
  ],
  users: [
    {name:"Ananya Sharma",email:"client@gnext.ai",role:"Client",status:"Active",last:"Today, 9:42 AM"},
    {name:"Arjun Mehta",email:"admin@gnext.ai",role:"Admin",status:"Active",last:"Today, 10:15 AM"},
    {name:"Priya Nair",email:"recruiter@gnext.ai",role:"Recruiter",status:"Active",last:"Today, 10:02 AM"},
    {name:"Rohan Kapoor",email:"candidate@gnext.ai",role:"Candidate",status:"Active",last:"Yesterday, 8:36 PM"},
    {name:"Karan Shah",email:"karan@gnext.ai",role:"Recruiter",status:"Active",last:"Today, 8:50 AM"}
  ],
  leads: [
    {company:"Zephyr Commerce",contact:"Nitin Jain",source:"LinkedIn",stage:"Qualified",value:"₹6.5L",owner:"Arjun Mehta"},
    {company:"CloudNine Health",contact:"Divya Bose",source:"Referral",stage:"Proposal",value:"₹9.2L",owner:"Ananya Sen"},
    {company:"Kinetic Foods",contact:"Manish Roy",source:"Website",stage:"New",value:"₹3.8L",owner:"Arjun Mehta"},
    {company:"Vertex Mobility",contact:"Sonia Das",source:"Event",stage:"Negotiation",value:"₹12L",owner:"Ananya Sen"}
  ],
  messages: [
    {from:"Priya Nair",text:"Hi Rohan, your portfolio round is confirmed for Monday at 11 AM.",time:"10:24 AM",me:false},
    {from:"Rohan Kapoor",text:"Thanks, Priya. I have confirmed the slot and received the meeting link.",time:"10:31 AM",me:true},
    {from:"Priya Nair",text:"Perfect. I’ve also shared the preparation note. Good luck!",time:"10:33 AM",me:false}
  ],
  notifications: ["3 CVs are awaiting client feedback","Interview slot proposed for Meera Iyer","Aditya Rao accepted the contract","New AI sourcing campaign completed"],
  profile: {
    name:"Rohan Kapoor",email:"rohan.k@example.com",phone:"+91 98765 43120",location:"Bengaluru",preference:"Permanent",
    currentFixed:22,currentVariable:2,expectedCtc:30,notice:"30 days",lastWorkingDay:"",
    skills:"Figma, UX Research, Product Strategy, Prototyping",
    educationEntries:[{degree:"B.Des",year:"2018",percentage:"82"}],
    experienceEntries:PROFILE_EXPERIENCE_DEMO,
    experienceGapReason:"",completion:86
  }
};

function buildSimulationData() {
  const clients = [
    ["Northstar Systems","Ananya Sharma","Permanent · 8.33%"],
    ["Acme Fintech","Rahul Bhat","Contract · 18% markup"],
    ["Orbit Labs","Sneha Paul","Contract · 16% markup"],
    ["Zenith Retail","Mohit Jain","Permanent · 7.5%"],
    ["CloudNine Health","Divya Bose","Permanent · 8%"],
    ["Vertex Mobility","Sonia Das","Contract · 17% markup"],
    ["Kinetic Foods","Manish Roy","Permanent · 7.75%"],
    ["Zephyr Commerce","Nitin Jain","Contract · 15% markup"],
    ["BluePeak Energy","Kavya Menon","Permanent · 8.5%"],
    ["Nova Learning","Amit Suri","Permanent · 7.25%"]
  ].map((row,index)=>({
    id:`CLI-${String(index+1).padStart(3,"0")}`,company:row[0],contact:row[1],
    email:`${row[1].toLowerCase().replaceAll(" ",".")}@${row[0].toLowerCase().replace(/[^a-z]/g,"")}.example`,
    commercials:row[2],status:index===3?"On Hold":"Active",agreement:index===3?"Draft":"Signed",
    nda:index===2?"Expires soon":index===3?"Pending":"Active"
  }));
  const recruiters = ["Priya Nair","Karan Shah","Ananya Sen","Dev Malhotra","Ishita Rao"];
  const jobTemplates = [
    ["Senior Product Designer","Figma, Product strategy, Design systems"],
    ["Data Engineer","Python, Spark, AWS"],
    ["Engineering Manager","Leadership, Java, Cloud"],
    ["React Developer","React, TypeScript, Node.js"],
    ["Backend Engineer","Java, Spring Boot, Microservices"],
    ["Product Manager","Roadmaps, Analytics, Stakeholder management"],
    ["DevOps Engineer","AWS, Kubernetes, Terraform"],
    ["QA Automation Engineer","Selenium, API testing, Java"],
    ["Business Analyst","SQL, Process mapping, Agile"],
    ["UX Researcher","Research, Testing, Insights"],
    ["Mobile Developer","Flutter, Dart, Firebase"],
    ["Cybersecurity Analyst","SIEM, SOC, Incident response"]
  ];
  const locations = ["Bengaluru","Pune","Hyderabad","Chennai","Mumbai","Delhi NCR","Remote"];
  const modes = APP_OPTIONS.workModes;
  const jobs = Array.from({length:24},(_,index)=>{
    const template=jobTemplates[index%jobTemplates.length];
    const client=clients[index%clients.length];
    const type=index%3===1?"Contract":"Permanent";
    return {
      id:`JOB-${1101+index}`,title:template[0],department:APP_OPTIONS.departments[index%APP_OPTIONS.departments.length],type,client:client.company,clientId:client.id,
      location:locations[index%locations.length],mode:modes[index%modes.length],
      status:index%9===4?"On Hold":index%13===8?"Closed":"Active",assignmentStatus:"Assigned",urgency:APP_OPTIONS.urgency[index%APP_OPTIONS.urgency.length],recruiter:recruiters[index%recruiters.length],
      openings:1+(index%5),cv:0,interviews:0,offers:0,skills:template[1],
      salary:type==="Contract"?APP_OPTIONS.contractSalary[index%APP_OPTIONS.contractSalary.length]:APP_OPTIONS.permanentSalary[index%APP_OPTIONS.permanentSalary.length],
      date:`${String(1+(index%12)).padStart(2,"0")} Jun 2026`
    };
  });
  const firstNames=["Aarav","Aisha","Akash","Anika","Arjun","Avni","Dev","Diya","Farhan","Ira","Ishaan","Jhanvi","Kabir","Kavya","Krish","Maya","Meera","Neel","Nisha","Pranav","Rhea","Rishi","Riya","Rohan","Saanvi","Sara","Shreya","Siddharth","Tanya","Varun","Vikram","Zoya"];
  const lastNames=["Kapoor","Iyer","Singh","Khan","Rao","Sharma","Patel","Menon","Gupta","Mehta","Nair","Das","Jain","Roy","Bose","Suri","Bhat","Paul","Malhotra","Chopra"];
  const stages=PIPELINE_STAGES;
  const notices=["Immediate","15 days","30 days","45 days","60 days"];
  const clientStageCounters={};
  const candidates=Array.from({length:100},(_,index)=>{
    const job=jobs[index%jobs.length];
    const name=index===0?"Rohan Kapoor":`${firstNames[(index+7)%firstNames.length]} ${lastNames[(index*3+2)%lastNames.length]}`;
    const clientSequence=clientStageCounters[job.client]||0;
    clientStageCounters[job.client]=clientSequence+1;
    const clientOffset=clients.findIndex(client=>client.company===job.client)*2;
    const stage=index===0?"L2 Interview":stages[(clientSequence+clientOffset)%stages.length];
    return {
      id:`CAN-${3001+index}`,name,jobId:job.id,role:job.title,type:job.type,client:job.client,
      recruiter:job.recruiter,stage,score:68+(index*7%31),location:locations[(index+2)%locations.length],
      notice:notices[index%notices.length],email:index===0?"rohan.k@example.com":`${name.toLowerCase().replaceAll(" ",".")}${index}@example.com`,
      phone:`+91 98${String(70000000+index*7919).slice(-8)}`,
      ctc:job.type==="Contract"?`₹${(1+(index%9)*.1).toFixed(1)}L / month`:`₹${14+(index%14)*2} LPA`,
      skills:job.skills
    };
  });
  const interviewCandidates=candidates.filter((candidate,index)=>index===0||["AI Interview","L1 Interview","L2 Interview","L3 Interview","Offered","Joined"].includes(candidate.stage)).slice(0,64);
  const rounds=INTERVIEW_ROUNDS;
  const interviewers=["Neha Gupta","Rakesh Menon","G-NEXT AI","Ananya Sharma","Vivek Suri"];
  const interviews=interviewCandidates.map((candidate,index)=>{
    const day=index===0?15:1+(index%28);
    const completed=day<13 || candidate.stage==="Joined";
    return {
      id:`INT-${7001+index}`,candidateId:candidate.id,candidate:candidate.name,jobId:candidate.jobId,
      role:candidate.role,round:rounds[index%rounds.length],date:`${String(day).padStart(2,"0")} Jun 2026`,
      time:["10:00 AM","11:30 AM","2:00 PM","3:30 PM","5:00 PM"][index%5],
      mode:["Video","AI Room","In person"][index%3],interviewer:interviewers[index%interviewers.length],
      status:completed?"Completed":index%4===0?"Pending":"Confirmed"
    };
  });
  jobs.forEach(job=>{
    const linked=candidates.filter(candidate=>candidate.jobId===job.id);
    job.cv=linked.length;
    job.interviews=interviews.filter(interview=>interview.jobId===job.id).length;
    job.offers=linked.filter(candidate=>["Offered","Joined"].includes(candidate.stage)).length;
  });
  const candidateUsers=candidates.slice(0,81).map(candidate=>({name:candidate.name,email:candidate.email,role:"Candidate",status:"Active",last:`${1+(Number(candidate.id.slice(-2))%12)} hr ago`}));
  const users=[
    {name:"Arjun Mehta",email:"admin@gnext.ai",role:"Admin",status:"Active",last:"Today, 10:15 AM"},
    ...clients.map(client=>({name:client.contact,email:client.email,role:"Client",status:client.status==="Active"?"Active":"Inactive",last:"Today"})),
    ...recruiters.map((name,index)=>({name,email:index===0?"recruiter@gnext.ai":`${name.toLowerCase().replaceAll(" ",".")}@gnext.ai`,role:"Recruiter",status:"Active",last:"Today"})),
    ...candidateUsers
  ].slice(0,100);
  const leadStages=["New","Qualified","Proposal","Negotiation"];
  const sources=["LinkedIn","Referral","Website","Event"];
  const leads=Array.from({length:40},(_,index)=>({
    company:`${["Aster","Bright","Core","Delta","Elevate","Fusion","Green","Helix"][index%8]} ${["Digital","Works","Group","Labs","Solutions"][index%5]} ${index+1}`,
    contact:`${firstNames[index%firstNames.length]} ${lastNames[(index+4)%lastNames.length]}`,
    source:sources[index%sources.length],stage:leadStages[index%leadStages.length],
    value:`₹${3+(index%12)}.${index%10}L`,owner:index%2?"Ananya Sen":"Arjun Mehta"
  }));
  const notifications=[
    `${candidates.filter(candidate=>candidate.stage==="Client Review").length} profiles await client feedback`,
    `${interviews.filter(interview=>interview.status==="Pending").length} interviews need confirmation`,
    `${candidates.filter(candidate=>candidate.stage==="Offered").length} offers await response`,
    `${jobs.filter(job=>job.status==="Active").length} active jobs across ${clients.length} clients`
  ];
  const documentTypes=["Service Agreement","NDA","Invoice","Payment Receipt"];
  const documents=Array.from({length:30},(_,index)=>{
    const client=clients[index%clients.length];
    const category=documentTypes[index%documentTypes.length];
    return {
      id:`DOC-${8001+index}`,clientId:client.id,client:client.company,
      name:category==="Invoice"?`INV-2026-${String(41+index).padStart(3,"0")}`:`${client.company} ${category}`,
      category,amount:category==="Invoice"?`₹${(1.2+(index%8)*.35).toFixed(2)}L`:"",
      status:category==="Invoice"?["Paid","Pending","Overdue"][index%3]:index%7===0?"Pending":"Active",
      date:`${String(1+(index%20)).padStart(2,"0")} Jun 2026`
    };
  });
  return {simulationVersion:7,clients,recruiters,jobs,candidates,interviews,users,leads,notifications,assignmentNotifications:[],documents};
}

const storedState = JSON.parse(localStorage.getItem("talentos-state") || "null");
const simulation = buildSimulationData();
let state = !storedState || storedState.simulationVersion !== simulation.simulationVersion
  ? {...seed,...simulation,profile:storedState?.profile||seed.profile,teamChats:storedState?.teamChats}
  : storedState;
const numericLpa=value=>{
  const match=String(value||"").match(/[\d.]+/);
  return match?Number(match[0]):0;
};
state.profile.currentFixed=Number.isFinite(Number(state.profile.currentFixed))?Number(state.profile.currentFixed):numericLpa(state.profile.current)||22;
state.profile.currentVariable=Number.isFinite(Number(state.profile.currentVariable))?Number(state.profile.currentVariable):2;
state.profile.expectedCtc=Number.isFinite(Number(state.profile.expectedCtc))?Number(state.profile.expectedCtc):
  (Number.isFinite(Number(state.profile.expectedFixed))?Number(state.profile.expectedFixed):numericLpa(state.profile.expected)||28)
  +(Number.isFinite(Number(state.profile.expectedVariable))?Number(state.profile.expectedVariable):2);
state.profile.lastWorkingDay=/^\d{4}-\d{2}-\d{2}$/.test(state.profile.lastWorkingDay||state.profile.availability)?(state.profile.lastWorkingDay||state.profile.availability):"";
state.profile.city ||= [...APP_OPTIONS.cities].sort((a,b)=>b.length-a.length).find(city=>String(state.profile.location||"").includes(city))||state.profile.location||"";
state.profile.state ||= profileStateForCity(state.profile.city)||"";
state.profile.locality ||= "";
state.profile.location=[state.profile.locality,state.profile.city,state.profile.state].filter(Boolean).join(", ");
state.profile.educationEntries=normalizeEducationEntries(Array.isArray(state.profile.educationEntries)&&state.profile.educationEntries.length?state.profile.educationEntries:[{degree:state.profile.education?.split(",")[0]||"",year:"",university:""}]);
state.profile.experienceEntries=Array.isArray(state.profile.experienceEntries)&&state.profile.experienceEntries.length?state.profile.experienceEntries:[{company:"",designation:state.profile.experience||"",startMonth:"",endMonth:""}];
if(state.profile.name==="Rohan Kapoor"&&state.profile.experienceEntries.length<3)state.profile.experienceEntries=PROFILE_EXPERIENCE_DEMO;
state.profile.experienceEntries=state.profile.experienceEntries.map(entry=>{
  const designation=String(entry.designation||"").trim();
  const durationOnly=/^\d+(?:\.\d+)?\s*(?:years?|yrs?|months?|mos?)$/i.test(designation);
  return {...entry,designation:durationOnly?"":designation,reasonForLeaving:entry.reasonForLeaving||""};
});
state.profile.experienceGapReason ||= "";
state.profile.experienceGapReasons=Array.isArray(state.profile.experienceGapReasons)?state.profile.experienceGapReasons:[];
state.profile.completion=profileCompletionPercent(state.profile);
state.integrations ||= [
  {id:"linkedin",name:"LinkedIn",category:"Professional network",connected:true,enabled:true,apiKey:"••••••••••••LNK4",lastSync:"Today, 9:20 AM"},
  {id:"apollo",name:"Apollo",category:"Talent & contact data",connected:true,enabled:true,apiKey:"••••••••••••APL8",lastSync:"Today, 9:18 AM"},
  {id:"github",name:"GitHub",category:"Developer profiles",connected:false,enabled:false,apiKey:"",lastSync:"Never"},
  {id:"indeed",name:"Indeed",category:"Job marketplace",connected:false,enabled:false,apiKey:"",lastSync:"Never"},
  {id:"naukri",name:"Naukri",category:"India talent marketplace",connected:false,enabled:false,apiKey:"",lastSync:"Never"},
  {id:"custom",name:"Custom REST API",category:"Private talent source",connected:false,enabled:false,apiKey:"",lastSync:"Never"}
];
state.externalTalent ||= state.candidates.slice(0,60).map((candidate,index)=>({
  id:`EXT-${5001+index}`,name:`${candidate.name.split(" ")[0]} ${["Verma","Kulkarni","Deshpande","Chawla","Reddy","Banerjee","Saxena","Pillai","Agarwal","Krishnan"][index%10]}`,role:candidate.role,skills:candidate.skills,location:candidate.location,
  score:candidate.score,experience:2+(index%14),availability:candidate.notice,currentCompany:["Infosys","TCS","Accenture","Wipro","Product startup","Independent"][index%6],
  education:["B.Tech","M.Tech","MBA","B.Sc","B.Des"][index%5],source:["LinkedIn","Apollo","GitHub","Indeed","Naukri"][index%5],
  email:index%3===0?candidate.email:"Available after import",phone:index%4===0?candidate.phone:"Available after import"
}));
state.externalTalent=state.externalTalent.map((profile,index)=>({
  ...profile,
  summary:profile.summary||`${profile.role} with ${profile.experience} years of experience across ${profile.skills}. Experienced in delivering outcomes in fast-paced teams.`,
  experienceEntries:profile.experienceEntries||[
    {company:profile.currentCompany,designation:profile.role,startMonth:`${2018+(index%4)}-01`,endMonth:"2026-06",reasonForLeaving:LEAVING_REASONS[index%LEAVING_REASONS.length]},
    {company:["Tech Mahindra","Cognizant","Capgemini","HCLTech"][index%4],designation:index%2?"Consultant":"Specialist",startMonth:`${2014+(index%3)}-06`,endMonth:`${2017+(index%4)}-12`,reasonForLeaving:LEAVING_REASONS[(index+1)%LEAVING_REASONS.length]}
  ],
  educationEntries:normalizeEducationEntries(profile.educationEntries||[{degree:profile.education,institute:["IIT Delhi","Pune University","Anna University","Mumbai University"][index%4],year:String(2012+(index%8))}])
}));
state.candidates=state.candidates.map((candidate,index)=>{
  const isProfileCandidate=candidate.name===state.profile.name||candidate.email===state.profile.email;
  const sourcedProfile=state.externalTalent.find(profile=>profile.id===candidate.sourceProfileId);
  const profileLastWorkingDate=isProfileCandidate&&state.profile.lastWorkingDay?state.profile.lastWorkingDay:"";
  const storedLastWorkingDate=String(candidate.lastWorkingDate||"").trim();
  return {
    ...candidate,
    lastWorkingDay:candidate.lastWorkingDay||profileLastWorkingDate,
    lastWorkingDate:profileLastWorkingDate||(/immediate/i.test(storedLastWorkingDate)?"":storedLastWorkingDate)||candidate.lastWorkingDay||lastWorkingDateFromNotice(candidate.notice),
    reasonForLeaving:candidate.reasonForLeaving||LEAVING_REASONS[index%LEAVING_REASONS.length],
    summary:candidate.summary||(isProfileCandidate?`${state.profile.experienceEntries?.[0]?.designation||candidate.role} experienced in ${state.profile.skills}.`:sourcedProfile?.summary||`${candidate.role} with experience in ${candidate.skills}, currently available in ${candidate.location}.`),
    experienceEntries:candidate.experienceEntries||(isProfileCandidate?state.profile.experienceEntries:sourcedProfile?.experienceEntries||demoExperienceFor(candidate,index)),
    experienceGapReasons:Array.isArray(candidate.experienceGapReasons)?candidate.experienceGapReasons:(isProfileCandidate?state.profile.experienceGapReasons:[]),
    experienceGapReason:candidate.experienceGapReason||"",
    educationEntries:normalizeEducationEntries(candidate.educationEntries||(isProfileCandidate?state.profile.educationEntries:sourcedProfile?.educationEntries||[{degree:["B.Tech","MBA","M.Sc","B.Des"][index%4],institute:["State University","National Institute of Technology","Business School","Design Institute"][index%4],year:String(2014+(index%9))}]))
  };
});
state.candidates=state.candidates.map((candidate,index)=>({
  ...candidate,
  experienceEntries:(candidate.experienceEntries&&candidate.experienceEntries.length>=3)?candidate.experienceEntries:demoExperienceFor(candidate,index),
}));
state.candidates=state.candidates.map((candidate,index)=>({
  ...candidate,
  experienceEntries:(candidate.experienceEntries||[]).map((entry,entryIndex)=>({
    ...entry,
    reasonForLeaving:entry.reasonForLeaving||candidate.reasonForLeaving||LEAVING_REASONS[(index+entryIndex)%LEAVING_REASONS.length]
  }))
}));
state.profile.candidateId ||= state.candidates.find(candidate=>candidate.email===state.profile.email)?.id
  || state.candidates.find(candidate=>candidate.name===state.profile.name)?.id
  || state.candidates[0]?.id
  || "";
const talentBridgeProfiles=state.candidates.map((candidate,index)=>({
  id:`TBD-${candidate.id}`,candidateId:candidate.id,name:candidate.name,role:candidate.role,skills:candidate.skills,
  location:candidate.location,score:candidate.score,experience:Math.max(1,candidate.experienceEntries?.length?candidate.experienceEntries.length*3:2+(index%10)),
  availability:candidate.notice,currentCompany:candidate.experienceEntries?.[0]?.company||candidate.client||"Not provided",
  education:candidate.educationEntries?.[0]?.degree||"Not provided",source:BRAND_SOURCE_NAME,
  email:candidate.email,phone:candidate.phone,summary:candidate.summary,
  experienceEntries:candidate.experienceEntries,educationEntries:candidate.educationEntries
}));
state.externalTalent=[
  ...state.externalTalent
    .map(profile=>({...profile,source:profile.source==="TalentBridge Database"?BRAND_SOURCE_NAME:profile.source}))
    .filter(profile=>profile.source!==BRAND_SOURCE_NAME),
  ...talentBridgeProfiles
];
state.aiSourcingResults ||= state.externalTalent.filter(profile=>state.integrations.some(item=>item.name===profile.source&&item.connected&&item.enabled)).slice(0,20).map(profile=>profile.id);
state.sourcingSearches ||= [];
state.assignmentNotifications ||= [];
state.campaigns ||= [];
state.clientAiRecruiter ||= {
  step:"idle",
  draft:{},
  messages:[{from:"ai",text:"How may I help you? I can create a job description with you or answer questions about Northstar Systems' hiring activity."}]
};
state.clientAiRecruiter.messages ||= [{from:"ai",text:"How may I help you?"}];
state.clientAiRecruiter.draft ||= {};
state.clientAiRecruiter.step ||= "idle";
state.candidates.forEach(candidate=>candidate.clientReviewStatus ||= "Awaiting Review");
state.jobs.forEach(job=>{
  job.assignmentStatus ||= job.recruiter ? "Assigned" : "Pending";
  job.urgency ||= "Medium";
  if(job.assignmentStatus==="Pending") job.recruiter="";
});
localStorage.setItem("talentos-state",JSON.stringify(state));
let session = JSON.parse(localStorage.getItem("talentos-session") || "null");
let currentPage = "dashboard";
let filter = "All";
let teamChatOpen = false;
let activeRecruiter = "Priya Nair";
let clientAiOpen = false;
let theme = localStorage.getItem("gnext-theme") || localStorage.getItem("talentbridge-theme") || "light";
let interviewView = "Upcoming";
let interviewCalendarDate = new Date(2026,5,1);
let aiSourcingView = "Grid";
let activeConversation = "";
let pageFilterState = {};
document.documentElement.dataset.theme = theme;

if (!state.teamChats) {
  state.teamChats = {
    "Priya Nair": [
      {sender:"Arjun Mehta",role:"Admin",text:"Hi Priya, please prioritise the Product Designer shortlist today.",time:"9:18 AM"},
      {sender:"Priya Nair",role:"Recruiter",text:"Already on it. I have three strong profiles ready for client review.",time:"9:24 AM"},
      {sender:"Arjun Mehta",role:"Admin",text:"Great. Please share them before the 2 PM client call.",time:"9:27 AM"}
    ],
    "Karan Shah": [
      {sender:"Karan Shah",role:"Recruiter",text:"The Data Engineer bot campaign completed. We have 14 interested candidates.",time:"Yesterday"},
      {sender:"Arjun Mehta",role:"Admin",text:"Nice result. Move the top matches into recruiter screening.",time:"Yesterday"}
    ],
    "Ananya Sen": [
      {sender:"Arjun Mehta",role:"Admin",text:"Can you update the CloudNine proposal status today?",time:"Mon"},
      {sender:"Ananya Sen",role:"Recruiter",text:"Yes, I have a review call scheduled at 4 PM.",time:"Mon"}
    ]
  };
  localStorage.setItem("talentos-state", JSON.stringify(state));
}

function syncLinkedData() {
  state.candidates.forEach(candidate=>{
    const job=state.jobs.find(item=>item.id===candidate.jobId);
    if(!job)return;
    candidate.role=job.title;
    candidate.type=job.type;
    candidate.client=job.client;
    candidate.recruiter=job.recruiter;
  });
  state.interviews.forEach(interview=>{
    const candidate=state.candidates.find(item=>item.id===interview.candidateId);
    if(!candidate)return;
    interview.candidate=candidate.name;
    interview.role=candidate.role;
    interview.jobId=candidate.jobId;
  });
  state.jobs.forEach(job=>{
    const linked=state.candidates.filter(candidate=>candidate.jobId===job.id);
    job.cv=linked.length;
    job.interviews=state.interviews.filter(interview=>interview.jobId===job.id).length;
    job.offers=linked.filter(candidate=>["Offered","Joined"].includes(candidate.stage)).length;
  });
  state.notifications=[
    `${state.candidates.filter(candidate=>candidate.stage==="Client Review").length} profiles await client feedback`,
    `${state.interviews.filter(interview=>interview.status==="Pending").length} interviews need confirmation`,
    `${state.candidates.filter(candidate=>candidate.stage==="Offered").length} offers await response`,
    `${state.jobs.filter(job=>job.status==="Active").length} active jobs across ${state.clients.length} clients`
  ];
}
const save = () => { syncLinkedData(); localStorage.setItem("talentos-state", JSON.stringify(state)); };
const addAssignmentNotification = ({roles:targetRoles,message,recruiter="",client="",candidateId=""}) => {
  state.assignmentNotifications.unshift({
    id:`NOT-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    roles:targetRoles,
    recruiter,
    client,
    candidateId,
    message,
    time:"Just now",
    readBy:[]
  });
};
const roleNotifications = () => {
  const role=session.role;
  const user=roles[role].user;
  const company=roles[role].company;
  const events=state.assignmentNotifications.filter(item=>{
    if(!item.roles.includes(role)) return false;
    if(role==="Recruiter" && item.recruiter && item.recruiter!==user) return false;
    if(role==="Client" && item.client && item.client!==company) return false;
    if(role==="Candidate" && item.candidateId && item.candidateId!==state.profile.candidateId) return false;
    return true;
  });
  const system = role==="Admin"
    ? [
        `${state.jobs.filter(job=>job.assignmentStatus==="Pending").length} jobs awaiting recruiter assignment`,
        `${state.interviews.filter(interview=>interview.status==="Pending").length} interviews need confirmation`
      ]
    : role==="Recruiter"
      ? [
          `${roleJobs("Recruiter").length} jobs currently assigned to you`,
          `${roleInterviews("Recruiter").filter(interview=>interview.status==="Pending").length} interviews need confirmation`
        ]
      : role==="Client"
        ? [
            `${roleJobs("Client").filter(job=>job.assignmentStatus==="Pending").length} jobs awaiting recruiter assignment`,
            `${roleCandidates("Client").filter(candidate=>candidate.stage==="Client Review").length} profiles await your feedback`
          ]
        : [
            `${roleInterviews("Candidate").filter(interview=>interview.status==="Pending").length} interviews need confirmation`,
            `${roleCandidates("Candidate").filter(candidate=>candidate.stage==="Offered").length} offers await your response`
          ];
  return [
    ...events,
    ...system.map((message,index)=>({id:`SYS-${role}-${index}`,message,time:"Live",readBy:[]}))
  ];
};
const initials = n => n.split(" ").map(x => x[0]).slice(0,2).join("");
const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const nextId = (prefix, records) => {
  const highest = records.reduce((max, record) => {
    const match = String(record.id || "").match(/(\d+)$/);
    return Math.max(max, match ? Number(match[1]) : 0);
  }, 0);
  return `${prefix}-${highest + 1}`;
};
const badge = (text) => {
  const t = String(text);
  const pipelineClass=stageClass(t);
  if(pipelineClass)return `<span class="badge stage-badge ${pipelineClass}"><i class="dot"></i>${esc(t)}</span>`;
  const cls = /active|confirmed|offered|accepted|paid|qualified|complete/i.test(t) ? "green" : /hold|pending|proposal|review|interview/i.test(t) ? "orange" : /reject|closed|overdue|declined/i.test(t) ? "red" : /contract|ai|new/i.test(t) ? "blue" : "purple";
  return `<span class="badge badge-${cls}"><i class="dot"></i>${esc(t)}</span>`;
};
const urgencyBadge = value => {
  const urgency=APP_OPTIONS.urgency.includes(value)?value:"Medium";
  return `<span class="urgency-badge urgency-${urgency.toLowerCase()}"><i></i>${urgency}</span>`;
};
const clientReviewBadge = value => badge(value||"Awaiting Review");
const revealCandidateIdentity = candidate => session.role!=="Client" || currentPage!=="cv-review" || ["Shortlist","Select"].includes(candidate.clientReviewStatus);
const candidateDisplayName = candidate => revealCandidateIdentity(candidate)?candidate.name:`Candidate ${candidate.id.replace(/\D/g,"").slice(-4)}`;
const maskedContact = value => value?"Hidden until shortlisted":"Not provided";
const parseAppDate = value => {
  const raw=String(value||"").trim();
  if(!raw)return null;
  if(/^\d{4}-\d{2}-\d{2}$/.test(raw))return new Date(`${raw}T00:00:00`);
  const match=raw.match(/(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
  if(match)return new Date(`${match[1]} ${match[2]} ${match[3]} 00:00:00`);
  const parsed=new Date(raw);
  return Number.isNaN(parsed.getTime())?null:parsed;
};
const dashboardFilterKey = role => `dashboard-${role}`;
const dashboardDateState = role => pageFilterState[dashboardFilterKey(role)]||{};
const dateInputValue = date => {
  const year=date.getFullYear();
  const month=String(date.getMonth()+1).padStart(2,"0");
  const day=String(date.getDate()).padStart(2,"0");
  return `${year}-${month}-${day}`;
};
const dashboardPresetRange = (preset,now=new Date()) => {
  const end=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const start=new Date(end);
  if(preset==="Yesterday"){start.setDate(start.getDate()-1);end.setDate(end.getDate()-1)}
  if(preset==="Last 7 Days")start.setDate(start.getDate()-6);
  if(preset==="Last 1 Month")start.setMonth(start.getMonth()-1);
  if(preset==="Last 3 Months")start.setMonth(start.getMonth()-3);
  return {preset,dateFrom:dateInputValue(start),dateTo:dateInputValue(end)};
};
const dateInDashboardRange = (value,role) => {
  const current=dashboardDateState(role);
  const recordDate=parseAppDate(value);
  const fromDate=parseAppDate(current.dateFrom);
  const toDate=parseAppDate(current.dateTo);
  if(!fromDate&&!toDate)return true;
  if(!recordDate)return false;
  if(fromDate&&recordDate<fromDate)return false;
  if(toDate&&recordDate>toDate)return false;
  return true;
};
const skillTags = value => `<div class="display-tags">${String(value||"").split(",").map(skill=>skill.trim()).filter(Boolean).map(skill=>`<span class="skill-tag">${esc(skill)}</span>`).join("")}</div>`;
const toast = msg => {
  const el = $("#toast"); el.textContent = msg; el.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => el.classList.remove("show"), 2300);
};
const titleFor = id => roles[session.role].nav.find(x => x[0] === id)?.[1] || id;
const profileCandidateRecord = () => state.candidates.find(candidate=>candidate.id===state.profile.candidateId)
  || state.candidates.find(candidate=>candidate.email===state.profile.email)
  || state.candidates.find(candidate=>candidate.name===state.profile.name)
  || state.candidates.find(candidate=>candidate.name===roles.Candidate.user);
const activeUserName = role => role==="Candidate" ? (state.profile.name||roles.Candidate.user) : roles[role].user;
const roleJobs = role => {
  if (role === "Recruiter") return state.jobs.filter(job => job.assignmentStatus === "Assigned" && job.recruiter === roles.Recruiter.user);
  if (role === "Client") return state.jobs.filter(job => job.client === roles.Client.company);
  if (role === "Candidate") {
    const candidate=profileCandidateRecord();
    const jobIds = new Set(candidate?[candidate.jobId]:[]);
    return state.jobs.filter(job => jobIds.has(job.id));
  }
  return state.jobs;
};
const roleCandidates = role => {
  if (role === "Recruiter") {
    const jobIds = new Set(roleJobs(role).map(job => job.id));
    return state.candidates.filter(candidate => jobIds.has(candidate.jobId));
  }
  if (role === "Client") {
    const jobIds = new Set(roleJobs(role).map(job => job.id));
    return state.candidates.filter(candidate => jobIds.has(candidate.jobId));
  }
  if (role === "Candidate") {
    const candidate=profileCandidateRecord();
    return candidate?[candidate]:[];
  }
  return state.candidates;
};
const roleInterviews = role => {
  if (role === "Candidate") {
    const candidate=profileCandidateRecord();
    return candidate?state.interviews.filter(interview=>interview.candidateId===candidate.id):[];
  }
  const candidateIds = new Set(roleCandidates(role).map(candidate => candidate.id));
  return state.interviews.filter(interview => candidateIds.has(interview.candidateId));
};
const roleOffers = role => {
  return roleCandidates(role).filter(candidate => ["Offered","Joined"].includes(candidate.stage)).length;
};

function render() {
  if (!session) return renderLogin();
  const role = roles[session.role];
  $("#app").innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">G</span>${BRAND_NAME}</div>
        <div class="role-pill"><span>${session.role} workspace</span><span>⌄</span></div>
        <div class="nav-label">Workspace</div>
        <nav class="nav">${role.nav.map(([id,label,icon]) => `<button class="nav-item ${currentPage===id?"active":""}" data-page="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join("")}</nav>
        <div class="sidebar-user"><span class="avatar">${initials(role.user)}</span><div><b>${role.user}</b><small>${role.company}</small></div><button class="logout" title="Sign out">↪</button></div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div style="display:flex;align-items:center;gap:12px"><button class="icon-btn mobile-menu">☰</button><div class="crumb">${BRAND_NAME} / <b>${titleFor(currentPage)}</b></div></div>
          <div class="top-actions"><div class="search"><span>⌕</span><input id="global-search" placeholder="Search jobs, candidates..." /></div>
            <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="Switch to ${theme==="light"?"dark":"light"} mode" title="${theme==="light"?"Dark":"Light"} mode">
              <svg class="theme-icon theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
              <svg class="theme-icon theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z"></path></svg>
            </button>
            <button class="icon-btn" id="notification-btn" aria-label="Notifications"><svg class="notification-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path></svg><i class="notif-dot"></i></button>
          </div>
        </header>
        <div class="content">${renderPage()}</div>
      </main>
      ${["Admin","Recruiter"].includes(session.role) ? renderTeamChat() : ""}
      ${session.role==="Client" ? renderClientAiRecruiterWidget() : ""}
    </div>`;
  bindShell();
  bindPage();
}

function renderLogin() {
  let selected = "Admin";
  $("#app").innerHTML = `
  <div class="login-page">
    <section class="login-art">
      <div class="brand"><span class="brand-mark">G</span>${BRAND_NAME}</div>
      <div class="hero-copy"><h1>Recruitment,<br>orchestrated.</h1><p>One intelligent operating system for every person in the hiring journey, from first brief to first day.</p><div class="signal-row"><span class="signal">✦ AI matching</span><span class="signal">◎ Live pipelines</span><span class="signal">◷ Faster hiring</span></div></div>
      <div class="login-foot">${BRAND_NAME} · AI Recruitment Operating System</div>
    </section>
    <section class="login-panel">
      <h2>Welcome back</h2><p>Choose a workspace to explore the complete platform.</p>
      <div class="role-grid">${Object.entries(roles).map(([r,v]) => `<button class="role-card ${r===selected?"active":""}" data-role="${r}"><b>${r}</b><small>${r==="Client"?"Post jobs and review talent":r==="Admin"?"Manage the complete operation":r==="Recruiter"?"Source and move candidates":"Track your hiring journey"}</small></button>`).join("")}</div>
      <div class="field"><label>Email address</label><input id="login-email" value="${roles[selected].email}" /></div>
      <div class="field"><label>Password</label><input type="password" value="gnext2026" /></div>
      <button class="btn btn-primary btn-block" id="login-btn">Enter ${selected} workspace →</button>
      <div class="login-hint">Demo access is pre-filled. Select any role to sign in.</div>
    </section>
  </div>`;
  $$(".role-card").forEach(b => b.onclick = () => {
    selected = b.dataset.role; $$(".role-card").forEach(x => x.classList.toggle("active", x===b));
    $("#login-email").value = roles[selected].email; $("#login-btn").textContent = `Enter ${selected} workspace →`;
  });
  $("#login-btn").onclick = () => { session = {role:selected}; currentPage="dashboard"; localStorage.setItem("talentos-session",JSON.stringify(session)); render(); };
}

function bindShell() {
  $$(".nav-item").forEach(b => b.onclick = () => { currentPage=b.dataset.page; filter="All"; render(); });
  $(".logout").onclick = () => { session=null; localStorage.removeItem("talentos-session"); render(); };
  $(".mobile-menu").onclick = () => $(".sidebar").classList.toggle("open");
  $("#notification-btn").onclick = () => showNotifications();
  $("#theme-toggle")?.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("gnext-theme", theme);
    const toggle = $("#theme-toggle");
    toggle.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} mode`);
    toggle.title = `${theme === "light" ? "Dark" : "Light"} mode`;
  });
  $("#global-search")?.addEventListener("keydown", e => {
    if(e.key!=="Enter")return;
    currentPage={Client:"jobs",Admin:"candidates",Recruiter:"sourcing",Candidate:"applications"}[session.role];
    filter=e.target.value.trim()||"All";
    render();
  });
  $("#team-chat-bubble")?.addEventListener("click", () => {
    teamChatOpen = !teamChatOpen;
    $("#team-chat-panel")?.classList.toggle("open", teamChatOpen);
    $("#team-chat-bubble")?.classList.toggle("active", teamChatOpen);
    if (teamChatOpen) setTimeout(() => $("#team-chat-input")?.focus(), 50);
  });
  $("#team-chat-close")?.addEventListener("click", () => {
    teamChatOpen = false;
    $("#team-chat-panel")?.classList.remove("open");
    $("#team-chat-bubble")?.classList.remove("active");
  });
  $$(".team-chat-contact").forEach(button => button.addEventListener("click", () => {
    activeRecruiter = button.dataset.recruiter;
    render();
  }));
  $("#team-chat-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#team-chat-input");
    const text = input.value.trim();
    if (!text) return;
    const sender = roles[session.role].user;
    const thread = session.role === "Recruiter" ? roles.Recruiter.user : activeRecruiter;
    state.teamChats[thread] ||= [];
    state.teamChats[thread].push({sender, role:session.role, text, time:"Just now"});
    save();
    render();
    setTimeout(() => {
      const messages = $(".team-chat-messages");
      if (messages) messages.scrollTop = messages.scrollHeight;
    }, 0);
  });
}

function renderTeamChat() {
  const isAdmin = session.role === "Admin";
  const recruiters = state.recruiters || ["Priya Nair","Karan Shah","Ananya Sen"];
  const threadName = isAdmin ? activeRecruiter : roles.Recruiter.user;
  const messages = state.teamChats[threadName] || [];
  return `
    <button class="team-chat-bubble ${teamChatOpen ? "active" : ""}" id="team-chat-bubble" aria-label="Open team chat">
      <svg class="chat-bubble-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5h16v11H4z"></path>
        <path d="m4.7 7.2 7.3 5.7 7.3-5.7"></path>
      </svg>
      <span class="team-chat-count">${isAdmin ? "3" : "1"}</span>
    </button>
    <section class="team-chat-panel ${teamChatOpen ? "open" : ""}" id="team-chat-panel">
      <header class="team-chat-header">
        <div><small>Internal team chat</small><b>${isAdmin ? "Admin ↔ Recruiters" : "Chat with Admin"}</b></div>
        <button id="team-chat-close" aria-label="Close chat">×</button>
      </header>
      <div class="team-chat-layout ${isAdmin ? "" : "single"}">
        ${isAdmin ? `<aside class="team-chat-contacts">${recruiters.map((name,index) => `
          <button class="team-chat-contact ${name === activeRecruiter ? "active" : ""}" data-recruiter="${name}">
            <span class="avatar">${initials(name)}</span>
            <span><b>${name}</b><small>${index === 0 ? "Online" : index === 1 ? "12 min ago" : "1 hr ago"}</small></span>
            ${index === 0 ? `<i>2</i>` : ""}
          </button>`).join("")}</aside>` : ""}
        <div class="team-chat-thread">
          <div class="team-chat-person">
            <span class="avatar">${initials(isAdmin ? activeRecruiter : "Arjun Mehta")}</span>
            <div><b>${isAdmin ? activeRecruiter : "Arjun Mehta"}</b><small><span>●</span> Available</small></div>
          </div>
          <div class="team-chat-messages">
            <div class="team-chat-day">Today</div>
            ${messages.map(message => {
              const mine = message.role === session.role;
              return `<div class="team-chat-message ${mine ? "mine" : ""}">
                <div>${esc(message.text)}</div><small>${esc(message.sender)} · ${esc(message.time)}</small>
              </div>`;
            }).join("")}
          </div>
          <form class="team-chat-compose" id="team-chat-form">
            <input id="team-chat-input" placeholder="Message ${isAdmin ? activeRecruiter.split(" ")[0] : "Arjun"}..." autocomplete="off">
            <button type="submit" aria-label="Send message">➤</button>
          </form>
        </div>
      </div>
    </section>`;
}

function pageHead(title, sub, actions="") {
  const filters = ["dashboard","ai-sourcing","integrations","job-type"].includes(currentPage) ? "" : standardFilterBar();
  return `<div class="page-head"><div><h1>${title}</h1><p>${sub}</p></div><div class="page-actions">${actions}</div></div>${filters}`;
}
function standardFilterBar() {
  const current=pageFilterState[currentPage]||{};
  const typePages=["job-type","jobs","cv-review","sourcing","candidates","offers","applications","ai-sourcing"];
  const statusOptions={
    jobs:["Active","On Hold","Closed","Draft","Pending","Assigned","Critical","High","Medium","Low"],
    "cv-review":[...PIPELINE_STAGES,"Awaiting Review","Shortlist","Select","Reject"],
    sourcing:PIPELINE_STAGES,
    candidates:[...PIPELINE_STAGES,"Awaiting Review","Shortlist","Select","Reject"],
    interviews:["Pending","Confirmed","Completed","Cancelled"],
    "ai-interview":["Pending","Confirmed","Completed","Cancelled"],
    offers:["Offered","Joined"],
    users:["Active","Inactive"],
    clients:["Active","On Hold"],
    leads:["New","Qualified","Proposal","Negotiation"],
    applications:PIPELINE_STAGES,
    documents:["Active","Pending","Paid","Overdue"]
  };
  const ownerPages=["jobs","cv-review","sourcing","candidates","interviews","ai-interview","leads","reports","ai-sourcing"];
  const datePages=["jobs","interviews","ai-interview","offers","documents","reports"];
  const owners=[...new Set([...(state.recruiters||[]),...state.leads.map(lead=>lead.owner)])].sort();
  if(current.status && current.status!=="All statuses" && !(statusOptions[currentPage]||[]).includes(current.status)) current.status="All statuses";
  if(current.type && current.type!=="All types" && !typePages.includes(currentPage)) current.type="All types";
  if(current.owner && current.owner!=="All owners" && !owners.includes(current.owner)) current.owner="All owners";
  return `<div class="card standard-filters">
    <div class="standard-filter-search"><span>⌕</span><input id="page-filter-search" value="${esc(current.search||"")}" placeholder="Search this page..." autocomplete="off"></div>
    ${typePages.includes(currentPage)?`<select id="page-filter-type" aria-label="Filter by engagement type">
      ${["All types","Permanent","Contract","AI Agent"].map(value=>`<option ${current.type===value?"selected":""}>${value}</option>`).join("")}
    </select>`:""}
    ${statusOptions[currentPage]?`<select id="page-filter-status" aria-label="Filter by status">
      ${["All statuses",...statusOptions[currentPage]].map(value=>`<option class="${stageClass(value)}" ${current.status===value?"selected":""}>${value}</option>`).join("")}
    </select>`:""}
    ${ownerPages.includes(currentPage)?`<select id="page-filter-owner" aria-label="Filter by owner">
      <option>All owners</option>${owners.map(value=>`<option ${current.owner===value?"selected":""}>${value}</option>`).join("")}
    </select>`:""}
    ${datePages.includes(currentPage)?`<select id="page-filter-date" aria-label="Filter by date">
      ${["Any date","Today","June 2026","Last 30 days","Custom date"].map(value=>`<option ${current.date===value?"selected":""}>${value}</option>`).join("")}
    </select>`:""}
    <button class="btn btn-secondary" id="clear-page-filters">Clear</button>
    <span class="filter-result-count" id="filter-result-count"></span>
    ${datePages.includes(currentPage)?`<div class="custom-date-range ${current.date==="Custom date"?"show":""}" id="custom-date-range">
      <label>From <input type="date" id="page-filter-date-from" value="${esc(current.dateFrom||"")}"></label>
      <label>To <input type="date" id="page-filter-date-to" value="${esc(current.dateTo||"")}"></label>
    </div>`:""}
    <div class="filter-empty-message" id="filter-empty-message">No records match the selected filters.</div>
  </div>`;
}
function dashboardDateFilter(role) {
  const current=dashboardDateState(role);
  const active=current.dateFrom||current.dateTo||current.preset;
  return `<div class="dashboard-date-filter ${active?"active":""}" aria-label="Dashboard date filter">
    ${role==="Client"?`<select id="dashboard-date-preset" aria-label="Quick date range" title="Quick date range">${["Custom dates","All time","Today","Yesterday","Last 7 Days","Last 1 Month","Last 3 Months"].map(value=>`<option value="${value}" ${(current.preset||"Custom dates")===value?"selected":""}>${value}</option>`).join("")}</select>`:""}
    <label><span>From</span><input type="date" id="dashboard-date-from" aria-label="From date" value="${esc(current.dateFrom||"")}"></label>
    <label><span>To</span><input type="date" id="dashboard-date-to" aria-label="To date" value="${esc(current.dateTo||"")}"></label>
    <button class="dashboard-date-clear" id="clear-dashboard-date" aria-label="Clear dashboard date filter" title="Clear date filter" ${active?"":"disabled"}>×</button>
  </div>`;
}
function kpiIcon(label="") {
  const value=label.toLowerCase();
  let type="analytics";
  if(/profile complete|profile strength/.test(value))type="profile";
  else if(/interview/.test(value))type="calendar";
  else if(/offer|placement|joined|conversion/.test(value))type="award";
  else if(/candidate|cv|profile|sourced|shortlist|user|recruiter/.test(value))type="people";
  else if(/job|application|assigned/.test(value))type="briefcase";
  else if(/provider|source|integration|connected/.test(value))type="network";
  else if(/sync|health|active/.test(value))type="pulse";
  const icons={
    briefcase:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7"/><rect x="3" y="7" width="18" height="12" rx="2.5"/><path d="M3 11.5c4.7 2.3 13.3 2.3 18 0M10 12h4"/></svg>`,
    calendar:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="m9 15 2 2 4-4"/></svg>`,
    profile:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6"/><path d="m17 10.5 1.4 1.4 2.6-3"/></svg>`,
    award:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="m8.8 13-1 8 4.2-2.4 4.2 2.4-1-8"/><path d="m10 9 1.3 1.3L14.5 7"/></svg>`,
    people:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c.5-4 2.3-6 5.5-6s5 2 5.5 6"/><circle cx="17.5" cy="9" r="2.2"/><path d="M15.5 15c3.1-.7 5 .9 5.5 4"/></svg>`,
    network:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/></svg>`,
    pulse:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2.2-5 4.2 10 2.2-5H21"/><circle cx="12" cy="12" r="9"/></svg>`,
    analytics:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 7 6-4 6 6 5-5"/></svg>`
  };
  return {type,svg:icons[type]};
}
function kpis(items) {
  return `<div class="kpi-grid">${items.map(x=>{
    const className = `card kpi${x[3] ? " kpi-link" : ""}${x[5]?` ${stageClass(x[5])}`:""}`;
    const attributes = x[3] ? `data-go="${x[3]}" ${x[4] ? `data-view-filter="${x[4]}"` : ""} role="link" tabindex="0" aria-label="View details for ${x[0]}"` : "";
    const icon=kpiIcon(x[0]);
    return `<div class="${className}" ${attributes}><div class="kpi-label">${x[0]}</div><div class="kpi-value">${x[1]}</div><div class="trend">${x[2]}</div><span class="kpi-icon kpi-icon-${icon.type}">${icon.svg}</span>${x[3]?`<span class="kpi-arrow">→</span>`:""}</div>`;
  }).join("")}</div>`;
}
function dashboardAiSummary(role,{jobs,candidates,interviews,offers,activeJobs}){
  const confirmed=interviews.filter(interview=>interview.status==="Confirmed").length;
  const pendingInterviews=interviews.filter(interview=>interview.status==="Pending").length;
  const highMatches=candidates.filter(candidate=>candidate.score>=90).length;
  const joined=candidates.filter(candidate=>candidate.stage==="Joined").length;
  if(role==="Candidate"){
    const nextInterview=interviews.find(interview=>!["Completed","Cancelled"].includes(interview.status));
    const status=`You have ${jobs.length} active application${jobs.length===1?"":"s"}${nextInterview?` and your next interview is ${nextInterview.round} on ${nextInterview.date} at ${nextInterview.time}`:" with no upcoming interview currently scheduled"}.`;
    const attention=offers?`${offers} offer${offers===1?" needs":"s need"} your attention.`:state.profile.completion<100?`Your profile is ${state.profile.completion}% complete and still needs attention.`:"Your profile is complete and your print-ready CV is available.";
    const next=offers?"Review the offer details and complete the required response next.":state.profile.completion<100?"Complete the missing profile information to unlock your custom CV.":nextInterview?"Review the interview details and prepare for the scheduled round.":"Keep your profile current while waiting for the next application update.";
    return `${status} ${attention} Recommended next step: ${next}`;
  }
  if(role==="Client"){
    const awaiting=candidates.filter(candidate=>candidate.stage==="Client Review"||candidate.clientReviewStatus==="Awaiting Review").length;
    const attention=awaiting?`${awaiting} CV${awaiting===1?" is":"s are"} waiting for your review decision.`:pendingInterviews?`${pendingInterviews} interview${pendingInterviews===1?" is":"s are"} waiting for confirmation.`:"There are no urgent review decisions pending.";
    const next=awaiting?"Review and mark pending CVs as Shortlist, Select, or Reject.":pendingInterviews?"Confirm the pending interview schedules.":offers?"Check offer-stage candidates and resolve outstanding approvals.":"Review active jobs and request more profiles where pipelines are thin.";
    return `${activeJobs} active job${activeJobs===1?" is":"s are"} generating ${candidates.length} candidate profile${candidates.length===1?"":"s"}, with ${confirmed} confirmed interview${confirmed===1?"":"s"} and ${offers} candidate${offers===1?"":"s"} at offer or joining stage. ${attention} Recommended next step: ${next}`;
  }
  if(role==="Recruiter"){
    const sourced=candidates.filter(candidate=>candidate.stage==="Sourced").length;
    const attention=pendingInterviews?`${pendingInterviews} interview${pendingInterviews===1?" needs":"s need"} scheduling follow-up.`:sourced?`${sourced} newly sourced profile${sourced===1?" is":"s are"} waiting for screening.`:"No urgent interview or screening task is pending.";
    const next=pendingInterviews?"Confirm the pending interviews and notify linked users.":sourced?"Screen new profiles, prioritising candidates with a 90% or higher AI match.":activeJobs?"Use AI Sourcing to strengthen the lowest-volume active job pipeline.":"Check with Admin for new job assignments.";
    return `${activeJobs} of your ${jobs.length} assigned job${jobs.length===1?" is":"s are"} active, with ${highMatches} high-match profile${highMatches===1?"":"s"}, ${confirmed} confirmed interview${confirmed===1?"":"s"}, and ${joined} completed placement${joined===1?"":"s"}. ${attention} Recommended next step: ${next}`;
  }
  const pendingAssignments=jobs.filter(job=>job.assignmentStatus==="Pending").length;
  const clients=new Set(jobs.map(job=>job.client)).size;
  const attention=pendingAssignments?`${pendingAssignments} job${pendingAssignments===1?" is":"s are"} still waiting for recruiter assignment.`:pendingInterviews?`${pendingInterviews} interview${pendingInterviews===1?" remains":"s remain"} pending.`:"No critical assignment or interview backlog is visible.";
  const next=pendingAssignments?"Assign recruiters and set urgency for pending jobs.":pendingInterviews?"Resolve pending interview confirmations and check linked notifications.":highMatches?"Review high-match profiles and move qualified candidates forward.":"Review sourcing coverage across active client requirements.";
  return `${activeJobs} active job${activeJobs===1?" is":"s are"} running across ${clients} client account${clients===1?"":"s"}, with ${candidates.length} candidates, ${highMatches} high-match profile${highMatches===1?"":"s"}, ${confirmed} confirmed interview${confirmed===1?"":"s"}, and ${offers} candidates at offer or joined stage. ${attention} Recommended next step: ${next}`;
}
function aiSummaryCard(summary){
  return `<section class="ai-summary-shell"><div class="card ai-summary-card"><div class="ai-summary-head"><span>✦</span><div><h2>AI Summary</h2><small>Latest status, attention areas, and suggested next step</small></div><i class="ai-summary-live">Live</i></div><p class="ai-summary-text" data-summary-text="${esc(summary)}"><span class="typing-cursor"></span></p></div></section>`;
}
function tabs() {
  return `<div class="tabs">${["All","Permanent","Contract","AI Agent"].map(x=>`<button class="tab ${filter===x?"active":""}" data-filter="${x}">${x}</button>`).join("")}</div>`;
}
function person(name, sub="") {
  if(!name)return `<span class="muted">Awaiting Admin</span>`;
  return `<div class="person"><span class="avatar">${initials(name)}</span><div><b>${esc(name)}</b><small>${esc(sub)}</small></div></div>`;
}

function renderPage() {
  const r = session.role;
  if (currentPage==="ai-recruiter" && r==="Client") return aiRecruiterPage();
  if (currentPage==="dashboard") return dashboard(r);
  if (currentPage==="jobs") return jobsPage(r);
  if (currentPage==="candidates" || currentPage==="cv-review" || currentPage==="sourcing") return candidatesPage(r,currentPage);
  if (currentPage==="interviews" || currentPage==="ai-interview") return interviewsPage(r,currentPage);
  if (currentPage==="communication") return communicationPage();
  if (currentPage==="offers") return offersPage(r);
  if (currentPage==="job-type") return jobTypePage();
  if (currentPage==="users") return usersPage();
  if (currentPage==="clients") return clientsPage();
  if (currentPage==="ai-sourcing" && ["Admin","Recruiter"].includes(r)) return aiSourcingPage();
  if (currentPage==="integrations" && r==="Admin") return integrationsPage();
  if (currentPage==="leads") return leadsPage();
  if (currentPage==="reports") return reportsPage();
  if (currentPage==="settings") return settingsPage();
  if (currentPage==="profile") return profilePage();
  if (currentPage==="applications") return applicationsPage();
  if (currentPage==="documents") return documentsPage();
  return `<div class="empty"><div class="empty-icon">◇</div><h3>${titleFor(currentPage)}</h3><p>This workspace is ready.</p></div>`;
}

function clientActivitySnapshot(){
  const jobs=roleJobs("Client");
  const candidates=roleCandidates("Client");
  const interviews=roleInterviews("Client");
  return {
    jobs,
    candidates,
    interviews,
    activeJobs:jobs.filter(job=>job.status==="Active").length,
    pendingJobs:jobs.filter(job=>job.assignmentStatus==="Pending").length,
    cvReview:candidates.filter(candidate=>candidate.stage==="Client Review"||candidate.clientReviewStatus==="Awaiting Review").length,
    confirmedInterviews:interviews.filter(interview=>interview.status==="Confirmed").length,
    pendingInterviews:interviews.filter(interview=>interview.status==="Pending").length,
    offers:candidates.filter(candidate=>["Offered","Joined"].includes(candidate.stage)).length,
    joined:candidates.filter(candidate=>candidate.stage==="Joined").length
  };
}
function clientActivitySummary(){
  const activity=clientActivitySnapshot();
  return `${roles.Client.company} currently has ${activity.activeJobs} active job${activity.activeJobs===1?"":"s"}, ${activity.candidates.length} linked candidate profile${activity.candidates.length===1?"":"s"}, ${activity.cvReview} CV${activity.cvReview===1?"":"s"} needing review, ${activity.confirmedInterviews} confirmed interview${activity.confirmedInterviews===1?"":"s"}, and ${activity.offers} candidate${activity.offers===1?"":"s"} at offer or joining stage. ${activity.pendingJobs?`${activity.pendingJobs} job${activity.pendingJobs===1?" is":"s are"} waiting for Admin recruiter assignment.`:"All current jobs have recruiter coverage."}`;
}
function aiRecruiterActivityChart(){
  const activity=clientActivitySnapshot();
  const items=[["Active jobs",activity.activeJobs],["CV review",activity.cvReview],["Interviews",activity.interviews.length],["Offers",activity.offers],["Joined",activity.joined]];
  const max=Math.max(...items.map(item=>item[1]),1);
  return `<div class="ai-recruiter-chart">${items.map(([label,value])=>`<div><span>${label}</span><i><b style="width:${Math.max(5,Math.round(value/max*100))}%"></b></i><strong>${value}</strong></div>`).join("")}</div>`;
}
function aiRecruiterDraftSummary(draft=state.clientAiRecruiter.draft){
  return `<div class="ai-jd-summary"><h3>${esc(draft.title||"New role")}</h3><div><span><small>Engagement</small><b>${esc(draft.type||"Permanent")}</b></span><span><small>Department</small><b>${esc(draft.department||"General")}</b></span><span><small>Location</small><b>${esc(draft.location||"Not specified")} · ${esc(draft.mode||"Hybrid")}</b></span><span><small>Openings</small><b>${esc(draft.openings||1)}</b></span><span><small>Experience</small><b>${esc(draft.experience||"Not specified")}</b></span><span><small>Salary</small><b>${esc(draft.salary||"To be discussed")}</b></span></div><p><b>Skills:</b> ${esc(draft.skills||"Not specified")}</p><p><b>Key responsibilities:</b> ${esc(draft.responsibilities||"Not specified")}</p></div>`;
}
function aiRecruiterMessageMarkup(message){
  const content=message.kind==="chart"?`${esc(message.text)}${aiRecruiterActivityChart()}`:message.kind==="permission"?`${esc(message.text)}${aiRecruiterDraftSummary(message.draft)}<div class="ai-permission-actions"><button class="btn btn-secondary" id="ai-edit-jd">Edit</button><button class="btn btn-primary" id="ai-generate-job">Post job</button></div>`:message.kind==="created"?`${esc(message.text)}<div class="ai-created-job"><b>${esc(message.jobId)} · ${esc(message.title)}</b><span>Pending Admin recruiter assignment</span><button class="mini-btn" data-go="jobs">Open My Job Listings</button></div>`:esc(message.text);
  return `<div class="ai-recruiter-message ${message.from==="user"?"user":"assistant"}"><span class="ai-message-avatar">${message.from==="user"?initials(roles.Client.user):"AI"}</span><div>${content}<small>${message.time||"Just now"}</small></div></div>`;
}
function aiRecruiterQuickReplies(){
  const step=state.clientAiRecruiter.step;
  if(step==="type")return `<button data-ai-reply="Permanent">Permanent</button><button data-ai-reply="Contract">Contract</button>`;
  if(step==="mode")return APP_OPTIONS.workModes.map(value=>`<button data-ai-reply="${value}">${value}</button>`).join("");
  if(step==="openings")return [1,2,3,5].map(value=>`<button data-ai-reply="${value}">${value}</button>`).join("");
  if(step==="permission")return "";
  if(step==="idle")return `<button data-ai-reply="Create a new job">Create a new job</button><button data-ai-reply="Give me a company activity summary">Activity summary</button><button data-ai-reply="Show an activity graph">Activity graph</button><button data-ai-reply="How many CVs need review?">CVs needing review</button>`;
  return "";
}
function aiRecruiterPage(){
  const chat=state.clientAiRecruiter;
  return `<section class="ai-recruiter-page">
    <div class="card ai-recruiter-shell">
      <header class="ai-recruiter-head"><div class="ai-recruiter-orb">AI</div><div><h1>AI Recruiter</h1><p>Job creation and company hiring intelligence</p></div><button class="mini-btn" id="ai-new-conversation">New conversation</button></header>
      <div class="ai-recruiter-messages" id="ai-recruiter-messages">${chat.messages.map(aiRecruiterMessageMarkup).join("")}</div>
      <div class="ai-quick-replies">${aiRecruiterQuickReplies()}</div>
      <form class="ai-recruiter-compose" id="ai-recruiter-form"><input id="ai-recruiter-input" autocomplete="off" placeholder="${chat.step==="idle"?"Ask about hiring activity or say you want to create a job...":"Type your answer..."}" ${chat.step==="permission"?"disabled":""} required><button class="btn btn-primary" ${chat.step==="permission"?"disabled":""}>Send</button></form>
      <p class="ai-recruiter-note">Jobs are generated only after your permission. New jobs are sent to Admin for recruiter assignment and then appear in the Recruiter's My Assigned Jobs.</p>
    </div>
  </section>`;
}
function robotIconSvg(){
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="20" width="36" height="30" rx="11"></rect><path d="M32 20v-8"></path><circle cx="32" cy="10" r="4"></circle><circle cx="25" cy="34" r="3"></circle><circle cx="39" cy="34" r="3"></circle><path d="M26 43h12"></path><path d="M14 35H8M56 35h-6"></path></svg>`;
}
function renderClientAiRecruiterWidget(){
  const chat=state.clientAiRecruiter;
  return `<button class="client-ai-bot-bubble ${clientAiOpen?"active":""}" id="client-ai-bot-bubble" aria-label="Open AI Recruiter chat">
      ${robotIconSvg()}
    </button>
    <section class="client-ai-bot-panel ${clientAiOpen?"open":""}" id="client-ai-bot-panel" aria-label="AI Recruiter chat">
      <header class="ai-recruiter-head"><div class="ai-recruiter-orb">${robotIconSvg()}</div><div><h1>AI Recruiter</h1><p>Ask hiring questions or create a JD</p></div><button class="mini-btn" id="ai-new-conversation">New</button><button class="client-ai-close" id="client-ai-close" aria-label="Close AI Recruiter">×</button></header>
      <div class="ai-recruiter-messages" id="ai-recruiter-messages">${chat.messages.map(aiRecruiterMessageMarkup).join("")}</div>
      <div class="ai-quick-replies">${aiRecruiterQuickReplies()}</div>
      <form class="ai-recruiter-compose" id="ai-recruiter-form"><input id="ai-recruiter-input" autocomplete="off" placeholder="${chat.step==="idle"?"Ask or say: create a job...":"Type your answer..."}" ${chat.step==="permission"?"disabled":""} required><button class="btn btn-primary" ${chat.step==="permission"?"disabled":""}>Send</button></form>
      <p class="ai-recruiter-note">Jobs are created only after your approval and then sent to Admin for recruiter assignment.</p>
    </section>`;
}
function addAiRecruiterMessage(from,text,extra={}){
  state.clientAiRecruiter.messages.push({from,text,time:"Just now",...extra});
}
function cleanRequestedJobTitle(text){
  let title=String(text||"").replace(/[?.!]+$/,"").trim();
  title=title.replace(/^(please\s+)?(help\s+me\s+with|create|generate|post|make|draft|prepare)\s+(a\s+|an\s+)?/i,"");
  title=title.replace(/\b(job\s+post|job\s+posting|jd|job\s+description|new\s+job|job|role|opening|hire|recruitment)\b/ig," ");
  title=title.replace(/\b(for|of|as|profile|title|particular|perticular)\b/ig," ");
  title=title.replace(/\b(a|an|the|with|me|help)\b/ig," ");
  title=title.replace(/\s+/g," ").trim();
  if(!title || /^(job|role|opening|new)$/i.test(title))return "";
  return title.split(" ").map(word=>/^(ai|ui|ux|hr|qa|devops|sre|seo)$/i.test(word)?word.toUpperCase():word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
}
function suggestedJobDraft(title){
  const lower=title.toLowerCase();
  const isContract=/contract|freelance|consultant/.test(lower);
  const isAiAgent=/ai agent|agent|bot/.test(lower);
  const profile=isAiAgent?"ai":/designer|ui|ux|product design/.test(lower)?"design":/data|analytics|bi|engineer/.test(lower)?"data":/react|front|javascript|node|java|python|developer|engineer|software|full stack/.test(lower)?"tech":/sales|business development|account/.test(lower)?"sales":/hr|recruiter|talent/.test(lower)?"hr":"general";
  const templates={
    tech:{department:"Engineering",skills:"Problem solving, System design, APIs, Cloud, Agile delivery",experience:"4-7 years",salary:"₹18–25 LPA",responsibilities:"Build and maintain scalable applications, collaborate with product and business teams, write clean production-ready code, own delivery quality, and support deployments."},
    data:{department:"Data & Analytics",skills:"Python, SQL, Data pipelines, Dashboards, Cloud data platforms",experience:"4-8 years",salary:"₹20–30 LPA",responsibilities:"Design data pipelines, build reliable reports and analytics models, partner with stakeholders on insights, improve data quality, and automate recurring analysis."},
    design:{department:"Product Design",skills:"Figma, UX research, Design systems, Prototyping, Stakeholder management",experience:"5-8 years",salary:"₹24–34 LPA",responsibilities:"Lead discovery and UX flows, create high-fidelity designs, maintain design systems, validate ideas with users, and partner with product and engineering through launch."},
    sales:{department:"Sales",skills:"Lead generation, CRM, Negotiation, Account management, Forecasting",experience:"3-6 years",salary:"₹12–20 LPA",responsibilities:"Manage qualified pipeline, run client conversations, prepare proposals, maintain CRM hygiene, forecast revenue, and partner with delivery teams for smooth handover."},
    hr:{department:"Human Resources",skills:"Talent acquisition, Stakeholder management, Screening, Interview coordination, HR operations",experience:"3-6 years",salary:"₹10–18 LPA",responsibilities:"Manage hiring intake, source and screen candidates, coordinate interviews, maintain candidate experience, and publish hiring updates to stakeholders."},
    ai:{department:"AI Workforce",skills:"Workflow automation, Prompt design, API integration, Reporting, Human handoff",experience:"AI agent configuration",salary:"Starter · ₹25,000 / month",responsibilities:"Configure an AI agent to manage repeatable hiring tasks, answer workflow queries, prepare summaries, trigger handoffs, and report outcomes to the hiring team."},
    general:{department:"Operations",skills:"Communication, Ownership, Stakeholder management, Reporting, Process improvement",experience:"3-6 years",salary:"₹12–20 LPA",responsibilities:"Own day-to-day delivery, coordinate with stakeholders, maintain operating dashboards, solve process gaps, and drive measurable business outcomes."}
  };
  const picked=templates[profile];
  return {
    title,
    projectName:"Generated by AI Recruiter",
    type:isAiAgent?"AI Agent":isContract?"Contract":"Permanent",
    department:picked.department,
    location:roles.Client.location||"Bengaluru",
    mode:isAiAgent?"Cloud hosted":"Hybrid",
    openings:1,
    experience:picked.experience,
    skills:picked.skills,
    responsibilities:picked.responsibilities,
    salary:isContract&&!isAiAgent?"₹1.5L / month":picked.salary
  };
}
function prepareAiRecruiterDraftFromText(text){
  const title=cleanRequestedJobTitle(text);
  if(!title){
    state.clientAiRecruiter.step="profileTitle";
    addAiRecruiterMessage("ai","Sure. Which job profile title should I create the post for?");
    return;
  }
  const draft=suggestedJobDraft(title);
  state.clientAiRecruiter.draft=draft;
  state.clientAiRecruiter.step="permission";
  addAiRecruiterMessage("ai",`I created a suggested job post for ${title}. Review it below, then post it or edit the details before posting.`,{kind:"permission",draft:{...draft}});
}
function startAiRecruiterJd(text=""){
  state.clientAiRecruiter.draft={};
  prepareAiRecruiterDraftFromText(text);
}
function answerClientActivity(question){
  const activity=clientActivitySnapshot();
  const query=question.toLowerCase();
  if(/graph|chart|visual/.test(query)){
    addAiRecruiterMessage("ai","Here is a quick view of the latest company hiring activity.",{kind:"chart"});
    return true;
  }
  if(/summary|activity|overview|status|dashboard/.test(query)){
    addAiRecruiterMessage("ai",clientActivitySummary());
    return true;
  }
  if(/cv|candidate|profile/.test(query)){
    addAiRecruiterMessage("ai",`${activity.candidates.length} candidate profiles are linked to your jobs. ${activity.cvReview} currently need client review, and ${activity.candidates.filter(candidate=>candidate.score>=90).length} have an AI match of 90% or higher.`);
    return true;
  }
  if(/interview/.test(query)){
    addAiRecruiterMessage("ai",`${activity.interviews.length} interviews are linked to your company: ${activity.confirmedInterviews} confirmed and ${activity.pendingInterviews} pending confirmation.`);
    return true;
  }
  if(/offer|join|placement/.test(query)){
    addAiRecruiterMessage("ai",`${activity.offers} candidates are at offer or joining stage, including ${activity.joined} completed join${activity.joined===1?"":"s"}.`);
    return true;
  }
  if(/job|role|opening|requirement/.test(query)&&!/create|post|hire|new|generate|jd/.test(query)){
    addAiRecruiterMessage("ai",`${activity.jobs.length} jobs are linked to ${roles.Client.company}; ${activity.activeJobs} are active and ${activity.pendingJobs} are awaiting recruiter assignment.`);
    return true;
  }
  return false;
}
function advanceAiRecruiterJd(answer){
  const chat=state.clientAiRecruiter;
  if(chat.step==="profileTitle"){
    prepareAiRecruiterDraftFromText(answer);
    return;
  }
  const draft=chat.draft;
  if(chat.step==="salary"){
    draft.salary=answer.trim();
    chat.step="permission";
    addAiRecruiterMessage("ai","I have prepared the job summary. May I generate this job now?",{kind:"permission",draft:{...draft}});
    return;
  }
  const questions={
    title:["title","What type of engagement is this: Permanent or Contract?","type"],
    type:["type","Which department owns this role?","department"],
    department:["department","What is the work location or city?","location"],
    location:["location","What is the work mode: Hybrid, Remote, or Onsite?","mode"],
    mode:["mode","How many openings are required?","openings"],
    openings:["openings","What experience range is required? For example, 5-8 years.","experience"],
    experience:["experience","List the essential skills, separated by commas.","skills"],
    skills:["skills","What are the key responsibilities for this position?","responsibilities"],
    responsibilities:["responsibilities","What salary range or monthly rate should be shown?","salary"]
  };
  const current=questions[chat.step];
  if(!current)return;
  let value=answer.trim();
  if(chat.step==="type")value=/contract/i.test(value)?"Contract":"Permanent";
  if(chat.step==="mode")value=APP_OPTIONS.workModes.find(mode=>value.toLowerCase().includes(mode.toLowerCase()))||value;
  if(chat.step==="openings")value=Math.max(1,Number(value.replace(/\D/g,""))||1);
  draft[current[0]]=value;
  chat.step=current[2];
  addAiRecruiterMessage("ai",current[1]);
}
function handleAiRecruiterMessage(text){
  const chat=state.clientAiRecruiter;
  addAiRecruiterMessage("user",text);
  if(chat.step==="idle"){
    if(answerClientActivity(text))return;
    if(/create|post|hire|new job|jd|job description|job post|job posting|recruit/.test(text.toLowerCase())){startAiRecruiterJd(text);return}
    addAiRecruiterMessage("ai","I can help create a job description, share a company activity summary or graph, and answer questions about jobs, CVs, interviews, offers, and joining activity.");
    return;
  }
  advanceAiRecruiterJd(text);
}
function showAiRecruiterDraftEditor(){
  const draft=state.clientAiRecruiter.draft||suggestedJobDraft("New Role");
  modal("Edit AI generated job post",`<form id="modal-form">${fields([
    {label:"Job title",name:"title",value:draft.title||""},
    {label:"Engagement",name:"type",type:"select",options:["Permanent","Contract","AI Agent"],value:draft.type||"Permanent"},
    {label:"Department",name:"department",value:draft.department||"General"},
    {label:"Location",name:"location",type:"city",value:draft.location||""},
    {label:"Work mode",name:"mode",type:"select",options:[...APP_OPTIONS.workModes,"Cloud hosted","Private cloud","Hybrid deployment"],value:draft.mode||"Hybrid"},
    {label:"Openings",name:"openings",type:"number",value:draft.openings||1},
    {label:"Experience range",name:"experience",value:draft.experience||""},
    {label:"Salary / rate",name:"salary",value:draft.salary||""},
    {label:"Skills",name:"skills",type:"tags",value:draft.skills||"",full:true},
    {label:"Key responsibilities",name:"responsibilities",type:"textarea",value:draft.responsibilities||"",full:true}
  ])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Save changes</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");
    if(!form.reportValidity())return;
    state.clientAiRecruiter.draft={...draft,...Object.fromEntries(new FormData(form))};
    state.clientAiRecruiter.step="permission";
    addAiRecruiterMessage("ai","Updated the suggested job post. Please review the revised version below.",{kind:"permission",draft:{...state.clientAiRecruiter.draft}});
    save();closeModal();render();
  };
}
function generateAiRecruiterJob(){
  const chat=state.clientAiRecruiter;
  if(chat.step!=="permission")return;
  const draft=chat.draft;
  const client=state.clients.find(item=>item.company===roles.Client.company);
  const job={
    id:nextId("JOB",state.jobs),title:draft.title,projectName:"Generated by AI Recruiter",department:draft.department||"General",
    type:draft.type||"Permanent",client:roles.Client.company,clientId:client?.id,location:draft.location||"Remote",
    mode:draft.mode||"Hybrid",status:"Active",assignmentStatus:"Pending",urgency:"Medium",recruiter:"",
    openings:Number(draft.openings)||1,cv:0,interviews:0,offers:0,skills:draft.skills||"",
    responsibilities:draft.responsibilities||"",experience:draft.experience||"",salary:draft.salary||"To be discussed",
    date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})
  };
  state.jobs.unshift(job);
  addAssignmentNotification({roles:["Admin"],client:job.client,message:`${job.title} for ${job.client} was generated by AI Recruiter and is awaiting recruiter assignment`});
  addAssignmentNotification({roles:["Client"],client:job.client,message:`${job.title} was created by AI Recruiter and is pending Admin recruiter assignment`});
  chat.step="idle";
  chat.draft={};
  addAiRecruiterMessage("ai",`The job has been generated in My Job Listings. Admin has been notified to assign a recruiter. After assignment, it will appear in the Recruiter's My Assigned Jobs.`,{kind:"created",jobId:job.id,title:job.title});
  save();
}

function salaryAnnualLpa(value){
  const text=String(value||"").toLowerCase();
  const numbers=text.match(/\d+(?:\.\d+)?/g)?.map(Number)||[];
  if(!numbers.length)return null;
  const max=Math.max(...numbers);
  return /month|monthly|\/\s*mo/.test(text)?max*12:max;
}
function marketTokens(value){
  return String(value||"").toLowerCase().split(/[^a-z0-9+#.]+/).filter(token=>token.length>2);
}
function marketProfileMatchesJob(profile,job,candidate){
  if(candidate?.jobId===job.id)return true;
  const jobTokens=new Set(marketTokens([job.title,job.skills].join(" ")));
  const profileTokens=marketTokens([profile.role,profile.skills].join(" "));
  return profileTokens.some(token=>jobTokens.has(token)) || String(profile.role||"").toLowerCase()===String(job.title||"").toLowerCase();
}
function clientMarketIntelligence(jobs){
  if(!jobs.length)return [
    ["Total Matched Candidates",0,"total"],
    ["Total Matched Immediate Joiners",0,"immediate"],
    ["Total Matched Sr. Candidates",0,"senior"],
    ["Matched Candidates in Job Location",0,"location"],
    ["Matched Within Budget",0,"budget"],
    ["Matched AI Agents",0,"agents"]
  ];
  const clientJobLocations=new Set(jobs.map(job=>String(job.location||"").trim().toLowerCase()).filter(Boolean));
  const profiles=state.externalTalent.filter(profile=>profile.source===BRAND_SOURCE_NAME).filter(profile=>{
    const candidate=state.candidates.find(item=>item.id===profile.candidateId);
    return jobs.some(job=>marketProfileMatchesJob(profile,job,candidate));
  });
  const withinBudget=profiles.filter(profile=>{
    const candidate=state.candidates.find(item=>item.id===profile.candidateId);
    const profileCost=salaryAnnualLpa(candidate?.ctc||profile.ctc);
    if(profileCost===null)return false;
    return jobs.some(job=>{
      const jobBudget=salaryAnnualLpa(job.salary);
      if(jobBudget===null)return false;
      return marketProfileMatchesJob(profile,job,candidate) && profileCost<=jobBudget;
    });
  }).length;
  const inLocation=profiles.filter(profile=>{
    const location=String(profile.location||"").trim().toLowerCase();
    return clientJobLocations.has(location) || (clientJobLocations.has("remote") && /remote/.test(location));
  }).length;
  const matchedAiAgents=jobs.filter(job=>job.type==="AI Agent").reduce((total,job)=>total+(Number(job.openings)||1),0);
  return [
    ["Total Matched Candidates",profiles.length,"total"],
    ["Total Matched Immediate Joiners",profiles.filter(profile=>/immediate/i.test(profile.availability||"")).length,"immediate"],
    ["Total Matched Sr. Candidates",profiles.filter(profile=>Number(profile.experience)>=6 || /senior|sr\.?|lead|manager|principal|architect/i.test(profile.role||"")).length,"senior"],
    ["Matched Candidates in Job Location",inLocation,"location"],
    ["Matched Within Budget",withinBudget,"budget"],
    ["Matched AI Agents",matchedAiAgents,"agents"]
  ];
}
function marketIntelligenceCard(jobs){
  const metrics=clientMarketIntelligence(jobs);
  return `<div class="card panel market-intel-panel"><div class="panel-head"><div><h3>${BRAND_NAME} AI Matched Market Intelligence</h3><small>From ${BRAND_SOURCE_NAME} based on your posted jobs</small></div></div><div class="market-intel-grid">
    ${metrics.map(item=>`<div class="market-intel-tile market-intel-${item[2]}"><small>${item[0]}</small><b>${item[1]}</b></div>`).join("")}
  </div></div>`;
}

function dashboard(role) {
  const intro = {Admin:"Here’s the pulse of your recruitment operation.",Client:"Track every open role and hiring decision in one place.",Recruiter:"Good morning, Priya. Your priority work is ready.",Candidate:"Welcome back, Rohan. Your next step is coming up."}[role];
  const allJobs = roleJobs(role).filter(job=>dateInDashboardRange(job.date,role));
  const jobs = filter === "All" ? allJobs : allJobs.filter(job => job.type === filter);
  const jobTitles = new Set(jobs.map(job => job.title));
  const jobIds = new Set(jobs.map(job=>job.id));
  const allCandidates = roleCandidates(role).filter(candidate=>jobIds.has(candidate.jobId));
  const candidates = filter === "All"
    ? allCandidates
    : allCandidates.filter(candidate => candidate.type === filter && (role === "Candidate" || jobTitles.has(candidate.role)));
  const roleCandidateRecords=roleCandidates(role);
  const allInterviews = roleInterviews(role).filter(interview=>dateInDashboardRange(interview.date,role));
  const interviews = filter === "All"
    ? allInterviews
    : allInterviews.filter(interview => roleCandidateRecords.find(candidate=>candidate.id===interview.candidateId)?.type===filter);
  const offers = candidates.filter(candidate => ["Offered","Joined"].includes(candidate.stage)).length;
  const openOffers = candidates.filter(candidate => candidate.stage==="Offered").length;
  const activeJobs = jobs.filter(job => job.status === "Active").length;
  const adminStageMetrics = PIPELINE_STAGES.map(stage=>[
    stage,
    candidates.filter(candidate=>candidate.stage===stage).length,
    `${candidates.filter(candidate=>candidate.stage===stage).length} candidate${candidates.filter(candidate=>candidate.stage===stage).length===1?"":"s"} in ${stage}`,
    "candidates",
    stage,
    stage
  ]);
  const metrics = role==="Candidate" ? [["Active applications",jobs.length,"Current applications","applications"],["Upcoming interviews",interviews.filter(interview=>!["Completed","Cancelled"].includes(interview.status)).length,interviews.some(interview=>!["Completed","Cancelled"].includes(interview.status)) ? "Next interview scheduled" : "No interviews scheduled","interviews"],["Profile complete",`${state.profile.completion}%`,"Profile strength","profile"],["Offers",openOffers,"Awaiting response","offers"]] :
    role==="Client" ? [["Active jobs",activeJobs,`${jobs.length} total jobs`,"jobs","Active"],["CVs to review",candidates.length,"Profiles received","cv-review"],["Interviews",interviews.length,"Scheduled interviews","interviews"],["Offers open",openOffers,"At offer stage","offers"]] :
    role==="Recruiter" ? [["Assigned jobs",jobs.length,`${activeJobs} active`,"jobs"],["Candidates sourced",candidates.length,"In assigned pipelines","sourcing"],["Interviews",interviews.length,"Scheduled interviews","interviews"],["Placements",candidates.filter(candidate => candidate.stage === "Joined").length,"Joined candidates","sourcing","Joined"]] :
    adminStageMetrics;
  const stageGroups = [
    ["Sourced", candidates.filter(candidate => candidate.stage==="Sourced").length,"Sourced","Sourced"],
    ["Screened", candidates.filter(candidate => candidate.stage==="Screened").length,"Screened","Screened"],
    ["AI Interview", candidates.filter(candidate => candidate.stage==="AI Interview").length,"AI Interview","AI Interview"],
    ["Client Review", candidates.filter(candidate => candidate.stage==="Client Review").length,"Client Review","Client Review"],
    ["Interview", candidates.filter(candidate => /L[123] Interview/.test(candidate.stage)).length,"L1 Interview","Interview"],
    ["Offer", candidates.filter(candidate => candidate.stage==="Offered").length,"Offered","Offer"],
    ["Joined", candidates.filter(candidate => candidate.stage === "Joined").length,"Joined","Joined"]
  ];
  const maxStage = Math.max(...stageGroups.map(stage => stage[1]), 1);
  const summary=dashboardAiSummary(role,{jobs,candidates,interviews,offers,activeJobs});
  const activityItems=[
    ["match","✦",candidates.filter(candidate=>candidate.score>=90).length,"High-match profiles","AI score of 90% or higher","8 min"],
    ["interview","◷",interviews.filter(interview=>interview.status==="Confirmed").length,"Interviews confirmed","Ready on the schedule","35 min"],
    ["offer","◇",candidates.filter(candidate=>candidate.stage==="Offered").length,"Candidates at offer stage","Awaiting offer action","2 hr"],
    ["job","▤",activeJobs,"Jobs currently active","Open hiring requirements","4 hr"]
  ];
  const activityPanel=`<div class="card panel recent-activity-panel"><div class="panel-head"><div><h3>Recent activity</h3><small>Live hiring signals</small></div><a data-go="${pipelineDestination(role)}">View all <span>→</span></a></div><div class="activity dashboard-activity">
      ${activityItems.map(item=>`<div class="activity-item activity-${item[0]}"><span class="activity-icon">${item[1]}</span><div class="activity-copy"><p><b>${item[2]}</b> ${item[3]}</p><small>${item[4]}</small></div><time>${item[5]}</time></div>`).join("")}
    </div></div>`;
  const dashboardTitle=role==="Candidate"?`${(state.profile.name||roles.Candidate.user).trim().split(/\s+/)[0]}'s Dashboard`:`${role} Dashboard`;
  return `${pageHead(dashboardTitle,intro,dashboardDateFilter(role))}
  ${aiSummaryCard(summary)}
  <div class="${role==="Admin"?"admin-stage-kpis":""}">${kpis(metrics)}</div>
  <div class="grid-2">
    <div class="card panel"><div class="panel-head"><h3>${role==="Candidate"?"My applications":"Hiring pipeline"}</h3>${tabs()}</div>
      <div class="funnel">${stageGroups.map(stage=>`<div class="bar-set pipeline-bar-link ${stageClass(stage[2])}" data-go="${pipelineDestination(role)}" data-view-filter="${stage[3]}" role="link" tabindex="0" aria-label="View ${stage[1]} candidates in ${stage[0]}"><div class="bar" style="height:${pipelineBarHeight(stage[1],maxStage)}px"><b>${stage[1]}</b></div><small>${stage[0]}</small></div>`).join("")}</div>
    </div>
    ${role==="Client"?marketIntelligenceCard(jobs):activityPanel}
  </div>
  <div class="card panel"><div class="panel-head"><h3>${role==="Candidate"?"Active applications":"Priority jobs"}</h3><a data-go="${role==="Candidate"?"applications":"jobs"}">View all</a></div>
    <div class="table-wrap"><table><thead><tr><th>Role</th><th>Type</th><th>Status</th><th>${role==="Candidate"?"Progress":"Candidates"}</th><th>Interviews</th><th>Owner</th></tr></thead><tbody>
      ${jobs.slice(0,4).map(j=>{const jobCandidates=candidates.filter(candidate=>candidate.jobId===j.id).length;const jobInterviews=interviews.filter(interview=>interview.jobId===j.id).length;return `<tr class="${role==="Recruiter"?`urgency-row urgency-${j.urgency.toLowerCase()}`:""}"><td><b>${j.title}</b><br><small>${j.client} · ${j.location}</small></td><td>${badge(j.type)}</td><td>${badge(j.status)} ${urgencyBadge(j.urgency)}${role!=="Recruiter"?` ${badge(j.assignmentStatus)}`:""}</td><td>${jobCandidates}</td><td>${jobInterviews}</td><td>${person(j.recruiter)}</td></tr>`}).join("") || `<tr><td colspan="6" class="empty">No ${filter.toLowerCase()} records are available for this workspace.</td></tr>`}
    </tbody></table></div></div>`;
}

function jobsPage(role) {
  const q = filter.toLowerCase();
  const data = roleJobs(role).filter(j => filter==="All" || j.type===filter || Object.values(j).join(" ").toLowerCase().includes(q));
  const action = role==="Client"||role==="Admin" ? `<button class="btn btn-secondary" data-bulk-upload="jobs">⇧ Bulk upload</button><button class="btn btn-primary" id="new-job">＋ Create job</button>` : "";
  return `${pageHead(role==="Recruiter"?"My Assigned Jobs":role==="Client"?"My Job Listings":"Job Management","Manage requirements across permanent and contract hiring.",action)}
  <div class="card panel"><div class="filter-row">${tabs()}<div style="display:flex;gap:8px"><select id="job-status" style="width:140px"><option>All statuses</option><option>Active</option><option>On Hold</option></select><button class="btn btn-secondary" id="export-btn">⇩ Export</button></div></div>
  <div class="table-wrap"><table><thead><tr><th>Job</th><th>Engagement</th><th>Location</th><th>Openings</th><th>Pipeline</th><th>Job status</th><th>Assignment</th><th>Urgency</th><th>Recruiter</th><th>Actions</th></tr></thead><tbody>
  ${data.map(j=>`<tr class="${role==="Recruiter"?`urgency-row urgency-${j.urgency.toLowerCase()}`:""}" data-filter-type="${j.type}" data-filter-status="${j.status} ${j.assignmentStatus} ${j.urgency}" data-filter-owner="${j.recruiter}" data-filter-date="${j.date}"><td><b>${j.title}</b><br><small>${j.id} · ${j.client} · ${j.department||"General"}</small></td><td>${badge(j.type)}</td><td>${j.location}<br><small>${j.mode} · ${j.salary}</small></td><td>${j.openings}</td><td><b>${j.cv}</b> CVs · ${j.interviews} INT</td><td>${badge(j.status)}</td><td>${badge(j.assignmentStatus)}</td><td>${urgencyBadge(j.urgency)}</td><td>${j.recruiter?person(j.recruiter):"<span class=\"muted\">Awaiting Admin</span>"}</td><td><div class="row-actions"><button class="mini-btn view-job" data-id="${j.id}">View</button>${role==="Admin"?`<button class="mini-btn assign-job" data-id="${j.id}">${j.assignmentStatus==="Pending"?"Assign":"Reassign"}</button>`:""}${["Admin","Client"].includes(role)?`<button class="mini-btn clone-job" data-id="${j.id}">Clone</button><button class="mini-btn toggle-job" data-id="${j.id}" aria-label="${j.status==="Active"?"Place job on hold":"Set job active"}">${j.status==="Active"?"Hold":"Active"}</button>`:""}</div></td></tr>`).join("") || `<tr><td colspan="10" class="empty">No matching jobs found.</td></tr>`}
  </tbody></table></div></div>`;
}

function jobTypePage() {
  const permanentIcon=kpiIcon("job").svg;
  const contractIcon=kpiIcon("applications").svg;
  const aiAgentIcon=kpiIcon("integration").svg;
  return `${pageHead("Post a new job","Choose the engagement model. You can review all details before publishing.",`<button class="btn btn-secondary" data-bulk-upload="jobs">⇧ Bulk upload</button>`)}
  <div class="job-type-grid">
    <div class="card panel job-type-card"><span class="kpi-icon kpi-icon-briefcase">${permanentIcon}</span><h2>Permanent Hire</h2><p>Hire a full-time employee on your payroll with salary, benefits and probation details.</p><button class="btn btn-primary choose-job" data-type="Permanent">Create permanent role →</button></div>
    <div class="card panel job-type-card"><span class="kpi-icon kpi-icon-people">${contractIcon}</span><h2>Hire on Contract</h2><p>Engage a professional for a defined period with rate, billing and exit terms.</p><button class="btn btn-primary choose-job" data-type="Contract">Create contract role →</button></div>
    <div class="card panel job-type-card job-type-ai"><span class="kpi-icon kpi-icon-network">${aiAgentIcon}</span><span class="ai-agent-pill">AI workforce</span><h2>Hire AI Agent</h2><p>Deploy a configurable AI agent for repeatable recruitment, HR, operations, or support workflows.</p><button class="btn btn-primary choose-job" data-type="AI Agent">Create AI agent →</button></div>
  </div>`;
}

function candidatesPage(role, page) {
  const title = page==="cv-review"?"CV Review":page==="sourcing"?"Candidate / Contractor Sourcing":role==="Recruiter"?"Candidate Management":"Candidate & Contractor Management";
  const sub = page==="sourcing"?"AI-powered matches and your internal talent database.":"Review, progress, and communicate with every profile.";
  const isClientReview=role==="Client"&&page==="cv-review";
  const action = isClientReview?"":`<button class="btn btn-secondary" data-bulk-upload="candidates">⇧ Bulk upload</button><button class="btn btn-secondary" id="upload-cv">⇧ Upload CV</button><button class="btn btn-primary" id="new-candidate">＋ Add candidate</button>`;
  const scopedCandidates=roleCandidates(role);
  const colCount=isClientReview?9:8;
  const lastWorkingHead=isClientReview?`<th>Last Working Date</th>`:"";
  const rows=scopedCandidates
    .filter(c=>matchesPipelineFilter(c,filter)||(filter==="Offer pipeline"&&["Offered","Joined"].includes(c.stage)))
    .map(c=>{
      const visible=revealCandidateIdentity(c);
      const lastWorkingCell=isClientReview?`<td><button class="last-working-link" data-id="${c.id}">${esc(candidateLastWorkingDate(c))}</button></td>`:"";
      return `<tr data-filter-type="${c.type}" data-filter-status="${c.stage} ${c.clientReviewStatus}" data-filter-owner="${c.recruiter}"><td>${person(candidateDisplayName(c),visible?c.location:"Identity protected")}</td><td><b>${c.role}</b><br><small>${c.client} · ${c.skills}</small></td><td>${badge(c.type)}</td><td><b style="color:${c.score>89?"var(--green)":"var(--purple)"}">${c.score}%</b></td><td>${c.notice}</td>${lastWorkingCell}<td>${badge(c.stage)}</td><td>${isClientReview?`<select class="client-review-status" data-id="${c.id}" aria-label="Client decision for ${esc(candidateDisplayName(c))}"><option value="Awaiting Review" ${c.clientReviewStatus==="Awaiting Review"?"selected":""}>Awaiting Review</option>${["Shortlist","Select","Reject"].map(status=>`<option ${c.clientReviewStatus===status?"selected":""}>${status}</option>`).join("")}</select>`:clientReviewBadge(c.clientReviewStatus)}</td><td><div class="row-actions"><button class="mini-btn view-candidate" data-id="${c.id}">Profile</button>${isClientReview?"":`<button class="mini-btn move-candidate" data-id="${c.id}">Move</button><button class="mini-btn message-candidate" data-id="${c.id}">Message</button>`}</div></td></tr>`;
    }).join("");
  return `${pageHead(title,sub,action)}
  ${page==="sourcing"?kpis([["AI matches",scopedCandidates.filter(candidate=>candidate.score>=85).length,"Score 85% or higher"],["Internal profiles",state.candidates.length,"Shared talent database"],["New uploads",scopedCandidates.filter(candidate=>candidate.stage==="Sourced").length,"Ready for screening"],["Duplicates stopped",Math.floor(state.candidates.length*.07),"Simulation quality check"]]):""}
  <div class="card panel"><div class="filter-row">${tabs()}<select id="candidate-stage" style="width:180px"><option ${filter==="All"?"selected":""}>All pipeline stages</option><option value="Interview" ${filter==="Interview"?"selected":""}>Interview (L1-L3)</option>${PIPELINE_STAGES.map(x=>`<option class="${stageClass(x)}" ${filter===x||filter==="Offer"&&x==="Offered"?"selected":""}>${x}</option>`).join("")}</select></div>
  <div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Role</th><th>Type</th><th>AI match</th><th>Availability</th>${lastWorkingHead}<th>Stage</th><th>Client decision</th><th>Actions</th></tr></thead><tbody>
  ${rows || `<tr><td colspan="${colCount}" class="empty">No records match this dashboard metric.</td></tr>`}
  </tbody></table></div></div>`;
}

function interviewsPage(role,page) {
  const ai = page==="ai-interview";
  const canManageInterviews=role!=="Candidate";
  const interviews = roleInterviews(role);
  const visibleInterviews = interviewView === "Completed"
    ? interviews.filter(interview => /completed/i.test(interview.status))
    : interviews.filter(interview => !/completed|cancelled/i.test(interview.status));
  const calendarYear=interviewCalendarDate.getFullYear();
  const calendarMonth=interviewCalendarDate.getMonth();
  const calendarEvents = interviews.reduce((days,interview) => {
    const eventDate=parseAppDate(interview.date);
    if(!eventDate||eventDate.getFullYear()!==calendarYear||eventDate.getMonth()!==calendarMonth)return days;
    const day=eventDate.getDate();
    (days[day] ||= []).push(interview);
    return days;
  },{});
  const firstWeekday=new Date(calendarYear,calendarMonth,1).getDay();
  const daysInMonth=new Date(calendarYear,calendarMonth+1,0).getDate();
  const calendarLabel=interviewCalendarDate.toLocaleDateString("en-US",{month:"long",year:"numeric"});
  const calendar = `<div class="calendar-title"><button class="mini-btn" id="calendar-prev" aria-label="Previous month">‹</button><b>${calendarLabel}</b><button class="mini-btn" id="calendar-next" aria-label="Next month">›</button></div>
    <div class="calendar-weekdays">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=>`<span>${day}</span>`).join("")}</div>
    <div class="calendar-grid">${Array.from({length:42},(_,index)=>{
      const day=index-firstWeekday+1;
      if(day<1||day>daysInMonth) return `<div class="calendar-empty"></div>`;
      const events=calendarEvents[day]||[];
      const today=new Date();
      const isToday=today.getFullYear()===calendarYear&&today.getMonth()===calendarMonth&&today.getDate()===day;
      return `<div class="${isToday?"calendar-today":""}"><b>${day}</b>${events.slice(0,2).map(event=>{const candidate=state.candidates.find(item=>item.id===event.candidateId);const eventMarkup=`${esc(event.time)} · ${esc(event.candidate)}`;return canManageInterviews?`<button class="cal-event calendar-event" data-id="${event.id}" data-filter-status="${event.status}" data-filter-date="${event.date}" data-filter-type="${candidate?.type||""}" data-filter-owner="${candidate?.recruiter||""}">${eventMarkup}</button>`:`<div class="cal-event calendar-event" data-filter-status="${event.status}" data-filter-date="${event.date}" data-filter-type="${candidate?.type||""}" data-filter-owner="${candidate?.recruiter||""}">${eventMarkup}</div>`}).join("")}${events.length>2?`<small class="calendar-more">+${events.length-2} more</small>`:""}</div>`;
    }).join("")}</div>`;
  const actions=canManageInterviews?`<button class="btn btn-secondary" data-bulk-upload="interviews">⇧ Bulk upload</button><button class="btn btn-primary" id="schedule-interview">＋ Schedule interview</button>`:"";
  return `${pageHead(ai?"AI Technical Interviews":"Interview Management",ai?"Assign, monitor, and review structured AI interviews.":canManageInterviews?"Schedule interviews, coordinate panels, and capture feedback.":"Review your upcoming and completed interview schedule.",actions)}
  ${ai?kpis([["Assigned",interviews.filter(interview=>interview.round==="AI Technical").length,"AI interview records"],["Completed",interviews.filter(interview=>interview.round==="AI Technical"&&interview.status==="Completed").length,"Finished assessments"],["Avg. score",`${Math.round(roleCandidates(role).reduce((sum,candidate)=>sum+candidate.score,0)/Math.max(roleCandidates(role).length,1))}%`,"Linked candidate score"],["Shortlisted",roleCandidates(role).filter(candidate=>candidate.score>=85).length,"Score 85% or higher"]]):""}
  <div class="card panel"><div class="filter-row"><div class="tabs">${["Upcoming","Completed","Calendar"].map(view=>`<button class="tab ${interviewView===view?"active":""}" data-interview-view="${view}">${view}</button>`).join("")}</div></div>
  ${interviewView==="Calendar" ? calendar : `<div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Role</th><th>Round</th><th>Date & time</th><th>Mode</th><th>Status</th>${canManageInterviews?"<th>Actions</th>":""}</tr></thead><tbody>
  ${visibleInterviews.map(i=>{const candidate=state.candidates.find(item=>item.id===i.candidateId);return `<tr data-filter-status="${i.status}" data-filter-date="${i.date}" data-filter-type="${candidate?.type||""}" data-filter-owner="${candidate?.recruiter||""}"><td>${person(i.candidate)}</td><td>${i.role}</td><td>${badge(i.round)}</td><td><b>${i.date}</b><br><small>${i.time}</small></td><td>${i.mode}</td><td>${badge(i.status)}</td>${canManageInterviews?`<td><button class="mini-btn feedback-interview" data-id="${i.id}">${ai?"Report":"Feedback"}</button> <button class="mini-btn reschedule-interview" data-id="${i.id}">Reschedule</button></td>`:""}</tr>`}).join("") || `<tr><td colspan="${canManageInterviews?7:6}" class="empty">No ${interviewView.toLowerCase()} interviews found.</td></tr>`}
  </tbody></table></div>`}</div>`;
}

function assignedRecruiterForCandidate(candidate) {
  return candidate?.recruiter || state.jobs.find(job=>job.id===candidate?.jobId)?.recruiter || "Pending assignment";
}
function ensureCandidateRecruiterThread(candidate) {
  state.candidateRecruiterChats ||= {};
  if (!candidate) return [];
  if (!state.candidateRecruiterChats[candidate.id]) {
    state.candidateRecruiterChats[candidate.id] = candidate.id===state.profile.candidateId
      ? (state.messages||seed.messages).map(message=>({
          sender:message.sender||message.from||(message.me?activeUserName("Candidate"):assignedRecruiterForCandidate(candidate)),
          text:message.text,
          time:message.time
        }))
      : [];
  }
  return state.candidateRecruiterChats[candidate.id];
}
function communicationPage() {
  const isCandidate=session.role==="Candidate";
  const visibleCandidates=isCandidate?roleCandidates("Candidate").slice(0,1):roleCandidates("Recruiter");
  const selectedCandidate=visibleCandidates.find(candidate=>candidate.id===activeConversation)||visibleCandidates[0];
  if (!selectedCandidate) {
    return `${pageHead(isCandidate?"Communication":"Communication Hub",isCandidate?"Private messages with your assigned recruiter.":"Message candidates linked to your assigned jobs.")}
      <div class="card panel empty">No linked recruiter conversation is available yet.</div>`;
  }
  activeConversation=selectedCandidate.id;
  const recruiter=assignedRecruiterForCandidate(selectedCandidate);
  const contactName=isCandidate?recruiter:selectedCandidate.name;
  const contactContext=isCandidate?`${selectedCandidate.role} · Assigned recruiter`:`${selectedCandidate.role} · ${selectedCandidate.client}`;
  const conversations=visibleCandidates.map(candidate=>{
    const messages=ensureCandidateRecruiterThread(candidate);
    const lastMessage=messages[messages.length-1];
    return {
      id:candidate.id,
      name:isCandidate?assignedRecruiterForCandidate(candidate):candidate.name,
      context:isCandidate?`${candidate.role} · Your recruiter`:`${candidate.role} · ${candidate.client}`,
      time:lastMessage?.time||"New"
    };
  });
  const messages=ensureCandidateRecruiterThread(selectedCandidate);
  return `${pageHead(isCandidate?"Communication":"Communication Hub",isCandidate?"Your private conversation with your assigned recruiter.":"Candidate conversations for jobs assigned to you.")}
  <div class="card chat-shell ${isCandidate?"candidate-private-chat":""}"><aside class="chat-list">
    ${isCandidate?`<div class="private-chat-label"><span>●</span> Private recruiter conversation</div>`:`<div class="chat-search"><input id="conversation-search" placeholder="Search candidates..." /></div>`}
    ${conversations.map(conversation=>`<button type="button" class="conversation ${conversation.id===selectedCandidate.id?"active":""}" data-conversation="${conversation.id}"><span class="avatar">${initials(conversation.name)}</span><div style="min-width:0"><b>${esc(conversation.name)}</b><p>${esc(conversation.context)}</p></div><small>${esc(conversation.time)}</small></button>`).join("")}</aside>
  <section class="chat-main"><div class="chat-head"><span class="avatar">${initials(contactName)}</span><div><b>${esc(contactName)}</b><br><small style="color:var(--green)">● Online · ${esc(contactContext)}</small></div><span class="private-chat-badge">Private</span></div>
  <div class="messages">${messages.length?messages.map(message=>`<div class="bubble ${message.sender===activeUserName(session.role)?"me":""}">${esc(message.text)}<small>${esc(message.time)}</small></div>`).join(""):`<div class="chat-empty-state"><b>Start the conversation</b><span>Messages here are visible only to ${esc(selectedCandidate.name)} and ${esc(recruiter)}.</span></div>`}</div>
  <form class="message-compose" id="message-form"><input id="message-attachment" type="file" hidden><button type="button" class="icon-btn" id="message-attachment-btn" aria-label="Add attachment">＋</button><input id="message-input" placeholder="Message ${esc(contactName.split(" ")[0])}..." required /><button class="btn btn-primary">Send</button></form></section></div>`;
}

function offersPage(role) {
  const offerCandidates = roleCandidates(role).filter(candidate => ["Offered","Joined"].includes(candidate.stage));
  const candidateOffer=offerCandidates[0];
  const offerJob=candidateOffer ? state.jobs.find(job=>job.id===candidateOffer.jobId) : null;
  return `${pageHead(role==="Candidate"?"Offer & Joining":"Offer & Contract Management",role==="Candidate"?"Review your offer and complete joining actions.":"Create, track, and close offers for both engagement types.",role!=="Candidate"?`<button class="btn btn-secondary" data-bulk-upload="offers">⇧ Bulk upload</button><button class="btn btn-primary" id="raise-offer">＋ Raise offer</button>`:"")}
  <div class="card panel">
  ${role==="Candidate"?(candidateOffer?`<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px"><div><span>${badge(candidateOffer.type==="Permanent"?"Permanent offer":candidateOffer.type==="AI Agent"?"AI Agent engagement":"Contract offer")} ${badge(candidateOffer.stage==="Joined"?"Accepted":"Awaiting response")}</span><h2>${candidateOffer.role}</h2><p>${candidateOffer.client} · ${offerJob?.location||candidateOffer.location} · ${offerJob?.mode||""}</p></div><div style="text-align:right"><small>Compensation</small><h2>${candidateOffer.ctc}</h2></div></div>
    <div class="timeline">${["Offered","Viewed","Documents","Accepted","Joining"].map((x,i)=>{const completed=candidateOffer.stage==="Joined"||i<2;const current=candidateOffer.stage!=="Joined"&&i===2;return `<div class="stage ${completed?"done":current?"current":""}"><span class="stage-dot">${completed?"✓":i+1}</span>${x}</div>`}).join("")}</div>
    <div class="grid-equal"><div><h3>Offer details</h3><p><b>Compensation:</b> ${candidateOffer.ctc}</p><p><b>Start date:</b> ${candidateOffer.offer?.startDate||"To be confirmed"}</p><p><b>Terms:</b> ${candidateOffer.offer?.terms||"Standard company terms"}</p></div><div><h3>Required documents</h3><p>✓ Identity proof</p><p>✓ Current employment letter</p><p>○ Signed offer letter</p><p>○ Bank details</p></div></div>
    <div style="display:flex;gap:10px;margin-top:20px">${candidateOffer.stage==="Offered"?`<button class="btn btn-primary" id="accept-offer" data-id="${candidateOffer.id}">Accept offer</button>`:""}<button class="btn btn-secondary" id="download-offer">⇩ Download</button>${candidateOffer.stage==="Offered"?`<button class="btn btn-danger" id="decline-offer">Decline</button>`:`<span class="badge badge-green"><i class="dot"></i>Joining workflow active</span>`}</div>`:`<div class="empty"><div class="empty-icon">◇</div><h3>No active offer</h3><p>Your offer or contract will appear here when it is issued.</p></div>`):
    `<div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Position</th><th>Type</th><th>Compensation</th><th>Start date</th><th>Status</th><th>Action</th></tr></thead><tbody>
    ${offerCandidates.map(c=>`<tr data-filter-type="${c.type}" data-filter-status="${c.stage}" data-filter-owner="${c.recruiter}" data-filter-date="${c.offer?.startDate||""}"><td>${person(c.name)}</td><td>${c.role}</td><td>${badge(c.type)}</td><td>${c.ctc}</td><td>${c.offer?.startDate||"To be confirmed"}</td><td>${badge(c.stage)}</td><td><button class="mini-btn view-offer" data-id="${c.id}">View</button> <button class="mini-btn manage-offer" data-id="${c.id}">${c.stage==="Joined"?"Onboard":"Edit"}</button></td></tr>`).join("") || `<tr><td colspan="7" class="empty">No candidates are currently at offer stage.</td></tr>`}</tbody></table></div>`}
  </div>`;
}

function usersPage() {
  const recruiters=state.users.filter(user=>user.role==="Recruiter");
  const active=state.users.filter(user=>user.status==="Active");
  return `${pageHead("User Management","Control access, roles, permissions, and recruiter-client mapping.",`<button class="btn btn-secondary" data-bulk-upload="users">⇧ Bulk upload</button><button class="btn btn-primary" id="new-user">＋ Add user</button>`)}
  ${kpis([["Total users",state.users.length,"Across 4 roles"],["Active users",active.length,"Shared workspace accounts"],["Recruiters",recruiters.length,`${state.jobs.length} assigned jobs`],["Login health","99.8%","Simulation status"]])}
  <div class="card panel"><div class="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Status</th><th>Last login</th><th>Actions</th></tr></thead><tbody>
  ${state.users.map((u,i)=>`<tr data-filter-status="${u.status}" data-filter-type="${u.role}" data-filter-owner="" data-filter-date="${u.last}"><td>${person(u.name,u.email)}</td><td>${badge(u.role)}</td><td>${badge(u.status)}</td><td>${u.last}</td><td><button class="mini-btn edit-user" data-i="${i}">Edit</button> <button class="mini-btn manage-permissions" data-i="${i}">Permissions</button></td></tr>`).join("")}</tbody></table></div></div>`;
}

function clientsPage() {
  const clients=state.clients;
  return `${pageHead("Client Management","Manage accounts, commercials, agreements, and linked jobs.",`<button class="btn btn-secondary" data-bulk-upload="clients">⇧ Bulk upload</button><button class="btn btn-primary" id="new-client">＋ Add client</button>`)}
  <div class="job-card-grid">${clients.map(c=>{const count=state.jobs.filter(job=>job.client===c.company).length;return `<div class="card job-card" data-filter-status="${c.status}"><div style="display:flex;justify-content:space-between">${badge(c.status)}<button class="mini-btn client-menu" data-client="${c.company}">•••</button></div><h3>${c.company}</h3><p>${c.contact} · ${count} ${count===1?"job":"jobs"}</p><div class="job-meta"><span>Commercials: ${c.commercials}</span></div><button class="btn btn-secondary btn-block view-client" data-client="${c.company}" data-contact="${c.contact}" data-email="${c.email}" data-commercials="${c.commercials}" data-status="${c.status}" data-agreement="${c.agreement}" data-nda="${c.nda}">Open account</button></div>`}).join("")}</div>`;
}

function aiSourcingPage() {
  const isAdmin=session.role==="Admin";
  const availableJobs=isAdmin?state.jobs.filter(job=>job.status==="Active"):roleJobs("Recruiter").filter(job=>job.status==="Active"&&job.assignmentStatus==="Assigned");
  const connected=state.integrations.filter(item=>item.connected&&item.enabled);
  const results=state.aiSourcingResults.map(id=>state.externalTalent.find(profile=>profile.id===id)).filter(Boolean);
  const visibleCandidates=isAdmin?state.candidates:roleCandidates("Recruiter");
  const importedNames=new Set(visibleCandidates.map(candidate=>candidate.name.toLowerCase()));
  return `${pageHead(`<span class="ai-color-title">AI Sourcing</span>`,"Discover and qualify talent across connected internet sources using AI.",`${isAdmin?`<button class="btn btn-secondary" data-go="integrations">⚡ Manage integrations</button>`:""}<div class="ai-source-cta"><small>Source candidates based on ${isAdmin?"active jobs":"jobs assigned to you"}</small><button class="btn btn-primary" id="run-ai-source">✦ AI Candidate Source</button></div>`)}
  <form class="card ai-source-filters" id="ai-source-form">
    <div class="panel-head"><div><h3>AI talent search</h3><p>Combine role context with detailed talent criteria.</p></div><button type="button" class="mini-btn" id="clear-ai-source">Clear filters</button></div>
    <div class="ai-filter-grid">
      <div class="field"><label>Hiring job</label><select name="jobId"><option value="">${isAdmin?"Any active job":"Any assigned job"}</option>${availableJobs.map(job=>`<option value="${job.id}">${job.id} · ${job.title}</option>`).join("")}</select></div>
      <div class="field"><label>Keywords / Boolean search</label><input name="keywords" placeholder='e.g. "Java" AND AWS'></div>
      <div class="field"><label>Required skills</label><input name="skills" placeholder="Java, Spring Boot, AWS"></div>
      <div class="field"><label>Location</label><input name="location" list="ai-location-options" placeholder="City or Remote"><datalist id="ai-location-options">${APP_OPTIONS.cities.map(city=>`<option value="${city}"></option>`).join("")}</datalist></div>
      <div class="field"><label>Minimum experience</label><input name="minExperience" type="number" min="0" max="30" placeholder="0 years"></div>
      <div class="field"><label>Maximum experience</label><input name="maxExperience" type="number" min="0" max="40" placeholder="Any"></div>
      <div class="field"><label>Minimum AI match</label><select name="minScore">${[70,75,80,85,90,95].map(score=>`<option ${score===80?"selected":""} value="${score}">${score}%+</option>`).join("")}</select></div>
      <div class="field"><label>Availability</label><select name="availability"><option value="">Any notice period</option>${["Immediate","15 days","30 days","45 days","60 days"].map(value=>`<option>${value}</option>`).join("")}</select></div>
      <div class="field"><label>Current company</label><input name="company" placeholder="e.g. Infosys"></div>
      <div class="field"><label>Education</label><select name="education"><option value="">Any qualification</option>${["B.Tech","M.Tech","MBA","B.Sc","B.Des"].map(value=>`<option>${value}</option>`).join("")}</select></div>
    </div>
    <div class="source-provider-filter"><div class="source-provider-title"><b>Search Sources</b><small>Select one or more databases for profiles matching ${isAdmin?"active requirements":"your assigned jobs"}.</small></div><div><label class="source-check"><input type="checkbox" name="sources" value="${BRAND_SOURCE_NAME}" checked><span>${BRAND_SOURCE_NAME}</span><small>Available · Internal profiles</small></label>${state.integrations.filter(item=>item.id!=="custom").map(item=>`<label class="source-check ${item.connected&&item.enabled?"":"disabled"}"><input type="checkbox" name="sources" value="${item.name}" ${item.connected&&item.enabled?"checked":"disabled"}><span>${item.name}</span><small>${item.connected&&item.enabled?"Available":isAdmin?"Connect in Integrations":"Unavailable · Admin managed"}</small></label>`).join("")}</div></div>
    <div class="ai-search-actions"><label class="check"><input type="checkbox" name="verifiedOnly"> Verified contact details only</label><button type="submit" class="btn btn-primary">✦ Run AI sourcing</button></div>
  </form>
  <div class="card panel ai-results-panel"><div class="panel-head"><div><h3>AI matched profiles</h3><p>${results.length} results ranked by relevance across ${connected.length} connected sources.</p></div><div class="ai-result-head-actions">${state.sourcingSearches.length?`<small>Last search: ${state.sourcingSearches[0].time}</small>`:""}<div class="view-switch"><button class="${aiSourcingView==="Grid"?"active":""}" data-ai-view="Grid">Grid</button><button class="${aiSourcingView==="List"?"active":""}" data-ai-view="List">List</button></div></div></div>
  <div class="ai-profile-grid ${aiSourcingView==="List"?"list-view":""}">${results.map(profile=>{
    const imported=importedNames.has(profile.name.toLowerCase());
    return `<article class="ai-profile-card"><div class="ai-profile-top">${person(profile.name,profile.role)}${badge(profile.source)}</div><div class="ai-score"><span><b>${profile.score}%</b> AI match</span><div class="progress"><span style="width:${profile.score}%"></span></div></div><div class="ai-profile-details"><span>${profile.experience} yrs experience</span><span>${profile.location}</span><span>${profile.currentCompany}</span><span>${profile.availability}</span></div><div class="display-tags">${profile.skills.split(",").slice(0,4).map(skill=>`<span class="skill-tag">${esc(skill.trim())}</span>`).join("")}</div><div class="ai-profile-contact"><small>${esc(profile.email)}</small><small>${esc(profile.phone)}</small></div><div class="row-actions"><button class="btn btn-secondary view-external-profile" data-id="${profile.id}">View profile</button><button class="btn btn-primary import-external-profile" data-id="${profile.id}">${imported?"Add to another job":"Add to pipeline"}</button></div></article>`;
  }).join("")||`<div class="empty"><div class="empty-icon">✦</div><h3>No matching profiles</h3><p>Change the search criteria or connect more data sources.</p></div>`}</div></div>`;
}

function integrationsPage(){
  const connected=state.integrations.filter(item=>item.connected).length;
  return `${pageHead("Integrations","Admin-only controls for talent source APIs and data connections.",`<button class="btn btn-primary" id="add-integration">＋ Add custom API</button>`)}
  <div class="integration-security-note"><b>Secure API setup</b><span>This prototype stores masked connection settings locally. Production credentials must be encrypted and handled by a secure server, never exposed in browser code.</span></div>
  ${kpis([["Available providers",state.integrations.length,"Talent data connections"],["Connected",connected,"Configured integrations"],["Active sources",state.integrations.filter(item=>item.connected&&item.enabled).length,"Available to AI Sourcing"],["Last sync","9:20 AM","Most recent provider sync"]])}
  <div class="integration-grid">${state.integrations.map(item=>`<article class="card integration-card" data-integration="${item.id}"><div class="integration-head"><span class="integration-logo">${item.name.slice(0,2).toUpperCase()}</span><div><h3>${item.name}</h3><p>${item.category}</p></div>${badge(item.connected?"Connected":"Not connected")}</div><div class="integration-meta"><span><small>API key</small><b>${item.apiKey||"Not configured"}</b></span><span><small>Last sync</small><b>${item.lastSync}</b></span></div><label class="integration-enable"><input type="checkbox" class="toggle-integration" data-id="${item.id}" ${item.enabled?"checked":""} ${item.connected?"":"disabled"}> Use in AI Sourcing</label><div class="row-actions"><button class="btn btn-secondary configure-integration" data-id="${item.id}">${item.connected?"Edit connection":"Connect API"}</button>${item.connected?`<button class="mini-btn test-integration" data-id="${item.id}">Test</button>`:""}</div></article>`).join("")}</div>`;
}

function leadsPage() {
  const stages=["New","Qualified","Proposal","Negotiation"];
  return `${pageHead("Lead Generation","Turn hiring demand into a healthy, measurable client pipeline.",`<button class="btn btn-secondary" data-bulk-upload="leads">⇧ Bulk upload</button><button class="btn btn-primary" id="new-lead">＋ Add lead</button>`)}
  <div class="kanban">${stages.map(s=>`<div class="kanban-col"><div class="kanban-head"><span>${s}</span><span>${state.leads.filter(l=>l.stage===s).length}</span></div>${state.leads.filter(l=>l.stage===s).map(l=>`<div class="kanban-card" data-filter-status="${l.stage}" data-filter-owner="${l.owner}">${badge(l.source)}<b>${l.company}</b><p>${l.contact} · ${l.owner}</p><strong>${l.value}</strong><button class="mini-btn move-lead" data-company="${l.company}" style="float:right">Move →</button></div>`).join("")}</div>`).join("")}</div>`;
}

function reportsPage() {
  const recruiterRows=(state.recruiters||[]).map(name=>{
    const jobs=state.jobs.filter(job=>job.recruiter===name);
    const jobIds=new Set(jobs.map(job=>job.id));
    const candidates=state.candidates.filter(candidate=>jobIds.has(candidate.jobId));
    return [name,candidates.length,state.interviews.filter(interview=>jobIds.has(interview.jobId)).length,candidates.filter(candidate=>candidate.stage==="Joined").length];
  });
  const offered=state.candidates.filter(candidate=>["Offered","Joined"].includes(candidate.stage)).length;
  const joined=state.candidates.filter(candidate=>candidate.stage==="Joined").length;
  const reportStages=["Sourced","Screened","AI Interview","Client Review","Interview","Offered","Joined"].map(stage=>[stage,stage==="Interview"?state.candidates.filter(candidate=>/L[123] Interview/.test(candidate.stage)).length:state.candidates.filter(candidate=>candidate.stage===stage).length]);
  const reportStageMax=Math.max(...reportStages.map(stage=>stage[1]),1);
  return `${pageHead("Reports & Analytics","Understand recruiter output, pipeline velocity, offers, and lead conversion.",`<button class="btn btn-secondary" id="export-btn">⇩ Export reports</button>`)}
  ${kpis([["Active jobs",state.jobs.filter(job=>job.status==="Active").length,`${state.jobs.length} total requirements`],["Candidates",state.candidates.length,"Simulation profiles"],["Offer conversion",offered?`${Math.round(joined/offered*100)}%`:"0%",`${joined} joined from ${offered} offers`],["Client SLA",`${Math.round(state.clients.filter(client=>client.status==="Active").length/state.clients.length*100)}%`,"Active client accounts"]])}
  <div class="grid-equal"><div class="card panel"><div class="panel-head"><h3>Recruiter performance</h3><select style="width:130px"><option>June 2026</option></select></div><div class="table-wrap"><table><thead><tr><th>Recruiter</th><th>Submissions</th><th>Interviews</th><th>Joins</th></tr></thead><tbody>${recruiterRows.map(x=>`<tr><td>${person(x[0])}<span class="filter-metadata">June 2026</span></td><td>${x[1]}</td><td>${x[2]}</td><td><b>${x[3]}</b></td></tr>`).join("")}</tbody></table></div></div>
  <div class="card panel"><div class="panel-head"><h3>Pipeline distribution</h3></div><div class="funnel">${reportStages.map(([stage,count])=>`<div class="bar-set ${stageClass(stage)}"><div class="bar" style="height:${pipelineBarHeight(count,reportStageMax)}px"><b>${count}</b></div><small>${stage}</small></div>`).join("")}</div></div></div>`;
}

function settingsPage() {
  return `${pageHead("Settings","Configure your organization, communication, workflow masters, and audit rules.",`<button class="btn btn-primary" id="save-settings">Save changes</button>`)}
  <div class="grid-2"><div class="card form-card"><div class="section-title">Company profile</div><div class="form-grid"><div class="field"><label>Company name</label><input value="G-NEXT Recruitment Pvt Ltd"></div><div class="field"><label>Support email</label><input value="support@gnext.ai"></div><div class="field"><label>Default currency</label><select><option>INR</option><option>USD</option></select></div><div class="field"><label>Timezone</label><select><option>Asia/Kolkata</option></select></div></div>
  <div class="section-title">Communication</div>${["Email notifications","SMS interview reminders","WhatsApp status updates","Weekly executive report"].map((x,i)=>`<label class="check" style="margin:13px 0"><input type="checkbox" ${i<3?"checked":""}> ${x}</label>`).join("")}</div>
  <div class="card panel"><div class="panel-head"><h3>Workflow masters</h3></div>${["Pipeline stages","Rejection reasons","Engagement types","Interview rounds","Document categories"].map(x=>`<div style="display:flex;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--line)"><b>${x}</b><button class="mini-btn edit-master" data-name="${x}">Configure</button></div>`).join("")}</div></div>`;
}

function educationEntry(entry={},index=0){
  const level=entry.level||EDUCATION_LEVELS[index]||`Education ${index+1}`;
  return `<div class="profile-entry education-entry" data-entry-index="${index}">
    <div class="profile-entry-head"><b>${level}</b><input type="hidden" data-education-field="level" value="${esc(level)}"></div>
    <div class="form-grid education-row-grid">
      <div class="field"><label>Degree</label><input data-education-field="degree" value="${esc(entry.degree||"")}" placeholder="e.g. B.Tech, MBA" required></div>
      <div class="field"><label>Year of passing</label><input data-education-field="year" type="number" min="1950" max="2035" value="${esc(entry.year||"")}" placeholder="e.g. 2020" required></div>
      <div class="field"><label>University</label><input data-education-field="university" value="${esc(entry.university||entry.institute||"")}" placeholder="University / Board" required></div>
    </div>
  </div>`;
}
function experienceEntry(entry={},index=0){
  return `<div class="profile-entry experience-entry" data-entry-index="${index}">
    <div class="profile-entry-head"><b>Employment ${index+1}</b><button type="button" class="mini-btn remove-experience" aria-label="Remove employment">Remove</button></div>
    <div class="form-grid">
      <div class="field"><label>Company</label><input data-experience-field="company" value="${esc(entry.company||"")}" placeholder="Company name" required></div>
      <div class="field"><label>Designation</label><input data-experience-field="designation" value="${esc(entry.designation||"")}" placeholder="Job title" required></div>
      <div class="field"><label>Start month</label><input data-experience-field="startMonth" type="month" value="${esc(entry.startMonth||"")}" required></div>
      <div class="field"><label>End month</label><input data-experience-field="endMonth" type="month" value="${esc(entry.endMonth||"")}" required></div>
      <div class="field full"><label>Reason for leaving</label><textarea data-experience-field="reasonForLeaving" placeholder="Why did you leave or why are you leaving this job?" required>${esc(entry.reasonForLeaving||"")}</textarea></div>
    </div>
  </div>`;
}
function profilePage() {
  const p=state.profile;
  return `${pageHead("My Profile","Keep your information current so recruiters can move faster.",`<button class="btn btn-primary" id="save-profile">Save profile</button>`)}
  <div class="card profile-completion-card" id="profile-completion-card">
    <div class="profile-completion-copy">
      <small>PROFILE COMPLETION</small>
      <h2><span id="profile-completion-value">${p.completion}%</span> complete</h2>
      <p id="profile-completion-message">${p.completion===100?"Your custom CV is ready.":"Complete your profile to get a custom CV"}</p>
    </div>
    <div class="profile-completion-actions">
      <div class="progress profile-completion-progress" aria-label="Profile completion"><span id="profile-completion-bar" style="width:${p.completion}%"></span><b id="profile-completion-bar-value" style="left:clamp(25px,${p.completion}%,calc(100% - 25px))">${p.completion}%</b></div>
      <button type="button" class="btn btn-primary" id="download-profile-cv" ${p.completion===100?"":"hidden"}>Download Print-Ready CV (PDF)</button>
    </div>
  </div>
  <div class="grid-2"><form class="card form-card" id="profile-form"><div class="section-title">Personal information</div>
  ${fields([{label:"Name",name:"name",value:p.name},{label:"Email",name:"email",type:"email",value:p.email},{label:"Mobile number",name:"phone",value:p.phone,placeholder:"+91 98765 43210"}])}
  <div class="form-grid profile-location-grid">
    <div class="field"><label>State</label><select name="state" id="profile-state" required><option value="">Select state</option>${Object.keys(APP_OPTIONS.locationsByState).map(value=>`<option ${p.state===value?"selected":""}>${value}</option>`).join("")}</select></div>
    <div class="field"><label>City</label><input name="city" id="profile-city" value="${esc(p.city||"")}" list="profile-city-options" autocomplete="off" placeholder="Start typing a city..." required><datalist id="profile-city-options"></datalist></div>
    <div class="field full"><label>Locality</label><input name="locality" value="${esc(p.locality||"")}" placeholder="e.g. Indiranagar, Whitefield, Andheri" required><small>Enter your area, neighbourhood, or locality.</small></div>
  </div>
  <div class="section-title">Compensation</div>
  <p class="section-help">Enter exact annual values in ₹ LPA. Current CTC is split into fixed and variable components; expected CTC is entered as one total value.</p>
  <div class="form-grid ctc-grid">
    ${[["Current fixed CTC","currentFixed",p.currentFixed],["Current variable CTC","currentVariable",p.currentVariable],["Expected CTC","expectedCtc",p.expectedCtc]].map(([label,name,value])=>`<div class="field ${name==="expectedCtc"?"full":""}"><label>${label}</label><div class="number-suffix"><input name="${name}" type="number" min="0" step="0.01" value="${esc(value)}" placeholder="0.00" required><span>₹ LPA</span></div></div>`).join("")}
  </div>
  <div class="section-title">Availability</div>
  ${fields([{label:"Notice period",name:"notice",type:"select",options:["Immediate","15 days","30 days","45 days","60 days","90 days"],value:p.notice}])}
  <div class="form-grid conditional-field ${p.notice==="Immediate"?"show immediate-required":""}" id="last-working-day-wrap">
    <div class="field full"><label>Last working day <span class="mandatory-badge">Mandatory</span></label><input name="lastWorkingDay" type="date" value="${esc(p.lastWorkingDay||"")}"><small>This field is mandatory when availability is Immediate.</small></div>
  </div>
  <div class="section-title">Education</div>
  <p class="section-help">Enter Graduation, HSC, and SSC details in a compact format.</p>
  <div class="profile-entry-list compact-education-list" id="education-list">${normalizeEducationEntries(p.educationEntries).map(educationEntry).join("")}</div>
  <div class="section-title">Experience</div>
  <p class="section-help">Add company, designation, start month, and end month. Employment gaps are detected automatically.</p>
  <div class="profile-entry-list" id="experience-list">${p.experienceEntries.map(experienceEntry).join("")}</div>
  <button type="button" class="btn btn-secondary add-profile-entry" id="add-experience">＋ Add experience</button>
  <div class="experience-gap-box" id="experience-gap-box">
    <b>Experience gap detected</b>
    <p id="experience-gap-message"></p>
    <div class="gap-reason-list" id="experience-gap-reason-list"></div>
  </div>
  <div class="section-title">Skills</div>
  ${fields([{label:"Skills",name:"skills",type:"tags",value:p.skills,full:true}])}
  <div class="section-title">Resume & documents</div><div class="dropzone">⇧ Drop a new resume here or <b>browse files</b><br><small>Rohan_Kapoor_Product_Designer.pdf · Uploaded 02 Jun 2026</small></div></form>
  <div><div class="card panel" style="margin-bottom:18px"><h3>CV includes</h3><div class="cv-includes"><span>Personal information</span><span>Professional experience</span><span>Education</span><span>Skills</span><span>Compensation & availability</span></div><p class="section-help" style="margin:14px 0 0">Your PDF is formatted for A4 printing and uses the latest details entered on this page.</p></div><div class="card panel"><h3>Engagement preference</h3><label class="check"><input type="radio" checked> Permanent opportunities</label><label class="check" style="margin-top:12px"><input type="radio"> Contract opportunities</label></div></div></div>`;
}

function applicationsPage() {
  const applications=roleCandidates("Candidate");
  return `${pageHead("My Applications","Follow every stage and see recruiter feedback as it arrives.")}
  <div class="job-card-grid">${applications.map(application=>{const job=state.jobs.find(item=>item.id===application.jobId);const stageIndex=PIPELINE_STAGES.indexOf(application.stage);const milestones=[0,2,3,4,7];return `<div class="card job-card" data-filter-type="${application.type}" data-filter-status="${application.stage}" data-filter-owner="${application.recruiter}" data-filter-date="${job?.date||""}"><div style="display:flex;justify-content:space-between">${badge(application.type)}${badge(application.stage)}</div><h3>${application.role}</h3><p>${application.client} · ${job?.location||application.location}</p><div class="timeline" style="margin:15px 0">${["Applied","AI Interview","Client Review","Interview","Offer"].map((x,n)=>`<div class="stage ${stageClass(x)} ${stageIndex>=milestones[n]?"done":stageIndex===milestones[n]-1?"current":""}"><span class="stage-dot">${stageIndex>=milestones[n]?"✓":n+1}</span>${x}</div>`).join("")}</div><button class="btn btn-secondary btn-block view-application" data-id="${application.id}">View application</button></div>`}).join("")}</div>`;
}

function documentsPage() {
  const docs=state.documents.filter(document=>document.client===roles.Client.company);
  return `${pageHead("Documents & Agreements","Commercial documents, invoices, and engagement terms.",`<button class="btn btn-secondary" data-bulk-upload="documents">⇧ Bulk upload</button><button class="btn btn-primary" id="upload-document">＋ Add document</button>`)}
  <div class="card panel"><div class="table-wrap"><table><thead><tr><th>Document</th><th>Category</th><th>Status</th><th>Date</th><th>Action</th></tr></thead><tbody>${docs.map(document=>`<tr data-filter-status="${document.status}" data-filter-date="${document.date}"><td><b>${document.name}</b>${document.amount?`<br><small>${document.amount}</small>`:""}</td><td>${document.category}</td><td>${badge(document.status)}</td><td>${document.date}</td><td><button class="mini-btn download-doc">View</button> <button class="mini-btn download-doc">⇩</button></td></tr>`).join("") || `<tr><td colspan="5" class="empty">No documents linked to this client.</td></tr>`}</tbody></table></div></div>`;
}

function bindPage() {
  bindStandardFilters();
  bindDashboardDateFilter();
  bindAiSummaryTyping();
  bindTagInputs();
  bindProfileEditors();
  $("#client-ai-bot-bubble")?.addEventListener("click",()=>{
    clientAiOpen=!clientAiOpen;
    $("#client-ai-bot-panel")?.classList.toggle("open",clientAiOpen);
    $("#client-ai-bot-bubble")?.classList.toggle("active",clientAiOpen);
    if(clientAiOpen)setTimeout(()=>$("#ai-recruiter-input")?.focus(),50);
  });
  $("#client-ai-close")?.addEventListener("click",()=>{
    clientAiOpen=false;
    $("#client-ai-bot-panel")?.classList.remove("open");
    $("#client-ai-bot-bubble")?.classList.remove("active");
  });
  $("#ai-recruiter-form")?.addEventListener("submit",event=>{
    event.preventDefault();
    const input=$("#ai-recruiter-input");
    const text=input.value.trim();
    if(!text)return;
    clientAiOpen=true;
    handleAiRecruiterMessage(text);
    save();render();
  });
  $$("[data-ai-reply]").forEach(button=>button.onclick=()=>{clientAiOpen=true;handleAiRecruiterMessage(button.dataset.aiReply);save();render()});
  $("#ai-generate-job")?.addEventListener("click",()=>{clientAiOpen=true;generateAiRecruiterJob();render();toast("Job generated and Admin notified")});
  $("#ai-edit-jd")?.addEventListener("click",()=>{
    clientAiOpen=true;
    showAiRecruiterDraftEditor();
  });
  $("#ai-new-conversation")?.addEventListener("click",()=>{
    clientAiOpen=true;
    state.clientAiRecruiter={step:"idle",draft:{},messages:[{from:"ai",text:"How may I help you? I can create a job description with you or answer questions about Northstar Systems' hiring activity."}]};
    save();render();
  });
  const aiRecruiterMessages=$("#ai-recruiter-messages");
  if(aiRecruiterMessages)aiRecruiterMessages.scrollTop=aiRecruiterMessages.scrollHeight;
  $$("[data-bulk-upload]").forEach(button=>button.onclick=()=>showBulkUpload(button.dataset.bulkUpload));
  $$("[data-go]").forEach(x=>{
    const openPage=()=>{currentPage=x.dataset.go;filter=x.dataset.viewFilter || "All";render()};
    x.onclick=openPage;
    x.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openPage()}};
  });
  $$("[data-filter]").forEach(x=>x.onclick=()=>{filter=x.dataset.filter;render()});
  $$("[data-interview-view]").forEach(button=>button.onclick=()=>{interviewView=button.dataset.interviewView;render()});
  $("#calendar-prev")?.addEventListener("click",()=>{interviewCalendarDate=new Date(interviewCalendarDate.getFullYear(),interviewCalendarDate.getMonth()-1,1);render()});
  $("#calendar-next")?.addEventListener("click",()=>{interviewCalendarDate=new Date(interviewCalendarDate.getFullYear(),interviewCalendarDate.getMonth()+1,1);render()});
  $("#job-status")?.addEventListener("change",event=>{
    pageFilterState[currentPage]={...(pageFilterState[currentPage]||{}),status:event.target.value==="All statuses"?"All statuses":event.target.value};
    if($("#page-filter-status"))$("#page-filter-status").value=pageFilterState[currentPage].status;
    applyPageFilters();
  });
  $("#candidate-stage")?.addEventListener("change",event=>{
    filter=event.target.value==="All pipeline stages"?"All":event.target.value;
    pageFilterState[currentPage]={...(pageFilterState[currentPage]||{}),status:"All statuses"};
    render();
  });
  $("#new-job")?.addEventListener("click",()=>showJobForm("Permanent"));
  $$(".choose-job").forEach(x=>x.onclick=()=>showJobForm(x.dataset.type));
  $$(".view-job").forEach(x=>x.onclick=()=>showJob(state.jobs.find(j=>j.id===x.dataset.id)));
  $$(".assign-job").forEach(x=>x.onclick=()=>showAssignmentForm(x.dataset.id));
  $$(".clone-job").forEach(x=>x.onclick=()=>{const j=state.jobs.find(j=>j.id===x.dataset.id);state.jobs.unshift({...j,id:nextId("JOB",state.jobs),title:`${j.title} (Copy)`,status:"Draft",assignmentStatus:"Pending",recruiter:"",cv:0,interviews:0,offers:0});addAssignmentNotification({roles:["Admin"],client:j.client,message:`${j.title} (Copy) is awaiting recruiter assignment`});addAssignmentNotification({roles:["Client"],client:j.client,message:`${j.title} (Copy) was created and is pending Admin recruiter assignment`});save();toast("Job cloned as draft and marked Pending");render()});
  $$(".toggle-job").forEach(x=>x.onclick=()=>{
    const j=state.jobs.find(job=>job.id===x.dataset.id);
    const previousStatus=j.status;
    j.status=j.status==="Active"?"On Hold":"Active";
    addAssignmentNotification({roles:["Admin"],recruiter:j.recruiter,client:j.client,message:`${j.title} changed from ${previousStatus} to ${j.status}`});
    addAssignmentNotification({roles:["Recruiter"],recruiter:j.recruiter,client:j.client,message:`${j.title} is now ${j.status}`});
    addAssignmentNotification({roles:["Client"],recruiter:j.recruiter,client:j.client,message:`${j.title} is now ${j.status}`});
    save();toast(`Job marked ${j.status} across linked workspaces`);render();
  });
  $("#new-candidate")?.addEventListener("click",showCandidateForm);
  $("#upload-cv")?.addEventListener("click",()=>showUpload());
  $$(".view-candidate").forEach(x=>x.onclick=()=>showCandidate(state.candidates.find(c=>c.id===x.dataset.id)));
  $$(".move-candidate").forEach(x=>x.onclick=()=>moveCandidate(x.dataset.id));
  $$(".message-candidate").forEach(x=>x.onclick=()=>{activeConversation=x.dataset.id;currentPage="communication";render()});
  $$(".client-review-status").forEach(select=>select.onchange=()=>{
    const candidate=state.candidates.find(item=>item.id===select.dataset.id);
    if(session.role!=="Client"||currentPage!=="cv-review"||!candidate)return;
    candidate.clientReviewStatus=select.value;
    addAssignmentNotification({roles:["Admin"],recruiter:candidate.recruiter,client:candidate.client,message:`Client marked ${candidate.id} as ${select.value} for ${candidate.role}`});
    addAssignmentNotification({roles:["Recruiter"],recruiter:candidate.recruiter,client:candidate.client,message:`${candidate.client} marked ${candidate.id} as ${select.value}`});
    save();render();toast(`Client decision updated to ${select.value}`);
  });
  $$(".last-working-link").forEach(button=>button.onclick=()=>showLeavingReason(button.dataset.id));
  $("#schedule-interview")?.addEventListener("click",showInterviewForm);
  $$(".reschedule-interview").forEach(x=>x.onclick=()=>reschedule(x.dataset.id));
  $$(".feedback-interview").forEach(x=>x.onclick=()=>feedback(x.dataset.id));
  $$(".calendar-event").forEach(x=>x.onclick=()=>feedback(x.dataset.id));
  $("#message-form")?.addEventListener("submit",e=>{
    e.preventDefault();
    const inp=$("#message-input");
    const candidate=state.candidates.find(item=>item.id===activeConversation);
    if(!candidate||!inp.value.trim())return;
    ensureCandidateRecruiterThread(candidate).push({sender:activeUserName(session.role),text:inp.value.trim(),time:"Just now"});
    save();render();toast("Private message sent");
  });
  $("#message-attachment-btn")?.addEventListener("click",()=>$("#message-attachment")?.click());
  $("#message-attachment")?.addEventListener("change",event=>{
    const file=event.target.files?.[0];
    const candidate=state.candidates.find(item=>item.id===activeConversation);
    if(!file||!candidate)return;
    ensureCandidateRecruiterThread(candidate).push({sender:activeUserName(session.role),text:`Attachment shared: ${file.name}`,time:"Just now",attachment:file.name});
    save();render();toast("Attachment added to the private conversation");
  });
  $$(".conversation").forEach(button=>button.onclick=()=>{activeConversation=button.dataset.conversation;render()});
  $("#conversation-search")?.addEventListener("input",event=>{
    const query=event.target.value.trim().toLowerCase();
    $$(".conversation").forEach(item=>item.classList.toggle("filter-hidden",query&&!item.textContent.toLowerCase().includes(query)));
  });
  $("#raise-offer")?.addEventListener("click",showOfferForm);
  $$(".view-offer").forEach(button=>button.onclick=()=>showOfferDetails(button.dataset.id));
  $$(".manage-offer").forEach(button=>button.onclick=()=>showOfferManagement(button.dataset.id));
  $("#accept-offer")?.addEventListener("click",event=>{const candidate=state.candidates.find(item=>item.id===event.currentTarget.dataset.id);if(!candidate)return;candidate.stage="Joined";if(candidate.offer)candidate.offer.status="Accepted";addAssignmentNotification({roles:["Admin","Recruiter","Client"],recruiter:candidate.recruiter,client:candidate.client,message:`${candidate.name} accepted the offer for ${candidate.role}`});save();render();toast("Offer accepted and all workspaces updated")});
  $("#decline-offer")?.addEventListener("click",()=>confirmAction("Decline this offer?","The recruiter will be notified.",()=>{const candidate=roleCandidates("Candidate").find(item=>item.stage==="Offered");if(candidate){candidate.stage="Client Review";if(candidate.offer)candidate.offer.status="Declined";addAssignmentNotification({roles:["Admin","Recruiter","Client"],recruiter:candidate.recruiter,client:candidate.client,message:`${candidate.name} declined the offer for ${candidate.role}`});save();render()}toast("Offer declined")}));
  $("#download-offer")?.addEventListener("click",()=>{const candidate=roleCandidates("Candidate").find(item=>["Offered","Joined"].includes(item.stage));if(candidate)downloadCsv("offer-details.csv",[["Role","Company","Compensation"],[candidate.role,candidate.client,candidate.ctc]])});
  $("#new-user")?.addEventListener("click",showUserForm);
  $$(".edit-user").forEach(x=>x.onclick=()=>showUserForm(state.users[+x.dataset.i],+x.dataset.i));
  $$(".manage-permissions").forEach(button=>button.onclick=()=>showUserPermissions(state.users[+button.dataset.i]));
  $("#new-client")?.addEventListener("click",showClientForm);
  $$(".view-client").forEach(button=>button.onclick=()=>showClientAccount(button.dataset));
  $$(".client-menu").forEach(button=>button.onclick=()=>genericForm(`Manage ${button.dataset.client}`,["Account status","Account owner","Internal notes"],"Client account updated"));
  $("#new-campaign")?.addEventListener("click",showCampaignForm);
  $("#ai-source-form")?.addEventListener("submit",event=>{event.preventDefault();runAiSourcing()});
  $("#run-ai-source")?.addEventListener("click",()=>runAiSourcing());
  $$("[data-ai-view]").forEach(button=>button.onclick=()=>{aiSourcingView=button.dataset.aiView;render()});
  $("#clear-ai-source")?.addEventListener("click",()=>{state.aiSourcingResults=state.externalTalent.slice(0,20).map(profile=>profile.id);render();toast("AI sourcing filters cleared")});
  $$(".view-external-profile").forEach(button=>button.onclick=()=>showExternalProfile(button.dataset.id));
  $$(".import-external-profile").forEach(button=>button.onclick=()=>showPipelineAssignment(button.dataset.id));
  $$(".configure-integration").forEach(button=>button.onclick=()=>showIntegrationForm(button.dataset.id));
  $$(".test-integration").forEach(button=>button.onclick=()=>{const item=state.integrations.find(integration=>integration.id===button.dataset.id);item.lastSync="Just now";save();render();toast(`${item.name} connection test successful`)});
  $$(".toggle-integration").forEach(input=>input.onchange=()=>{const item=state.integrations.find(integration=>integration.id===input.dataset.id);item.enabled=input.checked;save();render();toast(`${item.name} ${item.enabled?"enabled":"disabled"} for AI Sourcing`)});
  $("#add-integration")?.addEventListener("click",()=>showIntegrationForm());
  $("#new-lead")?.addEventListener("click",showLeadForm);
  $("#upload-document")?.addEventListener("click",showDocumentForm);
  $$(".move-lead").forEach(x=>x.onclick=()=>{const l=state.leads.find(a=>a.company===x.dataset.company);const stages=["New","Qualified","Proposal","Negotiation"];l.stage=stages[(stages.indexOf(l.stage)+1)%stages.length];save();render();toast(`Lead moved to ${l.stage}`)});
  $("#export-btn")?.addEventListener("click",()=>downloadCsv("gnext-export.csv",[["Job ID","Title","Type","Client","Status"],...state.jobs.map(j=>[j.id,j.title,j.type,j.client,j.status])]));
  $("#save-settings")?.addEventListener("click",()=>toast("Settings saved"));
  $$(".edit-master").forEach(x=>x.onclick=()=>genericForm(`Configure ${x.dataset.name}`,["Item 1","Item 2","Item 3"],"Workflow master updated"));
  $("#save-profile")?.addEventListener("click",()=>{
    const form=$("#profile-form");if(!form.reportValidity())return;
    const updated=Object.fromEntries(new FormData(form));
    const educationEntries=normalizeEducationEntries(collectProfileEntries("education"));
    const experienceEntries=collectProfileEntries("experience");
    if(educationEntries.some(entry=>["degree","year","university"].some(key=>!profileFieldComplete(entry[key])))){toast("Complete Graduation, HSC, and SSC education details");return}
    if(!experienceEntries.length){toast("Add at least one experience entry");return}
    const gap=detectExperienceGaps(experienceEntries);
    if(gap.invalid.length){toast("Correct employment dates where the end month is before the start month");return}
    if(updated.notice==="Immediate"&&!updated.lastWorkingDay){toast("Add your last working day for Immediate availability");$("#last-working-day-wrap input")?.focus();return}
    updated.experienceGapReasons=gap.hasGap?collectExperienceGapReasons(gap.gaps):[];
    if(gap.hasGap&&updated.experienceGapReasons.some(item=>!profileFieldComplete(item.reason))){toast("Add a separate reason for each detected experience gap");$("[data-gap-reason-key]")?.focus();return}
    updated.currentFixed=Number(updated.currentFixed);
    updated.currentVariable=Number(updated.currentVariable);
    updated.expectedCtc=Number(updated.expectedCtc);
    updated.lastWorkingDay=updated.notice==="Immediate"?updated.lastWorkingDay:"";
    updated.educationEntries=educationEntries;
    updated.experienceEntries=experienceEntries;
    updated.experienceGapReason="";
    updated.location=[updated.locality,updated.city,updated.state].filter(Boolean).join(", ");
    updated.completion=profileCompletionPercent(updated);
    const candidate=profileCandidateRecord();
    const previousCandidateName=candidate?.name||state.profile.name;
    const previousCandidateEmail=candidate?.email||state.profile.email;
    Object.assign(state.profile,updated);
    if(candidate)state.profile.candidateId=candidate.id;
    const currentTotal=updated.currentFixed+updated.currentVariable;
    if(candidate)Object.assign(candidate,{name:updated.name,email:updated.email,phone:updated.phone,location:updated.location,state:updated.state,city:updated.city,locality:updated.locality,notice:updated.notice,lastWorkingDay:updated.lastWorkingDay,lastWorkingDate:updated.lastWorkingDay||lastWorkingDateFromNotice(updated.notice),reasonForLeaving:updated.experienceEntries[0]?.reasonForLeaving||candidate.reasonForLeaving,skills:updated.skills,experienceEntries:updated.experienceEntries,experienceGapReasons:updated.experienceGapReasons,experienceGapReason:"",educationEntries:updated.educationEntries,summary:`${updated.experienceEntries[0]?.designation||candidate.role} experienced in ${updated.skills}.`,ctc:`₹${currentTotal.toFixed(2).replace(/\.00$/,"")} LPA`});
    const user=state.users.find(item=>item.email===previousCandidateEmail||item.name===previousCandidateName||item.email===roles.Candidate.email);
    if(user)Object.assign(user,{name:updated.name,email:updated.email});
    save();render();toast("Profile updated across all linked workspaces");
  });
  $$(".download-doc").forEach(x=>x.onclick=()=>toast("Document opened in preview"));
  $$(".view-application").forEach(x=>x.onclick=()=>showCandidate(state.candidates.find(candidate=>candidate.id===x.dataset.id)));
  applyPageFilters();
}
function bindAiSummaryTyping(){
  if(currentPage!=="dashboard")return;
  const items=$$(".ai-summary-text");
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  let delay=120;
  items.forEach(item=>{
    const text=item.dataset.summaryText||"";
    const cursor=$(".typing-cursor",item);
    if(reduced){
      item.textContent=text;
      return;
    }
    setTimeout(()=>{
      let index=0;
      const type=()=>{
        if(!item.isConnected)return;
        if(cursor)cursor.remove();
        item.textContent=text.slice(0,index);
        if(index<text.length){
          item.insertAdjacentHTML("beforeend",`<span class="typing-cursor"></span>`);
          index++;
          setTimeout(type,12);
        }else{
          item.classList.add("typed");
        }
      };
      type();
    },delay);
    delay+=Math.min(900,220+text.length*12);
  });
}
function collectProfileEntries(type){
  return $$(`.${type}-entry`).map(entry=>Object.fromEntries($$(`[data-${type}-field]`,entry).map(input=>[input.dataset[`${type}Field`],input.value.trim()]))).filter(entry=>Object.values(entry).some(Boolean));
}
function monthIndex(value){
  if(!/^\d{4}-\d{2}$/.test(value||""))return null;
  const [year,month]=value.split("-").map(Number);
  return year*12+month-1;
}
function monthYearFromIndex(index){
  if(!Number.isFinite(index))return "";
  const year=Math.floor(index/12);
  const month=index%12+1;
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month-1]}-${year}`;
}
function detectExperienceGaps(entries=collectProfileEntries("experience")){
  const periods=entries.map((entry,index)=>({...entry,index,start:monthIndex(entry.startMonth),end:monthIndex(entry.endMonth)})).filter(entry=>entry.start!==null&&entry.end!==null).sort((a,b)=>a.start-b.start);
  const invalid=periods.filter(entry=>entry.end<entry.start);
  const gaps=[];
  const validPeriods=periods.filter(entry=>entry.end>=entry.start);
  let coverage=validPeriods[0];
  for(let index=1;index<validPeriods.length;index++){
    const current=validPeriods[index];
    const months=current.start-coverage.end-1;
    if(months>0){
      gaps.push({
      months,
      from:monthYearFromIndex(coverage.end+1),
      to:monthYearFromIndex(current.start-1),
      previousCompany:coverage.company||"Previous company",
      nextCompany:current.company||"Next company"
      });
      coverage=current;
    }else if(current.end>coverage.end){
      coverage=current;
    }
  }
  return {hasGap:gaps.length>0,gaps,invalid};
}
function gapReasonKey(gap={}){
  return [gap.from,gap.to,gap.previousCompany,gap.nextCompany].map(value=>String(value||"").trim().toLowerCase()).join("|");
}
function normalizeGapReasons(profile={},gaps=[]){
  const existing=Array.isArray(profile.experienceGapReasons)?profile.experienceGapReasons:[];
  return gaps.map((gap,index)=>{
    const key=gapReasonKey(gap);
    const match=existing.find(item=>item.key===key);
    return {...gap,key,reason:match?.reason||(!existing.length&&index===0?profile.experienceGapReason||"":"")};
  });
}
function collectExperienceGapReasons(gaps=[]){
  const fields=$$("[data-gap-reason-key]");
  return gaps.map(gap=>{
    const key=gapReasonKey(gap);
    const input=fields.find(field=>field.dataset.gapReasonKey===key);
    return {...gap,key,reason:(input?.value||"").trim()};
  });
}
function gapReasonsComplete(profile={},gapResult=detectExperienceGaps(profile.experienceEntries||[])){
  if(!gapResult.hasGap)return true;
  return normalizeGapReasons(profile,gapResult.gaps).every(item=>profileFieldComplete(item.reason));
}
function profileFieldComplete(value){
  return value!==undefined&&value!==null&&String(value).trim()!=="";
}
function profileCompletionPercent(profile){
  const education=Array.isArray(profile.educationEntries)?profile.educationEntries:[];
  const experience=Array.isArray(profile.experienceEntries)?profile.experienceEntries:[];
  const gap=detectExperienceGaps(experience);
  const educationComplete=education.length===EDUCATION_LEVELS.length&&education.every(entry=>["degree","year","university"].every(key=>profileFieldComplete(entry[key])));
  const experienceComplete=experience.length>0&&experience.every(entry=>["company","designation","startMonth","endMonth","reasonForLeaving"].every(key=>profileFieldComplete(entry[key])))&&!gap.invalid.length;
  const checks=[
    profileFieldComplete(profile.name),
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(profile.email||"")),
    profileFieldComplete(profile.phone),
    profileFieldComplete(profile.state),
    profileFieldComplete(profile.city),
    profileFieldComplete(profile.locality),
    profileFieldComplete(profile.currentFixed),
    profileFieldComplete(profile.currentVariable),
    profileFieldComplete(profile.expectedCtc),
    profileFieldComplete(profile.notice),
    profile.notice!=="Immediate"||profileFieldComplete(profile.lastWorkingDay),
    String(profile.skills||"").split(",").some(skill=>skill.trim()),
    educationComplete,
    experienceComplete,
    gapReasonsComplete(profile,gap)
  ];
  return Math.round(checks.filter(Boolean).length/checks.length*100);
}
function profileFormSnapshot(){
  const form=$("#profile-form");
  if(!form)return state.profile;
  const data=Object.fromEntries(new FormData(form));
  data.location=[data.locality,data.city,data.state].filter(Boolean).join(", ");
  data.educationEntries=normalizeEducationEntries(collectProfileEntries("education"));
  data.experienceEntries=collectProfileEntries("experience");
  data.lastWorkingDay=data.notice==="Immediate"?(data.lastWorkingDay||""):"";
  const gap=detectExperienceGaps(data.experienceEntries);
  data.experienceGapReasons=gap.hasGap?collectExperienceGapReasons(gap.gaps):[];
  data.experienceGapReason="";
  return data;
}
function updateProfileCompletionUI(){
  const data=profileFormSnapshot();
  const completion=profileCompletionPercent(data);
  const value=$("#profile-completion-value");
  const bar=$("#profile-completion-bar");
  const barValue=$("#profile-completion-bar-value");
  const message=$("#profile-completion-message");
  const download=$("#download-profile-cv");
  if(value)value.textContent=`${completion}%`;
  if(bar)bar.style.width=`${completion}%`;
  if(barValue){barValue.textContent=`${completion}%`;barValue.style.left=`clamp(25px,${completion}%,calc(100% - 25px))`}
  if(message)message.textContent=completion===100?"Your custom CV is ready.":"Complete your profile to get a custom CV";
  if(download)download.hidden=completion!==100;
  $("#profile-completion-card")?.classList.toggle("complete",completion===100);
  return {data,completion};
}
function cvMonth(value){
  if(!/^\d{4}-\d{2}$/.test(value||""))return value||"";
  const [year,month]=value.split("-").map(Number);
  return new Date(year,month-1,1).toLocaleDateString("en-IN",{month:"short",year:"numeric"});
}
function experienceTenure(entry={}){
  const start=monthIndex(entry.startMonth);
  const end=monthIndex(entry.endMonth);
  if(start===null||end===null||end<start)return "Tenure not available";
  const months=end-start+1;
  const years=Math.floor(months/12);
  const rest=months%12;
  return [years?`${years} yr${years>1?"s":""}`:"",rest?`${rest} mo${rest>1?"s":""}`:""].filter(Boolean).join(" ")||"Less than 1 month";
}
function experienceGapResumeNote(profile={}){
  const result=detectExperienceGaps(profile.experienceEntries||[]);
  if(!result.hasGap)return "";
  const reasons=normalizeGapReasons(profile,result.gaps);
  return `<div class="resume-gap-note"><b>Employment gap reasons</b>${reasons.map((gap,index)=>`<article><p><b>Gap ${index+1}:</b> ${gap.months} month${gap.months>1?"s":""} from ${esc(gap.from)} to ${esc(gap.to)}, between ${esc(gap.previousCompany)} and ${esc(gap.nextCompany)}.</p><strong>${esc(gap.reason||"Reason not shared yet.")}</strong></article>`).join("")}</div>`;
}
function latestLeavingReasons(candidate){
  const entries=(candidate.experienceEntries||[])
    .map((entry,index)=>({...entry,index,endIndex:monthIndex(entry.endMonth),startIndex:monthIndex(entry.startMonth)}))
    .filter(entry=>entry.company||entry.designation||entry.reasonForLeaving)
    .sort((a,b)=>(b.endIndex??b.startIndex??-1)-(a.endIndex??a.startIndex??-1))
    .slice(0,3);
  if(entries.length)return entries;
  return [{company:candidate.client||"Previous employer",designation:candidate.role||"Role not specified",startMonth:"",endMonth:"",reasonForLeaving:candidate.reasonForLeaving||"Reason not shared yet."}];
}
function pdfSafeText(value){
  return String(value??"").replace(/[^\x20-\x7E]/g,char=>({
    "₹":"INR ","–":"-","—":"-","’":"'","“":'"',"”":'"',"•":"-"
  }[char]||" "));
}
function wrapPdfText(text,max=88){
  const words=pdfSafeText(text).split(/\s+/).filter(Boolean);
  const lines=[];let line="";
  words.forEach(word=>{
    const next=line?`${line} ${word}`:word;
    if(next.length>max&&line){lines.push(line);line=word}else line=next;
  });
  if(line)lines.push(line);
  return lines.length?lines:[""];
}
function buildProfilePdf(profile){
  const pages=[];
  let page=[],y=790;
  const newPage=()=>{if(page.length)pages.push(page.join("\n"));page=[];y=790};
  const escPdf=text=>pdfSafeText(text).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");
  const line=(text,{size=10,bold=false,indent=0,leading=15,spaceAfter=0}={})=>{
    const max=Math.max(28,Math.floor((505-indent)/(size*.52)));
    wrapPdfText(text,max).forEach(part=>{
      if(y<58)newPage();
      page.push(`BT /${bold?"F2":"F1"} ${size} Tf 1 0 0 1 ${50+indent} ${y} Tm (${escPdf(part)}) Tj ET`);
      y-=leading;
    });
    y-=spaceAfter;
  };
  const rule=()=>{if(y<58)newPage();page.push(`0.65 w 50 ${y} m 545 ${y} l S`);y-=16};
  const heading=text=>{y-=4;line(text.toUpperCase(),{size:11,bold:true,leading:17,spaceAfter:2})};
  line(profile.name||"Candidate",{size:22,bold:true,leading:27});
  line([profile.email,profile.phone,profile.location].filter(Boolean).join(" | "),{size:9,leading:14,spaceAfter:4});
  rule();
  heading("Professional Profile");
  const months=(profile.experienceEntries||[]).map(item=>monthIndex(item.endMonth)-monthIndex(item.startMonth)+1).filter(Number.isFinite).reduce((sum,value)=>sum+Math.max(0,value),0);
  line(profile.summary||`${profile.experienceEntries?.[0]?.designation||profile.role||"Professional"} with ${months?`${Math.max(1,Math.floor(months/12))}+ years of experience`:"relevant professional experience"}. Core skills include ${profile.skills||"skills listed below"}.`);
  heading("Skills");
  line(profile.skills||"Not provided");
  heading("Professional Experience");
  (profile.experienceEntries||[]).forEach(entry=>{
    line(`${entry.designation} | ${entry.company}`,{bold:true,leading:15});
    line(`${cvMonth(entry.startMonth)} - ${cvMonth(entry.endMonth)} | Duration: ${experienceTenure(entry)}`,{size:9,leading:15,spaceAfter:1});
    line(`Reason for leaving: ${entry.reasonForLeaving||profile.reasonForLeaving||"Reason not shared yet."}`,{size:9,leading:14,spaceAfter:3});
  });
  normalizeGapReasons(profile,detectExperienceGaps(profile.experienceEntries||[]).gaps).forEach((gap,index)=>{
    line(`Employment gap ${index+1}: ${gap.months} month${gap.months>1?"s":""} from ${gap.from} to ${gap.to}, between ${gap.previousCompany} and ${gap.nextCompany}.`,{size:9,leading:14,spaceAfter:1});
    line(`Gap reason: ${gap.reason||"Reason not shared yet."}`,{size:9,leading:14,spaceAfter:3});
  });
  heading("Education");
  (normalizeEducationEntries(profile.educationEntries)||[]).forEach(entry=>line([entry.level,entry.degree,entry.year,entry.university].filter(Boolean).join(" | "),{bold:true,spaceAfter:3}));
  if(profile.currentFixed!==undefined||profile.ctc||profile.expectedCtc!==undefined){
    heading("Compensation");
    if(profile.currentFixed!==undefined)line(`Current CTC: Fixed INR ${profile.currentFixed} LPA | Variable INR ${profile.currentVariable||0} LPA`);
    else if(profile.ctc)line(`Current CTC / rate: ${profile.ctc}`);
    if(profile.expectedCtc!==undefined)line(`Expected CTC: INR ${profile.expectedCtc} LPA`);
  }
  heading("Availability");
  line(`Notice period: ${profile.notice||profile.availability||"Not provided"}${profile.notice==="Immediate"&&profile.lastWorkingDay?` | Last working day: ${profile.lastWorkingDay}`:""}`);
  y-=12;rule();
  line(`Generated from ${BRAND_NAME} Candidate Profile`,{size:8,leading:12});
  newPage();

  const objects=[null,
    "<< /Type /Catalog /Pages 2 0 R >>",
    "",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
  ];
  const kids=[];
  pages.forEach(content=>{
    const pageId=objects.length,contentId=pageId+1;
    kids.push(`${pageId} 0 R`);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
    objects.push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  });
  objects[2]=`<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${kids.length} >>`;
  let pdf="%PDF-1.4\n";
  const offsets=[0];
  for(let id=1;id<objects.length;id++){offsets[id]=pdf.length;pdf+=`${id} 0 obj\n${objects[id]}\nendobj\n`}
  const xref=pdf.length;
  pdf+=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for(let id=1;id<objects.length;id++)pdf+=`${String(offsets[id]).padStart(10,"0")} 00000 n \n`;
  pdf+=`trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf],{type:"application/pdf"});
}
function downloadProfileCv(profile){
  const blob=buildProfilePdf(profile);
  const link=document.createElement("a");
  const filename=`${String(profile.name||"candidate").trim().replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"")}-G-NEXT-CV.pdf`;
  link.href=URL.createObjectURL(blob);
  link.download=filename;
  document.body.appendChild(link);
  link.click();
  const url=link.href;
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  toast("Print-ready CV downloaded");
}
function viewResumePdf(profile,{visible=true}={}){
  const pdfProfile={...profile};
  if(!visible){
    pdfProfile.name="Protected candidate";
    pdfProfile.email="Hidden until shortlisted";
    pdfProfile.phone="Hidden until shortlisted";
  }
  const blob=buildProfilePdf(pdfProfile);
  const url=URL.createObjectURL(blob);
  const opened=window.open(url,"_blank");
  if(!opened){
    const link=document.createElement("a");
    link.href=url;
    link.target="_blank";
    link.rel="noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  setTimeout(()=>URL.revokeObjectURL(url),60000);
}
function refreshProfileEntryLabels(type){
  $$(`.${type}-entry`).forEach((entry,index)=>{
    entry.dataset.entryIndex=index;
    const title=$(".profile-entry-head b",entry);
    if(title)title.textContent=type==="education"?(EDUCATION_LEVELS[index]||`Education ${index+1}`):`Employment ${index+1}`;
  });
}
function updateExperienceGapState(){
  const box=$("#experience-gap-box");
  if(!box)return;
  const result=detectExperienceGaps();
  $$(".experience-entry").forEach(entry=>entry.classList.remove("entry-invalid"));
  result.invalid.forEach(item=>$$(".experience-entry")[item.index]?.classList.add("entry-invalid"));
  const message=$("#experience-gap-message");
  const reasonList=$("#experience-gap-reason-list");
  if(result.invalid.length){
    box.classList.add("show","error");
    message.textContent="An end month is earlier than its start month. Correct the highlighted employment entry.";
    if(reasonList)reasonList.innerHTML="";
  }else if(result.hasGap){
    box.classList.add("show");
    box.classList.remove("error");
    message.innerHTML=result.gaps.map(gap=>`<span>A <b>${gap.months}-month employment gap</b> was detected from <b>${gap.from}</b> to <b>${gap.to}</b>, between <b>${esc(gap.previousCompany)}</b> and <b>${esc(gap.nextCompany)}</b>.</span>`).join("");
    if(reasonList){
      const saved=normalizeGapReasons(profileFormSnapshot(),result.gaps);
      reasonList.innerHTML=saved.map((gap,index)=>`<div class="field gap-reason-field"><label>Reason for gap ${index+1}: ${esc(gap.from)} to ${esc(gap.to)}</label><textarea data-gap-reason-key="${esc(gap.key)}" placeholder="Explain the gap between ${esc(gap.previousCompany)} and ${esc(gap.nextCompany)}" required>${esc(gap.reason||"")}</textarea></div>`).join("");
    }
  }else{
    box.classList.remove("show","error");
    message.textContent="";
    if(reasonList)reasonList.innerHTML="";
  }
}
function updateProfileCityOptions({clearInvalid=false}={}){
  const stateSelect=$("#profile-state");
  const cityInput=$("#profile-city");
  const list=$("#profile-city-options");
  if(!stateSelect||!cityInput||!list)return;
  const cities=APP_OPTIONS.locationsByState[stateSelect.value]||APP_OPTIONS.cities;
  list.innerHTML=cities.map(city=>`<option value="${esc(city)}"></option>`).join("");
  if(clearInvalid&&cityInput.value&&!cities.includes(cityInput.value))cityInput.value="";
}
function bindProfileEditors(){
  const form=$("#profile-form");
  if(!form)return;
  const profileState=$("#profile-state");
  const profileCity=$("#profile-city");
  profileState?.addEventListener("change",()=>{updateProfileCityOptions({clearInvalid:true});updateProfileCompletionUI()});
  profileCity?.addEventListener("input",()=>{
    const matchedState=profileStateForCity(profileCity.value);
    if(matchedState&&profileState?.value!==matchedState){
      profileState.value=matchedState;
      updateProfileCityOptions();
    }
  });
  updateProfileCityOptions();
  const notice=$('[name="notice"]',form);
  const lastWorkingWrap=$("#last-working-day-wrap");
  const updateAvailability=()=>{
    const immediate=notice?.value==="Immediate";
    lastWorkingWrap?.classList.toggle("show",immediate);
    lastWorkingWrap?.classList.toggle("immediate-required",immediate);
    const input=$('[name="lastWorkingDay"]',form);
    if(input)input.required=immediate;
    updateProfileCompletionUI();
  };
  notice?.addEventListener("change",updateAvailability);
  updateAvailability();
  $("#add-education")?.addEventListener("click",()=>{
    $("#education-list").insertAdjacentHTML("beforeend",educationEntry({},$$(".education-entry").length));
    refreshProfileEntryLabels("education");
    updateProfileCompletionUI();
  });
  $("#add-experience")?.addEventListener("click",()=>{
    $("#experience-list").insertAdjacentHTML("beforeend",experienceEntry({},$$(".experience-entry").length));
    refreshProfileEntryLabels("experience");
    updateProfileCompletionUI();
  });
  form.addEventListener("click",event=>{
    const educationRemove=event.target.closest(".remove-education");
    const experienceRemove=event.target.closest(".remove-experience");
    if(educationRemove){
      if($$(".education-entry").length===1){toast("Keep at least one education entry");return}
      educationRemove.closest(".education-entry").remove();refreshProfileEntryLabels("education");updateProfileCompletionUI();
    }
    if(experienceRemove){
      if($$(".experience-entry").length===1){toast("Keep at least one experience entry");return}
      experienceRemove.closest(".experience-entry").remove();refreshProfileEntryLabels("experience");updateExperienceGapState();updateProfileCompletionUI();
    }
  });
  form.addEventListener("input",updateProfileCompletionUI);
  form.addEventListener("change",event=>{
    if(event.target.matches('[data-experience-field="startMonth"],[data-experience-field="endMonth"]'))updateExperienceGapState();
    updateProfileCompletionUI();
  });
  $("#download-profile-cv")?.addEventListener("click",()=>{
    const {data,completion}=updateProfileCompletionUI();
    if(completion!==100){toast("Complete all profile details to unlock your CV");return}
    downloadProfileCv(data);
  });
  updateExperienceGapState();
  updateProfileCompletionUI();
}
function bindDashboardDateFilter(){
  if(currentPage!=="dashboard")return;
  $("#dashboard-date-preset")?.addEventListener("change",event=>{
    const preset=event.target.value;
    if(preset==="Custom dates"){
      pageFilterState[dashboardFilterKey(session.role)]={...(dashboardDateState(session.role)),preset:""};
      $("#dashboard-date-from")?.focus();
      return;
    }
    if(preset==="All time"){
      pageFilterState[dashboardFilterKey(session.role)]={};
      render();toast("Showing all dashboard dates");
      return;
    }
    pageFilterState[dashboardFilterKey(session.role)]=dashboardPresetRange(preset);
    render();toast(`${preset} dashboard filter applied`);
  });
  const applyCustomDashboardDates=()=>{
    const dateFrom=$("#dashboard-date-from")?.value||"";
    const dateTo=$("#dashboard-date-to")?.value||"";
    if(dateFrom&&dateTo&&dateFrom>dateTo){toast("From date must be before To date");return}
    pageFilterState[dashboardFilterKey(session.role)]={dateFrom,dateTo,preset:""};
    render();
    toast(dateFrom||dateTo?"Dashboard date filter applied":"Showing all dashboard dates");
  };
  $("#dashboard-date-from")?.addEventListener("change",applyCustomDashboardDates);
  $("#dashboard-date-to")?.addEventListener("change",applyCustomDashboardDates);
  $("#clear-dashboard-date")?.addEventListener("click",()=>{
    pageFilterState[dashboardFilterKey(session.role)]={};
    render();toast("Dashboard date filter cleared");
  });
}

function pageFilterTargets() {
  const selectors = {
    "job-type": ".grid-equal > .card",
    jobs: ".table-wrap tbody tr",
    "cv-review": ".table-wrap tbody tr",
    sourcing: ".table-wrap tbody tr",
    candidates: ".table-wrap tbody tr",
    interviews: interviewView==="Calendar"?".calendar-event":".table-wrap tbody tr",
    "ai-interview": interviewView==="Calendar"?".calendar-event":".table-wrap tbody tr",
    communication: ".conversation",
    offers: session.role==="Candidate"?".content > .card.panel":".table-wrap tbody tr",
    users: ".table-wrap tbody tr",
    clients: ".job-card-grid > .job-card",
    "ai-sourcing": ".ai-match-row, .card.panel table tbody tr",
    leads: ".kanban-card",
    reports: ".table-wrap tbody tr",
    settings: ".form-card .field, .grid-2 > .card.panel > div",
    profile: ".form-card .field",
    applications: ".job-card-grid > .job-card",
    documents: ".table-wrap tbody tr"
  };
  return $$(selectors[currentPage]||".table-wrap tbody tr, .job-card");
}
function bindStandardFilters() {
  if(currentPage==="dashboard") return;
  const update=()=>{
    pageFilterState[currentPage]={
      search:$("#page-filter-search")?.value||"",
      type:$("#page-filter-type")?.value||"All types",
      status:$("#page-filter-status")?.value||"All statuses",
      owner:$("#page-filter-owner")?.value||"All owners",
      date:$("#page-filter-date")?.value||"Any date",
      dateFrom:$("#page-filter-date-from")?.value||"",
      dateTo:$("#page-filter-date-to")?.value||""
    };
    $("#custom-date-range")?.classList.toggle("show",pageFilterState[currentPage].date==="Custom date");
    applyPageFilters();
  };
  $("#page-filter-search")?.addEventListener("input",update);
  ["#page-filter-type","#page-filter-status","#page-filter-owner","#page-filter-date","#page-filter-date-from","#page-filter-date-to"].forEach(selector=>$(selector)?.addEventListener("change",update));
  $("#clear-page-filters")?.addEventListener("click",()=>{
    pageFilterState[currentPage]={};
    ["#page-filter-search"].forEach(selector=>{if($(selector))$(selector).value=""});
    if($("#page-filter-type"))$("#page-filter-type").value="All types";
    if($("#page-filter-status"))$("#page-filter-status").value="All statuses";
    if($("#page-filter-owner"))$("#page-filter-owner").value="All owners";
    if($("#page-filter-date"))$("#page-filter-date").value="Any date";
    if($("#page-filter-date-from"))$("#page-filter-date-from").value="";
    if($("#page-filter-date-to"))$("#page-filter-date-to").value="";
    $("#custom-date-range")?.classList.remove("show");
    applyPageFilters();
  });
}
function applyPageFilters() {
  if(currentPage==="dashboard") return;
  const stateForPage=pageFilterState[currentPage]||{};
  const search=(stateForPage.search||"").trim().toLowerCase();
  const type=stateForPage.type||"All types";
  const status=stateForPage.status||"All statuses";
  const owner=stateForPage.owner||"All owners";
  const date=stateForPage.date||"Any date";
  const dateFrom=stateForPage.dateFrom||"";
  const dateTo=stateForPage.dateTo||"";
  const targets=pageFilterTargets();
  const normalize=value=>String(value||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  const exactTextMatch=(text,value)=>{
    const needle=normalize(value);
    if(!needle) return true;
    return ` ${normalize(text)} `.includes(` ${needle} `);
  };
  const parseFilterDate=value=>{
    const raw=String(value||"").trim();
    if(!raw) return null;
    if(/^\d{4}-\d{2}-\d{2}$/.test(raw)) return new Date(`${raw}T00:00:00`);
    const normalized=raw.replace(/\bToday\b/i,new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}));
    const match=normalized.match(/(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/);
    if(match) return new Date(`${match[1]} ${match[2]} ${match[3]} 00:00:00`);
    const parsed=new Date(normalized);
    return Number.isNaN(parsed.getTime())?null:parsed;
  };
  let visible=0;
  targets.forEach(target=>{
    const controlValues=$$("input, select, textarea",target).map(control=>control.value).join(" ");
    const text=`${target.textContent} ${controlValues}`.toLowerCase();
    const matchesSearch=!search||text.includes(search);
    const matchesType=type==="All types"||exactTextMatch(target.dataset.filterType||text,type);
    const matchesStatus=status==="All statuses"||exactTextMatch(target.dataset.filterStatus||text,status);
    const matchesOwner=owner==="All owners"||exactTextMatch(target.dataset.filterOwner||text,owner);
    const dateText=normalize(target.dataset.filterDate||text);
    const recordDate=parseFilterDate(target.dataset.filterDate||text);
    const fromDate=parseFilterDate(dateFrom);
    const toDate=parseFilterDate(dateTo);
    if(toDate)toDate.setHours(23,59,59,999);
    const today=new Date();
    const todayStart=new Date(today.getFullYear(),today.getMonth(),today.getDate());
    const todayEnd=new Date(todayStart);todayEnd.setHours(23,59,59,999);
    const last30Start=new Date(todayStart);last30Start.setDate(last30Start.getDate()-29);
    const matchesDate=date==="Any date"||
      (date==="Today"&&recordDate&&recordDate>=todayStart&&recordDate<=todayEnd)||
      (date==="June 2026"&&(/jun 2026|june 2026/.test(dateText)))||
      (date==="Last 30 days"&&recordDate&&recordDate>=last30Start&&recordDate<=todayEnd)||
      (date==="Custom date"&&recordDate&&(!fromDate||recordDate>=fromDate)&&(!toDate||recordDate<=toDate));
    const show=matchesSearch&&matchesType&&matchesStatus&&matchesOwner&&matchesDate;
    target.classList.toggle("filter-hidden",!show);
    if(show)visible++;
  });
  const count=$("#filter-result-count");
  if(count)count.textContent=targets.length?`${visible} of ${targets.length}`:"No filterable records";
  const empty=$("#filter-empty-message");
  if(empty)empty.classList.toggle("show",targets.length>0&&visible===0);
}

function modal(title, body, foot="") {
  $("#modal-root").innerHTML=`<div class="modal-backdrop"><div class="modal"><div class="modal-head"><h2>${title}</h2><button class="modal-close">×</button></div><div class="modal-body">${body}</div>${foot?`<div class="modal-foot">${foot}</div>`:""}</div></div>`;
  $(".modal-close").onclick=closeModal; $(".modal-backdrop").onclick=e=>{if(e.target===e.currentTarget)closeModal()};
}
function closeModal(){ $("#modal-root").innerHTML=""; }
function bindTagInputs() {
  $$("[data-tag-input]").forEach(wrapper=>{
    const entry=$(".tag-entry",wrapper);
    const list=$(".tag-list",wrapper);
    const hidden=$('input[type="hidden"]',wrapper);
    let tags=hidden.value.split(",").map(value=>value.trim()).filter(Boolean);
    const sync=()=>{
      hidden.value=tags.join(", ");
      hidden.setCustomValidity(tags.length?"":"Add at least one skill");
      hidden.dispatchEvent(new Event("input",{bubbles:true}));
      list.innerHTML=tags.map(value=>`<span class="skill-tag">${esc(value)}<button type="button" data-remove-tag="${esc(value)}" aria-label="Remove ${esc(value)}">×</button></span>`).join("");
      $$("[data-remove-tag]",list).forEach(button=>button.onclick=()=>{
        tags=tags.filter(value=>value!==button.dataset.removeTag);
        sync();
        entry.focus();
      });
    };
    const addTag=()=>{
      const values=entry.value.split(",").map(value=>value.trim()).filter(Boolean);
      values.forEach(value=>{if(!tags.some(tag=>tag.toLowerCase()===value.toLowerCase()))tags.push(value)});
      entry.value="";
      sync();
    };
    entry.addEventListener("keydown",event=>{
      if(event.key==="Enter"||event.key===","){event.preventDefault();addTag()}
      if(event.key==="Backspace"&&!entry.value&&tags.length){tags.pop();sync()}
    });
    entry.addEventListener("change",addTag);
    wrapper.addEventListener("click",()=>entry.focus());
    sync();
  });
}
function fields(arr) {
  const cities=["Ahmedabad","Bengaluru","Bhopal","Bhubaneswar","Chandigarh","Chennai","Coimbatore","Delhi","Delhi NCR","Gurugram","Hyderabad","Indore","Jaipur","Kochi","Kolkata","Lucknow","Mumbai","Mysuru","Nagpur","Noida","Pune","Surat","Thiruvananthapuram","Vadodara","Visakhapatnam","Remote"];
  const skills=["Java","Spring Boot","Microservices","Python","Django","JavaScript","TypeScript","React","Angular","Vue.js","Node.js","AWS","Azure","Google Cloud","Docker","Kubernetes","Terraform","SQL","PostgreSQL","MongoDB","Spark","Kafka","Databricks","Figma","UX Research","Product Strategy","Agile","Scrum","Selenium","API Testing","Cybersecurity","Data Analytics","Power BI","Tableau"];
  const controls = arr.map((x, i) => {
    const name = x.name || `field${i}`;
    let control;
    if (x.type === "select") {
      control = `<select name="${name}">${x.options.map(o => `<option ${o === x.value ? "selected" : ""}>${o}</option>`).join("")}</select>`;
    } else if (x.type === "city") {
      const listId=`city-options-${name}-${i}`;
      control = `<input name="${name}" type="text" value="${x.value || ""}" list="${listId}" autocomplete="off" placeholder="${esc(x.placeholder||"Start typing a city...")}" required><datalist id="${listId}">${cities.map(city=>`<option value="${city}"></option>`).join("")}</datalist>`;
    } else if (x.type === "tags") {
      const listId=`skill-options-${name}-${i}`;
      const initial=(x.value||"").split(",").map(value=>value.trim()).filter(Boolean);
      control = `<div class="tag-input" data-tag-input>
        <div class="tag-list">${initial.map(value=>`<span class="skill-tag">${esc(value)}<button type="button" aria-label="Remove ${esc(value)}">×</button></span>`).join("")}</div>
        <input class="tag-entry" type="text" list="${listId}" autocomplete="off" placeholder="Type a skill and press Enter">
        <input type="hidden" name="${name}" value="${esc(initial.join(", "))}" ${x.required===false?"":"required"}>
        <datalist id="${listId}">${skills.map(skill=>`<option value="${skill}"></option>`).join("")}</datalist>
      </div>`;
    } else if (x.type === "textarea") {
      control = `<textarea name="${name}">${x.value || ""}</textarea>`;
    } else {
      control = `<input name="${name}" type="${x.type || "text"}" value="${x.value || ""}" placeholder="${esc(x.placeholder||"")}" ${x.required === false ? "" : "required"}>`;
    }
    return `<div class="field ${x.full ? "full" : ""}"><label>${x.label}</label>${control}</div>`;
  }).join("");
  return `<div class="form-grid">${controls}</div>`;
}
function showJobForm(type){
  const isC=type==="Contract";
  const isAI=type==="AI Agent";
  const ownershipFields=session.role==="Client"
    ? []
    : [{label:"Client",name:"client",type:"select",options:state.clients.map(client=>client.company)}];
  const contextFields=isAI
    ? [{label:"Business function",name:"department",type:"select",options:APP_OPTIONS.departments},{label:"Agent use case",name:"projectName",placeholder:"Example: CV screening and interview coordination"}]
    : isC
    ? [{label:"Project name",name:"projectName"},{label:"Department",name:"department",type:"select",options:APP_OPTIONS.departments}]
    : [{label:"Department",name:"department",type:"select",options:APP_OPTIONS.departments}];
  const modeField=isAI
    ? {label:"Deployment mode",name:"mode",type:"select",options:["Cloud hosted","Private cloud","Hybrid deployment"]}
    : {label:"Work mode",name:"mode",type:"select",options:APP_OPTIONS.workModes};
  const commercialField=isAI
    ? {label:"Monthly AI agent plan",name:"salary",type:"select",options:["Starter · ₹25,000 / month","Growth · ₹60,000 / month","Enterprise · Custom pricing"]}
    : isC
      ? {label:"Monthly billing rate",name:"salary",type:"select",options:APP_OPTIONS.contractSalary}
      : {label:"Salary range",name:"salary",type:"select",options:APP_OPTIONS.permanentSalary};
  modal(isAI?"Create AI Agent request":`Create ${type} job`,`<form id="modal-form">${fields([
    {label:isAI?"AI agent name / role":"Job title",name:"title",placeholder:isAI?"Example: AI Recruitment Coordinator":""},
    ...ownershipFields,...contextFields,
    {label:isAI?"Primary operating region":"Location",name:"location",type:"city"},modeField,
    commercialField,
    {label:isAI?"AI agents required":isC?"Contractors required":"Openings",name:"openings",type:"number",value:1},
    {label:isAI?"Capabilities & integrations":"Skills & experience",name:"skills",type:"tags",full:true},
    {label:isAI?"Operating instructions & success criteria":isC?"Contract / exit terms":"Job description",name:"description",type:"textarea",full:true}
  ])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">${isAI?"Submit AI agent request":"Preview & publish"}</button>`);
  bindTagInputs();
  $(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{const f=$("#modal-form");if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));const clientName=session.role==="Client"?roles.Client.company:d.client;const client=state.clients.find(item=>item.company===clientName);const job={id:nextId("JOB",state.jobs),title:d.title,projectName:d.projectName||"",department:d.department||"",type,client:clientName,clientId:client?.id,location:d.location,mode:d.mode,status:"Active",assignmentStatus:"Pending",urgency:"Medium",recruiter:"",openings:+d.openings,cv:0,interviews:0,offers:0,skills:d.skills,salary:d.salary,description:d.description||"",date:"13 Jun 2026"};state.jobs.unshift(job);const requestLabel=isAI?"AI Agent request":`${job.title}`;addAssignmentNotification({roles:["Admin"],client:clientName,message:`${requestLabel} for ${clientName} is awaiting assignment`});addAssignmentNotification({roles:["Client"],client:clientName,message:`${requestLabel} was created and is pending Admin assignment`});save();closeModal();currentPage="jobs";filter=isAI?"AI Agent":"All";render();toast(isAI?"AI Agent request created and sent to Admin":`${type} job created. Recruiter assignment is Pending`)};
}
function showAssignmentForm(id){
  const job=state.jobs.find(item=>item.id===id);
  if(session.role!=="Admin"||!job)return;
  modal(`Assign recruiter · ${job.title}`,`<form id="modal-form">${fields([
    {label:"Client",name:"client",value:job.client,required:false},
    {label:"Recruiter",name:"recruiter",type:"select",options:state.recruiters,value:job.recruiter||state.recruiters[0]},
    {label:"Urgency",name:"urgency",type:"select",options:APP_OPTIONS.urgency,value:job.urgency||"Medium"},
    {label:"Assignment note",name:"note",type:"textarea",full:true,required:false}
  ])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Assign recruiter</button>`);
  const clientInput=$("#modal-form [name='client']");
  if(clientInput)clientInput.disabled=true;
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    const previousRecruiter=job.recruiter;
    job.recruiter=data.recruiter;
    job.urgency=data.urgency;
    job.assignmentStatus="Assigned";
    state.candidates.filter(candidate=>candidate.jobId===job.id).forEach(candidate=>candidate.recruiter=data.recruiter);
    addAssignmentNotification({roles:["Admin"],recruiter:data.recruiter,client:job.client,message:`${job.title} was assigned to ${data.recruiter} with ${data.urgency} urgency`});
    addAssignmentNotification({roles:["Recruiter"],recruiter:data.recruiter,client:job.client,message:`Admin assigned you ${job.title} for ${job.client} · ${data.urgency} urgency`});
    addAssignmentNotification({roles:["Client"],recruiter:data.recruiter,client:job.client,message:`${data.recruiter} is now assigned to ${job.title} · ${data.urgency} urgency`});
    if(previousRecruiter&&previousRecruiter!==data.recruiter){
      addAssignmentNotification({roles:["Recruiter"],recruiter:previousRecruiter,client:job.client,message:`${job.title} was reassigned by Admin`});
    }
    save();closeModal();render();toast(`${job.title} assigned to ${data.recruiter}`);
  };
}
function showJob(j){modal(j.title,`<div style="display:flex;gap:8px;margin-bottom:15px">${badge(j.type)}${badge(j.status)}${badge(j.assignmentStatus)}${urgencyBadge(j.urgency)}</div><h3>${j.client}</h3><p>${j.department||"General"}${j.projectName?` · ${j.projectName}`:""} · ${j.location} · ${j.mode}</p><div class="grid-equal"><div><small>Salary / rate</small><h3>${j.salary}</h3></div><div><small>Openings</small><h3>${j.openings}</h3></div></div>${j.experience?`<p><b>Experience:</b> ${esc(j.experience)}</p>`:""}<h3>Required skills</h3>${skillTags(j.skills)}${j.responsibilities?`<h3>Key responsibilities</h3><p>${esc(j.responsibilities)}</p>`:""}<h3>Recruiter</h3>${j.recruiter?person(j.recruiter):"<p>Pending Admin assignment</p>"}`,`<button class="btn btn-secondary modal-close-2">Close</button>${session.role==="Admin"?`<button class="btn btn-primary" id="job-assign">${j.assignmentStatus==="Pending"?"Assign recruiter":"Reassign recruiter"}</button>`:`<button class="btn btn-primary" id="job-source" ${j.assignmentStatus==="Pending"?"disabled":""}>${session.role==="Client"?"Review candidates":"Source candidates"}</button>`}`);$(".modal-close-2").onclick=closeModal;$("#job-assign")?.addEventListener("click",()=>{closeModal();showAssignmentForm(j.id)});$("#job-source")?.addEventListener("click",()=>{closeModal();currentPage=session.role==="Recruiter"?"sourcing":session.role==="Client"?"cv-review":"candidates";render()}) }
function miniResumeMarkup(profile,{visible=true,external=false,showGapReason=false}={}){
  const experience=profile.experienceEntries||[];
  const education=normalizeEducationEntries(profile.educationEntries||[]);
  const email=external?profile.email:(visible?profile.email:maskedContact(profile.email));
  const phone=external?profile.phone:(visible?profile.phone:maskedContact(profile.phone));
  const noticePeriod=profile.notice||profile.availability||"Not provided";
  const lastWorkingDay=candidateLastWorkingDate(profile);
  return `<div class="mini-resume">
    <section class="mini-resume-summary"><h3>Professional summary</h3><p>${esc(profile.summary||`${profile.role} experienced in ${profile.skills}.`)}</p></section>
    <section class="resume-availability-strip"><p><b>Notice period</b><span>${esc(noticePeriod)}</span></p><p><b>Last working day</b><span>${esc(lastWorkingDay)}</span></p></section>
    <section><h3>Core skills</h3><div class="display-tags">${String(profile.skills||"").split(",").filter(Boolean).map(skill=>`<span class="skill-tag">${esc(skill.trim())}</span>`).join("")}</div></section>
    <section><h3>Professional experience</h3><div class="resume-timeline">${experience.map(entry=>`<div class="resume-entry"><i></i><div><b>${esc(entry.designation||profile.role)}</b><strong>${esc(entry.company||"Company not specified")}</strong><small>${cvMonth(entry.startMonth)||"Start date not provided"} – ${cvMonth(entry.endMonth)||"Present"}</small><em>Duration: ${esc(experienceTenure(entry))}</em><p><b>Reason for leaving:</b> ${esc(entry.reasonForLeaving||profile.reasonForLeaving||"Reason not shared yet.")}</p></div></div>`).join("")||`<p class="muted">Employment details are not available.</p>`}</div>${showGapReason?experienceGapResumeNote(profile):""}</section>
    <section><h3>Education</h3><div class="resume-education">${education.map(entry=>`<div><b>${esc(entry.level||"Education")}</b><span>${esc(entry.degree||"Degree not specified")}</span><small>${esc(entry.year||"Year not provided")}${entry.university?` · ${esc(entry.university)}`:""}</small></div>`).join("")||`<p class="muted">Education details are not available.</p>`}</div></section>
    <section class="resume-facts"><h3>Additional details</h3><div><p><b>Location</b><span>${esc(profile.location||"Not provided")}</span></p><p><b>Availability</b><span>${esc(profile.notice||profile.availability||"Not provided")}</span></p><p><b>Email</b><span>${esc(email||"Not provided")}</span></p><p><b>Phone</b><span>${esc(phone||"Not provided")}</span></p></div></section>
  </div>`;
}
function showCandidate(c){
  const visible=revealCandidateIdentity(c);
  const isClientReview=session.role==="Client"&&currentPage==="cv-review";
  const displayName=candidateDisplayName(c);
  modal(visible?displayName:"Protected candidate profile",`<div class="candidate-resume-head">${person(displayName,visible?c.email:"Email hidden until shortlisted")}<div>${badge(c.type)}${badge(c.stage)}${clientReviewBadge(c.clientReviewStatus)}${badge(`${c.score}% AI match`)}</div></div><div class="resume-highlight-grid"><div><small>Applied role</small><b>${esc(c.role)}</b></div><div><small>Current CTC / rate</small><b>${esc(c.ctc)}</b></div></div>${miniResumeMarkup(c,{visible,showGapReason:session.role==="Client"})}${!visible?`<p class="privacy-note">Candidate name, email, and mobile number become visible after the client marks the profile as Shortlist or Select. Resume skills, experience, and education remain available for review.</p>`:""}<div class="timeline">${["Sourced","Screened","AI","Client","Interview","Offer"].map((x,i)=>`<div class="stage ${stageClass(x)} ${i<4?"done":i===4?"current":""}"><span class="stage-dot">${i<4?"✓":i+1}</span>${x}</div>`).join("")}</div>`,`<button class="resume-pdf-link" id="view-candidate-resume">View complete resume ↗</button><button class="btn btn-secondary modal-close-2">Close</button>${isClientReview?"":`<button class="btn btn-primary" id="candidate-advance">Advance stage</button>`}`);
  $(".modal-close-2").onclick=closeModal;
  $("#view-candidate-resume")?.addEventListener("click",()=>viewResumePdf(c,{visible}));
  $("#candidate-advance")?.addEventListener("click",()=>{closeModal();moveCandidate(c.id)});
}
function showLeavingReason(id){
  const candidate=state.candidates.find(item=>item.id===id);
  if(!candidate)return;
  const reasons=latestLeavingReasons(candidate);
  modal(`Leaving reasons · ${candidateDisplayName(candidate)}`,`<div class="grid-equal"><div><small>Last working date</small><h3>${esc(candidateLastWorkingDate(candidate))}</h3></div><div><small>Availability</small><h3>${esc(candidate.notice)}</h3></div></div><h3>Last 3 job-wise reasons for leaving</h3><div class="leaving-reason-list">${reasons.map(entry=>`<article><b>${esc(entry.designation||candidate.role||"Role not specified")}</b><strong>${esc(entry.company||"Company not specified")}</strong><small>${cvMonth(entry.startMonth)||"Start not provided"} - ${cvMonth(entry.endMonth)||"Present"}</small><p>${esc(entry.reasonForLeaving||"Reason not shared yet.")}</p></article>`).join("")}</div>`,`<button class="btn btn-secondary modal-close-2">Close</button>`);
  $(".modal-close-2").onclick=closeModal;
}
function showCandidateForm(){
  const availableJobs=roleJobs(session.role==="Candidate"?"Admin":session.role).filter(job=>job.status!=="Closed");
  modal("Add candidate",`<form id="modal-form">${fields([{label:"Full name",name:"name",placeholder:"Candidate full name"},{label:"Email",name:"email",type:"email",placeholder:"candidate@example.com"},{label:"Mobile number",name:"phone",placeholder:"+91 98765 43210"},{label:"Job",name:"jobId",type:"select",options:availableJobs.map(job=>`${job.id} · ${job.title}`)},{label:"Notice period",name:"notice"},{label:"Location",name:"location",type:"city"},{label:"Reason for leaving",name:"reasonForLeaving",type:"textarea",full:true,required:false},{label:"Skills",name:"skills",type:"tags",full:true}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Add candidate</button>`);
  bindTagInputs();
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const f=$("#modal-form");if(!f.reportValidity())return;
    const d=Object.fromEntries(new FormData(f));
    const job=state.jobs.find(item=>d.jobId.startsWith(item.id));
    const candidate={...d,jobId:job.id,id:nextId("CAN",state.candidates),role:job.title,type:job.type,client:job.client,recruiter:job.recruiter,stage:"Sourced",score:82,ctc:"Not shared",lastWorkingDate:lastWorkingDateFromNotice(d.notice),reasonForLeaving:d.reasonForLeaving||"Reason not shared yet."};
    state.candidates.unshift(candidate);
    state.users.push({name:candidate.name,email:candidate.email,role:"Candidate",status:"Active",last:"Never"});
    save();closeModal();render();toast("Candidate added to the shared pipeline");
  };
}
const BULK_IMPORTS = {
  jobs:{
    label:"jobs",
    headers:["title","type","client","department","location","mode","salary","openings","skills"],
    sample:["Java Developer","Permanent","Northstar Systems","Engineering","Bengaluru","Hybrid","₹18–25 LPA","2","Java, Spring Boot, AWS"]
  },
  candidates:{
    label:"candidates",
    headers:["name","email","phone","jobId","notice","location","skills"],
    sample:["Aditi Verma","aditi.verma@example.com","+91 98765 40001","JOB-1101","30 days","Bengaluru","Java, Spring Boot"]
  },
  interviews:{
    label:"interviews",
    headers:["candidateId","round","date","time","mode","interviewer"],
    sample:["CAN-3001","L3 – Leadership / Final","2026-06-20","11:00","Video","Neha Gupta"]
  },
  offers:{
    label:"offers",
    headers:["candidateId","documentType","ctc","terms","startDate","expiry","notes"],
    sample:["CAN-3001","Permanent offer","₹25–35 LPA","Standard company terms","2026-07-01","2026-06-25","Subject to document verification"]
  },
  users:{
    label:"users",
    headers:["name","email","role","status"],
    sample:["Nikhil Rao","nikhil.rao@gnext.ai","Recruiter","Active"]
  },
  clients:{
    label:"clients",
    headers:["company","contact","email","commercials","status"],
    sample:["Summit Technologies","Pooja Shah","pooja@summit.example","Permanent · 8%","Active"]
  },
  campaigns:{
    label:"AI campaigns",
    headers:["name","jobId","minimumScore","language"],
    sample:["Java talent outreach","JOB-1101","80","English + Hindi"]
  },
  leads:{
    label:"leads",
    headers:["company","contact","source","value","owner"],
    sample:["Apex Digital","Ritu Malhotra","LinkedIn","₹6.5L","Arjun Mehta"]
  },
  documents:{
    label:"documents",
    headers:["client","name","category","amount","status","date"],
    sample:["Northstar Systems","INV-2026-099","Invoice","₹2.25L","Pending","20 Jun 2026"]
  }
};
function parseCsv(text){
  const rows=[];let row=[],value="",quoted=false;
  for(let index=0;index<text.length;index++){
    const char=text[index],next=text[index+1];
    if(char==='"'&&quoted&&next==='"'){value+='"';index++;continue}
    if(char==='"'){quoted=!quoted;continue}
    if(char===","&&!quoted){row.push(value.trim());value="";continue}
    if((char==="\n"||char==="\r")&&!quoted){
      if(char==="\r"&&next==="\n")index++;
      row.push(value.trim());value="";
      if(row.some(cell=>cell!==""))rows.push(row);
      row=[];continue;
    }
    value+=char;
  }
  row.push(value.trim());
  if(row.some(cell=>cell!==""))rows.push(row);
  if(rows.length<2)return [];
  const headers=rows.shift().map(header=>header.replace(/^\uFEFF/,"").trim());
  return rows.map(values=>Object.fromEntries(headers.map((header,index)=>[header,values[index]||""])));
}
function formatImportDate(value){
  if(!value)return "";
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return value;
  const date=new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
}
function importBulkRows(kind,rows){
  let imported=0,skipped=0;
  rows.slice(0,100).forEach(data=>{
    if(kind==="jobs"){
      const clientName=session.role==="Client"?roles.Client.company:data.client;
      const client=state.clients.find(item=>item.company===clientName);
      if(!data.title||!client){skipped++;return}
      const type=["Permanent","Contract","AI Agent"].includes(data.type)?data.type:"Permanent";
      const defaultSalary=type==="Contract"?APP_OPTIONS.contractSalary[0]:type==="AI Agent"?"Starter · ₹25,000 / month":APP_OPTIONS.permanentSalary[0];
      const allowedModes=type==="AI Agent"?["Cloud hosted","Private cloud","Hybrid deployment"]:APP_OPTIONS.workModes;
      const job={id:nextId("JOB",state.jobs),title:data.title,department:data.department||"Engineering",type,client:clientName,clientId:client.id,location:data.location||"Remote",mode:allowedModes.includes(data.mode)?data.mode:allowedModes[0],status:"Active",assignmentStatus:"Pending",urgency:"Medium",recruiter:"",openings:Number(data.openings)||1,cv:0,interviews:0,offers:0,skills:data.skills||"",salary:data.salary||defaultSalary,date:"13 Jun 2026"};
      state.jobs.unshift(job);
      addAssignmentNotification({roles:["Admin"],client:clientName,message:`${job.title} for ${clientName} was bulk uploaded and awaits recruiter assignment`});
      addAssignmentNotification({roles:["Client"],client:clientName,message:`${job.title} was bulk uploaded and is pending Admin recruiter assignment`});
    } else if(kind==="candidates"){
      const job=state.jobs.find(item=>item.id===data.jobId);
      if(!data.name||!data.email||!job||job.assignmentStatus!=="Assigned"){skipped++;return}
      const candidate={id:nextId("CAN",state.candidates),name:data.name,email:data.email,phone:data.phone||"",jobId:job.id,role:job.title,type:job.type,client:job.client,recruiter:job.recruiter,stage:"Sourced",score:82,notice:data.notice||"30 days",location:data.location||job.location,skills:data.skills||job.skills,ctc:"Not shared",lastWorkingDate:lastWorkingDateFromNotice(data.notice||"30 days"),reasonForLeaving:data.reasonForLeaving||"Reason not shared yet."};
      state.candidates.unshift(candidate);
      if(!state.users.some(user=>user.email.toLowerCase()===candidate.email.toLowerCase()))state.users.push({name:candidate.name,email:candidate.email,role:"Candidate",status:"Active",last:"Never"});
    } else if(kind==="interviews"){
      const candidate=state.candidates.find(item=>item.id===data.candidateId);
      if(!candidate||!data.date||!data.time){skipped++;return}
      state.interviews.unshift({id:nextId("INT",state.interviews),candidateId:candidate.id,candidate:candidate.name,jobId:candidate.jobId,role:candidate.role,round:data.round||"Recruiter Screen",date:formatImportDate(data.date),time:data.time,mode:data.mode||"Video",interviewer:data.interviewer||roles[session.role].user,status:"Pending"});
    } else if(kind==="offers"){
      const candidate=state.candidates.find(item=>item.id===data.candidateId);
      if(!candidate||!data.ctc){skipped++;return}
      candidate.stage="Offered";candidate.ctc=data.ctc;
      candidate.offer={documentType:data.documentType||"Permanent offer",terms:data.terms||"",startDate:data.startDate||"",expiry:data.expiry||"",notes:data.notes||"",status:"Awaiting response"};
    } else if(kind==="users"){
      if(!data.name||!data.email||state.users.some(user=>user.email.toLowerCase()===data.email.toLowerCase())){skipped++;return}
      const role=["Admin","Client","Recruiter","Candidate"].includes(data.role)?data.role:"Candidate";
      state.users.push({name:data.name,email:data.email,role,status:data.status==="Inactive"?"Inactive":"Active",last:"Never"});
      if(role==="Recruiter"&&!state.recruiters.includes(data.name))state.recruiters.push(data.name);
    } else if(kind==="clients"){
      if(!data.company||!data.contact||!data.email||state.clients.some(client=>client.company.toLowerCase()===data.company.toLowerCase())){skipped++;return}
      const client={id:nextId("CLI",state.clients),company:data.company,contact:data.contact,email:data.email,commercials:data.commercials||"Permanent · 8%",status:data.status==="On Hold"?"On Hold":"Active",agreement:"Draft",nda:"Pending"};
      state.clients.push(client);
      state.users.push({name:client.contact,email:client.email,role:"Client",status:client.status==="Active"?"Active":"Inactive",last:"Never"});
    } else if(kind==="campaigns"){
      const job=state.jobs.find(item=>item.id===data.jobId);
      if(!data.name||!job){skipped++;return}
      state.campaigns.unshift({id:nextId("CAM",state.campaigns),name:data.name,jobId:job.id,minimumScore:Number(data.minimumScore)||80,language:data.language||"English",status:"Running",created:"13 Jun 2026"});
    } else if(kind==="leads"){
      if(!data.company||!data.contact){skipped++;return}
      state.leads.push({company:data.company,contact:data.contact,source:data.source||"LinkedIn",stage:"New",value:data.value||"₹0",owner:data.owner||"Arjun Mehta"});
    } else if(kind==="documents"){
      const clientName=session.role==="Client"?roles.Client.company:data.client;
      const client=state.clients.find(item=>item.company===clientName);
      if(!client||!data.name){skipped++;return}
      state.documents.unshift({id:nextId("DOC",state.documents),clientId:client.id,client:client.company,name:data.name,category:data.category||"Service Agreement",amount:data.amount||"",status:data.status||"Pending",date:formatImportDate(data.date)||"13 Jun 2026"});
    }
    imported++;
  });
  save();
  return {imported,skipped};
}
function showBulkUpload(kind){
  const config=BULK_IMPORTS[kind];
  if(!config)return;
  modal(`Bulk upload ${config.label}`,`
    <div class="bulk-upload-guide">
      <div><b>1. Download template</b><p>Use the required column names and keep up to 100 records per upload.</p></div>
      <div><b>2. Add your data</b><p>Save the completed template as a CSV file.</p></div>
      <div><b>3. Upload and validate</b><p>Valid records update every linked workspace automatically.</p></div>
    </div>
    <button class="btn btn-secondary" id="download-bulk-template">⇩ Download CSV template</button>
    <label class="dropzone bulk-dropzone" for="bulk-file">
      <input id="bulk-file" type="file" accept=".csv,text/csv" hidden>
      <span>⇧</span><h3>Choose ${esc(config.label)} CSV file</h3><p id="bulk-file-name">No file selected</p>
    </label>
    <div class="bulk-validation" id="bulk-validation">Waiting for a CSV file.</div>`,
    `<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-bulk-upload">Validate & import</button>`);
  let parsedRows=[];
  $(".modal-close-2").onclick=closeModal;
  $("#download-bulk-template").onclick=()=>downloadCsv(`gnext-${kind}-template.csv`,[config.headers,config.sample]);
  $("#bulk-file").onchange=event=>{
    const file=event.target.files[0];
    if(!file)return;
    $("#bulk-file-name").textContent=file.name;
    const reader=new FileReader();
    reader.onload=()=>{
      parsedRows=parseCsv(String(reader.result||""));
      const headers=parsedRows[0]?Object.keys(parsedRows[0]):[];
      const missing=config.headers.filter(header=>!headers.includes(header));
      $("#bulk-validation").textContent=missing.length?`Missing columns: ${missing.join(", ")}`:`${parsedRows.length} records ready to import.`;
      $("#bulk-validation").classList.toggle("error",missing.length>0);
      if(missing.length)parsedRows=[];
    };
    reader.readAsText(file);
  };
  $("#submit-bulk-upload").onclick=()=>{
    if(!parsedRows.length){toast("Choose a valid CSV template first");return}
    const result=importBulkRows(kind,parsedRows);
    closeModal();render();
    toast(`${result.imported} ${config.label} imported${result.skipped?` · ${result.skipped} skipped`:""} across linked workspaces`);
  };
}
function moveCandidate(id){const c=state.candidates.find(c=>c.id===id);if(!c)return;modal("Update pipeline stage",`<div class="field"><label>New stage</label><select id="new-stage">${PIPELINE_STAGES.map(s=>`<option class="${stageClass(s)}" ${s===c.stage?"selected":""}>${s}</option>`).join("")}</select></div><div class="field"><label>Notes</label><textarea placeholder="Add a note for the team..."></textarea></div>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Update stage</button>`);$(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{const previousStage=c.stage;c.stage=$("#new-stage").value;addAssignmentNotification({roles:["Admin","Recruiter","Client"],recruiter:c.recruiter,client:c.client,message:`${c.name} moved from ${previousStage} to ${c.stage}`});addAssignmentNotification({roles:["Candidate"],candidateId:c.id,recruiter:c.recruiter,client:c.client,message:`Your application for ${c.role} moved to ${c.stage}`});save();closeModal();render();toast(`${c.name} moved to ${c.stage}`)}}
function showUpload(){modal("Upload CV",`<div class="dropzone" style="padding:50px 20px">⇧<h3>Drop CV files here</h3><p>PDF or DOCX · Up to 10 files</p><button class="btn btn-secondary" id="fake-upload">Browse files</button></div><p style="color:var(--muted);font-size:12px">${BRAND_NAME} will parse contact details, skills, employment history, and flag possible duplicates.</p>`);$("#fake-upload").onclick=()=>{closeModal();toast("CV parsed. Candidate draft created")}}
function showInterviewForm(){if(session.role==="Candidate")return;modal("Schedule interview",`<form id="modal-form">${fields([{label:"Candidate",name:"candidateId",type:"select",options:roleCandidates(session.role).map(c=>`${c.id} · ${c.name}`)},{label:"Round",name:"round",type:"select",options:INTERVIEW_ROUNDS},{label:"Date",name:"date",type:"date"},{label:"Time",name:"time",type:"time"},{label:"Mode",name:"mode",type:"select",options:["Video","In person","AI Room","Phone"]},{label:"Interviewer",name:"interviewer"}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Schedule & notify</button>`);$(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{const f=$("#modal-form");if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));const c=state.candidates.find(candidate=>d.candidateId.startsWith(candidate.id));if(!c)return;const date=new Date(`${d.date}T00:00:00`);const formatted=date.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});state.interviews.unshift({...d,candidateId:c.id,candidate:c.name,jobId:c.jobId,id:nextId("INT",state.interviews),role:c.role,date:formatted,status:"Pending"});addAssignmentNotification({roles:["Admin","Recruiter","Client"],recruiter:c.recruiter,client:c.client,message:`${d.round} interview scheduled for ${c.name} on ${formatted} at ${d.time}`});addAssignmentNotification({roles:["Candidate"],candidateId:c.id,recruiter:c.recruiter,client:c.client,message:`Your ${d.round} interview is scheduled for ${formatted} at ${d.time}`});save();closeModal();render();toast("Interview scheduled and visible to all linked users")}}
function reschedule(id){if(session.role==="Candidate")return;const interview=state.interviews.find(item=>item.id===id);if(!interview)return;modal(`Reschedule ${interview.candidate}`,`<form id="modal-form">${fields([{label:"New date",name:"date",type:"date"},{label:"New time",name:"time",type:"time"},{label:"Reason",name:"reason",type:"textarea",full:true}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Send update</button>`);$(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{const form=$("#modal-form");if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));const date=new Date(`${data.date}T00:00:00`);interview.date=date.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});interview.time=data.time;interview.status="Pending";interview.rescheduleReason=data.reason;const candidate=state.candidates.find(item=>item.id===interview.candidateId);if(candidate){addAssignmentNotification({roles:["Admin","Recruiter","Client"],recruiter:candidate.recruiter,client:candidate.client,message:`${interview.round} interview for ${candidate.name} was rescheduled to ${interview.date} at ${interview.time}`});addAssignmentNotification({roles:["Candidate"],candidateId:candidate.id,recruiter:candidate.recruiter,client:candidate.client,message:`Your ${interview.round} interview was rescheduled to ${interview.date} at ${interview.time}`})}save();closeModal();render();toast("Interview rescheduled across all workspaces")}}
function nextInterviewStage(candidate,interview){
  const roundTargets={
    "Recruiter Screen":"AI Interview",
    "AI Technical":"Client Review",
    "Client L1":"L2 Interview",
    "L2 – Portfolio":"L3 Interview",
    "L3 – Leadership / Final":"Offered",
    "HR Round":"Offered"
  };
  const roundTarget=roundTargets[interview?.round];
  const currentIndex=PIPELINE_STAGES.indexOf(candidate?.stage);
  const targetIndex=PIPELINE_STAGES.indexOf(roundTarget);
  if(roundTarget&&targetIndex>currentIndex)return roundTarget;
  return PIPELINE_STAGES[Math.min(Math.max(0,currentIndex)+1,PIPELINE_STAGES.indexOf("Offered"))];
}
function feedback(id){
  if(session.role==="Candidate")return;
  const interview=state.interviews.find(item=>item.id===id);
  const candidate=state.candidates.find(item=>item.id===interview.candidateId);
  const nextStage=candidate?nextInterviewStage(candidate,interview):"next pipeline stage";
  modal(`Feedback · ${interview.candidate}`,`<form id="modal-form">${fields([{label:"Result",name:"result",type:"select",options:["Select","Hold","Reject","Next round"]},{label:"Rating",name:"rating",type:"select",options:["5 - Excellent","4 - Strong","3 - Meets expectations","2 - Needs improvement","1 - Poor"]},{label:"Feedback",name:"feedback",type:"textarea",full:true}])}<div class="stage-change-preview" id="stage-change-preview">Selecting <b>Next round</b> will automatically move the candidate from <b>${esc(candidate?.stage||"current stage")}</b> to <b>${esc(nextStage)}</b> across all linked users.</div></form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Submit feedback</button>`);
  $(".modal-close-2").onclick=closeModal;
  const result=$('[name="result"]');
  const preview=$("#stage-change-preview");
  const updatePreview=()=>preview?.classList.toggle("show",result?.value==="Next round");
  result?.addEventListener("change",updatePreview);
  updatePreview();
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    interview.status="Completed";
    interview.feedback=data;
    let stageMessage="";
    if(candidate){
      const previousStage=candidate.stage;
      if(data.result==="Next round"||data.result==="Select")candidate.stage=nextInterviewStage(candidate,interview);
      else if(data.result==="Hold")candidate.stage="Client Review";
      else if(data.result==="Reject")candidate.stage="Screened";
      stageMessage=`${candidate.name} moved from ${previousStage} to ${candidate.stage}`;
      addAssignmentNotification({roles:["Admin"],recruiter:candidate.recruiter,client:candidate.client,message:`Interview result: ${data.result}. ${stageMessage}`});
      addAssignmentNotification({roles:["Recruiter"],recruiter:candidate.recruiter,client:candidate.client,message:`Interview result: ${data.result}. ${stageMessage}`});
      addAssignmentNotification({roles:["Client"],recruiter:candidate.recruiter,client:candidate.client,message:`Interview result: ${data.result}. ${stageMessage}`});
      addAssignmentNotification({roles:["Candidate"],candidateId:candidate.id,recruiter:candidate.recruiter,client:candidate.client,message:`Your ${interview.round} interview status has been updated to ${candidate.stage}`});
    }
    save();closeModal();render();
    toast(data.result==="Next round"?`${stageMessage} across all linked users`:"Interview feedback and candidate stage updated");
  };
}
function showOfferForm(){modal("Raise offer / contract",`<form id="modal-form">${fields([{label:"Candidate",name:"candidateId",type:"select",options:roleCandidates(session.role).map(c=>`${c.id} · ${c.name}`)},{label:"Document type",name:"documentType",type:"select",options:["Permanent offer","Contract agreement"]},{label:"Fixed CTC / monthly rate",name:"ctc",type:"select",options:[...APP_OPTIONS.permanentSalary,...APP_OPTIONS.contractSalary]},{label:"Variable / tax terms",name:"terms"},{label:"Start date",name:"startDate",type:"date"},{label:"Offer expiry",name:"expiry",type:"date"},{label:"Special terms",name:"notes",type:"textarea",full:true}])}</form>`,`<button class="btn btn-secondary modal-close-2">Save draft</button><button class="btn btn-primary" id="submit-modal">Issue document</button>`);$(".modal-close-2").onclick=()=>{closeModal();toast("Offer saved as draft")};$("#submit-modal").onclick=()=>{const f=$("#modal-form");if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));const candidate=state.candidates.find(item=>d.candidateId.startsWith(item.id));if(!candidate)return;candidate.stage="Offered";candidate.ctc=d.ctc;candidate.offer={documentType:d.documentType,terms:d.terms,startDate:d.startDate,expiry:d.expiry,notes:d.notes,status:"Awaiting response"};addAssignmentNotification({roles:["Admin","Recruiter","Client"],recruiter:candidate.recruiter,client:candidate.client,message:`Offer issued to ${candidate.name} for ${candidate.role}`});addAssignmentNotification({roles:["Candidate"],candidateId:candidate.id,recruiter:candidate.recruiter,client:candidate.client,message:`A new offer for ${candidate.role} is ready for your review`});save();closeModal();render();toast("Offer issued and updated across all workspaces")}}
function showOfferDetails(id){
  const candidate=state.candidates.find(item=>item.id===id);
  if(!candidate)return;
  const offer=candidate.offer||{};
  modal(`${candidate.name} · ${candidate.role}`,`<div style="display:flex;gap:8px;margin-bottom:15px">${badge(candidate.type)}${badge(candidate.stage)}${badge(offer.status||"Issued")}</div><div class="grid-equal"><div><small>Compensation</small><h3>${esc(candidate.ctc)}</h3></div><div><small>Start date</small><h3>${esc(offer.startDate||"To be confirmed")}</h3></div></div><p><b>Document:</b> ${esc(offer.documentType||"Offer / contract")}</p><p><b>Terms:</b> ${esc(offer.terms||"Standard company terms")}</p><p><b>Expiry:</b> ${esc(offer.expiry||"Not specified")}</p><p><b>Notes:</b> ${esc(offer.notes||"No additional notes")}</p>`,`<button class="btn btn-secondary modal-close-2">Close</button>`);
  $(".modal-close-2").onclick=closeModal;
}
function showOfferManagement(id){
  const candidate=state.candidates.find(item=>item.id===id);
  if(!candidate)return;
  if(candidate.stage==="Joined"){
    modal(`Onboarding · ${candidate.name}`,`<p>Track the joining checklist for ${esc(candidate.role)} at ${esc(candidate.client)}.</p><label class="check"><input type="checkbox" checked> Offer accepted</label><label class="check"><input type="checkbox"> Identity and payroll documents verified</label><label class="check"><input type="checkbox"> Joining confirmation sent</label>`,`<button class="btn btn-secondary modal-close-2">Close</button><button class="btn btn-primary" id="complete-onboarding">Save checklist</button>`);
    $(".modal-close-2").onclick=closeModal;
    $("#complete-onboarding").onclick=()=>{closeModal();toast("Onboarding checklist updated")};
    return;
  }
  const offer=candidate.offer||{};
  modal(`Edit offer · ${candidate.name}`,`<form id="modal-form">${fields([{label:"Compensation",name:"ctc",value:candidate.ctc},{label:"Start date",name:"startDate",type:"date",value:offer.startDate},{label:"Offer expiry",name:"expiry",type:"date",value:offer.expiry},{label:"Terms",name:"terms",value:offer.terms},{label:"Special terms",name:"notes",type:"textarea",value:offer.notes,full:true}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Save offer</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{const form=$("#modal-form");if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));candidate.ctc=data.ctc;candidate.offer={...offer,...data};save();closeModal();render();toast("Offer updated across linked workspaces")};
}
function showUserForm(u=null,idx=-1){modal(u?"Edit user":"Add user",`<form id="modal-form">${fields([{label:"Full name",name:"name",value:u?.name},{label:"Email",name:"email",type:"email",value:u?.email},{label:"Role",name:"role",type:"select",options:["Admin","Client","Recruiter","Candidate"],value:u?.role},{label:"Status",name:"status",type:"select",options:["Active","Inactive"],value:u?.status}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Save user</button>`);$(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{const f=$("#modal-form");if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));d.last=u?.last||"Never";if(idx>=0)state.users[idx]=d;else state.users.push(d);if(d.role==="Recruiter"&&!state.recruiters.includes(d.name))state.recruiters.push(d.name);save();closeModal();render();toast("User saved across linked workspaces")}}
function showUserPermissions(user){
  if(!user)return;
  const permissions={
    Admin:["Manage users and clients","Manage integrations","View reports","Manage all jobs"],
    Client:["Create and manage jobs","Review candidate CVs","Manage interviews","Manage offers and documents"],
    Recruiter:["View assigned jobs","Source and progress candidates","Schedule interviews","Use AI Sourcing"],
    Candidate:["Manage own profile","View applications","Manage interview availability","Review own offers"]
  }[user.role]||[];
  modal(`Permissions · ${user.name}`,`<p>${esc(user.role)} workspace access for ${esc(user.email)}.</p>${permissions.map(permission=>`<label class="check" style="margin:12px 0"><input type="checkbox" checked> ${esc(permission)}</label>`).join("")}`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="save-permissions">Save permissions</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#save-permissions").onclick=()=>{closeModal();toast(`Permissions updated for ${user.name}`)};
}
function showClientAccount(data){
  const jobs=state.jobs.filter(job=>job.client===data.client);
  modal(data.client,`
    <div style="display:flex;justify-content:space-between;gap:15px;align-items:flex-start;margin-bottom:18px">
      ${person(data.contact,data.email)}
      <div style="display:flex;gap:7px">${badge(data.status)}${badge(data.commercials.split(" · ")[0])}</div>
    </div>
    <div class="grid-equal">
      <div class="card panel"><small>Commercial terms</small><h3>${data.commercials}</h3><p style="color:var(--muted);font-size:12px">Effective from 12 Jan 2026</p></div>
      <div class="card panel"><small>Linked jobs</small><h3>${jobs.length}</h3><p style="color:var(--muted);font-size:12px">${jobs.filter(job=>job.status==="Active").length} currently active</p></div>
    </div>
    <h3>Documents</h3>
    <div style="display:flex;gap:9px;margin-bottom:19px">${badge(`Agreement: ${data.agreement}`)}${badge(`NDA: ${data.nda}`)}</div>
    <h3>Linked jobs</h3>
    <div class="table-wrap"><table><thead><tr><th>Job</th><th>Type</th><th>Status</th><th>Pipeline</th></tr></thead><tbody>
      ${jobs.map(job=>`<tr><td><b>${job.title}</b><br><small>${job.id}</small></td><td>${badge(job.type)}</td><td>${badge(job.status)}</td><td>${job.cv} CVs · ${job.interviews} interviews</td></tr>`).join("") || `<tr><td colspan="4" class="empty">No jobs linked to this client.</td></tr>`}
    </tbody></table></div>`,
    `<button class="btn btn-secondary modal-close-2">Close</button><button class="btn btn-primary" id="edit-client-account">Edit account</button>`
  );
  $(".modal-close-2").onclick=closeModal;
  $("#edit-client-account").onclick=()=>{closeModal();genericForm(`Edit ${data.client}`,["Primary contact","Email","Commercial terms","Internal notes"],"Client account updated")};
}
function showClientForm(){
  modal("Add client",`<form id="modal-form">${fields([{label:"Company name",name:"company"},{label:"Primary contact",name:"contact"},{label:"Email",name:"email",type:"email"},{label:"Commercial terms",name:"commercials"},{label:"Status",name:"status",type:"select",options:["Active","On Hold"]}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Create client</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    const client={...data,id:nextId("CLI",state.clients),agreement:"Draft",nda:"Pending"};
    state.clients.push(client);
    state.users.push({name:client.contact,email:client.email,role:"Client",status:client.status==="Active"?"Active":"Inactive",last:"Never"});
    save();closeModal();render();toast("Client and linked user account created");
  };
}
function showDocumentForm(){
  modal("Add document",`<form id="modal-form">${fields([
    {label:"Document name",name:"name"},
    {label:"Category",name:"category",type:"select",options:["Service Agreement","NDA","Invoice","Payment Receipt"]},
    {label:"Amount",name:"amount",required:false},
    {label:"Status",name:"status",type:"select",options:["Active","Pending","Paid","Overdue"]},
    {label:"Date",name:"date",type:"date"}
  ])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Add document</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    const client=state.clients.find(item=>item.company===roles.Client.company);
    state.documents.unshift({id:nextId("DOC",state.documents),clientId:client.id,client:client.company,name:data.name,category:data.category,amount:data.amount,status:data.status,date:formatImportDate(data.date)});
    save();closeModal();render();toast("Document added to the client workspace");
  };
}
function showCampaignForm(){
  modal("New AI sourcing campaign",`<form id="modal-form">${fields([
    {label:"Campaign name",name:"name"},
    {label:"Job",name:"jobId",type:"select",options:state.jobs.filter(job=>job.assignmentStatus==="Assigned"&&job.status==="Active").map(job=>`${job.id} · ${job.title}`)},
    {label:"Minimum match score",name:"minimumScore",type:"number",value:80},
    {label:"Call language",name:"language",type:"select",options:["English","Hindi","English + Hindi","Tamil","Telugu"]}
  ])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Start campaign</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    const job=state.jobs.find(item=>data.jobId.startsWith(item.id));
    state.campaigns.unshift({id:nextId("CAM",state.campaigns),name:data.name,jobId:job.id,minimumScore:Number(data.minimumScore)||80,language:data.language,status:"Running",created:"13 Jun 2026"});
    save();closeModal();render();toast("AI sourcing campaign started");
  };
}
function showLeadForm(){modal("Add lead",`<form id="modal-form">${fields([{label:"Company",name:"company"},{label:"Contact",name:"contact"},{label:"Source",name:"source",type:"select",options:["LinkedIn","Referral","Website","Event"]},{label:"Potential value",name:"value"},{label:"Owner",name:"owner",value:"Arjun Mehta"}])}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Add lead</button>`);$(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{const f=$("#modal-form");if(!f.reportValidity())return;state.leads.push({...Object.fromEntries(new FormData(f)),stage:"New"});save();closeModal();render();toast("Lead added")}}
function genericForm(title, labels, message){modal(title,`<form id="modal-form">${fields(labels.map((x,i)=>({label:x,name:`f${i}`})))}</form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">Save</button>`);$(".modal-close-2").onclick=closeModal;$("#submit-modal").onclick=()=>{if(!$("#modal-form").reportValidity())return;closeModal();toast(message)}}
function confirmAction(title,text,cb){modal(title,`<p>${text}</p>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-danger" id="confirm-btn">Confirm</button>`);$(".modal-close-2").onclick=closeModal;$("#confirm-btn").onclick=()=>{closeModal();cb()}}
function showNotifications(){
  const notifications=roleNotifications();
  modal("Notifications",`<div class="activity">${notifications.map((item,i)=>`<div class="activity-item"><span class="activity-icon">${["♧","◷","◇","✦"][i%4]}</span><p>${esc(item.message)}</p><time>${esc(item.time||"Live")}</time></div>`).join("")||`<div class="empty">No notifications.</div>`}</div>`,`<button class="btn btn-secondary modal-close-2">Mark all as read</button>`);
  $(".modal-close-2").onclick=()=>{
    notifications.forEach(item=>{
      item.readBy||=[];
      if(!item.readBy.includes(session.role))item.readBy.push(session.role);
    });
    save();closeModal();toast("Notifications marked as read");
  };
}
function runAiSourcing(){
  const form=$("#ai-source-form");
  if(!form){currentPage="ai-sourcing";render();return}
  const data=Object.fromEntries(new FormData(form));
  const sources=new FormData(form).getAll("sources");
  const job=state.jobs.find(item=>item.id===data.jobId);
  const scopedJobs=job?[job]:(session.role==="Recruiter"?roleJobs("Recruiter").filter(item=>item.status==="Active"&&item.assignmentStatus==="Assigned"):state.jobs.filter(item=>item.status==="Active"));
  const jobContext=scopedJobs.flatMap(item=>[item.title,item.skills]).join(" ");
  const terms=[data.keywords,data.skills,jobContext].filter(Boolean).join(" ").toLowerCase().replace(/\b(and|or|not)\b|["()]/g," ").split(/[\s,]+/).filter(term=>term.length>2);
  const min=Number(data.minExperience)||0;
  const max=data.maxExperience?Number(data.maxExperience):Infinity;
  const minScore=Number(data.minScore)||0;
  const results=state.externalTalent.filter(profile=>{
    const text=`${profile.name} ${profile.role} ${profile.skills} ${profile.currentCompany} ${profile.education}`.toLowerCase();
    const termMatch=!terms.length||terms.some(term=>text.includes(term));
    const verified=!data.verifiedOnly||(!profile.email.startsWith("Available")&&!profile.phone.startsWith("Available"));
    return sources.includes(profile.source)&&termMatch&&profile.experience>=min&&profile.experience<=max&&profile.score>=minScore
      &&(!data.location||profile.location.toLowerCase().includes(data.location.toLowerCase()))
      &&(!data.availability||profile.availability===data.availability)
      &&(!data.company||profile.currentCompany.toLowerCase().includes(data.company.toLowerCase()))
      &&(!data.education||profile.education===data.education)&&verified;
  }).sort((a,b)=>b.score-a.score);
  state.aiSourcingResults=results.map(profile=>profile.id);
  state.sourcingSearches.unshift({id:`SRC-${Date.now()}`,time:"Just now",criteria:data,resultCount:results.length,sources});
  state.sourcingSearches=state.sourcingSearches.slice(0,20);
  save();render();toast(`${results.length} AI-matched profiles found for ${job?job.title:`${scopedJobs.length} ${session.role==="Recruiter"?"assigned":"active"} jobs`}`);
}
function showExternalProfile(id){
  const profile=state.externalTalent.find(item=>item.id===id);
  if(!profile)return;
  modal(`${profile.name} · ${profile.source}`,`<div class="candidate-resume-head">${person(profile.name,profile.role)}<div>${badge(profile.source)}${badge(`${profile.score}% AI match`)}${badge(`${profile.experience} years`)}</div></div>${miniResumeMarkup(profile,{external:true})}<div class="privacy-note">Profile data is marked as sourced from ${profile.source}. Confirm provider terms and candidate consent requirements before outreach.</div>`,`<button class="resume-pdf-link" id="view-external-resume">View complete resume ↗</button><button class="btn btn-secondary modal-close-2">Close</button><button class="btn btn-primary" id="import-profile-modal">Add to pipeline</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#view-external-resume").onclick=()=>viewResumePdf(profile);
  $("#import-profile-modal").onclick=()=>{closeModal();showPipelineAssignment(id)};
}
function showPipelineAssignment(id){
  const profile=state.externalTalent.find(item=>item.id===id);
  if(!profile)return;
  const selectedJobId=$("#ai-source-form [name='jobId']")?.value;
  const eligibleJobs=session.role==="Recruiter"?roleJobs("Recruiter").filter(item=>item.status==="Active"&&item.assignmentStatus==="Assigned"):state.jobs.filter(item=>item.status==="Active");
  if(!eligibleJobs.length){toast("No active job is available for this profile");return}
  const preferredJob=eligibleJobs.find(item=>item.id===selectedJobId)||eligibleJobs.find(item=>item.title===profile.role)||eligibleJobs[0];
  const companies=[...new Set(eligibleJobs.map(job=>job.client))].sort();
  modal(`Add ${profile.name} to pipeline`,`<form id="pipeline-assignment-form">
    <div class="pipeline-assignment-intro">${person(profile.name,`${profile.source} · ${profile.score}% AI match`)}<p>Select the company and job this resume should be associated with before continuing recruitment activity.</p></div>
    <div class="form-grid">
      <div class="field"><label>Company</label><select name="company" id="pipeline-company" required>${companies.map(company=>`<option ${company===preferredJob.client?"selected":""}>${esc(company)}</option>`).join("")}</select></div>
      <div class="field"><label>Job</label><select name="jobId" id="pipeline-job" required></select></div>
      <div class="field full"><label>Assignment note</label><textarea name="note" placeholder="Add sourcing notes or next actions (optional)"></textarea></div>
    </div>
    <div class="privacy-note">The resume will appear in the selected company and job pipeline for all linked users.</div>
  </form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="confirm-pipeline-assignment">Add to pipeline</button>`);
  const companySelect=$("#pipeline-company");
  const jobSelect=$("#pipeline-job");
  const updateJobs=()=>{
    const jobs=eligibleJobs.filter(job=>job.client===companySelect.value);
    jobSelect.innerHTML=jobs.map(job=>`<option value="${job.id}" ${job.id===preferredJob.id?"selected":""}>${job.id} · ${esc(job.title)} · ${esc(job.type)}</option>`).join("");
  };
  companySelect.onchange=updateJobs;
  updateJobs();
  $(".modal-close-2").onclick=closeModal;
  $("#confirm-pipeline-assignment").onclick=()=>{
    const form=$("#pipeline-assignment-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    const job=eligibleJobs.find(item=>item.id===data.jobId&&item.client===data.company);
    if(!job){toast("Select a valid company and job");return}
    importExternalProfile(id,job,data.note);
  };
}
function importExternalProfile(id,job,note=""){
  const profile=state.externalTalent.find(item=>item.id===id);
  if(!profile||!job)return;
  if(state.candidates.some(candidate=>candidate.sourceProfileId===profile.id&&candidate.jobId===job.id)){toast("This resume is already associated with the selected job");return}
  const candidate={id:nextId("CAN",state.candidates),name:profile.name,email:profile.email.startsWith("Available")?"Contact pending":profile.email,phone:profile.phone.startsWith("Available")?"Contact pending":profile.phone,jobId:job?.id||"",role:job?.title||profile.role,type:job?.type||"Permanent",client:job?.client||"Unassigned",recruiter:job?.recruiter||"",stage:"Sourced",score:profile.score,location:profile.location,notice:profile.availability,lastWorkingDate:lastWorkingDateFromNotice(profile.availability),reasonForLeaving:profile.reasonForLeaving||"Imported profile. Reason for leaving to be confirmed during recruiter screening.",ctc:"Not shared",skills:profile.skills,summary:profile.summary,experienceEntries:profile.experienceEntries,educationEntries:profile.educationEntries,source:profile.source,sourceProfileId:profile.id};
  candidate.sourcingNote=note;
  state.candidates.unshift(candidate);
  addAssignmentNotification({roles:["Admin","Recruiter"],recruiter:candidate.recruiter,client:candidate.client,message:`${candidate.name} was sourced from ${profile.source} and associated with ${job.client} · ${job.title}`});
  addAssignmentNotification({roles:["Client"],recruiter:candidate.recruiter,client:candidate.client,message:`A new sourced profile was added to ${job.title}`});
  save();closeModal();render();toast(`${profile.name} added to ${job.client} · ${job.title}`);
}
function showIntegrationForm(id=""){
  const existing=state.integrations.find(item=>item.id===id);
  modal(existing?`Configure ${existing.name}`:"Add custom API",`<form id="modal-form">${fields([
    {label:"Integration name",name:"name",value:existing?.name||"",required:!existing},
    {label:"API base URL",name:"endpoint",value:existing?.endpoint||"",placeholder:"https://api.provider.com/v1"},
    {label:"Authentication",name:"authType",type:"select",options:["API Key","Bearer Token","OAuth 2.0"],value:existing?.authType||"API Key"},
    {label:"API key / token",name:"apiKey",type:"password",placeholder:existing?.connected?"Enter a new key to replace the saved key":"Enter provider credential",required:!existing},
    {label:"Account / workspace ID",name:"accountId",value:existing?.accountId||"",required:false},
    {label:"Notes",name:"notes",type:"textarea",value:existing?.notes||"",full:true,required:false}
  ])}<div class="privacy-note">The demo saves only a masked key. A production connection requires server-side secret storage and provider-approved API access.</div></form>`,`<button class="btn btn-secondary modal-close-2">Cancel</button><button class="btn btn-primary" id="submit-modal">${existing?.connected?"Save connection":"Connect API"}</button>`);
  $(".modal-close-2").onclick=closeModal;
  $("#submit-modal").onclick=()=>{
    const form=$("#modal-form");if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    if(existing){
      Object.assign(existing,{endpoint:data.endpoint,authType:data.authType,accountId:data.accountId,notes:data.notes,connected:true,enabled:true,lastSync:"Just now"});
      if(data.apiKey)existing.apiKey=`••••••••••••${data.apiKey.slice(-4)}`;
      else existing.apiKey ||= "••••••••••••KEY";
    }else{
      const key=data.apiKey||"demo-key";
      state.integrations.push({id:`custom-${Date.now()}`,name:data.name,category:"Custom talent source",endpoint:data.endpoint,authType:data.authType,accountId:data.accountId,notes:data.notes,connected:true,enabled:true,apiKey:`••••••••••••${key.slice(-4)}`,lastSync:"Just now"});
    }
    save();closeModal();render();toast(`${data.name||existing.name} integration connected`);
  };
}
function downloadCsv(name,rows){const csv=rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=name;a.click();URL.revokeObjectURL(a.href);toast("Export downloaded")}

render();
