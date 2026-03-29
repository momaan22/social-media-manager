import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════
   🏋️ OLYMPIA SPORTS OMAN — نظام الإدارة الاحترافي
   ═══════════════════════════════════════════════════ */

/* ── Styles ── */
const C = { purple:"#4F46E5", blue:"#1A73E8", green:"#16A34A", red:"#DC2626",
  amber:"#B45309", pink:"#BE123C", teal:"#0F766E", orange:"#C2410C",
  violet:"#7C3AED", sky:"#0369A1", gray:"#64748B", dark:"#1E293B" };
const card  = (e={})=>({background:"#fff",borderRadius:14,padding:16,marginBottom:10,boxShadow:"0 1px 6px rgba(0,0,0,.07)",...e});
const badge = (bg,color,e={})=>({padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:700,background:bg,color,...e});
const btn   = (bg,color,e={})=>({padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:bg,color,...e});

/* ── Platforms ── */
const PLATFORMS = [
  {id:"instagram",name:"انستجرام",       icon:"📸",color:"#E1306C",bg:"#FDE8F0",followers:24800,goal:30000},
  {id:"facebook", name:"فيسبوك",         icon:"📘",color:"#1877F2",bg:"#E7F3FF",followers:18500,goal:25000},
  {id:"snapchat", name:"سناب شات",       icon:"👻",color:"#F5A623",bg:"#FFF8E7",followers:9200, goal:15000},
  {id:"tiktok",   name:"تيك توك",        icon:"🎵",color:"#333",   bg:"#F0F0F0",followers:31000,goal:50000},
  {id:"youtube",  name:"يوتيوب",         icon:"▶️",color:"#FF0000",bg:"#FFE8E8",followers:5600, goal:10000},
  {id:"twitter",  name:"تويتر / X",      icon:"𝕏", color:"#000",   bg:"#F0F0F0",followers:7300, goal:12000},
  {id:"gmb",      name:"Google Business",icon:"🌐",color:"#1A73E8",bg:"#E8F0FE",followers:null, goal:null},
];

/* ── Team Members ── */
const TEAM = [
  {id:1,name:"أنت (المسؤول)",  role:"مدير المحتوى",    avatar:"👑",color:"#4F46E5",tasks:0,done:0,kpi:95},
  {id:2,name:"سارة العلوي",    role:"مصممة جرافيك",    avatar:"🎨",color:"#7C3AED",tasks:0,done:0,kpi:88},
  {id:3,name:"محمد الحارثي",   role:"كاتب محتوى",      avatar:"✍️",color:"#0369A1",tasks:0,done:0,kpi:92},
  {id:4,name:"خالد الريامي",   role:"مصور ومونتير",    avatar:"📹",color:"#C2410C",tasks:0,done:0,kpi:85},
  {id:5,name:"نورة البلوشي",   role:"مسؤولة تواصل",   avatar:"💬",color:"#BE123C",tasks:0,done:0,kpi:90},
];

