// Generates a clean single-page resume PDF for the site download.
// Hand-built with computed xref offsets — no external dependencies.
import { writeFileSync, mkdirSync } from "node:fs";

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const ops = [];
let Y = 756;
const text = (x, y, size, str, font = 1, gray = 0) => {
  ops.push(`BT ${gray} ${gray} ${gray} rg /F${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(str)}) Tj ET`);
};
const accentText = (x, y, size, str, font = 2) => {
  ops.push(`BT 0.05 0.35 0.55 rg /F${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(str)}) Tj ET`);
};
const rule = (y) => ops.push(`0.75 0.85 0.95 RG 0.7 w 56 ${y} m 556 ${y} l S`);
const bullet = (x, y, str, size = 9.5) => text(x + 10, y, size, "-  " + str);

// ---- header ----
text(56, Y, 21, "SATHISH KUMAR M", 2); Y -= 17;
accentText(56, Y, 10.5, "Computer Science Engineering Student  |  Aspiring Software Developer  |  AI & Full-Stack Enthusiast"); Y -= 14;
text(56, Y, 9, "Email: mksathish64@gmail.com", 1, 0.25); Y -= 12;
text(56, Y, 9, "LinkedIn: linkedin.com/in/sathishkumar-m-708000329    GitHub: profile link to be added", 1, 0.25); Y -= 20;

const section = (title) => {
  accentText(56, Y, 11.5, title.toUpperCase());
  Y -= 5; rule(Y); Y -= 14;
};

// ---- profile ----
section("Profile");
text(56, Y, 9.5, "Third-year B.E. Computer Science and Engineering student interested in software development and emerging", 1, 0.15); Y -= 12;
text(56, Y, 9.5, "technologies. Enjoys exploring programming concepts, developing applications, solving logical problems and", 1, 0.15); Y -= 12;
text(56, Y, 9.5, "continuously improving technical skills through practical projects.", 1, 0.15); Y -= 20;

// ---- education ----
section("Education");
text(56, Y, 10, "B.E. Computer Science and Engineering  (2024 - 2028)", 2); text(470, Y, 9.5, "CGPA: 9.0/10", 2); Y -= 12;
text(66, Y, 9, "PSNA College of Engineering and Technology - currently in third year", 1, 0.3); Y -= 14;
text(56, Y, 10, "HSC - Sai Ram Matric Higher Secondary School  (2024)", 2); text(505, Y, 9.5, "92%", 2); Y -= 14;
text(56, Y, 10, "SSLC - Sai Ram Matric Higher Secondary School  (2022)", 2); text(505, Y, 9.5, "90%", 2); Y -= 20;

// ---- skills ----
section("Technical Skills");
text(56, Y, 9.5, "Programming Languages: ", 2); text(172, Y, 9.5, "C , Java , Python", 1, 0.15); Y -= 13;
text(56, Y, 9.5, "Web Technologies: ", 2); text(157, Y, 9.5, "HTML , CSS", 1, 0.15); Y -= 13;
text(56, Y, 9.5, "Tools & Platforms: ", 2); text(160, Y, 9.5, "VS Code, Git & GitHub , Linux ", 1, 0.15); Y -= 13;
text(56, Y, 9.5, "Concepts: ", 2); text(121, Y, 9.5, "OOP Concepts , Data Structures (Arrays and Strings)", 1, 0.15); Y -= 13;
text(56, Y, 9.5, "Soft Skills: ", 2); text(126, Y, 9.5, "Problem Solving, Teamwork & Collaboration, Time Management, Adaptability, Self-Motivation", 1, 0.15); Y -= 20;

// ---- projects ----
section("Projects");
const projects = [
  ["Fruit CNN Classifier", "CNN-based image classification app - Apple / Mango / Orange. Python, TensorFlow, HTML, CSS, JavaScript."],
  ["Student Management System", "Java application to manage student details using object-oriented programming concepts."],
  ["JavaFX Desktop Application", "GUI-based desktop application exploring UI components and event handling."],
  ["To-Do List API", "RESTful CRUD API in Python, endpoints tested with Postman."],
  ["Student Alarm & Reminder App", "Android alarm and reminder application built with Java."],
];
for (const [t, d] of projects) {
  text(56, Y, 9.5, t, 2); Y -= 12;
  bullet(56, Y, d); Y -= 15;
}
Y -= 5;

// ---- certifications ----
section("Certifications & Learning");
const certs = [
  "Java Programming - Oracle Academy",
  "Python Programming - Cisco Academy",
  "Android Development - Student Alarm & Reminder Application",
  "JavaFX Application Development",
  "Web Development / API Testing - To-Do List API using Python and Postman",
];
for (const c of certs) { bullet(56, Y, c); Y -= 13; }
Y -= 10;
text(56, Y, 8, "Portfolio: sathishkumar-m  |  Generated from the interactive Skills Factory portfolio.", 1, 0.45);

// ---- assemble PDF ----
const content = ops.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefPos = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

mkdirSync("public", { recursive: true });
writeFileSync("public/Sathish_Kumar_M_Resume.pdf", pdf, "latin1");
console.log("Wrote public/Sathish_Kumar_M_Resume.pdf", pdf.length, "bytes");
