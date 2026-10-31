/*
  All portfolio content lives here, so updating the site means editing this file only.

  PROJECTS
    featured: true  -> shown as a large case study at the top of "Work"
    result          -> the headline number shown beside a featured project
    categories      -> used by the filter buttons (ids from CATEGORIES)

  CERTIFICATES
    group   -> one of the ids in CERT_GROUPS
    image   -> optional preview, e.g. "images/certs/ibm-python.webp" (click opens it large)
    verify  -> optional link to the issuer's verification page (e.g. coursera.org/verify/...)
    featured: true -> sorted to the front
*/

window.CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & ML" },
  { id: "data", label: "Data" },
  { id: "web", label: "Web & software" },
  { id: "systems", label: "Systems & networks" }
];

window.PROJECTS = [
  {
    featured: true,
    title: "Badira (بادرة): personalised, trustworthy pregnancy-complication risk prediction",
    course: "StartSmart Saudi University Challenge 2026 · with Judy Al-Imam",
    categories: ["ai"],
    problem:
      "Pregnancy-complication risk is different for every mother, and a prediction is only useful if clinicians and families can trust why it was made.",
    approach:
      "Over five days, Judy Al-Imam and I took Badira from an idea to a working prototype: an AI framework that predicts pregnancy-complication risk for each mother and is designed to be trustworthy. Alongside the model we worked through the product, the business model and the pitch.",
    outcome:
      "We presented Badira at the local judging stage of the challenge, organised by Community Jameel Saudi, and qualified for the next stage.",
    result: { value: "Next stage", label: "qualified after local judging, from idea to prototype in 5 days" },
    tech: ["Machine learning", "Healthcare AI", "Product development", "Business model", "Pitching"],
    link: null
  },
  {
    featured: true,
    title: "Early prediction of preeclampsia from multi-source maternal health data",
    course: "Machine Learning · Spring 2026",
    categories: ["ai", "data"],
    problem:
      "Preeclampsia is easier to manage when it is caught early, but clinical datasets are small, imbalanced and inconsistent with each other.",
    approach:
      "Trained and compared eight classifiers, including Random Forest, XGBoost and Gradient Boosting, across three independent clinical datasets. I deliberately stressed them with class imbalance (handled with SMOTE), label noise and feature drift, then improved them with tuning, feature selection and a soft-voting ensemble.",
    outcome:
      "Random Forest was the most robust model overall. Blood sugar, systolic blood pressure and hemoglobin came out as the strongest predictors.",
    result: { value: "0.951", label: "AUC, with 84.7% test accuracy" },
    tech: ["Python", "scikit-learn", "XGBoost", "SMOTE", "Pandas", "Matplotlib"],
    link: "https://github.com/DanaMounayer/CS4082-Machine-Learning-Project"
  },
  {
    featured: true,
    title: "Resilient heart-disease prediction pipeline on big data",
    course: "Big Data Analytics · Spring 2026",
    categories: ["ai", "data"],
    problem:
      "Hospital data is spread across sites, privacy-sensitive and often dirty, so a model trained in one clean place rarely survives the real world.",
    approach:
      "Built a PySpark pipeline that simulates several hospitals as separate data partitions. Kafka streams records in real time, and federated learning trains across hospitals without centralising patient data. I then attacked it with missing values, noise, label flipping and inconsistent records.",
    outcome:
      "Accuracy held at about 76% under adversarial stress, compared with about 78% on clean data.",
    result: { value: "76%", label: "accuracy under adversarial stress, vs 78% on clean data" },
    tech: ["PySpark", "Spark MLlib", "Kafka", "Federated learning", "Pandas", "NumPy"],
    link: "https://github.com/DanaMounayer/CS4074-Big-Data-Analytics-Project"
  },
  {
    featured: true,
    title: "AI-powered recycling bin that sorts waste with MobileNetV2",
    course: "Artificial Intelligence · Fall 2025",
    categories: ["ai"],
    problem:
      "Manual waste sorting is slow and error-prone, and mis-sorted items contaminate whole recycling batches.",
    approach:
      "Used transfer learning on MobileNetV2 to classify waste into plastic, paper, glass, metal and general trash in real time. Trained on TrashNet and added real-world photos so the model generalises beyond studio images.",
    outcome:
      "A lightweight model fast enough for an on-device bin, written up as a team research paper.",
    result: { value: "5", label: "waste classes sorted in real time" },
    tech: ["Python", "Computer vision", "Transfer learning", "CNNs"],
    link: "https://github.com/DanaMounayer/CS3081-Artificial-Intelligence-Project"
  },
  {
    title: "University network design and simulation",
    course: "Computer Networks · Spring 2025",
    categories: ["systems"],
    summary:
      "Designed a campus-level topology in Cisco Packet Tracer with routers, switches, subnetting and department-based segmentation, plus servers linking the LANs into a working campus WAN.",
    tech: ["Cisco Packet Tracer", "Subnetting", "Routing"],
    link: null
  },
  {
    title: "On The Go: drive-thru guide for Jeddah",
    course: "Web Application Development · Fall 2024",
    categories: ["web"],
    summary:
      "A full website that helps people find drive-thrus in Jeddah, with interactive JavaScript features and a database that stores user reviews and ratings.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    link: null
  },
  {
    title: "Interactive banking system",
    course: "Object Oriented Programming · Fall 2024",
    categories: ["web"],
    summary:
      "A Java desktop app with a GUI for opening accounts, transactions, balance checks and transfers, built on OOP principles with validation on every transaction.",
    tech: ["Java", "OOP", "Swing GUI"],
    link: null
  }
];

