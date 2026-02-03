const express = require('express');
const router = express.Router();


// res.json(readingData[grade] || {});

    const readingData = {
        kindergarten: {
            books: [
                {title: 'The Very Hungry Caterpillar', image: '/images/books/caterpillar.jpg', author: 'Eric Carle', link:'https://libbyapp.com/search/plcmc/search/query-The%20Very%20Hungry%20Caterpillar/page-1/3014825'}, {title: 'Clifford, the Big Red Dog', image: '/images/books/Clifford.jpg', author: 'Norman Bridwell', link:'https://libbyapp.com/search/plcmc/search/query-Clifford%20the%20Big%20Red%20Dog/page-1/630433'}
            ],
            tips: [
                ' Focus on identifying letters with their sounds',' Point to words with your finger while reading, this builds left to right tracking' ,' Create a routine by reading daily for at least 15 minutes '
            ],
            questions: [
                ' Who is the story about?', ' What was your favorite part of the story?', ' What do you see happening in the pictures?'
            ]
        },

        first: {
            books: [
                {title: 'The Rainbow Fish', author: 'Marcus Pfister', image: '/images/books/rainbow.jpg', link: ''}, {title: 'Goodnight Moon', image: '/images/books/goodnightmoon.jpg', author:'Margaret Wise Brown', link: 'https://libbyapp.com/search/plcmc/search/query-goodnight%20moon/page-1/3022159'}
            ],
            tips: [
                ' Re-reading books will increase speed and accuracy', ' Reading out loud with children increases confidence',' Update the routine by reading daily for 20 minutes '
            ],
            questions: [
                ' Who are the main characters?', ' What happened at the beginning of the story?', ' How did the story make you feel?'
            ]
            
        },

        second: {
            books: [
                {title: 'The Giving Tree', image: '/images/books/givingtree.jpg', author: 'Shel Silverstein', link: 'https://www.scribd.com/doc/268745627/thegivingtree-100227111735-phpapp01'}, {title: 'Adventures of Frog and Toad', image: '/images/books/frogandtoad.jpg', author: 'Arnold Lobel', link: 'https://libbyapp.com/search/plcmc/search/query-adventures%20of%20frog%20and%20toad/page-1/76192'}
            ],
            tips: [
                ' Play word games to make learning new words fun', ' Ask questions about the story and characters', ' Update the routine by reading daily for 25 minutes '
            ],
            questions: [
                ' What happened at the end of the story?', ' How did the character solve the problem?', ' What was the main problem in the story?'
            ]
        },

        third: {
            books: [
                {title: 'Goosebumps, Lets Get Invisible', image: '/images/books/goosebumps.jpg', author:'R.L. Stine', link: 'https://libbyapp.com/search/plcmc/search/query-goosebumps/page-1/1714364'}, {title: 'Magic Tree House, Dinosaurs Before Dark', image: '/images/books/treehouse.jpg', link: 'https://libbyapp.com/search/plcmc/search/query-magic%20tree%20house/page-1/106349', author: 'Mary Pope Osborne'}
            ],
            tips: [
                ' Allow children to choose books of interest, this helps reading be fun', ' Write new words down to review and define', ' Update the routine by reading daily for 30 minutes '
            ],
            questions: [
                ' Why do you think the character made those choices?', ' Can you summarize the story in your own words?'
            ]
        },

        fourth: {
            books: [
                {title: 'Wonder', image: '/images/books/wonder.jpg', author: 'R.J. Palacio', link: 'https://libbyapp.com/search/plcmc/search/query-wonder/page-1/630339'}, {title: 'A Series of Unfortunate Events, The Bad Beginning', image: '/images/books/unfortunate.jpg', author: 'Daniel Handler', link: 'https://libbyapp.com/search/plcmc/search/query-A%20Series%20of%20Unfortunate%20Events/page-1/139225'}
            ],
            tips: [
                ' Encourage children to choose books above their level', ' Ask open ended questions to further undestanding about plots and themes', ' Update the routine by reading daily for 35 minutes '
            ],
            questions: [
                ' How did the character change from the beginning to the end?', ' What details from the story support your answer?'
            ]
        },

        fifth: {
            books: [
                {title: 'Harry Potter and the Philosophers Stone', image: '/images/books/harrypotter.jpg', author: 'J.K. Rowling', link: 'https://libbyapp.com/search/plcmc/search/query-Harry%20Potter%20and%20the%20Goblet%20of%20Fire/page-1/789876'}, {title: 'Percy Jackson and the Lighting Thief', image: '/images/books/percyjackson.jpg', author:'Rick Riordan', link: 'https://libbyapp.com/search/plcmc/search/query-Percy%20Jackson%20and%20the%20Lightning%20Thief/page-1/521319'}
            ],
            tips: [
                ' Focusing on nonfiction books will broaden subject specific vocabulary and knowledge', ' Challenge chidlren to read books from different genres and make it into a challenge', ' Update the routine by reading daily for 40 minutes '
            ],
            questions: [
                ' How do the events in the story connect to each other?', ' What theme or message is the author trying to share?'
            ]
        }
    };
router.get('/reading', (req, res) => {
    const grade = req.query.grade || 'kindergarten';
    res.render('comp', {
        layout: 'readinglayout',
        pageTitle: 'Reading Comprehension', 
        grade, 
        data: readingData[grade]
    });
});

    


module.exports = router;