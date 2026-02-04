/**
 * List of possible content types
 * Later replace with API response
 */
module.exports = {
    reading: {
        label: "Reading",
        route: "/reading",
        class: "tile-reading",
        description: "Read stories and answer questions to build understanding and confidence."
    },

    spelling: {
        label: "Spelling",
        route: "/spelling",
        class: "tile-spelling",
        description: "Listen and type words to improve spelling skills."
    },

    dictionary: {
        label: "Dictionary",
        route: "/dictionary",
        class: "tile-dictionary",
        description: "Look up words to see meanings, examples, and how to say them."
    },

    cards: {
        label: "Cards",
        route: "/cards",
        class: "tile-cards",
        description: "Click letters to hear sounds and example words."
    },

    settings: {
        label: "Settings",
        route: "/settings",
        class: "tile-settings",
        description: "Customize what shows on your dashboard."
    },

    resources: {
        label: "Resources",
        route: "/resources",
        class: "tile-resources",
        description: "Find local help for tutoring, learning at home, and basic needs."
    },
    
    volunteer: {
        label: "Contact Us",
        route: "/volunteer",
        class: "tile-volunteer",
        description: "Get in touch or find ways to support learning."
    }
};
