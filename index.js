const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
const app = express();
const PORT = 8000;
const UPLOADS_FOLDER = "./uploads/";
dotenv.config();
const puppeteer = require("puppeteer");

const generatePDF = async (html = "") => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    path: "./public/pdf/sample2.pdf",
    format: "A4",
    margin: {
      top: "20px",
      right: "60px",
      bottom: "20px",
      left: "60px",
    },
  });

  await page.close();
  await browser.close();

  return pdfBuffer;
};

const upload = multer({
  dest: UPLOADS_FOLDER,
});

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "jkkniu",
//   password: "jkkniu",
//   database: "jkkniu",
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

app.get("/", (req, res) => {
  res.send("MY SERVER IS RUNNING");
});
app.post("/", (req, res) => {
  res.send("MY SERVER IS RUNNING");
});

app.post("/application", async (req, res, next) => {
  const pdf = await generatePDF(`
      <html>
        <head>
          <title>Test PDF</title>
          <style>
          *{
            margin:0px;
            padding:0px;
          }
          body{
           
          }
          img{
            width: 90px;
            margin-left: 10px
          }
          .header{
            display: flex;
            align-items: center;
            background-color: rgba(0,0,0,.01);
          }
          .side-header{
            width:15%;
          }
          .header-content{
            text-align: center;
            width: 70%
          }
          .header-content h4{
            font-size: 24px; 
            text-align: center;
            margin-bottom:5px;
          }
          .header-content p{
            font-weight: 500;
          }
          .header-bottom{
            text-align: center
          }
          .header-bottom h4{
            font-size: 18px;
            text-align: center;
            margin-bottom:5px;
          }
          .header-bottom h6{
            fontSize: 18px;
            textAlign: center;
            margin-bottom:5px;
          }
          .main-container{
            
          }
          .field-container{
            display: flex;
            align-items: center;
            text-align: left;
            margin-bottom: 15px;
          }
          .field-left{
            width: 50%;
          }
          .field-left h6{
            font-size: 16px;
            font-weight:400
          }
          .field-right{
            width: 50%; 
            padding-left: 10px;
           
          }
          .field-right h6{
            font-size: 16px;
            font-weight:400;
          }
          .group-heading{
            margin-bottom: 15px;
            margin-top:10px;
            font-size: 16px;
            font-weight:400
          }
          .group-left{
            width: 25%;
          }
          .group-middle{
            width: 25%;
          }
          .group-middle h6{
            font-size: 16px;
            font-weight:400
          }
          .group-right{
            padding-left:10px;
            width:50%;
          }
          .group-right h6{
            font-size: 16px;
            font-weight:400
          }
          table{
            margin-bottom:20px;
          }
          .spacer{
            margin-top:30px;
          }
          th{
            font-size:16px;
            font-weight:400;
          }
          td{
            padding:5px;
          }
          </style>
        </head>
        <body>
        <div style={{ width: "100%", boxSizing: "border-box" }} id="divToPrint">
        <div
          class="header"
        >
          <div class="side-header">
            <img
              src="https://jkkniu.edu.bd/wp-content/themes/jkkniu/images/jkkniu/logo3.png"
            ></img>
          </div>
          <div class="header-content">
            <h4>
              জাতীয় কবি কাজী নজরুল ইসলাম বিশ্ববিদ্যালয়
            </h4>
            <p>ত্রিশাল, ময়মনসিংহ</p>
          </div>
          <div class="side-header"></div>
        </div>

        <div class="header-bottom">
          <h4>
            (আবেদন ফর্ম)
          </h4>
          <h6>
            ${req.body.departmentName} বিভাগের ${req.body.postName} পদের
            জন্য
          </h6>
          <h4
            style={{ fontSize: "24px", textAlign: "center", fontWeight: "500" }}
          >
            আবেদন পত্র
          </h4>
        </div>
        <div class="spacer"></div>
        <div class="main-container">
          <div
          class="field-container"
          >
            <div class="field-left">
              <h6>
                ০১ । নাম
              </h6>
            </div>
            <div class="field-right">
             <h6>: ${req.body.name}</h6>
            </div>
          </div>
          <div
          class="field-container"
          >
            <div class="field-left">
              <h6>
                ০২ । পিতা/স্বামীর নাম
              </h6>
            </div>
            <div class="field-right">
              <h6>: ${req.body.gurdian}</h6>
            </div>
          </div>
          <div
          class="field-container"
          >
            <div class="field-left">
              <h6>
                ০৩ । মাতার নাম
              </h6>
            </div>
            <div class="field-right">
              <h6>
                : ${req.body.motherName}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ০৪ । জন্ম তারিখ
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.birthdate}
             </h6>
            </div>
          </div>
          <h6
          class="group-heading"
          >
            ০৫ । বর্তমান ঠিকানা
          </h6>
          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              >
              ক) গ্রাম
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.presentVillage}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
              খ) ডাকঘর
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.presentPostOffice}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
              গ) উপজেলা
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.presentUpazilla}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
               
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
              ঘ) জেলা
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.presentZilla}
              </h6>
            </div>
          </div>

          <h6
          class="group-heading"
          >
            ০৬ । স্থায়ী ঠিকানা
          </h6>
          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
               
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
              ক) গ্রাম
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.parmanentVillage}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                খ) ডাকঘর
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.parmanentPostOffice}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                গ) উপজেলা
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.parmanentUpazilla}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
               
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                ঘ) জেলা
              </h6>
            </div>
            <div class="group-right">
             <h6>
               : ${req.body.parmanentZilla}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ০৭ । মোবাইল/ফোন নম্বর
              </h6>
            </div>
            <div class="field-right">
             <h6>: ${req.body.mobile}</h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ০৮ । ই-মেইল
              </h6>
            </div>
            <div class="field-right">
             <h6>: ${req.body.email}</h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ০৯ । বিবাহিত
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.isMarried}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ১০ । জাতীয়তা
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.nationality}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ১১ । ধর্ম
              </h6>
            </div>
            <div class="field-right">
             <h6>
               :  ${req.body.religion}
              </h6>
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <table border="1"
              style={{ fontSize: "12px", tableLayout: "fixed", width: "100%" }}
            >
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  স্কুল/কলেজ/বিশ্ববিদ্যালয়
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  বয়স অতিবাহিত সাল হতে __ সাল পর্যন্ত
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  পরীক্ষার নাম
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  বিভাগ/শ্রেনী/গ্রেড
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  সাল
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  অধীত বিষয়
                </th>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationInstitute1}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.passedEducationYear1}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationExamName1}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationGrade1}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationYear1}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.learnedTopic1}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationInstitute2}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.passedEducationYear2}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationExamName2}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationGrade2}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationYear2}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.learnedTopic2}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationInstitute3}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.passedEducationYear3}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationExamName3}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationGrade3}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.educationYear3}
                </td>
                <td
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    border: "1px solid #dddddd",
                    verticalAlign: "top",
                  }}
                >
                  ${req.body.learnedTopic3}
                </td>
              </tr>
            </table>
          </div>
          <div style={{ padding: "15px" }}></div>
          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ১২ । কোনো বিশেষ প্রতিষ্ঠানে অধ্যয়ন ও বিশেষ বিষয়ে পাঠ গ্রহণ
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.specialInstituteSubject}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ১৩ । দক্ষতা অনুসারে ভাষা বিবরণ
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.languageExpert}
              </h6>
            </div>
          </div>

          <h6
          class="group-heading"
          >
            ১৪ । প্রকাশিত প্রবন্ধ
          </h6>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div  class="group-middle">
              <h6
             
              >
                ক) প্রবন্ধের নাম
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.articleName}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                খ) প্রবন্ধ প্রকাশিত জার্নালের নাম
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.journalName}
              </h6>
            </div>
          </div>

          <h6
          class="group-heading"
          >
            ১৫ । শিক্ষাদানের অভিজ্ঞতা
          </h6>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                ক) সরকারী/আধাসরকারী/স্বায়ত্বশাসিত প্রতিষ্ঠান
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.teachingInstitute}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                খ) মোট চাকুরিকাল
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.totalTenure}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                গ) বর্তমান পদ ( চাকুরিকাল, বেতন স্কেল, প্রতিষ্ঠান)
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.currentPosition}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                ঘ) সর্বমোট চাকুরিকাল
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.allTotalTenure}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div  class="group-middle">
              <h6
             
              >
                ঙ) যেসব ক্লাসে ও বিষয়ে অধ্যাপনা করা হয়েছে তার বিবরণ
              </h6>
            </div>
            <div class="group-right">
             <p>
                : ${req.body.taughtSubjectDescription}
              </p>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ১৬ । কোনো বিশ্ববিদ্যালয়/শিক্ষা প্রতিষ্ঠান বা অন্য কোনো
                প্রতিষ্ঠানে কোনো নির্ধারিত সময়ের জন্য চাকুরি করতে বাধ্য কিনা?
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.forcedToWorkTime}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="field-left">
              <h6>
                ১৭ । চাকুরি গ্রহণে ইস্পিত বেতন
              </h6>
            </div>
            <div class="field-right">
             <h6>
                : ${req.body.steelSalary}
              </h6>
            </div>
          </div>

          <h6
          class="group-heading"
          >
            ১৮ । আপনার পরিচিত কিন্তু জন্মগত বা বৈবাহিক সূত্রে আত্নীয় নন এমন দুজন
            ব্যক্তির নাম ও ঠিকানা (মোবাই/ফোন নম্বর সহ) যাদের কাছ থেকে আপনার
            যোগ্যতা সম্বন্ধে তথ্য পাওয়া যাবে
          </h6>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                ক) ব্যক্তি
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.familierPerson1}
              </h6>
            </div>
          </div>

          <div
            class="field-container"
          >
            <div class="group-left">
              <h6
                style={{
                  marginBottom: "0px",
                  fontSize: "16px",
                }}
              ></h6>
            </div>
            <div class="group-middle">
              <h6
              
              >
                খ) ব্যক্তি
              </h6>
            </div>
            <div class="group-right">
             <h6>
                : ${req.body.familierPerson2}
              </h6>
            </div>
          </div>
        </div>
      </div>
        </body>
      </html>
    `);
  res.send("DONE");
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS RUNNING ON ${process.env.PORT}`);
});
