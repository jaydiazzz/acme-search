const data = {};

const allTerms = {};

let flattenedTerms = [];

const prevSearches = {};

/**
* ? this is the structure we will be following
* { ------ allTerms
*   "searchTerm" : [resultId1, resultId2, ...]
* }
*
* * here is what we will do when searching
* ["searchTerm", "otherSearchTerm", ...] -> ---- flattenedTerms
* grab all search terms that include the query ->
* cycle through all matched terms and return every value from our searchIndex
*
* ? This is what I want to do but this will take more time and was not asked
* ? out of me to do.. this is the point based system after flattening and
* ? computation
* {
*   "searchTerm" : {
*     resultId1 : 5,
*     resultId2 : 4,
*   },
*   ...
* }
*/

export const setIndex = ( dataSet, searchBy, uniqueKey ) => {

  dataSet.forEach( ( info ) => {

    data[info[uniqueKey]] = info;

    if ( !info[searchBy] ) {
      throw new Error( `No property found on object. Key provided: ${searchBy}` );
    }

    info[searchBy].forEach( ( term ) => {

      if ( !allTerms[term] ) {
        allTerms[term] = [];
      }

      allTerms[term].push( info[uniqueKey] ); // this is what's used to return results

    } );

  } );

  flattenedTerms = Object.keys( allTerms );

};

export const search = ( query ) => {

  if ( prevSearches[query] ) {
    return prevSearches[query];
  }

  // query : a
  // * matchedKeys = ['a', 'dave', 'AAA', 'car', ...]
  const matchedKeys = flattenedTerms.filter( ( a ) => a.includes( query.toLowerCase() ) );

  const returnedResults = [];
  const idsChecked      = {};

  // here we will go through the matchedKeys and grab all
  // results that include our query
  matchedKeys.forEach( ( key ) => { // eslint-disable-line

    // what you're going to want to do is go through each key
    // in your data[allTerms[?key]] and those will be your search
    // results

    // this will give you a list of results that have this key as a value
    const keys = allTerms[key];

    // go through these ids and if we already have seen this, don't add
    // it again to our list of results
    keys.forEach( ( dataKey ) => {

      if ( idsChecked[dataKey] ) {
        return;
      }

      idsChecked[dataKey] = true;
      returnedResults.push( data[dataKey] );

    } );

  } );

  prevSearches[query] = returnedResults;

  return returnedResults;

};

export default {
  setIndex,
  search,
};
