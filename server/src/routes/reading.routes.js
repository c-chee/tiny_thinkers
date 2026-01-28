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
                '', ''
            ]
        },

        first: {
            books: [
                {title: 'The Rainbow Fish', author: 'Marcus Pfister', image: '/images/books/rainbow.jpg'}, {title: 'Goodnight Moon', image: '/images/books/goodnightmoon.jpg', author:'Margaret Wise Brown'}
            ],
            tips: [
                '', ''
            ]
        },

        second: {
            books: [
                {title: 'The Giving Tree', image: '/images/books/givingtree.jpg', author: 'Shel Silverstein'}, {title: 'Adventures of Frog and Toad', image: '/images/books/frogandtoad.jpg', author: 'Arnold Lobel'}
            ],
            tips: [
                '', ''
            ]
        },

        third: {
            books: [
                {title: 'Goosebumps, Lets Get Invisible', image: '/images/books/goosebumps.jpg', author:'R.L. Stine'}, {title: 'Magic Tree House, Dinosaurs Before Dark', image: '/images/books/treehouse.jpg'}
            ],
            tips: [
                '', ''
            ]
        },

        fourth: {
            books: [
                {title: 'Wonder', image: '/images/books/wonder.jpg', author: 'R.J. Palacio'}, {title: 'A Series of Unfortunate Events, The Bad Beginning', image: '/images/books/unfortunate.jpg', author: 'Daniel Handler'}
            ],
            tips: [
                '', ''
            ]
        },

        fifth: {
            books: [
                {title: 'Harry Potter and the Philosophers Stone', image: '/images/books/harrypotter.jpg', author: 'J.K. Rowling'}, {title: 'Percy Jackson and the Lighting Thief', image: '/images/books/percyjackson.jpg', author:'Rick Riordan'}
            ],
            tips: [
                '', ''
            ]
        }
    };

    


module.exports = router;