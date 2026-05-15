window.QAWALEB_TEMPLATE_PRESETS = [
  {
    "id": "points-broadcast",
    "label": "نقاط",
    "description": "نقاط · Points Broadcast",
    "fileName": "polets.html",
    "animationPreset": "broadcast-split",
    "fields": [
      {
        "id": "i-title-main",
        "label": "العنوان الرئيسي",
        "type": "text",
        "placeholder": "العنوان الرئيسي"
      },
      {
        "id": "i-title-sub",
        "label": "العنوان الفرعي",
        "type": "text",
        "placeholder": "العنوان الفرعي"
      },
      {
        "id": "i-quote",
        "label": "النقاط",
        "type": "textarea",
        "rows": 8,
        "placeholder": "النقطة الأولى ++ النقطة التالية ++ النقطة التالية ++ النقطة التالية"
      },
      {
        "id": "i-group-duration",
        "label": "مدة كل شريحة (ث)",
        "type": "number",
        "min": 3,
        "max": 60,
        "step": 1,
        "placeholder": "مدة كل شريحة بالثواني",
        "includeInText": false
      },
      {
        "id": "i-loop",
        "label": "التكرار",
        "type": "number",
        "min": 0,
        "max": 1,
        "step": 1,
        "placeholder": "1 للتكرار / 0 للإيقاف",
        "includeInText": false
      },
      {
        "id": "i-speaker",
        "label": "اسم المتحدث",
        "type": "text",
        "placeholder": "اسم المتحدث"
      },
      {
        "id": "i-role",
        "label": "الصفة / الموقع",
        "type": "text",
        "placeholder": "الصفة / الموقع"
      },
      {
        "id": "i-photo",
        "label": "صورة المتحدث",
        "type": "text",
        "placeholder": "صورة المتحدث"
      },
      {
        "id": "i-source",
        "label": "المصدر",
        "type": "text",
        "placeholder": "المصدر"
      }
    ],
    "defaults": {
      "i-title-main": "مراسل الجزيرة",
      "i-title-sub": "البرلمان العراقي",
      "i-quote": "البرلمان العراقي يصوت لصالح منح الثقة لحكومة الزيدي ++ البرلمان العراقي يصوت على عدد من الوزراء الجدد ++ الحكومة تعلن أولويات المرحلة المقبلة ++ الكتل السياسية تترقب التصويت النهائي ++ الشارع العراقي ينتظر نتائج التشكيل ++ مراقبون يتحدثون عن تحديات اقتصادية وأمنية",
      "i-group-duration": "10",
      "i-loop": "1",
      "i-speaker": "مراسل الجزيرة",
      "i-role": "بغداد — العراق",
      "i-photo": "",
      "i-source": "المصدر: الجزيرة مباشر"
    }
  },
  {
    "id": "breaking-bold",
    "label": "خبر عاجل",
    "description": "عاجل · Breaking Bold",
    "fileName": "01-breaking-bold.html",
    "animationPreset": "impact-shock",
    "fields": [
      {
        "id": "i-title",
        "label": "العنوان",
        "type": "text",
        "placeholder": "العنوان"
      },
      {
        "id": "i-body",
        "label": "نص الخبر",
        "type": "textarea",
        "rows": 3,
        "placeholder": "نص الخبر"
      },
      {
        "id": "i-kicker",
        "label": "التصنيف",
        "type": "text",
        "placeholder": "التصنيف"
      },
      {
        "id": "i-source",
        "label": "المصدر",
        "type": "text",
        "placeholder": "المصدر"
      },
      {
        "id": "i-cap",
        "label": "تسمية الصورة",
        "type": "text",
        "placeholder": "تسمية الصورة"
      },
      {
        "id": "i-time",
        "label": "الوقت",
        "type": "text",
        "placeholder": "الوقت"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-title": "انفجار قوي يهز محيط العاصمة وسط استنفار أمني واسع",
      "i-body": "أفادت مصادر محلية بأن انفجاراً عنيفاً وقع قبل قليل في الحي الشرقي للعاصمة، وأن قوات الإنقاذ توجهت إلى المنطقة في حين أُغلقت الطرق المؤدية إليها.",
      "i-kicker": "آخر التطورات",
      "i-source": "المصدر: وكالات + مراسلون",
      "i-cap": "حصري",
      "i-time": "٢٢:٤٧ — بتوقيت غرينتش",
      "i-img": ""
    }
  },
  {
    "id": "editorial-elegant",
    "label": "تقرير أنيق",
    "description": "التقرير · Editorial Elegant",
    "fileName": "02-editorial-elegant.html",
    "animationPreset": "news-ledger",
    "fields": [
      {
        "id": "i-title",
        "label": "العنوان",
        "type": "textarea",
        "rows": 3,
        "placeholder": "العنوان"
      },
      {
        "id": "i-deck",
        "label": "المقدمة (Deck)",
        "type": "textarea",
        "rows": 3,
        "placeholder": "المقدمة (Deck)"
      },
      {
        "id": "i-tag",
        "label": "التصنيف",
        "type": "text",
        "placeholder": "التصنيف"
      },
      {
        "id": "i-caption",
        "label": "التعليق",
        "type": "text",
        "placeholder": "التعليق"
      },
      {
        "id": "i-author",
        "label": "الكاتب",
        "type": "text",
        "placeholder": "الكاتب"
      },
      {
        "id": "i-source",
        "label": "المصدر",
        "type": "text",
        "placeholder": "المصدر"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-title": "مفاوضات سرية تعيد رسم خريطة التحالفات في الشرق الأوسط",
      "i-deck": "وثائق حصرية اطّلعت عليها هيئة التحرير تكشف عن لقاءات متواصلة بين ثلاث عواصم، قد تُغيّر موازين القوى في المنطقة خلال الأشهر القليلة المقبلة.",
      "i-tag": "قضية الأسبوع",
      "i-caption": "— تصوير: عدسة المراسل الميداني",
      "i-author": "بقلم — هيئة التحرير",
      "i-source": "Source · Reuters",
      "i-img": ""
    }
  },
  {
    "id": "cinematic-dark",
    "label": "سينمائي داكن",
    "description": "وثائقي · Cinematic Dark",
    "fileName": "03-cinematic-dark.html",
    "animationPreset": "cinematic-reveal",
    "fields": [
      {
        "id": "i-title",
        "label": "العنوان",
        "type": "textarea",
        "rows": 3,
        "placeholder": "العنوان"
      },
      {
        "id": "i-deck",
        "label": "الوصف",
        "type": "textarea",
        "rows": 3,
        "placeholder": "الوصف"
      },
      {
        "id": "i-num",
        "label": "الفصل",
        "type": "text",
        "placeholder": "الفصل"
      },
      {
        "id": "i-tag",
        "label": "التصنيف",
        "type": "text",
        "placeholder": "التصنيف"
      },
      {
        "id": "i-loc",
        "label": "الموقع",
        "type": "text",
        "placeholder": "الموقع"
      },
      {
        "id": "i-dur",
        "label": "المدة",
        "type": "text",
        "placeholder": "المدة"
      },
      {
        "id": "i-source",
        "label": "المصدر",
        "type": "text",
        "placeholder": "المصدر"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-title": "في قلب المدينة المحاصرة: شهادات لم تُروَ من قبل",
      "i-deck": "على مدى ثلاثة أسابيع، تنقّل فريقنا بين الأحياء المتضررة ليجمع شهادات أهلٍ صمدوا تحت القصف، وأطباءٍ عملوا في عيادات مرتجلة، وأطفالٍ ابتكروا ألعاباً من بقايا الحياة اليومية.",
      "i-num": "CHAPTER 01",
      "i-tag": "تحقيق ميداني",
      "i-loc": "LIVE · BEIRUT",
      "i-dur": "RUNTIME · 04:18",
      "i-source": "SOURCE · المراسل الميداني — صور حصرية",
      "i-img": ""
    }
  },
  {
    "id": "sports-energy",
    "label": "رياضي",
    "description": "الصدارة · Sports Energy",
    "fileName": "04-sports-energy.html",
    "animationPreset": "number-hero",
    "fields": [
      {
        "id": "i-title",
        "label": "العنوان (استخدم {} للتمييز)",
        "type": "textarea",
        "rows": 3,
        "placeholder": "العنوان (استخدم {} للتمييز)"
      },
      {
        "id": "i-body",
        "label": "نص الخبر",
        "type": "textarea",
        "rows": 3,
        "placeholder": "نص الخبر"
      },
      {
        "id": "i-kicker",
        "label": "الكيكر",
        "type": "text",
        "placeholder": "الكيكر"
      },
      {
        "id": "i-cat",
        "label": "التصنيف",
        "type": "text",
        "placeholder": "التصنيف"
      },
      {
        "id": "i-s1v",
        "label": "إحصاء ١",
        "type": "text",
        "placeholder": "إحصاء ١"
      },
      {
        "id": "i-s2v",
        "label": "إحصاء ٢",
        "type": "text",
        "placeholder": "إحصاء ٢"
      },
      {
        "id": "i-s3v",
        "label": "إحصاء ٣",
        "type": "text",
        "placeholder": "إحصاء ٣"
      },
      {
        "id": "i-s1k",
        "label": "عنوان ١",
        "type": "text",
        "placeholder": "عنوان ١"
      },
      {
        "id": "i-s2k",
        "label": "عنوان ٢",
        "type": "text",
        "placeholder": "عنوان ٢"
      },
      {
        "id": "i-s3k",
        "label": "عنوان ٣",
        "type": "text",
        "placeholder": "عنوان ٣"
      },
      {
        "id": "i-source",
        "label": "المصدر",
        "type": "text",
        "placeholder": "المصدر"
      },
      {
        "id": "i-clock",
        "label": "الوقت",
        "type": "text",
        "placeholder": "الوقت"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-title": "الفريق الأخضر يحقق {الصدارة} بعد فوز ساحق",
      "i-body": "سيطر الفريق على مجريات اللقاء منذ الدقائق الأولى، وسجّل أربعة أهداف متتالية لينفرد بصدارة الترتيب العام قبل خمس جولات من نهاية الموسم.",
      "i-kicker": "انتصار تاريخي",
      "i-cat": "رياضة · بريميرليغ",
      "i-s1v": "٤–١",
      "i-s2v": "٧٢٪",
      "i-s3v": "٢٤",
      "i-s1k": "النتيجة النهائية",
      "i-s2k": "الاستحواذ",
      "i-s3k": "تسديدات",
      "i-source": "SOURCE · SPORTS DESK",
      "i-clock": "٢٢:٤٧",
      "i-img": ""
    }
  },
  {
    "id": "documentary-minimal",
    "label": "وثائقي",
    "description": "القصة · Documentary Minimal",
    "fileName": "05-documentary-minimal.html",
    "animationPreset": "cinematic-reveal",
    "fields": [
      {
        "id": "i-title",
        "label": "العنوان",
        "type": "textarea",
        "rows": 3,
        "placeholder": "العنوان"
      },
      {
        "id": "i-deck",
        "label": "المقدمة",
        "type": "textarea",
        "rows": 3,
        "placeholder": "المقدمة"
      },
      {
        "id": "i-quote",
        "label": "اقتباس",
        "type": "textarea",
        "rows": 3,
        "placeholder": "اقتباس"
      },
      {
        "id": "i-who",
        "label": "قائل الاقتباس",
        "type": "text",
        "placeholder": "قائل الاقتباس"
      },
      {
        "id": "i-kicker",
        "label": "الكيكر",
        "type": "text",
        "placeholder": "الكيكر"
      },
      {
        "id": "i-idx",
        "label": "الفهرس",
        "type": "text",
        "placeholder": "الفهرس"
      },
      {
        "id": "i-ts",
        "label": "التاريخ",
        "type": "text",
        "placeholder": "التاريخ"
      },
      {
        "id": "i-chips",
        "label": "الوسوم (مفصولة بفاصلة)",
        "type": "text",
        "placeholder": "الوسوم (مفصولة بفاصلة)"
      },
      {
        "id": "i-source",
        "label": "المصدر",
        "type": "text",
        "placeholder": "المصدر"
      },
      {
        "id": "i-cap",
        "label": "التعليق",
        "type": "text",
        "placeholder": "التعليق"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-title": "رحلة لاجئ في طريق طويل نحو إعادة بناء الذات",
      "i-deck": "على مدى عامٍ كامل، تتبّعنا قصة عائلة واحدة بين أربع مدن وخمس وثائق، لنفهم كيف يُعاد تشكيل الهوية في زمن النزوح، وما تعنيه كلمة \"بيت\" حين تتغيّر الجغرافيا.",
      "i-quote": "«لم نتخيل يوماً أن نقف على أعتاب لحظة مفصلية بهذا الحجم.»",
      "i-who": "— أحد أبطال التحقيق",
      "i-kicker": "قصة طويلة · تحقيق",
      "i-idx": "٠١ / ٠٣",
      "i-ts": "٢٢ مايو ٢٠٢٦",
      "i-chips": "هجرة, هوية, طويل المدى, شهادات",
      "i-source": "المصدر · مراسلون متعددون",
      "i-cap": "© عدسة المراسل",
      "i-img": ""
    }
  },
  {
    "id": "x-animated",
    "label": "منشور X",
    "description": "تغريدة متحركة · X Animated",
    "fileName": "06-x-animated.html",
    "animationPreset": "impact-shock",
    "fields": [
      {
        "id": "i-name",
        "label": "الاسم",
        "type": "text",
        "placeholder": "الاسم"
      },
      {
        "id": "i-handle",
        "label": "المعرّف",
        "type": "text",
        "placeholder": "المعرّف"
      },
      {
        "id": "i-text",
        "label": "النص",
        "type": "textarea",
        "rows": 2,
        "placeholder": "النص"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-name": "نايف الخبير",
      "i-handle": "@NaifExpert",
      "i-text": "نظرة سريعة على التحديث الجديد لبرامج الإنتاج المرئي، قفزة نوعية في دمج الذكاء الاصطناعي مع واجهات المستخدم. #تقنية",
      "i-img": ""
    }
  },
  {
    "id": "facebook-animated",
    "label": "منشور Facebook",
    "description": "منشور متحرك · FB Animated",
    "fileName": "07-facebook-animated.html",
    "animationPreset": "broadcast-split",
    "fields": [
      {
        "id": "i-name",
        "label": "الاسم",
        "type": "text",
        "placeholder": "الاسم"
      },
      {
        "id": "i-text",
        "label": "النص",
        "type": "textarea",
        "rows": 2,
        "placeholder": "النص"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-name": "الصفحة الرسمية للمدينة",
      "i-text": "استمرار أعمال التطوير في الواجهة البحرية، المشروع يهدف لتعزيز السياحة وتوفير مساحات خضراء جديدة للأهالي.",
      "i-img": ""
    }
  },
  {
    "id": "telegram-animated",
    "label": "منشور Telegram",
    "description": "رسالة تلجرام متحركة · TG Animated",
    "fileName": "08-telegram-animated.html",
    "animationPreset": "highlight-sweep",
    "fields": [
      {
        "id": "i-channel",
        "label": "القناة",
        "type": "text",
        "placeholder": "القناة"
      },
      {
        "id": "i-title",
        "label": "العنوان",
        "type": "text",
        "placeholder": "العنوان"
      },
      {
        "id": "i-text",
        "label": "النص",
        "type": "textarea",
        "rows": 3,
        "placeholder": "النص"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-channel": "أخبار العالم",
      "i-title": "🔴 تغطية مباشرة",
      "i-text": "انطلاق القمة الاقتصادية بمشاركة قادة الدول لمناقشة تحديات الطاقة واستقرار الأسواق العالمية في المرحلة القادمة.",
      "i-img": ""
    }
  },
  {
    "id": "instagram-animated",
    "label": "منشور Instagram",
    "description": "منشور إنستغرام متحرك · IG Animated",
    "fileName": "09-instagram-animated.html",
    "animationPreset": "layered-title",
    "fields": [
      {
        "id": "i-user",
        "label": "الحساب",
        "type": "text",
        "placeholder": "الحساب"
      },
      {
        "id": "i-text",
        "label": "النص",
        "type": "textarea",
        "rows": 2,
        "placeholder": "النص"
      },
      {
        "id": "i-img",
        "label": "رابط الصورة",
        "type": "text",
        "placeholder": "رابط الصورة"
      }
    ],
    "defaults": {
      "i-user": "lens_and_life",
      "i-text": "الجمال يكمن في التفاصيل الصغيرة التي لا نلحظها عادة في صخب الحياة اليومية. شاركونا أكثر شيء جميل رأيتموه اليوم.",
      "i-img": ""
    }
  },
  {
    "id": "top-trends",
    "label": "Top 3",
    "description": "التريند · Top 3 Trends",
    "fileName": "gemini-code-1778707088078.html",
    "animationPreset": "timeline-marker",
    "fields": [
      {
        "id": "i-t1",
        "label": "تريند 1",
        "type": "text",
        "placeholder": "تريند 1"
      },
      {
        "id": "i-t1-img",
        "label": "رابط صورة التريند 1",
        "type": "text",
        "placeholder": "رابط صورة التريند 1"
      },
      {
        "id": "i-t2",
        "label": "تريند 2",
        "type": "text",
        "placeholder": "تريند 2"
      },
      {
        "id": "i-t2-img",
        "label": "رابط صورة التريند 2",
        "type": "text",
        "placeholder": "رابط صورة التريند 2"
      },
      {
        "id": "i-t3",
        "label": "تريند 3",
        "type": "text",
        "placeholder": "تريند 3"
      },
      {
        "id": "i-t3-img",
        "label": "رابط صورة التريند 3",
        "type": "text",
        "placeholder": "رابط صورة التريند 3"
      }
    ],
    "defaults": {
      "i-t1": "إطلاق نموذج ذكاء اصطناعي جديد يثير الجدل",
      "i-t1-img": "",
      "i-t2": "أسعار الذهب تسجل رقماً قياسياً تاريخياً",
      "i-t2-img": "",
      "i-t3": "قرعة دوري الأبطال ومواجهات نارية مرتقبة",
      "i-t3-img": ""
    }
  }
];
