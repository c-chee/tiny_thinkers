const express = require('express');
const router = express.Router();


router.get('/reading', (req, res) => {
    const grade = req.query.grade || 'kindergarten';
    res.render('comp', {
        pageTitle: 'Reading Comprehension', grade, data: readingData[grade]
    });
});

// res.json(readingData[grade] || {});

    const readingData = {
        kindergarten: {
            books: [
                {title: 'The Very Hungry Caterpillar', image: '/images/books/caterpillar.jpg', author: 'Eric Carle'}, {title: 'Clifford, the Big Red Dog', image: '/images/books/Clifford.jpg', author: 'Norman Bridwell'}
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
                {title: 'The Rainbow Fish', author: 'Marcus Pfister', image: '/images/books/rainbow.jpg'}, {title: 'Goodnight Moon', image: '/images/books/goodnightmoon.jpg', author:'Margaret Wise Brown'}
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
                {title: 'The Giving Tree', image: '/images/books/givingtree.jpg', author: 'Shel Silverstein'}, {title: 'Adventures of Frog and Toad', image: '/images/books/frogandtoad.jpg', author: 'Arnold Lobel'}
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
                {title: 'Goosebumps, Lets Get Invisible', image: '/images/books/goosebumps.jpg', author:'R.L. Stine'}, {title: 'Magic Tree House, Dinosaurs Before Dark', image: '/images/books/treehouse.jpg'}
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
                {title: 'Wonder', image: '/images/books/wonder.jpg', author: 'R.J. Palacio'}, {title: 'A Series of Unfortunate Events, The Bad Beginning', image: '/images/books/unfortunate.jpg', author: 'Daniel Handler'}
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
                {title: 'Harry Potter and the Philosophers Stone', image: '/images/books/harrypotter.jpg', author: 'J.K. Rowling'}, {title: 'Percy Jackson and the Lighting Thief', image: '/images/books/percyjackson.jpg', author:'Rick Riordan'}
            ],
            tips: [
                ' Focusing on nonfiction books will broaden subject specific vocabulary and knowledge', ' Challenge chidlren to read books from different genres and make it into a challenge', ' Update the routine by reading daily for 40 minutes '
            ],
            questions: [
                ' How do the events in the story connect to each other?', ' What theme or message is the author trying to share?'
            ]
        }
    };

    


module.exports = router;