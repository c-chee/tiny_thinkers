/**
 * List of possible content types
 * Later replace with API response
 */
module.exports = {
    reading: {
        label: "Reading",
        route: "/reading",
        class: "tile-reading",
        description: "Practice comprehension with Tiny."
    },

    spelling: {
        label: "Spelling",
        route: "/spelling",
        class: "tile-spelling",
        description: "Listen, type, and level up."
    },

    dictionary: {
        label: "Dictionary",
        route: "/dictionary",
        class: "tile-dictionary",
        description: "Look up words fast."
    },

    cards: {
        label: "Cards",
        route: "/cards",
        class: "tile-cards",
        description: "Flashcards for quick practice."
    },

    settings: {
        label: "Settings",
        route: "/settings",
        class: "tile-settings",
        description: "Update grade level and content"
    },

    resources: {
        label: "Resources",
        route: "/resources",
        class: "tile-resources",
        description: "Additional resources"
    },
    
    volunteer: {
        label: "Volunteer",
        route: "/volunteer",
        class: "tile-volunteer",
        description: "Get involved"
    }
};
