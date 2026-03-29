import type { ServiceData, ServiceCategory } from "@/types";

export const categories: { slug: ServiceCategory; titleKey: string }[] = [
  { slug: "dental-treatments", titleKey: "dental" },
  { slug: "facial-treatments", titleKey: "facial" },
];

export const services: ServiceData[] = [
  // ═══════════════════════════════════════
  // DENTAL TREATMENTS (13 services)
  // ═══════════════════════════════════════
  {
    slug: "veneers",
    category: "dental-treatments",
    icon: "Sparkles",
    image: "/images/services/veneers.jpg",
    title: { en: "Veneers", ar: "القشور الخزفية" },
    shortDescription: {
      en: "Custom porcelain veneers to transform your smile with natural-looking results.",
      ar: "قشور خزفية مخصصة لتحويل ابتسامتك بنتائج طبيعية المظهر.",
    },
    fullDescription: {
      en: "Veneers are thin, custom-made shells of porcelain that cover the front surface of your teeth. They are designed to improve the appearance of your smile by changing the color, shape, size, or length of your teeth. Our expert team uses the latest technology to create veneers that look and feel completely natural.",
      ar: "القشور الخزفية هي قشرة رقيقة مصنوعة خصيصاً من البورسلين تغطي السطح الأمامي لأسنانك. صُممت لتحسين مظهر ابتسامتك عن طريق تغيير لون أسنانك أو شكلها أو حجمها أو طولها. يستخدم فريقنا المتخصص أحدث التقنيات لإنشاء قشور تبدو وتشعر بأنها طبيعية تماماً.",
    },
    benefits: {
      en: ["Natural-looking results", "Stain-resistant material", "Minimally invasive procedure", "Long-lasting durability"],
      ar: ["نتائج طبيعية المظهر", "مادة مقاومة للبقع", "إجراء طفيف التدخل", "متانة طويلة الأمد"],
    },
  },
  {
    slug: "pediatric-treatments",
    category: "dental-treatments",
    icon: "Baby",
    image: "/images/services/pediatric-treatments.jpg",
    title: { en: "Pediatric Treatments", ar: "إختصاص أطفال" },
    shortDescription: {
      en: "Gentle, specialized dental care designed to keep your child's smile healthy and bright.",
      ar: "رعاية أسنان متخصصة ولطيفة مصممة للحفاظ على ابتسامة طفلك صحية ومشرقة.",
    },
    fullDescription: {
      en: "Our pediatric dental services are tailored to the unique needs of children. From routine check-ups to preventive care, our friendly team creates a comfortable environment that helps children develop positive associations with dental visits. We focus on education, prevention, and gentle treatment.",
      ar: "خدمات طب أسنان الأطفال لدينا مصممة خصيصاً لتلبية الاحتياجات الفريدة للأطفال. من الفحوصات الروتينية إلى الرعاية الوقائية، يهيئ فريقنا الودود بيئة مريحة تساعد الأطفال على تكوين ارتباطات إيجابية مع زيارات طبيب الأسنان.",
    },
    benefits: {
      en: ["Child-friendly environment", "Preventive care focus", "Experienced pediatric team", "Pain-free techniques"],
      ar: ["بيئة صديقة للأطفال", "التركيز على الرعاية الوقائية", "فريق أطفال ذو خبرة", "تقنيات خالية من الألم"],
    },
  },
  {
    slug: "lumineers",
    category: "dental-treatments",
    icon: "Sun",
    image: "/images/services/lumineers.jpg",
    title: { en: "Lumineers", ar: "القشور الخزفية الرقيقة جداً" },
    shortDescription: {
      en: "Ultra-thin veneers that require minimal tooth preparation for a stunning smile.",
      ar: "قشور رقيقة جداً تتطلب الحد الأدنى من تحضير الأسنان لابتسامة مذهلة.",
    },
    fullDescription: {
      en: "Lumineers are a revolutionary type of ultra-thin veneer that can be applied with minimal to no tooth reduction. This means a pain-free, no-drill experience that preserves your natural tooth structure while giving you a beautiful, lasting smile transformation.",
      ar: "اللومينير هو نوع ثوري من القشور فائقة الرقة يمكن تطبيقه مع الحد الأدنى أو بدون أي نحت للأسنان. هذا يعني تجربة خالية من الألم وبدون حفر تحافظ على بنية أسنانك الطبيعية مع منحك تحولاً جميلاً ودائماً للابتسامة.",
    },
    benefits: {
      en: ["No drilling required", "Preserves natural teeth", "Reversible procedure", "Ultra-thin design"],
      ar: ["لا حاجة للحفر", "يحافظ على الأسنان الطبيعية", "إجراء قابل للعكس", "تصميم رقيق جداً"],
    },
  },
  {
    slug: "implants",
    category: "dental-treatments",
    icon: "Anchor",
    image: "/images/services/implants.jpg",
    title: { en: "Implants", ar: "زراعة الأسنان" },
    shortDescription: {
      en: "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
      ar: "استبدال دائم للأسنان يبدو ويشعر ويعمل مثل الأسنان الطبيعية.",
    },
    fullDescription: {
      en: "Dental implants are the gold standard for replacing missing teeth. A titanium post is surgically placed in the jawbone, serving as an artificial root for a custom-made crown. The result is a permanent, stable solution that integrates with your bone and functions just like a natural tooth.",
      ar: "زراعة الأسنان هي المعيار الذهبي لاستبدال الأسنان المفقودة. يتم وضع دعامة من التيتانيوم جراحياً في عظم الفك لتكون جذراً اصطناعياً لتاج مصنوع خصيصاً. النتيجة هي حل دائم ومستقر يندمج مع عظمك ويعمل تماماً مثل السن الطبيعي.",
    },
    benefits: {
      en: ["Permanent solution", "Natural look and feel", "Preserves jawbone", "High success rate"],
      ar: ["حل دائم", "مظهر وإحساس طبيعي", "يحافظ على عظم الفك", "نسبة نجاح عالية"],
    },
  },
  {
    slug: "whitening",
    category: "dental-treatments",
    icon: "Zap",
    image: "/images/services/whitening.jpg",
    title: { en: "Laser and Home Whitening", ar: "تبييض بالليزر و تبييض منزلي" },
    shortDescription: {
      en: "Professional teeth whitening options for a brighter, more confident smile.",
      ar: "خيارات تبييض أسنان احترافية لابتسامة أكثر إشراقاً وثقة.",
    },
    fullDescription: {
      en: "We offer both in-clinic laser whitening for immediate results and customized home whitening kits for gradual improvement. Our laser treatment can lighten your teeth by several shades in a single session, while our home kits provide professional-grade results at your convenience.",
      ar: "نقدم كلاً من تبييض الليزر في العيادة للحصول على نتائج فورية ومجموعات تبييض منزلية مخصصة للتحسين التدريجي. يمكن لعلاج الليزر لدينا تفتيح أسنانك بعدة درجات في جلسة واحدة، بينما توفر مجموعاتنا المنزلية نتائج احترافية في راحتك.",
    },
    benefits: {
      en: ["Immediate visible results", "Safe and controlled process", "Custom home whitening trays", "Long-lasting brightness"],
      ar: ["نتائج مرئية فورية", "عملية آمنة ومتحكم بها", "قوالب تبييض منزلية مخصصة", "إشراق طويل الأمد"],
    },
  },
  {
    slug: "x-rays",
    category: "dental-treatments",
    icon: "Scan",
    image: "/images/services/x-rays.jpg",
    title: { en: "X-Rays", ar: "تصوير أشعة" },
    shortDescription: {
      en: "Advanced digital imaging for precise diagnosis and treatment planning.",
      ar: "تصوير رقمي متقدم للتشخيص الدقيق وتخطيط العلاج.",
    },
    fullDescription: {
      en: "Our clinic uses state-of-the-art digital X-ray technology that provides detailed images with minimal radiation exposure. These images help our doctors diagnose issues that aren't visible during a regular examination and create precise treatment plans tailored to your needs.",
      ar: "تستخدم عيادتنا أحدث تقنيات الأشعة الرقمية التي توفر صوراً مفصلة مع الحد الأدنى من التعرض للإشعاع. تساعد هذه الصور أطباءنا في تشخيص المشاكل غير المرئية خلال الفحص العادي وإنشاء خطط علاج دقيقة مصممة خصيصاً لاحتياجاتك.",
    },
    benefits: {
      en: ["Low radiation exposure", "High-resolution images", "Instant digital results", "Precise diagnosis"],
      ar: ["تعرض منخفض للإشعاع", "صور عالية الدقة", "نتائج رقمية فورية", "تشخيص دقيق"],
    },
  },
  {
    slug: "braces",
    category: "dental-treatments",
    icon: "AlignCenter",
    image: "/images/services/braces.jpg",
    title: { en: "Braces", ar: "تقويم الأسنان" },
    shortDescription: {
      en: "Orthodontic solutions to straighten teeth and correct bite alignment.",
      ar: "حلول تقويم الأسنان لتعديل الأسنان وتصحيح محاذاة العضة.",
    },
    fullDescription: {
      en: "Our orthodontic treatments include traditional braces and modern clear aligner options. We develop customized treatment plans to address crowding, spacing, overbite, underbite, and other alignment issues, helping you achieve a straighter, healthier smile.",
      ar: "تشمل علاجات تقويم الأسنان لدينا الأقواس التقليدية وخيارات المصففات الشفافة الحديثة. نقوم بتطوير خطط علاج مخصصة لمعالجة الازدحام والمسافات والعضة الزائدة والعضة السفلية ومشاكل المحاذاة الأخرى.",
    },
    benefits: {
      en: ["Multiple options available", "Customized treatment plans", "Improved oral health", "Beautiful straight smile"],
      ar: ["خيارات متعددة متاحة", "خطط علاج مخصصة", "تحسين صحة الفم", "ابتسامة مستقيمة جميلة"],
    },
  },
  {
    slug: "root-canal",
    category: "dental-treatments",
    icon: "Shield",
    image: "/images/services/root-canal.jpg",
    title: { en: "Root Canal Treatment", ar: "سحب عصب" },
    shortDescription: {
      en: "Pain-free root canal therapy to save infected teeth and relieve discomfort.",
      ar: "علاج جذر السن بدون ألم لإنقاذ الأسنان المصابة وتخفيف الانزعاج.",
    },
    fullDescription: {
      en: "Root canal treatment removes infected pulp from inside the tooth, cleans and shapes the canal, then seals it to prevent further infection. Modern techniques and anesthesia make this procedure virtually painless, saving your natural tooth and eliminating pain.",
      ar: "يزيل علاج قناة الجذر اللب المصاب من داخل السن، وينظف ويشكل القناة، ثم يغلقها لمنع المزيد من العدوى. التقنيات الحديثة والتخدير تجعل هذا الإجراء خالياً من الألم تقريباً، مما ينقذ سنك الطبيعي ويزيل الألم.",
    },
    benefits: {
      en: ["Saves natural tooth", "Modern painless techniques", "Quick recovery", "Prevents further infection"],
      ar: ["ينقذ السن الطبيعي", "تقنيات حديثة بدون ألم", "شفاء سريع", "يمنع المزيد من العدوى"],
    },
  },
  {
    slug: "extractions",
    category: "dental-treatments",
    icon: "CircleMinus",
    image: "/images/services/extractions.jpg",
    title: { en: "Simple and Surgical Extractions", ar: "خلع بسيط وجراحي" },
    shortDescription: {
      en: "Safe and comfortable tooth extraction procedures for all cases.",
      ar: "إجراءات خلع أسنان آمنة ومريحة لجميع الحالات.",
    },
    fullDescription: {
      en: "Whether you need a simple extraction or a more complex surgical procedure, our experienced team ensures your comfort throughout. We use advanced techniques and sedation options to make the process as smooth and painless as possible.",
      ar: "سواء كنت بحاجة إلى خلع بسيط أو إجراء جراحي أكثر تعقيداً، يضمن فريقنا ذو الخبرة راحتك طوال الوقت. نستخدم تقنيات متقدمة وخيارات تخدير لجعل العملية سلسة وخالية من الألم قدر الإمكان.",
    },
    benefits: {
      en: ["Experienced surgical team", "Pain management options", "Quick recovery protocols", "Post-extraction care guidance"],
      ar: ["فريق جراحي ذو خبرة", "خيارات إدارة الألم", "بروتوكولات شفاء سريعة", "إرشادات رعاية ما بعد الخلع"],
    },
  },
  {
    slug: "gum-depigmentation",
    category: "dental-treatments",
    icon: "Paintbrush",
    image: "/images/services/gum-depigmentation.jpg",
    title: { en: "Gum Depigmentation", ar: "تصبغات اللثة" },
    shortDescription: {
      en: "Restore healthy, pink gums by treating dark pigmentation spots.",
      ar: "استعادة لثة صحية وردية من خلال علاج بقع التصبغ الداكنة.",
    },
    fullDescription: {
      en: "Gum depigmentation is a cosmetic procedure that removes dark spots and uneven coloring from the gums, restoring a uniform, healthy pink appearance. Using laser technology, we can achieve excellent results with minimal discomfort and quick recovery.",
      ar: "إزالة تصبغات اللثة هو إجراء تجميلي يزيل البقع الداكنة والتلوين غير المتساوي من اللثة، مستعيداً مظهراً موحداً وصحياً باللون الوردي. باستخدام تقنية الليزر، يمكننا تحقيق نتائج ممتازة مع الحد الأدنى من الانزعاج والشفاء السريع.",
    },
    benefits: {
      en: ["Laser precision treatment", "Immediate visible results", "Minimal discomfort", "Boosts smile confidence"],
      ar: ["علاج بدقة الليزر", "نتائج مرئية فورية", "انزعاج طفيف", "يعزز ثقة الابتسامة"],
    },
  },
  {
    slug: "crowns",
    category: "dental-treatments",
    icon: "Crown",
    image: "/images/services/crowns.jpg",
    title: { en: "Crowns", ar: "التيجان" },
    shortDescription: {
      en: "Custom dental crowns to restore damaged teeth and enhance your smile.",
      ar: "تيجان أسنان مخصصة لترميم الأسنان التالفة وتعزيز ابتسامتك.",
    },
    fullDescription: {
      en: "Dental crowns are custom-fitted caps that cover a damaged or weakened tooth, restoring its shape, size, strength, and appearance. We offer crowns in various materials including porcelain, ceramic, and zirconia, matched perfectly to your natural tooth color.",
      ar: "تيجان الأسنان هي أغطية مصممة خصيصاً تغطي سناً تالفاً أو ضعيفاً، مستعيدةً شكله وحجمه وقوته ومظهره. نقدم تيجاناً بمواد متنوعة تشمل البورسلين والسيراميك والزركونيا، متطابقة تماماً مع لون أسنانك الطبيعي.",
    },
    benefits: {
      en: ["Natural appearance", "Long-lasting protection", "Custom color matching", "Multiple material options"],
      ar: ["مظهر طبيعي", "حماية طويلة الأمد", "مطابقة لون مخصصة", "خيارات مواد متعددة"],
    },
  },
  {
    slug: "teeth-clenching",
    category: "dental-treatments",
    icon: "Lock",
    image: "/images/services/teeth-clenching.jpg",
    title: { en: "Teeth Clenching", ar: "صك الأسنان" },
    shortDescription: {
      en: "Treatment solutions for bruxism and teeth grinding to protect your smile.",
      ar: "حلول علاجية لصرير الأسنان وطحنها لحماية ابتسامتك.",
    },
    fullDescription: {
      en: "Teeth clenching (bruxism) can cause significant damage to your teeth, jaw, and overall oral health. We offer customized night guards, bite adjustments, and therapeutic treatments to protect your teeth and alleviate associated pain and discomfort.",
      ar: "صك الأسنان (صرير الأسنان) يمكن أن يسبب ضرراً كبيراً لأسنانك وفكك وصحة فمك بشكل عام. نقدم واقيات ليلية مخصصة وتعديلات العضة وعلاجات علاجية لحماية أسنانك وتخفيف الألم والانزعاج المرتبطين.",
    },
    benefits: {
      en: ["Custom night guards", "Pain relief solutions", "Jaw alignment correction", "Prevents tooth damage"],
      ar: ["واقيات ليلية مخصصة", "حلول تخفيف الألم", "تصحيح محاذاة الفك", "يمنع تلف الأسنان"],
    },
  },
  {
    slug: "scaling-polishing",
    category: "dental-treatments",
    icon: "Sparkle",
    image: "/images/services/scaling-polishing.jpg",
    title: { en: "Scaling and Polishing", ar: "التنظيف والتلميع" },
    shortDescription: {
      en: "Professional cleaning to remove plaque, tartar, and stains for healthier teeth.",
      ar: "تنظيف احترافي لإزالة البلاك والجير والبقع لأسنان أكثر صحة.",
    },
    fullDescription: {
      en: "Regular scaling and polishing is essential for maintaining optimal oral health. Our professional cleaning removes plaque and tartar buildup that regular brushing can't reach, followed by polishing to smooth tooth surfaces and remove surface stains.",
      ar: "التنظيف والتلميع المنتظم ضروري للحفاظ على صحة الفم المثلى. يزيل التنظيف الاحترافي لدينا تراكم البلاك والجير الذي لا يمكن للفرشاة العادية الوصول إليه، يليه التلميع لتنعيم أسطح الأسنان وإزالة البقع السطحية.",
    },
    benefits: {
      en: ["Removes stubborn tartar", "Prevents gum disease", "Freshens breath", "Brighter smile"],
      ar: ["يزيل الجير العنيد", "يمنع أمراض اللثة", "ينعش النفس", "ابتسامة أكثر إشراقاً"],
    },
  },

  // ═══════════════════════════════════════
  // FACIAL TREATMENTS (13 services)
  // ═══════════════════════════════════════
  {
    slug: "botox-face",
    category: "facial-treatments",
    icon: "Sparkles",
    image: "/images/services/botox-face.jpg",
    title: { en: "Botox for Face", ar: "بوتكس للوجه" },
    shortDescription: {
      en: "Reduce fine lines and wrinkles for a refreshed, youthful appearance.",
      ar: "تقليل الخطوط الدقيقة والتجاعيد لمظهر منتعش وشبابي.",
    },
    fullDescription: {
      en: "Facial Botox injections are a quick, non-surgical treatment that relaxes the muscles responsible for wrinkles, giving you a smoother, more youthful appearance. Results typically last 3-6 months and can target forehead lines, crow's feet, and frown lines.",
      ar: "حقن البوتكس للوجه هي علاج سريع وغير جراحي يريح العضلات المسؤولة عن التجاعيد، مما يمنحك مظهراً أكثر نعومة وشباباً. تستمر النتائج عادةً 3-6 أشهر ويمكن أن تستهدف خطوط الجبهة وأقدام الغراب وخطوط العبوس.",
    },
    benefits: {
      en: ["Quick 15-minute procedure", "No downtime needed", "Natural-looking results", "Prevents new wrinkle formation"],
      ar: ["إجراء سريع 15 دقيقة", "لا حاجة لوقت تعافي", "نتائج طبيعية المظهر", "يمنع تكون تجاعيد جديدة"],
    },
  },
  {
    slug: "botox-underarms",
    category: "facial-treatments",
    icon: "Droplets",
    image: "/images/services/botox-underarms.jpg",
    title: { en: "Botox under Arms", ar: "بوتكس تحت الأبط" },
    shortDescription: {
      en: "Effective treatment for excessive underarm sweating (hyperhidrosis).",
      ar: "علاج فعال للتعرق المفرط تحت الإبط (فرط التعرق).",
    },
    fullDescription: {
      en: "Botox injections under the arms are an FDA-approved treatment for hyperhidrosis (excessive sweating). The treatment blocks the nerve signals that trigger sweat glands, providing relief for 6-12 months per session.",
      ar: "حقن البوتكس تحت الإبط هي علاج معتمد من إدارة الغذاء والدواء لفرط التعرق. يمنع العلاج الإشارات العصبية التي تحفز الغدد العرقية، مما يوفر راحة لمدة 6-12 شهراً لكل جلسة.",
    },
    benefits: {
      en: ["FDA-approved treatment", "Long-lasting results", "Quick procedure", "Life-changing confidence boost"],
      ar: ["علاج معتمد من FDA", "نتائج طويلة الأمد", "إجراء سريع", "تعزيز ثقة يغير الحياة"],
    },
  },
  {
    slug: "botox-hands",
    category: "facial-treatments",
    icon: "Hand",
    image: "/images/services/botox-hands.jpg",
    title: { en: "Botox for Hands", ar: "بوتكس للأيدي كثيرة التعرق" },
    shortDescription: {
      en: "Stop excessive hand sweating with precision Botox treatment.",
      ar: "وقف التعرق المفرط في اليدين بعلاج البوتكس الدقيق.",
    },
    fullDescription: {
      en: "Botox for hands is an effective solution for palmar hyperhidrosis (excessive hand sweating). Precise injections temporarily block the nerves that stimulate sweating, allowing you to shake hands, write, and handle objects with confidence.",
      ar: "البوتكس لليدين هو حل فعال لفرط تعرق اليدين. الحقن الدقيقة تمنع مؤقتاً الأعصاب التي تحفز التعرق، مما يتيح لك المصافحة والكتابة والتعامل مع الأشياء بثقة.",
    },
    benefits: {
      en: ["Targets hand sweating specifically", "Improved daily comfort", "Quick treatment session", "Results in days"],
      ar: ["يستهدف تعرق اليدين تحديداً", "راحة يومية محسنة", "جلسة علاج سريعة", "نتائج في أيام"],
    },
  },
  {
    slug: "golden-threads",
    category: "facial-treatments",
    icon: "Waypoints",
    image: "/images/services/golden-threads.jpg",
    title: { en: "Golden Threads", ar: "الخيوط الذهبية" },
    shortDescription: {
      en: "Lift and tighten skin naturally with dissolving thread technology.",
      ar: "شد ورفع البشرة بشكل طبيعي مع تقنية الخيوط القابلة للذوبان.",
    },
    fullDescription: {
      en: "Golden thread lifting is a minimally invasive procedure that uses biocompatible threads to lift and tighten sagging skin. The threads stimulate collagen production, providing both immediate lifting and long-term skin rejuvenation.",
      ar: "رفع الخيوط الذهبية هو إجراء طفيف التدخل يستخدم خيوطاً متوافقة حيوياً لرفع وشد الجلد المترهل. تحفز الخيوط إنتاج الكولاجين، مما يوفر رفعاً فورياً وتجديداً طويل الأمد للبشرة.",
    },
    benefits: {
      en: ["Immediate lifting effect", "Stimulates collagen", "Minimally invasive", "Natural-looking results"],
      ar: ["تأثير رفع فوري", "يحفز الكولاجين", "طفيف التدخل", "نتائج طبيعية المظهر"],
    },
  },
  {
    slug: "profhilo",
    category: "facial-treatments",
    icon: "Droplet",
    image: "/images/services/profhilo.jpg",
    title: { en: "Profhilo", ar: "بروفايلو" },
    shortDescription: {
      en: "Bio-remodeling treatment for deep hydration and skin firmness.",
      ar: "علاج إعادة تشكيل حيوي للترطيب العميق وشد البشرة.",
    },
    fullDescription: {
      en: "Profhilo is an innovative bio-remodeling treatment that delivers high concentrations of hyaluronic acid to deeply hydrate the skin from within. It stimulates the production of collagen and elastin, improving skin tone, texture, and overall radiance.",
      ar: "بروفايلو هو علاج إعادة تشكيل حيوي مبتكر يوصل تركيزات عالية من حمض الهيالورونيك لترطيب البشرة بعمق من الداخل. يحفز إنتاج الكولاجين والإيلاستين، مما يحسن لون البشرة وملمسها وإشراقها العام.",
    },
    benefits: {
      en: ["Deep skin hydration", "Collagen stimulation", "Improved skin elasticity", "Minimal injection points"],
      ar: ["ترطيب عميق للبشرة", "تحفيز الكولاجين", "تحسين مرونة البشرة", "نقاط حقن قليلة"],
    },
  },
  {
    slug: "derma-pen",
    category: "facial-treatments",
    icon: "Pen",
    image: "/images/services/derma-pen.jpg",
    title: { en: "Derma Pen", ar: "ديرما بن" },
    shortDescription: {
      en: "Microneedling therapy to rejuvenate skin and reduce scars and pores.",
      ar: "علاج الإبر الدقيقة لتجديد البشرة وتقليل الندبات والمسام.",
    },
    fullDescription: {
      en: "The Derma Pen uses controlled micro-needling to create tiny punctures in the skin, triggering the body's natural healing response and boosting collagen production. It's effective for treating acne scars, fine lines, large pores, and uneven skin texture.",
      ar: "يستخدم ديرما بن الإبر الدقيقة المتحكم بها لإنشاء ثقوب صغيرة في الجلد، مما يحفز استجابة الشفاء الطبيعية للجسم ويعزز إنتاج الكولاجين. وهو فعال في علاج ندبات حب الشباب والخطوط الدقيقة والمسام الكبيرة وملمس البشرة غير المتساوي.",
    },
    benefits: {
      en: ["Reduces acne scars", "Minimizes pore size", "Boosts collagen", "Improves skin texture"],
      ar: ["يقلل ندبات حب الشباب", "يقلل حجم المسام", "يعزز الكولاجين", "يحسن ملمس البشرة"],
    },
  },
  {
    slug: "radiesse",
    category: "facial-treatments",
    icon: "CircleDot",
    image: "/images/services/radiesse.jpg",
    title: { en: "Radiesse", ar: "الراديس" },
    shortDescription: {
      en: "Dermal filler that provides immediate volume and stimulates collagen growth.",
      ar: "فيلر جلدي يوفر حجماً فورياً ويحفز نمو الكولاجين.",
    },
    fullDescription: {
      en: "Radiesse is a unique calcium hydroxylapatite-based filler that provides immediate volume restoration while stimulating your body's natural collagen production. It's ideal for smoothing deep wrinkles, enhancing facial contours, and restoring volume in the hands.",
      ar: "الراديس هو فيلر فريد يعتمد على هيدروكسيلاباتيت الكالسيوم يوفر استعادة فورية للحجم مع تحفيز إنتاج الكولاجين الطبيعي في جسمك. وهو مثالي لتنعيم التجاعيد العميقة وتعزيز ملامح الوجه واستعادة حجم اليدين.",
    },
    benefits: {
      en: ["Immediate volume boost", "Stimulates natural collagen", "Long-lasting results", "Natural feel"],
      ar: ["تعزيز فوري للحجم", "يحفز الكولاجين الطبيعي", "نتائج طويلة الأمد", "إحساس طبيعي"],
    },
  },
  {
    slug: "sculptra",
    category: "facial-treatments",
    icon: "Layers",
    image: "/images/services/sculptra.jpg",
    title: { en: "Sculptra", ar: "السكلبترا" },
    shortDescription: {
      en: "Gradual collagen-stimulating treatment for natural facial rejuvenation.",
      ar: "علاج تدريجي محفز للكولاجين لتجديد الوجه بشكل طبيعي.",
    },
    fullDescription: {
      en: "Sculptra is a poly-L-lactic acid injectable that works differently from traditional fillers. Instead of adding volume directly, it stimulates your skin's own collagen production over time, resulting in gradual, natural-looking facial rejuvenation that can last up to two years.",
      ar: "السكلبترا هو حقن حمض بولي-إل-لاكتيك يعمل بشكل مختلف عن الفيلر التقليدي. بدلاً من إضافة حجم مباشرة، يحفز إنتاج الكولاجين الخاص ببشرتك بمرور الوقت، مما يؤدي إلى تجديد تدريجي وطبيعي المظهر للوجه يمكن أن يستمر حتى عامين.",
    },
    benefits: {
      en: ["Natural gradual results", "Stimulates own collagen", "Results last up to 2 years", "Subtle rejuvenation"],
      ar: ["نتائج تدريجية طبيعية", "يحفز الكولاجين الخاص", "نتائج تدوم حتى عامين", "تجديد لطيف"],
    },
  },
  {
    slug: "hair-plasma",
    category: "facial-treatments",
    icon: "Waves",
    image: "/images/services/hair-plasma.jpg",
    title: { en: "Hair Plasma", ar: "بلازما للشعر" },
    shortDescription: {
      en: "PRP therapy to stimulate hair growth and reduce hair thinning.",
      ar: "علاج البلازما الغنية بالصفائح الدموية لتحفيز نمو الشعر وتقليل تساقطه.",
    },
    fullDescription: {
      en: "Hair Plasma (PRP) therapy uses your own platelet-rich plasma to stimulate hair follicles and promote natural hair growth. The treatment involves drawing a small amount of blood, processing it to concentrate the platelets, and injecting it into the scalp.",
      ar: "علاج بلازما الشعر (PRP) يستخدم البلازما الغنية بالصفائح الدموية الخاصة بك لتحفيز بصيلات الشعر وتعزيز نمو الشعر الطبيعي. يتضمن العلاج سحب كمية صغيرة من الدم ومعالجتها لتركيز الصفائح الدموية وحقنها في فروة الرأس.",
    },
    benefits: {
      en: ["Natural growth stimulation", "Uses your own blood", "Minimal downtime", "Strengthens existing hair"],
      ar: ["تحفيز نمو طبيعي", "يستخدم دمك الخاص", "وقت تعافي قليل", "يقوي الشعر الموجود"],
    },
  },
  {
    slug: "facial-fillers",
    category: "facial-treatments",
    icon: "Gem",
    image: "/images/services/facial-fillers.jpg",
    title: { en: "Facial Fillers", ar: "فيلر الوجه" },
    shortDescription: {
      en: "Restore volume and contour to cheeks, jawline, and chin for a sculpted look.",
      ar: "استعادة حجم وملامح الخدود وخط الفك والذقن لمظهر منحوت.",
    },
    fullDescription: {
      en: "Facial fillers use hyaluronic acid to restore lost volume, enhance facial contours, and smooth wrinkles. We customize each treatment to your unique facial anatomy, targeting areas like cheeks, jawline, chin, and temples for harmonious, natural-looking results.",
      ar: "فيلر الوجه يستخدم حمض الهيالورونيك لاستعادة الحجم المفقود وتعزيز ملامح الوجه وتنعيم التجاعيد. نخصص كل علاج لتشريح وجهك الفريد، مستهدفين مناطق مثل الخدود وخط الفك والذقن والصدغ لنتائج متناغمة وطبيعية المظهر.",
    },
    benefits: {
      en: ["Immediate volume restoration", "Custom facial sculpting", "Natural hyaluronic acid", "Reversible if needed"],
      ar: ["استعادة فورية للحجم", "نحت وجه مخصص", "حمض هيالورونيك طبيعي", "قابل للعكس عند الحاجة"],
    },
  },
  {
    slug: "lip-fillers",
    category: "facial-treatments",
    icon: "Heart",
    image: "/images/services/lip-fillers.jpg",
    title: { en: "Lip Fillers", ar: "فيلر الشفاه" },
    shortDescription: {
      en: "Enhance lip volume, shape, and symmetry for a natural, fuller look.",
      ar: "تعزيز حجم الشفاه وشكلها وتناسقها لمظهر طبيعي وأكثر امتلاءً.",
    },
    fullDescription: {
      en: "Our lip filler treatments use premium hyaluronic acid fillers to enhance your lips' volume, shape, and definition. Whether you want a subtle enhancement or a more dramatic change, we tailor the treatment to achieve your desired look while maintaining natural proportions.",
      ar: "تستخدم علاجات فيلر الشفاه لدينا فيلر حمض الهيالورونيك عالي الجودة لتعزيز حجم شفتيك وشكلها وتحديدها. سواء كنت تريدين تحسيناً خفيفاً أو تغييراً أكثر دراماتيكية، نصمم العلاج لتحقيق المظهر المطلوب مع الحفاظ على النسب الطبيعية.",
    },
    benefits: {
      en: ["Customized volume levels", "Natural-looking enhancement", "Quick procedure", "Hydrating formula"],
      ar: ["مستويات حجم مخصصة", "تحسين طبيعي المظهر", "إجراء سريع", "تركيبة مرطبة"],
    },
  },
  {
    slug: "mesotherapy",
    category: "facial-treatments",
    icon: "Syringe",
    image: "/images/services/mesotherapy.jpg",
    title: { en: "Mesotherapy", ar: "الميزوثيرابي" },
    shortDescription: {
      en: "Micro-injection therapy delivering vitamins and nutrients directly to the skin.",
      ar: "علاج الحقن الدقيق الذي يوصل الفيتامينات والمغذيات مباشرة إلى البشرة.",
    },
    fullDescription: {
      en: "Mesotherapy involves micro-injections of a customized cocktail of vitamins, minerals, amino acids, and hyaluronic acid directly into the middle layer of skin. This nourishes and rejuvenates the skin from within, addressing concerns like dullness, dehydration, and fine lines.",
      ar: "الميزوثيرابي يتضمن حقن دقيقة لكوكتيل مخصص من الفيتامينات والمعادن والأحماض الأمينية وحمض الهيالورونيك مباشرة في الطبقة الوسطى من الجلد. هذا يغذي ويجدد البشرة من الداخل، معالجاً مشاكل مثل البهتان والجفاف والخطوط الدقيقة.",
    },
    benefits: {
      en: ["Deep skin nourishment", "Customized vitamin cocktail", "Improved skin glow", "Treats multiple concerns"],
      ar: ["تغذية عميقة للبشرة", "كوكتيل فيتامينات مخصص", "تحسين إشراق البشرة", "يعالج مشاكل متعددة"],
    },
  },
  {
    slug: "facial-plasma",
    category: "facial-treatments",
    icon: "Sparkle",
    image: "/images/services/facial-plasma.jpg",
    title: { en: "Facial Plasma", ar: "بلازما للوجه" },
    shortDescription: {
      en: "PRP facial treatment using your own blood to rejuvenate and brighten skin.",
      ar: "علاج بلازما الوجه باستخدام دمك الخاص لتجديد وتفتيح البشرة.",
    },
    fullDescription: {
      en: "Facial Plasma (PRP) therapy uses your own platelet-rich plasma to stimulate cell regeneration and collagen production in the face. The treatment improves skin tone, texture, and elasticity, giving you a natural, youthful glow often called the 'vampire facial'.",
      ar: "علاج بلازما الوجه (PRP) يستخدم البلازما الغنية بالصفائح الدموية الخاصة بك لتحفيز تجديد الخلايا وإنتاج الكولاجين في الوجه. يحسن العلاج لون البشرة وملمسها ومرونتها، مما يمنحك إشراقاً طبيعياً وشبابياً.",
    },
    benefits: {
      en: ["Uses your own platelets", "Natural rejuvenation", "Improves skin texture", "Stimulates collagen"],
      ar: ["يستخدم صفائحك الدموية", "تجديد طبيعي", "يحسن ملمس البشرة", "يحفز الكولاجين"],
    },
  },
];

export function getServicesByCategory(category: ServiceCategory): ServiceData[] {
  return services.filter((s) => s.category === category);
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): ServiceData[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return services
    .filter((s) => s.category === service.category && s.slug !== slug)
    .slice(0, limit);
}