/* ── Initial Tasks ── */
const INIT_TASKS = [
  {id:1, platform:"instagram",task:"تصوير منتجات اليوم",          type:"تصوير", day:"يومي",     time:"09:00",owner:4,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:2, platform:"instagram",task:"تصميم 3 بوستات + 10 ستوريات",type:"تصميم", day:"يومي",     time:"10:00",owner:2,priority:"عالي",  status:"inprogress",approved:false,deadline:"",notes:""},
  {id:3, platform:"instagram",task:"كتابة كابشن + هاشتاقات",      type:"كتابة", day:"يومي",     time:"08:30",owner:3,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:4, platform:"instagram",task:"نشر البوست الأول - 8 ص",      type:"نشر",   day:"يومي",     time:"08:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:5, platform:"instagram",task:"نشر البوست الثاني - 2 م",     type:"نشر",   day:"يومي",     time:"14:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:6, platform:"instagram",task:"نشر البوست الثالث - 8 م",     type:"نشر",   day:"يومي",     time:"20:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:7, platform:"instagram",task:"نشر 10 ستوريات موزعة",        type:"نشر",   day:"يومي",     time:"07:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:8, platform:"instagram",task:"ريلز يومي - تصوير ومونتاج",   type:"تصوير", day:"يومي",     time:"11:00",owner:4,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:9, platform:"instagram",task:"الرد على التعليقات والDMs",    type:"تفاعل", day:"يومي",     time:"21:00",owner:5,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:10,platform:"facebook", task:"كتابة نص الإعلان + تصميم",    type:"كتابة", day:"يومي",     time:"08:00",owner:3,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:11,platform:"facebook", task:"نشر المنشور في وقت الذروة",   type:"نشر",   day:"يومي",     time:"20:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:12,platform:"facebook", task:"مراجعة أداء الإعلانات",       type:"تحليل", day:"الأربعاء",time:"11:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:13,platform:"tiktok",   task:"تصوير فيديو ترند يومي",       type:"تصوير", day:"يومي",     time:"10:00",owner:4,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:14,platform:"tiktok",   task:"مونتاج + موسيقى ترند",        type:"تصميم", day:"يومي",     time:"13:00",owner:2,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:15,platform:"tiktok",   task:"نشر الفيديو 8 م",            type:"نشر",   day:"يومي",     time:"20:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:16,platform:"snapchat", task:"تصوير ستوريين يومياً",        type:"تصوير", day:"يومي",     time:"09:00",owner:4,priority:"متوسط", status:"pending",  approved:true, deadline:"",notes:""},
  {id:17,platform:"youtube",  task:"كتابة سكريبت الفيديو",        type:"كتابة", day:"الأحد",   time:"09:00",owner:3,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:18,platform:"youtube",  task:"تصوير الفيديو الأسبوعي",      type:"تصوير", day:"الاثنين", time:"11:00",owner:4,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:19,platform:"youtube",  task:"مونتاج + ثمبنيل + SEO",       type:"تصميم", day:"الثلاثاء",time:"10:00",owner:2,priority:"عالي",  status:"pending",  approved:false,deadline:"",notes:""},
  {id:20,platform:"youtube",  task:"رفع ونشر الفيديو",            type:"نشر",   day:"الخميس",  time:"18:00",owner:1,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:21,platform:"gmb",      task:"الرد على التقييمات الجديدة",  type:"رد",    day:"يومي",     time:"09:00",owner:5,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:22,platform:"gmb",      task:"طلب تقييمات من العملاء",      type:"تفاعل", day:"يومي",     time:"15:00",owner:5,priority:"عالي",  status:"pending",  approved:true, deadline:"",notes:""},
  {id:23,platform:"gmb",      task:"نشر منشور GMB",               type:"نشر",   day:"الأحد",   time:"10:00",owner:3,priority:"متوسط", status:"pending",  approved:false,deadline:"",notes:""},
  {id:24,platform:"twitter",  task:"كتابة وجدولة تغريدات يومية",  type:"كتابة", day:"يومي",     time:"08:00",owner:3,priority:"متوسط", status:"pending",  approved:false,deadline:"",notes:""},
];

/* ── KPI Targets ── */
const KPI_TARGETS = {
  instagram:{posts:3,stories:10,reels:1,engagement:4.5,reach:5000,saves:200},
  facebook: {posts:2,engagement:3.5,reach:3000,clicks:150,leads:20},
  tiktok:   {videos:2,views:10000,engagement:5,followers_gain:200},
  youtube:  {videos:1,views:2000,watchtime:500,subscribers_gain:50},
  snapchat: {stories:3,views:1500,swipeups:100},
  gmb:      {reviews:3,rating:4.5,posts:3,photos:3,replies:100},
};

/* ── Content Calendar ── */
const DAYS_AR = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

const TYPE_COLORS = {
  "كتابة": {bg:"#EFF6FF",text:"#2563EB"},"تصميم":{bg:"#F5F3FF",text:"#7C3AED"},
  "تصوير":{bg:"#FFF7ED",text:"#C2410C"}, "نشر":  {bg:"#F0FDF4",text:"#16A34A"},
  "مراجعة":{bg:"#FEFCE8",text:"#A16207"},"تفاعل":{bg:"#FFF1F2",text:"#BE123C"},
  "تخطيط":{bg:"#F0F9FF",text:"#0369A1"}, "تحليل":{bg:"#FDF4FF",text:"#A21CAF"},
  "رد":   {bg:"#F0FDFA",text:"#0F766E"}, "تحديث":{bg:"#E8F0FE",text:"#1A73E8"},
  "SEO":  {bg:"#FEF3C7",text:"#92400E"},
};
const PRI = {"عالي":{bg:"#FEE2E2",text:"#DC2626"},"متوسط":{bg:"#FEF9C3",text:"#B45309"},"منخفض":{bg:"#F0FDF4",text:"#16A34A"}};
const STATUS_STYLE = {
  pending:   {bg:"#F1F5F9",text:"#64748B",label:"⬜ معلق"},
  inprogress:{bg:"#EFF6FF",text:"#2563EB",label:"🔄 جارٍ"},
  review:    {bg:"#FEF9C3",text:"#B45309",label:"👁 مراجعة"},
  done:      {bg:"#F0FDF4",text:"#16A34A",label:"✅ منجز"},
  rejected:  {bg:"#FEE2E2",text:"#DC2626",label:"❌ مرفوض"},
};

/* ── Hashtag Groups ── */
const HASHTAGS = [
  {label:"🏋️ أولمبيا عُمان",color:"#1A73E8",bg:"#E8F0FE",
   tags:["#أولمبيا_عمان","#Olympia_Oman","#أولمبيا_للرياضة","#OlympiaOman","#أولمبيا","#Olympia","#أولمبيا_سبورت"]},
  {label:"💪 معدات رياضية",color:"#7C3AED",bg:"#F5F3FF",
   tags:["#معدات_رياضية","#رياضة_عمان","#فيتنس_عمان","#جيم_عمان","#Sports_Oman","#Fitness_Oman","#معدات_الجيم","#أدوات_رياضية","#تجهيزات_رياضية","#SportEquipment"]},
  {label:"🏃 اللياقة البدنية",color:"#16A34A",bg:"#F0FDF4",
   tags:["#لياقة_بدنية","#تمارين_رياضية","#حياة_صحية","#تمرين_يومي","#صحة_ورياضة","#Fitness","#Workout","#HealthyLife","#GymLife","#FitLife","#اللياقة_البدنية","#برنامج_رياضي","#تمرين"]},
  {label:"🥊 أنواع الرياضة",color:"#C2410C",bg:"#FFF7ED",
   tags:["#كمال_الأجسام","#رفع_الأثقال","#كروس_فيت","#ملاكمة","#يوغا","#ركض","#Bodybuilding","#Weightlifting","#CrossFit","#Boxing","#Yoga","#Running","#Cardio","#HIIT","#Pilates"]},
  {label:"🇴🇲 الخليج وعُمان",color:"#DC2626",bg:"#FEE2E2",
   tags:["#عمان","#Oman","#مسقط","#Muscat","#السلطنة","#خليجي","#Gulf","#GCC","#عمانيون","#Omanis","#عيش_عماني","#VisitOman","#عمان_رياضة"]},
  {label:"🛍️ تسويق وعروض",color:"#B45309",bg:"#FEF9C3",
   tags:["#عرض_خاص","#تخفيضات","#خصم","#اشتري_الآن","#Sale","#Offer","#Discount","#تسوق_اون_لاين","#توصيل_عمان","#شراء_اون_لاين","#عروض_رياضية","#Flash_Sale"]},
  {label:"🔥 ترندات جيم",color:"#BE123C",bg:"#FFF1F2",
   tags:["#GymMotivation","#FitnessMotivation","#NoExcuses","#BeastMode","#FitFam","#GymLife","#SweatNow","#TrainHard","#NoPainNoGain","#FitnessJourney","#رحلة_اللياقة","#تحدي_رياضي"]},
];

/* ── WhatsApp Templates ── */
const WA_TEMPLATES = [
  {id:1, cat:"عملاء",  icon:"👋",label:"ترحيب بعميل جديد",
   text:"أهلاً وسهلاً [الاسم]! 🌟\nيسعدنا انضمامك لعائلة أولمبيا للرياضة عُمان.\nنحن المرجع الأول للمعدات الرياضية الأصيلة في السلطنة 🇴🇲\nتفضل بزيارتنا أو تواصل معنا في أي وقت 💪\n— فريق أولمبيا"},
  {id:2, cat:"عروض",   icon:"🎁",label:"عرض خاص على المعدات",
   text:"مرحباً [الاسم]! 🎉\nلدينا عرض حصري اليوم فقط من أولمبيا:\n🏋️ خصم [نسبة]% على [المنتجات]\n✅ شامل: أجهزة جيم، ملابس، إكسسوارات\n⏰ ينتهي الليلة!\nللطلب: [رقم / رابط]\n— أولمبيا للرياضة عُمان 💪"},
  {id:3, cat:"مخزون",  icon:"📦",label:"وصول شحنة جديدة",
   text:"أخبار رائعة [الاسم]! 🎊\nوصلت شحنة جديدة من أحدث معدات أولمبيا! 💪\n🆕 الجديد:\n• [منتج 1]\n• [منتج 2]\nكميات محدودة — احجز نصيبك الآن!\n— أولمبيا للرياضة عُمان 🇴🇲"},
  {id:4, cat:"خدمات",  icon:"📅",label:"تذكير استلام طلب",
   text:"مرحباً [الاسم]! 🔔\nطلبك من أولمبيا جاهز للاستلام!\n📦 رقم الطلب: [رقم]\n📍 الموقع: [العنوان]\n⏰ أوقات الدوام: [الأوقات]\nنتطلع لرؤيتك! 🌟"},
  {id:5, cat:"تقييمات",icon:"⭐",label:"طلب تقييم Google",
   text:"مرحباً [الاسم]! 😊\nشكراً لتسوقك من أولمبيا للرياضة عُمان.\nرأيك يهمنا ويساعدنا على التحسين!\nهل تمانع منحنا دقيقة لتقييمنا؟ 🙏\n👇 رابط التقييم:\n[رابط Google My Business]\nشكراً جزيلاً — فريق أولمبيا ⭐"},
  {id:6, cat:"متابعة",  icon:"💬",label:"متابعة ما بعد الشراء",
   text:"أهلاً [الاسم]! 😊\nكيف تجربتك مع منتجات أولمبيا؟\nنأمل أنك راضٍ تماماً 💪\nإذا احتجت مساعدة في الاستخدام — نحن هنا!\nدائماً في خدمتك 🌟\n— أولمبيا للرياضة عُمان"},
  {id:7, cat:"ولاء",   icon:"🏆",label:"دعوة برنامج الولاء",
   text:"مبروك [الاسم]! 🎊\nأنت الآن عضو في نادي أولمبيا VIP!\nمزاياك:\n⭐ نقاط على كل شراء\n🎁 عروض حصرية أولاً\n🚚 توصيل مجاني فوق [المبلغ] ريال\nكودك: [الكود]\n— أولمبيا للرياضة عُمان 💪"},
  {id:8, cat:"مناسبات",icon:"🎊",label:"عرض العيد والمناسبات",
   text:"كل عام وأنتم بخير [الاسم]! 🎊\nبمناسبة [المناسبة]، أولمبيا تقدم:\n🎁 خصم [نسبة]% على جميع المنتجات\n⏰ لمدة [عدد] أيام فقط\nصحة ونشاط دائم! 💪🇴🇲"},
  {id:9, cat:"استرداد",icon:"💫",label:"تذكير عميل غائب",
   text:"مرحباً [الاسم]! 💫\nاشتقنا لك في أولمبيا!\nوصلت منتجات جديدة قد تعجبك:\n🆕 [المنتج] — بسعر خاص لك كعميل مميز 🌟\nتفضل بزيارتنا أو تواصل معنا الآن 😊"},
  {id:10,cat:"توصيل",  icon:"🚚",label:"إشعار توصيل الطلب",
   text:"أخبار سارة [الاسم]! 🎉\nطلبك من أولمبيا في الطريق! 🚚\n📦 رقم الطلب: [رقم]\n⏰ خلال: [المدة]\n📍 تتبع: [رابط]\n— أولمبيا للرياضة عُمان 🇴🇲"},
  {id:11,cat:"فعاليات",icon:"🏅",label:"دعوة لفعالية رياضية",
   text:"دعوة خاصة [الاسم]! 🏅\nأولمبيا تدعوك لـ [اسم الفعالية]\n📅 [التاريخ] ⏰ [الوقت]\n📍 [المكان]\nحضورك شرف لنا! يرجى التأكيد 🙏"},
  {id:12,cat:"محتوى",  icon:"💡",label:"نصيحة رياضية أسبوعية",
   text:"نصيحة أولمبيا الأسبوعية [الاسم]! 💡\n🏋️ [النصيحة الرياضية]\n\nمنتج يساعدك:\n➡️ [اسم المنتج] — متوفر لدينا!\nتابعنا: @OlympiaOman 💪🇴🇲"},
  {id:13,cat:"استفسار",icon:"💰",label:"رد على استفسار سعر",
   text:"أهلاً [الاسم]! 😊\nشكراً لاستفسارك عن [المنتج].\n💰 السعر: [السعر] ريال عماني\n✅ الضمان: [المدة]\n🚚 التوصيل: [المعلومات]\nللطلب نحن بانتظارك!\n— أولمبيا للرياضة عُمان 💪"},
  {id:14,cat:"إحالة",  icon:"🤝",label:"برنامج الإحالة",
   text:"مرحباً [الاسم]! 🤝\nشارك أولمبيا مع أصدقائك واربح!\n💰 لكل صديق يشتري: [المكافأة]\n🎁 صديقك يحصل على خصم [نسبة]%\nكود الإحالة: [الكود]\n— أولمبيا للرياضة عُمان 🇴🇲"},
  {id:15,cat:"عضوية",  icon:"👑",label:"ترقية عضوية VIP",
   text:"تهانينا [الاسم]! 👑\nترقيت إلى عضوية [المستوى] في أولمبيا VIP!\nمزاياك الجديدة:\n• [ميزة 1]\n• [ميزة 2]\nاستمر وارتقِ للمستوى الأعلى 🚀\n— أولمبيا للرياضة عُمان 🇴🇲"},
  {id:16,cat:"شكاوى",  icon:"🙏",label:"معالجة شكوى عميل",
   text:"نأسف جداً [الاسم] 🙏\nتجربتك السلبية لا تعكس معاييرنا أبداً.\nنريد تصحيح الأمر فوراً!\nرجاءً تواصل معنا على [رقم] أو زرنا مباشرة.\nنحن ملتزمون برضاك التام 💪\n— إدارة أولمبيا للرياضة عُمان"},
  {id:17,cat:"تقييمات",icon:"🌟",label:"شكر على تقييم 5 نجوم",
   text:"شكراً جزيلاً [الاسم]! 🌟\nتقييمك الرائع يعني لنا الكثير ويحفزنا للاستمرار!\nنتطلع لخدمتك دائماً في أولمبيا 💪\nوشارك تجربتك مع أصدقائك 😊\n— فريق أولمبيا للرياضة عُمان"},
  {id:18,cat:"تسويق",  icon:"📊",label:"استطلاع رأي العملاء",
   text:"مرحباً [الاسم]! 📊\nنسعى دائماً لتطوير خدماتنا في أولمبيا.\nهل تمانع الإجابة على 3 أسئلة سريعة؟\n👇 استطلاع الرأي:\n[رابط الاستطلاع]\nشكراً لوقتك الثمين 🙏"},
];

/* ── GMB Reviews ── */
const STAR_PTS = {5:100,4:80,3:50,2:20,1:0};
const INIT_REVIEWS = [
  {id:1,name:"محمد العمري",   stars:5,text:"خدمة ممتازة! أولمبيا دائماً تتميز في جودة المنتجات.",status:"replied", type:"إيجابي",date:"29/03",reply:"شكراً جزيلاً محمد! 😊"},
  {id:2,name:"سارة الزهراني",stars:4,text:"منتجات جيدة لكن وقت الانتظار طويل أحياناً.",          status:"replied", type:"محايد", date:"28/03",reply:"شكراً سارة، نعمل على التحسين 🌟"},
  {id:3,name:"خالد المطيري", stars:2,text:"المنتج لم يكن كما وُصف، جودة أقل من المتوقع.",        status:"urgent",  type:"سلبي",  date:"27/03",reply:""},
  {id:4,name:"نورة الشمري",  stars:5,text:"أفضل متجر رياضي في عُمان! موظفون محترفون ومتعاونون.", status:"replied", type:"إيجابي",date:"26/03",reply:"شكراً نورة، كلامك يشرفنا 💫"},
  {id:5,name:"فيصل الغامدي", stars:3,text:"متوسط، يحتاج تحسين في التنظيم والعرض.",               status:"pending", type:"محايد", date:"25/03",reply:""},
  {id:6,name:"عبدالله السالم",stars:5,text:"معدات أولمبيا أصلية 100% وأسعار تنافسية!",           status:"replied", type:"إيجابي",date:"24/03",reply:"شكراً عبدالله 🌟"},
  {id:7,name:"ريم القحطاني", stars:1,text:"تجربة سيئة، لم يتم التواصل معي بعد الشراء أبداً.",    status:"urgent",  type:"سلبي",  date:"23/03",reply:""},
  {id:8,name:"أحمد البلوشي", stars:5,text:"سرعة التوصيل رائعة والتغليف احترافي جداً!",           status:"pending", type:"إيجابي",date:"22/03",reply:""},
];

/* ── Follower History ── */
const INIT_FOLLOWERS = [
  {platform:"instagram",daily:[23800,24000,24200,24400,24600,24700,24800],goal:30000,dailyTarget:150},
  {platform:"facebook", daily:[17800,17900,18000,18100,18300,18400,18500],goal:25000,dailyTarget:100},
  {platform:"tiktok",   daily:[29000,29500,30000,30200,30500,30800,31000],goal:50000,dailyTarget:300},
  {platform:"snapchat", daily:[8800,8900,9000,9050,9100,9150,9200],       goal:15000,dailyTarget:60},
  {platform:"youtube",  daily:[5300,5350,5400,5450,5500,5550,5600],       goal:10000,dailyTarget:30},
  {platform:"twitter",  daily:[7000,7100,7150,7200,7250,7270,7300],       goal:12000,dailyTarget:50},
];

/* ── Campaigns / Budget ── */
const INIT_CAMPAIGNS = [
  {id:1,name:"رمضان الرياضي 2026",platform:"facebook",budget:500,spent:320,leads:45,clicks:890,status:"نشطة",  start:"01/04",end:"30/04",objective:"مبيعات"},
  {id:2,name:"انطلاق موسم الجيم",  platform:"instagram",budget:300,spent:180,leads:28,clicks:650,status:"نشطة",  start:"01/04",end:"15/04",objective:"وعي"},
  {id:3,name:"عرض التسليم السريع", platform:"tiktok",   budget:200,spent:200,leads:60,clicks:1200,status:"منتهية",start:"15/03",end:"25/03",objective:"مبيعات"},
  {id:4,name:"ريلز المنتجات الجديدة",platform:"instagram",budget:150,spent:0, leads:0, clicks:0,  status:"مجدولة",start:"05/04",end:"20/04",objective:"تفاعل"},
];

/* ── Competitor Monitoring ── */
const COMPETITORS = [
  {name:"Sport Zone Oman",platform:"instagram",followers:45000,engagement:3.2,lastPost:"منذ 2 ساعة",postsPerDay:2},
  {name:"Al Meera Sports",platform:"instagram",followers:28000,engagement:2.8,lastPost:"منذ 5 ساعات",postsPerDay:1},
  {name:"Decathlon Oman",  platform:"instagram",followers:62000,engagement:2.1,lastPost:"منذ 1 ساعة", postsPerDay:3},
];

/* ── Alerts ── */
const INIT_ALERTS = [
  {id:1,type:"urgent",  icon:"🚨",msg:"تقييم سلبي جديد من ريم القحطاني — يحتاج رد فوري!",time:"منذ 30 دقيقة",read:false},
  {id:2,type:"warning", icon:"⚠️",msg:"لم يُنشر ريلز اليوم — الموعد مضى 19:00!",          time:"منذ ساعة",    read:false},
  {id:3,type:"info",    icon:"📊",msg:"حملة رمضان أنفقت 64% من الميزانية قبل منتصف الشهر",time:"منذ ساعتين",  read:false},
  {id:4,type:"success", icon:"✅",msg:"تجاوزنا هدف المتابعين على تيك توك هذا الأسبوع!",  time:"منذ 3 ساعات", read:true},
  {id:5,type:"info",    icon:"💡",msg:"أفضل محتوى هذا الأسبوع: ريلز المعدات الجديدة (12K مشاهدة)",time:"منذ يوم",read:true},
];

/* ── Content Ideas Bank ── */
const CONTENT_IDEAS = [
  {id:1,title:"تحدي 30 يوم رياضي",platform:"tiktok",  type:"فيديو",     priority:"عالي", status:"جديد",  note:"انشئ هاشتاق خاص #أولمبيا30يوم"},
  {id:2,title:"Unboxing منتج جديد",platform:"instagram",type:"ريلز",       priority:"عالي", status:"جديد",  note:"عرض منتج بطريقة مبتكرة"},
  {id:3,title:"نصائح من مدرب محترف",platform:"youtube", type:"فيديو طويل",priority:"متوسط",status:"قيد التخطيط",note:"شراكة مع مدرب محلي"},
  {id:4,title:"قبل وبعد التمرين",   platform:"instagram",type:"كاروسيل",   priority:"عالي", status:"جديد",  note:"محتوى تحفيزي"},
  {id:5,title:"أسئلة وأجوبة رياضية",platform:"instagram",type:"ستوري بولز", priority:"متوسط",status:"جديد",  note:"أسبوعياً كل جمعة"},
  {id:6,title:"مقارنة أسعار المعدات",platform:"youtube",type:"فيديو مقارنة",priority:"عالي", status:"قيد التخطيط",note:"دليل شراء للمبتدئين"},
  {id:7,title:"كواليس المتجر",       platform:"snapchat",type:"ستوري",      priority:"منخفض",status:"جديد",  note:"يومياً لزيادة التواصل"},
  {id:8,title:"شهادات العملاء",      platform:"instagram",type:"كاروسيل",   priority:"عالي", status:"جديد",  note:"اجمع تقييمات حقيقية"},
];

/* ── Meeting Notes ── */
const INIT_MEETINGS = [
  {id:1,date:"30/03/2026",title:"اجتماع الفريق الأسبوعي",attendees:[1,2,3,4,5],notes:"مراجعة أداء الأسبوع الماضي، تخطيط محتوى رمضان، مناقشة ميزانية الإعلانات",actions:["سارة: تصميم 5 قوالب رمضانية","محمد: كتابة سكريبت 4 فيديوهات","خالد: تصوير يوم كامل الخميس"],done:false},
];

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export default function App() {
  /* ── State ── */
  const [tasks,     setTasks]     = useState(INIT_TASKS);
  const [reviews,   setReviews]   = useState(INIT_REVIEWS);
  const [followers, setFollowers] = useState(INIT_FOLLOWERS);
  const [campaigns, setCampaigns] = useState(INIT_CAMPAIGNS);
  const [alerts,    setAlerts]    = useState(INIT_ALERTS);
  const [meetings,  setMeetings]  = useState(INIT_MEETINGS);
  const [ideas,     setIdeas]     = useState(CONTENT_IDEAS);
  const [team,      setTeam]      = useState(TEAM);

  /* nav */
  const [view, setView] = useState("dashboard");

  /* tasks */
  const [filterPlat,  setFilterPlat]  = useState("all");
  const [filterOwner, setFilterOwner] = useState("all");
  const [filterStatus,setFilterStatus]= useState("all");

  /* reviews */
  const [revFilter,    setRevFilter]    = useState("all");
  const [activeReply,  setActiveReply]  = useState(null);
  const [replyText,    setReplyText]    = useState("");

  /* whatsapp */
  const [contacts, setContacts] = useState([
    {id:1,name:"محمد العمري",   phone:"96891234567",tag:"عميل",sel:true},
    {id:2,name:"سارة الزهراني",phone:"96892345678",tag:"VIP",  sel:true},
    {id:3,name:"خالد المطيري", phone:"96893456789",tag:"عميل",sel:false},
    {id:4,name:"نورة الشمري",  phone:"96894567890",tag:"VIP",  sel:true},
    {id:5,name:"فيصل الغامدي", phone:"96895678901",tag:"مورّد",sel:false},
  ]);
  const [waMsg,      setWaMsg]      = useState("");
  const [waSection,  setWaSection]  = useState("compose");
  const [waTagFilter,setWaTagFilter]= useState("الكل");
  const [waDelay,    setWaDelay]    = useState(6);
  const [macroSt,    setMacroSt]    = useState("idle");
  const [macroIdx,   setMacroIdx]   = useState(0);
  const [sendLog,    setSendLog]     = useState([]);
  const [copiedTpl,  setCopiedTpl]  = useState(null);
  const [newName,    setNewName]    = useState("");
  const [newPhone,   setNewPhone]   = useState("");
  const [newTag,     setNewTag]     = useState("عميل");
  const [waTplCat,   setWaTplCat]   = useState("الكل");

  /* hashtags */
  const [copiedH, setCopiedH] = useState(null);

  /* followers */
  const [follInput, setFollInput] = useState({});

  /* content ideas */
  const [ideaFilter, setIdeaFilter] = useState("all");

  /* meetings */
  const [newMeeting, setNewMeeting] = useState(false);
  const [mtgTitle,   setMtgTitle]   = useState("");
  const [mtgNotes,   setMtgNotes]   = useState("");

  /* kpis */
  const [kpiPlatform, setKpiPlatform] = useState("instagram");

  /* approval */
  const [approvView, setApprovView] = useState("pending");

  /* ── Computed ── */
  const selContacts = contacts.filter(c=>c.sel);
  const unreadAlerts = alerts.filter(a=>!a.read).length;
  const totalPts  = reviews.reduce((s,r)=>s+(STAR_PTS[r.stars]||0),0);
  const maxPts    = reviews.length*100;
  const pctPts    = maxPts?Math.round((totalPts/maxPts)*100):0;
  const avgStars  = reviews.length?(reviews.reduce((a,r)=>a+r.stars,0)/reviews.length).toFixed(1):"0.0";
  const pendingRev= reviews.filter(r=>r.status==="pending"||r.status==="urgent").length;
  const pendingApproval = tasks.filter(t=>!t.approved&&t.status!=="done").length;

  const getF   = pid => followers.find(f=>f.platform===pid)||{daily:[0],goal:0,dailyTarget:0};
  const dailyG = pid => { const d=getF(pid).daily; return d.length>1?d[d.length-1]-d[d.length-2]:0; };

  /* ── Helpers ── */
  const updateTaskStatus = (id,status) => setTasks(ts=>ts.map(t=>t.id===id?{...t,status}:t));
  const approveTask      = id => setTasks(ts=>ts.map(t=>t.id===id?{...t,approved:true,status:"inprogress"}:t));
  const rejectTask       = id => setTasks(ts=>ts.map(t=>t.id===id?{...t,status:"rejected",approved:false}:t));
  const buildWaLink      = (phone,msg) => `https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`;
  const sendSingle       = c => { if(!waMsg.trim())return; window.open(buildWaLink(c.phone,waMsg),"_blank"); setSendLog(l=>[{id:Date.now(),name:c.name,phone:c.phone,time:new Date().toLocaleTimeString("ar"),status:"فُتح"},...l]); };
  const runMacro         = () => {
    if(!waMsg.trim()||selContacts.length===0)return;
    setMacroSt("running");setMacroIdx(0);setSendLog([]);
    selContacts.forEach((c,i)=>setTimeout(()=>{
      window.open(buildWaLink(c.phone,waMsg),"_blank");
      setSendLog(l=>[{id:Date.now()+i,name:c.name,phone:c.phone,time:new Date().toLocaleTimeString("ar"),status:"فُتح"},...l]);
      setMacroIdx(i+1);
      if(i===selContacts.length-1)setMacroSt("done");
    },i*waDelay*1000));
  };
  const submitReply = id => {
    if(!replyText.trim())return;
    setReviews(rs=>rs.map(r=>r.id===id?{...r,reply:replyText,status:"replied"}:r));
    setReplyText("");setActiveReply(null);
  };
  const markAlertRead = id => setAlerts(as=>as.map(a=>a.id===id?{...a,read:true}:a));
  const addContact = () => {
    if(!newName.trim()||!newPhone.trim())return;
    setContacts(cs=>[...cs,{id:Date.now(),name:newName,phone:newPhone.replace(/\D/g,""),tag:newTag,sel:true}]);
    setNewName("");setNewPhone("");
  };
  const addFollDay = (pid,val) => {
    const n=parseInt(val); if(isNaN(n))return;
    setFollowers(fs=>fs.map(f=>f.platform===pid?{...f,daily:[...f.daily,n]}:f));
  };

  /* ── Filter tasks ── */
  const filtTasks = tasks.filter(t=>
    (filterPlat==="all"||t.platform===filterPlat)&&
    (filterOwner==="all"||String(t.owner)===String(filterOwner))&&
    (filterStatus==="all"||t.status===filterStatus)
  );

  /* ── Tabs ── */
  const TABS = [
    {id:"dashboard",  label:"🏠 الرئيسية"},
    {id:"tasks",      label:"📋 المهام"},
    {id:"approval",   label:`✅ الاعتماد${pendingApproval>0?` (${pendingApproval})`:""}`},
    {id:"kpi",        label:"📊 الأهداف"},
    {id:"team",       label:"👥 الفريق"},
    {id:"campaigns",  label:"💰 الحملات"},
    {id:"followers",  label:"📈 المتابعون"},
    {id:"reviews",    label:`⭐ التقييمات${pendingRev>0?` (${pendingRev})`:""}`},
    {id:"whatsapp",   label:"💬 واتساب"},
    {id:"hashtags",   label:"#️⃣ هاشتاقات"},
    {id:"ideas",      label:"💡 أفكار المحتوى"},
    {id:"meetings",   label:"🗓 اجتماعات"},
    {id:"alerts",     label:`🔔 تنبيهات${unreadAlerts>0?` (${unreadAlerts})`:""}`},
    {id:"competitors",label:"🔍 المنافسون"},
    {id:"schedule",   label:"🕐 النصائح"},
  ];

  /* platform tips */
  const TIPS = {
    instagram:["📸 انشر 3 بوستات يومياً: 8 ص، 2 م، 8 م لأعلى تفاعل","📱 10 ستوريات موزعة على مدار اليوم تبقيك في صدارة القائمة","🎬 ريلز يومي يصل لـ 3× متابعين جدد مقارنة بالبوست","🏷️ 5-8 هاشتاقات متخصصة أفضل من 30 عشوائي","💬 الرد على التعليقات في أول 30 دقيقة يضاعف الوصول","🔄 شارك الريلز في الستوري فوراً لمضاعفة المشاهدات","📊 راقب Insights أسبوعياً وركز على محتوى فوق 3% تفاعل","⏰ استخدم الجدولة المسبقة لضمان انتظام النشر"],
    facebook: ["📘 بوستان يومياً كحد أقصى — الإفراط يقلل الوصول العضوي","💰 5-10 دولار يومياً للإعلانات تعطي نتائج ملموسة","🎯 استهدف بدقة: عُمان، 18-45 سنة، اهتمامات رياضية","📹 الفيديو المحلي وصول أعلى 6× من الصور الثابتة","🔁 أعد نشر أفضل المحتوى كل 3 أشهر","💬 أجب على كل تعليق — الخوارزمية تكافئ التفاعل","📊 راقب CTR وROAS أسبوعياً واعدّل الميزانية"],
    tiktok:   ["🎵 الأصوات الرائجة ترفع الظهور بشكل كبير — استخدمها دائماً","⚡ مرتان يومياً للنمو السريع في البداية","🎬 أول 3 ثوانٍ تحدد إذا يكمل المشاهد أم لا","📈 أول 48 ساعة تحدد انتشار الفيديو — تفاعل كثيراً فيها","🏷️ #FYP + 3 هاشتاقات متخصصة كافية","💡 المحتوى التعليمي السريع ينتشر أسرع","📊 راقب معدل الإنهاء (Watch Time) كمؤشر أساسي"],
    youtube:  ["🖼️ الثمبنيل يحدد 80% من نسبة النقر — استثمر فيه","📝 وصف كامل بكلمات مفتاحية للـ SEO","⏰ أول 30 ثانية تحدد وقت المشاهدة الكلي","📅 الخميس 6-8 م لأعلى مشاهدة في الخليج","🔗 شارك على باقي المنصات فور النشر","💬 اطرح سؤالاً في نهاية كل فيديو"],
    snapchat: ["👻 ستوريان يومياً: صباحاً ومساءً","⚡ تختفي بعد 24 ساعة — انشر في أوقات الذروة","💡 Geofilter خاص بـ Olympia يرفع الوعي بالعلامة","📊 تفاعلية (بولز، أسئلة) ترفع المشاهدات بشكل كبير","🎯 قوي مع الفئة 18-34 في عُمان"],
    gmb:      ["⭐ رد على 100% التقييمات خلال 24 ساعة — يرفع الترتيب","📸 2-3 صور أسبوعياً — Google تكافئ الملفات النشطة","📝 3 منشورات أسبوعياً تظهر في نتائج البحث","🎯 أكمل الملف 100%: ساعات، هاتف، وصف، فئات، منتجات","🔑 كلمات مفتاحية في وصف النشاط التجاري","📊 راقب Insights: نقرات، اتصالات، خريطة أسبوعياً","🙏 اطلب التقييم فوراً بعد كل تجربة ناجحة"],
    twitter:  ["🔥 الثريدز تفاعل أعلى 3× من التغريدة المفردة","⚡ تفاعل مع الترندات في أول ساعة","🕐 أفضل الأوقات: 8-9 ص و12-1 م","🏷️ هاشتاق أو اثنان فقط في التغريدة"],
  };

  return (
    <div dir="rtl" style={{fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif",background:"#EEF2F7",minHeight:"100vh",padding:12}}>

      {/* ═══ HEADER ═══ */}
      <div style={{background:"linear-gradient(135deg,#1A73E8 0%,#4F46E5 50%,#7C3AED 100%)",borderRadius:18,padding:"18px 20px",marginBottom:12,color:"#fff"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:17,fontWeight:900}}>🏋️ أولمبيا للرياضة عُمان</div>
            <div style={{fontSize:10,opacity:.8,marginTop:2}}>نظام الإدارة التسويقي الاحترافي الشامل</div>
          </div>
          <button onClick={()=>setView("alerts")} style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:10,padding:"6px 10px",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>
            🔔 {unreadAlerts>0?`(${unreadAlerts})`:""}
          </button>
        </div>
        <div style={{display:"flex",gap:6,marginTop:12,flexWrap:"wrap"}}>
          {[
            ["📋",tasks.length,"مهمة"],
            ["✅",tasks.filter(t=>t.status==="done").length,"منجزة"],
            ["⏳",pendingApproval,"تحتاج اعتماد"],
            ["⭐",`${avgStars}/5`,"تقييم GMB"],
            ["💬",selContacts.length,"واتساب"],
            ["🔔",unreadAlerts,"تنبيه جديد"],
          ].map(([ic,v,l])=>(
            <div key={l} style={{background:"rgba(255,255,255,.18)",borderRadius:10,padding:"5px 10px",fontSize:10,fontWeight:700,textAlign:"center"}}>
              <div>{ic} {v}</div><div style={{fontSize:9,opacity:.8}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TABS ═══ */}
      <div style={{display:"flex",gap:4,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setView(t.id)} style={{
            ...btn(view===t.id?"#4F46E5":"#fff",view===t.id?"#fff":"#555"),
            flex:"0 0 auto",fontSize:10,padding:"7px 10px",whiteSpace:"nowrap",
            boxShadow:"0 1px 3px rgba(0,0,0,.08)",borderRadius:10,
          }}>{t.label}</button>
        ))}
      </div>

      {/* ═══════════════ DASHBOARD ═══════════════ */}
      {view==="dashboard" && (
        <>
          {/* quick stats row */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[
              {label:"إجمالي المهام",value:tasks.length,           icon:"📋",bg:"#EFF6FF",color:C.blue},
              {label:"منجزة",        value:tasks.filter(t=>t.status==="done").length,icon:"✅",bg:"#F0FDF4",color:C.green},
              {label:"تحتاج اعتماد",value:pendingApproval,         icon:"⏳",bg:"#FEF9C3",color:C.amber},
            ].map(s=>(
              <div key={s.label} style={{...card({marginBottom:0}),textAlign:"center",borderTop:`3px solid ${s.color}`}}>
                <div style={{fontSize:18}}>{s.icon}</div>
                <div style={{fontWeight:900,fontSize:18,color:s.color}}>{s.value}</div>
                <div style={{fontSize:9,color:C.gray}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Follower summary */}
          <div style={card()}>
            <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:10}}>📈 المتابعون اليوم</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {PLATFORMS.filter(p=>p.followers).map(p=>{
                const g=dailyG(p.id);const fd=getF(p.id);
                const cur=fd.daily[fd.daily.length-1]||0;
                const pct=Math.round((cur/fd.goal)*100);
                return (
                  <div key={p.id} style={{background:p.bg,borderRadius:10,padding:"8px 10px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:13}}>{p.icon}</span>
                      <span style={{fontWeight:800,fontSize:12,color:g>=0?C.green:C.red}}>{g>=0?"▲":"▼"}{Math.abs(g).toLocaleString()}</span>
                    </div>
                    <div style={{fontWeight:900,fontSize:14,color:p.color,marginTop:2}}>{cur.toLocaleString()}</div>
                    <div style={{height:3,background:"rgba(0,0,0,.1)",borderRadius:3,marginTop:5}}>
                      <div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:p.color,borderRadius:3}}/>
                    </div>
                    <div style={{fontSize:9,color:C.gray,marginTop:2}}>{pct}% من الهدف</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alerts preview */}
          {alerts.filter(a=>!a.read).length>0&&(
            <div style={card()}>
              <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:8}}>🔔 تنبيهات تحتاج انتباهك</div>
              {alerts.filter(a=>!a.read).map(a=>(
                <div key={a.id} style={{display:"flex",gap:8,padding:"8px 10px",background:a.type==="urgent"?"#FEE2E2":a.type==="warning"?"#FEF9C3":"#EFF6FF",borderRadius:8,marginBottom:6}}>
                  <span style={{fontSize:16}}>{a.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,color:C.dark,fontWeight:600}}>{a.msg}</div>
                    <div style={{fontSize:10,color:C.gray}}>{a.time}</div>
                  </div>
                  <button onClick={()=>markAlertRead(a.id)} style={{...btn("#F1F5F9",C.gray),padding:"3px 8px",fontSize:10}}>✓</button>
                </div>
              ))}
            </div>
          )}

          {/* GMB points */}
          <div style={{...card(),background:"linear-gradient(135deg,#E8F0FE,#F5F3FF)",border:"2px solid #1A73E8"}}>
            <div style={{fontWeight:800,fontSize:13,color:C.blue,marginBottom:8}}>🌐 نقاط Google My Business</div>
            <div style={{display:"flex",gap:10,marginBottom:8,flexWrap:"wrap"}}>
              {[["🏆",totalPts,"نقطة"],["⭐",avgStars,"معدل"],["📊",`${pctPts}%`,"أداء"]].map(([ic,v,l])=>(
                <div key={l} style={{flex:1,background:"#fff",borderRadius:10,padding:"8px 6px",textAlign:"center",minWidth:60}}>
                  <div style={{fontSize:14}}>{ic}</div>
                  <div style={{fontWeight:900,fontSize:14,color:C.blue}}>{v}</div>
                  <div style={{fontSize:9,color:C.gray}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{height:8,background:"rgba(26,115,232,.15)",borderRadius:8,marginBottom:5}}>
              <div style={{height:"100%",width:`${pctPts}%`,background:"linear-gradient(90deg,#1A73E8,#4F46E5)",borderRadius:8}}/>
            </div>
            <div style={{fontSize:10,color:C.gray}}>⭐⭐⭐⭐⭐=100 · ⭐⭐⭐⭐=80 · ⭐⭐⭐=50 · ⭐⭐=20 · ⭐=0 نقطة</div>
          </div>

          {/* Campaigns summary */}
          <div style={card()}>
            <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:8}}>💰 ملخص الحملات الإعلانية</div>
            {campaigns.filter(c=>c.status==="نشطة").map(c=>{
              const spentPct=Math.round((c.spent/c.budget)*100);
              const p=PLATFORMS.find(pp=>pp.id===c.platform)||{};
              return (
                <div key={c.id} style={{background:"#F8FAFC",borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontWeight:700,fontSize:12,color:C.dark}}>{c.name}</span>
                    <span style={{...badge(p.bg,p.color)}}>{p.icon} {p.name}</span>
                  </div>
                  <div style={{height:6,background:"#E2E8F0",borderRadius:6,marginBottom:4}}>
                    <div style={{height:"100%",width:`${spentPct}%`,background:spentPct>80?C.red:C.blue,borderRadius:6}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.gray}}>
                    <span>إنفاق: {c.spent}/{c.budget} ريال ({spentPct}%)</span>
                    <span>👆 {c.clicks} نقرة · 🎯 {c.leads} عميل</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggestions */}
          <div style={{...card(),background:"linear-gradient(135deg,#4F46E5,#1A73E8)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:13,marginBottom:10}}>🚀 مقترحات استراتيجية — أولمبيا عُمان</div>
            {[
              "🤝 تعاقد مع 2-3 رياضيين عُمانيين كـ Brand Ambassadors بمقابل رمزي",
              "🎯 أطلق تحدي #أولمبيا30يوم على تيك توك وانستجرام — يخلق محتوى مجاني",
              "📦 Unboxing يومي لكل منتج جديد — أعلى محتوى تحويلاً للمبيعات",
              "🏅 برنامج نقاط: كل شراء + تقييم + مشاركة = نقاط قابلة للاسترداد",
              "📱 WhatsApp Broadcast أسبوعي للعملاء المميزين بالعروض الحصرية",
              "🗓️ خطط المحتوى 30 يوماً مسبقاً — يوفر 70% من وقت الفريق",
              "📊 A/B Test لكل إعلان — جرب عنوانين وصورتين واحتفظ بالأفضل",
              "🌐 Google Ads: استهدف 'معدات رياضية مسقط' و'جيم عمان' و'أولمبيا'",
              "🎁 Flash Sale عبر Stories 24 ساعة فقط — يخلق إلحاحية حقيقية",
              "📱 Live شهري لعرض المنتجات الجديدة + جلسة تمارين مباشرة",
              "🔁 أعد توظيف المحتوى: فيديو يوتيوب ← كليبات تيك توك ← ستوريات ← بوستات",
              "📧 ابنِ قائمة Email + WhatsApp للعروض الأسبوعية — أعلى معدل فتح",
              "🤳 UGC (محتوى العملاء): شجع العملاء على مشاركة صور منتجاتهم بهاشتاق خاص",
              "🏪 Google Shopping: أضف منتجاتك لتظهر في نتائج بحث Google مباشرة",
              "📊 اعمل Retargeting لكل زوار الموقع وصفحات السوشيال الذين لم يشتروا",
            ].map((tip,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:11}}>
                <span style={{opacity:.6,flexShrink:0}}>{i+1}.</span><span style={{opacity:.9}}>{tip}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ═══════════════ TASKS ═══════════════ */}
      {view==="tasks" && (
        <>
          <div style={card()}>
            {/* platform filter */}
            <div style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:5}}>🌐 المنصة</div>
            <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:5,marginBottom:8}}>
              {[{id:"all",name:"الكل",icon:"🌐",color:C.purple,bg:"#EEF2FF"},...PLATFORMS].map(p=>(
                <button key={p.id} onClick={()=>setFilterPlat(p.id)}
                  style={{...btn(filterPlat===p.id?p.color:"#F1F5F9",filterPlat===p.id?"#fff":"#475569"),padding:"4px 9px",fontSize:10,whiteSpace:"nowrap"}}>
                  {p.icon} {p.name}
                </button>
              ))}
            </div>
            {/* owner filter */}
            <div style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:5}}>👤 المسؤول</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
              <button onClick={()=>setFilterOwner("all")} style={{...btn(filterOwner==="all"?C.purple:"#F1F5F9",filterOwner==="all"?"#fff":"#475569"),padding:"3px 8px",fontSize:10}}>الكل</button>
              {team.map(m=>(
                <button key={m.id} onClick={()=>setFilterOwner(m.id)}
                  style={{...btn(filterOwner===m.id?m.color:"#F1F5F9",filterOwner===m.id?"#fff":"#475569"),padding:"3px 8px",fontSize:10}}>
                  {m.avatar} {m.name.split(" ")[0]}
                </button>
              ))}
            </div>
            {/* status filter */}
            <div style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:5}}>📌 الحالة</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {["all","pending","inprogress","review","done","rejected"].map(s=>{
                const ss=STATUS_STYLE[s]||{bg:C.purple,label:"الكل"};
                return (
                  <button key={s} onClick={()=>setFilterStatus(s)}
                    style={{...btn(filterStatus===s?C.purple:"#F1F5F9",filterStatus===s?"#fff":"#475569"),padding:"3px 8px",fontSize:10}}>
                    {s==="all"?"الكل":ss.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div style={card()}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.gray,marginBottom:5}}>
              <span>الإنجاز الكلي</span>
              <span style={{fontWeight:800,color:C.purple}}>{tasks.length?Math.round((tasks.filter(t=>t.status==="done").length/tasks.length)*100):0}%</span>
            </div>
            <div style={{height:8,background:"#E2E8F0",borderRadius:8}}>
              <div style={{height:"100%",width:`${tasks.length?Math.round((tasks.filter(t=>t.status==="done").length/tasks.length)*100):0}%`,background:`linear-gradient(90deg,${C.purple},${C.blue})`,borderRadius:8}}/>
            </div>
            <div style={{fontSize:11,color:C.gray,marginTop:5}}>{tasks.filter(t=>t.status==="done").length} من {tasks.length} مهمة منجزة</div>
          </div>

          {filtTasks.map(t=>{
            const p=PLATFORMS.find(pp=>pp.id===t.platform)||{};
            const m=team.find(mm=>mm.id===t.owner)||{};
            const tc=TYPE_COLORS[t.type]||{bg:"#F1F5F9",text:"#475569"};
            const pc=PRI[t.priority]||{bg:"#F1F5F9",text:C.gray};
            const ss=STATUS_STYLE[t.status]||STATUS_STYLE.pending;
            return (
              <div key={t.id} style={{...card({marginBottom:8}),borderRight:`4px solid ${p.color||"#CBD5E1"}`,opacity:t.status==="done"?.55:1}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.dark,marginBottom:5,textDecoration:t.status==="done"?"line-through":"none"}}>{t.task}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                      <span style={{...badge(p.bg,p.color)}}>{p.icon} {p.name}</span>
                      <span style={{...badge(tc.bg,tc.text)}}>{t.type}</span>
                      <span style={{...badge(pc.bg,pc.text)}}>{t.priority}</span>
                      <span style={{...badge(ss.bg,ss.text)}}>{ss.label}</span>
                      <span style={{...badge("#F8FAFC",C.gray)}}>⏰{t.time}</span>
                      <span style={{...badge("#F0F9FF",m.color||C.blue)}}>{m.avatar} {m.name?.split(" ")[0]}</span>
                      {!t.approved&&<span style={{...badge("#FEE2E2",C.red)}}>⚠️ بانتظار اعتماد</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:4}}>
                    {["pending","inprogress","review"].map(s=>(
                      <button key={s} onClick={()=>updateTaskStatus(t.id,s)} style={{...btn(t.status===s?C.purple:"#F1F5F9",t.status===s?"#fff":C.gray),padding:"3px 7px",fontSize:9}}>
                        {STATUS_STYLE[s].label}
                      </button>
                    ))}
                    <button onClick={()=>updateTaskStatus(t.id,"done")} style={{...btn(t.status==="done"?C.green:"#F0FDF4",t.status==="done"?"#fff":C.green),padding:"3px 7px",fontSize:9}}>
                      ✅ منجز
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* ═══════════════ APPROVAL WORKFLOW ═══════════════ */}
      {view==="approval" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#FEF9C3,#FFF)",border:"2px solid #F59E0B"}}>
            <div style={{fontWeight:800,fontSize:14,color:"#92400E",marginBottom:5}}>✅ نظام اعتماد المحتوى</div>
            <div style={{fontSize:11,color:"#92400E",opacity:.8}}>راجع واعتمد أو ارفض المحتوى قبل النشر</div>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <div style={{...badge("#FEE2E2",C.red),fontSize:12}}>{pendingApproval} بانتظار الاعتماد</div>
              <div style={{...badge("#F0FDF4",C.green),fontSize:12}}>{tasks.filter(t=>t.approved).length} معتمد</div>
            </div>
          </div>

          {/* filter */}
          <div style={{display:"flex",gap:5,marginBottom:10}}>
            {[["pending","⏳ بانتظار الاعتماد"],["approved","✅ معتمد"],["rejected","❌ مرفوض"]].map(([v,l])=>(
              <button key={v} onClick={()=>setApprovView(v)}
                style={{...btn(approvView===v?C.purple:"#fff",approvView===v?"#fff":C.gray),flex:1,fontSize:10}}>
                {l}
              </button>
            ))}
          </div>

          {tasks.filter(t=>
            approvView==="pending"?(!t.approved&&t.status!=="done"&&t.status!=="rejected"):
            approvView==="approved"?t.approved:
            t.status==="rejected"
          ).map(t=>{
            const p=PLATFORMS.find(pp=>pp.id===t.platform)||{};
            const m=team.find(mm=>mm.id===t.owner)||{};
            return (
              <div key={t.id} style={{...card({marginBottom:8}),borderRight:`4px solid ${t.approved?C.green:t.status==="rejected"?C.red:C.amber}`}}>
                <div style={{fontWeight:700,fontSize:13,color:C.dark,marginBottom:6}}>{t.task}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                  <span style={{...badge(p.bg,p.color)}}>{p.icon} {p.name}</span>
                  <span style={{...badge("#F8FAFC",C.gray)}}>⏰ {t.time} — 📅 {t.day}</span>
                  <span style={{...badge("#F0F9FF",m.color||C.blue)}}>{m.avatar} {m.name}</span>
                </div>
                {approvView==="pending" && (
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>approveTask(t.id)} style={{...btn("#F0FDF4",C.green),flex:1,padding:8,fontSize:12}}>✅ اعتماد</button>
                    <button onClick={()=>rejectTask(t.id)} style={{...btn("#FEE2E2",C.red),flex:1,padding:8,fontSize:12}}>❌ رفض</button>
                  </div>
                )}
                {t.approved&&<div style={{...badge("#F0FDF4",C.green),fontSize:11,textAlign:"center",padding:"5px 0",display:"block"}}>✅ معتمد للنشر</div>}
                {t.status==="rejected"&&<div style={{...badge("#FEE2E2",C.red),fontSize:11,textAlign:"center",padding:"5px 0",display:"block"}}>❌ مرفوض — يحتاج مراجعة</div>}
              </div>
            );
          })}
        </>
      )}

      {/* ═══════════════ KPI DASHBOARD ═══════════════ */}
      {view==="kpi" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#4F46E5,#7C3AED)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>📊 لوحة الأهداف والمؤشرات KPIs</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>تتبع الأداء مقابل الأهداف المحددة</div>
          </div>
          <div style={{display:"flex",gap:5,marginBottom:10,overflowX:"auto"}}>
            {PLATFORMS.map(p=>(
              <button key={p.id} onClick={()=>setKpiPlatform(p.id)}
                style={{...btn(kpiPlatform===p.id?p.color:"#fff",kpiPlatform===p.id?"#fff":C.gray),flex:"0 0 auto",fontSize:10,padding:"5px 10px",whiteSpace:"nowrap"}}>
                {p.icon} {p.name}
              </button>
            ))}
          </div>

          {(() => {
            const p=PLATFORMS.find(pp=>pp.id===kpiPlatform)||{};
            const kpi=KPI_TARGETS[kpiPlatform]||{};
            const fd=getF(kpiPlatform);
            const cur=fd.daily[fd.daily.length-1]||0;
            const follGrowth=dailyG(kpiPlatform);
            return (
              <div>
                <div style={{...card(),borderTop:`3px solid ${p.color}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <span style={{fontSize:24}}>{p.icon}</span>
                    <div>
                      <div style={{fontWeight:800,fontSize:15,color:p.color}}>{p.name}</div>
                      <div style={{fontSize:11,color:C.gray}}>الهدف: {fd.goal?.toLocaleString()} متابع</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {[
                      {label:"المتابعون الحاليون",value:cur.toLocaleString(),target:fd.goal?.toLocaleString(),pct:Math.round((cur/(fd.goal||1))*100)},
                      {label:"نمو اليوم",value:`+${follGrowth}`,target:`+${fd.dailyTarget}`,pct:Math.round((follGrowth/(fd.dailyTarget||1))*100)},
                      ...Object.entries(kpi).map(([k,v])=>({label:k,value:"—",target:v,pct:0})),
                    ].slice(0,8).map((item,i)=>(
                      <div key={i} style={{background:"#F8FAFC",borderRadius:10,padding:"10px 12px"}}>
                        <div style={{fontSize:10,color:C.gray,marginBottom:4}}>{item.label}</div>
                        <div style={{fontWeight:800,fontSize:14,color:p.color}}>{item.value}</div>
                        <div style={{fontSize:10,color:C.gray}}>الهدف: {item.target}</div>
                        {item.pct>0&&(
                          <div style={{height:4,background:"#E2E8F0",borderRadius:4,marginTop:5}}>
                            <div style={{height:"100%",width:`${Math.min(item.pct,100)}%`,background:item.pct>=100?C.green:item.pct>=60?C.amber:C.red,borderRadius:4}}/>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={card()}>
                  <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:8}}>💡 نصائح {p.name}</div>
                  {(TIPS[kpiPlatform]||[]).map((tip,i)=>(
                    <div key={i} style={{padding:"6px 10px",background:i%2===0?p.bg:"#F8FAFC",borderRadius:8,marginBottom:4,fontSize:12,color:C.dark}}>{tip}</div>
                  ))}
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* ═══════════════ TEAM ═══════════════ */}
      {view==="team" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#4F46E5,#7C3AED)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>👥 إدارة الفريق الداخلي</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>أداء الأعضاء، توزيع المهام، والمسؤوليات</div>
          </div>
          {team.map(m=>{
            const mTasks=tasks.filter(t=>t.owner===m.id);
            const mDone=mTasks.filter(t=>t.status==="done").length;
            const mProg=mTasks.length?Math.round((mDone/mTasks.length)*100):0;
            const mPending=mTasks.filter(t=>t.status==="pending").length;
            const mInProg=mTasks.filter(t=>t.status==="inprogress").length;
            return (
              <div key={m.id} style={{...card(),borderRight:`4px solid ${m.color}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:42,height:42,borderRadius:"50%",background:`${m.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{m.avatar}</div>
                    <div>
                      <div style={{fontWeight:800,fontSize:14,color:m.color}}>{m.name}</div>
                      <div style={{fontSize:11,color:C.gray}}>{m.role}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontWeight:900,fontSize:20,color:m.color}}>{m.kpi}%</div>
                    <div style={{fontSize:9,color:C.gray}}>KPI الشهري</div>
                  </div>
                </div>
                <div style={{height:8,background:"#E2E8F0",borderRadius:8,marginBottom:8}}>
                  <div style={{height:"100%",width:`${mProg}%`,background:m.color,borderRadius:8}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}}>
                  {[["📋",mTasks.length,"إجمالي"],["✅",mDone,"منجز"],["🔄",mInProg,"جارٍ"],["⬜",mPending,"معلق"]].map(([ic,v,l])=>(
                    <div key={l} style={{background:"#F8FAFC",borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                      <div style={{fontWeight:800,color:m.color,fontSize:13}}>{ic} {v}</div>
                      <div style={{fontSize:9,color:C.gray}}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11,fontWeight:700,color:C.gray,marginBottom:5}}>آخر المهام:</div>
                {mTasks.slice(0,3).map(t=>{
                  const p=PLATFORMS.find(pp=>pp.id===t.platform)||{};
                  const ss=STATUS_STYLE[t.status]||STATUS_STYLE.pending;
                  return (
                    <div key={t.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",background:"#F8FAFC",borderRadius:7,marginBottom:4}}>
                      <span style={{fontSize:12}}>{p.icon}</span>
                      <span style={{flex:1,fontSize:11,color:C.dark}}>{t.task}</span>
                      <span style={{...badge(ss.bg,ss.text),fontSize:9}}>{ss.label}</span>
                    </div>
                  );
                })}
                <div style={{marginTop:8}}>
                  <button onClick={()=>{
                    const newKpi=prompt(`KPI الشهري لـ ${m.name} (الحالي: ${m.kpi}%):`);
                    if(newKpi&&!isNaN(newKpi)) setTeam(tm=>tm.map(mm=>mm.id===m.id?{...mm,kpi:parseInt(newKpi)}:mm));
                  }} style={{...btn("#F0F9FF",m.color),width:"100%",fontSize:11}}>✏️ تحديث KPI</button>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* ═══════════════ CAMPAIGNS ═══════════════ */}
      {view==="campaigns" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#16A34A,#059669)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>💰 إدارة الحملات الإعلانية والميزانيات</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>تتبع الإنفاق والعائد لكل حملة</div>
            <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
              {[["💰",campaigns.reduce((s,c)=>s+c.budget,0)+" ريال","الميزانية الكلية"],
                ["💸",campaigns.reduce((s,c)=>s+c.spent,0)+" ريال","إجمالي الإنفاق"],
                ["🎯",campaigns.reduce((s,c)=>s+c.leads,0),"إجمالي العملاء"],
                ["👆",campaigns.reduce((s,c)=>s+c.clicks,0),"إجمالي النقرات"]].map(([ic,v,l])=>(
                <div key={l} style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:"5px 10px",fontSize:10,fontWeight:700,textAlign:"center"}}>
                  <div>{ic} {v}</div><div style={{fontSize:9,opacity:.8}}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {campaigns.map(c=>{
            const p=PLATFORMS.find(pp=>pp.id===c.platform)||{};
            const spentPct=Math.round((c.spent/c.budget)*100);
            const cpl=c.leads?Math.round(c.spent/c.leads):0;
            const cpc=c.clicks?Math.round(c.spent/c.clicks*100)/100:0;
            return (
              <div key={c.id} style={{...card(),borderRight:`4px solid ${p.color||C.blue}`,opacity:c.status==="منتهية"?.7:1}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13,color:C.dark}}>{c.name}</div>
                    <div style={{fontSize:10,color:C.gray,marginTop:2}}>{c.start} — {c.end} · هدف: {c.objective}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"flex-end"}}>
                    <span style={{...badge(p.bg,p.color)}}>{p.icon} {p.name}</span>
                    <span style={{...badge(c.status==="نشطة"?"#F0FDF4":c.status==="مجدولة"?"#EFF6FF":"#F1F5F9",c.status==="نشطة"?C.green:c.status==="مجدولة"?C.blue:C.gray)}}>{c.status}</span>
                  </div>
                </div>
                <div style={{height:8,background:"#E2E8F0",borderRadius:8,marginBottom:6}}>
                  <div style={{height:"100%",width:`${Math.min(spentPct,100)}%`,background:spentPct>80?C.red:spentPct>60?C.amber:C.green,borderRadius:8}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                  {[["💰",`${c.budget}ر`,"الميزانية"],["💸",`${c.spent}ر`,"المُنفق"],["🎯",c.leads,"عميل"],["👆",c.clicks,"نقرة"]].map(([ic,v,l])=>(
                    <div key={l} style={{background:"#F8FAFC",borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                      <div style={{fontWeight:800,fontSize:12,color:C.dark}}>{ic} {v}</div>
                      <div style={{fontSize:9,color:C.gray}}>{l}</div>
                    </div>
                  ))}
                </div>
                {c.leads>0&&(
                  <div style={{marginTop:8,padding:"6px 10px",background:"#EFF6FF",borderRadius:8,fontSize:11,color:C.blue}}>
                    💡 تكلفة العميل: {cpl} ريال · تكلفة النقرة: {cpc} ريال
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ═══════════════ FOLLOWERS ═══════════════ */}
      {view==="followers" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#4F46E5,#7C3AED)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>📈 تتبع المتابعين — جميع المنصات</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>النمو اليومي والأسبوعي والتقدم نحو الأهداف</div>
          </div>
          {PLATFORMS.filter(p=>p.followers).map(p=>{
            const fd=getF(p.id);
            const cur=fd.daily[fd.daily.length-1]||0;
            const g=dailyG(p.id);
            const pct=Math.round((cur/(fd.goal||1))*100);
            const weekG=fd.daily.length>=7?cur-fd.daily[fd.daily.length-7]:cur-fd.daily[0];
            const daysToGoal=g>0?Math.ceil((fd.goal-cur)/g):null;
            return (
              <div key={p.id} style={{...card(),borderRight:`4px solid ${p.color}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontSize:22}}>{p.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:14,color:p.color}}>{p.name}</div>
                    <div style={{fontWeight:900,fontSize:22,color:C.dark}}>{cur.toLocaleString()}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontWeight:800,fontSize:18,color:g>=0?C.green:C.red}}>{g>=0?"▲":"▼"}{Math.abs(g).toLocaleString()}</div>
                    <div style={{fontSize:10,color:C.gray}}>زيادة اليوم</div>
                  </div>
                </div>
                <div style={{height:8,background:"#E2E8F0",borderRadius:8,marginBottom:8}}>
                  <div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:p.color,borderRadius:8}}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:10}}>
                  {[["📅",`+${weekG.toLocaleString()}`,"نمو الأسبوع"],["🎯",fd.goal.toLocaleString(),"الهدف"],["⏳",daysToGoal?`${daysToGoal} يوم`:"—","للوصول للهدف"]].map(([ic,v,l])=>(
                    <div key={l} style={{background:"#F8FAFC",borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                      <div style={{fontWeight:700,fontSize:11,color:p.color}}>{ic} {v}</div>
                      <div style={{fontSize:9,color:C.gray}}>{l}</div>
                    </div>
                  ))}
                </div>
                {/* mini bar chart */}
                <div style={{display:"flex",gap:2,alignItems:"flex-end",height:36,marginBottom:8}}>
                  {fd.daily.slice(-7).map((v,i,arr)=>{
                    const min=Math.min(...arr),max=Math.max(...arr);
                    const h=max===min?18:Math.round(((v-min)/(max-min))*30)+6;
                    return <div key={i} style={{flex:1,height:h,background:i===arr.length-1?p.color:`${p.color}44`,borderRadius:3}}/>;
                  })}
                </div>
                <div style={{fontSize:9,color:C.gray,marginBottom:8,textAlign:"center"}}>آخر 7 أيام</div>
                <div style={{display:"flex",gap:6}}>
                  <input value={follInput[p.id]||""} onChange={e=>setFollInput(f=>({...f,[p.id]:e.target.value}))}
                    placeholder="أضف عدد اليوم..."
                    style={{flex:1,borderRadius:8,border:"1.5px solid #E2E8F0",padding:"6px 10px",fontSize:11,direction:"rtl",outline:"none"}}/>
                  <button onClick={()=>{addFollDay(p.id,follInput[p.id]||"0");setFollInput(f=>({...f,[p.id]:""}));}}
                    style={{...btn(p.color,"#fff"),padding:"6px 12px",fontSize:11}}>تسجيل</button>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* ═══════════════ REVIEWS ═══════════════ */}
      {view==="reviews" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#1A73E8,#4F46E5)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:8}}>🏆 نظام نقاط التقييمات — GMB</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
              {[["🏆",`${totalPts}/${maxPts}`,"النقاط"],["⭐",avgStars,"المتوسط"],["📊",`${pctPts}%`,"الأداء"]].map(([ic,v,l])=>(
                <div key={l} style={{background:"rgba(255,255,255,.2)",borderRadius:10,padding:"8px 5px",textAlign:"center"}}>
                  <div style={{fontSize:18}}>{ic}</div>
                  <div style={{fontWeight:900,fontSize:16}}>{v}</div>
                  <div style={{fontSize:9,opacity:.85}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{height:10,background:"rgba(255,255,255,.2)",borderRadius:8,marginBottom:6}}>
              <div style={{height:"100%",width:`${pctPts}%`,background:"#fff",borderRadius:8}}/>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",fontSize:10,opacity:.9}}>
              {Object.entries(STAR_PTS).reverse().map(([s,p])=>(
                <span key={s}>{"⭐".repeat(Number(s)).substring(0,1)}{s}⭐={p}ن</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:10}}>
            {[["⭐",`${avgStars}/5`,"متوسط","#FEF9C3","#92400E"],["🔴",pendingRev,"يحتاج رد","#FEE2E2",C.red],
              ["😊",reviews.filter(r=>r.type==="إيجابي").length,"إيجابي","#F0FDF4",C.green],
              ["😐",reviews.filter(r=>r.type==="سلبي").length,"سلبي","#FEE2E2",C.red]].map(([ic,v,l,bg,color])=>(
              <div key={l} style={{...card({marginBottom:0}),background:bg,textAlign:"center"}}>
                <div style={{fontWeight:900,fontSize:18,color}}>{ic} {v}</div>
                <div style={{fontSize:10,color:C.gray}}>{l}</div>
              </div>
            ))}
          </div>

          {/* star distribution */}
          <div style={card()}>
            <div style={{fontSize:13,fontWeight:800,color:C.dark,marginBottom:8}}>📊 توزيع التقييمات والنقاط</div>
            {[5,4,3,2,1].map(s=>{
              const cnt=reviews.filter(r=>r.stars===s).length;
              const pct=reviews.length?Math.round((cnt/reviews.length)*100):0;
              const pts=STAR_PTS[s];
              return (
                <div key={s} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                  <span style={{fontSize:11,color:"#F59E0B",fontWeight:700,minWidth:28}}>{s}⭐</span>
                  <div style={{flex:1,height:8,background:"#E2E8F0",borderRadius:4}}>
                    <div style={{height:"100%",width:`${pct}%`,background:s>=4?C.green:s===3?C.amber:C.red,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:10,color:C.gray,minWidth:18}}>{cnt}</span>
                  <span style={{fontSize:10,color:C.purple,fontWeight:700,minWidth:45}}>{pts} نقطة</span>
                </div>
              );
            })}
          </div>

          {/* filter */}
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
            {["all","إيجابي","محايد","سلبي","pending","urgent"].map(f=>{
              const labels={all:"الكل","إيجابي":"✅ إيجابي","محايد":"🟡 محايد","سلبي":"❌ سلبي",pending:"⏳ معلق",urgent:"🚨 عاجل"};
              const colors={all:C.purple,"إيجابي":C.green,"محايد":C.amber,"سلبي":C.red,pending:C.violet,urgent:C.red};
              return (
                <button key={f} onClick={()=>setRevFilter(f)}
                  style={{...btn(revFilter===f?colors[f]:"#F1F5F9",revFilter===f?"#fff":"#475569"),padding:"5px 10px",fontSize:10}}>
                  {labels[f]}
                </button>
              );
            })}
          </div>

          {(revFilter==="all"?reviews:reviews.filter(r=>r.type===revFilter||r.status===revFilter)).map(rev=>{
            const pts=STAR_PTS[rev.stars]||0;
            const sc={replied:{bg:"#F0FDF4",text:C.green,label:"✅ تم الرد"},pending:{bg:"#FEF9C3",text:C.amber,label:"⏳ معلق"},urgent:{bg:"#FEE2E2",text:C.red,label:"🚨 عاجل!"}}[rev.status]||{};
            return (
              <div key={rev.id} style={{...card({marginBottom:10}),borderRight:`4px solid ${rev.status==="urgent"?C.red:rev.status==="replied"?C.green:C.amber}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13,color:C.dark}}>👤 {rev.name}</div>
                    <div style={{fontSize:10,color:C.gray}}>📅 {rev.date}</div>
                  </div>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontSize:15,color:"#F59E0B"}}>{"⭐".repeat(rev.stars)}</div>
                    <div style={{fontSize:10,color:C.purple,fontWeight:700}}>{pts} نقطة</div>
                    <div style={{...badge(sc.bg,sc.text),marginTop:3}}>{sc.label}</div>
                  </div>
                </div>
                <div style={{background:"#F8FAFC",borderRadius:8,padding:"7px 10px",fontSize:11,color:"#475569",fontStyle:"italic",marginBottom:8}}>"{rev.text}"</div>
                {rev.reply&&<div style={{background:"#E8F0FE",borderRadius:8,padding:"7px 10px",fontSize:11,color:C.blue,marginBottom:8}}><strong>ردك:</strong> {rev.reply}</div>}
                {rev.status!=="replied"&&(
                  activeReply===rev.id
                    ?<div>
                        <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="اكتب ردك..."
                          style={{width:"100%",borderRadius:8,border:"1px solid #CBD5E1",padding:"7px 10px",fontSize:11,resize:"vertical",minHeight:60,direction:"rtl",boxSizing:"border-box",marginBottom:6}}/>
                        <div style={{display:"flex",gap:5}}>
                          <button onClick={()=>submitReply(rev.id)} style={{...btn(C.blue,"#fff"),flex:1,padding:7,fontSize:11}}>✉️ إرسال</button>
                          <button onClick={()=>{setActiveReply(null);setReplyText("");}} style={{...btn("#F1F5F9",C.gray),padding:7,fontSize:11}}>إلغاء</button>
                        </div>
                      </div>
                    :<button onClick={()=>setActiveReply(rev.id)} style={{...btn("#E8F0FE",C.blue),width:"100%",padding:8,fontSize:11}}>💬 رد على التقييم</button>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ═══════════════ WHATSAPP ═══════════════ */}
      {view==="whatsapp" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:15}}>💬 مرسل واتساب الذكي — أولمبيا عُمان</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>إرسال فردي وجماعي بالماكرو التلقائي</div>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:10,background:"#fff",borderRadius:12,padding:5,boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
            {[{id:"compose",label:"✍️ الرسالة"},{id:"contacts",label:"👥 جهات"},{id:"templates",label:"📝 قوالب"},{id:"log",label:`📋 سجل${sendLog.length?` (${sendLog.length})`:""}`}].map(s=>(
              <button key={s.id} onClick={()=>setWaSection(s.id)}
                style={{flex:1,padding:"7px 4px",borderRadius:8,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,background:waSection===s.id?"#25D366":"transparent",color:waSection===s.id?"#fff":C.gray}}>
                {s.label}
              </button>
            ))}
          </div>

          {/* COMPOSE */}
          {waSection==="compose" && (
            <>
              <div style={card()}>
                <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:8}}>✍️ نص الرسالة</div>
                <textarea value={waMsg} onChange={e=>setWaMsg(e.target.value)}
                  placeholder={"اكتب رسالتك هنا...\nاستخدم [الاسم] لتخصيص الرسالة\nمثال: أهلاً [الاسم]، عرض خاص من أولمبيا!"}
                  style={{width:"100%",borderRadius:10,border:"1.5px solid #E2E8F0",padding:"10px 12px",fontSize:12,color:C.dark,resize:"vertical",minHeight:120,direction:"rtl",boxSizing:"border-box",outline:"none",lineHeight:1.7,fontFamily:"inherit"}}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
                  <span style={{fontSize:10,color:C.gray}}>{waMsg.length} حرف</span>
                  {waMsg&&<button onClick={()=>setWaMsg("")} style={{fontSize:10,color:C.red,background:"none",border:"none",cursor:"pointer",fontWeight:700}}>🗑 مسح</button>}
                </div>
              </div>
              <div style={card()}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <div style={{fontWeight:800,fontSize:13,color:C.dark}}>👥 المحددون ({selContacts.length})</div>
                </div>
                {selContacts.length===0
                  ?<div style={{textAlign:"center",color:C.gray,fontSize:12,padding:10}}>لم تحدد أي جهة اتصال — اذهب لتبويب "جهات"</div>
                  :<div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {selContacts.map(c=>(
                      <div key={c.id} style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:20,padding:"4px 10px",fontSize:10,color:C.green,fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
                        👤 {c.name}
                        <button onClick={()=>setContacts(cs=>cs.map(cc=>cc.id===c.id?{...cc,sel:false}:cc))} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:11}}>×</button>
                      </div>
                    ))}
                  </div>
                }
              </div>
              <div style={card()}>
                <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:10}}>🚀 الإرسال</div>
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:11,color:C.gray,fontWeight:700,marginBottom:5}}>📱 إرسال فردي</div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {selContacts.map(c=>(
                      <button key={c.id} onClick={()=>sendSingle(c)} disabled={!waMsg.trim()}
                        style={{...btn(waMsg.trim()?"#25D366":"#E2E8F0",waMsg.trim()?"#fff":C.gray),padding:"5px 10px",fontSize:10}}>
                        📤 {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <hr style={{border:"none",borderTop:"1px solid #F1F5F9",margin:"10px 0"}}/>
                <div style={{fontSize:11,color:C.gray,fontWeight:700,marginBottom:8}}>⚡ الماكرو — إرسال جماعي تلقائي</div>
                <div style={{background:"#FFF8E7",borderRadius:10,padding:"8px 12px",marginBottom:10,fontSize:11,color:"#92400E",border:"1px solid #FDE68A"}}>
                  ⚙️ يفتح واتساب ويب لكل جهة بالرسالة جاهزة — اضغط Enter للإرسال.<br/>
                  فعّل "السماح بالنوافذ المنبثقة" في متصفحك أولاً.
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:11,color:C.gray,whiteSpace:"nowrap"}}>⏱ تأخير:</span>
                  <input type="range" min={3} max={30} value={waDelay} onChange={e=>setWaDelay(Number(e.target.value))} style={{flex:1,accentColor:"#25D366"}}/>
                  <span style={{fontSize:12,fontWeight:700,color:"#25D366",minWidth:35}}>{waDelay}ث</span>
                </div>
                {macroSt==="running"
                  ?<div>
                      <div style={{background:"#F0FDF4",borderRadius:10,padding:"10px 14px",marginBottom:8}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                          <span style={{fontWeight:700,color:C.green}}>⚡ جارٍ الإرسال...</span>
                          <span style={{color:C.gray}}>{macroIdx}/{selContacts.length}</span>
                        </div>
                        <div style={{height:8,background:"#E2E8F0",borderRadius:8}}>
                          <div style={{height:"100%",width:`${(macroIdx/selContacts.length)*100}%`,background:"#25D366",borderRadius:8}}/>
                        </div>
                      </div>
                      <button onClick={()=>setMacroSt("idle")} style={{...btn("#FEE2E2",C.red),width:"100%",padding:10,fontSize:12}}>⏹ إيقاف</button>
                    </div>
                  :macroSt==="done"
                  ?<div>
                      <div style={{background:"#F0FDF4",borderRadius:10,padding:12,textAlign:"center",marginBottom:8}}>
                        <div style={{fontSize:22}}>✅</div>
                        <div style={{fontWeight:800,color:C.green}}>تم إرسال {selContacts.length} رسالة!</div>
                      </div>
                      <button onClick={()=>{setMacroSt("idle");setMacroIdx(0);}} style={{...btn("#DCFCE7",C.green),width:"100%",padding:10,fontSize:12}}>🔄 إعادة</button>
                    </div>
                  :<button onClick={runMacro} disabled={!waMsg.trim()||selContacts.length===0}
                      style={{...btn((waMsg.trim()&&selContacts.length>0)?"#25D366":"#E2E8F0",(waMsg.trim()&&selContacts.length>0)?"#fff":C.gray),width:"100%",padding:12,fontSize:13,background:(waMsg.trim()&&selContacts.length>0)?"linear-gradient(135deg,#25D366,#128C7E)":"#E2E8F0",cursor:(waMsg.trim()&&selContacts.length>0)?"pointer":"not-allowed"}}>
                      ⚡ تشغيل الماكرو — إرسال لـ {selContacts.length} جهة
                    </button>
                }
              </div>
            </>
          )}

          {/* CONTACTS */}
          {waSection==="contacts" && (
            <>
              <div style={card()}>
                <div style={{fontWeight:800,fontSize:13,color:C.dark,marginBottom:8}}>➕ إضافة جهة اتصال</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="الاسم الكامل"
                    style={{borderRadius:8,border:"1.5px solid #E2E8F0",padding:"7px 10px",fontSize:12,direction:"rtl",outline:"none"}}/>
                  <input value={newPhone} onChange={e=>setNewPhone(e.target.value)} placeholder="رقم مع كود الدولة: 96891234567"
                    style={{borderRadius:8,border:"1.5px solid #E2E8F0",padding:"7px 10px",fontSize:12,direction:"ltr",outline:"none"}}/>
                  <div style={{display:"flex",gap:5}}>
                    {["عميل","VIP","مورّد"].map(tag=>(
                      <button key={tag} onClick={()=>setNewTag(tag)} style={{...btn(newTag===tag?"#25D366":"#F1F5F9",newTag===tag?"#fff":C.gray),flex:1,fontSize:11}}>
                        {tag}
                      </button>
                    ))}
                  </div>
                  <button onClick={addContact} style={{...btn("#25D366","#fff"),padding:8,fontSize:12}}>➕ إضافة</button>
                </div>
              </div>
              <div style={{display:"flex",gap:5,marginBottom:10}}>
                {["الكل","عميل","VIP","مورّد"].map(tag=>(
                  <button key={tag} onClick={()=>setWaTagFilter(tag)}
                    style={{...btn(waTagFilter===tag?"#25D366":"#fff",waTagFilter===tag?"#fff":C.gray),flex:1,fontSize:10,boxShadow:"0 1px 3px rgba(0,0,0,.08)"}}>
                    {tag}
                  </button>
                ))}
              </div>
              {(waTagFilter==="الكل"?contacts:contacts.filter(c=>c.tag===waTagFilter)).map(c=>(
                <div key={c.id} style={{...card({marginBottom:7}),borderRight:`3px solid ${c.sel?"#25D366":"#E2E8F0"}`,display:"flex",alignItems:"center",gap:10}}>
                  <div onClick={()=>setContacts(cs=>cs.map(cc=>cc.id===c.id?{...cc,sel:!cc.sel}:cc))}
                    style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${c.sel?"#25D366":"#CBD5E1"}`,background:c.sel?"#25D366":"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,flexShrink:0,cursor:"pointer"}}>
                    {c.sel?"✓":""}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:12,color:C.dark}}>👤 {c.name}</div>
                    <div style={{fontSize:10,color:C.gray,direction:"ltr",textAlign:"right"}}>+{c.phone}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"flex-end"}}>
                    <span style={{...badge(c.tag==="VIP"?"#FEF9C3":"#F0FDF4",c.tag==="VIP"?C.amber:C.green)}}>{c.tag}</span>
                    <button onClick={()=>sendSingle(c)} style={{...btn("#DCFCE7",C.green),padding:"2px 7px",fontSize:9}}>📤 إرسال</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* TEMPLATES */}
          {waSection==="templates" && (
            <>
              <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
                {["الكل",...new Set(WA_TEMPLATES.map(t=>t.cat))].map(cat=>(
                  <button key={cat} onClick={()=>setWaTplCat(cat)}
                    style={{...btn(waTplCat===cat?"#25D366":"#fff",waTplCat===cat?"#fff":C.gray),padding:"4px 8px",fontSize:10,boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
                    {cat}
                  </button>
                ))}
              </div>
              {WA_TEMPLATES.filter(t=>waTplCat==="الكل"||t.cat===waTplCat).map(t=>(
                <div key={t.id} style={{...card({marginBottom:8}),border:"1px solid #E2E8F0"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{fontWeight:800,fontSize:11,color:"#25D366"}}>{t.icon} {t.label}</div>
                    <div style={{display:"flex",gap:4}}>
                      <button onClick={()=>{navigator.clipboard?.writeText(t.text);setCopiedTpl(t.id);setTimeout(()=>setCopiedTpl(null),2000);}}
                        style={{...btn(copiedTpl===t.id?"#DCFCE7":"#E8F0FE",copiedTpl===t.id?C.green:C.blue),padding:"2px 7px",fontSize:9}}>
                        {copiedTpl===t.id?"✅":"📋"} نسخ
                      </button>
                      <button onClick={()=>{setWaMsg(t.text);setWaSection("compose");}}
                        style={{...btn("#DCFCE7",C.green),padding:"2px 7px",fontSize:9}}>✍️ استخدم</button>
                    </div>
                  </div>
                  <div style={{background:"#F8FAFC",borderRadius:8,padding:"7px 10px",fontSize:10,color:"#475569",lineHeight:1.7,whiteSpace:"pre-line"}}>{t.text}</div>
                </div>
              ))}
            </>
          )}

          {/* LOG */}
          {waSection==="log" && (
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontWeight:800,fontSize:13,color:C.dark}}>📋 سجل الإرسال</div>
                {sendLog.length>0&&<button onClick={()=>setSendLog([])} style={{...btn("#FEE2E2",C.red),padding:"4px 8px",fontSize:9}}>🗑 مسح</button>}
              </div>
              {sendLog.length===0
                ?<div style={{...card(),textAlign:"center",color:C.gray,padding:40}}><div style={{fontSize:36}}>📭</div><div style={{fontWeight:700,marginTop:8,fontSize:13}}>لا توجد رسائل مرسلة بعد</div></div>
                :sendLog.map(e=>(
                  <div key={e.id} style={{...card({marginBottom:6}),display:"flex",alignItems:"center",gap:8,borderRight:"3px solid #25D366"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>✅</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:12}}>👤 {e.name}</div>
                      <div style={{fontSize:10,color:C.gray,direction:"ltr",textAlign:"right"}}>+{e.phone}</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:10,color:"#25D366",fontWeight:700}}>{e.status}</div>
                      <div style={{fontSize:9,color:C.gray}}>⏰ {e.time}</div>
                    </div>
                  </div>
                ))
              }
            </>
          )}
        </>
      )}

      {/* ═══════════════ HASHTAGS ═══════════════ */}
      {view==="hashtags" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#4F46E5,#1A73E8)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>#️⃣ بنك الهاشتاقات — أولمبيا للرياضة عُمان</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>{HASHTAGS.reduce((s,g)=>s+g.tags.length,0)} هاشتاق في {HASHTAGS.length} مجموعات</div>
          </div>
          {HASHTAGS.map((g,gi)=>(
            <div key={gi} style={{...card(),borderRight:`4px solid ${g.color}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontWeight:800,fontSize:12,color:g.color}}>{g.label}</div>
                <button onClick={()=>{navigator.clipboard?.writeText(g.tags.join(" "));setCopiedH(gi);setTimeout(()=>setCopiedH(null),2000);}}
                  style={{...btn(copiedH===gi?"#DCFCE7":"#E8F0FE",copiedH===gi?C.green:g.color),padding:"4px 9px",fontSize:10}}>
                  {copiedH===gi?"✅ تم":"📋 نسخ الكل"}
                </button>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {g.tags.map((tag,ti)=>(
                  <button key={ti} onClick={()=>navigator.clipboard?.writeText(tag)}
                    style={{padding:"3px 8px",borderRadius:20,border:`1px solid ${g.color}33`,cursor:"pointer",fontSize:10,fontWeight:600,background:g.bg,color:g.color}}>
                    {tag}
                  </button>
                ))}
              </div>
              <div style={{marginTop:6,fontSize:9,color:C.gray}}>اضغط لنسخ أي هاشتاق · {g.tags.length} هاشتاق</div>
            </div>
          ))}
          <div style={{...card(),background:"#F0FDF4",border:"1px solid #BBF7D0"}}>
            <div style={{fontWeight:800,fontSize:12,color:C.green,marginBottom:7}}>💡 نصائح الهاشتاقات الاحترافية</div>
            {["انستجرام: 5-8 هاشتاقات متخصصة (لا 30 عشوائي)","ضعها في التعليق الأول بدل الكابشن لمظهر أنظف","تيك توك: #FYP + 3 متخصصة كافية تماماً","غيّر مجموعة الهاشتاقات أسبوعياً لتجنب Shadow Ban","فيسبوك وتويتر: 1-2 هاشتاق فقط في المنشور"].map((t,i)=>(
              <div key={i} style={{fontSize:11,color:"#475569",marginBottom:4}}>• {t}</div>
            ))}
          </div>
        </>
      )}

      {/* ═══════════════ IDEAS BANK ═══════════════ */}
      {view==="ideas" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#F59E0B,#EF4444)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>💡 بنك أفكار المحتوى</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>أفكار المحتوى القادم لـ أولمبيا عُمان</div>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
            {["all",...new Set(ideas.map(i=>i.platform))].map(f=>{
              const p=PLATFORMS.find(pp=>pp.id===f)||{name:"الكل",icon:"🌐",color:C.purple,bg:"#EEF2FF"};
              return (
                <button key={f} onClick={()=>setIdeaFilter(f)}
                  style={{...btn(ideaFilter===f?p.color:"#fff",ideaFilter===f?"#fff":C.gray),fontSize:10,padding:"4px 9px",boxShadow:"0 1px 3px rgba(0,0,0,.07)"}}>
                  {p.icon} {f==="all"?"الكل":p.name}
                </button>
              );
            })}
          </div>
          {(ideaFilter==="all"?ideas:ideas.filter(i=>i.platform===ideaFilter)).map(idea=>{
            const p=PLATFORMS.find(pp=>pp.id===idea.platform)||{};
            const pc=PRI[idea.priority]||{bg:"#F1F5F9",text:C.gray};
            const stColors={جديد:{bg:"#EFF6FF",text:C.blue},"قيد التخطيط":{bg:"#FEF9C3",text:C.amber},منجز:{bg:"#F0FDF4",text:C.green}};
            const sc=stColors[idea.status]||{bg:"#F1F5F9",text:C.gray};
            return (
              <div key={idea.id} style={{...card({marginBottom:8}),borderRight:`4px solid ${p.color||C.purple}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{fontWeight:700,fontSize:13,color:C.dark}}>{idea.title}</div>
                  <div style={{display:"flex",gap:4}}>
                    <span style={{...badge(pc.bg,pc.text)}}>{idea.priority}</span>
                    <span style={{...badge(sc.bg,sc.text)}}>{idea.status}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:4,marginBottom:6}}>
                  <span style={{...badge(p.bg,p.color)}}>{p.icon} {p.name}</span>
                  <span style={{...badge("#F5F3FF","#7C3AED")}}>{idea.type}</span>
                </div>
                <div style={{fontSize:11,color:C.gray,background:"#F8FAFC",borderRadius:6,padding:"5px 8px"}}>{idea.note}</div>
                <div style={{display:"flex",gap:5,marginTop:8}}>
                  {["جديد","قيد التخطيط","منجز"].map(s=>(
                    <button key={s} onClick={()=>setIdeas(is=>is.map(i=>i.id===idea.id?{...i,status:s}:i))}
                      style={{...btn(idea.status===s?C.purple:"#F1F5F9",idea.status===s?"#fff":C.gray),flex:1,padding:"4px",fontSize:9}}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          <button onClick={()=>setIdeas(is=>[...is,{id:Date.now(),title:"فكرة جديدة",platform:"instagram",type:"بوست",priority:"متوسط",status:"جديد",note:"أضف ملاحظاتك هنا"}])}
            style={{...btn(C.purple,"#fff"),width:"100%",padding:10,fontSize:12}}>➕ إضافة فكرة جديدة</button>
        </>
      )}

      {/* ═══════════════ MEETINGS ═══════════════ */}
      {view==="meetings" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#0F766E,#0369A1)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>🗓 اجتماعات الفريق ومحاضر العمل</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>توثيق الاجتماعات والقرارات والمهام</div>
          </div>

          {!newMeeting
            ?<button onClick={()=>setNewMeeting(true)} style={{...btn(C.teal,"#fff"),width:"100%",padding:10,fontSize:12,marginBottom:10}}>➕ اجتماع جديد</button>
            :<div style={{...card(),border:"2px solid #0F766E"}}>
                <div style={{fontWeight:700,fontSize:13,color:C.teal,marginBottom:8}}>📝 اجتماع جديد</div>
                <input value={mtgTitle} onChange={e=>setMtgTitle(e.target.value)} placeholder="عنوان الاجتماع"
                  style={{width:"100%",borderRadius:8,border:"1.5px solid #E2E8F0",padding:"7px 10px",fontSize:12,direction:"rtl",outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
                <textarea value={mtgNotes} onChange={e=>setMtgNotes(e.target.value)} placeholder="ملاحظات ومحاضر الاجتماع..."
                  style={{width:"100%",borderRadius:8,border:"1.5px solid #E2E8F0",padding:"7px 10px",fontSize:12,direction:"rtl",resize:"vertical",minHeight:80,outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>{
                    if(!mtgTitle.trim())return;
                    const d=new Date();
                    setMeetings(ms=>[...ms,{id:Date.now(),date:`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`,title:mtgTitle,attendees:[1,2,3],notes:mtgNotes,actions:[],done:false}]);
                    setMtgTitle("");setMtgNotes("");setNewMeeting(false);
                  }} style={{...btn(C.teal,"#fff"),flex:1,padding:8,fontSize:12}}>💾 حفظ</button>
                  <button onClick={()=>setNewMeeting(false)} style={{...btn("#F1F5F9",C.gray),padding:8,fontSize:12}}>إلغاء</button>
                </div>
              </div>
          }

          {meetings.map(m=>(
            <div key={m.id} style={{...card(),borderRight:`4px solid ${C.teal}`,opacity:m.done?.6:1}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div>
                  <div style={{fontWeight:800,fontSize:13,color:C.dark}}>{m.title}</div>
                  <div style={{fontSize:10,color:C.gray,marginTop:2}}>📅 {m.date}</div>
                </div>
                <button onClick={()=>setMeetings(ms=>ms.map(mm=>mm.id===m.id?{...mm,done:!mm.done}:mm))}
                  style={{...btn(m.done?"#F0FDF4":"#F1F5F9",m.done?C.green:C.gray),padding:"4px 8px",fontSize:10}}>
                  {m.done?"✅ مكتمل":"⬜ جارٍ"}
                </button>
              </div>
              <div style={{background:"#F8FAFC",borderRadius:8,padding:"8px 10px",fontSize:11,color:"#475569",marginBottom:8}}>{m.notes}</div>
              {m.actions.length>0&&(
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:C.dark,marginBottom:5}}>✅ بنود العمل:</div>
                  {m.actions.map((a,i)=>(
                    <div key={i} style={{fontSize:11,color:"#475569",padding:"3px 0",borderBottom:"1px solid #F1F5F9"}}>• {a}</div>
                  ))}
                </div>
              )}
              <div style={{display:"flex",gap:5,marginTop:8}}>
                {m.attendees.map(aid=>{
                  const mm=team.find(t=>t.id===aid);
                  return mm?<span key={aid} style={{fontSize:14}} title={mm.name}>{mm.avatar}</span>:null;
                })}
                <span style={{fontSize:10,color:C.gray,marginRight:"auto"}}>{m.attendees.length} حضور</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ═══════════════ ALERTS ═══════════════ */}
      {view==="alerts" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#DC2626,#7C3AED)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>🔔 مركز التنبيهات والإشعارات</div>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <span style={{...badge("rgba(255,255,255,.2)","#fff"),fontSize:11}}>{unreadAlerts} غير مقروء</span>
              <span style={{...badge("rgba(255,255,255,.2)","#fff"),fontSize:11}}>{alerts.length} إجمالي</span>
            </div>
          </div>
          <div style={{display:"flex",gap:5,marginBottom:10}}>
            <button onClick={()=>setAlerts(as=>as.map(a=>({...a,read:true})))} style={{...btn("#F1F5F9",C.gray),flex:1,fontSize:11}}>✓ قراءة الكل</button>
            <button onClick={()=>setAlerts(as=>as.filter(a=>a.read))} style={{...btn("#FEE2E2",C.red),flex:1,fontSize:11}}>🗑 حذف المقروءة</button>
          </div>
          {alerts.map(a=>(
            <div key={a.id} style={{...card({marginBottom:7}),opacity:a.read?.6:1,borderRight:`4px solid ${a.type==="urgent"?C.red:a.type==="warning"?C.amber:a.type==="success"?C.green:C.blue}`}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:20,flexShrink:0}}>{a.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:C.dark,fontWeight:a.read?400:700}}>{a.msg}</div>
                  <div style={{fontSize:10,color:C.gray,marginTop:3}}>{a.time}</div>
                </div>
                {!a.read&&<button onClick={()=>markAlertRead(a.id)} style={{...btn("#F1F5F9",C.gray),padding:"4px 8px",fontSize:10}}>✓</button>}
              </div>
            </div>
          ))}
          <button onClick={()=>setAlerts(as=>[{id:Date.now(),type:"info",icon:"💡",msg:"تنبيه جديد — اضغط هنا لتعديل النص",time:"الآن",read:false},...as])}
            style={{...btn(C.purple,"#fff"),width:"100%",padding:10,fontSize:12,marginTop:4}}>➕ إضافة تنبيه</button>
        </>
      )}

      {/* ═══════════════ COMPETITORS ═══════════════ */}
      {view==="competitors" && (
        <>
          <div style={{...card(),background:"linear-gradient(135deg,#374151,#1F2937)",color:"#fff"}}>
            <div style={{fontWeight:800,fontSize:14}}>🔍 رصد ومراقبة المنافسين</div>
            <div style={{fontSize:11,opacity:.85,marginTop:3}}>تابع أداء المنافسين في السوق العُماني</div>
          </div>
          {COMPETITORS.map((c,i)=>{
            const ourFollowers=PLATFORMS.find(p=>p.id===c.platform)?.followers||0;
            const gap=c.followers-ourFollowers;
            return (
              <div key={i} style={{...card(),borderRight:"4px solid #374151"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13,color:C.dark}}>{c.name}</div>
                    <div style={{fontSize:10,color:C.gray,marginTop:2}}>{PLATFORMS.find(p=>p.id===c.platform)?.icon} {c.platform} · آخر نشر: {c.lastPost}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontWeight:900,fontSize:16,color:gap>0?C.red:C.green}}>{c.followers.toLocaleString()}</div>
                    <div style={{fontSize:9,color:C.gray}}>متابع</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6}}>
                  {[["📊",`${c.engagement}%`,"التفاعل"],["📅",`${c.postsPerDay}×/يوم`,"تكرار النشر"],["📉",gap>0?`-${gap.toLocaleString()}`:`+${Math.abs(gap).toLocaleString()}`,"الفجوة معنا"]].map(([ic,v,l])=>(
                    <div key={l} style={{background:"#F8FAFC",borderRadius:8,padding:"6px 4px",textAlign:"center"}}>
                      <div style={{fontWeight:700,fontSize:11,color:l==="الفجوة معنا"?(gap>0?C.red:C.green):C.dark}}>{ic} {v}</div>
                      <div style={{fontSize:9,color:C.gray}}>{l}</div>
                    </div>
                  ))}
                </div>
                {gap>0&&(
                  <div style={{marginTop:8,padding:"6px 10px",background:"#FEF9C3",borderRadius:8,fontSize:11,color:C.amber}}>
                    ⚠️ متأخرون بـ {gap.toLocaleString()} متابع — نحتاج {Math.ceil(gap/dailyG(c.platform)||1)} يوم للحاق
                  </div>
                )}
              </div>
            );
          })}
          <div style={{...card(),background:"#EFF6FF",border:"1px solid #BFDBFE"}}>
            <div style={{fontWeight:800,fontSize:12,color:C.blue,marginBottom:7}}>🎯 استراتيجية مواجهة المنافسين</div>
            {["انشر بتكرار أعلى منهم — الكمية + الجودة معاً","ركز على المحتوى الذي يتفاعل معه جمهورهم ويؤديه بشكل أضعف","استخدم هاشتاقاتهم الناجحة وأضف هاشتاقاتك الخاصة","الرد الأسرع على التعليقات = تجربة عميل أفضل","تميّز بالمحتوى التعليمي والمحلي العُماني"].map((tip,i)=>(
              <div key={i} style={{fontSize:11,color:"#475569",marginBottom:4}}>• {tip}</div>
            ))}
          </div>
        </>
      )}

      {/* ═══════════════ SCHEDULE / TIPS ═══════════════ */}
      {view==="schedule" && PLATFORMS.map(p=>(
        <div key={p.id} style={{...card(),borderRight:`4px solid ${p.color}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:22}}>{p.icon}</span>
            <div style={{fontWeight:800,fontSize:14,color:p.color}}>{p.name}</div>
          </div>
          {(TIPS[p.id]||[]).map((tip,i)=>(
            <div key={i} style={{padding:"7px 10px",background:i%2===0?p.bg:"#F8FAFC",borderRadius:8,marginBottom:5,fontSize:12,color:C.dark}}>{tip}</div>
          ))}
        </div>
      ))}

    </div>
  );
}
