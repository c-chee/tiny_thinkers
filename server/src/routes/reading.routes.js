const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const settingsQueries = require("../db/queries/settings.queries");

// =====================
// PASSAGES BY GRADE
// =====================
const PASSAGES_BY_GRADE = {
    K: [
        {
            title: "Sam and the Dog",
            text: "Sam has a dog. The dog runs fast. Sam runs too. They play in the sun.",
            questions: [
                { question: "Who has a dog?", choices: ["Sam", "The sun", "A cat"], answer: "Sam" },
                { question: "Where do they play?", choices: ["In the sun", "In school", "At night"], answer: "In the sun" }
            ]
        },
        {
            title: "The Big Hat",
            text: "A cat finds a hat. The hat is big. The cat sits in it and naps.",
            questions: [
                { question: "What did the cat find?", choices: ["A ball", "A hat", "A bed"], answer: "A hat" },
                { question: "What does the cat do?", choices: ["Runs", "Sleeps", "Eats"], answer: "Sleeps" }
            ]
        }
    ],

    1: [
        {
            title: "Fun at the Park",
            text: "Mia goes to the park with her brother. They swing and slide. Then they eat snacks and laugh together.",
            questions: [
                { question: "Where did Mia go?", choices: ["School", "Park", "Home"], answer: "Park" },
                { question: "Who went with Mia?", choices: ["Her friend", "Her brother", "Her teacher"], answer: "Her brother" }
            ]
        },
        {
            title: "The Red Ball",
            text: "Tom has a red ball. He throws it to his dog. The dog catches it and runs back to Tom.",
            questions: [
                { question: "What color is Tom's ball?", choices: ["Blue", "Red", "Green"], answer: "Red" },
                { question: "Who catches the ball?", choices: ["Cat", "Dog", "Friend"], answer: "Dog" }
            ]
        }
    ],

    2: [
        {
            title: "Lily's Garden",
            text: "Lily planted flowers behind her house. She watered them every day. Soon bright flowers grew, and bees visited the garden.",
            questions: [
                { question: "What did Lily plant?", choices: ["Trees", "Flowers", "Grass"], answer: "Flowers" },
                { question: "Who visited the garden?", choices: ["Birds", "Bees", "Dogs"], answer: "Bees" }
            ]
        },
        {
            title: "Tom's Kite",
            text: "Tom flew his kite on a windy day. The kite went high into the sky. He laughed as it danced in the wind.",
            questions: [
                { question: "What did Tom fly?", choices: ["Ball", "Kite", "Plane"], answer: "Kite" },
                { question: "Why did Tom laugh?", choices: ["It rained", "The kite danced", "He fell"], answer: "The kite danced" }
            ]
        }
    ],

    3: [
        {
            title: "A Day at the Lake",
            text: "Carlos and his family visited a lake during summer break. They swam, skipped rocks, and had lunch under tall trees. Carlos said it was his favorite day.",
            questions: [
                { question: "Where did Carlos go?", choices: ["Beach", "Lake", "School"], answer: "Lake" },
                { question: "What did Carlos do?", choices: ["Skimmed rocks", "Skipped school", "Painted"], answer: "Skimmed rocks" }
            ]
        },
        {
            title: "The Lost Puppy",
            text: "Anna found a small puppy near the park. She fed it and took it home. Soon, the puppy became part of her family.",
            questions: [
                { question: "What did Anna find?", choices: ["A kitten", "A puppy", "A bird"], answer: "A puppy" },
                { question: "What happened to the puppy?", choices: ["Ran away", "Became part of the family", "Stayed in the park"], answer: "Became part of the family" }
            ]
        }
    ],

    4: [
        {
            title: "The Hidden Garden",
            text: "Emma discovered an old map in her attic. Curious about its markings, she followed the trail behind her home and found a hidden garden full of colorful plants.",
            questions: [
                { question: "What did Emma find in the attic?", choices: ["A map", "A book", "A key"], answer: "A map" },
                { question: "What did she discover?", choices: ["A park", "A hidden garden", "A playground"], answer: "A hidden garden" }
            ]
        },
        {
            title: "The Busy Market",
            text: "During Saturday morning, Liam visited the market. Vendors sold fruits, vegetables, and handmade toys. Liam helped his mother pick fresh apples.",
            questions: [
                { question: "Where did Liam go?", choices: ["School", "Market", "Park"], answer: "Market" },
                { question: "What did Liam help with?", choices: ["Sell toys", "Pick apples", "Bake bread"], answer: "Pick apples" }
            ]
        }
    ],

    5: [
        {
            title: "Mountain Adventure",
            text: "During their hiking trip, Noah and his friends climbed steep trails and crossed rushing streams. When they reached the summit, the view stretched for miles, rewarding their effort.",
            questions: [
                { question: "Where were Noah and his friends?", choices: ["At the beach", "Hiking", "At school"], answer: "Hiking" },
                { question: "What rewarded their effort?", choices: ["Food", "A view", "A game"], answer: "A view" }
            ]
        },
        {
            title: "The Science Fair",
            text: "Sophia prepared a model volcano for the school science fair. She added baking soda and vinegar. When it erupted, everyone clapped and cheered.",
            questions: [
                { question: "What did Sophia build?", choices: ["A rocket", "A volcano", "A bridge"], answer: "A volcano" },
                { question: "What happened at the fair?", choices: ["Eruption", "Fire", "Spill"], answer: "Eruption" }
            ]
        }
    ]
};