window.PAPERS = [
  {
    title: "Early prediction of preeclampsia using multi-source maternal health data",
    summary:
      "A multi-source ML framework evaluated under class imbalance, label noise and feature drift. Random Forest reached 84.7% accuracy and AUC 0.951.",
    link: "https://github.com/DanaMounayer/CS4082-Machine-Learning-Project",
    linkLabel: "View on GitHub"
  },
  {
    title: "AI-based waste sorting system",
    summary:
      "A smart recycling system that identifies and sorts five types of waste using transfer learning on MobileNetV2.",
    link: null
  },
  {
    title: "Memory management in modern operating systems",
    summary:
      "A comparative study of three recent memory systems (Carbink, Memstrata and BlackBox) and how each tackles reliability, performance and security.",
    link: null
  }
];

window.SKILLS = [
  { group: "Languages", items: [
    ["Python", "ML, big data and computer-vision projects"],
    ["Java", "Banking system, OOP coursework"],
    ["C++", "Data structures and algorithms"],
    ["JavaScript", "On The Go website, this portfolio"],
    ["SQL", "Review storage for On The Go"],
    ["PHP", "On The Go back end"],
    ["Lisp", "Programming Languages course"],
    ["HTML & CSS", "Every web project"]
  ]},
  { group: "AI, ML & data", items: [
    ["scikit-learn & XGBoost", "Preeclampsia prediction"],
    ["PySpark & Spark MLlib", "Heart-disease pipeline"],
    ["Kafka", "Real-time ingestion"],
    ["Transfer learning (CNNs)", "Recycling bin"],
    ["TensorFlow, Keras & PyTorch", "IBM AI Engineering, Deep Learning course"],
    ["Pandas, NumPy, Matplotlib", "Data cleaning and analysis"],
    ["Power BI", "Dashboards"]
  ]},
  { group: "Tools & systems", items: [
    ["Git & GitHub", "All projects"],
    ["Google Colab & Jupyter", "Model training"],
    ["Cisco Packet Tracer", "Campus network design"],
    ["VirtualBox", "Operating Systems labs"],
    ["Bootstrap", "Responsive layouts"],
    ["VS Code", "Daily editor"]
  ]}
];

/* Coursework, in the order it was taken. "now: true" marks the current semester. */
window.SEMESTERS = [
  { term: "Fall 2023", courses: ["Principles of Computing"] },
  { term: "Spring 2024", courses: ["Database Systems", "Advanced Programming"] },
  { term: "Fall 2024", courses: ["Object Oriented Programming", "Web Application Development", "Computer Architecture & Organization"] },
  { term: "Spring 2025", courses: ["Computer Networks", "Data Structures & Algorithms"] },
  { term: "Fall 2025", courses: ["Operating Systems", "Algorithm Analysis", "Programming Languages", "Artificial Intelligence"] },
  { term: "Spring 2026", courses: ["Software Engineering", "Machine Learning", "Data Science", "Big Data Analytics"] },
  { term: "Fall 2026", now: true, courses: ["Deep Learning", "Natural Language Processing"] }
];

