/**
 * Seed script — populates the leadership collection.
 *
 * Run from the PROJECT ROOT:
 *   npx ts-node --esm scripts/seed-leadership.ts
 */

import * as dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

/* Resolve __dirname in ESM */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* Load .env.local BEFORE importing models */
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

import mongoose from "mongoose"
import Leadership from "../lib/models/leadership.js"

const leaders = [
  {
    name: "Dr. Alice Moyo",
    position: "President",
    department: "Executive Committee",
    image: "/images/leadership/alice-moyo.jpg",
    email: "president@zissa.org.zw",
    order: 1,
    biography:
      "Dr. Alice Moyo is a distinguished statistician with over 25 years of experience in official statistics, survey methodology, and data governance. She has served in advisory roles to the Government of Zimbabwe and multiple regional statistical bodies.",
    education: [
      { degree: "PhD Statistics", institution: "University of Cape Town, South Africa", year: "2001", honours: "With Distinction" },
      { degree: "MSc Applied Statistics", institution: "University of Zimbabwe", year: "1996" },
      { degree: "BSc (Hons) Mathematics & Statistics", institution: "University of Zimbabwe", year: "1993", honours: "First Class" },
    ],
    workExperience: [
      { title: "Director General", organisation: "Zimbabwe National Statistics Agency (ZIMSTAT)", period: "2015 – 2022", description: "Led national census design, data collection operations, and publication of official statistical releases." },
      { title: "Senior Survey Statistician", organisation: "African Development Bank, Abidjan", period: "2008 – 2015", description: "Designed household survey frameworks across 12 member states." },
      { title: "Principal Statistician", organisation: "ZIMSTAT", period: "2001 – 2008" },
    ],
    research: [
      { title: "Bayesian Approaches to Small-Area Estimation in Sub-Saharan Africa", journal: "African Statistical Journal", year: "2019", doi: "10.1234/asj.2019.12", type: "publication" },
      { title: "Improving Census Coverage in Conflict-Affected Regions", journal: "Journal of Official Statistics", year: "2014", type: "publication" },
      { title: "National Data Governance Framework for Zimbabwe", year: "2021", type: "project" },
    ],
    consultancy: [
      { project: "National Household Income & Expenditure Survey", client: "World Bank", period: "2020", description: "Lead methodological consultant for the redesign of sampling frames." },
      { project: "SADC Regional Statistics Harmonisation Initiative", client: "Southern African Development Community", period: "2017 – 2019" },
    ],
    volunteerWork: [
      { role: "Board Member", organisation: "International Statistical Institute (ISI)", period: "2018 – present", description: "Representing African statistical interests on the ISI Council." },
      { role: "Mentor", organisation: "African Women in Statistics Network", period: "2016 – present" },
    ],
    socialLinks: { linkedin: "https://linkedin.com/in/alice-moyo", orcid: "https://orcid.org/0000-0001-2345-6789" },
  },
  {
    name: "Mr. Tendai Ncube",
    position: "Vice President",
    department: "Executive Committee",
    image: "/images/leadership/tendai-ncube.jpg",
    email: "vicepresident@zissa.org.zw",
    order: 2,
    biography: "Mr. Tendai Ncube is an econometrician and policy analyst specialising in macroeconomic modelling, labour market statistics, and financial sector data.",
    education: [
      { degree: "MSc Econometrics", institution: "University of Pretoria, South Africa", year: "2006" },
      { degree: "BSc Economics & Statistics", institution: "National University of Science and Technology (NUST)", year: "2003", honours: "Upper Second Class" },
    ],
    workExperience: [
      { title: "Chief Economist", organisation: "Reserve Bank of Zimbabwe", period: "2016 – present", description: "Responsible for macroeconomic modelling and monetary policy research." },
      { title: "Senior Economic Analyst", organisation: "Zimbabwe Revenue Authority (ZIMRA)", period: "2009 – 2016" },
      { title: "Research Officer", organisation: "Ministry of Finance, Zimbabwe", period: "2006 – 2009" },
    ],
    research: [
      { title: "Inflation Dynamics and Monetary Policy Transmission in Zimbabwe", journal: "Journal of African Economies", year: "2020", type: "publication" },
      { title: "Labour Market Structural Change Post-Hyperinflation", year: "2018", type: "conference" },
    ],
    consultancy: [
      { project: "Fiscal Space Assessment", client: "International Monetary Fund (IMF)", period: "2021" },
      { project: "Private Sector Development Strategy", client: "United Nations Development Programme (UNDP)", period: "2018 – 2019" },
    ],
    volunteerWork: [
      { role: "Treasurer", organisation: "Zimbabwe Economics Society", period: "2014 – 2020" },
      { role: "Guest Lecturer", organisation: "NUST Department of Economics", period: "2012 – present", description: "Annual lecture series on applied econometric methods." },
    ],
    socialLinks: { linkedin: "https://linkedin.com/in/tendai-ncube", researchgate: "https://researchgate.net/profile/Tendai-Ncube" },
  },
  {
    name: "Ms. Rutendo Chirwa",
    position: "Secretary General",
    department: "Executive Committee",
    image: "/images/leadership/rutendo-chirwa.jpg",
    email: "secretary@zissa.org.zw",
    order: 3,
    biography: "Ms. Rutendo Chirwa is a biostatistician and public-health researcher with expertise in clinical trial design, health management information systems, and epidemiological surveillance.",
    education: [
      { degree: "MSc Biostatistics", institution: "London School of Hygiene & Tropical Medicine, UK", year: "2010", honours: "With Merit" },
      { degree: "BSc Statistics", institution: "University of Zimbabwe", year: "2007", honours: "First Class" },
    ],
    workExperience: [
      { title: "Head of Data Science", organisation: "Ministry of Health and Child Care, Zimbabwe", period: "2018 – present", description: "Oversees the national health data warehouse and disease surveillance dashboards." },
      { title: "Biostatistician", organisation: "Clinton Health Access Initiative (CHAI), Harare", period: "2013 – 2018" },
      { title: "Data Manager", organisation: "UNICEF Zimbabwe", period: "2010 – 2013" },
    ],
    research: [
      { title: "Spatial Analysis of Under-5 Mortality in Rural Zimbabwe", journal: "BMC Public Health", year: "2021", doi: "10.1186/bmc.2021.14", type: "publication" },
      { title: "Challenges in Routine Health Information Systems in Low-Income Settings", journal: "Global Health: Science and Practice", year: "2016", type: "publication" },
    ],
    consultancy: [
      { project: "PEPFAR Programme Evaluation", client: "US Centers for Disease Control and Prevention (CDC)", period: "2019 – 2020" },
      { project: "Malaria Indicator Survey Statistical Support", client: "World Health Organisation (WHO)", period: "2017" },
    ],
    volunteerWork: [
      { role: "Chairperson", organisation: "Zimbabwe Public Health Association", period: "2020 – present" },
      { role: "Science Communication Volunteer", organisation: "AfricaScience Media Centre", period: "2015 – present" },
    ],
    socialLinks: { linkedin: "https://linkedin.com/in/rutendo-chirwa", orcid: "https://orcid.org/0000-0003-9876-5432" },
  },
  {
    name: "Prof. Dumisani Mhlanga",
    position: "Treasurer",
    department: "Executive Committee",
    image: "/images/leadership/dumisani-mhlanga.jpg",
    email: "treasurer@zissa.org.zw",
    order: 4,
    biography: "Professor Dumisani Mhlanga holds the Chair of Applied Statistics at NUST and is a fellow of the Royal Statistical Society. His research focuses on actuarial science, risk modelling, and financial data analytics for emerging markets.",
    education: [
      { degree: "PhD Actuarial Science", institution: "University of Waterloo, Canada", year: "2003" },
      { degree: "MSc Statistics", institution: "University of Zimbabwe", year: "1998" },
      { degree: "BSc (Hons) Actuarial Science", institution: "NUST", year: "1995", honours: "First Class" },
    ],
    workExperience: [
      { title: "Professor & Chair of Applied Statistics", organisation: "National University of Science and Technology (NUST)", period: "2010 – present", description: "Leads undergraduate and postgraduate statistics programmes; supervises PhD candidates." },
      { title: "Associate Professor", organisation: "NUST", period: "2006 – 2010" },
      { title: "Consulting Actuary", organisation: "Old Mutual Zimbabwe", period: "2003 – 2006" },
    ],
    research: [
      { title: "Stochastic Mortality Modelling for Sub-Saharan Africa", journal: "Insurance: Mathematics and Economics", year: "2018", type: "publication" },
      { title: "Credit Risk in Microfinance: A Copula Approach", journal: "African Finance Journal", year: "2015", type: "publication" },
      { title: "Machine Learning for Insurance Fraud Detection", year: "2022", type: "project" },
    ],
    consultancy: [
      { project: "National Social Security Authority Actuarial Review", client: "National Social Security Authority (NSSA)", period: "2020 – 2021" },
      { project: "Financial Inclusion Data Strategy", client: "Alliance for Financial Inclusion (AFI)", period: "2019" },
    ],
    volunteerWork: [
      { role: "Fellow", organisation: "Royal Statistical Society (RSS)", period: "2005 – present" },
      { role: "Examiner", organisation: "Institute and Faculty of Actuaries (IFoA)", period: "2012 – 2019" },
    ],
    socialLinks: { researchgate: "https://researchgate.net/profile/Dumisani-Mhlanga", orcid: "https://orcid.org/0000-0002-1111-2222" },
  },
]

async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("❌  MONGODB_URI is not defined in .env.local")
    process.exit(1)
  }

  console.log("🔌  Connecting to MongoDB…")
  await mongoose.connect(uri)
  console.log("✅  Connected")

  await Leadership.deleteMany({})
  console.log("🗑️   Cleared existing leadership records")

  const inserted = await Leadership.insertMany(leaders)
  console.log(`✅  Seeded ${inserted.length} leadership records`)

  await mongoose.disconnect()
  console.log("👋  Done — disconnected from MongoDB")
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err)
  process.exit(1)
})