// =====================
// Helpers
// =====================
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function normalizeGrade(raw) {
    if (!raw) return 2;
    const g = String(raw).toLowerCase().trim();
    if (g === "k" || g === "kindergarten") return "k";
    const n = Number(g);
    if ([1, 2, 3, 4, 5].includes(n)) return n;
    return 2;
}

// =====================
// Route
// =====================

router.get("/passage", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Reading /passage userId:", userId);

        const prefs = await settingsQueries.get(userId);
        console.log("User prefs:", prefs);

        const gradeRaw = prefs?.grade_level || 2;
        const grade = normalizeGrade(gradeRaw);
        console.log("Grade selected:", grade);

        const bank = PASSAGES_BY_GRADE[grade] || PASSAGES_BY_GRADE[2];
        res.json({ grade, passage: pickRandom(bank) });
    } catch (err) {
        console.error("Reading passage error:", err);
        res.status(500).json({ error: "Failed to load passage" });
    }
});



module.exports = router;




// --------- ANGEL EDIT -----------
// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth.middleware');

// router.get('/reading', authMiddleware, (req, res) => {
//     const grade = req.query.grade || 'kindergarten';

//     res.render('comp', {
//         layout: 'dashboard-layout',       // uses dashboard layout
//         pageTitle: 'Tiny Thinkers | Reading',
//         pageCss: '/css/reading.css',      // page-specific CSS
//         homeLink: '/dashboard',           // for nav
//         grade,
//         data: readingData[grade],         // dynamic grade content
//     });
// });

// // res.json(readingData[grade] || {});

//     const readingData = {
//         kindergarten: {
//             books: [
//                 {title: 'The Very Hungry Caterpillar', image: '/images/books/caterpillar.jpg', author: 'Eric Carle', link:'https://libbyapp.com/search/plcmc/search/query-The%20Very%20Hungry%20Caterpillar/page-1/3014825'}, {title: 'Clifford, the Big Red Dog', image: '/images/books/Clifford.jpg', author: 'Norman Bridwell', link:'https://libbyapp.com/search/plcmc/search/query-Clifford%20the%20Big%20Red%20Dog/page-1/630433'}
//             ],
//             tips: [
//                 ' Focus on identifying letters with their sounds',' Point to words with your finger while reading, this builds left to right tracking' ,' Create a routine by reading daily for at least 15 minutes '
//             ],
//             questions: [
//                 ' Who is the story about?', ' What was your favorite part of the story?', ' What do you see happening in the pictures?'
//             ]
//         },

//         first: {
//             books: [
//                 {title: 'The Rainbow Fish', author: 'Marcus Pfister', image: '/images/books/rainbow.jpg', link: ''}, {title: 'Goodnight Moon', image: '/images/books/goodnightmoon.jpg', author:'Margaret Wise Brown', link: 'https://libbyapp.com/search/plcmc/search/query-goodnight%20moon/page-1/3022159'}
//             ],
//             tips: [
//                 ' Re-reading books will increase speed and accuracy', ' Reading out loud with children increases confidence',' Update the routine by reading daily for 20 minutes '
//             ],
//             questions: [
//                 ' Who are the main characters?', ' What happened at the beginning of the story?', ' How did the story make you feel?'
//             ]
            
