const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

// Initialize the sets array with theme information
function initialize() {
  return new Promise((resolve, reject) => {
    sets = setData.map(set => {
      const themeInfo = themeData.find(theme => theme.id === set.theme_id);
      return {
        ...set,
        theme: themeInfo ? themeInfo.name : "Unknown"
      };
    });
    resolve(); // Resolving with no data once the operation is complete
  });
}

// Return all sets
function getAllSets() {
  return new Promise((resolve, reject) => {
    if (sets.length > 0) {
      resolve(sets);
    } else {
      reject("Sets not available");
    }
  });
}

// Get a set by set number
function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const foundSet = sets.find(set => set.set_num === setNum);
    if (foundSet) {
      resolve(foundSet);
    } else {
      reject("Set not found");
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const filteredSets = sets.filter(set =>
      set.theme.toLowerCase().includes(theme.toLowerCase())
    );
    if (filteredSets.length > 0) {
      resolve(filteredSets);
    } else {
      reject("No sets found with the specified theme");
    }
  });
}






module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };


