window.TARA_QUESTIONS = [
 {id:"flower",category:"Little favourites",art:0,q:"Which flower makes Dadi happiest?",options:["Pink rose","Sunflower","Lotus","Jasmine"],correct:0,note:"Pink gulaab. A little flower in her favourite colour."},
 {id:"colour",category:"Little favourites",art:0,q:"What is Dadi’s favourite colour?",options:["White","Pink","Blue","Green"],correct:1,note:"Pink is Dadi’s favourite colour."},
 {id:"fruit",category:"At Dadi’s table",art:1,q:"Which fruit is her absolute favourite?",options:["Banana","Pomegranate","Haapus mango","Grapes"],correct:2,note:"Haapus aam, the Alphonso mango, is her favourite."},
 {id:"food",category:"At Dadi’s table",art:2,q:"Which pair belongs on Dadi’s favourite-food list?",options:["Dhokla & thepla","Dahi vada & idli","Khichdi & kadhi","Handvo & kachori"],correct:1,note:"Dahi vada and idli both made her favourites list."},
 {id:"dessert",category:"Something sweet",art:3,q:"What is Dadi’s favourite dessert?",options:["Shrikhand","Halwa","Gulab jamun","Kheer"],correct:3,note:"A bowl of kheer is her favourite sweet treat."},
 {id:"book",category:"Her bookshelf",art:4,q:"Which book does Dadi love most?",options:["Kalpa Sutra","Gautamprucha","Tattvartha Sutra","Uttaradhyayana Sutra"],correct:1,note:"Her favourite book is Gautamprucha."},
 {id:"weekday",category:"Little favourites",art:0,q:"Which day of the week is her favourite?",options:["Sunday","Friday","Monday","Thursday"],correct:2,note:"Monday is Dadi’s favourite day of the week."},
 {id:"stavan",category:"A song close to her heart",art:8,q:"Which is Dadi’s favourite stavan?",options:["Maitri Bhav Nu Pavitra Zarnu","Tame Man Mukine Varsya","Bhakti Karta Chhutey Mara Pran","Dada Tara Vina"],correct:2,note:"Bhakti karta chhutey mara pran is the stavan closest to her heart."},
 {id:"season",category:"Little favourites",art:7,q:"Which season does Dadi love most?",options:["Summer","Monsoon","Spring","Winter"],correct:3,note:"Winter is her favourite season."},
 {id:"school",category:"Before we called her Dadi",art:4,q:"Where did Dadi go to school as a girl?",options:["New Era Girls School","Rosary School","Navrachana School","Maharani Girls School"],correct:0,note:"Dadi attended New Era Girls School."},
 {id:"hobby",category:"The girl she was",art:5,q:"Which activity does Dadi love?",options:["Cycling","Swimming","Cricket","Dancing"],correct:0,note:"She loves to cycle. There is still so much to discover about the girl she was."},
 {id:"subject",category:"The girl who loved a problem",art:4,q:"Which subject was her favourite?",options:["Geography","History","Mathematics","Sanskrit"],correct:2,note:"Mathematics. She still remembers a tuition teacher returning after the lesson to share a solution he had worked out on his way home."},
 {id:"disliked",category:"School-day opinions",art:4,q:"Which subjects did she dislike?",options:["Maths & science","History & Sanskrit","English & maths","Geography & science"],correct:1,note:"History and Sanskrit were not her favourites."},
 {id:"birthyear",category:"Her story",art:0,q:"In which year was Dadi born?",options:["1945","1949","1947","1948"],correct:2,note:"1947, the year of Indian independence."},
 {id:"birthday",category:"Her story",art:0,q:"What is her birthday on the Gregorian calendar?",options:["10 October","14 October","7 October","24 October"],correct:1,note:"14 October. She celebrates her birthday by her tithi."},
 {id:"tithi",category:"The birthday she celebrates",art:8,q:"Which is Dadi’s birthday tithi?",options:["Aso Sud Poonam","Kartik Sud Padvo","Bhadarva Vad Amavasya","Bhadarva Sud Pancham"],correct:2,note:"Bhadarva Vad Amavasya, also called Bhadarva Vad Amas."},
 {id:"marriage",category:"A new chapter",art:0,q:"When did Dadi get married?",options:["1962, aged 15","1964, aged 17","1966, aged 19","1965, aged 18"],correct:1,note:"She married in 1964, at the age of 17."},
 {id:"fracture",category:"A childhood memory",art:5,q:"Which leg did Dadi once fracture?",options:["Left leg","Right leg","Both legs","Neither leg"],correct:1,note:"Her right leg. Purvi remembers her telling a story about getting hurt while playing."},
];

const birth = window.TARA_QUESTIONS.find(q => q.id === "birthyear");
window.TARA_QUESTIONS = [birth, ...window.TARA_QUESTIONS.filter(q => q !== birth)];
window.TARA_QUESTIONS.splice(12, 0,
 {id:"boardgame", category:"Let’s play", q:"What is Dadi’s favourite board game?",options:["Carrom","Chinese checkers","Ludo","Chess"],correct:1,note:"Chinese checkers is her favourite board game."},
 {id:"carrom", category:"A very worthy opponent", q:"Which board game is Dadi especially good at?",options:["Chess","Snakes and ladders","Carrom","Ludo"],correct:2,note:"Carrom! Think twice before challenging her."}
);
window.TARA_QUIZ_VERSION = "tara-v1";