window.CERT_GROUPS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI, data & programming" },
  { id: "competitions", label: "Competitions" },
  { id: "honors", label: "Academic honors" },
  { id: "volunteer", label: "Volunteering" }
];

window.CERTIFICATES = [
  /* Add your certificates here, for example:
  { group: "ai", title: "Python for Data Science, AI & Development", kind: "Course", issuer: "IBM",
    date: "Nov 2025", verify: "https://coursera.org/verify/XXXX", image: "images/certs/ibm-python.webp", featured: true },
  */
  { group: "ai", title: "IBM AI Engineering", kind: "Professional certificate", issuer: "IBM",
    date: "Oct 2026", verify: "https://coursera.org/verify/professional-cert/K5LST09LIFC3", image: "images/certs/ibm-ai-engineering.webp", featured: true },
  { group: "ai", title: "Neural Networks and Deep Learning", kind: "Course", issuer: "DeepLearning.AI",
    date: "Sep 2026", verify: "https://coursera.org/verify/EW4U8N12C9PZ", image: "images/certs/deeplearning-ai-nn-dl.webp", featured: true },
  { group: "ai", title: "Foundations: Data, Data, Everywhere", kind: "Course", issuer: "Google",
    date: "Sep 2025", verify: "https://coursera.org/verify/W9M9321IR47V", image: "images/certs/google-data-everywhere.webp" },
  { group: "competitions", title: "StartSmart Saudi University Challenge 2026: qualified for the next stage", kind: "Competition · team Badira", issuer: "Community Jameel Saudi", date: "2026", featured: true },
  { group: "honors", title: "President's List 2025–2026", kind: "Academic honor", issuer: "Effat University", date: "Sep 2026", featured: true },
  { group: "honors", title: "Dean's List 2024–2025", kind: "Academic honor", issuer: "Effat University", date: "Oct 2025", image: "images/certs/deans-list-2024-2025.webp" },
  { group: "honors", title: "Dean's List 2023–2024", kind: "Academic honor", issuer: "Effat University", date: "Oct 2024" },
  { group: "volunteer", title: "Iftar meal distribution 2025 (توزيع الفطور)", kind: "Volunteer certificate", issuer: "Joy of Youth", date: "Mar 2025" },
  { group: "volunteer", title: "Arzaq Ramadan food aid (أرزاق رمضان)", kind: "Volunteer certificate", issuer: "Mawakeb Alajer", date: "Mar 2025" }
];

/* Experience and volunteering, newest first. "image" is optional. */
window.EXPERIENCE = [
  {
    date: "2026",
    role: "Team member, Badira",
    org: "StartSmart Saudi University Challenge · Community Jameel Saudi",
    text: "Built an AI framework for pregnancy-complication risk prediction with Judy Al-Imam in a five-day bootcamp and challenge. Learned entrepreneurship, product development, business models and pitching, and qualified for the next stage after local judging."
  },
  {
    date: "Ramadan",
    role: "Volunteer",
    org: "Subha Community · Social services",
    text: "Helped organise and distribute iftar meals to people in need during Ramadan, and took part in outreach to support underserved communities.",
    image: "images/experience/subha-community.webp",
    imageAlt: "The Subha Community volunteer team in blue vests"
  },
  {
    date: "Mar 2025",
    role: "Volunteer",
    org: "Joy of Youth and Mawakeb Alajer",
    text: "Distributed iftar meals and Ramadan food aid (توزيع الفطور and أرزاق رمضان), with certificates from both organisations."
  },
  {
    date: "",
    role: "Volunteer",
    org: "Help Center Company · Children",
    text: "Volunteered with the Effat University team at the \u201cLet\u2019s Walk the Walk\u201d marathon supporting a children\u2019s cause."
  }
];
