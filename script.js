// ====== بيانات الأسئلة ======
// correct = رقم الإجابة الصحيحة (يبدأ العد من 0)
const questions = [
  {
    type: "اختيار من متعدد",
    text: "ما المقصود بنظام التشغيل؟",
    options: ["برنامج لرسم الصور فقط", "برنامج أساسي يدير موارد الجهاز", "قطعة إلكترونية لتخزين الملفات", "جهاز يستخدم لإدخال البيانات"],
    correct: 1,
    reason: "نظام التشغيل برنامج أساسي يدير موارد الجهاز ويشغّل بقية البرامج."
  },
  {
    type: "اختيار من متعدد",
    text: "ما الدور الأساسي لنظام التشغيل بين المستخدم ومكونات الجهاز؟",
    options: ["يزيد حجم الشاشة", "يستبدل المعالج", "يعمل وسيطًا لتسهيل التفاعل وتنفيذ الأوامر", "يمنع تشغيل التطبيقات"],
    correct: 2,
    reason: "نظام التشغيل وسيط بين المستخدم والأجهزة، يسهّل التفاعل وينفذ الأوامر."
  },
  {
    type: "اختيار من متعدد",
    text: "عند حفظ صورة داخل مجلد، ما وظيفة نظام التشغيل المستخدمة؟",
    options: ["إدارة نظام الملفات", "إدارة الذاكرة", "الأمن والحماية", "إدارة المكونات المادية"],
    correct: 0,
    reason: "حفظ الملفات وتنظيمها داخل المجلدات من وظائف إدارة نظام الملفات."
  },
  {
    type: "اختيار من متعدد",
    text: "أي وظيفة تساعد نظام التشغيل على التعامل مع الطابعة؟",
    options: ["واجهة المستخدم", "إدارة نظام الملفات", "إدارة الذاكرة", "إدارة المكونات المادية"],
    correct: 3,
    reason: "التعامل مع الطابعة وباقي الأجهزة من وظائف إدارة المكونات المادية."
  },
  {
    type: "اختيار من متعدد",
    text: "أي نظام تشغيل اشتهر بالاعتماد على كتابة الأوامر النصية؟",
    options: ["macOS", "DOS", "Windows", "Android"],
    correct: 1,
    reason: "نظام DOS يعتمد على كتابة الأوامر النصية."
  },
  {
    type: "صح أو غلط",
    text: "تستخدم أنظمة التشغيل في الهواتف والساعات الذكية وأجهزة التلفزيون وليس في أجهزة الكمبيوتر فقط.",
    options: ["صح", "غلط"],
    correct: 0,
    reason: "أنظمة التشغيل موجودة في كل الأجهزة الذكية تقريبًا، وليس الكمبيوتر فقط."
  },
  {
    type: "صح أو غلط",
    text: "إدارة الذاكرة في نظام التشغيل هي الوظيفة المسؤولة عن ترتيب الملفات داخل المجلدات.",
    options: ["صح", "غلط"],
    correct: 1,
    reason: "ترتيب الملفات داخل المجلدات وظيفة إدارة نظام الملفات، أما إدارة الذاكرة فتنظّم استخدام الذاكرة أثناء تشغيل البرامج."
  }
];

// ====== العناصر من الصفحة ======
const counter = document.getElementById("counter");
const progressFill = document.getElementById("progressFill");
const qType = document.getElementById("qType");
const qText = document.getElementById("qText");
const optionsBox = document.getElementById("optionsBox");
const feedback = document.getElementById("feedback");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const questionCard = document.getElementById("questionCard");
const resultCard = document.getElementById("resultCard");
const navBar = document.getElementById("navBar");
const scoreText = document.getElementById("scoreText");
const scoreMessage = document.getElementById("scoreMessage");

// ====== المتغيرات ======
const letters = ["أ", "ب", "ج", "د"];
let current = 0;
let answers = new Array(questions.length).fill(null);

// ====== عرض السؤال ======
function showQuestion() {
  const q = questions[current];
  qType.textContent = q.type;
  qText.textContent = q.text;
  counter.textContent = "السؤال " + (current + 1) + " من " + questions.length;
  progressFill.style.width = (current / questions.length) * 100 + "%";

  optionsBox.innerHTML = "";
  q.options.forEach(function (opt, i) {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = q.options.length === 4 ? letters[i] + ") " + opt : opt;
    btn.addEventListener("click", function () {
      chooseAnswer(i);
    });
    optionsBox.appendChild(btn);
  });

  feedback.classList.add("hidden");
  if (answers[current] !== null) {
    applyAnswer();
  }

  prevBtn.disabled = current === 0;
  nextBtn.disabled = answers[current] === null;
  nextBtn.textContent = current === questions.length - 1 ? "النتيجة" : "التالي";
}

// ====== اختيار إجابة ======
function chooseAnswer(i) {
  if (answers[current] !== null) return;
  answers[current] = i;
  applyAnswer();
  nextBtn.disabled = false;
}

// ====== التعزيز (ألوان + رسالة) ======
function applyAnswer() {
  const q = questions[current];
  const chosen = answers[current];
  const buttons = optionsBox.children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  buttons[q.correct].classList.add("correct");

  feedback.classList.remove("hidden", "good", "bad");
  if (chosen === q.correct) {
    feedback.classList.add("good");
    feedback.textContent = "✅ أحسنتِ! إجابة صحيحة. " + q.reason;
  } else {
    buttons[chosen].classList.add("wrong");
    feedback.classList.add("bad");
    feedback.textContent = "❌ إجابة خاطئة. " + q.reason;
  }
}

// ====== النتيجة ======
function showResult() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].correct) score++;
  }
  questionCard.classList.add("hidden");
  navBar.classList.add("hidden");
  resultCard.classList.remove("hidden");
  progressFill.style.width = "100%";
  scoreText.textContent = "درجتك: " + score + " من " + questions.length;

  if (score === questions.length) {
    scoreMessage.textContent = "ممتاز! أنت متقن للدرس 🌟";
  } else if (score >= questions.length / 2) {
    scoreMessage.textContent = "جيد! راجع الأسئلة الخاطئة وأعد المحاولة 👍";
  } else {
    scoreMessage.textContent = "لا بأس، راجع الدرس وحاول مرة أخرى 💪";
  }
}

// ====== الأزرار ======
nextBtn.addEventListener("click", function () {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", function () {
  if (current > 0) {
    current--;
    showQuestion();
  }
});

restartBtn.addEventListener("click", function () {
  current = 0;
  answers = new Array(questions.length).fill(null);
  resultCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  navBar.classList.remove("hidden");
  showQuestion();
});

showQuestion();
