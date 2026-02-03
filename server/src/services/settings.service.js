// server/src/services/settings.service.js
const settingsQueries = require("../db/queries/settings.queries");

exports.saveSettings = (id, grade, type) =>
    settingsQueries.save(id, grade, type);

exports.getPreferences = (id) =>
    settingsQueries.get(id);