//         },

//         second: {
//             books: [
//                 {title: 'The Giving Tree', image: '/images/books/givingtree.jpg', author: 'Shel Silverstein', link: 'https://www.scribd.com/doc/268745627/thegivingtree-100227111735-phpapp01'}, {title: 'Adventures of Frog and Toad', image: '/images/books/frogandtoad.jpg', author: 'Arnold Lobel', link: 'https://libbyapp.com/search/plcmc/search/query-adventures%20of%20frog%20and%20toad/page-1/76192'}
//             ],
//             tips: [
//                 ' Play word games to make learning new words fun', ' Ask questions about the story and characters', ' Update the routine by reading daily for 25 minutes '
//             ],
//             questions: [
//                 ' What happened at the end of the story?', ' How did the character solve the problem?', ' What was the main problem in the story?'
//             ]
//         },

//         third: {
//             books: [
//                 {title: 'Goosebumps, Lets Get Invisible', image: '/images/books/goosebumps.jpg', author:'R.L. Stine', link: 'https://libbyapp.com/search/plcmc/search/query-goosebumps/page-1/1714364'}, {title: 'Magic Tree House, Dinosaurs Before Dark', image: '/images/books/treehouse.jpg', link: 'https://libbyapp.com/search/plcmc/search/query-magic%20tree%20house/page-1/106349', author: 'Mary Pope Osborne'}
//             ],
//             tips: [
//                 ' Allow children to choose books of interest, this helps reading be fun', ' Write new words down to review and define', ' Update the routine by reading daily for 30 minutes '
//             ],
//             questions: [
//                 ' Why do you think the character made those choices?', ' Can you summarize the story in your own words?'
//             ]
//         },

//         fourth: {
//             books: [
//                 {title: 'Wonder', image: '/images/books/wonder.jpg', author: 'R.J. Palacio', link: 'https://libbyapp.com/search/plcmc/search/query-wonder/page-1/630339'}, {title: 'A Series of Unfortunate Events, The Bad Beginning', image: '/images/books/unfortunate.jpg', author: 'Daniel Handler', link: 'https://libbyapp.com/search/plcmc/search/query-A%20Series%20of%20Unfortunate%20Events/page-1/139225'}
//             ],
//             tips: [
//                 ' Encourage children to choose books above their level', ' Ask open ended questions to further undestanding about plots and themes', ' Update the routine by reading daily for 35 minutes '
//             ],
//             questions: [
//                 ' How did the character change from the beginning to the end?', ' What details from the story support your answer?'
//             ]
//         },

//         fifth: {
//             books: [
//                 {title: 'Harry Potter and the Philosophers Stone', image: '/images/books/harrypotter.jpg', author: 'J.K. Rowling', link: 'https://libbyapp.com/search/plcmc/search/query-Harry%20Potter%20and%20the%20Goblet%20of%20Fire/page-1/789876'}, {title: 'Percy Jackson and the Lighting Thief', image: '/images/books/percyjackson.jpg', author:'Rick Riordan', link: 'https://libbyapp.com/search/plcmc/search/query-Percy%20Jackson%20and%20the%20Lightning%20Thief/page-1/521319'}
//             ],
//             tips: [
//                 ' Focusing on nonfiction books will broaden subject specific vocabulary and knowledge', ' Challenge chidlren to read books from different genres and make it into a challenge', ' Update the routine by reading daily for 40 minutes '
//             ],
//             questions: [
//                 ' How do the events in the story connect to each other?', ' What theme or message is the author trying to share?'
//             ]
//         }
//     };
// router.get('/reading', (req, res) => {
//     const grade = req.query.grade || 'kindergarten';
//     res.render('comp', {
//         layout: 'readinglayout',
//         pageTitle: 'Reading Comprehension', 
//         grade, 
//         data: readingData[grade]
//     });
// });

    


// module.exports = router;