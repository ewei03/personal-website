// =============================================================
//  Translations: Canadian French (fr) and Simplified Chinese (zh).
//  Keys are the exact English text used in site.js / the components. If you change the
//  English wording in site.js, update the matching key here too, or that line will simply
//  show in English (nothing breaks).
//  Left in English on purpose: place names, company/product/project names, Medium article
//  titles, tech tags, and abbreviations (WPM, ARCT, RCM, WCA, …).
//  French follows Quebec typography (no space before ! ?, space before :, « »).
// =============================================================

export const translations = {
  fr: {
    // ---------- Interface ----------
    "Skip to content": "Aller au contenu",
    "Main": "Principal",
    "Intro": "Intro",
    "Experience": "Expérience",
    "Projects": "Projets",
    "Hobbies": "Loisirs",
    "Contact": "Contact",
    "Language": "Langue",
    "Colour scheme": "Palette de couleurs",
    "Colour scheme (double-click to reset)": "Palette de couleurs (double-clic pour réinitialiser)",
    "Explore me!": "Explore-moi!",
    "Get in touch": "Écris-moi",
    "Feel free to download my résumé.": "N'hésitez pas à télécharger mon CV.",
    "View résumé": "Voir mon CV",
    "{name}'s résumé": "CV de {name}",
    "Download PDF": "Télécharger le PDF",
    "Close": "Fermer",
    "Education": "Formation",
    "Check out some of my personal projects!": "Découvrez quelques-uns de mes projets personnels!",
    "Code": "Code",
    "Live demo": "Démo en direct",
    "Screenshot of {title}": "Capture d'écran de {title}",
    "Built with": "Technologies",
    "Focus areas": "Domaines",
    "I do a lot of cool things - check them out!": "Je fais plein de trucs cool, jetez-y un coup d'œil!",
    "Details": "Détails",
    "{title} details": "Détails : {title}",
    "{title}, digital drawing by {name}": "{title}, dessin numérique de {name}",
    "{title} gameplay": "Parties de {title}",
    "Records": "Records",
    "{title} video": "Vidéo : {title}",
    "Tracker": "Stats",
    "Pong?": "Pong?",
    "Totoro": "Totoro",
    "Furret": "Fouinar",
    "Dwebble": "Crabicoque",
    "Open menu": "Ouvrir le menu",
    "Close menu": "Fermer le menu",
    "Fun facts": "Anecdotes",
    "Fun fact!": "Le saviez-vous?",
    "Next!": "Suivant!",
    "More?": "Encore?",
    "Wow!": "Wow!",
    "Cool!": "Cool!",
    "No way!": "Pas vrai!",
    "Nice!": "Génial!",
    "Choose photo": "Choisir une photo",
    "{name}, {label} ({caption}). Show next photo.": "{name}, {label} ({caption}). Afficher la photo suivante.",
    "Previous: {label}": "Précédent : {label}",
    "Next: {label}": "Suivant : {label}",
    "{name} — Software Engineer": "{name} — Ingénieur logiciel",
    "Contact — {name}": "Contact — {name}",
    "Let's": "Jasons",
    "talk!": "un peu!",
    "Wanna say hi, or explore more of me? Find me below:": "Envie de dire bonjour ou d'en découvrir plus sur moi? Retrouvez-moi ci-dessous :",
    "Email": "Courriel",
    "Résumé": "CV",
    "View PDF": "Voir le PDF",
    "This page wandered": "Cette page s'est",
    "off.": "égarée.",
    "Nothing here.": "Rien à voir ici.",
    "Back home": "Retour à l'accueil",
    "“Cast all your anxiety on him because he cares for you.”": "« Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous. »",
    "1 Peter 5:7": "1 Pierre 5:7",
    "Play Pong": "Jouer à Pong",
    "Stop Pong": "Arrêter Pong",
    "Stop": "Arrêter",
    "Play a runner game": "Jouer à un jeu de course",
    "Jump?": "Sauter?",
    "Stop the runner game": "Arrêter le jeu de course",

    // ---------- Profile ----------
    "Hi there! I'm": "Salut! Moi, c'est",
    "I was always a **competitive** kid. Piano competitions, math contests, badminton tournaments, even Rubik's cube competitions. I always wanted to be the best.":
      "J'ai toujours été un enfant **compétitif**. Concours de piano, concours de maths, tournois de badminton, et même des compétitions de cube Rubik. Je voulais toujours être le meilleur.",
    "I don't compete as much anymore, but my competitive spirit lives on. I'm a **hobbyist** at heart who loves picking up new things and **grinding** until I'm good at them.":
      "Je fais moins de compétitions aujourd'hui, mais l'esprit de compétition est toujours là. Au fond, je suis un **touche-à-tout** qui adore apprendre de nouvelles choses et **s'acharner** jusqu'à les maîtriser.",
    "Today, I'm a **software engineer** who brings that same grind to my job.":
      "Aujourd'hui, je suis **ingénieur logiciel** et j'apporte la même persévérance à mon travail.",
    "Child": "Enfant",
    "Preteen": "Préado",
    "Teen": "Ado",
    "Adult": "Adulte",

    // ---------- Experience ----------
    "Software Engineering Consultant": "Consultant en génie logiciel",
    "Forward Deployed Engineer Intern": "Stagiaire, ingénieur déployé chez le client",
    "Software Engineer Intern": "Stagiaire en génie logiciel",
    "Mobile Software Engineer Intern": "Stagiaire en développement mobile",
    "Data Quality Associate Intern": "Stagiaire, qualité des données",
    "Shipped a content migration project for BMO. Now building them an IVR system.":
      "Livré un projet de migration de contenu pour BMO. Je leur construis maintenant un système de réponse vocale interactive (RVI).",
    "Built internal tools and data workflows that improved quality across Federato's insurtech platform.":
      "Développé des outils internes et des flux de données qui ont amélioré la qualité de la plateforme insurtech de Federato.",
    "Shipped Quick Buy, a one-click checkout (think Amazon's \"Buy Now\") worth ~$748K in annual revenue.":
      "Livré Quick Buy, un paiement en un clic (pensez au « Acheter maintenant » d'Amazon) représentant environ 748 k$ de revenus annuels.",
    "Built iOS and Android sample apps that showcased the core product to clients.":
      "Développé des applications de démonstration iOS et Android pour présenter le produit principal aux clients.",
    "Led development of our flagship patient portal website.":
      "Dirigé le développement de notre portail patient phare.",
    "Maintained data for 30,000+ North American infrastructure companies.":
      "Tenu à jour les données de plus de 30 000 entreprises d'infrastructure nord-américaines.",
    "Fintech": "Fintech",
    "Consulting": "Conseil",
    "Full-stack": "Full-stack",
    "Insurtech": "Insurtech",
    "Startup": "Jeune pousse",
    "E-commerce": "Commerce électronique",
    "Backend": "Back-end",
    "QA & Testing": "AQ et tests",
    "Telematics": "Télématique",
    "Mobile": "Mobile",
    "Healthtech": "Technologies de la santé",
    "Infrastructure": "Infrastructure",
    "Data": "Données",
    "Bachelor of Computer Science": "Baccalauréat en informatique",
    "University of Waterloo": "Université de Waterloo",
    "Studied artificial intelligence, machine learning, user interfaces, databases, and statistics.":
      "Études en intelligence artificielle, apprentissage automatique, interfaces utilisateur, bases de données, et statistique.",

    // ---------- Projects ----------
    "TypeOff (WIP)": "TypeOff (en cours)",
    "PlanAway is the future for vacation planning: a **Claude-powered AI agent** that does all your research. Describe your dream trip in your own words, and it builds out a comprehensive, day-by-day itinerary within minutes!":
      "PlanAway, c'est l'avenir de la planification de voyages : un **agent IA propulsé par Claude** qui fait toutes les recherches pour vous. Décrivez le voyage de vos rêves dans vos propres mots, et il crée un itinéraire complet, jour par jour, en quelques minutes!",
    "**Tetr.io** meets **TypeRacer**. A real-time 1v1 battle with a catch: the faster you type, the more they type.":
      "**Tetr.io** rencontre **TypeRacer**. Un duel 1 contre 1 en temps réel, avec une particularité : plus vous tapez vite, plus votre adversaire doit taper.",
    "Harold is an anti-procrastination **Discord bot** that nags you until your homework is done.":
      "Harold est un **bot Discord** anti-procrastination qui vous talonne jusqu'à ce que vos devoirs soient faits.",
    "An **iOS app** for finding, rating and getting directions to the nearest washroom, with filters for what you need.":
      "Une **application iOS** pour trouver et évaluer la toilette la plus proche et s'y rendre, avec des filtres selon vos besoins.",

    // ---------- Fun facts ----------
    "I can type **200+ WPM**, putting me in the **top 0.07%** on Monkeytype's 15-second leaderboard!":
      "Je tape à **plus de 200 WPM**, ce qui me place dans le **top 0,07 %** du classement de 15 secondes de Monkeytype!",
    "I have **perfect pitch**! I get tested on it a lot...":
      "J'ai l'**oreille absolue**! On me teste souvent là-dessus…",
    "I can recite pi to **101 decimal places** from memory!":
      "Je peux réciter pi jusqu'à la **101e décimale** de mémoire!",
    "I can name **every country in the world** on Sporcle, and at one point I knew all of their flags too.":
      "Je peux nommer **tous les pays du monde** sur Sporcle, et à une époque, je connaissais aussi tous leurs drapeaux.",
    "At 12, I played **first violin** in the OCMS Youth Symphony Orchestra.":
      "À 12 ans, je jouais **premier violon** dans l'orchestre symphonique des jeunes de l'OCMS.",
    "I love shooter games, especially **VALORANT**. I even flew to Paris to watch a professional tournament live!":
      "J'adore les jeux de tir, surtout **VALORANT**. J'ai même pris l'avion jusqu'à Paris pour voir un tournoi professionnel en personne!",
    "I enjoy running! I recently finished the Under Armour 10K in **55 minutes**.":
      "J'aime courir! J'ai récemment terminé le 10 km Under Armour en **55 minutes**.",
    "I once won a **chess medal** at a tournament. I'm not very good though.":
      "J'ai déjà gagné une **médaille aux échecs** lors d'un tournoi. Je ne suis pas très bon, par contre.",
    "One of my more expensive hobbies is building **mechanical keyboards**!":
      "Un de mes passe-temps les plus coûteux : assembler des **claviers mécaniques**!",

    // ---------- Hobbies: Music ----------
    "Music": "Musique",
    "Music is a very formative part of my life. I've competed in provincial-level competitions, accompanied soloists for recitals, and led church worship. My next goal is to get into **production**!":
      "La musique a profondément façonné ma vie. J'ai participé à des compétitions de niveau provincial, accompagné des solistes lors de récitals et dirigé la louange à l'église. Mon prochain objectif : me lancer dans la **production**!",
    "I learned **piano** when I was five and **violin** when I was seven. I love music and I'm hoping to get into production! Click to read up on my music background.":
      "J'ai appris le **piano** à cinq ans et le **violon** à sept ans. J'adore la musique et j'aimerais me lancer dans la production! Cliquez pour en savoir plus sur mon parcours musical.",
    "Diploma in Piano": "Diplôme en piano",
    "Level 9": "Niveau 9",
    "RCM Violin": "Violon RCM",
    "Piano": "Piano",
    "Violin": "Violon",
    "ARCT Diploma": "Diplôme ARCT",
    "Associate diploma from the Royal Conservatory of Music - the highest level.": "Diplôme d'associé du Conservatoire royal de musique, le plus haut niveau.",
    "Competitions": "Compétitions",
    "Competed throughout my childhood, including OMFA Provincials. Took home various medals and awards.":
      "J'ai participé à des compétitions tout au long de mon enfance, y compris aux finales provinciales de l'OMFA. J'ai remporté plusieurs médailles et prix.",
    "RCM Level 9": "RCM, niveau 9",
    "First violin, OCMS Youth Symphony Orchestra": "Premier violon, orchestre symphonique des jeunes de l'OCMS",
    "Played in orchestra for three years.": "J'ai joué dans l'orchestre pendant trois ans.",
    "I'm also self-taught in **guitar** and played **trumpet** in my school band!":
      "J'ai aussi appris la **guitare** en autodidacte et joué de la **trompette** dans l'harmonie de mon école!",

    // ---------- Hobbies: Rhythm games ----------
    "Rhythm games": "Jeux de rythme",
    "Achievements": "Réalisations",
    "In 2017, I downloaded **osu!** after a friend introduced it to me, and I was immediately hooked.":
      "En 2017, j'ai téléchargé **osu!** après qu'un ami me l'a fait découvrir, et j'ai tout de suite accroché.",
    "I've competed in small tournaments, performed at my school's talent show, and spent a *lot* of hours grinding.":
      "J'ai participé à de petits tournois, joué au spectacle de talents de mon école et passé *beaucoup* d'heures à m'entraîner.",
    "I don't play anymore, but I love going to rhythm game arcades!":
      "Je ne joue plus, mais j'adore aller dans les arcades de jeux de rythme!",
    "I'm a huge rhythm game enjoyer, most notably **osu!**. Click to see some of my best plays!":
      "Je suis un grand amateur de jeux de rythme, surtout **osu!**. Cliquez pour voir certaines de mes meilleures parties!",
    "global, osu!mania": "mondial, osu!mania",
    "global, osu!": "mondial, osu!",
    "#844 global rank (Top 30 in Canada), osu!mania": "844e au classement mondial (top 30 au Canada), osu!mania",
    "#7,349 global rank, osu!": "7 349e au classement mondial, osu!",
    "1st place, Tournamint #4": "1re place, Tournamint #4",
    "Part of the winning team, with a profile badge to show for it.": "Membre de l'équipe gagnante, avec un badge de profil en prime.",
    "osu! profile": "Profil osu!",
    "My osu! playlist": "Ma liste de lecture osu!",

    // ---------- Hobbies: Against the clock ----------
    "Against the clock": "Contre la montre",
    "In 2014, I was bored and randomly decided to pick up a **Rubik's Cube**. Using a YouTube tutorial, I learned to solve it - and the rest is history!":
      "En 2014, par ennui, j'ai décidé sur un coup de tête d'essayer le **cube Rubik**. Grâce à un tutoriel YouTube, j'ai appris à le résoudre, et la suite appartient à l'histoire!",
    "I love speedy hobbies in general, which also includes **typing games**, and most recently **cup stacking**.":
      "J'adore les passe-temps où la vitesse compte, comme les **jeux de dactylographie** et, plus récemment, le **sport stacking**.",
    "My favourite hobbies involve beating the clock! It started when I picked up a **Rubik's Cube** for the first time in 2014 and I was immediately hooked. Click to see some cool stats!":
      "Mes passe-temps préférés consistent à battre la montre! Tout a commencé en 2014, quand j'ai pris un **cube Rubik** pour la première fois et que j'ai tout de suite accroché. Cliquez pour voir quelques statistiques!",
    "Check out my works!": "Découvrez mes œuvres!",
    "Cycle": "Cycle",
    "3x3 Rubik's cube": "Cube Rubik 3x3",
    "Cycle (speed stacking)": "Cycle (sport stacking)",
    "Rubik's Cube": "Cube Rubik",
    "Bronze medal, 2x2 cube": "Médaille de bronze, cube 2x2",
    "Done at Toronto Winter Open 2015.": "Obtenue au Toronto Winter Open 2015.",
    "Personal bests": "Records personnels",
    "Personal bests (Monkeytype)": "Records personnels (Monkeytype)",
    "Event": "Épreuve",
    "Single": "Simple",
    "Average": "Moyenne",
    "Time": "Temps",
    "Test": "Test",
    "3x3 One-Handed": "3x3 à une main",
    "Typing": "Dactylographie",
    "200+ WPM, top 0.07%": "Plus de 200 WPM, top 0,07 %",
    "Monkeytype's 15-second leaderboard.": "Classement de 15 secondes de Monkeytype.",
    "15 seconds": "15 secondes",
    "30 seconds": "30 secondes",
    "60 seconds": "60 secondes",
    "10 words": "10 mots",
    "25 words": "25 mots",
    "Speed stacking": "Sport stacking",
    "WCA profile": "Profil WCA",

    // ---------- Hobbies: Away from the screen ----------
    "Away from the screen": "Loin de l'écran",
    "Here's just a few more of the many things I partake in:": "Voici quelques-unes des nombreuses autres activités auxquelles je m'adonne :",
    "Some miscellaneous hobbies of mine that didn't fit in the other categories, from **cooking** to **weightlifting** - click to find out more!":
      "Quelques passe-temps divers qui ne cadraient pas dans les autres catégories, de la **cuisine** à la **musculation**; cliquez pour en savoir plus!",
    "click": "clique",
    "me": "ici",
    "to": "pour",
    "find": "en savoir",
    "out!": "plus!",
    "Cooking": "Cuisine",
    "Sourdough bread and handmade pasta": "Pain au levain et pâtes maison",
    "My latest obsessions. I've made plenty of other stuff but I can't be bothered to list them all.":
      "Mes obsessions du moment. J'ai cuisiné plein d'autres choses, mais j'ai la flemme de tout énumérer.",
    "Racket sports": "Sports de raquette",
    "Badminton, table tennis, pickleball, tennis": "Badminton, tennis de table, pickleball, tennis",
    "Grew up playing and competing in badminton (I'm ultra washed now).":
      "J'ai grandi en jouant au badminton et en compétition (je suis complètement rouillé maintenant).",
    "Writing": "Écriture",
    "On Medium.": "Sur Medium.",
    "Published in UWCCF on Medium.": "Publié dans UWCCF sur Medium.",
    "Read": "Lire",
    "Weightlifting": "Musculation",
    "Lifting since 2024": "Musculation depuis 2024",
    "Trying to do a muscle-up next.": "Prochain objectif : réussir un muscle-up.",

    // ---------- Hobbies: Digital art ----------
    "Digital art": "Art numérique",
    "Putting my drawing tablet to use sometimes. More to come... if I have the patience for it...":
      "Je sors ma tablette graphique de temps en temps. D'autres œuvres à venir… si j'ai la patience…",
  },

  zh: {
    // ---------- Interface ----------
    "Skip to content": "跳到正文",
    "Main": "主导航",
    "Intro": "简介",
    "Experience": "经历",
    "Projects": "项目",
    "Hobbies": "爱好",
    "Contact": "联系",
    "Language": "语言",
    "Colour scheme": "配色",
    "Colour scheme (double-click to reset)": "配色（双击重置）",
    "Explore me!": "了解我！",
    "Get in touch": "联系我",
    "Feel free to download my résumé.": "欢迎下载我的简历。",
    "View résumé": "查看简历",
    "{name}'s résumé": "{name}的简历",
    "Download PDF": "下载 PDF",
    "Close": "关闭",
    "Education": "教育背景",
    "Check out some of my personal projects!": "来看看我的个人项目吧！",
    "Code": "代码",
    "Live demo": "在线演示",
    "Screenshot of {title}": "{title} 截图",
    "Built with": "技术栈",
    "Focus areas": "领域",
    "I do a lot of cool things - check them out!": "我有很多有趣的爱好，来看看吧！",
    "Details": "详情",
    "{title} details": "{title}：详情",
    "{title}, digital drawing by {name}": "{title}，{name}的数字绘画",
    "{title} gameplay": "{title} 游戏实况",
    "Records": "记录",
    "{title} video": "{title} 视频",
    "Tracker": "战绩",
    "Pong?": "来打乒乓？",
    "Totoro": "龙猫",
    "Furret": "大尾立",
    "Dwebble": "石居蟹",
    "Cycle": "循环",
    "Open menu": "打开菜单",
    "Close menu": "关闭菜单",
    "Fun facts": "冷知识",
    "Fun fact!": "冷知识！",
    "Next!": "下一个！",
    "More?": "还有吗？",
    "Wow!": "哇！",
    "Cool!": "酷！",
    "No way!": "不会吧！",
    "Nice!": "厉害！",
    "Choose photo": "选择照片",
    "{name}, {label} ({caption}). Show next photo.": "{name}，{label}（{caption}）。显示下一张照片。",
    "Previous: {label}": "上一页：{label}",
    "Next: {label}": "下一页：{label}",
    "{name} — Software Engineer": "{name} — 软件工程师",
    "Contact — {name}": "联系 — {name}",
    "Let's": "一起",
    "talk!": "聊聊吧！",
    "Wanna say hi, or explore more of me? Find me below:": "想打个招呼，或者更了解我？在下面找到我：",
    "Email": "邮箱",
    "Résumé": "简历",
    "View PDF": "查看 PDF",
    "This page wandered": "这个页面",
    "off.": "走丢了。",
    "Nothing here.": "这里什么都没有。",
    "Back home": "返回首页",
    "“Cast all your anxiety on him because he cares for you.”": "“你们要将一切的忧虑卸给神，因为他顾念你们。”",
    "1 Peter 5:7": "彼得前书 5:7",
    "Play Pong": "玩 Pong",
    "Stop Pong": "停止 Pong",
    "Stop": "停止",
    "Play a runner game": "玩跑酷游戏",
    "Jump?": "跳？",
    "Stop the runner game": "停止跑酷游戏",

    // ---------- Profile ----------
    "Enoch Wei": "魏以乐",
    "Enoch Wei.": "魏以乐。",
    "Hi there! I'm": "你好！我是",
    "I was always a **competitive** kid. Piano competitions, math contests, badminton tournaments, even Rubik's cube competitions. I always wanted to be the best.":
      "我从小就很**好胜**。钢琴比赛、数学竞赛、羽毛球比赛，甚至魔方比赛，我总想做到最好。",
    "I don't compete as much anymore, but my competitive spirit lives on. I'm a **hobbyist** at heart who loves picking up new things and **grinding** until I'm good at them.":
      "现在我不常参加比赛了，但好胜心一直都在。骨子里我是个**爱好广泛**的人，喜欢尝试新事物，并且**反复苦练**直到精通。",
    "Today, I'm a **software engineer** who brings that same grind to my job.":
      "如今，我是一名**软件工程师**，把同样的钻劲带到工作中。",
    "Child": "儿时",
    "Preteen": "少年",
    "Teen": "青少年",
    "Adult": "现在",

    // ---------- Experience ----------
    "Software Engineering Consultant": "软件工程顾问",
    "Forward Deployed Engineer Intern": "前线部署工程师实习生",
    "Software Engineer Intern": "软件工程师实习生",
    "Mobile Software Engineer Intern": "移动软件工程师实习生",
    "Data Quality Associate Intern": "数据质量助理实习生",
    "Shipped a content migration project for BMO. Now building them an IVR system.":
      "为 BMO 交付了内容迁移项目，目前正在为其构建 IVR（交互式语音应答）系统。",
    "Built internal tools and data workflows that improved quality across Federato's insurtech platform.":
      "开发内部工具和数据工作流，提升了 Federato 保险科技平台的整体质量。",
    "Shipped Quick Buy, a one-click checkout (think Amazon's \"Buy Now\") worth ~$748K in annual revenue.":
      "上线了 Quick Buy 一键结账功能（类似亚马逊的“立即购买”），每年带来约 74.8 万美元收入。",
    "Built iOS and Android sample apps that showcased the core product to clients.":
      "开发 iOS 和 Android 示例应用，向客户展示核心产品。",
    "Led development of our flagship patient portal website.":
      "主导开发公司的旗舰患者门户网站。",
    "Maintained data for 30,000+ North American infrastructure companies.":
      "维护了 30,000 多家北美基础设施公司的数据。",
    "Fintech": "金融科技",
    "Consulting": "咨询",
    "Full-stack": "全栈",
    "Insurtech": "保险科技",
    "Startup": "初创公司",
    "E-commerce": "电子商务",
    "Backend": "后端",
    "QA & Testing": "质量保证与测试",
    "Telematics": "车联网",
    "Mobile": "移动端",
    "Healthtech": "医疗科技",
    "Infrastructure": "基础设施",
    "Data": "数据",
    "Bachelor of Computer Science": "计算机科学学士",
    "University of Waterloo": "滑铁卢大学",
    "Studied artificial intelligence, machine learning, user interfaces, databases, and statistics.":
      "读了人工智能、机器学习、用户界面、数据库和统计学。",

    // ---------- Projects ----------
    "TypeOff (WIP)": "TypeOff（开发中）",
    "PlanAway is the future for vacation planning: a **Claude-powered AI agent** that does all your research. Describe your dream trip in your own words, and it builds out a comprehensive, day-by-day itinerary within minutes!":
      "PlanAway 是旅行规划的未来：一个**由 Claude 驱动的 AI 智能体**，帮你完成所有调研。用自己的话描述梦想中的旅行，它就能在几分钟内生成完整的逐日行程！",
    "**Tetr.io** meets **TypeRacer**. A real-time 1v1 battle with a catch: the faster you type, the more they type.":
      "**Tetr.io** 遇上 **TypeRacer**。一场实时 1v1 对决，规则很特别：你打得越快，对手要打的字就越多。",
    "Harold is an anti-procrastination **Discord bot** that nags you until your homework is done.":
      "Harold 是一个防拖延的 **Discord 机器人**，会一直催你，直到你写完作业。",
    "An **iOS app** for finding, rating and getting directions to the nearest washroom, with filters for what you need.":
      "一款 **iOS 应用**，帮你找到并评价最近的洗手间、提供路线，还能按需筛选。",

    // ---------- Fun facts ----------
    "I can type **200+ WPM**, putting me in the **top 0.07%** on Monkeytype's 15-second leaderboard!":
      "我的打字速度超过 **200 WPM**，在 Monkeytype 15 秒排行榜上位列**前 0.07%**！",
    "I have **perfect pitch**! I get tested on it a lot...":
      "我有**绝对音感**！经常被人拿来测试……",
    "I can recite pi to **101 decimal places** from memory!":
      "我能凭记忆背出圆周率小数点后 **101 位**！",
    "I can name **every country in the world** on Sporcle, and at one point I knew all of their flags too.":
      "我能在 Sporcle 上说出**世界上所有国家**，曾经还认得出它们所有的国旗。",
    "At 12, I played **first violin** in the OCMS Youth Symphony Orchestra.":
      "12 岁时，我在 OCMS 青少年交响乐团担任**第一小提琴**。",
    "I love shooter games, especially **VALORANT**. I even flew to Paris to watch a professional tournament live!":
      "我超爱射击游戏，尤其是 **VALORANT**。我甚至飞到巴黎现场观看了一场职业比赛！",
    "I enjoy running! I recently finished the Under Armour 10K in **55 minutes**.":
      "我喜欢跑步！最近以 **55 分钟**跑完了 Under Armour 10K。",
    "I once won a **chess medal** at a tournament. I'm not very good though.":
      "我曾在比赛中赢过一枚**国际象棋奖牌**。不过我下得并不好。",
    "One of my more expensive hobbies is building **mechanical keyboards**!":
      "我比较烧钱的爱好之一是组装**机械键盘**！",

    // ---------- Hobbies: Music ----------
    "Music": "音乐",
    "Music is a very formative part of my life. I've competed in provincial-level competitions, accompanied soloists for recitals, and led church worship. My next goal is to get into **production**!":
      "音乐深深塑造了我的人生。我参加过省级比赛，为独奏者的演奏会伴奏，也带领过教会敬拜。我的下一个目标是学习音乐**制作**！",
    "I learned **piano** when I was five and **violin** when I was seven. I love music and I'm hoping to get into production! Click to read up on my music background.":
      "我五岁学**钢琴**，七岁学**小提琴**。我热爱音乐，希望将来能做音乐制作！点击了解我的音乐经历。",
    "Diploma in Piano": "钢琴文凭",
    "Level 9": "9 级",
    "RCM Violin": "RCM 小提琴",
    "Piano": "钢琴",
    "Violin": "小提琴",
    "ARCT Diploma": "ARCT 文凭",
    "Associate diploma from the Royal Conservatory of Music - the highest level.": "皇家音乐学院（RCM）副院士文凭，最高级别。",
    "Competitions": "比赛",
    "Competed throughout my childhood, including OMFA Provincials. Took home various medals and awards.":
      "从小到大参加了许多比赛，包括 OMFA 省级赛，获得过多枚奖牌和奖项。",
    "RCM Level 9": "RCM 9 级",
    "First violin, OCMS Youth Symphony Orchestra": "OCMS 青少年交响乐团第一小提琴",
    "Played in orchestra for three years.": "在乐团演奏了三年。",
    "I'm also self-taught in **guitar** and played **trumpet** in my school band!":
      "我还自学了**吉他**，并在学校乐队吹过**小号**！",

    // ---------- Hobbies: Rhythm games ----------
    "Rhythm games": "音游",
    "Achievements": "成就",
    "In 2017, I downloaded **osu!** after a friend introduced it to me, and I was immediately hooked.":
      "2017 年，朋友向我推荐了 **osu!**，我下载后立刻就入迷了。",
    "I've competed in small tournaments, performed at my school's talent show, and spent a *lot* of hours grinding.":
      "我参加过小型比赛，在学校才艺表演上演出过，还投入了*大量*时间苦练。",
    "I don't play anymore, but I love going to rhythm game arcades!":
      "现在已经不玩了，但我很喜欢去音游街机厅！",
    "I'm a huge rhythm game enjoyer, most notably **osu!**. Click to see some of my best plays!":
      "我是资深音游爱好者，最爱 **osu!**。点击观看我的高光操作！",
    "global, osu!mania": "全球排名，osu!mania",
    "global, osu!": "全球排名，osu!",
    "#844 global rank (Top 30 in Canada), osu!mania": "osu!mania 全球第 844 名（加拿大前 30）",
    "#7,349 global rank, osu!": "osu! 全球第 7,349 名",
    "1st place, Tournamint #4": "Tournamint #4 冠军",
    "Part of the winning team, with a profile badge to show for it.": "作为冠军队成员，获得了个人主页徽章。",
    "osu! profile": "osu! 个人主页",
    "My osu! playlist": "我的 osu! 播放列表",

    // ---------- Hobbies: Against the clock ----------
    "Against the clock": "与时间赛跑",
    "In 2014, I was bored and randomly decided to pick up a **Rubik's Cube**. Using a YouTube tutorial, I learned to solve it - and the rest is history!":
      "2014 年，我因为无聊心血来潮拿起了**魔方**。跟着 YouTube 教程学会了还原，从此一发不可收拾！",
    "I love speedy hobbies in general, which also includes **typing games**, and most recently **cup stacking**.":
      "我喜欢各种比拼速度的爱好，包括**打字游戏**，以及最近迷上的**竞技叠杯**。",
    "My favourite hobbies involve beating the clock! It started when I picked up a **Rubik's Cube** for the first time in 2014 and I was immediately hooked. Click to see some cool stats!":
      "我最爱的爱好都是和时间赛跑！一切始于 2014 年，我第一次拿起**魔方**就迷上了。点击查看一些有趣的数据！",
    "Check out my works!": "来看看我的作品吧！",
    "3x3 Rubik's cube": "3x3 魔方",
    "Cycle (speed stacking)": "Cycle（竞技叠杯）",
    "Rubik's Cube": "魔方",
    "Bronze medal, 2x2 cube": "2x2 魔方铜牌",
    "Done at Toronto Winter Open 2015.": "于 Toronto Winter Open 2015 获得。",
    "Personal bests": "个人最佳成绩",
    "Personal bests (Monkeytype)": "个人最佳成绩（Monkeytype）",
    "Event": "项目",
    "Single": "单次",
    "Average": "平均",
    "Time": "时间",
    "Test": "测试",
    "3x3 One-Handed": "3x3 单手",
    "Typing": "打字",
    "200+ WPM, top 0.07%": "200+ WPM，前 0.07%",
    "Monkeytype's 15-second leaderboard.": "Monkeytype 15 秒排行榜。",
    "15 seconds": "15 秒",
    "30 seconds": "30 秒",
    "60 seconds": "60 秒",
    "10 words": "10 词",
    "25 words": "25 词",
    "Speed stacking": "竞技叠杯",
    "WCA profile": "WCA 个人主页",

    // ---------- Hobbies: Away from the screen ----------
    "Away from the screen": "屏幕之外",
    "Here's just a few more of the many things I partake in:": "以下是我参与的众多活动中的一小部分：",
    "Some miscellaneous hobbies of mine that didn't fit in the other categories, from **cooking** to **weightlifting** - click to find out more!":
      "一些不属于其他类别的爱好，从**烹饪**到**举铁**，点击了解更多！",
    "click": "点",
    "me": "我",
    "to": "看",
    "find": "更",
    "out!": "多！",
    "Cooking": "烹饪",
    "Sourdough bread and handmade pasta": "酸种面包和手工意面",
    "My latest obsessions. I've made plenty of other stuff but I can't be bothered to list them all.":
      "最近的心头好。其他东西也做过不少，但懒得一一列出。",
    "Racket sports": "球拍类运动",
    "Badminton, table tennis, pickleball, tennis": "羽毛球、乒乓球、匹克球、网球",
    "Grew up playing and competing in badminton (I'm ultra washed now).":
      "从小打羽毛球、参加比赛（现在已经完全退步了）。",
    "Writing": "写作",
    "On Medium.": "发布于 Medium。",
    "Published in UWCCF on Medium.": "发表于 Medium 上的 UWCCF 专栏。",
    "Read": "阅读",
    "Weightlifting": "举铁",
    "Lifting since 2024": "2024 年开始举铁",
    "Trying to do a muscle-up next.": "下一个目标：做出一个双力臂。",

    // ---------- Hobbies: Digital art ----------
    "Digital art": "数字绘画",
    "Putting my drawing tablet to use sometimes. More to come... if I have the patience for it...":
      "偶尔拿出数位板画几笔。还会有更多作品……如果我有耐心的话……",
  },
};
