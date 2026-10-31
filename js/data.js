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
    title: "Badira (بادرة): a preeclampsia early-awareness app",
    course: "StartSmart Saudi University Challenge · Sep–Nov 2026 · with Judy Al-Imam",
    categories: ["ai", "web"],
    problem:
      "Preeclampsia is often recognised late, and a single risk score doesn't tell a mother how far to trust it or when to act.",
    approach:
      "We built a bilingual Arabic/English web app that raises early awareness of preeclampsia among Saudi and Arab women. I designed a Risk × Reliability × Time framework that shows screening priority, data completeness and pregnancy-stage timing as three separate readings instead of one opaque score.",
    outcome:
      "A working prototype that produces a structured summary to share with a healthcare provider. We qualified for the next stage after local judging and received a Certificate of Appreciation.",
    result: { value: "3 readings", label: "risk, reliability and timing, instead of one opaque score" },
    tech: ["Web app", "Arabic / English", "Risk framework", "Healthcare AI", "Pitching"],
    link: "https://github.com/DanaMounayer/Start-Smart-Badira"
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
      "84.85% accuracy on clean data, and the pipeline degraded gracefully under attack: the worst case, 5% label poisoning, still reached 81.9%. Federated training converged in five rounds.",
    result: { value: "84.85%", label: "accuracy on clean data, never dropping more than 3 points under attack" },
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
    title: "Smart wearable system for seizure monitoring and emergency response",
    course: "Software Engineering · CS3151",
    categories: ["ai", "web"],
    summary:
      "Designed a mobile app connected to wearable sensors (EEG, heart rate, motion) for real-time, AI-based seizure detection and alerts, with a layered, modular architecture using MVC and Observer patterns, targeting alerts in under 5 seconds and 99% reliability.",
    tech: ["Mobile app", "Wearable sensors", "MVC", "Observer pattern", "Real-time alerts"],
    link: null
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
  }
];

/* Research papers. "image" is a figure from the paper; "file" is the PDF in /papers. */
window.PAPERS = [
  {
    course: "Machine Learning · CS4082", term: "Spring 2026",
    title: "Early prediction of preeclampsia using multi-source maternal health data",
    finding: "Eight classifiers stress-tested under imbalance, label noise and drift. Random Forest reached 84.7% accuracy and AUC 0.951.",
    authors: "with Sedra Al Jundi and Jwdee Al Amam",
    image: "images/papers/preeclampsia.webp", file: "papers/early-prediction-of-preeclampsia.pdf"
  },
  {
    course: "Big Data Analytics · CS4074", term: "Spring 2026",
    title: "Resilient AI pipeline for heart-disease prediction under adversarial big-data conditions",
    finding: "A PySpark and Kafka pipeline across three simulated hospitals: 84.85% accuracy, losing at most 3 points under attack, with federated learning converging in five rounds.",
    authors: "with Sara Imran",
    image: "images/papers/heart-disease.webp", file: "papers/resilient-heart-disease-pipeline.pdf"
  },
  {
    course: "Data Science · CS3072", term: "Spring 2026",
    title: "Data-driven analysis of EEG signals for epileptic seizure detection",
    finding: "EEG recordings reframed as seizure vs. non-seizure classification. Random Forest detected seizures with 97.4% accuracy.",
    authors: "with Jwdee Al Amam",
    image: "images/papers/eeg-seizure.webp", file: "papers/eeg-seizure-detection.pdf"
  },
  {
    course: "Research Methods · GSEM 201", term: "",
    title: "AI-powered smart recycling bin for sustainable waste management in Saudi Arabia",
    finding: "MobileNetV2 trained on TrashNet plus photos from public places in Saudi Arabia, reaching 78.24% accuracy across five waste classes in real-world conditions.",
    authors: "with Raghad Shamma and Jana Al Ayoobi",
    image: "images/papers/recycling-bin.webp", file: "papers/smart-recycling-bin-saudi-arabia.pdf"
  },
  {
    course: "Review paper", term: "2025–2026",
    title: "Impact of AI and machine learning in gynecology",
    finding: "A review of AI across risk prediction, diagnostic imaging, precision medicine and surgical support, and the ethics of bringing it into care.",
    authors: "",
    image: "images/papers/gynecology.webp", file: "papers/impact-of-ai-in-gynecology.pdf"
  }
];

/* Skills are drawn as a small neural network: each group is one layer. */
window.SKILLS = [
  { layer: "Input", group: "Languages", items: ["Python", "C++", "Java", "JavaScript", "SQL", "PHP"] },
  { layer: "Hidden", group: "Machine learning & data", items: ["scikit-learn", "XGBoost", "Feature engineering", "Ensembles", "PySpark", "Kafka", "Pandas & NumPy"] },
  { layer: "Hidden", group: "Deep learning & generative AI", items: ["PyTorch", "TensorFlow", "Keras", "Transfer learning", "Hugging Face", "LangChain & RAG", "LLM fine-tuning"] },
  { layer: "Output", group: "Building & tools", items: ["HTML & CSS", "Bootstrap", "Git & GitHub", "Jupyter & Colab", "Claude Code", "Packet Tracer"] }
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
  { id: "ai", label: "Technical courses" },
  { id: "competitions", label: "Competitions" },
  { id: "honors", label: "Academic honors" },
  { id: "volunteer", label: "Volunteering & community" }
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
  { group: "ai", title: "Anthropic Academy", kind: "4 certificates", issuer: "Anthropic",
    date: "Apr 2026",
    note: "Claude 101, Claude Code 101, Claude Code in Action, Introduction to Claude Cowork",
    images: [
      { src: "images/certs/anthropic-claude-101.webp", caption: "Claude 101" },
      { src: "images/certs/anthropic-claude-code-101.webp", caption: "Claude Code 101" },
      { src: "images/certs/anthropic-claude-code-in-action.webp", caption: "Claude Code in Action" },
      { src: "images/certs/anthropic-intro-claude-cowork.webp", caption: "Introduction to Claude Cowork" }
    ] },
  { group: "ai", title: "User-facing trends 2025 (ترندات واجهة المستخدم)", kind: "Course · 1 hour", issuer: "NMKKN (نمكّن)",
    date: "Oct 2025", image: "images/certs/nmkkn-ui-trends-2025.webp" },
  { group: "ai", title: "Foundations: Data, Data, Everywhere", kind: "Course", issuer: "Google",
    date: "Sep 2025", verify: "https://coursera.org/verify/W9M9321IR47V", image: "images/certs/google-data-everywhere.webp" },
  { group: "competitions", title: "StartSmart Saudi University Challenge: Certificate of Appreciation (team Badira)", kind: "Competition", issuer: "Community Jameel Saudi & Start Smart Saudi", date: "Nov 2026", featured: true },
  { group: "honors", title: "President's List 2025–2026", kind: "Academic honor", issuer: "Effat University", date: "Sep 2026", featured: true },
  { group: "honors", title: "Dean's List 2024–2025", kind: "Academic honor", issuer: "Effat University", date: "Oct 2025", image: "images/certs/deans-list-2024-2025.webp" },
  { group: "honors", title: "Dean's List 2023–2024", kind: "Academic honor", issuer: "Effat University", date: "Oct 2024" },
  { group: "volunteer", title: "Summer camp assistant: Certificate of Appreciation", kind: "240 hours", issuer: "Manara Sports Academy",
    date: "Aug 2026", image: "images/certs/msa-summer-camp-2026.webp" },
  { group: "volunteer", title: "Iftar meal distribution 2025 (توزيع الفطور)", kind: "Volunteer · 4 hours", issuer: "Joy of Youth",
    date: "Mar 2025", image: "images/certs/joy-of-youth-iftar-2025.webp" },
  { group: "volunteer", title: "Preparing Ramadan food baskets (أرزاق رمضان)", kind: "Volunteer · 4h 40m", issuer: "Mawakeb Alajer Endowment",
    date: "Mar 2025", image: "images/certs/mawakeb-alajer-arzaq-2025.webp" }
];

/* Work and competitions, newest first. */
window.EXPERIENCE = [
  {
    date: "Sep–Nov 2026",
    role: "Team member, Badira",
    org: "StartSmart Saudi University Challenge · Community Jameel Saudi",
    text: "Took Badira from idea to working prototype with Judy Al-Imam through a bootcamp and challenge, learning entrepreneurship, product development, business models and pitching. We qualified for the next stage after local judging."
  },
  {
    date: "Summer 2026",
    role: "Summer camp assistant",
    org: "Manara Sports Academy (MSA) Summer Camp",
    text: "Gave 240 hours helping supervise and run daily sports and recreational activities for children, and received a Certificate of Appreciation."
  }
];

/* Volunteering cards. The first image is the cover; all images open in the viewer. */
window.VOLUNTEERING = [
  {
    org: "Help Center Company",
    cause: "Children",
    date: "Dec 2025",
    text: "Volunteered with the Effat University team at the \u201cLet\u2019s Walk the Walk\u201d marathon, cheering on the young runners along the route.",
    images: [
      { src: "images/experience/help-center-marathon.webp", caption: "High-fiving a young runner at the marathon" },
      { src: "images/experience/help-center-team.webp", caption: "The Effat University volunteer team" }
    ]
  },
  {
    org: "Subha Community",
    cause: "Social services",
    date: "Mar 2025",
    text: "Helped organise and distribute iftar meals to people in need, and took part in outreach to underserved communities.",
    images: [{ src: "images/experience/subha-community.webp", caption: "The Subha Community volunteer team" }]
  },
  {
    org: "Joy of Youth",
    cause: "Ramadan iftar campaign",
    date: "Mar 2025",
    hours: "4 hours",
    text: "Distributed iftar meals in the 2025 Ramadan campaign (توزيع الفطور).",
    images: [
      { src: "images/experience/joy-of-youth.webp", caption: "Joy of Youth volunteers" },
      { src: "images/certs/joy-of-youth-iftar-2025.webp", caption: "Joy of Youth volunteer certificate" }
    ]
  },
  {
    org: "Mawakeb Alajer Endowment",
    cause: "Ramadan food baskets",
    date: "Mar 2025",
    hours: "4h 40m",
    text: "Prepared Ramadan food baskets (أرزاق رمضان) at the endowment's headquarters.",
    images: [{ src: "images/certs/mawakeb-alajer-arzaq-2025.webp", caption: "Mawakeb Alajer volunteer certificate" }]
  }
];
